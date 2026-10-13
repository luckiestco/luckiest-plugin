# Hand-Drawn Cel Boil

- id: `cel-boil`
- Source: mg-styles-15 `prompts/05-cel-boil.md` (MIT, Vincentwei1021)
- Best for: playful brand films, hand-made crafts, FX-driven stingers, anti-digital warmth
- Not for: precise data, luxury minimal, glossy tech
- Triggers: hand-drawn, frame by frame, cel animation, line boil, boiling lines, traditional animation, on twos, smear frame, cartoon FX, paper texture, Buck, Giant Ant
- Tone cell: kinetic-soft
- Clock: on twos (24 fps timeline, draws change every 2 frames; 1s for fast action, 3s on holds)

## Look
Warm cream paper ground with paper grain multiplied at 10-15%. Ink linework that boils. Fills slightly off-register like hand coloring. Palette of 3-4: ink black, tomato red, sunny yellow, cream paper. Hand-lettered title, also boiling. Cel FX (smoke puffs, sparks, star bursts, speed lines) drawn rather than generated.

## Motion
Animate on 2s (effective 12 fps) as the default, switch to 1s for fast action, 3s for still holds. Line boil: 3-4 slightly different line variants cycled every 2 frames (or noise displacement amount 2-5, size 50, re-seeded each 2 frames). Smear frame: stretch the object 150-300% along the move for a single frame. Anticipation and squash on the character. FX burst on top of the main animation as the transition.

## Signature features (judged against these)
- Lines visibly boil every 2 frames, never static.
- On-twos rhythm with on-ones for fast action and on-threes for holds.
- At least one smear frame, 150-300% stretch, lasting 1 frame.
- Hand-drawn FX (smoke, sparks, stars, speed lines) layered on the main animation.
- Paper grain multiply 10-15% across the frame.
- Fills off-register from the lines.
- 3-4 colour palette.
- Title keeps boiling on the hold.

## 10-second beat seed
- 0-1s: matchstick strike, smear frame, spark.
- 1-3s: flame spirit jumps out, anticipation and squash.
- 3-6s: it dances on twos; FX burst with smoke, sparks, star bursts, speed lines.
- 6-8.5s (hero at 60-75%): FX re-form into the hand-lettered title.
- 8.5-10s: title boils on 3s, held.

## Sound
Playful jazzy pizzicato or xylophone bed with cartoon SFX (strike, fwoosh, pop, poof, sparkle), synced to the frame.

## Build it in HyperFrames
Canvas 2D custom brush: centreline plus a pressure curve turned into an outline polygon. Generate 3-4 seeded jitter variants per stroke and choose the variant by floor(frame/2) mod N. Hold time with floor(t*12) for twos. Paper texture as a multiply-blended image or seeded noise canvas. Everything is a function of the frame index and seeded random.

## Watch out
Jitter that is too large reads as shake, keep it subtle. Random without a seed breaks determinism. Do not smooth the stepped timing. Off-register fills should be small offsets (1-3px).
