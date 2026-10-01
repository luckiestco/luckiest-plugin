#!/usr/bin/env node
// Split a reference video into shots and pull frames the agent can read.
// Usage: node shots.mjs <video-file-or-url> <out-dir> [--threshold 0.3] [--max-height 1080]
// Writes <out-dir>/source.<ext> (URLs only), shots.json, frames/NN-{a,b,c}.jpg, contact.jpg.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const [input, outArg] = args.filter((a, i) => !a.startsWith("--") && !["--threshold", "--max-height"].includes(args[i - 1]));
if (!input || !outArg) { console.error("usage: shots.mjs <video-file-or-url> <out-dir> [--threshold 0.3]"); process.exit(1); }
const out = resolve(outArg);
const threshold = Number(opt("--threshold", "0.3"));
const maxH = Number(opt("--max-height", "1080"));
mkdirSync(join(out, "frames"), { recursive: true });

const fail = (m) => { console.error(`error: ${m}`); process.exit(1); };
const run = (cmd, argv, capture = false) => {
  const r = spawnSync(cmd, argv, { encoding: "utf8", stdio: capture ? ["ignore", "pipe", "pipe"] : ["ignore", "inherit", "inherit"], maxBuffer: 64 << 20 });
  if (r.error) fail(`${cmd} not found`);
  if (r.status !== 0) fail(`${cmd} exited ${r.status}${capture ? `: ${r.stderr.slice(-400)}` : ""}`);
  return r;
};

let file = input;
if (/^https?:\/\//i.test(input)) {
  // The download is for study only; the skill never reuses source footage in output.
  run("yt-dlp", ["--no-update", "--no-playlist", "--no-part", "-f", `bv*[height<=${maxH}]/b[height<=${maxH}]`, "-o", join(out, "source.%(ext)s"), "--", input]);
  file = join(out, readdirSync(out).find((f) => f.startsWith("source.")) ?? fail("download produced no file"));
} else if (!existsSync(file)) fail(`no such file: ${file}`);

const p = JSON.parse(run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate:format=duration", "-of", "json", file], true).stdout);
const v = p.streams?.[0] ?? fail("no video stream");
const [fn, fd] = v.r_frame_rate.split("/").map(Number);
const fps = fd ? fn / fd : 30;
const duration = Number(p.format.duration);

// Scene-change timestamps from ffmpeg's scene score.
const det = run("ffmpeg", ["-hide_banner", "-nostats", "-i", file, "-an", "-vf", `select='gt(scene,${threshold})',showinfo`, "-f", "null", "-"], true);
const cuts = [...det.stderr.matchAll(/pts_time:([\d.]+)/g)].map((m) => Number(m[1])).filter((t) => t > 0.2 && t < duration - 0.2);
const bounds = [0, ...cuts, duration].filter((t, i, a) => i === 0 || t - a[i - 1] >= 0.25);

const frame = (t, name) => run("ffmpeg", ["-y", "-v", "error", "-ss", t.toFixed(3), "-i", file, "-frames:v", "1", "-vf", "scale=-2:360", "-q:v", "3", join(out, "frames", name)]);
const shots = bounds.slice(0, -1).map((start, i) => {
  const end = bounds[i + 1];
  const id = String(i + 1).padStart(2, "0");
  const pts = { a: start + Math.min(0.08, (end - start) / 4), b: (start + end) / 2, c: end - Math.min(0.08, (end - start) / 4) };
  for (const [k, t] of Object.entries(pts)) frame(t, `${id}-${k}.jpg`);
  return { shot: i + 1, start: +start.toFixed(3), end: +end.toFixed(3), duration: +(end - start).toFixed(3), frames: ["a", "b", "c"].map((k) => `frames/${id}-${k}.jpg`) };
});

// One contact sheet of every shot's middle frame, in order.
const cols = Math.min(6, shots.length);
run("ffmpeg", ["-y", "-v", "error", "-framerate", "1", "-i", join(out, "frames", "%02d-b.jpg"), "-vf", `scale=320:-2,tile=${cols}x${Math.ceil(shots.length / cols)}:padding=4:color=white`, "-frames:v", "1", join(out, "contact.jpg")]);

writeFileSync(join(out, "shots.json"), JSON.stringify({ source: input, file, width: v.width, height: v.height, fps: +fps.toFixed(3), duration: +duration.toFixed(3), threshold, shotCount: shots.length, averageShot: +(duration / shots.length).toFixed(3), shots }, null, 2));
console.log(`${shots.length} shots over ${duration.toFixed(2)}s (average ${(duration / shots.length).toFixed(2)}s). Wrote ${join(out, "shots.json")} and contact.jpg`);
