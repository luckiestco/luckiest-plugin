# Continuous Line Art

- id: `line-art`
- Source: mg-styles-15 `prompts/02-line-art.md` (MIT, Vincentwei1021)
- Best for: luxury, finance, architecture and design-studio brand films, logo animation, monogram reveals
- Not for: loud, playful, data-dense or colorful content
- Triggers: line art, one line, single line, continuous line, draw-on, stroke animation, outline, minimal luxury, monoline, logo reveal, architecture film
- Tone cell: calm-sharp
- Clock: smooth 30 fps

## Look
Midnight ground #0B1320 or near-black. One champagne-gold line #E9D7A5, constant 3px (2-4px range) for the whole film, round caps. Softly glowing pen tip leads the draw. Lots of negative space. Optional second color, never more. Thin letter-spaced serif wordmark (for example an invented "ATELIER LINEA"). Older segments dim to about 35% as the camera moves on.

## Motion
Draw-on by stroke-dashoffset from 100% to 0. Draw speed eases into corners with cubic-bezier(0.65,0,0.35,1), slightly slower at turns. One-stroke narrative: the tail of each figure is the start of the next (seed, sapling, branches become building structure, skyline, horizon lifts and loops into a monogram). Virtual camera follows the pen tip with drift and push, then dollies out at the end to reveal the full drawing as a poster. Line-to-fill moment: the logo fills with gold from its anchor point. Wordmark fades up last.

## Signature features (judged against these)
- Single monochrome (or two-color) line is the only form language.
- Line width constant across the film (2-4px), round caps.
- Continuous path, each figure grows out of the previous one.
- Draw speed decelerates at corners.
- Glowing pen tip visible and leading the stroke.
- Camera follows the tip, final dolly-out reveals the full composition.
- Line-to-fill conversion on the logo.
- Old lines dim to about 35%.

## 10-second beat seed
- 0-1.2s: tip appears and draws a seed, line already moving.
- 1.2-6s: sapling, branches into building, skyline, horizon; camera tracking.
- 6-7.5s (hero at 60-75%): horizon lifts into monogram, gold fill sweeps in from anchor.
- 7.5-8.8s: dolly out to the composed poster, wordmark fades up.
- 8.8-10s: hold with a slow tip glint or breathing glow.

## Sound
Minimal felt piano with a soft string swell. Pen-on-paper whisper whose loudness follows tip speed. Delicate chime on the fill.

## Build it in HyperFrames
Inline SVG paths pre-joined into one path, animated with stroke-dasharray = length and stroke-dashoffset as a function of t (use getTotalLength). Camera is a transform on a parent group, computed from the path point at t (getPointAtLength) with smoothing. Glow with an SVG blur filter on a duplicate stroke. Fill via a clip or mask expanding from the anchor.


## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the pen draws the logo's strokes in its construction order, at the logo's own stroke width when it is a line mark. For a filled mark, draw its outline, then the line-to-fill sweep fills it from the anchor.
- Resolve: after the fill, the frame is the logo SVG exactly: the glow on the tip and the dimmed older lines are gone by the hold.

## Watch out
Shimmer on thin lines at 3px: render at 2x supersample. Do not vary line width. Keep the path truly continuous or the idea breaks. Avoid camera jitter from raw tip positions.
