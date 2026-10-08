#!/usr/bin/env node
// Mix a cue file of sound effects into one sfx.wav, each sound placed by its anchor, plus a cue sheet.
// Needs Node 22+ and ffmpeg/ffprobe; nothing else is installed or downloaded.
//
//   node sfx-cues.mjs <sfx_cues.json> [--sfx-dir <skill-dir>/assets/sfx] [--events <composition-dir>] [--out <dir>]
//
// sfx_cues.json:
//   { "duration": 20,
//     "cues":  [{ "t": 4.0, "file": "impact/impactSoft_medium_001.ogg", "align": "start", "volume": 0.8, "label": "reveal" },
//               { "t": 6.0, "file": "<sourced>/whoosh.wav", "align": "peak" },          // peak on the cut
//               { "t": 9.5, "kind": "impact" }],                                        // file from kinds
//     "slots": { "02-reveal": 3.5 },          // scene id -> global start, for scene events
//     "kinds": { "card": "casino/card-slide-1.ogg" } }   // extra or overriding event kinds
//
// Scene events: <events-dir>/<scene-id>.motion.json = { "events": [{ "t": 0.25, "kind": "key", "note": "typed H" }] }
// with times local to the scene. Each one becomes a cue at slot start + t.
// align: start (default) puts the file start on t, peak its loudest 10 ms, end its last sample.

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname, isAbsolute } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const KEYS = Array.from({ length: 32 }, (_, i) => `keyboard/keypress-${String(i + 1).padStart(3, "0")}.wav`);
// [file, volume] per event kind; volumes follow the gain ladder in references/audio.md.
export const DEFAULT_KINDS = {
  key: [KEYS, 0.3], click: ["interface/click_001.ogg", 0.35], switch: ["interface/switch_001.ogg", 0.35],
  pop: ["interface/drop_001.ogg", 0.4], card: ["casino/card-place-1.ogg", 0.4],
  glitch: ["interface/glitch_002.ogg", 0.6], error: ["interface/error_005.ogg", 0.6],
  impact: ["impact/impactSoft_medium_000.ogg", 0.8], success: ["impact/impactBell_heavy_000.ogg", 0.8],
};

const anchors = new Map();
export function anchorOffset(file, align = "start") {
  if (align === "start") return 0;
  const key = `${file}|${align}`;
  if (anchors.has(key)) return anchors.get(key);
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", "8000", "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
  if (r.status !== 0) throw new Error(`ffmpeg failed on ${file}: ${r.stderr}`);
  const pcm = new Int16Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.length >> 1);
  let off;
  if (align === "end") off = pcm.length / 8000;
  else if (align === "peak") {
    let best = -1, at = 0;
    for (let o = 0; o + 80 <= pcm.length; o += 80) {
      let s = 0; for (let i = o; i < o + 80; i++) s += (pcm[i] / 32768) ** 2;
      if (s > best) { best = s; at = o + 40; }
    }
    off = at / 8000;
  } else throw new Error(`unknown align "${align}" (start, peak, end)`);
  anchors.set(key, off);
  return off;
}

// Cue file + scene events -> [{ t, file, align, volume, label, start, trim }], sorted by t.
export function buildCues(spec, { sfxDir, eventsDir } = {}) {
  const kinds = { ...DEFAULT_KINDS };
  for (const [k, f] of Object.entries(spec.kinds ?? {})) kinds[k] = [f, kinds[k]?.[1] ?? 0.6];
  const at = (f) => (isAbsolute(f) ? f : join(sfxDir, f));
  const fromKind = (kind, i) => { const [f, v] = kinds[kind]; return [Array.isArray(f) ? f[i % f.length] : f, v]; };
  const cues = [];
  (spec.cues ?? []).forEach((c, i) => {
    if (!c.file && !kinds[c.kind]) return console.error(`skip cue at ${c.t}s: no file and unknown kind "${c.kind}"`);
    const [f, v] = c.file ? [c.file, 0.6] : fromKind(c.kind, i);
    cues.push({ t: c.t, file: at(f), align: c.align ?? "start", volume: c.volume ?? v, label: c.label ?? c.kind ?? "" });
  });
  for (const [id, start] of Object.entries(spec.slots ?? {})) {
    const p = eventsDir && join(eventsDir, `${id}.motion.json`);
    if (!p || !existsSync(p)) continue;
    JSON.parse(readFileSync(p, "utf8")).events?.forEach((e, i) => {
      if (!kinds[e.kind]) return console.error(`skip ${id} event at ${e.t}s: unknown kind "${e.kind}"`);
      const [f, v] = fromKind(e.kind, i);
      cues.push({ t: Number((start + e.t).toFixed(3)), file: at(f), align: "start", volume: v, label: `${id}: ${e.note ?? e.kind}` });
    });
  }
  for (const c of cues) {
    if (!existsSync(c.file)) throw new Error(`missing sound file: ${c.file}`);
    const s = c.t - anchorOffset(c.file, c.align);
    c.start = Math.max(0, s);
    c.trim = Math.max(0, -s); // a sound whose lead-in falls before 0 loses that part
  }
  return cues.sort((a, b) => a.t - b.t);
}

export function mixCues(cues, { duration, outDir }) {
  mkdirSync(outDir, { recursive: true });
  const out = join(outDir, "sfx.wav");
  const args = ["-v", "error", "-y"];
  let graph;
  if (!cues.length) {
    args.push("-f", "lavfi", "-i", `anullsrc=r=48000:cl=stereo:d=${duration}`);
    graph = "[0:a]anull[out]";
  } else {
    // ponytail: one ffmpeg input per cue; hundreds are fine, thousands would want pre-mixed buses.
    cues.forEach((c) => args.push("-i", c.file));
    const legs = cues.map((c, i) => `[${i}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=start=${c.trim.toFixed(4)},asetpts=PTS-STARTPTS,volume=${c.volume},adelay=${Math.round(c.start * 1000)}:all=1[a${i}]`);
    graph = `${legs.join(";")};${cues.map((_, i) => `[a${i}]`).join("")}amix=inputs=${cues.length}:normalize=0:duration=longest,apad=whole_dur=${duration},atrim=0:${duration}[out]`;
  }
  const r = spawnSync("ffmpeg", [...args, "-filter_complex", graph, "-map", "[out]", "-c:a", "pcm_s16le", out], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`ffmpeg mix failed: ${r.stderr}`);
  const rows = cues.map((c) => `| ${c.t.toFixed(3)} | ${c.align} | ${c.start.toFixed(3)} | ${c.volume} | ${c.file.split("/").slice(-2).join("/")} | ${c.label} |`);
  writeFileSync(join(outDir, "sfx-cuesheet.md"), `# SFX cue sheet\n\n${cues.length} cues, ${duration}s.\n\n| t | anchor | file starts | volume | sound | label |\n|---|---|---|---|---|---|\n${rows.join("\n")}\n`);
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [file, ...rest] = process.argv.slice(2);
  const opt = (n, d) => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : d; };
  if (!file) { console.error("Usage: sfx-cues.mjs <sfx_cues.json> [--sfx-dir dir] [--events dir] [--out dir]"); process.exit(1); }
  const spec = JSON.parse(readFileSync(file, "utf8"));
  if (!(spec.duration > 0)) { console.error("sfx_cues.json needs a positive duration"); process.exit(1); }
  const here = dirname(fileURLToPath(import.meta.url));
  const cues = buildCues(spec, { sfxDir: resolve(opt("--sfx-dir", join(here, "../assets/sfx"))), eventsDir: opt("--events") && resolve(opt("--events")) });
  const out = mixCues(cues, { duration: spec.duration, outDir: resolve(opt("--out", dirname(resolve(file)))) });
  console.log(JSON.stringify({ ok: true, out, cues: cues.length }, null, 2));
}
