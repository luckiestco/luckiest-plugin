# Morphing Math Explainer

- id: `math-explainer`
- Source: huashu-art-motion `references/动画语法/t1_3b1b.md` (MIT)
- Best for: explaining a mechanism step by step (neural net, matrix, gradient descent, probability, algorithm flow), 30-120s with a voiceover made of action sentences.
- Not for: product launches, brand or mood films, real data trends, opinion or story voiceover, anything under 8s.
- Triggers: 3blue1brown, 3b1b, manim, math explainer, linear algebra, neural network explainer, gradient descent, black background math, transform animation, equation morph
- Tone cell: calm-sharp
- Clock: smooth 30/60 fps

## Look
- Background pure black `#000000`. Do not use a navy gradient or bloom. The "glow" comes from saturated thin lines on black, with saturation pushed about 1.5x.
- Palette: blue `#58C4DD`, red `#FC6255`, yellow `#FFFF00`, teal `#5CD0B3`, green `#83C167`, greys `#DDD/#888/#444`. Max 4 semantic colors per video.
- Color is the concept name. Example: yellow = activation or signal, blue = positive weight, red = negative weight. A symbol in the formula and its object on screen share the color, and it never changes mid-video.
- Type: serif math face (Computer Modern or CMU Serif look) for formulas, a serif for labels. Title 58px, formula 64px at 1080p.
- Strokes: default 4px, axes and network edges 2px, grid 2px with 1px sub-grid at 25% opacity. Neuron: white 2px outline, fill opacity equals its value.
- One main subject per screen, centered or symmetric. Title and formula pinned to the top eighth, never moving with the camera.

## Motion
- Default easing is the quintic smooth curve 6t^5 - 15t^4 + 10t^3. Linear only for write-on strokes, constant rotation, and signal flashes.
- Rhythm: one animation runs 1-3s, then the frame holds about 1s. One concept lasts 8-20s.
- Lagged groups: lag ratio 0.1 for small sets, 0.01 for 100 items (about 1.1s total), 0.006 for 160 edges.
- Write-on: outline strokes first, then fill fades in over the last 60%. Under 15 glyphs takes 1s, more takes 2s.
- Transform: resample both shapes to the same point count, align start points, interpolate linearly point by point plus color. Square grid to circles, weights flying to one neuron.
- Signal: copy the edge, color it yellow at 1.5x width, reveal a moving window along it, stagger rows by 0.04s.
- Camera: still while waiting. It moves only to look at the next object, one smooth push of about 1s. One fast push (0.28s, 18-32% in) at most once or twice, only when a conclusion lands.

## Signature features (judged against these)
- Black `#000000` background with no gradient and no bloom.
- Each shot states "what becomes what", and the first frame already shows an object, not a title.
- No more than 2 text points on screen at once, and none appears as a bullet list.
- One color per concept, 4 semantic colors or fewer, formula symbols matching object colors.
- Concepts connect by morph, not by cut. The last frame of one shot equals the first frame of the next.
- Holds are truly still: no slow drift, breathing, or floating.
- Each animation matches a verb in the voiceover, then waits about 1s.
- A number counts up with the fill, never before the picture shows it.

## Beat pattern (30-60s)
- 0-3s: first frame is the object (grid, curve, pixels). Question title writes on after it appears.
- Every 8-15s: one concept. Voice says the verb, one Transform plays, then 1s hold.
- Middle: color legend appears the first time a color means something, and stays.
- 60-75%: hero moment. Camera pushes through or into the key object (for example the one neuron that matters), preceded by a 0.3s yellow outline.
- Last 6-8s: result settles, number counts to its final value, hold 0.6s or more. Legend remains to the end.

## Sound
Soft ambient pad or sparse piano, no beat. Quiet pen or tick on write-on, low pop on Transform landing. Voiceover leads, music 15-20 dB below.

## Build it in HyperFrames
- Canvas 2D or SVG. Every frame is a pure function of t. Write-on is a dash-offset driven by progress.
- Morph with arrays of points: sample each shape to N points, lerp by smooth(p). Seed any layout noise.
- Camera is a keyframe table (hold, push, hold). Zoom through an opening with log interpolation: zoom = Z^e, with Z at least 1100 / object radius so the opening covers the screen.
- Lay out the formula once with per-token colors, then replace tokens by name between formulas.

## Watch out
- Adding glow or a navy gradient turns it into a "tech slide".
- Using ease or linear everywhere and packing animations too fast. 8 seconds with 5 concepts is the upper limit, real use should be 2-3x slower.
- Color meaning changing mid-video, or more than 4 colors.
- Logic errors: connecting an output neuron to pixels when it connects to the hidden layer. Check the diagram against the claim.
