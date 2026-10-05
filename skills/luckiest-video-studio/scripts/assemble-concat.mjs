#!/usr/bin/env node
// Write a Concat project for a rendered run through `concat-cli api` (JSON-RPC, one JSON per line on stdin):
// every scene's rendered clip on the main track in storyboard order, music on its own track.
// Usage: node assemble-concat.mjs <run-dir> [--export [out.mp4]] [--dry-run]
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

// Pure: the requests a run needs. Media ids come back from media.import, so clip commands name their
// media as { $media: key } and run() fills the real id in.
// ponytail: demo scenes use their rendered clip, not raw footage with in/out points. Add addClip + trimClip
// on s.source if users need to widen demo trims inside Concat.
// musicDuration: the music file's length in seconds, so a longer track can be trimmed to the video.
export function buildRequests(sb, runDir, exportOut = null, musicDuration = 0) {
  const location = runDir, name = "concat", path = join(runDir, name);
  const { width, height, fps } = sb.format;
  // Concat defaults a new project to 1080p at 30 fps; give it the storyboard's frame and rate.
  const video = { width, height, rateNum: Math.round(fps * 1000), rateDen: 1000 };
  const reqs = [{ method: "version" }, { method: "project.create", location, name, video }];
  const commands = [];
  let t = 0;
  for (const [i, s] of sb.scenes.entries()) {
    const key = `${String(i + 1).padStart(2, "0")}-${s.id}`;
    reqs.push({ method: "media.import", path, file: join(runDir, "clips", `${key}.mp4`), key });
    commands.push({ op: "addClip", mediaId: { $media: key }, trackId: "T1", start: +t.toFixed(3) });
    t += s.duration;
  }
  const music = Boolean(sb.music?.file);
  if (music) {
    reqs.push({ method: "media.import", path, file: join(runDir, sb.music.file), key: "music" });
    commands.push({ op: "addClip", mediaId: { $media: "music" }, trackId: "T4", start: 0 });
  }
  // A batch reports the last id it minted: the music clip, when there is one, since it goes last.
  reqs.push({ method: "edit.apply", path, command: { op: "batch", commands }, ...(music ? { key: "musicClip" } : {}) });
  // ponytail: a track shorter than the video is not looped (render-scenes loops it). Loop here if users ask.
  if (music && musicDuration > t + 0.001) {
    reqs.push({ method: "edit.apply", path, command: { op: "trimClip", clipId: { $media: "musicClip" }, edge: "end", delta: -+(musicDuration - t).toFixed(3) } });
  }
  reqs.push({ method: "project.save", path });
  if (exportOut) reqs.push({ method: "export.run", path, output: exportOut, codec: "h264", width, height, rateNum: video.rateNum, rateDen: video.rateDen });
  return { path, duration: +t.toFixed(3), reqs };
}

const fillMedia = (v, ids) => JSON.parse(JSON.stringify(v), (k, x) => (x && typeof x === "object" && "$media" in x ? ids[x.$media] : x));

async function run(cli, reqs) {
  const child = spawn(cli, ["api"], { stdio: ["pipe", "pipe", "inherit"] });
  const lines = createInterface({ input: child.stdout })[Symbol.asyncIterator]();
  // Replies carry an id; events are notifications ({ method, params }, no id) and can arrive between
  // replies, so they are set aside while waiting for the next reply.
  const events = [];
  const read = async () => {
    const { value, done } = await lines.next();
    if (done) throw new Error("concat-cli closed its output");
    return JSON.parse(value);
  };
  const reply = async () => {
    for (;;) {
      const m = await read();
      if (m.method && !("id" in m)) events.push(m);
      else return m;
    }
  };
  const event = async (names) => {
    for (;;) {
      const i = events.findIndex((e) => names.includes(e.method));
      if (i >= 0) return events.splice(i, 1)[0];
      const m = await read();
      if (m.method && !("id" in m)) events.push(m);
    }
  };
  const ids = {};
  try {
    for (const [n, { key, ...req }] of reqs.entries()) {
      const { method, ...params } = fillMedia(req, ids);
      child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: n + 1, method, params }) + "\n");
      const res = await reply();
      // An error reply means nothing changed; its message is Concat's reason, in plain words.
      if (res.error) throw new Error(`${method} refused: ${res.error.message ?? JSON.stringify(res.error)}`);
      const out = res.result ?? {};
      if (method === "version") console.log(`concat ${out.concat ?? "?"}, api ${out.apiVersion ?? "?"}`);
      if (key) {
        if (!out.createdId) throw new Error(`${method} returned no id${params.file ? ` for ${params.file}` : ""}`);
        ids[key] = out.createdId;
      }
      if (method === "export.run") {
        // export.run returns at once; progress arrives as events until done or failed.
        const ev = await event(["export.done", "export.failed"]);
        if (ev.method === "export.failed") throw new Error(`export failed: ${JSON.stringify(ev.params)}`);
        console.log(`exported ${params.output}`);
      }
    }
  } finally {
    child.stdin.end();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const fail = (m) => { console.error(`error: ${m}`); process.exit(1); };
  const runDir = resolve(args.find((a) => !a.startsWith("--") && !/\.(mp4|mov|webm)$/i.test(a)) ?? ".");
  const exportOut = args.includes("--export") ? resolve(args.find((a) => /\.(mp4|mov|webm)$/i.test(a)) ?? join(runDir, "final-concat.mp4")) : null;
  const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
  const musicFile = sb.music?.file && join(runDir, sb.music.file);
  const probe = musicFile && existsSync(musicFile) && spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", musicFile], { encoding: "utf8" });
  const { path, duration, reqs } = buildRequests(sb, runDir, exportOut, Number(probe?.stdout?.trim()) || 0);

  if (args.includes("--dry-run")) {
    console.log(JSON.stringify(reqs, null, 2));
    process.exit(0);
  }
  for (const r of reqs) if (r.method === "media.import" && !existsSync(r.file)) fail(`missing ${r.file}; run render-scenes.mjs first`);
  const cli = process.env.CONCAT_CLI || "concat-cli";
  if (spawnSync(cli, ["--version"]).error) fail(`${cli} not found; install Concat from https://concatenate.pages.dev/#download or set CONCAT_CLI`);
  // Concat refuses to create a project in a folder that already holds one. Keep the old one aside
  // (it may carry edits made in Concat) instead of deleting it.
  if (existsSync(path)) {
    const aside = `${path}-${new Date().toISOString().replace(/[:.]/g, "-")}`;
    renameSync(path, aside);
    console.log(`moved the previous Concat project to ${aside}`);
  }
  await run(cli, reqs).catch((e) => fail(e.message));
  writeFileSync(join(runDir, "project.concat.txt"), `${path}\n`);
  console.log(`wrote ${path} (${sb.scenes.length} scenes, ${duration}s). Open it in Concat to edit and export.`);
}
