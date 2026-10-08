#!/usr/bin/env node
// Write a reel.json for the review player (luckiest-video-studio-review/editor/, Motion OS) for the silence pass, so the cut is reviewed in
// the same player as the finished video. One scene per kept range, on the edited timeline, so every join is a
// scene boundary ([ and ] jump between them). Each scene shows its words and the pause removed before it.
// Usage: node build-cuts-reel.mjs <edl.json> --transcript <silence-transcript.json> --video <silenced.mp4>
//   Writes reel.json beside the video. Then: node <review-dir>/editor/serve.mjs <video's folder>
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Pure. edl: { source_duration, edited_duration, keep_ranges, delete_ranges } in source time.
// words: [{ text, start, end }] retimed to the edited video. prevVersion: version of an existing reel.json, or 0.
export function buildCutsReel(edl, words, { dir, src, w = 1920, h = 1080, fps = 30, prevVersion = 0 }) {
  const deletes = edl.delete_ranges ?? [];
  let t = 0;
  const scenes = (edl.keep_ranges ?? []).map((k, i) => {
    const range = [+t.toFixed(3), +(t += k.end - k.start).toFixed(3)];
    const id = `K${i + 1}`;
    // The pause removed right before this kept range ends where the range starts.
    const cut = deletes.find((d) => Math.abs(d.end - k.start) < 0.005);
    const said = words.filter((x) => x.start >= range[0] - 0.005 && x.start < range[1]).map((x) => x.text.trim()).join(" ");
    const props = { words: { type: "longtext", label: "Words", v: said } };
    if (cut) props.cut = { type: "text", label: "Cut before", v: `${(cut.end - cut.start).toFixed(2)}s pause at ${cut.start.toFixed(2)}s${(cut.reasons?.[0] ?? cut.reason) ? `, ${cut.reasons?.[0] ?? cut.reason}` : ""}` };
    return { id, name: `Take ${i + 1}`, t: range, els: [{ id: `${id}-speech`, label: said.split(" ").slice(0, 6).join(" ") || id, t: range, box: null, src: `${basename(src)} ${range[0]}s`, props }] };
  });
  return {
    id: `cuts-${basename(dir).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: `Silence cut review (${deletes.length} cuts, -${(edl.source_duration - edl.edited_duration).toFixed(1)}s)`,
    version: prevVersion + 1,
    path: dir,
    src,
    w, h, fps,
    duration: +(edl.edited_duration ?? t).toFixed(3),
    brand: { colors: [], fonts: [], logo: null },
    audio: { music: null, bpm: null, drop: null, musicVol: 0, sfxVol: 0 },
    assets: [],
    scenes,
    notes: [],
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const opt = (n) => { const i = args.indexOf(n); return i < 0 ? null : args[i + 1]; };
  const fail = (m) => { console.error(`error: ${m}`); process.exit(1); };
  const edlPath = args.find((a) => !a.startsWith("--") && a !== opt("--transcript") && a !== opt("--video"));
  const video = opt("--video") && resolve(opt("--video"));
  if (!edlPath || !video || !opt("--transcript")) fail("usage: build-cuts-reel.mjs <edl.json> --transcript <silence-transcript.json> --video <silenced.mp4>");
  if (!existsSync(video)) fail(`no ${video}`);
  const edl = JSON.parse(readFileSync(resolve(edlPath), "utf8"));
  const tr = JSON.parse(readFileSync(resolve(opt("--transcript")), "utf8"));
  const dir = dirname(video), reelFile = join(dir, "reel.json");
  const prevVersion = existsSync(reelFile) ? JSON.parse(readFileSync(reelFile, "utf8")).version ?? 0 : 0;
  // The player draws the frame at the video's own size, so a vertical take stays vertical.
  const probe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate", "-of", "csv=p=0", video], { encoding: "utf8" });
  const [w, h, rate] = (probe.stdout ?? "").trim().split(",");
  const [num, den] = (rate ?? "").split("/").map(Number);
  const size = Number(w) && Number(h) ? { w: +w, h: +h, fps: Math.round(num / (den || 1)) || 30 } : {};
  const reel = buildCutsReel(edl, Array.isArray(tr) ? tr : tr.words ?? [], { dir, src: relative(dir, video), prevVersion, ...size });
  writeFileSync(reelFile, JSON.stringify(reel, null, 1) + "\n");
  console.log(JSON.stringify({ reel: reelFile, version: reel.version, scenes: reel.scenes.length }, null, 2));
}
