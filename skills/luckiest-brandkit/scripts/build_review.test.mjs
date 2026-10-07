// Builds a review page from fake shots in a temp folder and checks what the user needs on it.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const BUILD = join(import.meta.dirname, "build_review.mjs");
const cli = (...a) => spawnSync(process.execPath, [BUILD, ...a], { encoding: "utf8" });

test("one card per shot, notes, picks, and export; contact sheet left out", () => {
  const out = mkdtempSync(join(tmpdir(), "brandkit-review-"));
  const final = join(out, "final");
  mkdirSync(final);
  for (const f of ["02-poster.png", "01-hat.png", "contact-sheet.png", "qa.md"]) writeFileSync(join(final, f), "x");

  const r = cli(final);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(JSON.parse(r.stdout).shots, 2);

  const html = readFileSync(join(out, "review.html"), "utf8");
  const files = [...html.matchAll(/data-file="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(files, ["01-hat.png", "02-poster.png"]);
  assert.match(html, /src="final\/01-hat\.png"/);
  assert.equal(html.match(/<textarea/g).length, 3); // one per shot + the set
  assert.equal(html.match(/value="reshoot"/g).length, 2);
  assert.match(html, /id="export"/);
  assert.match(html, /review-notes\.json/);
});

test("raw folder shows picks only, not the A/B variants", () => {
  const out = mkdtempSync(join(tmpdir(), "brandkit-review-"));
  const raw = join(out, "raw");
  mkdirSync(raw);
  for (const f of ["01-hat.png", "01-hat-a.png", "01-hat-b.png", "02-tote-bag.png"]) writeFileSync(join(raw, f), "x");
  assert.equal(cli(raw).status, 0);
  const html = readFileSync(join(out, "review.html"), "utf8");
  const files = [...html.matchAll(/data-file="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(files, ["01-hat.png", "02-tote-bag.png"]);
});

test("names with quotes or tags are escaped", () => {
  const dir = mkdtempSync(join(tmpdir(), "brandkit-review-"));
  writeFileSync(join(dir, `01-"a"<b>.png`), "x");
  assert.equal(cli(dir, "--output", join(dir, "r.html")).status, 0);
  const html = readFileSync(join(dir, "r.html"), "utf8");
  assert.doesNotMatch(html, /"a"<b>/);
  assert.match(html, /data-file="01-&#34;a&#34;&#60;b&#62;\.png"/);
});

test("empty folder fails", () => {
  assert.notEqual(cli(mkdtempSync(join(tmpdir(), "brandkit-review-"))).status, 0);
});
