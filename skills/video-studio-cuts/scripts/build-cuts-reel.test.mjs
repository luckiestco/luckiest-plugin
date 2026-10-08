import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCutsReel } from "./build-cuts-reel.mjs";

// Source: speech 0.2-2.0, a 1.5s pause trimmed to a breath, speech 3.3-5.0.
const edl = {
  source_duration: 5.3, edited_duration: 4.0,
  keep_ranges: [{ start: 0, end: 2.14 }, { start: 3.44, end: 5.3 }],
  delete_ranges: [{ start: 2.14, end: 3.44, reasons: ["long pause"] }],
};
const words = [
  { text: "Hi", start: 0.2, end: 0.4 }, { text: "there.", start: 0.5, end: 2.0 },
  { text: "Meet", start: 2.28, end: 2.6 }, { text: "Acme.", start: 2.7, end: 3.8 },
];
const opts = { dir: "/run/footage", src: "silenced.mp4" };

test("one scene per kept range, back to back on the edited timeline", () => {
  const reel = buildCutsReel(edl, words, opts);
  assert.deepEqual(reel.scenes.map((s) => [s.id, s.t]), [["K1", [0, 2.14]], ["K2", [2.14, 4]]]);
  assert.equal(reel.duration, 4);
  assert.equal(reel.src, "silenced.mp4");
  assert.equal(reel.id, "cuts-footage");
});

test("each scene shows its words and the pause cut before it", () => {
  const [k1, k2] = buildCutsReel(edl, words, opts).scenes.map((s) => s.els[0].props);
  assert.equal(k1.words.v, "Hi there.");
  assert.equal(k1.cut, undefined);
  assert.equal(k2.words.v, "Meet Acme.");
  assert.equal(k2.cut.v, "1.30s pause at 2.14s, long pause");
});

test("rerunning bumps the version", () => {
  assert.equal(buildCutsReel(edl, words, { ...opts, prevVersion: 2 }).version, 3);
});
