// Closed-form springs for HyperFrames scenes. Every value is a pure function of time,
// so any frame renders alone and seeking works in both directions.
// Copy into composition/assets/js/ and load once in index.html: <script src="assets/js/spring.js"></script>
//
//   Spring.spring(t, { from: 0, to: 1, ...Spring.PRESETS.default })   value t seconds after the move starts
//   Spring.track(t, [{ t: 0, value: 0 }, { t: 1.2, value: 80 }, { t: 1.5, value: 20 }], Spring.PRESETS.snappy)
//       a value that changes target: one spring per change, summed, so it never jumps or stops dead
//   Spring.settleTime(Spring.PRESETS.heavy)                          seconds until within 0.1% of the move
//
// Drive it from the scene's clock tween: tl.to(clock, { t: dur, ease: "none", onUpdate: () => el.style.transform = ... }, 0)
(function (g) {
  // stiffness and damping per unit mass. Overshoot: snappy ~0.2%, default none, heavy none, playful ~30%.
  const PRESETS = {
    snappy: { stiffness: 500, damping: 40 },  // UI: buttons, toggles, leading edges
    default: { stiffness: 170, damping: 26 }, // cards, containers, camera
    heavy: { stiffness: 120, damping: 24 },   // big type, 3D objects, logo lockups
    playful: { stiffness: 300, damping: 12 }, // mascots, stickers; never on type, money, or security
  };

  // Unit step response: 0 at t <= 0, settling at 1.
  function unit(t, { stiffness = 170, damping = 26, mass = 1 } = {}) {
    if (t <= 0) return 0;
    const w0 = Math.sqrt(stiffness / mass), z = damping / (2 * Math.sqrt(stiffness * mass));
    if (z < 1) {
      const wd = w0 * Math.sqrt(1 - z * z);
      return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t));
    }
    if (z === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const s = Math.sqrt(z * z - 1), r1 = -w0 * (z - s), r2 = -w0 * (z + s);
    const c2 = r1 / (r2 - r1), c1 = -1 - c2; // starts at 0, at rest
    return 1 + c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t);
  }

  const spring = (t, cfg) => (t <= 0 ? cfg.from : cfg.from + (cfg.to - cfg.from) * unit(t, cfg));

  // keys sorted by t; the first key is the starting value.
  function track(t, keys, cfg) {
    let x = keys[0].value;
    for (let i = 1; i < keys.length; i++) x += (keys[i].value - keys[i - 1].value) * unit(t - keys[i].t, cfg);
    return x;
  }

  function settleTime(cfg, eps = 0.001) {
    // ponytail: scans backward at 1 ms over 10 s; closed-form envelopes would be exact but longer.
    for (let t = 10; t > 0; t -= 0.001) if (Math.abs(1 - unit(t, cfg)) > eps) return Number((t + 0.001).toFixed(3));
    return 0;
  }

  g.Spring = { PRESETS, unit, spring, track, settleTime };
})(globalThis);
