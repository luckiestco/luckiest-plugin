# Comic Pop (Ben-Day dots)

- id: `comic-pop`
- Source: huashu-art-motion `13_pop.md` (MIT)
- Best for: sale and promo spots, social shorts, youth brands, product comparisons, reaction clips
- Not for: luxury, calm wellness, serious finance
- Triggers: pop art, lichtenstein, warhol, comic book, ben-day dots, halftone, speech bubble, onomatopoeia, four-panel
- Tone cell: kinetic-sharp
- Clock: on twos (color swaps about every 5.5 frames, shake locked to 30 fps)

## Look
Flat primaries with thick black outline (5 px) and no gradients.
- Black `#141414`, paper `#f3eedb`, blue `#2f5cc8`, yellow `#f7d52c`, red `#d8232a` / `#a8161c`, white `#fbf8ee`.
- Skin tone is `#fae0cc` with red dots (`#e2483c`). Four swap palettes for panels: `#9ccf3a #e0359a #2fc0b0 #f08a2a`.
Dots: blue background pitch 24, radius 5.6, 45 degree grid (diagonal spacing about 17 px); skin pitch 13, radius 3.3; a faint yellow print dot pitch 14, radius 2.2, alpha 0.18. Shadows are black diagonal hatching (10 px spacing, 3.5 px wide). Lettering is a bold comic face (Bangers) with 12 px black outline and a 4 px drop shadow. Compose in a panel with a heavy 6 px black frame.

## Motion
- Four-panel color swap: `step = floor(lt*11)`, panel i uses palette `(i+step)%4`, with a slightly misregistered black shadow plate for screen-print error.
- Thinking dots: three dots in sequence, dot k is lit when `((f-2k) mod 12) < 4`, radius 20 vs 12, 6 px jump.
- Sound-effect burst shakes: hash jitter +/-8 px, +/-6 px, +/-0.03 rad at 30 fps; 10 black action lines pulse `0.85+0.25*sin(40t+2i)`.
- Subject squash and wiggle at 6 Hz, weight by distance from the pivot.
- Transition family: a lightning-bolt flash that turns the old frame into dots, then reveals the new panel.

## Signature features (judged against these)
- Dots are screen-aligned (a pattern fill), they do not swim with moving subjects.
- Thick black outline plus flat fill on everything.
- Hatching for shadow, white short strokes for highlight.
- Burst shape with two layers (white outer, yellow inner) and lettered effect text.
- Color-swapped repeat panels with a black misregistration shadow.
- Hair or large shapes built from a union outline (stroke all black first, then fill all).

## 10-second beat seed
- 0-1.2s: panel slams in with a burst and effect word.
- 1.2-4s: thinking dots, subject wiggle.
- 4-7s (hero): four-panel color swap at 11 Hz with the key message.
- 8.8-10s: freeze on one panel, burst keeps shaking.

## Sound
Brass stabs and a snare, 120-140 BPM. Comic "pop" SFX per swap, whoosh on the bolt transition.

## Build it in HyperFrames
Canvas 2D `createPattern` for dots: a small tile with 5 circles (four corners plus center) gives a 45 degree grid at near-zero cost, much faster than per-dot pixel sampling.
- Cache the static panel layer; draw with one `ink(path, fill, lw)` helper for all outlined shapes.
- Union outlines: stroke all sub-shapes at double width in black, then fill them all.

## Watch out
- In the source this style scored top marks with no weak spot logged (index shows none).
- A large shape filled with one flat color reads like a cloth. Add the interior curl lines and black arcs for the sculpted comic look.
- A subject drawn in its resting position can float above a crouched pose. Move the head down into the body when squashing.
