#!/usr/bin/env node
// Side-by-side breakdown: final.mp4 on top, one tile per storyboard scene below.
// The tile for the scene on screen plays the film in sync and gets an accent
// outline; the others hold that scene's hold frame. A playhead runs under the
// strip. Writes qa/breakdown.mp4 and qa/breakdown.png (the strip as a still).
//
//   node breakdown.mjs <run-dir> [--video final.mp4] [--out qa/breakdown.mp4]
//        [--accent #22C55E] [--hold 0.7] [--no-labels]

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const CANVAS_W = 1920;
const FILM_H = 1080;
const GAP = 16;
const BG = "0x0B0B0F";

const args = process.argv.slice(2);
const runDir = args.find((arg) => !arg.startsWith("--"));
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

if (!runDir) {
  console.error("usage: node breakdown.mjs <run-dir> [--video final.mp4] [--out qa/breakdown.mp4] [--accent #hex] [--hold 0.7] [--no-labels]");
  process.exit(2);
}

const root = resolve(runDir);
const videoPath = resolve(root, option("video", "final.mp4"));
const outPath = resolve(root, option("out", "qa/breakdown.mp4"));
const holdFraction = Number(option("hold", "0.7"));
const wantLabels = !args.includes("--no-labels");

const readAccent = () => {
  const fromFlag = option("accent", null);
  if (fromFlag) return fromFlag;
  const artPath = join(root, "art-direction.json");
  if (existsSync(artPath)) {
    const accent = JSON.parse(readFileSync(artPath, "utf8"))?.palette?.accent;
    if (accent) return accent;
  }
  return "#22C55E";
};
const accent = readAccent().replace("#", "0x");

const storyboardPath = join(root, "storyboard.json");
if (!existsSync(storyboardPath)) {
  console.error(`missing ${storyboardPath}`);
  process.exit(2);
}
if (!existsSync(videoPath)) {
  console.error(`missing ${videoPath}`);
  process.exit(2);
}

const scenes = JSON.parse(readFileSync(storyboardPath, "utf8")).scenes ?? [];
if (!scenes.length) {
  console.error("storyboard.json has no scenes");
  process.exit(2);
}

const probe = JSON.parse(
  execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_type,width,height:format=duration", "-of", "json", videoPath]).toString(),
);
const videoStream = probe.streams.find((stream) => stream.codec_type === "video");
const hasAudio = probe.streams.some((stream) => stream.codec_type === "audio");
const filmDuration = Number(probe.format.duration);
const sourceW = videoStream.width;
const sourceH = videoStream.height;

let cursor = 0;
const timeline = scenes.map((scene) => {
  const start = cursor;
  cursor += Number(scene.duration) || 0;
  return { id: scene.id, start, end: Math.min(cursor, filmDuration) };
});
const drift = Math.abs(cursor - filmDuration);
if (drift > 0.25) {
  console.error(`warning: scene durations sum to ${cursor.toFixed(2)}s but the video is ${filmDuration.toFixed(2)}s`);
}

const maxCols = sourceH > sourceW ? 8 : 6;
const cols = Math.min(timeline.length, maxCols);
const rows = Math.ceil(timeline.length / cols);
const tileW = Math.floor((CANVAS_W - GAP * (cols + 1)) / cols / 2) * 2;
const tileH = Math.floor((tileW * sourceH) / sourceW / 2) * 2;
const labelH = wantLabels ? 32 : 0;
const stripH = rows * (tileH + labelH + GAP) + GAP;
const canvasH = FILM_H + stripH + 8;
const tileX = (index) => GAP + (index % cols) * (tileW + GAP);
const tileY = (index) => FILM_H + GAP + Math.floor(index / cols) * (tileH + labelH + GAP);

const escapeText = (text) => String(text).replace(/\\/g, "\\\\").replace(/'/g, "\u2019").replace(/:/g, "\\:").replace(/%/g, "\\%");

const buildFilter = (labels) => {
  const parts = [];
  const tileCount = timeline.length;
  parts.push(`[0:v]split=${tileCount + 2}[film]${timeline.map((_, i) => `[src${i}]`).join("")}[live]`);
  parts.push(`[film]scale=${CANVAS_W}:${FILM_H}:force_original_aspect_ratio=decrease,pad=${CANVAS_W}:${FILM_H}:(ow-iw)/2:(oh-ih)/2:color=${BG},setsar=1[top]`);
  parts.push(`[top]pad=${CANVAS_W}:${canvasH}:0:0:color=${BG}[base0]`);
  parts.push(`[live]scale=${tileW}:${tileH},setsar=1[liveTile]`);
  parts.push(`[liveTile]split=${tileCount}${timeline.map((_, i) => `[live${i}]`).join("")}`);

  timeline.forEach((scene, i) => {
    const holdAt = scene.start + (scene.end - scene.start) * holdFraction;
    parts.push(`[src${i}]trim=start=${holdAt.toFixed(3)}:duration=0.05,setpts=PTS-STARTPTS,scale=${tileW}:${tileH},setsar=1,tpad=stop_mode=clone:stop_duration=${Math.ceil(filmDuration + 1)}[hold${i}]`);
  });

  let current = "base0";
  timeline.forEach((scene, i) => {
    const x = tileX(i);
    const y = tileY(i);
    const active = `between(t,${scene.start.toFixed(3)},${(scene.end - 0.001).toFixed(3)})`;
    parts.push(`[${current}][hold${i}]overlay=${x}:${y}:shortest=1[h${i}]`);
    parts.push(`[h${i}][live${i}]overlay=${x}:${y}:enable='${active}':shortest=1[l${i}]`);
    parts.push(`[l${i}]drawbox=x=${x - 4}:y=${y - 4}:w=${tileW + 8}:h=${tileH + 8}:color=${accent}:t=4:enable='${active}'[b${i}]`);
    current = `b${i}`;
    if (labels) {
      const label = escapeText(`${String(i + 1).padStart(2, "0")}  ${scene.id}`);
      parts.push(`[${current}]drawtext=font=Sans:text='${label}':fontsize=20:fontcolor=0xF2F2F5:x=${x}:y=${y + tileH + 8}[t${i}]`);
      current = `t${i}`;
    }
  });

  parts.push(`color=c=${accent}:s=${CANVAS_W}x6:d=${Math.ceil(filmDuration + 1)}[bar]`);
  parts.push(`[${current}][bar]overlay=x='-W+W*t/${filmDuration.toFixed(3)}':y=${canvasH - 7}:shortest=1[out]`);
  return parts.join(";");
};

const render = (labels) => {
  const ffmpegArgs = [
    "-y", "-v", "error", "-i", videoPath,
    "-filter_complex", buildFilter(labels),
    "-map", "[out]",
    ...(hasAudio ? ["-map", "0:a:0", "-c:a", "aac", "-b:a", "192k"] : []),
    "-t", filmDuration.toFixed(3),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-movflags", "+faststart",
    outPath,
  ];
  execFileSync("ffmpeg", ffmpegArgs, { stdio: ["ignore", "inherit", "pipe"] });
};

mkdirSync(resolve(outPath, ".."), { recursive: true });
try {
  render(wantLabels);
} catch (error) {
  if (!wantLabels) throw error;
  console.error("labels failed (no fontconfig Sans font?); rendering without labels");
  render(false);
}

const stillPath = outPath.replace(/\.mp4$/, ".png");
const lastHold = timeline[timeline.length - 1];
const stillAt = (lastHold.start + (lastHold.end - lastHold.start) * holdFraction).toFixed(3);
execFileSync("ffmpeg", ["-y", "-v", "error", "-ss", stillAt, "-i", outPath, "-frames:v", "1", stillPath]);

console.log(JSON.stringify({ out: outPath, still: stillPath, scenes: timeline.length, cols, rows, size: `${CANVAS_W}x${canvasH}`, durationSum: Number(cursor.toFixed(3)), film: Number(filmDuration.toFixed(3)) }));
