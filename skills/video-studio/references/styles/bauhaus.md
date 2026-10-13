# Bauhaus Kinetic Poster

- id: `bauhaus`
- Source: mg-styles-15 `prompts/09-bauhaus.md` (MIT, Vincentwei1021)
- Best for: beat-driven kinetic posters, music and festival intros, design-studio identity, exhibition promos
- Not for: organic or soft subjects, long copy, character stories
- Triggers: Bauhaus, geometric, Swiss, International Typographic, kinetic poster, grid, modular, Kandinsky, constructivist, primary colors, beat-synced shapes, p5.js
- Tone cell: calm-sharp
- Clock: smooth 30 fps (motion quantised to the 120 BPM beat grid)

## Look
Cream paper #F1E9DA, red #E03C31, yellow #F2B705, blue #1E4FA3, black #111. Strict modular grid (for example 240px modules). Basic geometry only: quarter circles, semicircles, triangles, squares. Heavy geometric sans, small caps tagline. Subtle paper tooth and slight print misregistration allowed.

## Motion
Everything anchors to the grid: every move is an integer number of modules, every landing on a grid line. 120 BPM (0.5s per beat), one module acts per beat: quarter circles rotate 90 degrees about a corner pivot, semicircles slide one module, triangles flip, squares split. Rotation pivots alternate between own centre, corner, and frame centre. Easing is power2.inOut or linear. No overshoot, mechanical is the feature. Phase-shifted cascade wave across the grid on the drop.

## Signature features (judged against these)
- Only circle, triangle, rectangle forms in red, yellow, blue, black on cream.
- Every displacement is a whole number of grid modules.
- One action per beat, hits on the 0.5s grid.
- Rotation pivot alternates centre, corner, frame centre.
- No overshoot, power2.inOut or linear only.
- Phase-offset cascade across the grid.
- Final freeze is a balanced poster with vertical heavy sans word and small caps line.

## 10-second beat seed
- 0-2s: grid lines draw, first red circle lands on a beat.
- 2-6s: composition assembles, one module per beat.
- 6-8s (hero at 60-75%): phase-shifted cascade wave across the grid.
- 8-10s: freeze into the finished poster, type set ("BAUHAUS", "FORM, FARBE, FUNKTION"), hold with a tiny paper-grain drift.

## Sound
Minimal techno and clicks. Each flip is a pitched click or blip, kick on quarters, 120 BPM.

## Build it in HyperFrames
SVG or Canvas with GSAP on a module-based coordinate system (x = col * 240). Compute beat = t / 0.5 and drive each module's step with floor and an eased fraction of the beat. Cascade phase = (col + row) * beat offset. Cue sheet shared with the audio so clicks match the flips exactly.


## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: break the mark into grid modules (circles, quarter circles, bars). One module lands per beat in the mark's construction order, on whole grid steps. A mark that does not split into modules uses the card's rotation pivot to reveal its negative shape instead.
- Resolve: the freeze is the logo SVG at its true proportions, not snapped or re-colored to the poster palette, set on the grid with the card's type.

## Watch out
Any overshoot or bounce breaks the style. Off-grid positions from sub-pixel rounding. Colour count creep. Keep the type grid-aligned too.

## Art-history variant (huashu-art-motion `12_bauhaus`)
- Ground: aged cream paper `#ebe3cf` with soft mottling, one diagonal hairline. Palette adds blue `#2a58b4`, light blue `#b9cee0`, gray `#c6c3bb`, orange `#ee8a2a` to black `#161514`, red `#d3262b`, yellow `#efc12f`.
- Figures are circles, squares, triangles and thick rods with joint discs (cream disc, 5px black ring, black dot). No curved outlines.
- Motif motion: a long pole sweeps like a clock hand about a fixed hub (28 to 49.5 deg, ease out); a grid of window cells swaps colors at 13 fps (6 of 16 cells, never black); concentric arcs pulse outward; a ball rolls with rotation = distance / radius.
- Transition in: red, yellow and blue shapes rotate and scale up to cover the frame in 0.20s.
- Watch out: derive grid cell size from the inner width minus gaps, or cells overflow.
