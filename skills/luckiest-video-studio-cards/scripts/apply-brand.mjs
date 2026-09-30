#!/usr/bin/env node
// Copy a card pack into a run and rewrite its tokens.css from the run's brand.json.
//
// Usage: node apply-brand.mjs <run-dir> <pack-id> [--accent-only]
//   Writes <run-dir>/composition/cards/<pack-id>/ (tokens.css, style.json, DESIGN.md, cards/).
//   --accent-only keeps the pack's own surfaces and text colors and takes only the
//   accent and fonts from brand.json (use it when the brand's paper is light and the
//   pack is dark, or the other way round).
//
// Which brand role feeds which variable lives in the pack's style.json "brandMap":
//   "paper" | "paper2" | "ink" | "muted" | "accent" | "rule"  -> the color
//   "rgb:<role>"                                               -> "r, g, b" of that color
//   "font:display" | "font:text" | "font:mono"                 -> a font-family stack
// Fonts found in <run-dir>/composition/assets/fonts/ get @font-face rules; nothing loads remotely.

import { cpSync, existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const PACKS = resolve(dirname(fileURLToPath(import.meta.url)), "../packs");
const ACCENT_ONLY = new Set(["accent", "rgb:accent", "font:display", "font:text", "font:mono"]);
const FALLBACK = { display: "system-ui, sans-serif", text: "system-ui, sans-serif", mono: "ui-monospace, monospace" };
const FONT_EXT = new Set([".woff2", ".woff", ".ttf", ".otf"]);

export function hexToRgb(color) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(color).trim());
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(", ");
}

// Pure: returns the new tokens.css text and what changed.
export function brandTokens(css, brandMap, brand, { accentOnly = false, fonts = [] } = {}) {
  const changed = [], skipped = [];
  for (const [varName, role] of Object.entries(brandMap)) {
    if (accentOnly && !ACCENT_ONLY.has(role)) continue;
    let value;
    if (role.startsWith("rgb:")) value = hexToRgb(brand[role.slice(4)] ?? "");
    else if (role.startsWith("font:")) {
      const key = role.slice(5), fam = brand[key];
      value = fam ? `"${fam}", ${FALLBACK[key]}` : null;
    } else value = brand[role] ?? null;
    if (!value) { skipped.push(varName); continue; }
    const re = new RegExp(`(^\\s*${varName.replace(/-/g, "\\-")}\\s*:)[^;]*;`, "m");
    if (!re.test(css)) { skipped.push(varName); continue; }
    css = css.replace(re, `$1 ${value};`);
    changed.push(varName);
  }
  const faces = fonts.map(({ family, file }) =>
    `@font-face { font-family: "${family}"; src: url("../../assets/fonts/${file}"); font-display: block; }`);
  if (faces.length) css = `/* Brand fonts, local files only. */\n${faces.join("\n")}\n\n${css}`;
  return { css, changed, skipped };
}

// Match font files to brand families by name: "Instrument Serif" -> InstrumentSerif-Regular.woff2.
export function matchFonts(files, brand) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const out = [];
  for (const key of ["display", "text", "mono"]) {
    const fam = brand[key];
    if (!fam) continue;
    for (const f of files) if (FONT_EXT.has(extname(f).toLowerCase()) && norm(basename(f)).startsWith(norm(fam))) out.push({ family: fam, file: f });
  }
  return out.filter((x, i) => out.findIndex((y) => y.file === x.file) === i);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [runArg, packId, ...flags] = process.argv.slice(2);
  if (!runArg || !packId) { console.error("Usage: apply-brand.mjs <run-dir> <pack-id> [--accent-only]"); process.exit(1); }
  const run = resolve(runArg);
  const folder = readdirSync(PACKS).find((d) => d === packId || d.replace(/^\d\d-/, "") === packId);
  if (!folder) { console.error(`no pack ${packId} in ${PACKS}`); process.exit(1); }
  const brandPath = join(run, "brand.json");
  if (!existsSync(brandPath)) { console.error(`missing ${brandPath}; write it first (references/brand.md)`); process.exit(1); }
  const brand = JSON.parse(readFileSync(brandPath, "utf8"));
  const manifest = JSON.parse(readFileSync(join(PACKS, folder, "style.json"), "utf8"));
  if (!manifest.brandMap) { console.error(`${folder}/style.json has no brandMap`); process.exit(1); }

  const id = folder.replace(/^\d\d-/, "");
  const dest = join(run, "composition", "cards", id);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(join(PACKS, folder), dest, { recursive: true });

  const fontDir = join(run, "composition", "assets", "fonts");
  const fonts = existsSync(fontDir) ? matchFonts(readdirSync(fontDir), brand) : [];
  const tokensPath = join(dest, "tokens.css");
  const result = brandTokens(readFileSync(tokensPath, "utf8"), manifest.brandMap, brand, { accentOnly: flags.includes("--accent-only"), fonts });
  writeFileSync(tokensPath, result.css);
  console.log(JSON.stringify({ pack: id, dest, changed: result.changed, skipped: result.skipped, fonts: fonts.map((f) => f.file) }, null, 2));
}
