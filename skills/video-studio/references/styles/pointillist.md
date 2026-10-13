# Pointillist Dots

- id: `pointillist`
- Source: huashu-art-motion `29_seurat.md` (MIT)
- Best for: calm brand films, art and culture content, premium reveals, color theory explainers
- Not for: fast action, small text, flat vector UI
- Triggers: pointillism, seurat, signac, dots, optical color mixing, stipple painting, divisionism
- Tone cell: calm-soft
- Clock: on twos (dot recolor at 6 fps, light shimmer)

## Look
The picture is built from equal-size dots placed on a hex grid (pitch 10, row spacing 8.66, radius 4.5, +/-1.2 px static jitter, about 24,000 dots). Only 21 pure palette colors exist; mixed tones come from placing two neighbors side by side in proportion.
- 14 saturated: `#1a2058 #2a3a9a #3f6fd0 #6aaee6 #1f6a52 #2f9a5a #a8c83a #f2cf3a #f08a2a #e0432a #c0306a #7a4aa8 #f8f4e8 #e8b48a`
- 7 pale (mixed with white): `#f6e49a #f6c48a #cfe08a #b0cff0 #f2b8c8 #c99a4a #9a7ac8`
A blurred, slightly desaturated copy of the flat painting sits under the dots as ground color. A dark blue 28 px border, also dotted, frames the picture. Compose for the subject; leave open flat areas so the dots read.

## Motion
- Water or sky dots re-roll their hash at 6 fps to make light shimmer.
- 7% of dots swap to their pair color at 6 fps (4 fps and 3% read as frozen).
- One small element drifts (a boat 40 px/s, a butterfly on `sin(2.6t)*120` with wing beat `|sin(20t)|`).
- Transition family: the old image crystallizes into dots (grid pitch 14, radius grows to 6.4), dots recolor top-left first with a 1.35x pop, then the new image develops underneath.

## Signature features (judged against these)
- Uniform dots, no strokes, no outlines.
- 21-color palette, tones created by optical mixing.
- About 8% complementary-color dots (blue/orange, green/red-violet, yellow/violet).
- Light bleed: where brightness differs by more than 45 across 14 px, add white on the bright side and deep blue on the dark side.
- Visible deep-blue dotted border.
- Gentle motion, adjacent-frame difference around 0.45 mean.

## 10-second beat seed
- 0-1.2s: dots crystallize from empty paper into the scene.
- 1.2-6s: slow shimmer, one drifting element.
- 6-7s (hero): dots pop to the new palette pair, title resolves.
- 8.8-10s: hold, shimmer continues.

## Sound
Soft marimba or vibraphone ticks, 90-100 BPM. One tick per dot-pop wave.

## Build it in HyperFrames
Canvas 2D or WebGL. Draw a flat painting, sample color at each grid dot, pick a pair from the palette.
- Project the target color onto the line between two palette colors to get a ratio, clamp to 0.2-0.8, add a penalty `0.004*|Pi-Pj|^2` against distant pairs, and decide per dot with `hash(i,j) < w`.
- Add +/-20 hash jitter to the target before picking, otherwise the pair boundary forms vertical bands.
- Batch dots into one Path2D per color, fill once per color; cache pair choices by 15-bit quantized color.

## Watch out
- Current weak spot: reads static, and the grid can look too regular. Add the shimmer and a moving element.
- A single preferred pure color without a penalty slices gradients into stripes.
- Without pale colors in the palette, bright walls break into white, skin and blue snow noise.
