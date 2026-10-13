# Watercolor Anime Background

- id: `watercolor-anime`
- Source: huashu-art-motion `25_ghibli.md` (MIT)
- Best for: storybook explainers, children's content, wellness, cozy lifestyle, nature, slow narrative openers
- Not for: hard-sell tech, data-dense frames, dark moody brands
- Triggers: ghibli, miyazaki, hand-painted watercolor, anime background, storybook, cozy, gouache, wind in curtains
- Tone cell: calm-soft
- Clock: smooth 30/60 fps

## Look
Backgrounds are watercolor washes: transparent layers stacked with multiply, each with a slightly darker edge line where pigment settles. Rooms and skies are bright, never muddy. Wall wash runs from `#fbf3e0` near the light source to `#dcc49a` at corners, with about 28 warm yellow, pink, blue-gray and pale green blooms. Paper grain multiplies on top at 0.3. Characters use two-tone cel shading with a warm brown line (`#4a3428`, softened to `#6a4a38`, width 2.4). Clouds are opaque white puffs with a blue-gray underside.

## Motion
- Soft cloth billows: hem push `q^2*(60+150*gust)`, `gust = 0.55+0.45*sin(5.4t+phase)`, plus small ripples `sin(7t+6q)`.
- Grass wind arrives in waves: `wind = 0.5+0.5*sin(3.1t-0.018x)`, so you see a gust cross the field. Around 360 blades.
- Clouds drift 22-30 px/s, tree canopy sways, 30+ dappled light spots flicker `sin(5t+1.7i)`.
- Hair, ribbons and flower heads move with the same wind.
- Transition family: color blooms open on wet paper like spreading water (5 blooms, radius `q*1400*k`, soft bright halo ahead, brown watermark edge).

## Signature features (judged against these)
- Washes with visible darker settled edges.
- Bright, warm, airy palette; no moldy parchment look.
- Cel shading with one crescent shadow, not full gradients.
- Wind that travels across the frame in waves.
- Characters carry paper grain and color blooms too, not flat vector fill.
- Dappled light patches that move.
- Large soft shapes deformed, never straight-edged rectangles.

## 10-second beat seed
- 0-1.2s: wind lifts cloth, camera on a bright painted scene.
- 1.2-6s: grass wave, cloud drift, subject action.
- 6-7.5s (hero): a strong gust and light patch cross the subject.
- 8.8-10s: hold with grass and cloth still moving.

## Sound
Light piano and strings, 70-90 BPM, wind and birdsong bed. Soft swell on the gust.

## Build it in HyperFrames
Canvas 2D, heavy first-frame cache.
- `deform(points, depth, amp)`: midpoint displacement, each round amp x0.6. `wash()` fills 3-5 layers with multiply at low alpha plus a 1.6 px same-color edge.
- Typical wash: large wall layers 5, alpha 0.4, amp 12; blooms layers 3, alpha 0.045, amp 40.
- Cel function: fill shadow color, then clip and fill base color shifted toward the light; leaves a crescent of shadow.
- Paint characters offscreen, add a grain and bloom layer, mask it with `destination-in`, composite with multiply.

## Watch out
- Current weak spot: characters look weaker than backgrounds (flat vector). Give them the same wash texture.
- Blooms at alpha 0.07 x4 layers with strong grain go moldy. Use 0.045 x3.
- Rectangular wash patches leave a hard seam. Use heavily deformed polygons (amp 60).
- First frame takes about 600 ms because of the cache.
