#!/usr/bin/env node
// Render each storyboard scene to clips/NN-id.mp4, skip unchanged scenes, then join final.mp4 and write TIMING.md.
// With storyboard "formats", each format renders into clips/<format>/ and joins final-<format>.mp4.
// Landscape reuses the clips of a finished single-format 16:9 render, so adding formats renders only the new ones.
// --stills skips the render: one hold-frame PNG per scene per format in stills/[<format>/], plus a sheet.png each.
// Usage: node render-scenes.mjs <run-dir> [--scene <id>]... [--quality draft|looks|delivery] [--no-join] [--stills [--jobs 2]]
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { FORMATS, stampFormat } from "./stamp-format.mjs";

const args = process.argv.slice(2);
const runDir = resolve(args.find((a, i) => !a.startsWith("--") && !["--scene", "--quality", "--jobs"].includes(args[i - 1])) ?? ".");
const forced = args.flatMap((a, i) => (a === "--scene" ? [args[i + 1]] : []));
const quality = args.includes("--quality") ? args[args.indexOf("--quality") + 1] : "looks";
const join_ = !args.includes("--no-join");
const stills = args.includes("--stills");
const jobs = args.includes("--jobs") ? Number(args[args.indexOf("--jobs") + 1]) : 2; // ponytail: 4 parallel snapshots hit the 10s navigation timeout here

const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
const { fps } = sb.format;

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

// No "formats": one target with today's paths. With "formats": one target per format, each in its own folder.
const multi = Array.isArray(sb.formats);
const clipsRoot = join(runDir, "clips");
const targets = multi
  ? sb.formats.map((fmt) => {
    if (!FORMATS[fmt]) fail(`formats: unknown format "${fmt}" (landscape, vertical, square)`);
    const [W, H] = FORMATS[fmt];
    return { fmt, W, H, dir: join(clipsRoot, fmt), final: `final-${fmt}.mp4` };
  })
  : [{ fmt: null, W: sb.format.width, H: sb.format.height, dir: clipsRoot, final: "final.mp4" }];

const inputsOf = (s) => {
  const files = [...(s.assets ?? [])];
  if (s.kind === "demo") {
    if (!s.source) fail(`demo scene ${s.id} needs "source"`);
    files.push(s.source);
  } else files.push(join("composition", s.composition ?? `compositions/${s.id}.html`));
  return files;
};

// Cache key for one scene at one target. fmt null is a single-format run with today's paths.
function sceneHash(s, { W, H, fmt }) {
  const h = createHash("sha256").update(JSON.stringify({ s, W, H, fps, quality, fmt }));
  for (const f of inputsOf(s)) {
    const p = join(runDir, f);
    if (!existsSync(p)) fail(`scene ${s.id}: missing ${f}`);
    h.update(f).update(readFileSync(p));
  }
  return h.digest("hex").slice(0, 16);
}

// Footage is cropped to fill around scenes[].focus when rendering formats or when focus is set;
// otherwise it is letterboxed as before, so a single-format run keeps its old framing.
function fitFilter(s, W, H) {
  const { x = 0.5, y = 0.5 } = s.focus ?? {};
  return s.kind === "demo" && (multi || s.focus)
    ? `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}:'max(0,min(iw-ow,${x}*iw-ow/2))':'max(0,min(ih-oh,${y}*ih-oh/2))'`
    : `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2`;
}

const hf = hasBin("hyperframes") ? ["hyperframes"] : ["npx", `hyperframes@${sb.hyperframes ?? "latest"}`];
let rendered = 0;

function renderTarget({ fmt, W, H, dir, final: finalName }) {
  const rawDir = join(dir, ".raw");
  mkdirSync(rawDir, { recursive: true });
  const cachePath = join(dir, ".cache.json");
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};
  const tag = (name) => (fmt ? `${fmt}/${name}` : name);

  const hashOf = (s) => sceneHash(s, { W, H, fmt });
  // A finished single-format 16:9 render (clips/.cache.json) stands in for the landscape format: the landscape
  // stamp only restates the master defaults, so the pixels match. Footage is framed differently, so demos re-run.
  const single = fmt === "landscape" && sb.format.width === W && sb.format.height === H && existsSync(join(clipsRoot, ".cache.json"))
    ? JSON.parse(readFileSync(join(clipsRoot, ".cache.json"), "utf8")) : {};

  // Every clip gets the same codec, size, fps and a stereo audio track so the join is a lossless concat.
  const normalize = (input, out, s, seek = 0) => {
    const probe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", input], { encoding: "utf8" });
    const hasAudio = probe.stdout.trim().length > 0;
    const vf = `${fitFilter(s, W, H)},fps=${fps},format=yuv420p`;
    const a = ["-y", "-v", "error", "-ss", String(seek), "-t", String(s.duration), "-i", input];
    if (!hasAudio) a.push("-f", "lavfi", "-t", String(s.duration), "-i", "anullsrc=r=48000:cl=stereo");
    a.push("-map", "0:v:0", "-map", hasAudio ? "0:a:0" : "1:a:0", "-vf", vf, "-c:v", "libx264", "-crf", "18", "-preset", "medium",
      "-c:a", "aac", "-ar", "48000", "-ac", "2", "-shortest", "-movflags", "+faststart", out);
    run("ffmpeg", a);
  };

  const clips = sb.scenes.map((s, i) => {
    const name = `${String(i + 1).padStart(2, "0")}-${s.id}.mp4`;
    const out = join(dir, name);
    const hash = hashOf(s);
    const prev = cache[s.id];
    const force = forced.includes(s.id);
    const legacy = single[s.id];
    if (!force && prev?.hash === hash && existsSync(join(dir, prev.file))) {
      if (prev.file !== name) renameSync(join(dir, prev.file), out);
      console.log(`skip   ${tag(name)} (unchanged)`);
    } else if (!force && s.kind !== "demo" && legacy?.hash === sceneHash(s, { W, H, fmt: null }) && existsSync(join(clipsRoot, legacy.file))) {
      copyFileSync(join(clipsRoot, legacy.file), out);
      console.log(`reuse  ${tag(name)} (from the 16:9 render)`);
    } else if (forced.length && !force && prev && existsSync(join(dir, prev.file))) {
      if (prev.file !== name) renameSync(join(dir, prev.file), out);
      console.log(`keep   ${tag(name)} (not selected)`);
      return { s, name, hash: prev.hash };
    } else {
      console.log(`render ${tag(name)}`);
      if (s.kind === "demo") normalize(join(runDir, s.source), out, s, s.sourceStart ?? 0);
      else {
        const raw = join(rawDir, name);
        const compDir = join(runDir, "composition");
        let comp = s.composition ?? `compositions/${s.id}.html`;
        // A stamped copy next to the original, so relative asset paths still resolve.
        if (fmt) {
          const stamped = comp.replace(/\.html$/, `.${fmt}.html`);
          writeFileSync(join(compDir, stamped), stampFormat(readFileSync(join(compDir, comp), "utf8"), fmt));
          comp = stamped;
        }
        run(hf[0], [...hf.slice(1), "render", "-c", comp, "-o", raw, "--fps", String(fps), "--quality", quality], { cwd: compDir });
        if (fmt) rmSync(join(compDir, comp));
        normalize(raw, out, s);
      }
      rendered++;
    }
    return { s, name, hash };
  });

  writeFileSync(cachePath, JSON.stringify(Object.fromEntries(clips.map((c) => [c.s.id, { hash: c.hash, file: c.name }])), null, 2));
  const t = clips.reduce((sum, c) => sum + c.s.duration, 0);

  if (join_) {
    const list = join(dir, ".concat.txt");
    writeFileSync(list, clips.map((c) => `file '${join(dir, c.name).replace(/'/g, "'\\''")}'`).join("\n") + "\n");
    const joined = join(dir, ".joined.mp4");
    run("ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", joined]);
    const final = join(runDir, finalName);
    // Mix the clips' own audio with the music bed and the global SFX track from sfx-cues.mjs.
    // music.offset skips into the track, music.at starts it in the video, so a chosen kick lands on a chosen moment.
    const ins = ["-i", joined], legs = [], tags = ["[0:a]"];
    if (sb.music?.file) {
      const at = sb.music.at ?? 0;
      ins.push("-stream_loop", "-1", "-i", join(runDir, sb.music.file));
      legs.push(`[1:a]atrim=start=${sb.music.offset ?? 0},asetpts=PTS-STARTPTS,volume=${sb.music.volume ?? 0.35},afade=t=out:st=${Math.max(0, t - at - 1.5)}:d=1.5,adelay=${Math.round(at * 1000)}:all=1[m]`);
      tags.push("[m]");
    }
    if (sb.sfx?.file) {
      ins.push("-i", join(runDir, sb.sfx.file));
      legs.push(`[${tags.length}:a]volume=${sb.sfx.volume ?? 1}[x]`);
      tags.push("[x]");
    }
    const mixed = join(dir, ".mix.wav");
    const graph = tags.length > 1 ? `${legs.join(";")};${tags.join("")}amix=inputs=${tags.length}:duration=first:normalize=0[a]` : "[0:a]anull[a]";
    run("ffmpeg", ["-y", "-v", "error", ...ins, "-filter_complex", graph, "-map", "[a]", "-c:a", "pcm_s16le", "-ar", "48000", "-t", String(t), mixed]);
    // Two-pass loudness to sb.loudness LUFS (default -14, the streaming norm). false skips it; silence is left alone.
    const target = sb.loudness ?? -14;
    let af = "anull";
    if (target !== false) {
      const m = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", mixed, "-af", `loudnorm=I=${target}:TP=-1.2:LRA=11:print_format=json`, "-f", "null", "-"], { encoding: "utf8" });
      const js = JSON.parse(m.stderr.match(/\{[^{}]*"input_i"[^{}]*\}/)?.[0] ?? "{}");
      if (Number(js.input_i) > -70) af = `loudnorm=I=${target}:TP=-1.2:LRA=11:measured_I=${js.input_i}:measured_TP=${js.input_tp}:measured_LRA=${js.input_lra}:measured_thresh=${js.input_thresh}:offset=${js.target_offset}:linear=true,aresample=48000`;
    }
    run("ffmpeg", ["-y", "-v", "error", "-i", joined, "-i", mixed, "-map", "0:v", "-map", "1:a", "-af", af,
      "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", String(t), "-movflags", "+faststart", final]);
    rmSync(joined);
    rmSync(mixed);
    console.log(`joined ${finalName} (${t.toFixed(2)}s)`);
  }
  return { clips, t, tag };
}

// One PNG per scene at its hold frame (scenes[].hold, else 0.5s before the cut), no video encode.
// Each motion or logo scene is snapshotted as the index.html of a temp project whose other entries link
// back to composition/, the same stamped copy the render uses, so relative asset paths still resolve.
async function captureStills({ fmt, W, H }) {
  const dir = join(runDir, "stills", fmt ?? "");
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const compDir = join(runDir, "composition");
  const queue = sb.scenes.map((s, i) => ({ s, name: `${String(i + 1).padStart(2, "0")}-${s.id}.png` }));
  const worker = async () => {
    for (let job = queue.shift(); job; job = queue.shift()) {
      const { s, name } = job, at = s.hold ?? Math.max(0, s.duration - 0.5), out = join(dir, name);
      if (s.kind === "demo") {
        run("ffmpeg", ["-y", "-v", "error", "-ss", String((s.sourceStart ?? 0) + at), "-i", join(runDir, s.source), "-frames:v", "1", "-vf", fitFilter(s, W, H), out]);
        continue;
      }
      const proj = mkdtempSync(join(tmpdir(), "stills-"));
      for (const e of readdirSync(compDir)) if (e !== "index.html") symlinkSync(join(compDir, e), join(proj, e));
      const html = readFileSync(join(compDir, s.composition ?? `compositions/${s.id}.html`), "utf8");
      writeFileSync(join(proj, "index.html"), fmt ? stampFormat(html, fmt) : html);
      let err = "";
      const code = await new Promise((done) => {
        const p = spawn(hf[0], [...hf.slice(1), "snapshot", proj, "--at", String(at), "--no-end", "-o", join(proj, ".snap"), "--describe", "false"]);
        p.stdout.resume();
        p.stderr.on("data", (b) => (err += b));
        p.on("close", done);
      });
      const png = existsSync(join(proj, ".snap")) && readdirSync(join(proj, ".snap")).find((f) => f.startsWith("frame-"));
      if (code !== 0 || !png) fail(`snapshot failed for scene ${s.id}${fmt ? ` (${fmt})` : ""}: ${err.trim().split("\n").pop()}`);
      copyFileSync(join(proj, ".snap", png), out);
      rmSync(proj, { recursive: true, force: true });
    }
  };
  await Promise.all(Array.from({ length: jobs }, worker));
  // ponytail: one sheet per format, 6 across at 320px wide; read it instead of every PNG.
  const cols = Math.min(6, sb.scenes.length), rows = Math.ceil(sb.scenes.length / cols);
  run("ffmpeg", ["-y", "-v", "error", "-pattern_type", "glob", "-i", join(dir, "[0-9]*.png"),
    "-vf", `scale=320:-2,tile=${cols}x${rows}:padding=6:color=white`, "-frames:v", "1", join(dir, "sheet.png")]);
  console.log(`stills ${join("stills", fmt ?? "", "sheet.png")} (${sb.scenes.length} scenes, ${W}x${H})`);
}

if (stills) {
  for (const t of targets) await captureStills(t);
  process.exit(0);
}
const results = targets.map(renderTarget);

// Timing is the same in every format, so TIMING.md lists the first format's clips.
const { clips, t, tag } = results[0];
let at = 0;
const rows = clips.map(({ s, name }, i) => {
  const row = `| ${i + 1} | ${s.id} | ${s.kind} | ${at.toFixed(2)} | ${(at + s.duration).toFixed(2)} | \`clips/${tag(name)}\` | ${(s.line ?? "").replace(/\|/g, "/")} |`;
  at += s.duration;
  return row;
});
const size = multi ? targets.map((x) => `${x.fmt} ${x.W}x${x.H} (${x.final})`).join(", ") : `${targets[0].W}x${targets[0].H}`;
writeFileSync(join(runDir, "TIMING.md"), `# Timing: ${sb.title}\n\nTotal ${t.toFixed(2)}s at ${size}, ${fps} fps.\n\n| # | Scene | Kind | In (s) | Out (s) | Clip | Line |\n|---|---|---|---|---|---|---|\n${rows.join("\n")}\n`);
const total = clips.length * targets.length;
console.log(`done: ${rendered} rendered, ${total - rendered} reused`);
