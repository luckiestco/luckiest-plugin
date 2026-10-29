# Risograph Print

- id: `risograph`
- Source: Lemo-Opuscar `styles/risograph/STYLE.md` (MIT, lemomo-ai)
- Best for: warm handmade brand films and launch teasers, small-figure stories with a quiet joke, zine-style explainers, event and culture promos
- Not for: glossy premium tech, photoreal products, dense data tables, tiny text. Not `grain-flat-illustration`: that is one flat pass with stipple grain on top, no plates, no overprint, no misregistration. Not `collage`: that is photo cutouts with white scissor edges on a 12 fps jitter. Here there are no photos and every colour comes from 2-3 translucent inks overprinted.
- Triggers: risograph, riso, duotone print, spot color, two-color print, overprint, misregistration, halftone, zine, screen print look, mimeograph, stencil print, Tom Haugomat, Risotto Studio
- Tone cell: calm-soft
- Clock: characters on twos (12 fps), camera on ones (24 or 30 fps), registration offsets fixed per shot

## Look
Warm off-white paper (about `#F4EEE2`, never pure white) printed with 2-3 translucent spot inks, one plate per ink. Where two inks cross they multiply into a third colour, and all three approach black. Shapes are flat colour fields and silhouettes with no outlines. Mid-tones are halftone dots, each plate on its own screen angle, in a few stepped bands (20 / 40 / 60 / 100 %), never a smooth gradient. Every plate lands a few pixels off, so edges show slivers of paper or a coloured halo. Solids carry pinholes, faint streaks and blotchy density. Compose with one horizon, one big flat field, one small figure and lots of bare paper. Figures get a 4-5 px paper-white knockout halo.

## Motion
Figures animate on twos with short cycles, secondary parts on a travelling sine. The camera moves smoothly on ones. Registration is not jittered per frame: one fixed offset set per shot (1-3 px), a kick of 8-14 px decaying in about 0.25 s on an accent, a slow drift up to about 25 px through a held moment that snaps back on the downbeat. Plates arrive mid-shot behind a roller sweep (a moving edge with a heavier ink band). Transitions: an ink shape grows over the frame and turns everything under it into the overprint colour, a roller wipe, or a match cut on a flat shape. Never a cross-dissolve.

## Signature features (judged against these)
- 2-3 spot inks plus paper, nothing else. Every other colour is an overprint or a tint.
- Visible overprint: a third colour appears where two plates cross.
- Misregistration slivers or halos on every edge, stable within a shot.
- Halftone dots in stepped density bands, dots fixed to the screen, not to moving objects.
- At most two plates per area, at most one as a tint.
- Type printed on a plate, sharing its misregistration and grain.
- A plate arrival used as a story beat (a new ink = a new idea, product or feeling).

## 10-second beat seed
- 0-1.2s: one ink only. A silhouette is already in place: small figure, horizon, flat disc.
- 1.2-4s: slow camera track, figure acts on twos, stepped halftone sky.
- 4-7s (hero at 60-75%): a second plate lands with a roller sweep and kick, the overlap makes the third colour, the moment the story turns on.
- 7-8.5s: held beat, registration drifts, one line of printed type on empty paper or a knockout strip.
- 8.5-10s: plates slide into register and the mark resolves to the logo SVG (see Logo construction).

## Sound
Dry, close, slightly lo-fi: bass, marimba or vibraphone, nylon guitar, brushed kit, shaker. Each new plate can bring one instrument. The press is the signature foley: feed hiss, a clunk when a plate lands, a sheet landing on a stack. A near-silent held bar pairs with a registration drift, and the snap-back brings the mix back. Music ducks about 8 dB under voice.

## Build it in HyperFrames
One RGB canvas per frame, each channel one plate's density (R = ink 1, G = ink 2, B = ink 3). Normal drawing knocks out. `globalCompositeOperation = 'lighter'` adds ink to only the channels you set: a true overprint. A WebGL2 fragment shader then prints it: per-plate pixel offset plus tiny rotation, a cosine halftone on a rotated grid (period 6-8 px at 1080p, screen angles at least 15 degrees apart), grain on the dot threshold, pinholes, a feed-direction streak and slow blot noise, then `paper * product(mix(1, ink_i, coverage_i))`. Plate gates and roller-sweep edges are uniforms computed from t.
- Every frame is a pure function of t. Registration offsets come from a seeded hash of the shot index. Grain re-rolls on `floor(t*12)`, streaks and blots change only at cuts. No timers, no Math.random.
- Use a well-mixed 2D hash: a cheap `fract(p*big)` hash draws stripes across solids at 1080p. The halo layer must copy the canvas transform.
- Fonts: brand faces, or an OFL heavy grotesque for titles and an OFL geometric sans for captions. Preload every weight before ready.
- Render PNG frames and encode once at 4:4:4, since chroma subsampling smears saturated dots.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the mark is printed plate by plate in its construction order. Plate one lays the main silhouette in the first ink, a second plate lands with a roller sweep and adds the secondary shapes or counters, and any overprint colour appears where they cross. Plates start misregistered and drift together. Each plate uses a colour already in the logo.
- Resolve: on the hold, offsets reach zero, halftone fills to solid, and grain and pinholes fade out, ending on the crisp logo SVG in brand colors. A halftone or misregistered wordmark is never the resolve.

## Watch out
Three halftoned plates in one area turn to mud. Dots anchored to objects instead of paper look like a texture overlay. Every main colour needs some of the first plate or it vanishes in one-ink frames. Light skin takes a light tint of the palest ink. Never show a printer brand, logo or machine trade dress.

Ink roles, mapped onto the brand palette: ink 1 carries silhouettes, ink 2 is the accent, ink 3 is the rare third. Example set only: blue `#0078BF`, fluorescent pink `#FF48B0`, yellow `#FFE800`.
