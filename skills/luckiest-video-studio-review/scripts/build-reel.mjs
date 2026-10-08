#!/usr/bin/env node
// Write reel.json for the review player (editor/, Motion OS) from a rendered luckiest-video-studio run: one scene
// per storyboard scene, in storyboard order, with each scene's variables as editable fields. Rerunning bumps
// "version" so an open player reloads itself. <run-dir>/qa/review-notes.json ([{ t, x, y, text, scene? }]), when
// present, is pinned on the frame as Claude's own notes. Then serve it: node <skill-dir>/editor/serve.mjs <run-dir>
// Usage: node build-reel.mjs <run-dir>
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MEDIA = { image: /\.(png|jpe?g|webp|gif|svg)$/i, video: /\.(mp4|mov|webm)$/i, audio: /\.(mp3|wav|m4a)$/i };
const mediaType = (v) => Object.keys(MEDIA).find((k) => MEDIA[k].test(v));
const slug = (v) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const words = (id) => id.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());

// One field per variable: hex -> color, file path -> media, number -> number, other strings -> text.
// ponytail: nested objects and arrays are skipped (no field). Map them to "list" if storyboards start using them.
function field(k, v) {
  const label = words(k);
  if (typeof v === "number") return { type: "number", label, v };
  if (typeof v !== "string") return null;
  if (/^#[0-9a-f]{3,8}$/i.test(v)) return { type: "color", label, v };
  if (mediaType(v)) return { type: "media", label, v };
  return { type: v.length > 60 ? "longtext" : "text", label, v };
}

// Pure: the reel for a storyboard. prevVersion is the version of the reel.json already in the run, or 0.
export function buildReel(sb, runDir, prevVersion = 0, duration = 0, qaNotes = []) {
  const assets = new Map();
  // The player's color fields pick from the brand palette, so every distinct hex becomes a palette entry and the
  // field links to it. Editing a palette color in the Style tab then changes every scene that uses it.
  const colors = new Map();
  const paletteId = (hex, k) => {
    const key = hex.toLowerCase();
    if (!colors.has(key)) colors.set(key, { id: `c${colors.size + 1}`, name: words(k), v: hex });
    return `brand.${colors.get(key).id}`;
  };
  const asset = (id, from) => { const type = mediaType(id); if (type && !assets.has(id)) assets.set(id, { id, name: basename(id), type, from }); };
  let t = 0;
  const scenes = sb.scenes.map((s, i) => {
    const range = [+t.toFixed(3), +(t += s.duration).toFixed(3)];
    const props = {};
    for (const [k, v] of Object.entries(s.variables ?? {})) {
      const f = field(k, v);
      if (!f) continue;
      if (f.type === "color") f.v = paletteId(v, k);
      props[k] = f;
      if (f.type === "media") asset(v, "Run");
    }
    if (s.kind === "demo" && s.source) { props.source = { type: "media", label: "Footage", v: s.source }; asset(s.source, "Footage"); }
    for (const a of s.assets ?? []) asset(a, "Run");
    props.motion = { type: "motion", label: "Motion", v: [s.kind, s.recipe].filter(Boolean).join(", ") };
    const src = s.kind === "demo" ? s.source : `composition/${s.composition ?? `compositions/${s.id}.html`}`;
    return {
      id: s.id, name: words(s.id), t: range,
      els: [{ id: s.id, label: s.line || words(s.id), t: range, box: null, src: `storyboard.json scenes[${i}] · ${src}`, props }],
    };
  });
  if (sb.music?.file) asset(sb.music.file, "Music");
  return {
    // The player stores unsent edits per id: title plus run folder keeps two projects from sharing them.
    id: `${slug(sb.title)}-${slug(basename(runDir))}`,
    title: sb.title,
    version: prevVersion + 1,
    path: runDir,
    src: "final.mp4",
    w: sb.format.width, h: sb.format.height, fps: sb.format.fps,
    // The joined file can run a frame or two off the storyboard sum; trust the file when it was probed.
    duration: duration || +t.toFixed(3),
    brand: { colors: [...colors.values()], fonts: [], logo: null },
    audio: { music: sb.music?.file ?? null, bpm: null, drop: null, musicVol: sb.music?.volume ?? 0.35, sfxVol: 0.8 },
    assets: [...assets.values()],
    scenes,
    // ponytail: the player seeds notes only on a project's first open (later opens keep the browser's state),
    // so these show once. Write them into the prompt by hand if a later version needs them.
    notes: qaNotes.map((n, i) => ({ id: i + 1, t: n.t, x: n.x ?? 50, y: n.y ?? 50, el: n.scene ?? null, text: `Claude: ${n.text}` })),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const runDir = resolve(process.argv[2] ?? ".");
  const fail = (m) => { console.error(`error: ${m}`); process.exit(1); };
  if (!existsSync(join(runDir, "storyboard.json"))) fail(`no storyboard.json in ${runDir}`);
  if (!existsSync(join(runDir, "final.mp4"))) fail(`no final.mp4 in ${runDir}; run render-scenes.mjs first`);
  const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
  const reelFile = join(runDir, "reel.json");
  const prev = existsSync(reelFile) ? JSON.parse(readFileSync(reelFile, "utf8")).version ?? 0 : 0;
  const probe = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", join(runDir, "final.mp4")], { encoding: "utf8" });
  const notesFile = join(runDir, "qa", "review-notes.json");
  const qaNotes = existsSync(notesFile) ? JSON.parse(readFileSync(notesFile, "utf8")) : [];
  const reel = buildReel(sb, runDir, prev, +(Number(probe.stdout?.trim()) || 0).toFixed(3), qaNotes);
  writeFileSync(reelFile, JSON.stringify(reel, null, 1) + "\n");
  const serve = join(dirname(fileURLToPath(import.meta.url)), "..", "editor", "serve.mjs");
  console.log(`wrote ${reelFile} v${reel.version} (${reel.scenes.length} scenes, ${reel.duration}s). Open it: node "${resolve(serve)}" "${runDir}"`);
}
