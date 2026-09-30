#!/usr/bin/env node
// Render each storyboard scene to clips/NN-id.mp4, skip unchanged scenes, then join final.mp4 and write TIMING.md.
// Usage: node render-scenes.mjs <run-dir> [--scene <id>]... [--quality draft|looks|delivery] [--no-join]
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const runDir = resolve(args.find((a, i) => !a.startsWith("--") && !["--scene", "--quality"].includes(args[i - 1])) ?? ".");
const forced = args.flatMap((a, i) => (a === "--scene" ? [args[i + 1]] : []));
const quality = args.includes("--quality") ? args[args.indexOf("--quality") + 1] : "looks";
const join_ = !args.includes("--no-join");

const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
const { width: W, height: H, fps } = sb.format;
const clipsDir = join(runDir, "clips");
const rawDir = join(clipsDir, ".raw");
mkdirSync(rawDir, { recursive: true });
const cachePath = join(clipsDir, ".cache.json");
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};

const fail = (msg) => { console.error(`error: ${msg}`); process.exit(1); };
const run = (cmd, argv, opts = {}) => {
  const r = spawnSync(cmd, argv, { stdio: ["ignore", "inherit", "inherit"], ...opts });
  if (r.error) fail(`${cmd} not found (${r.error.code})`);
  if (r.status !== 0) fail(`${cmd} ${argv.slice(0, 3).join(" ")} exited ${r.status}`);
};
const hasBin = (b) => spawnSync("which", [b], { stdio: "ignore" }).status === 0;

const ids = new Set();
for (const s of sb.scenes) {
  if (ids.has(s.id)) fail(`duplicate scene id "${s.id}"`);
  ids.add(s.id);
  if (!["motion", "logo", "demo"].includes(s.kind)) fail(`scene ${s.id}: unknown kind "${s.kind}"`);
  if (!(s.duration > 0)) fail(`scene ${s.id}: duration must be > 0`);
}
for (const id of forced) if (!ids.has(id)) fail(`--scene ${id}: no such scene`);

const inputsOf = (s) => {
  const files = [...(s.assets ?? [])];
  if (s.kind === "demo") {
    if (!s.source) fail(`demo scene ${s.id} needs "source"`);
    files.push(s.source);
  } else files.push(join("composition", s.composition ?? `compositions/${s.id}.html`));
  return files;
};
const hashOf = (s) => {
  const h = createHash("sha256").update(JSON.stringify({ s, W, H, fps, quality }));
  for (const f of inputsOf(s)) {
    const p = join(runDir, f);
    if (!existsSync(p)) fail(`scene ${s.id}: missing ${f}`);
    h.update(f).update(readFileSync(p));
  }
  return h.digest("hex").slice(0, 16);
};

// Every clip gets the same codec, size, fps and a stereo audio track so the join is a lossless concat.
const normalize = (input, out, s, seek = 0) => {
  const probe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", input], { encoding: "utf8" });
  const hasAudio = probe.stdout.trim().length > 0;
  const vf = `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2,fps=${fps},format=yuv420p`;
  const a = ["-y", "-v", "error", "-ss", String(seek), "-t", String(s.duration), "-i", input];
  if (!hasAudio) a.push("-f", "lavfi", "-t", String(s.duration), "-i", "anullsrc=r=48000:cl=stereo");
  a.push("-map", "0:v:0", "-map", hasAudio ? "0:a:0" : "1:a:0", "-vf", vf, "-c:v", "libx264", "-crf", "18", "-preset", "medium",
    "-c:a", "aac", "-ar", "48000", "-ac", "2", "-shortest", "-movflags", "+faststart", out);
  run("ffmpeg", a);
};

const hf = hasBin("hyperframes") ? ["hyperframes"] : ["npx", `hyperframes@${sb.hyperframes ?? "latest"}`];
let rendered = 0;
const clips = sb.scenes.map((s, i) => {
  const name = `${String(i + 1).padStart(2, "0")}-${s.id}.mp4`;
  const out = join(clipsDir, name);
  const hash = hashOf(s);
  const prev = cache[s.id];
  const force = forced.includes(s.id);
  if (!force && prev?.hash === hash && existsSync(join(clipsDir, prev.file))) {
    if (prev.file !== name) renameSync(join(clipsDir, prev.file), out);
    console.log(`skip   ${name} (unchanged)`);
  } else if (forced.length && !force && prev && existsSync(join(clipsDir, prev.file))) {
    if (prev.file !== name) renameSync(join(clipsDir, prev.file), out);
    console.log(`keep   ${name} (not selected)`);
    return { s, name, hash: prev.hash };
  } else {
    console.log(`render ${name}`);
    if (s.kind === "demo") normalize(join(runDir, s.source), out, s, s.sourceStart ?? 0);
    else {
      const raw = join(rawDir, name);
      const comp = s.composition ?? `compositions/${s.id}.html`;
      run(hf[0], [...hf.slice(1), "render", "-c", comp, "-o", raw, "--fps", String(fps), "--quality", quality], { cwd: join(runDir, "composition") });
      normalize(raw, out, s);
    }
    rendered++;
  }
  return { s, name, hash };
});

const nextCache = Object.fromEntries(clips.map((c) => [c.s.id, { hash: c.hash, file: c.name }]));
writeFileSync(cachePath, JSON.stringify(nextCache, null, 2));

let t = 0;
const rows = clips.map(({ s, name }, i) => {
  const row = `| ${i + 1} | ${s.id} | ${s.kind} | ${t.toFixed(2)} | ${(t + s.duration).toFixed(2)} | \`clips/${name}\` | ${(s.line ?? "").replace(/\|/g, "/")} |`;
  t += s.duration;
  return row;
});
writeFileSync(join(runDir, "TIMING.md"), `# Timing: ${sb.title}\n\nTotal ${t.toFixed(2)}s at ${W}x${H}, ${fps} fps.\n\n| # | Scene | Kind | In (s) | Out (s) | Clip | Line |\n|---|---|---|---|---|---|---|\n${rows.join("\n")}\n`);

if (join_) {
  const list = join(clipsDir, ".concat.txt");
  writeFileSync(list, clips.map((c) => `file '${join(clipsDir, c.name).replace(/'/g, "'\\''")}'`).join("\n") + "\n");
  const joined = join(clipsDir, ".joined.mp4");
  run("ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", joined]);
  const final = join(runDir, "final.mp4");
  if (sb.music?.file) {
    const vol = String(sb.music.volume ?? 0.35);
    run("ffmpeg", ["-y", "-v", "error", "-i", joined, "-stream_loop", "-1", "-i", join(runDir, sb.music.file),
      "-filter_complex", `[1:a]volume=${vol},afade=t=out:st=${Math.max(0, t - 1.5)}:d=1.5[m];[0:a][m]amix=inputs=2:duration=first:normalize=0[a]`,
      "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-t", String(t), "-movflags", "+faststart", final]);
    rmSync(joined);
  } else renameSync(joined, final);
  console.log(`joined final.mp4 (${t.toFixed(2)}s)`);
}
console.log(`done: ${rendered} rendered, ${clips.length - rendered} reused`);
