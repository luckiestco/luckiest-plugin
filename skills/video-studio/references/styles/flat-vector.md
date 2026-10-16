# Flat Vector Explainer

- id: `flat-vector`
- Source: mg-styles-15 `prompts/01-flat-vector.md` (MIT, Vincentwei1021)
- Best for: SaaS explainer, product launch, annual report, science explainer, brand film in one continuous shot
- Not for: photoreal products, moody or cinematic tone, anything needing gradients or texture
- Triggers: flat design, vector, explainer, 2D motion graphics, corporate explainer, Material design, shape wipe, bouncy, brand film, Buck, Motion Ocean, Google explainer
- Tone cell: kinetic-soft
- Clock: smooth 30 fps

## Look
Solid color blocks only, no gradients, no or minimal stroke. Bold 5-6 color palette: ultramarine #2B2BFF, coral #FF5A4E, sunflower #FFC62B, mint #2EE6A8, cream #FFF6E9, ink #151433. Geometric characters (circles, rounded rects, limbs as capsules). Clean negative space. Rounded heavy sans for titles. All elements are vector shapes. Shape wipes use full palette colors, never white flashes.

## Motion
Elastic overshoot is the soul: cubic-bezier(0.34,1.56,0.64,1), or a bezier with 70-85% influence handles. Every entrance is anticipation, burst out, rebound. Stagger entrances 2-4 frames, each element with its own mini overshoot. Squash and stretch about 10% on moves. Only one hero moves at a time. Secondary action and follow-through on limbs, birds, clouds. Transitions are element-driven: a shape expands to fill the frame (shape wipe), or an object flies out and carries the cut. One continuous shot: push into a window, into a phone, into a bubble.

## Signature features (judged against these)
- Zero gradients, 5-6 flat palette colors only.
- Entrances use anticipation then overshoot (about 1.1x scale) then settle.
- Building or icon stagger of 2-4 frames.
- 10% squash and stretch on moving shapes.
- Limb rig with anchor-point rotations, head bob, blink.
- At least one shape-wipe or element-carried transition, no crossfades.
- One hero moves at a time.
- Logo lockup assembled by elements flying in, held 1s with micro-motion.

## 10-second beat seed
- 0-1.2s: empty color field, one saturated circle drops in, stretch, squash, overshoot, settle.
- 1.2-3s: circle becomes a sun, flat city pops up building by building, clouds slide, birds flap.
- 3-5.5s: camera pushes into one window, geometric character at a desk reacts, phone pings.
- 5.5-8s (hero at 60-75%): notification bubble expands as a shape wipe, icons burst in on rhythm (bars grow, check draws, heart pops, coin flips).
- 8-10s: everything collapses into the brand's real logo lockup plus tagline, elastic settle, hold 1s with micro-motion.

## Sound
Upbeat future-bass or pop, about 120 BPM. Pop, boing and whoosh on every entry, synced to the frame.

## Build it in HyperFrames
SVG composition driven by GSAP with a paused timeline seeked per frame. Put the overshoot curve in a CustomEase or the bezier above. Use nested groups with transform-origin set to joints for limb rigs. Shape wipes are a scaled circle or rect in a palette color. For motion blur on fast moves, render sub-frames (about 4) and average, or skip blur and keep moves short.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the lockup is assembled from the mark's own shapes flying in, in its construction order (largest primitive first, then cuts, counters and the wordmark), each with the card's anticipation, overshoot and 2-4 frame stagger.
- Resolve: the elastic settle ends exactly on the logo SVG at its master size and position, with micro-motion stopping for the last frame. An invented brand lockup is never the resolve.

## Watch out
Template look is the main failure: same icon-burst grid, no idea. Avoid more than one hero moving. Keep every color from the palette. Do not let gradients sneak in through shadows. Check kerning on the lockup.
