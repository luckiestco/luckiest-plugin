# Isometric Miniature World

- id: `isometric`
- Source: mg-styles-15 `prompts/03-isometric.md` (MIT, Vincentwei1021)
- Best for: tech architecture animation, app feature demos, data campus, smart-city or cloud infrastructure explainers
- Not for: character drama, organic subjects, anything needing perspective depth
- Triggers: isometric, 2.5D, iso, miniature city, low poly diorama, architecture diagram animation, tech campus, Dribbble hero, School of Motion
- Tone cell: kinetic-soft
- Clock: smooth 30 fps

## Look
True isometric projection: orthographic, 35.264 degree elevation, 45 degree azimuth, no vanishing point, lines everywhere to scale. Pastel studio palette: lavender ground, mint, peach, sky blue, white. Soft shadows and ambient occlusion so it reads as a premium hero render. Title text lies ON the iso plane, skewed into iso space. Floating island in a pastel void for the end.

## Motion
Ground tiles flip or drop in as a wave from the centre, tiny bounce each. Buildings grow: base lands, walls scaleY from 0 with overshoot, roof cap 2-3 frames later. Trees pop, windows light in sequence. Life layer: cars loop roads, a train, drones carrying packets, glowing data streams pulse between buildings, a wind turbine spins. Camera is a parallel slide only, no rotation, with 1 : 0.8 : 0.6 parallax between foreground, middle, back layers. Pull-back to reveal the whole island.

## Signature features (judged against these)
- Orthographic 30 degree iso angle, no perspective convergence.
- Miniature scene with many small readable objects.
- Building growth: base first, walls scaleY with overshoot, roof 2-3 frames late.
- Tiles arrive as a radial wave from the centre.
- Camera moves by parallel translation only, parallax 1 : 0.8 : 0.6.
- Pastel palette, soft shadow and AO.
- Moving objects stay on the iso grid at 2:1 pixel slope.
- Title set in iso space.

## 10-second beat seed
- 0-2s: tile wave from centre; hook is the first ripple at frame 0.
- 2-5s: buildings grow, trees pop, windows light.
- 5-8s (hero at 60-75%): cars, train, drones, data streams, turbine; parallel camera slide.
- 8-10s: pull back to the floating island, title on the plane, hold with idling motion.

## Sound
Bright plucky tech melody (FM marimba or pluck). Soft click or pop on each tile and building landing. Airy whoosh on the pull-back.

## Build it in HyperFrames
Three.js with OrthographicCamera at the true iso angle, soft shadows and a cheap AO (baked or SSAO), stepped per frame from t. Alternative: SVG faces built with the SSR matrix (scale Y 86.6%, skew 30 degrees, rotate 30 degrees) for top, left and right faces, z-ordered by screen y. Text as a CSS-transformed element or a plane in the scene.

## Watch out
Any perspective camera breaks the style. Z-sorting errors in the SVG route. Do not rotate the camera. Keep object count high enough to feel dense but each one readable.
