# Ink Wash (sumi-e)

- id: `ink-wash`
- Source: huashu-art-motion `17_ink.md` (MIT)
- Best for: tea, wellness, craft, East Asian brands, poetic intros, minimal luxury, philosophy content
- Not for: loud kinetic ads, high-saturation product shots, busy UI
- Triggers: ink wash, sumi-e, chinese painting, calligraphy, brush, shuimo, qi baishi, bada shanren, zen, rice paper
- Tone cell: calm-sharp
- Clock: smooth 30/60 fps

## Look
Paper is the base and ink is only added. Rice paper `#efe6d0` with noise grain and about 2,600 short fibers, a vignette up to alpha 0.22 at the edges. Ink is one near-black `[16,14,12]` used in five tones: scorched 0.9, thick 0.8, heavy 0.6, light 0.35, clear 0.15. Accent pigments used sparingly: ochre `#c47a3c`, blue-gray `#6f8aa0`, yellow `#e2aa34`, a single red for the seal `#c4281e` and tiny vermilion touches (`#d8553f`). Lots of empty space. Whites are carved out of washes with `destination-out`, not painted white.

## Motion
- Opening: the picture writes itself stroke by stroke over about 0.45 s (`reveal = smoothstep(d, d+l, lt/0.45)`), offset so frame 0 already has ink.
- Ink bleed: halo blur grows over time, so wash edges keep spreading.
- Branches sway `sin(2.9t)*0.11`, leaves flip `sin(7t+g)*0.2`, mist bands (paper-colored blurred ellipses) slide 150-270 px/s.
- A bird crosses at 420 px/s, wings 8 beats per second.
- Seal stamps down from 1.5x to 1x with multiply.
- Transition family: strokes write in, ink blooms across the paper.

## Signature features (judged against these)
- Brush strokes with pressure taper and dry-brush gaps (flying white).
- Washes with soft spreading edges.
- Five ink tones, not flat black.
- Large negative space.
- A red seal in the corner.
- Whites by carving, not by paint.
- Only 2-3 spots of color.

## 10-second beat seed
- 0-1.2s: strokes write in.
- 1.2-6s: wash blooms spread, branch sways, mist slides.
- 6-7s (hero): single bold stroke or bird crossing, seal lands.
- 8.8-10s: hold with mist moving slowly.

## Sound
Guzheng or sparse bamboo flute, 60-72 BPM, occasional low drum. One plucked note per stroke.

## Build it in HyperFrames
Canvas 2D, cache the static strokes after they finish writing.
- Resample brush paths to 4 px arc length (so dry-brush noise frequency is constant). Pressure profile `smoothstep(0,head,q)*(1-0.7*smoothstep(1-tail,1,q))`.
- Each bristle is one continuous polyline with butt caps, broken where `noise(k*1.9, i*0.09)` is below `dry*q^1.2*0.95+0.05`. Segment-by-segment strokes leave knots.
- Washes: draw shape on scratch canvas, multiply twice (outer halo blur, inner body blur), grow 0 to 1 over lt.

## Watch out
- Current weak spot: figures are not loose enough (review 6/10). Use few strokes and let the wash do the form.
- Multiply washes are transparent, so lines show through the shapes. Underpaint paper color inside each silhouette first.
- A pure white first frame fails as a cover. Start with some ink already down.
