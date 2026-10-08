// Every gate runs on a control built to fail it and one built to pass it.
// Fixtures are tiny ffmpeg lavfi videos in a temp folder; nothing is downloaded.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  scanTokens, scanCrossfades, scanMotion, legibility, findPops, deadFrames, presence,
  beatSync, findAnchor, cutTimes, beatGrid, grayFrames, probe,
  faceCover, pairVerdict, parseWinner, audioOnsets, avSync, visibleText, scanFacts, loopCheck,
  fullFrameSelectors, safeAreas,
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

test("motion: ease-in entrances, scale 0 cards, and short linear moves fail; visible moves and pops pass", () => {
  const rules = (js) => scanMotion(`<script>${js}</script>`).map((v) => v.rule);
  assert.deepEqual(rules(`tl.from(".card",{autoAlpha:0,y:40,duration:0.5,ease:"power2.in"},0);`), ["ease-in-entrance"]);
  assert.deepEqual(rules(`tl.from(".card",{scale:0,duration:0.5,ease:"power3.out"},0);`), ["scale-zero"]);
  assert.deepEqual(rules(`tl.fromTo(".card",{autoAlpha:0,x:-80},{autoAlpha:1,x:0,duration:0.6,ease:"none"},0);`), ["linear-entrance"]);
  assert.deepEqual(rules(`tl.from(".card",{autoAlpha:0,scale:0.95,duration:0.5,ease:"power3.out"},0);`), []);
  assert.deepEqual(rules(`tl.from(".dot",{scale:0,duration:0.3,ease:"back.out(1.6)"},0);`), []);
  assert.deepEqual(rules(`tl.fromTo(".ball",{y:-400},{y:0,duration:0.5,ease:"power2.in"},0);`), []);
  assert.deepEqual(rules(`tl.fromTo(".stage",{scale:1},{scale:1.06,duration:6,ease:"none"},0);`), []);
  assert.equal(cli("motion", join(import.meta.dirname, "../../luckiest-video-studio-reel/templates/reel.html")).status, 0);
  const bad = join(dir, "motion-bad.html");
  writeFileSync(bad, `<script>\ntl.from(".card",{scale:0,ease:"power2.in"});</script>`);
  const r = cli("motion", bad);
  assert.equal(r.status, 1);
  assert.match(JSON.parse(r.stdout).found[0].file, /motion-bad\.html:2$/);
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

// Gray video with a 50 ms tone burst starting at each time in `hits`.
function withHits(name, hits, d = 2) {
  const out = join(dir, name);
  const expr = hits.length ? hits.map((h) => `between(t,${h},${h + 0.05})`).join("+") : "0";
  const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", `color=c=gray:size=160x90:rate=30:duration=${d}`,
    "-f", "lavfi", "-i", `aevalsrc='0.8*(${expr})*sin(2*PI*1000*t)':s=48000:d=${d}`,
    "-c:v", "libx264", "-crf", "12", "-c:a", "aac", "-shortest", out]);
  assert.equal(r.status, 0, r.stderr?.toString());
  return out;
}

test("avsync: hits on time pass; a hit 3 frames late, no audio, or the wrong length fail", () => {
  const clip = withHits("hits.mp4", [0.5, 1.2]);
  const on = audioOnsets(clip);
  assert.ok(on.some((t) => Math.abs(t - 0.5) < 1 / 30) && on.some((t) => Math.abs(t - 1.2) < 1 / 30), JSON.stringify(on));
  assert.equal(avSync(clip, { expect: [0.5, 1.2], duration: 2 }).ok, true);
  const late = avSync(clip, { expect: [0.5, 1.1] });
  assert.equal(late.ok, false);
  assert.equal(late.hits.filter((h) => !h.ok).length, 1);
  assert.equal(avSync(clip, { duration: 3 }).ok, false);
  const silent = avSync(video("noaudio.mp4", [["gray", 1]]));
  assert.equal(silent.ok, false);
  assert.equal(silent.audio, false);
  assert.equal(cli("avsync", clip, "--expect", "0.5,1.1").status, 1);
  assert.equal(cli("avsync", clip, "--expect", "0.5,1.2", "--duration", "2").status, 0);
});

test("facts: on-screen numbers must be story facts; code numbers and single digits are ignored; em dashes fail", () => {
  const html = `<style>.t{font-size:84px;letter-spacing:-0.02em}</style>
    <template><div class="t" data-start="1.25">3 unpaid, $4,792.44 total</div><p>INV-0043 opened twice</p></template>
    <script>tl.to(".t", { y: 120, duration: 0.35 }, 2.5);</script>`;
  assert.equal(visibleText(html).replace(/\s+/g, " ").trim(), "3 unpaid, $4,792.44 total INV-0043 opened twice");
  const facts = ["3 unpaid invoices, $4,792.44 total", "Maya Chen INV-0043 $781.94"];
  assert.deepEqual(scanFacts([{ where: "a.html", text: visibleText(html) }], facts), []);
  const drift = scanFacts([{ where: "b.html", text: "Total $4,792.40, up 12% since INV-0044" }], facts);
  assert.deepEqual(drift.map((f) => f.token), ["$4,792.40", "12%", "INV-0044"]);
  assert.deepEqual(scanFacts([{ where: "c.html", text: "Fast \u2014 and free" }], facts).map((f) => f.rule), ["em-dash"]);
  assert.deepEqual(scanFacts([{ where: "d.html", text: visibleText("<p>Fast &mdash; free</p>") }], facts).map((f) => f.rule), ["em-dash"]);
  const run = join(dir, "factsrun");
  mkdirSync(join(run, "composition/compositions"), { recursive: true });
  writeFileSync(join(run, "composition/compositions/hook.html"), "<p>Paid $2,860.50</p>");
  writeFileSync(join(run, "storyboard.json"), JSON.stringify({ facts: ["Nair Dental $2,860.50"], scenes: [{ id: "hook", kind: "motion", duration: 2, line: "Paid $2,860.50", variables: { value: "3x" } }] }));
  assert.equal(cli("facts", run).status, 0);
  writeFileSync(join(run, "composition/compositions/hook.html"), "<p>Paid $2,680.50</p>");
  const r = cli("facts", run);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /2,680\.50/);
});

test("loop: last frame matching the first passes, a different end frame fails", () => {
  const loops = video("loops.mp4", [["0x3050a0", 0.5], ["0xa05030", 0.5], ["0x3050a0", 0.5]]);
  assert.equal(loopCheck(loops).ok, true);
  const ends = video("ends.mp4", [["0x3050a0", 0.5], ["0xa05030", 1]]);
  assert.equal(loopCheck(ends).ok, false);
  assert.equal(cli("loop", ends).status, 1);
});

test("crossfade: a full-frame layer is found at the composition's own size, not only 1920x1080", () => {
  const html = `<div data-composition-id="m" data-width="1080" data-height="1920"></div><style>.bg{width:1080px;height:1920px}.v{width:var(--w);height:var(--h)}.wide{width:1920px;height:1080px}</style>`;
  assert.deepEqual([...fullFrameSelectors(html)], [".bg", ".v"]);
});

test("safe: sharp content in vertical's covered bottom fails, the same content in the safe area passes", () => {
  // A 320x180 test pattern (sharp text and bars) on a plain vertical frame.
  const place = (name, y) => {
    const run = join(dir, name);
    mkdirSync(run, { recursive: true });
    const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", "color=c=0xf3efe6:size=1080x1920:rate=30:duration=1", "-f", "lavfi", "-i", "testsrc2=size=320x180:rate=30:duration=1",
      "-filter_complex", `[0][1]overlay=x=380:y=${y},format=yuv420p`, "-c:v", "libx264", "-crf", "12", join(run, "final-vertical.mp4")]);
    assert.equal(r.status, 0, r.stderr?.toString());
    writeFileSync(join(run, "storyboard.json"), JSON.stringify({ format: { width: 1920, height: 1080, fps: 30 }, formats: ["vertical"], scenes: [{ id: "end", kind: "motion", duration: 1 }] }));
    return run;
  };
  const low = safeAreas(place("safe-low", 1500));
  assert.equal(low.ok, false);
  assert.ok(low.hits.every((h) => h.side === "bottom" && h.format === "vertical"), JSON.stringify(low.hits));
  assert.equal(safeAreas(place("safe-mid", 700)).ok, true);
  assert.equal(cli("safe", join(dir, "safe-low")).status, 1);
});

test("safe --stills reads the hold-frame PNGs from render-scenes --stills, no final needed", () => {
  const place = (name, y) => {
    const run = join(dir, name);
    mkdirSync(join(run, "stills/vertical"), { recursive: true });
    const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", "color=c=0xf3efe6:size=1080x1920", "-f", "lavfi", "-i", "testsrc2=size=320x180",
      "-filter_complex", `[0][1]overlay=x=380:y=${y}`, "-frames:v", "1", join(run, "stills/vertical/01-end.png")]);
    assert.equal(r.status, 0, r.stderr?.toString());
    writeFileSync(join(run, "storyboard.json"), JSON.stringify({ format: { width: 1920, height: 1080, fps: 30 }, formats: ["vertical"], scenes: [{ id: "end", kind: "motion", duration: 1 }] }));
    return run;
  };
  const low = safeAreas(place("stills-low", 1500), { stills: true });
  assert.equal(low.ok, false);
  assert.deepEqual(low.hits.map((h) => h.side), ["bottom"]);
  assert.equal(safeAreas(place("stills-mid", 700), { stills: true }).ok, true);
  assert.equal(cli("safe", join(dir, "stills-low"), "--stills").status, 1);
});
