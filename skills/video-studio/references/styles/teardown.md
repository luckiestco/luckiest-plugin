# Exploded Teardown

- id: `teardown`
- Source: Lemo-Opuscar `styles/teardown/STYLE.md` (MIT, lemomo-ai)
- Best for: hardware launch and "what is inside" films, device and PCB teardowns, engineering-led product explainers, open-hardware showcases
- Not for: one intact object shown for material beauty (3d-render), a one-take camera flight around a sealed object (product-flight), UI walkthroughs, product lineups, assembly manuals with step arrows and hands
- Triggers: teardown, exploded view, take apart, what's inside, PCB, circuit board, CAD, STEP file, KiCad, BOM, open hardware, repair guide, iFixit, dimension lines
- Tone cell: calm-sharp
- Clock: smooth 24 fps, deterministic

## Look
A real product, built from its own engineering files (CAD, board layout, bill of materials), lit like a studio packshot and shown apart. Layers float on one vertical axis with even gaps, each oriented as it sits in the product. PBR materials, a warm key from above front, a cool rim that follows the camera, soft contact shadow on an invisible floor over a dark seamless ground. Numbers live on the object: a dot on the part, a thin leader, a label, and dimension lines drawn in the scene's perspective.

Colors as roles: dark neutral ground, one warm-white ink at two strengths (names full, specs about 60%), one accent kept for measured things. The product is the brightest, most saturated thing in frame. Example palette only: ground #2a2c30 to #0c0d0f, ink #f2efe8, accent #ff7a45. Map the roles onto the brand palette.

Type: brand faces, else an OFL sans for names and an OFL monospace for specs. Label = two-digit index in the accent, name, one spec line, units written.

## Motion
Layers leave top first, 0.15 to 0.2s apart: smooth start, fast middle, long settle. Repeated parts fan out in a wave ordered by distance from a corner. Layers hold still during macro stops. Closing runs bottom first, about 1s per layer, and the last part lands with a real mechanical response (a key travels its stroke and returns). Labels draw in (dot, leader grows, text slides about 10px) and fade before parts move again. The camera never stops: orbit, grazing macro dolly, dive between lifted layers, slow push on the one part that matters, fast pull back. No cuts or wipes.

## Signature features (judged against these)
- Geometry and counts come from the product's own files or published dimensions, never eyeballed.
- Layers float apart on one axis with even gaps, top-first stagger, then close bottom-first.
- Photographed look: PBR, key plus cool rim, contact shadow, depth of field that grows in macro.
- Labels anchored in 3D with leaders and perspective dimension lines, never a table beside the object.
- One accent, reserved for measured things.
- Continuous camera with a macro stop that holds still while its label reads.
- One true mechanical motion or interior light while apart, and a final close into one object.

## 10-second beat seed
- 0-1.2s: closed product in frame, grazing macro drift across a real surface detail.
- 1.2-3s: top layer lifts, then the next, slow orbit begins.
- 3-6s (hero at 60-75%): stack held apart, dive into the gap to the hidden part, one-fact label, hold still.
- 6-8.5s: pull back, layers close bottom-first, last part lands with its true motion.
- 8.5-10s: dimension lines draw on the closed outline, then resolve to the real logo (see Logo construction).

## Sound
Dry and precise outside the object, airy inside. Tuned mallets or glass tones, round bass, short kick. Foley is the material: plastic clacks, switch clicks, board taps, metal rings, swooshes for lifts and dives, pen hiss when a dimension draws, a tick per label, each panned to its part. At least two near-silences before the big separation and the turn back. Calm close voice, music about 10 dB under it, near -14 LUFS.

## Build it in HyperFrames
three.js (WebGL2) with MeshPhysicalMaterial, 2x then downsampled, ambient occlusion, one depth-of-field aperture, bloom for emitters only. Geometry from the user's STEP or board-layout files converted to meshes ahead of time, board textures painted to canvas at roughly 14 to 20 px per millimetre. Every frame is a pure function of t: layer offsets, wave delays, camera pose and label opacity are closed-form eases of t (no timers, no Math.random, no stateful physics). Camera keyed in product coordinates with monotone interpolation so a held macro really holds. Labels and dimension lines are projected from 3D anchor points each frame; only subtitles and title cards live in screen space. Ship a FACTS.md (claim, source or measurement method) with the film.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the mark's own primitives are the layers. They start stacked in place, lift apart on one axis in construction order (outer shape first, then cuts and counters) with the card's top-first stagger, hold with one leader and index per primitive, then close bottom-first. Depth is a slight extrusion of the logo's own paths. Nothing is added that the logo does not contain.
- Resolve: in the last 0.3s the extrusion, shadow and lighting flatten and the camera settles front-on, so the hold frame is the flat logo SVG in brand colors. Labels are gone by then. A labeled exploded diagram is never the resolve.

## Watch out
Invented numbers: measure from the CAD and mark it "measured" in FACTS.md, or leave it out. Mixed revisions: hole positions and stack heights must coincide across files. Panelised board files hold breakaway tabs, so take the outline from a case of the same revision. Duplicate outline points give zero normals and black tiles. Overshooting camera splines fly past macro stops, use monotone interpolation. Macro labels need about three seconds. Black plastic on a black ground vanishes, lift it to dark grey. Chip tops carry trademarks, use plain package tops unless the product is the user's own. Check open-hardware licences (share-alike differs from permissive). Never swap a real part for a generated image.
