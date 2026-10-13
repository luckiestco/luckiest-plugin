# Liquid Metaball Motion

- id: `liquid`
- Source: mg-styles-15 `prompts/07-liquid.md` (MIT, Vincentwei1021)
- Best for: music video packaging, food and drink ads, logo genesis, transition packs
- Not for: precise technical content, minimal corporate, long text
- Triggers: liquid, fluid, metaball, goo, gooey, paint splash, drip, melt, blob, ink flood, liquid transition, logo reveal
- Tone cell: kinetic-soft
- Clock: smooth 30 fps

## Look
Deep plum ground. Glossy candy liquid going hot orange to pink to violet, with specular highlights and fresnel rim so it reads as thick 3D liquid, not flat blobs. Organic curves, never straight lines. Wordmark (invented, for example "FLUX") formed from the liquid, blended with metaballs.

## Motion
Flung, never uniform: cubic-bezier(0.22,1,0.36,1). Droplets fall and splash, flat squash on landing. Blobs fuse with stretched necks that snap, both ends rebound 2-3 frames. Secondary droplets follow the main body 2-3 frames late. A big liquid wave floods the frame as the transition, with a wavy front carrying 3-5 phase-offset bulges. Liquid coalesces into the wordmark. Last drip falls from the logo and ripples.

## Signature features (judged against these)
- Metaball fusion with visible stretched necks and snap.
- Wavy flood transition with 3-5 phase-offset bulges.
- Secondary droplets lag the body by 2-3 frames.
- Rebound of 2-3 frames at the snap.
- Fake 3D lighting: specular and fresnel rim, not flat fills.
- Ease is fast-out slow-in, never constant speed.
- Wordmark formed from liquid, final drip and ripple.

## 10-second beat seed
- 0-2s: droplets fall and splash.
- 2-4s: blobs merge with stretched necks, snap, rebound.
- 4-6s: flood wave crosses the frame.
- 6-8.5s (hero at 60-75%): liquid coalesces into the wordmark.
- 8.5-10s: last drip, ripple, hold.

## Sound
Bubbly gloops, pour, splash and drip, deep bass swell under a glossy synth bed.

## Build it in HyperFrames
WebGL2 fragment shader: sum of 2D SDF circles with smooth-min (polynomial k about 0.2 of radius), normals from the field gradient for fake 3D lighting, text as an SDF texture blended with the same field. Positions come from closed-form springs and splines of t. Cheaper fallback: SVG blur 20px+ then an feColorMatrix alpha threshold for the goo, add highlights as a second pass.


## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the liquid gathers into the mark's primitives one by one (largest first), with the necks snapping at the joins the mark actually has.
- Resolve: the metaball field converges onto the logo's SDF in the last 0.3s, the specular and rim lighting fade out, and the hold frame is the flat logo SVG in brand colors. Liquid-styled lettering is never the resolve.

## Watch out
Flat blob look if lighting is skipped. Necks that never snap read as jelly. Banding in gradients: add 2-3% noise. Keep wave front phase offsets seeded, not random per frame.
