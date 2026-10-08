import { test } from "node:test";
import assert from "node:assert/strict";
import { buildReel } from "./build-reel.mjs";

const sb = {
  title: "Acme launch",
  format: { width: 1920, height: 1080, fps: 30 },
  music: { file: "audio/bed.mp3", volume: 0.3 },
  scenes: [
    { id: "hook", kind: "motion", duration: 2.5, line: "Your invoices, done", variables: { headline: "Done in one click", accent: "#5B5BF7", logo: "brand/logo.svg", nested: { a: 1 } } },
    { id: "create-invoice", kind: "demo", duration: 6, source: "demo/create.mp4" },
    { id: "logo-close", kind: "logo", recipe: "piece-assembly", duration: 3, assets: ["brand/logo.svg"] },
  ],
};

test("scenes keep storyboard ids and cover 0 to duration with no gaps", () => {
  const reel = buildReel(sb, "/runs/Video-Studio-Output");
  assert.equal(reel.id, "acme-launch-video-studio-output");
  assert.equal(reel.src, "final.mp4");
  assert.deepEqual([reel.w, reel.h, reel.fps], [1920, 1080, 30]);
  assert.deepEqual(reel.scenes.map((s) => [s.id, s.t]), [["hook", [0, 2.5]], ["create-invoice", [2.5, 8.5]], ["logo-close", [8.5, 11.5]]]);
  assert.equal(reel.duration, 11.5);
  assert.equal(buildReel(sb, "/r", 0, 11.533).duration, 11.533);
});

test("variables become typed fields, nested values are skipped", () => {
  const { props, label, box } = buildReel(sb, "/r").scenes[0].els[0];
  assert.equal(label, "Your invoices, done");
  assert.equal(box, null);
  assert.deepEqual(Object.fromEntries(Object.entries(props).map(([k, p]) => [k, p.type])), { headline: "text", accent: "color", logo: "media", motion: "motion" });
  assert.equal(props.headline.v, "Done in one click");
  assert.equal(props.accent.v, "brand.c1");
});

test("hex values become one shared palette entry each", () => {
  const two = { ...sb, scenes: [sb.scenes[0], { id: "cta", kind: "motion", duration: 2, variables: { bg: "#5b5bf7", ink: "#111111" } }] };
  const reel = buildReel(two, "/r");
  assert.deepEqual(reel.brand.colors, [{ id: "c1", name: "Accent", v: "#5B5BF7" }, { id: "c2", name: "Ink", v: "#111111" }]);
  assert.deepEqual(Object.values(reel.scenes[1].els[0].props).filter((p) => p.type === "color").map((p) => p.v), ["brand.c1", "brand.c2"]);
});

test("demo footage, scene assets and music are listed once as assets", () => {
  const reel = buildReel(sb, "/r");
  assert.deepEqual(reel.assets.map((a) => [a.id, a.type]), [["brand/logo.svg", "image"], ["demo/create.mp4", "video"], ["audio/bed.mp3", "audio"]]);
  assert.equal(reel.scenes[1].els[0].props.source.v, "demo/create.mp4");
  assert.equal(reel.scenes[2].els[0].props.motion.v, "logo, piece-assembly");
  assert.equal(reel.audio.music, "audio/bed.mp3");
});

test("Claude's review notes are pinned with ids and a Claude: prefix", () => {
  const { notes } = buildReel(sb, "/r", 0, 0, [{ t: 1.2, x: 30, y: 70, text: "Headline sits on the logo", scene: "hook" }, { t: 9, text: "Outro feels long" }]);
  assert.deepEqual(notes, [
    { id: 1, t: 1.2, x: 30, y: 70, el: "hook", text: "Claude: Headline sits on the logo" },
    { id: 2, t: 9, x: 50, y: 50, el: null, text: "Claude: Outro feels long" },
  ]);
  assert.deepEqual(buildReel(sb, "/r").notes, []);
});

test("rerunning bumps the version so an open player reloads", () => {
  assert.equal(buildReel(sb, "/r").version, 1);
  assert.equal(buildReel(sb, "/r", 4).version, 5);
});
