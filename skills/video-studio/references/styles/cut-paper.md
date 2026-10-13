# Cut Paper Collage

- id: `cut-paper`
- Source: huashu-art-motion `30_matisse.md` (MIT)
- Best for: playful brand films, children's and education, kitchen and craft, festival promos, bold simple shapes
- Not for: realism, fine data, dark moody pieces
- Triggers: matisse, cut-outs, paper collage, papier decoupe, gouache paper, jazz book, scissors, paper shapes
- Tone cell: kinetic-soft
- Clock: smooth 30/60 fps

## Look
Saturated flat shapes with scissor-cut edges, pinned to a wall.
- Double blue checker `#1d4fb8 / #4f95dc` (cells about 240 x 236), emerald `#1f9a5a`, black, yellow, red, pink, white.
- Edges: sample the outline every 14-24 px, add +/-2-2.5 px seeded jitter, join with straight lines. Never perfectly smooth curves.
- Paper shadow: offset (5,6), blur 4, `rgba(10,20,40,0.3)`, so shapes look pinned.
- Gouache brush texture on top: 2,600 long streaks (60-300 px, 6-22 px wide, alpha 0.04-0.13, tilt -0.25 rad), black and white half each, overlay.
- Characters are built only from paper pieces: black almond eyes, red lip triangle, pink cheek circle, curled hair shapes.

## Motion
- Seaweed-like leaf shapes sway about their root: `sin(2.8t+phase)*0.13` with edge curl breathing scaleX 0.93-1.0.
- Stars rotate and flicker: scale `0.82+0.22*sin(7t+1.9k)`, a black figure bobs, a red heart beats `1+0.18*max(0,sin 9t)`.
- Birds flap with scaleY `0.55+0.45*cos(13t)`; a pink paper flips and falls (scaleX = cos 6t).
- Steam is two small white paper strips.
- Transition family: a blue paper sheet with pinned shapes (seaweed, stars, red discs, each with shadow) sweeps across, revealing the next scene.

## Signature features (judged against these)
- Edges are straight segments with jitter, never smooth bezier.
- Union fill for lobed shapes: one tapered stem plus 2 x lobes capsule fingers (angle `+/-(1.05-0.55u)`, length `w*(1-0.45u)`, width `w*(0.34-0.12u)`) added into one Path2D.
- Soft drop shadows only under paper pieces.
- Saturated flat colors, no gradients.
- Gouache streak overlay.
- Character features are separate cut pieces.
- Motion is rigid paper rotation, flip and scale, not bending.

## 10-second beat seed
- 0-1.2s: paper pieces drop in with a pinned shadow.
- 1.2-6s: leaf sway, star flicker, one flying sheet.
- 6-7.5s (hero): sweeping paper transition lands on the key message.
- 8.8-10s: hold, small sway continues.

## Sound
Bright ukulele or clarinet and hand claps, 100-120 BPM. A paper "flick" SFX on each swap.

## Build it in HyperFrames
Canvas 2D or SVG.
- `cut(points)` helper for scissor edges applied to every generated shape.
- For photographic or rendered inputs, apply a static pixel displacement field `fbm(0.028x,0.028y,2)*9` to fake cut edges (about 15 ms).
- Build compound shapes with `addPath` into one Path2D so the shadow is computed once.

## Watch out
- Current weak spot: the gouache brush streaks run slightly heavy.
- "Modulating width along a spine" for lobed shapes yields caterpillars and zigzags. Use the capsule-finger method.
- Falling paper that crosses the subject's face is distracting. Route it along a wall.
- Black text on blue paper needs a white paper patch behind it.

## Related
For torn-edge, stop-motion paper (rather than smooth pinned cutouts), use `collage`, which reuses the showreel paper-cut look and the `01-paper-collage` cards pack.
