// spring.js stays a pure function of time: any frame renders alone, in any order,
// and a value that changes target keeps moving without a jump.
import test from "node:test";
import assert from "node:assert/strict";
await import("./spring.js");
const { spring, track, settleTime, PRESETS } = globalThis.Spring;

const sample = (f, dur, fps = 60) => Array.from({ length: Math.round(dur * fps) + 1 }, (_, i) => f(i / fps));

test("spring starts at from, ends at to, and every damping case converges", () => {
  for (const cfg of [PRESETS.snappy, PRESETS.default, PRESETS.heavy, PRESETS.playful, { stiffness: 170, damping: 2 * Math.sqrt(170) }]) {
    assert.equal(spring(0, { ...cfg, from: 10, to: 110 }), 10);
    assert.equal(spring(-1, { ...cfg, from: 10, to: 110 }), 10);
    assert.ok(Math.abs(spring(5, { ...cfg, from: 10, to: 110 }) - 110) < 0.01, JSON.stringify(cfg));
  }
});

test("presets: heavy never overshoots, playful visibly does, snappy barely does", () => {
  const peak = (p) => Math.max(...sample((t) => spring(t, { ...PRESETS[p], from: 0, to: 100 }), 2));
  assert.ok(peak("heavy") <= 100);
  assert.ok(peak("playful") > 110);
  assert.ok(peak("snappy") < 102);
});

test("track: retargeting keeps velocity continuous; restarting from rest would not", () => {
  const keys = [{ t: 0, value: 0 }, { t: 0.15, value: 100 }, { t: 0.3, value: -40 }];
  const x = (t) => track(t, keys, PRESETS.default);
  const v = (t) => (x(t + 1e-4) - x(t - 1e-4)) / 2e-4;
  const vBefore = (x(0.3) - x(0.3 - 1e-4)) / 1e-4, vAfter = (x(0.3 + 1e-4) - x(0.3)) / 1e-4;
  assert.ok(Math.abs(vBefore) > 100, "the value is moving when the target changes");
  assert.ok(Math.abs(vAfter - vBefore) < Math.abs(vBefore) * 0.02, `velocity ${vBefore} -> ${vAfter}`);
  // A restart (new spring from the current value at zero speed) stops dead: the jump this test guards against.
  const restart = (t) => (t < 0.3 ? x(t) : spring(t - 0.3, { ...PRESETS.default, from: x(0.3), to: -40 }));
  const rAfter = (restart(0.3 + 1e-4) - restart(0.3)) / 1e-4;
  assert.ok(Math.abs(rAfter - vBefore) > Math.abs(vBefore) * 0.5);
  assert.ok(Math.abs(x(4) + 40) < 0.01);
  assert.ok(Number.isFinite(v(0.15)));
});

test("track: frames rendered out of order match frames rendered in order", () => {
  const keys = [{ t: 0, value: 0 }, { t: 0.2, value: 50 }, { t: 0.5, value: 20 }];
  const times = Array.from({ length: 60 }, (_, i) => i / 60);
  const inOrder = times.map((t) => track(t, keys, PRESETS.snappy));
  const shuffled = [...times].sort((a, b) => Math.sin(a * 999) - Math.sin(b * 999));
  for (const t of shuffled) assert.equal(track(t, keys, PRESETS.snappy), inOrder[times.indexOf(t)]);
});

test("settleTime: heavier springs take longer to settle", () => {
  assert.ok(settleTime(PRESETS.snappy) < settleTime(PRESETS.heavy));
  assert.ok(settleTime(PRESETS.default) > 0.2 && settleTime(PRESETS.default) < 2);
});
