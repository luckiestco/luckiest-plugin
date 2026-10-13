# Paper Cut Collage (stop-motion)

- id: `collage`
- Source: mg-styles-15 `prompts/06-collage.md` (MIT, Vincentwei1021)
- Best for: music and street-culture shorts, editorial magazine motion, surreal brand teasers, poster-like end cards
- Not for: clean corporate, data-heavy, precise product demos
- Triggers: collage, cutout, cut-out animation, paper-cut, papercut, paper cut, stop-motion, stop motion, handmade, not AI-looking, Dada, surreal, torn paper, newspaper, halftone, zine, constructivist, scissor cut, Monty Python, Terry Gilliam, Soviet poster
- Tone cell: kinetic-sharp
- Clock: stepped 12 fps (some holds at 6 fps), rendered on a 30 fps timeline

## Look
Newsprint or kraft paper ground. Public-domain photo cutouts with a rough 2-4px white scissor edge plus halftone dots. Deep-space imagery spilling out of a flipped-open head. Bold constructivist red and black diagonal typography. Layer stack from back to front: paper texture, large color shapes, photo cutouts, handwritten doodles and tape stickers, grain adjustment layer. Disproportionate head-to-body sizes on purpose.

## Motion
All motion is held on a 12 fps grid (6 fps for some holds) for a stop-motion feel, with random plus or minus 2px position jitter as hand placement. Puppet-style joint rotation with anchors at shoulder, elbow, jaw. Mouth opens and closes with 2-3 swap frames. The top of the head flips open like a lid. Transitions: a hand slaps an element onto the page, torn-paper strips, or a full paper flip to the end card.

## Signature features (judged against these)
- White 2-4px scissor edge on every cutout plus halftone texture.
- Motion visibly stepped at 12 fps (or 6), not smooth.
- Plus or minus 2px placement jitter.
- Jaw or mouth on a separate piece, flapping with sound.
- Disproportionate surreal assembly.
- Layered paper stack with grain on top.
- Diagonal constructivist type in red and black.
- Hand-slap or paper-flip transition.

## 10-second beat seed
- 0-1.2s: portrait slaps onto kraft paper, jaw flaps.
- 1.2-4s: head lid flips open, space revealed, first objects spill out.
- 4-7s (hero at 60-75%): flowers, birds, planets, pointing hands, rocket pile out; torn strips slide.
- 7-8.5s: paper flip transition.
- 8.5-10s: end card with diagonal headline, held with 6 fps jitter.

## Sound
Vinyl crackle, jazzy boom-bap bed, paper rustles, scissors snips, slaps, and a comic pop when the lid opens.

## Build it in HyperFrames
DOM or Canvas with PNG cutouts (public-domain or CC0, backgrounds removed in advance). White edge by SVG feMorphology dilate on alpha, halftone by an SVG filter or a canvas dot pass. Quantise time with t12 = floor(t*12)/12 and drive every animation from t12. Jitter is a seeded hash of (element id, t12 step). Paper grain as a multiply layer.

## Watch out
Smooth easing on the hold grid ruins the stop-motion feel. Do not use trademarked or recognisable-person photos, use public domain only. Halftone moire at export: keep dots larger than 4px.

## Already built in Luckiest (reuse before building new)
- **Showreel paper-cut look:** a `logo` scene with `"recipe": "showreel"` and `data-look="papercut"` on `<html>` (`luckiest-video-studio-showreel`). Gives torn edges from a fixed-seed SVG displacement filter, paper grain, hard offset shadows, white gaps between tiles, a seeded tilt of about 1 degree per piece, and a 12 fps stepped master timeline. Verbs: slide, drop, rotate, tumble, tip, swing, snap, lift, scatter. Never morph, fold, bend, draw in place or glide.
- **Cards pack `01-paper-collage`** (`luckiest-video-studio-cards`): title, stat, section and lower-third cards in this look. Paper `#efe9dc` (kraft `#e6dcc4`), ink `#17130e`, one signature blue `#4F8CFF` per beat, red `#e23b2e`, sticker orange `#f26a1b`, serif headlines (Fraunces). Image slots render as halftone cutouts with a colored sticker outline until a real image goes in.
- Use the showreel look for the brand-film or logo scene and the cards pack for titles and stats, so the whole video shares one paper, one ink and one 12 fps clock.
