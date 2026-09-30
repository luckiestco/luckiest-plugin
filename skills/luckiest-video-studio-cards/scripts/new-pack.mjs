#!/usr/bin/env node
// Scaffold a new card pack by cloning packs/_blueprint/ and substituting the id.
// Usage: node scripts/new-pack.mjs <NN> <slug> ["Human Name"]
//   e.g. node scripts/new-pack.mjs 03 ink-grid "Ink Grid"

import { cpSync, existsSync, readFileSync, writeFileSync, renameSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { argv, exit } from "node:process";

const LIB = resolve(dirname(fileURLToPath(import.meta.url)), "../packs");
const [, , numRaw, slug, ...nameParts] = argv;
if (!numRaw || !slug) { console.error('Usage: new-pack.mjs <NN> <slug> ["Human Name"]'); exit(1); }
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) { console.error("slug must be kebab-case"); exit(1); }

const num = String(numRaw).padStart(2, "0");
const id = slug;
const name = nameParts.join(" ") || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const dest = join(LIB, `${num}-${slug}`);
if (existsSync(dest)) { console.error(`already exists: ${dest}`); exit(1); }

cpSync(join(LIB, "_blueprint"), dest, { recursive: true });

// substitute STYLE_ID / NN / name placeholders in text files
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(json|css|md|html)$/.test(entry)) continue;
    let txt = readFileSync(p, "utf8");
    const next = txt.replaceAll("STYLE_ID", id).replaceAll('"number": "NN"', `"number": "${num}"`).replaceAll("Human Readable Style Name", name);
    if (next !== txt) writeFileSync(p, next);
  }
}
walk(dest);

// rename the example card files to be style-scoped (optional convenience)
console.log(JSON.stringify({ created: dest, id, number: num, name, next: [
  `1. fill DESIGN.md, tokens.css, and style.json identity fields`,
  `2. build cards under packs/${num}-${slug}/cards/`,
  `3. node scripts/build-registry.mjs`,
] }, null, 2));
