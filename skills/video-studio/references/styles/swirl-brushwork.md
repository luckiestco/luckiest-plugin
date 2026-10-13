# Swirl Brushwork (post-impressionist)

- id: `swirl-brushwork`
- Source: huashu-art-motion `09_postimp.md` (MIT)
- Best for: emotional launch films, night scenes, brand stories that want a hand-painted, vibrating look
- Not for: dense data screens, small UI text, anything needing crisp edges
- Triggers: van gogh, starry night, swirl, post-impressionist, thick paint, impasto, painterly night sky, oil painting video
- Tone cell: kinetic-soft
- Clock: on twos (brush seeds change at 8 fps, shapes stay fixed)

## Look
Palette by region, 6-8 mixed hues each, never one flat blue.
- Wall/background blues: `#7f9be6 #5f7fd8 #a7bbf2 #6c6fd2 #8ad0e6 #c3cbf6 #4f6cc8 #9a8fe0`
- Sky: `#22339a #2f4fb8 #5c86dc #8fb6ee #1b2a78 #3c6bd0`
- Ground (warm contrast): `#c0573c #a8453a #d7774a #8e3b30 #5f8f6a #c96a52 #e08a5c`
- Outline: deep blue, 4.5px, mixed 40-45% into the stroke color.
Brushwork is directional: strokes follow a flow field, so every region has its own grain. Compose for the subject, not a fixed room; keep the sky or background as the swirl carrier.

## Motion
- Strokes re-seed at 8 fps for a living surface, but stroke positions stay anchored (see Watch out).
- Swirl field rotates slowly (about 0.3 rad/s) around 2-3 vortex centers.
- Light halos expand as dashed rings; flame-like shapes sway along the direction field.
- Transition family ("how you enter it"): the old frame is pulled into the swirl, new image resolves out of spiral strokes.

## Signature features (judged against these)
- Three separate stroke passes: vertical long strokes for walls (cell 14, len 64, w 8), perspective-aligned strokes for floors (cell 12, len 46, w 8), short strokes for everything else (cell 10, len 22, w 6.5).
- Per-region palettes of 6-8 hues, mixed 30-45% with the base color.
- Outline pass at 0.8-0.9 opacity in dark blue.
- Small props rendered in their own small-stroke layer, not the big-brush pass.
- Visible spiral strokes in the sky that rotate.
- Subjects get a fine-stroke pass inside their silhouette, then missing outline lines are patched back in.
- Glows read as concentric rings, not soft gradients.

## 10-second beat seed
- 0-1.2s: dark swirling sky fills frame, one bright focal glow.
- 1.2-6s: subject and props paint in; halos pulse outward.
- 6-7.5s (hero): vortex tightens around the focal point, text lands on a calm patch.
- 8.8-10s: hold the end frame, rings keep expanding slowly.

## Sound
Sparse piano or strings, 70-85 BPM, minor-to-major lift. Soft swell on the vortex tighten, a single chime on the halo ring.

## Build it in HyperFrames
Canvas 2D flow-field strokes, one `strokes(region, params)` function per pass.
- Flow field angle from seeded noise plus region rules (wall vertical, floor toward a vanishing point, sky along nearest vortex tangent).
- Draw a flat base layer first, then strokes over it with region masks; small props get their own layer composited with source-atop.
- Seed strokes by cell index, not by a running random stream, so changing colors never reshuffles later strokes.

## Watch out
- The heaviest style in the set (about 110 ms per frame in the source). Cache static regions, budget for it.
- Running one parameter set over the whole image turns into carpet. Always split into three passes.
- Small objects get shredded by big strokes. Isolate them in a prop layer.
- Color jitter alone gives "one blue with noise". The look comes from a dozen hues per region.
