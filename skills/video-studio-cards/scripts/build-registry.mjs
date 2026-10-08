#!/usr/bin/env node
// Scan packs/ for NN-slug pack folders, read each style.json, and write
// packs/registry.json: the index luckiest-video-studio reads to pick cards.
// Usage: node scripts/build-registry.mjs

import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const LIB = resolve(dirname(fileURLToPath(import.meta.url)), "../packs");

const packDirs = readdirSync(LIB)
  .filter((d) => /^\d\d-/.test(d) && statSync(join(LIB, d)).isDirectory())
  .sort();

const packs = [];
const warnings = [];
for (const dir of packDirs) {
  const manifestPath = join(LIB, dir, "style.json");
  if (!existsSync(manifestPath)) { warnings.push(`${dir}: no style.json`); continue; }
  let m;
  try { m = JSON.parse(readFileSync(manifestPath, "utf8")); }
  catch (e) { warnings.push(`${dir}: invalid style.json (${e.message})`); continue; }

  const cards = (m.cards ?? []).map((c) => {
    if (c.file && !existsSync(join(LIB, dir, c.file))) warnings.push(`${dir}: card file missing: ${c.file}`);
    return {
      id: c.id, pack: m.id, tier: c.tier, purpose: c.purpose, treatment: c.treatment ?? null,
      file: `${dir}/${c.file}`,
      slots: (c.slots ?? []).map((s) => s.name),
      duration: c.duration ?? null,
      qa: c.qa ?? "unchecked",
    };
  });

  packs.push({
    id: m.id, number: m.number, name: m.name, status: m.status ?? "draft",
    folder: dir, summary: m.inspiration ?? null,
    palette: m.palette ?? null, fonts: m.fonts ?? null,
    cardCount: cards.length,
    cards,
  });
}

const registry = {
  generated_by: "scripts/build-registry.mjs",
  packCount: packs.length,
  cardCount: packs.reduce((n, p) => n + p.cardCount, 0),
  tiers: ["tier1", "tier2", "custom"],
  packs,
  warnings,
};
writeFileSync(join(LIB, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
console.log(JSON.stringify({ packs: packs.length, cards: registry.cardCount, warnings }, null, 2));
