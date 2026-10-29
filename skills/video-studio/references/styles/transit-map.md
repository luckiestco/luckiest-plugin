# Transit Map Growth

- id: `transit-map`
- Source: Lemo-Opuscar `styles/transit-map/STYLE.md` (MIT, lemomo-ai)
- Best for: roadmaps, company or product growth over years, network or store rollouts, migration routes, careers told stop by stop, two rivals growing side by side
- Not for: a single number or a plain trend (use `finance-chart`: it plots values on axes, this style has no axes and shows growth as lines laid down on a map), unsourced figures, 3D city or terrain maps, slide-like decks
- Triggers: metro map, subway map, transit map, tube map, route map, network growth, roadmap, rollout, timeline as a map, stations, interchange, Vignelli, Beck
- Tone cell: calm-sharp
- Clock: smooth 30 fps

## Look
A printed schematic sheet on a dark table, seen by a perspective camera. Every line, river edge and coastline runs horizontal, vertical or at 45 degrees with one corner radius. Stops are white discs ringed in the line colour. Where lines meet, one white capsule with a dark outline wraps all the points. Water is one flat pale band with a darker edge. Paper is warm off-white with faint tooth, one fixed raking light, light vignette. Labels carry a paper-coloured halo. A small cartouche in one corner holds the map's name.

Colour roles map onto the brand palette: paper, ink, water, one accent for the key line, one dark neutral for what is compared against, and spaced line hues. Line colour means identity only. Mode (rail, bus, ferry) is shown by line form: solid, hollow, thin thread, dashed underground. Example only: paper `#F4F0E8`, ink `#1C1D20`, water `#C3D9EA`, accent `#D6192E`, comparison `#27366F`.

Type: brand faces, or an OFL grotesk.

## Motion
Growth is drawing. A glowing pen tip (white core, line-colour ring and halo) travels each route and a line exists only as far as the tip has gone. Stops pop with a ring as the tip passes. An interchange appears only when a second line really arrives: the capsule drops onto the paper with a soft shadow and ink rings spread. A line crossing water turns dashed while the camera dips low. Names appear by zoom level, never by timer. A counter lands only on sourced values and blurs between them.

Camera: ride just ahead of a pen tip (tilt 15-30 degrees), pull back as detail levels change, sweep low over the busiest knot with shallow focus, lock top-down for any comparison. Tilt stays under about 65 degrees, no roll.

## Signature features (judged against these)
- Eight directions only, one corner radius, no wiggles.
- Lines grow by pen tip, stops light as it passes, interchanges form on arrival with weight.
- At least one tilted shot with depth of field. A top-down-only film reads as a slideshow.
- Printed look: paper tooth, one fixed raking light, labels placed once on the finished network so none jump.
- Mode by line form, never by colour. Dashed means below.
- Level of detail by zoom: minor names fade first, hubs stay.
- Every count, year and length is sourced and lands on a held beat. The film ends on the whole network, with the end title printed on the sheet.

## 10-second beat seed
- 0-1.5s: blank sheet, cartouche carries the title, first pen tip already moving.
- 1.5-4s: tip rides one route, stops pop behind it, the accent line completes.
- 4-6s (key line at 60%): a second line arrives at a stop, the interchange capsule falls and rings.
- 6-8s: camera dips where a line crosses water, goes dashed, resurfaces, counter lands on a sourced value.
- 8-10s: pull back through detail levels to the full network, end title printed in the margin, then resolve (see Logo construction).

## Sound
Tuned percussion (marimba, glockenspiel): a pluck per stop, a pop with a low thump per interchange, a two-note chime as the motif. Each new line adds one voice to a running ostinato, so the arrangement grows with the network. Felt-tip glide under the tip, ratchet ticks on the counter. One beat of near silence before any verdict.

## Build it in HyperFrames
SVG sheet on a CSS 3D plane (about 32 degree field of view), or WebGL if depth of field must be exact. Every frame is a pure function of time t: no timers, no Math.random. Work in a grid unit G. Expand each route into a polyline with a 0/45/90 bend and filleted corners, then precompute arc length, the time each tip passes each stop, interchange arrival times and label placement before frame one. Tip position = point at arc length ease(t). Stop pops and rings are functions of (t - tPass). Dashes and casing switch on inside water intervals. Blur radius from |depth - focus depth|, capped. Paper noise is seeded and sampled in sheet coordinates so it never slides.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the mark's strokes are traced by a pen tip in their construction order, snapped to the eight-direction grid only when the mark itself already sits on it. Round or off-angle strokes keep their true shape, drawn by the same tip. Closed shapes land as a stop and ring when finished.
- Resolve: the sheet and map fade back under a paper wash while the drawn mark settles to the real logo SVG in brand colours at the final size, then holds. The map never replaces or restyles the logo.

## Watch out
- Any segment off 0/45/90 degrees breaks the style. Validate every segment.
- Labels that move as lines arrive: place them once on the finished network.
- Counters that interpolate invent numbers. Land only on sourced values.
- Real networks: published line colours and station names are facts, logos and branded bullets are not. Say on screen it is unofficial and check every date and length against the operator. An invented network says so on screen.
- A map too thin to carry the film: aim for one new event every 3 to 5 seconds and wide shots that show network, not empty paper.
- A tip that crosses the screen too fast to follow needs a wider zoom or a slower tip.
