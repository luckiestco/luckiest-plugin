// Every gate runs on a control built to fail it and one built to pass it.
// Fixtures are tiny ffmpeg lavfi videos in a temp folder; nothing is downloaded.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  scanTokens, scanCrossfades, legibility, findPops, deadFrames, presence,
  beatSync, findAnchor, cutTimes, beatGrid, grayFrames, probe,
  faceCover, pairVerdict, parseWinner,
} from "./qa.mjs";

const dir = mkdtempSync(join(tmpdir(), "qa-gates-"));
const QA = join(import.meta.dirname, "qa.mjs");

// Concatenate solid-color segments ([color, seconds]) or lavfi sources into one mp4.
function video(name, parts, { fps = 30, size = "160x90" } = {}) {
  const out = join(dir, name);
  const ins = parts.map(([src, d], i) => (src.startsWith("testsrc") ? `${src}=size=${size}:rate=${fps}:duration=${d}` : `color=c=${src}:size=${size}:rate=${fps}:duration=${d}`) + `[v${i}]`);
  const graph = `${ins.join(";")};${parts.map((_, i) => `[v${i}]`).join("")}concat=n=${parts.length}:v=1:a=0,format=yuv420p[out]`;
  const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", "nullsrc=size=16x16:duration=0.01", "-filter_complex", graph, "-map", "[out]", "-c:v", "libx264", "-crf", "12", "-g", "1", out]);
  assert.equal(r.status, 0, r.stderr?.toString());
  return out;
}
const cli = (...a) => spawnSync(process.execPath, [QA, ...a], { encoding: "utf8" });

test("tokens: off-system values fail, system values pass", () => {
  const bad = `<style>.a{font-size:31px;border-radius:12px}</style><path stroke-width="3"/>`;
  const good = `<style>.a{font-size:30px;border-radius:22px}</style><path stroke-width="2.5"/>`;
  assert.deepEqual(scanTokens(bad).map((v) => v.kind), ["stroke", "type", "radius"]);
  assert.deepEqual(scanTokens(good), []);
  assert.deepEqual(scanTokens(`<style>.a{font-size:31px}</style>`, { stroke: [], type: [31], radius: [] }), []);
});

test("crossfade: tweening a full-frame layer's opacity fails, a cut or a small element passes", () => {
  const css = `<style>.layer{position:absolute;inset:0}.chip{width:200px;height:40px}</style>`;
  assert.equal(scanCrossfades(`${css}<script>tl.to(".layer",{opacity:0,duration:0.5},2);</script>`).length, 1);
  assert.equal(scanCrossfades(`${css}<script>tl.fromTo(".layer",{opacity:0},{opacity:1,duration:0.4},1);</script>`).length, 1);
  assert.equal(scanCrossfades(`${css}<script>tl.set(".layer",{opacity:0},2);</script>`).length, 0);
  assert.equal(scanCrossfades(`${css}<script>tl.to(".chip",{opacity:0,duration:0.5},2);</script>`).length, 0);
});

test("crossfade: the shipped reel and talk templates pass", () => {
  for (const f of ["../../luckiest-video-studio-reel/templates/reel.html", "../../luckiest-video-studio-talk/templates/talk-overlay.html"]) {
    assert.deepEqual(scanCrossfades(readFileSync(join(import.meta.dirname, f), "utf8")), [], f);
  }
});

test("legibility: an all-dim video fails, a bright test pattern passes", () => {
  assert.equal(legibility(video("dim.mp4", [["0x202020", 2]])).ok, false);
  assert.equal(legibility(video("bright.mp4", [["testsrc2", 2]])).ok, true);
});

test("pops: a one-frame flash is found, a clean hard cut is not", () => {
  const flash = video("flash.mp4", [["gray", 1], ["white", 1 / 30], ["gray", 1]]);
  const pops = findPops(grayFrames(flash), 30);
  assert.equal(pops.length, 1);
  assert.ok(Math.abs(pops[0].t - 1) < 0.07);
  assert.equal(findPops(grayFrames(video("cut.mp4", [["gray", 1], ["white", 1]])), 30).length, 0);
  assert.equal(cli("pops", flash).status, 1);
});

test("deadframes: black and long freezes fail, moving footage passes", () => {
  const r = deadFrames(video("black.mp4", [["testsrc2", 1], ["black", 0.5], ["testsrc2", 1]]));
  assert.equal(r.black.length, 1);
  assert.equal(deadFrames(video("frozen.mp4", [["0x808080", 4]]), { freeze: 3 }).freezes.length, 1);
  assert.equal(deadFrames(video("moving.mp4", [["testsrc2", 3]])).ok, true);
});

test("presence: the clip itself reads as on screen, a black final does not", () => {
  const run = join(dir, "run");
  mkdirSync(join(run, "footage"), { recursive: true });
  const clip = video("clip.mp4", [["testsrc2", 4]]);
  copyFileSync(clip, join(run, "footage/clean.mp4"));
  writeFileSync(join(run, "storyboard.json"), JSON.stringify({ scenes: [{ id: "talk", kind: "demo", duration: 4, source: "footage/clean.mp4", sourceStart: 0 }] }));
  copyFileSync(clip, join(run, "final.mp4"));
  assert.ok(presence(run).share > 0.9);
  copyFileSync(video("allblack.mp4", [["black", 4]]), join(run, "final.mp4"));
  assert.equal(presence(run).share, 0);
});

test("beatsync: anchors on their words pass, a late overlay and a missing phrase fail", () => {
  const words = [{ text: "Grow", start: 0.1, end: 0.4 }, { text: "something.", start: 0.4, end: 1 }, { text: "Start", start: 2.1, end: 2.4 }];
  assert.equal(findAnchor(words, "grow something"), 0.1);
  const plan = (t) => ({ scenes: [{ id: "s00", start: 0, anchor: "Grow something" }], events: [{ time: t, visual: "s00", anchor: "Start" }] });
  assert.equal(beatSync(plan(1.9), words).ok, true);
  assert.equal(beatSync(plan(2.6), words).ok, false);
  assert.equal(beatSync({ scenes: [{ id: "x", start: 0, anchor: "never said" }] }, words).ok, false);
});

test("beatgrid: cuts on the beat pass, cuts 0.1 s late fail", () => {
  const beat = 60 / 120; // 15 frames at 30 fps, so the fixture has no rounding drift
  const onGrid = video("grid.mp4", [["red", beat], ["blue", beat], ["red", beat], ["blue", beat]]);
  const { fps } = probe(onGrid);
  assert.equal(beatGrid(cutTimes(grayFrames(onGrid), fps), { bpm: 120 }).ok, true);
  const late = video("late.mp4", [["red", beat + 0.1], ["blue", beat], ["red", beat]]);
  assert.equal(beatGrid(cutTimes(grayFrames(late), fps), { bpm: 120 }).ok, false);
  assert.equal(cli("beatgrid", late, "--bpm", "120").status, 1);
});

test("face: the clip alone passes, a box over the face fails", () => {
  const run = join(dir, "facerun");
  mkdirSync(join(run, "footage"), { recursive: true });
  const clip = video("face-clip.mp4", [["testsrc2", 2]]);
  copyFileSync(clip, join(run, "footage/clean.mp4"));
  writeFileSync(join(run, "storyboard.json"), JSON.stringify({ scenes: [{ id: "talk", kind: "demo", duration: 2, source: "footage/clean.mp4", faceRect: [0.3, 0.2, 0.4, 0.5] }] }));
  copyFileSync(clip, join(run, "final.mp4"));
  assert.equal(faceCover(run).ok, true);
  const boxed = join(dir, "face-boxed.mp4");
  const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", clip, "-vf", "drawbox=x=iw*0.3:y=ih*0.2:w=iw*0.4:h=ih*0.5:color=white:t=fill", "-c:v", "libx264", "-crf", "12", boxed]);
  assert.equal(r.status, 0, r.stderr?.toString());
  copyFileSync(boxed, join(run, "final.mp4"));
  assert.equal(faceCover(run).ok, false);
  assert.equal(cli("face", run).status, 1);
});

test("judge: new is kept only when it wins with the order swapped", () => {
  assert.equal(pairVerdict("A", "B").keep, true);
  assert.equal(pairVerdict("A", "A").keep, false); // always picks the first shown
  assert.equal(pairVerdict("B", "B").keep, false); // always picks the second shown
  assert.equal(pairVerdict("B", "A").keep, false);
  assert.equal(pairVerdict("A", "A").consistent, false);
  assert.equal(parseWinner("A is cleaner.\nWINNER: b"), "B");
  assert.equal(parseWinner("no verdict"), null);
});

test("judge CLI: pending without a verdict, keeps or rejects with verdicts, fake judge command", () => {
  const n = video("j-new.mp4", [["testsrc2", 1]]), o = video("j-old.mp4", [["gray", 1]]), out = join(dir, "judge");
  assert.equal(cli("judge", n, o, "--out", out).status, 2);
  assert.equal(cli("judge", n, o, "--out", out, "--verdicts", "A,B").status, 0);
  assert.equal(cli("judge", n, o, "--out", out, "--verdicts", "A,A").status, 1);
  assert.equal(cli("judge", n, o, "--out", out, "--cmd", "echo WINNER: A").status, 1); // first-position bias
});
