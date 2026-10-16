# Stone Mosaic

- id: `mosaic`
- Source: huashu-art-motion `04_roman.md` (MIT)
- Best for: heritage, food, travel, history, floor-tile and craft brands, bold logos and badges (narrow use)
- Not for: faces in close-up at small tile sizes, fast-motion UI, fine text
- Triggers: mosaic, roman mosaic, pompeii, tesserae, tile, byzantine, ancient floor, stone tiles
- Tone cell: calm-sharp
- Clock: smooth 30/60 fps (stones fixed, color flows through them)

## Look
Hundreds of small stone tiles placed along outlines, with grout between them.
- Wall `#e4ddcd`, halo ring `#f5f1e8` (a 44-50 px halo around every figure), outline `#46322a`, red frame `#a8322a` with `#7c221d` line, gold `#d0a23c`, grout rgb(112,103,92) with noise.
- Tile size by region: wall 12 px, halo 11, figures 10, face 5-6 (small), hair 8, border strip 7.6, text 7, ground 13. Color jitter +/-4 to 8%, 9% warm tiles (+12,+4,-8), 7% cool.
- Each tile is a rotated square with half-widths `s/2*(1.08-1.28)` each, rotation +/-0.06 rad. Grout appears along the bisector between neighbors (gap 0.75-1.25 px).
- Edge shading: within 2.2 px of the edge, light direction (-0.6,-0.8) gives +/-16% light or dark; dome term `-5%*D1^2`; 3% pixel grain.
- Lettering: monospace thick-stroke letters about 2 tiles wide per stroke.

## Motion
- Layout is computed once. Each frame, colors from a flat drawing flow through the fixed stones.
- Border band as a conveyor: a pre-baked 2,106 px stone strip (26 repeats of an 81 px pattern) translated by phase `15*lt + 81*easeInOut(...)`, so the stones travel with the pattern.
- Smoke or small props drift (55 px/s cloud band, 12 ember squares on parabolas); a small tile-sprite (emblema) carries moving objects.
- Transition family: mosaic tiles flip over and spread outward from a point.

## Signature features (judged against these)
- Tiles laid along outline contours (distance-field iso-lines), then filled in staggered rows.
- Visible grout formed by the bisector between irregular stones.
- Halo of lighter tiles around every figure.
- Smaller tiles on faces and focal details, larger on background.
- Color flows across fixed tiles (the tiles never move except in the border conveyor).
- Props smaller than 3 tiles wide are sprites with their own small tiles.

## 10-second beat seed
- 0-1.2s: tile border drifts, central picture assembles.
- 1.2-6s: color moves through the stones, smoke and sparks.
- 6-7.5s (hero): focal object flips tile by tile into the key message.
- 8.8-10s: hold, border continues.

## Sound
Lyre and frame drum, 80-100 BPM, stone click foley per tile flip.

## Build it in HyperFrames
Canvas 2D with typed arrays; build once at init (about 200 ms).
- Distance transform (Felzenszwalb-Huttenlocher) on a structure map, then walk iso-contours placing stones spaced at the tile size using a spatial hash with minimum spacing 0.8 x size; fill remaining gaps with staggered rows.
- Per pixel store tile id and shade; per frame sample the flat drawing at each tile center and write color x shade. Draw to an offscreen canvas then `drawImage` (direct `putImageData` ignores scaling and transitions).

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: stones are laid along the mark's own outline first, in its construction order (outer silhouette, then cuts and counters), then the fill rows set in, then the grout darkens in, each tile with a stone click. The halo ring goes on last. Lettering in the mark uses the logo's letterforms, never the card's monospace tile letters.
- Resolve: in the last 0.3s the grout, edge shading and jitter fade out and the tiles merge into the flat logo SVG in brand colors on the hold frame. A tiled rendering of the name is never the resolve.

## Watch out
- Current weak spot: facial detail gets lost at small tile sizes.
- Hand, cup and face crowd together at 6-8.5 px tiles. Use bigger gestures or sprite inserts.
- Slow pattern shifts under one tile width get quantized away if only colors change. Move the stones too or move far.
- Do not use a special small tile size in one region only; it shows as a patch when still.
- Thin serif letters break into wrong letters at 7-9 px tiles.
