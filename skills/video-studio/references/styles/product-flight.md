# Continuous Product Flight

- id: `product-flight`
- Source: Luckiest, from the approved PSA slab film (2026-10-14), a remake of the whatships.com OneKey Pro 2 film. Rules come from the user's Motion OS review notes on that run.
- Best for: collectible and premium single-object reveals (graded cards, watches, sneakers, devices, bottles), music-timed hero films, launch teasers, 9:16 and 4:5 cutdowns of the same flight
- Not for: product lineups, UI walkthroughs, voiceover explainers, anything that needs more than one product on screen
- Triggers: continuous shot, one take, oner, camera flight, fly around, orbit the product, speed ramp, speed ramps, transparent case, clear acrylic, acrylic slab, graded card, PSA slab, collectible, trading card, whatships
- Tone cell: calm-sharp
- Clock: smooth 30 fps, motion blur only on fast stretches

## Look
One hero object on a near-black ground (#0B0B0F, never pure #000, which bands after recompression). Clear material where the product has one: transmission with IOR about 1.49 for acrylic, a thin edge glow, raised lips and wells modeled, not painted. Textures are cut from the user's own photos; the product's art, labels and text are never redrawn. One warm rim light is the only accent and carries one meaning. Bold side captions (about 64px at 1080p, heavy grotesk) sit beside the subject, never over it. Feature beats get a frosted glass callout with a drawn pointer line to the exact detail. The real brand logo file, never a typed stand-in.

## Motion
One continuous camera flight around one object, no cuts. Each line of the script is a camera stop: a slow drift while the caption reads, then a speed ramp (cubic in-out, fast middle) to the next stop, so the energy comes from velocity changes, not edits. Motion blur scales with pose speed, so drifts stay crisp and whips smear. Feature stops are angled and wide enough to tease, then reveal; tight macros read as cropped. Set pieces, at most one each: a whip-around reveal of the full product, the case drifting apart then slamming shut, a whip-flip to the back, and one procedural VFX peak (cloud, smoke and fire shader) that fills the frame behind the hero.

## Signature features (judged against these)
- One product on screen at all times, one continuous camera, zero hard cuts.
- Stops joined by speed ramps: slow drift, whip, slow drift.
- Ramps start on downbeats. The reveal lands on the music's bass entry and the VFX peak on the drop.
- Captions beside the subject, never over it, readable at phone size.
- A glass callout with a pointer line on every feature beat.
- Real photos and real brand assets only. No AI redraw of the product, its art or its label.
- The edge light pulses on the beat only in sections with drums.

## 10-second beat seed
- 0-1.5s: product dark, a sliver of rim light, one word of setup.
- 1.5-4s: slow drift past a detail at an angle, caption beside it.
- 4-5s (on a downbeat): ramp into a whip-around.
- 5-7.5s (hero at 50-75%, on the bass entry): land front-on, the whole product seen for the first time, name it.
- 7.5-10s: callout with a line to the one feature that matters, slow push, hold the last 1s.

## Sound
A licensed track or the user's own, cut on downbeats so film time 0 is a downbeat and every join falls on one. Splice only at the song's natural transitions or with beat-aligned crossfades; a hard swap skips audibly. Anchor the reveal, the flip and the VFX peak to the song's own entries and drop. Master near -13 LUFS. No whooshes stacked on every ramp; the music already carries them.

## Build it in HyperFrames
Three.js (WebGL2) with MeshPhysicalMaterial (transmission, thickness, ior 1.49, clearcoat) for the case, the photo textures on planes inside it, and an edge-light shader for the glow. The camera is an orbit pose (azimuth, elevation, distance, target) interpolated over a key list of `[end time, pose, ease]`, with closed-form eases (`in`, `out`, `ramp`, `sin`) so any frame renders alone from `?at=<seconds>`: no stateful animation. Captions, callouts and the logo are canvas or SVG textures drawn in the same frame. Motion blur is a sub-frame average whose count follows pose speed. The VFX peak is a raymarched or noise-driven fragment shader, not generated plates. Reels re-use the same keys: 9:16 moves captions clear of the platform buttons, 4:5 pulls the camera back about 1.2x.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the logo SVG's own paths are flat planes in the scene, and the camera flies to them as its last stop. They build in construction order (outer shape first, then cuts and counters) during the final ramp, lit by the same rim light.
- Resolve: the ramp lands front-on and orthographic-matched; in the last 0.3s blur, glow and depth flatten so the hold frame is the flat logo SVG in brand colors.

## Watch out
Transmission in headless WebGL is slow and goes flat on a weak GPU: check the renderer logs a real GPU, and cap sub-frames. Too many stops makes the flight feel like a slideshow; keep 2.5 to 4s per stop. Several products, a second accent color, or a numeric claim the user did not give all break the card. Callout lines must point at the real detail in the texture, so check them on stills at each stop before the full render.
