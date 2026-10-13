# Impressionist Dabs

- id: `impressionist`
- Source: huashu-art-motion `08_impressionism.md` (MIT)
- Best for: lifestyle, travel, wellness, food, spring and summer campaigns, soft nostalgic reels
- Not for: faces and hands in close-up, text-heavy slides, technical product shots
- Triggers: impressionism, monet, renoir, pastel brushstrokes, sunlit, garden, plein air, dappled light
- Tone cell: calm-soft
- Clock: smooth 30/60 fps (brush positions fixed, light and wind animated)

## Look
Pastel region palettes, 7-9 colors each: lilac-pink walls (`#d8bede #f0c8cc #f2c4d4`), a warm yellow sun zone (cream yellow set), rose-orange-violet floors, plus separate sets for sky, grass, curtains and cloth. Canvas base `#f2e6ee` shows through the gaps between strokes. Strokes are short and fat: main pass cell 11, length 20, width 7, no outline, color jitter 26. A second finer pass (cell 6, length 11, width 4.5) for far views and small framed images. White or near-white elements must be detected (color above about 240,236,225) and mixed back to white, otherwise they get painted the wall color. Signal colors like poppy red stay as authored.

## Motion
- Dappled sun patches: 26 patches, intensity `0.5+0.5*sin(t*sp+ph)*sin(t*sp*0.53+2ph)`, clamped, so the on/off rhythm is irregular. Each drifts +/-10 to 44 px. Each patch is about 40 bright short strokes.
- Poppy-like flowers sway: head offset `sin(t*3.2+ph+x*0.02)*(6+r*0.6)`, amplitude 10 or more.
- Clouds travel about 45 px/s, foliage sways `sin(t*1.9)*8`, ribbons and curtains flutter.
- Wind rotates distant grass strokes by +/-0.22 rad.
- Transition family: strokes of color dots flood the frame, then clear into the next scene.

## Signature features (judged against these)
- Short visible dabs everywhere, no outlines.
- Light-colored gaps between strokes show the pale base.
- Sun patches that blink irregularly and drift.
- Pastel region palettes, no pure black.
- Fine dabs for distant detail, larger dabs for near surfaces.
- Whites preserved as whites.
- Surface does not reshuffle between frames.

## 10-second beat seed
- 0-1.2s: sunlit scene with light patches already moving.
- 1.2-6s: wind passes through flowers and cloth, slow pan of 20-40 px.
- 6-7s (hero): sun patch crosses the subject or title.
- 8.8-10s: hold with patches still drifting.

## Sound
Light acoustic guitar or harp, 80-96 BPM, bird ambience. Soft shimmer on each patch flare.

## Build it in HyperFrames
Canvas 2D flat base redrawn each frame (things move), then 2 full-frame stroke passes.
- Wrap the palette function so each cell consumes exactly one random number and never returns null. Otherwise one moving object reshuffles every later stroke.
- Use `hash(i,j)` per cell for subject-layer strokes instead of an alpha mask.
- Light patches use source-over at high alpha; additive blending disappears on pastel grounds.

## Watch out
- Current weak spot: faces and hands get shattered by the strokes. Keep them small or paint them in a calmer pass.
- Reseeding the whole screen every 7-8 frames reads as flicker (measured frame diff 4.1 against 0.57 after the fix). Fix stroke positions, animate light and wind instead.
- A single coarse pass erases small distant things. Use two passes.
