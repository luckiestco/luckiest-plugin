import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const script = new URL("./find-cut-candidates.mjs", import.meta.url).pathname;

function run(words) {
  const dir = mkdtempSync(join(tmpdir(), "cuts-"));
  const file = join(dir, "clip.json");
  writeFileSync(file, JSON.stringify(words));
  execFileSync(process.execPath, [script, file, "--out-dir", dir]);
  return JSON.parse(readFileSync(join(dir, "clip.cut-candidates.json"), "utf8")).candidates;
}
// Words from [text, start, end] tuples.
const w = (rows) => rows.map(([text, start, end]) => ({ text, start, end }));

test("a filler with silence on both sides is cut", () => {
  const [c] = run(w([["So", 0, 0.3], ["um", 0.6, 0.8], ["here", 1.1, 1.4], ["it", 1.45, 1.6], ["is.", 1.65, 1.9]]));
  assert.equal(c.type, "filler");
  assert.equal(c.recommend, "cut");
});

test("a filler run into the next word stays", () => {
  const [c] = run(w([["So", 0, 0.3], ["um", 0.33, 0.5], ["here", 0.52, 0.8], ["it", 0.85, 1], ["is.", 1.05, 1.3]]));
  assert.equal(c.type, "filler");
  assert.equal(c.recommend, "keep");
});

test("a stutter at a phrase start is still cut", () => {
  const [c] = run(w([["Ready.", 0, 0.4], ["The", 0.9, 1], ["the", 1.05, 1.2], ["plan", 1.25, 1.6], ["works.", 1.65, 2]]));
  assert.equal(c.type, "stutter");
  assert.equal(c.recommend, "cut");
});

test("a stutter inside one breath goes to review", () => {
  const [c] = run(w([["First,", 0, 0.3], ["the", 0.33, 0.45], ["the", 0.48, 0.6], ["plan", 0.63, 1], ["works.", 1.05, 1.4]]));
  assert.equal(c.type, "stutter");
  assert.equal(c.recommend, "review");
  assert.equal(c.insidePhrase, true);
});
