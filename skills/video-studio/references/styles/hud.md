# Cyberpunk HUD (FUI)

- id: `hud`
- Source: mg-styles-15 `prompts/22-hud.md` (MIT, Vincentwei1021)
- Best for: tech reviews, AI product demos, game edits, sci-fi and aerospace explainers, film-UI style intros
- Not for: warm, organic, calm editorial, or hand-made looks
- Triggers: HUD, FUI, cyberpunk, sci-fi interface, targeting, radar, hologram, tech UI, terminal, scanlines, Territory Studio, Cyberpunk 2077, Evangelion
- Tone cell: kinetic-sharp
- Clock: smooth 30 fps

## Look
Deep teal-black. Cyan #00E5FF linework with orange/red #FF6A00 as the alert state. Hex grid, concentric rotating rings with ticks, conic radar sweep with blips, columns of monospace numbers, typewriter status lines with a cursor, sparkline graphs. Central wireframe hologram (globe or drone) with scanlines. Global glow, slight chromatic aberration, scanlines, restrained micro-glitches. Film-UI density with restraint. Coordinates and labels in monospace, for example "N31°14′ E121°29′".

## Motion
Layered build-up: lines draw on in hierarchical staggered order, then data comes alive, then a target is found. Rings rotate at different speeds. Numbers jump randomly for 3-5 frames then settle on the real value. Typewriter text with blinking cursor. Lock brackets shrink in from the corners, scale 1.4 to 1.0 with fast-out slow-in, snapping onto the target. Then the whole UI flips to alert orange with "TARGET LOCKED". Micro-glitches kept sparse.

## Signature features (judged against these)
- Cyan and orange neon linework on teal-black.
- Wireframes draw on with dashoffset in staggered hierarchy.
- Radar sweep (conic) with blinking blips.
- Number columns roll 3-5 frames then settle.
- Lock brackets 1.4 to 1.0 fast-out slow-in.
- Hue flip from cyan to orange on lock.
- Global glow, chromatic aberration, scanlines.
- Monospace typewriter text with cursor.

## 10-second beat seed
- 0-1.2s: hex grid and first rings draw on.
- 1.2-5s: data columns, radar, hologram, status lines come alive.
- 5-7s: a blip is found, lock brackets close in.
- 7-8.5s (hero at 70-85%): palette flips to orange, "TARGET LOCKED", alarm.
- 8.5-10s: held with ongoing rings and scan.

## Sound
Darksynth pulse with HUD beeps, scan sweeps, an ascending lock-on tone, and an alarm on lock.

## Build it in HyperFrames
SVG layers for rings and ticks, conic-gradient or canvas for the radar sweep (angle = t * speed), Three.js wireframe hologram with scanline overlay for the center. All data seeded: number at step k = seededRandom(k) until settle time, then final value. Glow with an SVG blur or a bloom pass, RGB offset by a post shader or duplicated layers with mix-blend-mode: screen.

## Watch out
Too dense and unreadable: keep hierarchy, leave negative space. Unseeded random numbers break determinism. Keep glitches rare. Do not use real military or brand insignia.
