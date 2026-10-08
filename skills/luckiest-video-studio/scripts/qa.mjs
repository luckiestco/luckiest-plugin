#!/usr/bin/env node
// QA gates for a luckiest-video-studio run. Each gate prints JSON and exits 1 on a fail.
// Needs Node 22+ and ffmpeg/ffprobe; nothing else is installed or downloaded.
//
//   node qa.mjs tokens      <composition-dir> [--tokens tokens.json]   off-system stroke, type, radius
//   node qa.mjs crossfade   <composition-dir>                          full-frame layers tweening opacity
//   node qa.mjs motion      <composition-dir>                          ease-in entrances, scale 0 cards, one-off linear moves
//   node qa.mjs legibility  <video> [--every 1] [--min 180]            frames with nothing bright enough to read
//   node qa.mjs pops        <video> [--seams 5.2,9.8]                  one-frame pops and jumps (seams reported apart)
//   node qa.mjs deadframes  <video> [--freeze 3]                       black frames and long freezes
//   node qa.mjs presence    <run-dir> [--min 0]                        share of time the speaker is on screen
//   node qa.mjs beatsync    <talk-dir>                                 plan anchors against the transcript words
//   node qa.mjs beatgrid    <video> --bpm 128 [--phase 0] [--tol 0.035] cuts on the beat or half beat
//   node qa.mjs face        <run-dir> [--max 18]                       cards covering the speaker's face (scene faceRect)
//   node qa.mjs avsync      <video> [--expect 1.5,4.2] [--duration 20] audio present, length right, hits within one frame
//   node qa.mjs loop        <video> [--max 6]                          last frame must match the first, so the piece loops
//   node qa.mjs facts       <run-dir>                                  on-screen numbers not in storyboard facts, em dashes on screen
//   node qa.mjs safe        <run-dir> [--max 0.004] [--stills]         text or logo edges in the margins each format's platforms cover
//   node qa.mjs judge       <new.mp4> <old.mp4> [--out dir] [--cmd "claude -p --model sonnet"] [--verdicts A,B]
//                           new vs old, asked twice with the order swapped; the new one is kept only if it wins both
//
// A gate that has never failed proves nothing: qa.test.mjs runs each one on a control
// built to fail it.

import { readFileSync, readdirSync, existsSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, extname } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FORMATS, SAFE } from "./stamp-format.mjs";

// ---------- shared ----------

const ff = (args) => spawnSync("ffmpeg", ["-hide_banner", "-nostats", ...args], { maxBuffer: 1 << 30 });

export function probe(video) {
  const r = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries",
    "stream=r_frame_rate:format=duration", "-of", "json", video], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`ffprobe failed on ${video}: ${r.stderr}`);
  const j = JSON.parse(r.stdout), [n, d] = j.streams[0].r_frame_rate.split("/").map(Number);
  return { fps: n / d, duration: Number(j.format.duration) };
}

// Every frame as a small grayscale buffer (w x h bytes).
export function grayFrames(video, w = 64, h = 36, { start = 0, duration } = {}) {
  const r = ff(["-v", "error", "-ss", String(start), ...(duration ? ["-t", String(duration)] : []), "-i", video,
    "-vf", `scale=${w}:${h}:flags=area,format=gray`, "-f", "rawvideo", "-"]);
  if (r.status !== 0) throw new Error(`ffmpeg failed on ${video}: ${r.stderr}`);
  const size = w * h, frames = [];
  for (let o = 0; o + size <= r.stdout.length; o += size) frames.push(r.stdout.subarray(o, o + size));
  return frames;
}

export const meanDiff = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]); return s / a.length; };

const htmlFiles = (dir) => readdirSync(dir, { recursive: true }).map(String)
  .filter((f) => extname(f) === ".html").map((f) => join(dir, f));

// ---------- tokens ----------

export const DEFAULT_TOKENS = { stroke: [1.5, 2.5, 4, 7], type: [22, 30, 42, 60, 84], radius: [10, 22, 40] };

export function scanTokens(html, tokens = DEFAULT_TOKENS) {
  const out = [];
  const check = (kind, prop, raw) => {
    const v = Number(raw);
    if (Number.isFinite(v) && v > 0 && !tokens[kind].includes(v)) out.push({ kind, prop, value: v });
  };
  for (const m of html.matchAll(/stroke-width\s*[:=]\s*"?([\d.]+)/g)) check("stroke", "stroke-width", m[1]);
  for (const m of html.matchAll(/font-size\s*:\s*([\d.]+)px/g)) check("type", "font-size", m[1]);
  for (const m of html.matchAll(/border-radius\s*:\s*([\d.]+)px/g)) check("radius", "border-radius", m[1]);
  return out;
}

// ---------- cross-fade ----------

// Selectors whose CSS makes them cover the whole frame: 100%, the size tokens, or the root's own data-width/data-height in px.
export function fullFrameSelectors(html) {
  const root = html.match(/<div\b[^>]*\bdata-composition-id\b[^>]*>/i)?.[0] ?? "";
  const [w, h] = ["width", "height"].map((d, i) => root.match(new RegExp(`data-${d}\\s*=\\s*["']?(\\d+)`))?.[1] ?? [1920, 1080][i]);
  const fullW = new RegExp(`width:(100%|var\\(--w\\)|${w}px)`), fullH = new RegExp(`height:(100%|var\\(--h\\)|${h}px)`);
  const sels = new Set();
  for (const m of html.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const body = m[2].replace(/\s/g, "");
    const full = /inset:0(;|$)/.test(body) || (fullW.test(body) && fullH.test(body));
    if (full) for (const s of m[1].split(",")) { const t = s.trim().split(/[\s>]+/).pop(); if (/^[.#][\w-]+$/.test(t)) sels.add(t); }
  }
  return sels;
}

// Tweens (not instant sets) that change opacity on a full-frame layer.
export function scanCrossfades(html) {
  const full = fullFrameSelectors(html), out = [];
  for (const m of html.matchAll(/\.(to|from|fromTo)\(\s*["'`]([^"'`]+)["'`]\s*,([^;]*?)\)\s*[;,]/gs)) {
    const targets = m[2].split(",").map((s) => s.trim()).filter((s) => full.has(s));
    if (targets.length && /opacity\s*:/.test(m[3]) && !/duration\s*:\s*0\s*[,}]/.test(m[3])) out.push({ tween: m[1], targets });
  }
  return out;
}

// ---------- motion ----------

// Text from the "(" at `open` to its matching ")", skipping quoted strings.
function balanced(s, open) {
  let depth = 0, q = null;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === "\\") i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === "`") q = c;
    else if (c === "(" || c === "{" || c === "[") depth++;
    else if (c === ")" || c === "}" || c === "]") { if (--depth === 0) return s.slice(open + 1, i); }
  }
  return s.slice(open + 1);
}

const EASE_IN = /^(power\d|expo|circ|sine|quad|cubic|quart|quint|strong)\.in\b|easeIn$|^ease-in$/i;
const POP_EASE = /^(back|elastic|bounce)\.|^steps\(/;
const MOVES = /\b(x|y|xPercent|yPercent|scale)\s*:/;
const HIDDEN = /\b(opacity|autoAlpha)\s*:\s*0(\.0+)?\s*[,}]|\bscale\s*:\s*0(\.[0-4]\d*)?\s*[,}]/;

// Tweens where an element appears (starts hidden) and breaks the motion rules: an ease-in
// start, a card growing from scale 0 without an overshoot, or a short one-off linear move.
// Moves of visible things are left alone: a gravity drop may ease in, a slow push may be linear.
// ponytail: regex over source, not a JS parser; tweens built from variables or helpers are not seen.
export function scanMotion(src) {
  const out = [];
  for (const m of src.matchAll(/\.(from|fromTo)\(/g)) {
    const args = balanced(src, m.index + m[0].length - 1);
    const start = `${m[1] === "fromTo" ? balanced(args, args.indexOf("{")) : args}}`;
    if (!HIDDEN.test(start)) continue;
    const ease = args.match(/ease\s*:\s*["'`]([^"'`]+)/)?.[1] ?? "";
    const duration = Number(args.match(/duration\s*:\s*([\d.]+)/)?.[1] ?? 0.5);
    const line = src.slice(0, m.index).split("\n").length;
    const hit = (rule, why) => out.push({ line, rule, ease, why });
    if (EASE_IN.test(ease)) hit("ease-in-entrance", "entrances start slow on the frame the viewer is watching; use power3.out");
    if (/\bscale\s*:\s*0(\.0+)?\s*[,}]/.test(start) && !POP_EASE.test(ease)) hit("scale-zero", "nothing appears from nothing; start at scale 0.9-0.97 with autoAlpha 0");
    if (/^(none|linear)$/.test(ease) && !/\brepeat\s*:/.test(args) && duration < 2 && MOVES.test(start)) hit("linear-entrance", "linear is for loops, pushes, and progress; use power3.out");
  }
  return out;
}

// ---------- legibility ----------

// Brightest luma per sampled frame (0-255). A frame whose brightest pixel is dim has nothing lit to read.
export function legibility(video, { every = 1, min = 180 } = {}) {
  const { duration } = probe(video);
  const rows = [];
  for (let t = 0; t < duration; t += every) {
    // Read at 960x540, the size the storytelling rules judge legibility at.
    const [f] = grayFrames(video, 960, 540, { start: t, duration: 0.05 });
    if (!f) continue;
    let max = 0; for (const v of f) if (v > max) max = v;
    rows.push({ t: Number(t.toFixed(2)), brightest: max });
  }
  const dim = rows.filter((r) => r.brightest < min);
  return { ok: dim.length === 0, min, dim, sampled: rows.length };
}

// ---------- pops ----------

// A pop is one frame unlike both neighbours while the neighbours match each other.
export function findPops(frames, fps, { ratio = 3, floor = 6 } = {}) {
  const pops = [];
  for (let i = 1; i < frames.length - 1; i++) {
    const a = meanDiff(frames[i - 1], frames[i]), b = meanDiff(frames[i], frames[i + 1]), c = meanDiff(frames[i - 1], frames[i + 1]);
    if (a > floor && b > floor && Math.min(a, b) > ratio * Math.max(c, 1)) pops.push({ frame: i, t: Number((i / fps).toFixed(3)), jump: Number(Math.min(a, b).toFixed(1)) });
  }
  return pops;
}

// ---------- dead frames ----------

export function deadFrames(video, { freeze = 3, blackMin = 0.06 } = {}) {
  const r = ff(["-i", video, "-vf", `blackdetect=d=${blackMin}:pix_th=0.02:pic_th=0.995,freezedetect=n=0.001:d=${freeze}`, "-an", "-f", "null", "-"]);
  const log = r.stderr.toString();
  const black = [...log.matchAll(/black_start:([\d.]+) black_end:([\d.]+)/g)].map((m) => ({ start: +m[1], end: +m[2] }));
  const freezes = [...log.matchAll(/freeze_start: ([\d.]+)/g)].map((m) => ({ start: +m[1] }));
  return { ok: black.length === 0 && freezes.length === 0, black, freezes };
}

// ---------- presence ----------

// Compare each second of final.mp4 with the clip frame the storyboard says should be under it.
export function presence(runDir, { threshold = 12 } = {}) {
  const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
  const final = join(runDir, "final.mp4");
  let t0 = 0, onScreen = 0, total = 0;
  const cache = new Map();
  for (const s of sb.scenes) {
    const src = s.source ?? (s.assets ?? []).find((a) => a.endsWith(".mp4"));
    for (let t = 0; t < s.duration; t += 1) {
      total++;
      if (!src || !existsSync(join(runDir, src))) continue;
      const [f] = grayFrames(final, 64, 36, { start: t0 + t, duration: 0.05 });
      const key = `${src}@${((s.sourceStart ?? 0) + t).toFixed(2)}`;
      if (!cache.has(key)) cache.set(key, grayFrames(join(runDir, src), 64, 36, { start: (s.sourceStart ?? 0) + t, duration: 0.05 })[0]);
      const g = cache.get(key);
      if (f && g && meanDiff(f, g) < threshold) onScreen++;
    }
    t0 += s.duration;
  }
  return { share: total ? Number((onScreen / total).toFixed(3)) : 0, sampled: total };
}

// ---------- beat sync ----------

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9' ]/g, "").trim();

// Start time of the first occurrence of an anchor phrase in the word list.
export function findAnchor(words, phrase) {
  const want = norm(phrase).split(/\s+/).filter(Boolean);
  const ws = words.map((w) => norm(w.text));
  for (let i = 0; i + want.length <= ws.length; i++) if (want.every((x, k) => ws[i + k] === x)) return words[i].start;
  return null;
}

// Every scene and event with an anchor must enter between 0.2 s after and 1.8 s before its word.
export function beatSync(plan, transcript, { lead = [-0.2, 1.8] } = {}) {
  const words = (Array.isArray(transcript) ? transcript : transcript.words).filter((w) => w.type !== "spacing");
  const rows = [];
  for (const item of [...(plan.scenes ?? []).map((s) => ({ id: s.id, time: s.start, anchor: s.anchor })),
    ...(plan.events ?? []).map((e, i) => ({ id: `${e.visual}#${i}`, time: e.time, anchor: e.anchor }))]) {
    if (!item.anchor) continue;
    const at = findAnchor(words, item.anchor);
    const diff = at === null ? null : Number((at - item.time).toFixed(3));
    rows.push({ ...item, word: at, lead: diff, ok: diff !== null && diff >= lead[0] && diff <= lead[1] });
  }
  return { ok: rows.every((r) => r.ok), fails: rows.filter((r) => !r.ok), checked: rows.length };
}

// ---------- beat grid ----------

// Hard cuts are frames far from the previous one; each must sit near a beat or half beat.
export function cutTimes(frames, fps, { floor = 30 } = {}) {
  const cuts = [];
  for (let i = 1; i < frames.length; i++) if (meanDiff(frames[i - 1], frames[i]) > floor) cuts.push(i / fps);
  return cuts;
}

export function beatGrid(cuts, { bpm, phase = 0, tol = 0.035 }) {
  const half = 60 / bpm / 2;
  const rows = cuts.map((t) => {
    const k = Math.round((t - phase) / half), off = t - phase - k * half;
    return { t: Number(t.toFixed(3)), offset: Number(off.toFixed(3)), ok: Math.abs(off) <= tol };
  });
  return { ok: rows.every((r) => r.ok), off: rows.filter((r) => !r.ok), cuts: rows.length };
}

// ---------- avsync ----------

// Times where the audio's short-window energy jumps (a hit, a click, a whoosh's attack).
export function audioOnsets(video, { rate = 8000, win = 0.005, rise = 4, floor = 0.02 } = {}) {
  const r = ff(["-v", "error", "-i", video, "-vn", "-ac", "1", "-ar", String(rate), "-f", "s16le", "-"]);
  if (r.status !== 0) throw new Error(`ffmpeg failed on ${video}: ${r.stderr}`);
  const pcm = new Int16Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.length >> 1);
  const n = Math.round(rate * win), e = [];
  for (let o = 0; o + n <= pcm.length; o += n) { let s = 0; for (let i = o; i < o + n; i++) s += (pcm[i] / 32768) ** 2; e.push(Math.sqrt(s / n)); }
  const back = Math.round(0.05 / win), onsets = [];
  for (let i = 1; i < e.length; i++) {
    let prev = 0; for (let j = Math.max(0, i - back); j < i; j++) prev += e[j];
    prev /= Math.max(1, Math.min(back, i));
    // ponytail: energy-rise onsets, good for hits on a quiet-ish bed; under a dense mix pass the SFX stem instead.
    if (e[i] > floor && e[i] > rise * prev && !(onsets.length && i * win - onsets.at(-1) < 0.1)) onsets.push(Number((i * win).toFixed(3)));
  }
  return onsets;
}

// The final MP4 has an audio stream, the expected length, and each expected hit lands within one frame.
export function avSync(video, { expect = [], duration } = {}) {
  const { fps, duration: vdur } = probe(video), tol = 1 / fps;
  const r = spawnSync("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=duration", "-of", "json", video], { encoding: "utf8" });
  const a = JSON.parse(r.stdout || "{}").streams?.[0];
  if (!a) return { ok: false, audio: false, hits: [] };
  const problems = [], adur = Number(a.duration);
  // ponytail: two frames of slack for the encoder's audio padding.
  if (Number.isFinite(adur) && Math.abs(adur - vdur) > 2 * tol) problems.push(`audio ${adur.toFixed(3)}s vs video ${vdur.toFixed(3)}s`);
  if (duration != null && Math.abs(vdur - duration) > tol) problems.push(`video ${vdur.toFixed(3)}s, expected ${duration}s`);
  const on = expect.length ? audioOnsets(video) : [];
  const hits = expect.map((t) => {
    const near = on.reduce((b, o) => (b == null || Math.abs(o - t) < Math.abs(b - t) ? o : b), null);
    const offset = near == null ? null : Number((near - t).toFixed(3));
    return { t, onset: near, offset, ok: offset != null && Math.abs(offset) <= tol };
  });
  return { ok: problems.length === 0 && hits.every((h) => h.ok), audio: true, problems, hits, tolerance: Number(tol.toFixed(3)) };
}

// ---------- loop ----------

// A looping piece (a state-list morph) must end on its first frame, or the repeat shows a jump.
export function loopCheck(video, { max = 6 } = {}) {
  const frames = grayFrames(video);
  const diff = meanDiff(frames[0], frames.at(-1));
  return { ok: diff <= max, diff: Number(diff.toFixed(2)), frames: frames.length };
}

// ---------- facts ----------

const ENTITIES = { amp: "&", nbsp: " ", mdash: "\u2014", ndash: "\u2013", lt: "<", gt: ">", quot: '"', "#39": "'", "#8212": "\u2014" };

// What a viewer can read: markup, scripts, styles, and comments removed. Template contents stay (sub-compositions).
export const visibleText = (html) => html
  .replace(/<!--[\s\S]*?-->/g, " ").replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
  .replace(/<[^>]+>/g, " ").replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? m);

// ponytail: single digits pass unchecked (step numbers, "1 click"); currency, percents, ids, and 2+ digit numbers are checked.
const NUMBERS = /[A-Z]{2,}-\d+|[$€£]\s?\d[\d,]*(?:\.\d+)?|\d[\d,]*(?:\.\d+)?\s?%|\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d{2,}(?:\.\d+)?|\d\.\d+/g;

// texts: [{ where, text }]. A number passes when it appears inside one of the story facts.
export function scanFacts(texts, facts = []) {
  const norm = (x) => x.replace(/\s/g, "");
  const known = facts.map(norm);
  const found = [];
  for (const { where, text } of texts) {
    for (const token of text.match(NUMBERS) ?? []) {
      if (!known.some((f) => f.includes(norm(token)))) found.push({ where, rule: "not-a-fact", token: token.trim() });
    }
    if (text.includes("\u2014")) found.push({ where, rule: "em-dash", token: "\u2014" });
  }
  return found;
}

// ---------- face ----------

// Crop a 0-1 rect [x, y, w, h] out of a w x h gray frame.
export const crop = (f, w, h, [x, y, cw, ch]) => {
  const x0 = Math.floor(x * w), y0 = Math.floor(y * h), x1 = Math.ceil((x + cw) * w), y1 = Math.ceil((y + ch) * h), out = [];
  for (let r = y0; r < y1; r++) for (let c = x0; c < x1; c++) out.push(f[r * w + c]);
  return out;
};

// For scenes with faceRect, the face area in final.mp4 must still match the clip under it.
// A card over the face changes those pixels; the clip alone does not.
export function faceCover(runDir, { max = 18, w = 160, h = 90 } = {}) {
  const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
  // With formats, faceRect matches the landscape cut (16:9 footage is not cropped there).
  const final = join(runDir, existsSync(join(runDir, "final.mp4")) ? "final.mp4" : "final-landscape.mp4"), covered = [];
  let t0 = 0, checked = 0;
  for (const s of sb.scenes) {
    if (s.faceRect && s.source && existsSync(join(runDir, s.source))) {
      for (let t = 0; t < s.duration; t += 0.5) {
        const [f] = grayFrames(final, w, h, { start: t0 + t, duration: 0.05 });
        const [g] = grayFrames(join(runDir, s.source), w, h, { start: (s.sourceStart ?? 0) + t, duration: 0.05 });
        if (!f || !g) continue;
        checked++;
        const d = meanDiff(crop(f, w, h, s.faceRect), crop(g, w, h, s.faceRect));
        if (d > max) covered.push({ scene: s.id, t: Number((t0 + t).toFixed(2)), diff: Number(d.toFixed(1)) });
      }
    }
    t0 += s.duration;
  }
  return { ok: covered.length === 0, covered, checked };
}

// ---------- safe ----------

// Share of sharp-edge pixels in each margin the format's platforms cover (SAFE in stamp-format.mjs).
// Text and logos are sharp edges; a solid or gradient background has none.
// ponytail: pixels, not DOM boxes; a full-bleed photo or texture in a motion scene also trips it, so check a hit by eye.
export function marginInk(frame, w, h, [t, b, l, r], { edge = 48 } = {}) {
  // Each band stops one row short of the safe edge, so a line drawn exactly on the edge (a HUD corner) is not counted.
  const bands = { top: [0, 0, w, Math.round(t * h) - 1], bottom: [0, h - Math.round(b * h) + 1, w, h], left: [0, 0, Math.round(l * w) - 1, h], right: [w - Math.round(r * w) + 1, 0, w, h] };
  const out = {};
  for (const [side, [x0, y0, x1, y1]] of Object.entries(bands)) {
    let hits = 0, n = 0;
    for (let y = y0; y < Math.min(y1, h - 1); y++) for (let x = x0; x < Math.min(x1, w - 1); x++) {
      const i = y * w + x;
      if (Math.abs(frame[i] - frame[i + 1]) + Math.abs(frame[i] - frame[i + w]) > edge) hits++;
      n++;
    }
    out[side] = n ? hits / n : 0;
  }
  return out;
}

// Samples every motion and logo scene of each format's final, twice a second. Demo footage is skipped:
// a screen recording fills the frame by design. With stills, reads the hold-frame PNGs that
// `render-scenes.mjs --stills` wrote instead, so the check needs no render.
export function safeAreas(runDir, { max = 0.004, every = 0.5, stills = false } = {}) {
  const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
  const named = Object.keys(FORMATS).find((k) => FORMATS[k][0] === sb.format.width && FORMATS[k][1] === sb.format.height);
  const runs = Array.isArray(sb.formats) ? sb.formats.map((f) => [f, `final-${f}.mp4`]) : named ? [[named, "final.mp4"]] : [];
  const hits = [];
  let checked = 0;
  if (stills) {
    for (const [fmt] of runs) {
      const [W, H] = FORMATS[fmt], w = W / 4, h = H / 4;
      sb.scenes.forEach((s, i) => {
        if (s.kind === "demo") return;
        const png = join(runDir, "stills", Array.isArray(sb.formats) ? fmt : "", `${String(i + 1).padStart(2, "0")}-${s.id}.png`);
        if (!existsSync(png)) { hits.push({ format: fmt, scene: s.id, missing: png }); return; }
        const [f] = grayFrames(png, w, h);
        checked++;
        for (const [side, ink] of Object.entries(marginInk(f, w, h, SAFE[fmt]))) {
          if (ink > max) hits.push({ format: fmt, scene: s.id, side, ink: Number(ink.toFixed(4)) });
        }
      });
    }
    return { ok: hits.length === 0, hits, checked };
  }
  for (const [fmt, file] of runs) {
    const video = join(runDir, file), [W, H] = FORMATS[fmt], w = W / 4, h = H / 4;
    if (!existsSync(video)) { hits.push({ format: fmt, missing: file }); continue; }
    let t0 = 0;
    for (const s of sb.scenes) {
      for (let t = 0.25; s.kind !== "demo" && t < s.duration; t += every) {
        const [f] = grayFrames(video, w, h, { start: t0 + t, duration: 0.05 });
        if (!f) continue;
        checked++;
        for (const [side, ink] of Object.entries(marginInk(f, w, h, SAFE[fmt]))) {
          if (ink > max) hits.push({ format: fmt, scene: s.id, t: Number((t0 + t).toFixed(2)), side, ink: Number(ink.toFixed(4)) });
        }
      }
      t0 += s.duration;
    }
  }
  return { ok: hits.length === 0, hits, checked };
}

// ---------- judge ----------

// Pass 1 shows new as A, old as B. Pass 2 swaps them. Keep new only if it wins both,
// so a judge that just prefers whatever comes first can never promote a version.
export function pairVerdict(first, second) {
  const keep = first === "A" && second === "B";
  return { keep, winner: keep ? "new" : "old", passes: [first, second], consistent: (first === "A") === (second === "B") };
}

export const parseWinner = (text) => (String(text).match(/WINNER:\s*([AB])\b/gi) ?? []).pop()?.slice(-1).toUpperCase() ?? null;

// One tiled contact sheet per video, 2 frames a second, 6 across.
export function contactSheet(video, out, { rate = 2, cols = 6 } = {}) {
  const { duration } = probe(video), rows = Math.max(1, Math.ceil((duration * rate) / cols));
  const r = ff(["-v", "error", "-y", "-i", video, "-vf", `fps=${rate},scale=320:-2,tile=${cols}x${rows}`, "-frames:v", "1", out]);
  if (r.status !== 0) throw new Error(`contact sheet failed on ${video}: ${r.stderr}`);
  return out;
}

export const judgePrompt = (a, b) => `You are judging two versions of the same short video. Each image is a contact sheet: frames left to right, top to bottom, two per second.
A: ${a}
B: ${b}
Open both images. Judge which reads better to a viewer: every card legible, the speaker's face never covered, visuals change with what is said, no empty or cluttered stretches, real evidence instead of filler, and motion that feels designed: elements arrive fast and settle instead of creeping in or popping from nothing, moves match each other in speed and easing, and nothing drifts while it is being read.
Name the two biggest differences, then end with exactly one line: WINNER: A or WINNER: B`;

// ---------- CLI ----------

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [gate, target, ...rest] = process.argv.slice(2);
  if (gate === "judge" && rest[0] && !rest[0].startsWith("--")) rest.unshift("--old", rest.shift());
  const opt = (n, d) => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : d; };
  const num = (n, d) => Number(opt(n, d));
  if (!gate || !target) { console.error("Usage: qa.mjs <tokens|crossfade|motion|legibility|pops|deadframes|presence|beatsync|beatgrid|face|avsync|loop|facts|safe|judge> <path> [options]"); process.exit(1); }
  let result;
  if (gate === "tokens") {
    const tokens = opt("--tokens") ? JSON.parse(readFileSync(opt("--tokens"), "utf8")) : DEFAULT_TOKENS;
    const files = statSync(target).isDirectory() ? htmlFiles(target) : [target];
    const off = files.flatMap((f) => scanTokens(readFileSync(f, "utf8"), tokens).map((v) => ({ file: f, ...v })));
    result = { ok: off.length === 0, off };
  } else if (gate === "crossfade") {
    const files = statSync(target).isDirectory() ? htmlFiles(target) : [target];
    const found = files.flatMap((f) => scanCrossfades(readFileSync(f, "utf8")).map((v) => ({ file: f, ...v })));
    result = { ok: found.length === 0, found };
  } else if (gate === "motion") {
    const files = statSync(target).isDirectory() ? htmlFiles(target) : [target];
    const found = files.flatMap((f) => scanMotion(readFileSync(f, "utf8")).map((v) => ({ file: `${f}:${v.line}`, ...v })));
    result = { ok: found.length === 0, found };
  } else if (gate === "legibility") result = legibility(target, { every: num("--every", 1), min: num("--min", 180) });
  else if (gate === "pops") {
    const { fps } = probe(target), pops = findPops(grayFrames(target), fps);
    const seams = (opt("--seams", "") || "").split(",").filter(Boolean).map(Number);
    const atSeam = (p) => seams.some((s) => Math.abs(p.t - s) < 2 / fps);
    result = { ok: pops.length === 0, pops: pops.map((p) => ({ ...p, seam: atSeam(p) })) };
  } else if (gate === "deadframes") result = deadFrames(target, { freeze: num("--freeze", 3) });
  else if (gate === "presence") { result = presence(target); result.ok = result.share >= num("--min", 0); }
  else if (gate === "beatsync") {
    const read = (n) => JSON.parse(readFileSync(join(target, "assets", n), "utf8"));
    result = beatSync(read("plan.json"), read("transcript.json"));
  } else if (gate === "beatgrid") {
    if (!opt("--bpm")) { console.error("--bpm is required"); process.exit(1); }
    const { fps } = probe(target);
    result = beatGrid(cutTimes(grayFrames(target), fps), { bpm: num("--bpm"), phase: num("--phase", 0), tol: num("--tol", 0.035) });
  } else if (gate === "face") result = faceCover(target, { max: num("--max", 18) });
  else if (gate === "avsync") {
    const expect = (opt("--expect", "") || "").split(",").filter(Boolean).map(Number);
    result = avSync(target, { expect, duration: opt("--duration") != null ? num("--duration") : undefined });
  } else if (gate === "loop") result = loopCheck(target, { max: num("--max", 6) });
  else if (gate === "safe") result = safeAreas(target, { max: num("--max", 0.004), stills: rest.includes("--stills") });
  else if (gate === "facts") {
    const sb = JSON.parse(readFileSync(join(target, "storyboard.json"), "utf8"));
    const comp = join(target, "composition");
    const texts = existsSync(comp) ? htmlFiles(comp).map((f) => ({ where: f, text: visibleText(readFileSync(f, "utf8")) })) : [];
    for (const sc of sb.scenes ?? []) {
      const vals = [sc.line, ...Object.values(sc.variables ?? {})].filter((v) => typeof v === "string");
      texts.push({ where: `storyboard.json#${sc.id}`, text: vals.join("\n") });
    }
    const found = scanFacts(texts, sb.facts ?? []);
    result = { ok: found.length === 0, found, facts: (sb.facts ?? []).length };
  } else if (gate === "judge") {
    const old = opt("--old"), out = opt("--out", "qa-judge");
    if (!old) { console.error("judge needs <new.mp4> <old.mp4>"); process.exit(1); }
    mkdirSync(out, { recursive: true });
    const a = contactSheet(target, resolve(out, "new.png")), b = contactSheet(old, resolve(out, "old.png"));
    const prompts = [judgePrompt(a, b), judgePrompt(b, a)];
    let passes = opt("--verdicts")?.split(",").map((v) => v.trim().toUpperCase());
    if (!passes && opt("--cmd")) {
      passes = prompts.map((p, i) => {
        const r = spawnSync(opt("--cmd"), { shell: true, input: p, encoding: "utf8", maxBuffer: 1 << 26 });
        writeFileSync(join(out, `pass${i + 1}.txt`), (r.stdout ?? "") + (r.stderr ?? ""));
        return parseWinner(r.stdout);
      });
    }
    if (!passes) {
      // No command: the agent that built the video judges. Answer each prompt, then rerun with --verdicts.
      prompts.forEach((p, i) => writeFileSync(join(out, `prompt${i + 1}.md`), p));
      console.log(JSON.stringify({ ok: false, pending: true, prompts: [join(out, "prompt1.md"), join(out, "prompt2.md")] }, null, 2));
      process.exit(2);
    }
    if (passes.some((p) => p !== "A" && p !== "B")) { console.log(JSON.stringify({ ok: false, invalid: true, passes }, null, 2)); process.exit(2); }
    result = { ...pairVerdict(...passes), ok: pairVerdict(...passes).keep };
  } else { console.error(`unknown gate: ${gate}`); process.exit(1); }
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.ok ? 0 : 1;
}
