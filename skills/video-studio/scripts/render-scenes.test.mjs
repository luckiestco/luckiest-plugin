// The join places the music where storyboard.json says and lands the mix at the target loudness.
// Demo scenes only, so nothing but ffmpeg runs; fixtures are lavfi clips in a temp folder.
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { audioOnsets } from "./qa.mjs";
import { stampFormat } from "./stamp-format.mjs";

const ff = (...a) => { const r = spawnSync("ffmpeg", ["-v", "error", "-y", ...a]); assert.equal(r.status, 0, r.stderr?.toString()); };
const lufs = (f) => Number(spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", f, "-af", "ebur128", "-f", "null", "-"], { encoding: "utf8" }).stderr.match(/I:\s+(-?[\d.]+) LUFS/g).pop().match(/-?[\d.]+/)[0]);

function run(music, { burst = true } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "render-scenes-"));
  mkdirSync(join(dir, "demo"));
  mkdirSync(join(dir, "audio"));
  ff("-f", "lavfi", "-i", "testsrc2=size=320x180:rate=30:duration=4", "-c:v", "libx264", join(dir, "demo/a.mp4"));
  // A quiet noise bed, with one loud burst 1.0 s into the track for the placement test.
  ff("-f", "lavfi", "-i", `aevalsrc='(0.05+${burst ? 0.8 : 0}*between(t,1,1.1))*(random(0)-0.5)':s=48000:d=6`, join(dir, "audio/music.wav"));
  writeFileSync(join(dir, "storyboard.json"), JSON.stringify({
    version: 1, title: "t", mode: "demo", format: { width: 320, height: 180, fps: 30 },
    music: { file: "audio/music.wav", volume: 0.5, ...music },
    scenes: [{ id: "a", kind: "demo", duration: 2, source: "demo/a.mp4" }, { id: "b", kind: "demo", duration: 2, source: "demo/a.mp4", sourceStart: 2 }],
  }));
  const r = spawnSync(process.execPath, [join(import.meta.dirname, "render-scenes.mjs"), dir], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  return join(dir, "final.mp4");
}

test("music.offset and music.at land a moment in the track on a moment in the video", () => {
  // Burst at 1.0 s in the track; skip 0.5 s of it and start it 1.0 s in: the burst lands at 1.5 s.
  const on = audioOnsets(run({ offset: 0.5, at: 1 }));
  assert.ok(on[0] >= 0.95, `music starts at ${on[0]}, not before 1.0`);
  assert.ok(on.some((t) => Math.abs(t - 1.5) < 1 / 30), JSON.stringify(on));
});

test("the final mix is normalized to -14 LUFS by default", () => {
  const quiet = run({}, { burst: false });
  assert.ok(Math.abs(lufs(quiet) + 14) <= 1, `measured ${lufs(quiet)} LUFS`);
});

test("formats render one final per format, cropping footage around focus", () => {
  const dir = mkdtempSync(join(tmpdir(), "render-formats-"));
  mkdirSync(join(dir, "demo"));
  // Left half red, right half blue, so the crop side is visible in one pixel.
  ff("-f", "lavfi", "-i", "color=red:size=320x180:rate=30:duration=2", "-f", "lavfi", "-i", "color=blue:size=160x180:rate=30:duration=2",
    "-filter_complex", "[0][1]overlay=x=160", "-c:v", "libx264", join(dir, "demo/a.mp4"));
  writeFileSync(join(dir, "storyboard.json"), JSON.stringify({
    version: 1, title: "t", mode: "demo", format: { width: 1920, height: 1080, fps: 30 }, formats: ["landscape", "vertical"], loudness: false,
    scenes: [{ id: "a", kind: "demo", duration: 1, source: "demo/a.mp4", focus: { x: 0.9, y: 0.5 } }],
  }));
  const r = spawnSync(process.execPath, [join(import.meta.dirname, "render-scenes.mjs"), dir], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  const size = (f) => spawnSync("ffprobe", ["-v", "error", "-select_streams", "v", "-show_entries", "stream=width,height", "-of", "csv=p=0", join(dir, f)], { encoding: "utf8" }).stdout.trim();
  assert.equal(size("final-landscape.mp4"), "1920,1080");
  assert.equal(size("final-vertical.mp4"), "1080,1920");
  assert.ok(existsSync(join(dir, "clips/vertical/01-a.mp4")) && !existsSync(join(dir, "final.mp4")));
  // focus x 0.9 keeps the blue right side in the vertical crop.
  const px = spawnSync("ffmpeg", ["-v", "error", "-i", join(dir, "final-vertical.mp4"), "-frames:v", "1", "-vf", "crop=2:2:540:960", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]).stdout;
  assert.ok(px[2] > 150 && px[0] < 100, `center pixel ${[...px]}`);
});

test("stampFormat sizes the root, tags the format, and injects size tokens", () => {
  const html = `<html lang="en" data-resolution="landscape"><head><style>:root{--w:1920px}</style></head><body><div id="root" data-composition-id="main" data-width="1920" data-height="1080"></div></body></html>`;
  const out = stampFormat(html, "vertical");
  assert.match(out, /<html lang="en" data-resolution="portrait" data-format="vertical">/);
  assert.match(out, /data-composition-id="main" data-width="1080" data-height="1920" data-format="vertical">/);
  assert.match(out, /--w:1920px\}<\/style><style>:root\{--w:1080px;--h:1920px;--u:10\.8px;--safe-t:288px;--safe-b:672px;--safe-l:119px;--safe-r:194px\}<\/style><\/head>/);
});

test("formats reuse a finished 16:9 render for landscape instead of rendering it again", () => {
  const dir = mkdtempSync(join(tmpdir(), "render-reuse-"));
  mkdirSync(join(dir, "composition/compositions"), { recursive: true });
  mkdirSync(join(dir, "clips"));
  writeFileSync(join(dir, "composition/compositions/m.html"), "<html><body>m</body></html>");
  const scene = { id: "m", kind: "motion", duration: 1 };
  const sb = { version: 1, title: "t", mode: "launch", format: { width: 1920, height: 1080, fps: 30 }, scenes: [scene] };
  // The cache entry a single-format render writes: same key the coordinator computes for fmt null.
  const comp = join("composition", "compositions/m.html");
  const hash = createHash("sha256").update(JSON.stringify({ s: scene, W: 1920, H: 1080, fps: 30, quality: "looks", fmt: null }))
    .update(comp).update(readFileSync(join(dir, comp))).digest("hex").slice(0, 16);
  writeFileSync(join(dir, "clips/.cache.json"), JSON.stringify({ m: { hash, file: "01-m.mp4" } }));
  ff("-f", "lavfi", "-i", "color=red:size=1920x1080:rate=30:duration=1", "-c:v", "libx264", join(dir, "clips/01-m.mp4"));
  writeFileSync(join(dir, "storyboard.json"), JSON.stringify({ ...sb, formats: ["landscape"] }));
  const r = spawnSync(process.execPath, [join(import.meta.dirname, "render-scenes.mjs"), dir, "--no-join"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /reuse {2}landscape\/01-m\.mp4/);
  assert.match(r.stdout, /done: 0 rendered, 1 reused/);
  assert.ok(existsSync(join(dir, "clips/landscape/01-m.mp4")));
});

test("--stills writes one hold frame per scene per format and a sheet, without rendering", () => {
  const dir = mkdtempSync(join(tmpdir(), "render-stills-"));
  mkdirSync(join(dir, "demo"));
  ff("-f", "lavfi", "-i", "testsrc2=size=320x180:rate=30:duration=2", "-c:v", "libx264", join(dir, "demo/a.mp4"));
  writeFileSync(join(dir, "storyboard.json"), JSON.stringify({
    version: 1, title: "t", mode: "demo", format: { width: 1920, height: 1080, fps: 30 }, formats: ["landscape", "vertical"],
    scenes: [{ id: "a", kind: "demo", duration: 1.5, source: "demo/a.mp4" }],
  }));
  const r = spawnSync(process.execPath, [join(import.meta.dirname, "render-scenes.mjs"), dir, "--stills"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  const size = (f) => spawnSync("ffprobe", ["-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", join(dir, f)], { encoding: "utf8" }).stdout.trim();
  assert.equal(size("stills/landscape/01-a.png"), "1920,1080");
  assert.equal(size("stills/vertical/01-a.png"), "1080,1920");
  assert.ok(existsSync(join(dir, "stills/vertical/sheet.png")) && !existsSync(join(dir, "clips")));
});
