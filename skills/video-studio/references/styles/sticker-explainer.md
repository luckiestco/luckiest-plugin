# Sticker Knowledge Explainer

- id: `sticker-explainer`
- Source: mg-styles-15 `prompts/19-paperclip.md` (MIT, Vincentwei1021). Note: this is a bold-outline sticker-photo explainer on a huge camera-moved canvas, not paper cutout or stop motion.
- Best for: hard-core science explainers, finance and knowledge channels, corporate documentary explainers, data-rich narration videos
- Not for: emotional or abstract pieces, playful cartoons, fast hype edits
- Triggers: sticker, knowledge video, science explainer, infographic video, big canvas, camera pan and zoom, photo cutouts with white outline, periodic table, PaperClip, Lin Chao, explainer channel
- Tone cell: calm-sharp
- Clock: smooth 30 fps

## Look
Calm blue-grey and off-white canvas: #E9EEF2 with slate, 2-3 colors plus one accent such as #FF5A36. Photos cut out and given an 8-12px (10px) white outline with a soft shadow, so differing sources look unified. Flat icons and exact charts. Equal-weight sans typography, strict alignment, leader-line labels. Huge canvas (for example 6000x3000) viewed through a camera.

## Motion
One continuous camera path of long ease curves, pan and zoom, linking information points. Every sentence introduces a new visual element. Chart motion: bars grow to scale, numbers count up with a ticking sound, map routes draw on with stroke growth. Exploded-parts stickers with leader lines. Periodic-table tiles light up in sequence. Pull out to a bold typographic title card (heavy sans, huge number, small caption).

## Signature features (judged against these)
- Photo stickers with 8-12px white outline and soft shadow.
- Cool, restrained palette: 2-3 colors plus one accent.
- One continuous camera move across a big canvas with long eases.
- Charts exact: bars to scale, numbers consistent with the copy.
- Count-up numbers and path draw-on.
- A new visual element for every narrated beat.
- Title card with huge number in heavy sans.

## 10-second beat seed
- 0-1.5s: phone sticker lands, camera already moving.
- 1.5-4s: exploded parts with leader-line labels.
- 4-6.5s: periodic-table tiles light up.
- 6.5-8s (hero at 60-75%): bar chart grows, count-up to "70+", map routes draw.
- 8-10s: pull out to the typographic title card, hold.

## Sound
Clean tech-explainer bed, UI clicks, ticking during count-up, soft whoosh on camera moves.

## Build it in HyperFrames
One wide stage div with a camera transform (translate and scale) animated by GSAP long eases, computed from a keyframed path. Stickers via CC0 or public-domain PNGs with the outline made by an SVG filter (feMorphology dilate plus flood white) and drop shadow. Charts and map routes in SVG with dashoffset. Count-up from a pure function of t.

## Watch out
Charts that do not match the narration kill credibility. Source licences: record them. Too many colors loses the serious feel. Keep camera moves long and smooth, not jumpy.
