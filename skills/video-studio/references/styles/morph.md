# Shape Morph Chain

- id: `morph`
- Source: mg-styles-15 `prompts/08-morph.md` (MIT, Vincentwei1021)
- Best for: keynote-grade storytelling, icon sequences, feature walkthroughs, brand reveal built from meaningful symbols
- Not for: character acting, texture-heavy looks, hard-cut montage
- Triggers: morph, morphing, shape transition, icon morph, shape shifting, one shape becomes another, Apple keynote, visual storytelling, flubber
- Tone cell: calm-sharp
- Clock: smooth 30 fps

## Look
One hero shape, flat clean icons. Background color fields change with each morph via clean color-block wipes. Palette of 4-6 brand colors, one per beat. Invented logo and wordmark at the end (for example "morphe"). Centred, generous negative space.

## Motion
Chain of 6-8 meaningful icons on the beat, for example cup, circle, sun, sunset over sea, gull, paper plane, location pin, heart, logo. Each A to B goes through a simple intermediate (circle or capsule): A to circle then circle to B, 8-12 frames each. Rotation plus 10-15% squash and stretch through the morph. Sub-parts morph in sync (steam becomes sun rays becomes waves). Ease cubic-bezier(0.7,0,0.3,1), fastest in the middle, 3-frame cushions at start and end.

## Signature features (judged against these)
- Continuous outline with no jump cut between shapes.
- Every complex morph bridges through a circle or capsule.
- No knotting or tangling at any mid-point still.
- 10-15% squash and stretch plus slight rotation during morphs.
- Sub-parts morph in sync with the hero.
- Color-field wipe with each morph.
- Each morph lands on a beat.

## 10-second beat seed
- 0-1s: first icon pops in, hold 3 frames, begin morph (hook on frame 0).
- 1-6s: 5-6 morphs on the beat, each with a color wipe.
- 6-8s (hero at 60-75%): the most surprising morph (paper plane to pin to heart) with synced sub-parts.
- 8-10s: shape becomes the brand logo, wordmark fades in, hold with micro-motion.

## Sound
Rhythmic plucky arpeggio. A pitched whoosh per morph landing on the beat.

## Build it in HyperFrames
SVG with GSAP MorphSVGPlugin if licensed, otherwise flubber or a custom resampler: resample both paths to the same N points (about 200), rotate the start index to minimise total vertex distance, then lerp with the easing curve. All as a pure function of t. Always render mid-point stills for every morph and inspect for knots.

## Watch out
Mismatched vertex counts and starting points cause knots. Skipping the intermediate circle on complex pairs. Mechanical look when squash and rotation are missing. Make beat times come from a single cue sheet.
