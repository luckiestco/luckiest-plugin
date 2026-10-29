# Engineering Blueprint

- id: `blueprint`
- Source: Lemo-Opuscar `styles/blueprint/STYLE.md` (MIT, lemomo-ai)
- Best for: how-it-works explainers, hardware and mechanical products, architecture and infrastructure, engineering and developer-tool brands, 30-60s
- Not for: loud, playful or people-led stories, photoreal, or long on-screen paragraphs. Not `line-art` (one gold monoline, one continuous path, no conventions, no annotations). Not `whiteboard` (marker on white, loose hand sketch, argument maps). Not `hud` (glowing 3D wireframe, orbiting camera). Not `isometric` (filled color 2.5D).
- Triggers: blueprint, cyanotype, technical drawing, engineering drawing, schematic, patent drawing, exploded view, CAD, drafting, draft, cutaway, diagram, spec sheet, title block, Leonardo
- Tone cell: calm-sharp
- Clock: smooth 24-30 fps (draw-on and camera follow length, mechanisms step on beats)

## Look
The whole film plays on one sheet of paper seen by a moving camera. Roles: ground (one deep blue with slight uneven value, fold creases, soft vignette), ink (a single pale blue-white for every line), and one accent used exactly once. Example palette, an example only: ground `#18336B` to `#2A58A6`, ink `#E7F0F9`, accent a stamp red. Remap to the brand: ground from the darkest brand color, ink from the lightest, accent from the brand highlight. Content is drawn with technical convention: outlines, thin detail, hatching, dimension lines, leader lines to numbered balloons, a title block, a notes column. Strictly 2D: orthographic or oblique projection, never a 3D render. The product or machine is the character. People appear only as a hand shadow or a signature.

## Motion
Everything is drawn on, in drafting order: centre lines, outlines, detail, hatching, dimensions, balloons, labels, one layer per beat. Draw-on is truncated by arc length with a bright nib at the head. Exploded views send parts out along one axis on beat subdivisions, then return them one per beat with a click. Mechanisms advance in steps like an escapement. Dimension numbers change as parts move. Failure is slowing and sagging, success is a snap upright with a small overshoot. Camera moves are continuous inside a section and cut on downbeats between sections. Fig. numbers are struck through and rewritten as the transition. No dissolves.

## Signature features (judged against these)
- One sheet, one ink color: white-blue lines on a blue ground, hue never varies.
- At least four line weights (outline, detail, thin, hair) that scale with zoom, so close-ups do not thicken and wides do not vanish.
- Drafting order: centre lines first, labels last.
- Dimension lines, leader lines with numbered balloons, and a title block are visible.
- Dash conventions: centre line, hidden line, cutting plane.
- Parts occlude what is behind them (paper fill before outline).
- Exactly one non-blue accent, used once, as the verdict.
- Subtitles lettered as drawing notes in empty space, never a fixed bottom bar.

## 10-second beat seed
- 0-1.2s: sheet already on the table, one centre line crossing it.
- 1.2-4s: outline and detail draw on, balloons pop in as lines finish.
- 4-7s (hero at 60-75%): the object explodes along its axis, dimensions update, a section line sweeps across to show the inside.
- 7-8.5s: parts return with clicks, the accent stamp lands in the title block.
- 8.5-10s: the real logo builds in the title block from its own construction lines, then resolves to the logo SVG (see Logo construction).

## Sound
Contrapuntal and mechanical: harpsichord or music box, light strings, or a plucked ostinato. Paper and tool foley: pen scratch whose length matches the stroke, T-square slide, compass squeak, part clicks, escapement ticks, one stamp thump. Silence may contain paper sounds only. Voice is dry and short, with the biggest moment left silent.

## Build it in HyperFrames
Inline SVG on one sheet group, with the camera as a transform on that group. Draw-on is stroke-dasharray = length and stroke-dashoffset as a function of t. Stroke width = sheet width x zoom^0.65 (not width x zoom) to keep weights readable. Paper is a canvas or SVG feTurbulence layer in sheet coordinates, seeded from a fixed constant, never Math.random. Paint solids with the ground fill before stroking outlines for occlusion. Dimension text reads values computed from the part positions at t. Gears and mechanisms use step functions of floor(t * rate). Every frame is a pure function of time t: no timers, no Math.random.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the mark is drafted as a technical figure in the title block. Centre lines and construction circles first, then the outline, then dimension ticks and a balloon on the key proportion, drawn on in the mark's own construction order.
- Resolve: the dimension lines and construction lines fade out over about 0.4s while the outline fills with the logo's brand colors, ending on the crisp logo SVG. A drafted lettering wordmark is never the resolve.

## Watch out
Line widths that do not scale with zoom make sausages in close-ups. Keep the main figure away from the sheet edge or wides show the desk. Exploding parts upward collides with the header, so explode sideways. A second accent color, glow, or 3D orbit turns this into `hud`. Composite subtitles as a separate overlay, not on the line layer. Fonts: brand faces; if none, an OFL hand lettering face for notes and an OFL technical sans for title-block fields.
