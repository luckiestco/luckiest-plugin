#!/usr/bin/env node
// Record a QA status on every card in packs/*/style.json, then rebuild the registry.
//
//   node qa-cards.mjs lint [--pack <id>] [--jobs 6] [--bin <hyperframes>]
//       Lints each card on its own with `hyperframes lint --json`. Sets qa to "lint-ok",
//       or "broken" when lint reports errors. Never downgrades a "render-ok" card that
//       still lints clean. Uses `hyperframes` on PATH, else the cached
//       `npx --no-install hyperframes@0.8.84` (it never downloads).
//   node qa-cards.mjs mark <status> <card-id>...
//       Sets qa by hand, for example "render-ok" after a rendered card was inspected.
//   node qa-cards.mjs sample <run-dir> [--pack <id>]
//       Writes a run folder with one tier1 and one tier2 card per purpose per pack as
//       motion scenes, ready for render-scenes.mjs.

import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKS = resolve(HERE, "../packs");
const HF_VERSION = "0.8.84";
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const packDirs = () => readdirSync(PACKS).filter((d) => /^\d\d-/.test(d)).filter((d) => !flag("--pack") || d.endsWith(flag("--pack")));
const readManifest = (d) => JSON.parse(readFileSync(join(PACKS, d, "style.json"), "utf8"));
const writeManifest = (d, m) => writeFileSync(join(PACKS, d, "style.json"), JSON.stringify(m, null, 2) + "\n");
const rebuild = () => spawnSync(process.execPath, [join(HERE, "build-registry.mjs")], { stdio: "inherit" });

function hfCommand() {
  const bin = flag("--bin");
  if (bin) return [bin];
  return spawnSync("hyperframes", ["--version"], { encoding: "utf8" }).status === 0
    ? ["hyperframes"] : ["npx", "--no-install", `hyperframes@${HF_VERSION}`];
}

// Lint one card as the root index.html of a scratch project, with the pack's tokens at
// cards/<pack-id>/tokens.css, the same root-relative path a run uses.
function lintCard(hf, packDir, file) {
  return new Promise((done) => {
    const proj = mkdtempSync(join(tmpdir(), "card-lint-"));
    mkdirSync(join(proj, "cards", packDir.replace(/^\d\d-/, "")), { recursive: true });
    cpSync(join(PACKS, packDir, "tokens.css"), join(proj, "cards", packDir.replace(/^\d\d-/, ""), "tokens.css"));
    writeFileSync(join(proj, "index.html"), readFileSync(join(PACKS, packDir, file), "utf8"));
    const p = spawn(hf[0], [...hf.slice(1), "lint", "--json", proj], { stdio: ["ignore", "pipe", "pipe"] });
    let out = "", err = "";
    p.stdout.on("data", (b) => (out += b));
    p.stderr.on("data", (b) => (err += b));
    p.on("close", (code) => {
      rmSync(proj, { recursive: true, force: true });
      let errors = null;
      try {
        const j = JSON.parse(out.slice(out.indexOf("{")));
        const findings = j.findings ?? j.results ?? j.issues ?? [];
        errors = typeof j.errorCount === "number" ? j.errorCount : findings.filter((f) => (f.severity ?? f.level) === "error").length;
      } catch { errors = code === 0 ? 0 : null; }
      done({ errors, code, detail: errors ? out.slice(0, 400) : err.slice(0, 200) });
    });
  });
}

async function lintAll() {
  const hf = hfCommand(), jobs = Number(flag("--jobs", 6));
  const summary = { "lint-ok": 0, broken: 0, "render-ok": 0, unknown: 0 };
  const broken = [];
  for (const d of packDirs()) {
    const m = readManifest(d);
    const queue = [...m.cards];
    const worker = async () => {
      for (let c = queue.shift(); c; c = queue.shift()) {
        const r = await lintCard(hf, d, c.file);
        if (r.errors === null) { summary.unknown++; continue; }
        if (r.errors > 0) { c.qa = "broken"; broken.push({ id: c.id, errors: r.errors }); }
        else if (c.qa !== "render-ok") c.qa = "lint-ok";
        summary[c.qa]++;
      }
    };
    await Promise.all(Array.from({ length: jobs }, worker));
    writeManifest(d, m);
  }
  rebuild();
  console.log(JSON.stringify({ summary, broken }, null, 2));
  process.exitCode = summary.unknown ? 2 : 0;
}

function mark(status, ids) {
  let n = 0;
  for (const d of packDirs()) {
    const m = readManifest(d);
    for (const c of m.cards) if (ids.includes(c.id)) { c.qa = status; n++; }
    writeManifest(d, m);
  }
  rebuild();
  console.log(`marked ${n} card(s) ${status}`);
}

function sample(runDir) {
  const run = resolve(runDir), comp = join(run, "composition");
  mkdirSync(join(comp, "compositions"), { recursive: true });
  const scenes = [];
  for (const d of packDirs()) {
    const m = readManifest(d), id = m.id;
    cpSync(join(PACKS, d), join(comp, "cards", id), { recursive: true });
    const seen = new Set();
    for (const c of m.cards) {
      const key = `${c.tier}.${c.purpose}`;
      if (seen.has(key) || c.qa === "broken") continue;
      seen.add(key);
      const sceneId = c.id.replace(/\./g, "-");
      const dur = c.duration?.min ?? 5;
      const html = readFileSync(join(PACKS, d, c.file), "utf8");
      writeFileSync(join(comp, "compositions", `${sceneId}.html`), html);
      scenes.push({ id: sceneId, kind: "motion", duration: dur, composition: `compositions/${sceneId}.html`, line: c.id });
    }
  }
  writeFileSync(join(run, "storyboard.json"), JSON.stringify({ version: 1, title: "Card QA sample", mode: "launch",
    hyperframes: HF_VERSION, format: { width: 1920, height: 1080, fps: 30 }, scenes }, null, 2) + "\n");
  console.log(JSON.stringify({ run, scenes: scenes.map((s) => s.line) }, null, 2));
}

const [cmd, ...rest] = args;
if (cmd === "lint") await lintAll();
else if (cmd === "mark" && rest.length > 1) mark(rest[0], rest.slice(1));
else if (cmd === "sample" && rest[0]) sample(rest[0]);
else { console.error("Usage: qa-cards.mjs lint [--pack id] [--jobs n] [--bin path] | mark <status> <id>... | sample <run-dir>"); process.exit(1); }
