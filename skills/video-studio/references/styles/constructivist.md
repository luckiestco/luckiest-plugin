# Constructivist Poster

- id: `constructivist`
- Source: huashu-art-motion `22_constructivism.md` (MIT)
- Best for: bold announcements, campaign slogans, manifestos, rallies, protest or movement style, tech-ops "state of" posts (narrow use)
- Not for: soft lifestyle, luxury, children's, long reading
- Triggers: constructivism, rodchenko, lissitzky, soviet poster, red and black, propaganda poster, agitprop, photomontage, slogan
- Tone cell: kinetic-sharp
- Clock: smooth 30/60 fps

## Look
Aged paper (`#e9dfc4`, dark `#d9c9a4`) with diagonal black bars, a red square, thin slanted lines, a big black circle behind the focal subject and a slanted red floor (12 px black top edge).
- Red `#c8231c / #8f1711`, black `#151311`, cream `#f4ecd6`, accent gold `#e3b03e`.
- Photos are grayscale halftone: variable-diameter dots at 45 degrees (cell 4.6 for faces, 7 for scenery, gain 0.74-0.8), set on cream with a 7 px cream cut-out border like a clipped photograph. Hand-drawn clean black lines (a tower, lettering) sit on top of the halftone for a photo plus drawing collage.
- Clothes are flat cut paper with 3 px black lines; shadows are dot patterns.
- Lettering is geometric, drawn from rectangles and polygons on a 5x7 module grid (Cyrillic-style blocks), vertical lettering allowed. Each part is filled separately.

## Motion
- A red wedge stabs into the black circle: apex moves along a 0.34 rad axis, `70*(0.5-0.5*cos(2*pi*1.6*t))`.
- Dashed red ring around the circle: dash [46,22], `lineDashOffset = -260*t`.
- Radio-wave arcs from the tower top: `r = 18 + ((1.4t + k/4) mod 1)*230`, alpha and width fade.
- Slogan stamps letter by letter (0.045 s apart, 1.5x to 1x in 0.12 s) then a wave `-10*max(0, sin(11t-0.8k))`; every fourth letter black.
- Headwear tails sway `sin(9t)*6`; steam is three black polylines going up.
- Transition family: not specified in the source (the style opened its sample film).

## Signature features (judged against these)
- Diagonals, circle, wedge and block shapes in red, black and cream only.
- Halftone photograph with a clipped cream border.
- Geometric block lettering with the letters drawn as paths.
- Slogan text overlaps the figure (poster lettering sits on top).
- Red wedge into black circle.
- Heavy text bars and line rules.
- Aged paper noise.

## 10-second beat seed
- 0-1.2s: slogan blocks slam in with stamp sound.
- 1.2-5s: wedge stabs the circle, rings and radio waves pulse.
- 5-7s (hero): the slogan bounce wave.
- 8.8-10s: hold, wedge keeps moving.

## Sound
Marching snare and brass stabs, 110-128 BPM, a stamp hit per letter. Distorted radio crackle.

## Build it in HyperFrames
Canvas 2D, base layer cached.
- `halftone(src, cell, gain, angle)`: sample a rotated grid, dot diameter `cell*gain*sqrt(1-L)`, only where alpha > 128, all dots in one path filled once (about 3,000 dots for a face, under 2 ms).
- Letters: each part one fill; letters that overlap in one path cancel under nonzero fill (an A read as a B).
- Place text by glyph center, not baseline, to avoid cut-off descenders.

## Watch out
- Current weak spot: missing the horn-shaped text cone (megaphone shape) typical of the style; consider red and black wedge text radiating from the subject.
- Breve and diacritic marks drawn above the letter cell get covered by neighbors. Draw the whole glyph inside its 7 cells.
- Shadows under the cheeks looked like a beard after halftone. Use about half the flat alpha in the gray source.
- Narrow use: it looks forced on warm or playful subjects.
