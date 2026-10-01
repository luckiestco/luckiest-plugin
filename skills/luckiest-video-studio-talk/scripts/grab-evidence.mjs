#!/usr/bin/env node
// Screenshot the real pages a talk names, so scenes show evidence instead of mock UI.
//
//   node grab-evidence.mjs <out-dir> <url> [url...] [--full]
//
// Writes <out-dir>/<host>-<n>.png per URL plus evidence.json (url, file, time) so every
// frame of evidence traces back to a source. Uses the Playwright CLI already on this
// machine (`playwright` or a local npx install); it never installs anything.
// Read every screenshot before it goes in a scene: blur emails, keys, and names that are not the user's.

import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const full = args.includes("--full");
const [out, ...urls] = args.filter((a) => a !== "--full");
if (!out || !urls.length) { console.error("Usage: grab-evidence.mjs <out-dir> <url> [url...] [--full]"); process.exit(1); }

const runners = [["playwright"], ["npx", "--no-install", "playwright"]];
const runner = runners.find(([cmd, ...pre]) => spawnSync(cmd, [...pre, "--version"], { encoding: "utf8" }).status === 0);
if (!runner) { console.error("Playwright CLI not found. Install it yourself (pip install playwright or npm i -D playwright), then run `playwright install chromium`."); process.exit(1); }

mkdirSync(out, { recursive: true });
const rows = [];
urls.forEach((url, i) => {
  let host;
  try { const u = new URL(url); if (!/^https?:$/.test(u.protocol)) throw 0; host = u.hostname.replace(/[^a-z0-9.-]/gi, ""); }
  catch { rows.push({ url, ok: false, error: "not an http(s) URL" }); return; }
  const file = join(out, `${host}-${i + 1}.png`);
  const [cmd, ...pre] = runner;
  const r = spawnSync(cmd, [...pre, "screenshot", "--viewport-size=1920,1080", "--wait-for-timeout=1500", ...(full ? ["--full-page"] : []), url, file], { encoding: "utf8", timeout: 90_000 });
  const ok = r.status === 0 && existsSync(file) && statSync(file).size > 0;
  rows.push({ url, file, ok, captured: new Date().toISOString(), ...(ok ? {} : { error: (r.stderr || "screenshot failed").trim().slice(0, 300) }) });
});
writeFileSync(join(out, "evidence.json"), JSON.stringify(rows, null, 2));
console.log(JSON.stringify(rows, null, 2));
process.exitCode = rows.every((r) => r.ok) ? 0 : 1;
