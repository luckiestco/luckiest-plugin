import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { brandTokens, hexToRgb, matchFonts } from "./apply-brand.mjs";

const brand = { paper: "#101010", paper2: "#181818", ink: "#F7F4EE", muted: "#9A9A9A",
  accent: "#FF4D00", display: "Instrument Serif", text: "Geist", mono: "Geist Mono" };

test("hexToRgb handles long, short, and bad input", () => {
  assert.equal(hexToRgb("#FF4D00"), "255, 77, 0");
  assert.equal(hexToRgb("#fff"), "255, 255, 255");
  assert.equal(hexToRgb("rgba(1,2,3,1)"), null);
});

test("brandTokens rewrites mapped variables and leaves the rest", () => {
  const css = ":root {\n  --accent: #4F8CFF;\n  --accent-rgb: 79, 140, 255;\n  --canvas: #0A0E14;\n  --radius: 28px;\n}\n";
  const map = { "--accent": "accent", "--accent-rgb": "rgb:accent", "--canvas": "paper", "--missing": "ink" };
  const out = brandTokens(css, map, brand);
  assert.match(out.css, /--accent: #FF4D00;/);
  assert.match(out.css, /--accent-rgb: 255, 77, 0;/);
  assert.match(out.css, /--canvas: #101010;/);
  assert.match(out.css, /--radius: 28px;/);
  assert.deepEqual(out.skipped, ["--missing"]);
});

test("accent-only keeps the pack surfaces", () => {
  const css = ":root {\n  --accent: #4F8CFF;\n  --canvas: #0A0E14;\n}\n";
  const out = brandTokens(css, { "--accent": "accent", "--canvas": "paper" }, brand, { accentOnly: true });
  assert.match(out.css, /--accent: #FF4D00;/);
  assert.match(out.css, /--canvas: #0A0E14;/);
});

test("fonts become a family stack and local @font-face rules", () => {
  const fonts = matchFonts(["InstrumentSerif-Regular.woff2", "Geist-Variable.ttf", "notes.txt"], brand);
  assert.deepEqual(fonts.map((f) => f.file), ["InstrumentSerif-Regular.woff2", "Geist-Variable.ttf"]);
  const out = brandTokens(":root {\n  --font-display: \"Fraunces\", serif;\n}\n", { "--font-display": "font:display" }, brand, { fonts });
  assert.match(out.css, /--font-display: "Instrument Serif", system-ui, sans-serif;/);
  assert.match(out.css, /@font-face \{ font-family: "Instrument Serif"; src: url\("\.\.\/\.\.\/assets\/fonts\/InstrumentSerif-Regular\.woff2"\)/);
  assert.doesNotMatch(out.css, /https?:\/\//);
});

test("CLI brands every shipped pack from a run's brand.json", () => {
  const run = mkdtempSync(join(tmpdir(), "cards-brand-"));
  writeFileSync(join(run, "brand.json"), JSON.stringify(brand));
  for (const pack of ["paper-collage", "aurora-glass"]) {
    const r = spawnSync(process.execPath, [join(import.meta.dirname, "apply-brand.mjs"), run, pack], { encoding: "utf8" });
    assert.equal(r.status, 0, r.stderr);
    const tokens = readFileSync(join(run, "composition/cards", pack, "tokens.css"), "utf8");
    assert.match(tokens, /#FF4D00/, `${pack} did not take the brand accent`);
    assert.doesNotMatch(tokens, /#4F8CFF/i, `${pack} still holds the default accent`);
  }
});

test("CLI fails without brand.json", () => {
  const run = mkdtempSync(join(tmpdir(), "cards-brand-"));
  mkdirSync(join(run, "composition"));
  const r = spawnSync(process.execPath, [join(import.meta.dirname, "apply-brand.mjs"), run, "aurora-glass"], { encoding: "utf8" });
  assert.equal(r.status, 1);
});
