#!/usr/bin/env node
// Write an OpenScreen 1.13.0 timeline (schemaVersion 7) for a rendered run: motion and logo scenes as their
// rendered clips, demo scenes as the raw footage with in/out points so trims can be widened in the editor.
// Usage: node assemble-openscreen.mjs <run-dir> [--dest ~/Movies/Openscreen] [--name <slug>]
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join, resolve } from "node:path";

// ponytail: pinned to OpenScreen 1.13.0, which rejects schemaVersion 8. Bump with the next release after testing.
const SCHEMA_VERSION = 7;

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const runDir = resolve(args.find((a, i) => !a.startsWith("--") && !["--dest", "--name"].includes(args[i - 1])) ?? ".");
const fail = (msg) => { console.error(`error: ${msg}`); process.exit(1); };

const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
const slug = (opt("--name") ?? sb.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "video";
const destDir = join(resolve((opt("--dest") ?? "~/Movies/Openscreen").replace(/^~/, homedir())), slug);
mkdirSync(destDir, { recursive: true });

const probe = (file) => {
  const r = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,r_frame_rate:format=duration", "-of", "json", file], { encoding: "utf8" });
  if (r.status !== 0) fail(`ffprobe failed on ${file}`);
  const j = JSON.parse(r.stdout);
  const v = j.streams?.[0] ?? {};
  const [n, d] = (v.r_frame_rate ?? "0/1").split("/").map(Number);
  return { durationSec: Number(j.format?.duration ?? 0), video: { codec: v.codec_name ?? "unknown", width: v.width ?? 0, height: v.height ?? 0, fps: d ? n / d : 0 } };
};

// One asset per distinct media file; demo scenes that share footage share an asset.
const assets = new Map();
const assetFor = (src, label) => {
  const key = resolve(src);
  if (assets.has(key)) return assets.get(key);
  if (!existsSync(src)) fail(`missing ${src}`);
  const dest = join(destDir, basename(src));
  if (resolve(src) !== resolve(dest)) copyFileSync(src, dest);
  const cursor = src.replace(/\.[^.]+$/, ".cursor.json");
  if (existsSync(cursor)) copyFileSync(cursor, dest.replace(/\.[^.]+$/, ".cursor.json"));
  const a = { id: `a-${assets.size + 1}-${label}`, kind: "video", label, originalPath: dest, ...probe(dest) };
  assets.set(key, a);
  return a;
};

let t = 0;
const clips = sb.scenes.map((s, i) => {
  const name = `${String(i + 1).padStart(2, "0")}-${s.id}.mp4`;
  const demo = s.kind === "demo";
  const src = demo ? join(runDir, s.source) : join(runDir, "clips", name);
  if (!demo && !existsSync(src)) fail(`scene ${s.id} has no clip; run render-scenes.mjs first`);
  const asset = assetFor(src, demo ? s.id : name.replace(/\.mp4$/, ""));
  const start = demo ? (s.sourceStart ?? 0) : 0;
  const end = Math.min(start + s.duration, asset.durationSec || start + s.duration);
  const clip = { id: `c-${s.id}`, assetId: asset.id, sourceStartSec: start, sourceEndSec: end, timelineStartSec: t, timelineEndSec: t + (end - start), wordRefs: [], origin: "agent", reason: s.line ?? s.kind };
  t = clip.timelineEndSec;
  return clip;
});

const now = new Date().toISOString();
const doc = {
  schemaVersion: SCHEMA_VERSION,
  project: { id: `lvs-${slug}`, title: sb.title, createdAt: now, updatedAt: now, primaryAssetId: clips[0].assetId },
  assets: [...assets.values()],
  timeline: { clips, gaps: [], trimRanges: [], muteRanges: [], speedRanges: [], captionRanges: [] },
  annotations: [],
  zoomRanges: [],
};
const projectFile = join(destDir, `${slug}.openscreen`);
writeFileSync(projectFile, JSON.stringify(doc, null, 2));
writeFileSync(join(runDir, "project.openscreen.txt"), `${projectFile}\n`);
console.log(`wrote ${projectFile}`);
console.log(`${clips.length} clips, ${assets.size} media files, ${t.toFixed(2)}s. Open it in OpenScreen, edit, then click Export.`);
