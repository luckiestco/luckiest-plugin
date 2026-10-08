// sfx-cues places each sound by its anchor (start, peak, end) and mixes one sfx.wav.
// Fixtures are tiny ffmpeg tones in a temp folder; nothing is downloaded.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { anchorOffset, buildCues, mixCues } from "./sfx-cues.mjs";

const dir = mkdtempSync(join(tmpdir(), "sfx-cues-"));
const sfx = join(dir, "sfx");
mkdirSync(sfx);
const tone = (name, d, env) => {
  const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", `aevalsrc='(${env})*sin(2*PI*800*t)':s=48000:d=${d}`, join(sfx, name)]);
  assert.equal(r.status, 0, r.stderr?.toString());
};
tone("click.wav", 0.05, "0.8");
tone("whoosh.wav", 0.6, "0.8*(1-abs(t-0.3)/0.3)"); // loudest at 0.3 s
tone("riser.wav", 0.5, "0.8*t/0.5");               // ends at full level

// RMS per 10 ms window of a mono decode.
function energy(file) {
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", "8000", "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
  const pcm = new Int16Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.length >> 1), n = 80, e = [];
  for (let o = 0; o + n <= pcm.length; o += n) { let s = 0; for (let i = o; i < o + n; i++) s += (pcm[i] / 32768) ** 2; e.push(Math.sqrt(s / n)); }
  return e;
}
const win = (e, a, b) => e.slice(Math.round(a * 100), Math.round(b * 100));

test("anchorOffset: start is 0, peak is the loudest point, end is the length", () => {
  assert.equal(anchorOffset(join(sfx, "click.wav"), "start"), 0);
  assert.ok(Math.abs(anchorOffset(join(sfx, "whoosh.wav"), "peak") - 0.3) < 0.02);
  assert.ok(Math.abs(anchorOffset(join(sfx, "riser.wav"), "end") - 0.5) < 0.02);
});

test("mix: a click starts, a whoosh peaks, and a riser ends on its cue, within one frame", () => {
  const cues = { duration: 3, cues: [
    { t: 0.5, file: "click.wav", align: "start", label: "pop" },
    { t: 1.5, file: "whoosh.wav", align: "peak", label: "cut" },
    { t: 2.5, file: "riser.wav", align: "end", label: "into the hit" },
  ] };
  const placed = buildCues(cues, { sfxDir: sfx });
  const out = join(dir, "out");
  mixCues(placed, { duration: 3, outDir: out });
  const e = energy(join(out, "sfx.wav")), frame = 1 / 30;
  const firstLoud = win(e, 0.3, 0.8).findIndex((v) => v > 0.05) / 100 + 0.3;
  assert.ok(Math.abs(firstLoud - 0.5) < frame, `click at ${firstLoud}`);
  const w = win(e, 1.0, 2.0), peak = w.indexOf(Math.max(...w)) / 100 + 1.0;
  assert.ok(Math.abs(peak - 1.5) < frame, `whoosh peak at ${peak}`);
  const r = win(e, 2.0, 3.0), lastLoud = (r.length - 1 - [...r].reverse().findIndex((v) => v > 0.05)) / 100 + 2.0;
  assert.ok(Math.abs(lastLoud - 2.5) < frame, `riser ends at ${lastLoud}`);
  const sheet = readFileSync(join(out, "sfx-cuesheet.md"), "utf8");
  assert.match(sheet, /into the hit/);
  assert.equal(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", join(out, "sfx.wav")], { encoding: "utf8" }).stdout.trim().slice(0, 3), "3.0");
});

test("scene events: local times shift by the slot start and map kinds to files", () => {
  const comp = join(dir, "composition");
  mkdirSync(comp, { recursive: true });
  writeFileSync(join(comp, "02-reveal.motion.json"), JSON.stringify({ events: [{ t: 0.25, kind: "click", note: "button" }, { t: 0.5, kind: "nope" }] }));
  const placed = buildCues({ duration: 4, slots: { "02-reveal": 2 }, kinds: { click: "click.wav" }, cues: [] }, { sfxDir: sfx, eventsDir: comp });
  assert.equal(placed.length, 1);
  assert.equal(placed[0].t, 2.25);
  assert.equal(placed[0].file, join(sfx, "click.wav"));
  assert.equal(placed[0].skipped, undefined);
});

test("CLI writes sfx.wav and the cue sheet next to the cue file", () => {
  const run = join(dir, "run");
  mkdirSync(run);
  writeFileSync(join(run, "sfx_cues.json"), JSON.stringify({ duration: 1, cues: [{ t: 0.2, file: "click.wav" }] }));
  const r = spawnSync(process.execPath, [join(import.meta.dirname, "sfx-cues.mjs"), join(run, "sfx_cues.json"), "--sfx-dir", sfx], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  assert.ok(existsSync(join(run, "sfx.wav")) && existsSync(join(run, "sfx-cuesheet.md")));
});
