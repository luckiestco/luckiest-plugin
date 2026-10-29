# Soft 3D Render

- id: `3d-render`
- Source: mg-styles-15 `prompts/04-3d-render.md` (MIT, Vincentwei1021)
- Best for: premium product ident, brand sting, phone/drink/sneaker spots, satisfying loops
- Not for: fast cutty edits, flat graphic looks, long runtimes on a weak GPU
- Triggers: 3D, C4D, Cinema 4D, Octane, Redshift, Blender render, clay render, soft pastel 3D, jelly, glossy plastic, cloner, satisfying, ASMR, product ident, Maxon reel, glass render, glass product, transparent product, exploded view, dispersion
- Tone cell: calm-soft
- Clock: smooth 24 fps

## Look
Pastel studio with an infinite cyc backdrop, big soft area lights plus an HDRI, shallow depth of field (about f/1.8 feel), real motion blur. Material trio: SSS gummy (candy pink, peach), glossy plastic (cream, lilac), frosted glass or chrome accent. AO, soft reflections, subtle subsurface glow. Hero is an inflated, bevelled 3D wordmark or glossy jelly logo. Clean hero composition at the end.

## Motion
Cloner-style grid of glossy pills or spheres ripples with an effector wave. Hero drops in with squash and stretch via a damped spring, collides with and displaces the field. Long-tail ease on the camera: about 80% of the move in the first 20% of the time, very slow finish. Physics-feel everywhere, nothing linear. Impacts drive the cuts.

## Signature features (judged against these)
- Physically plausible materials: SSS soft gel, glossy plastic, glass or chrome.
- Soft studio three-point lighting plus HDRI and AO.
- Shallow depth of field with real motion blur.
- Cloner array with a wave effector.
- Damped-spring jiggle and soft-body collision on the hero.
- Camera long-tail ease, final hero held about 1s.
- 24 fps cinematic feel, candy palette.

## 10-second beat seed
- 0-1.2s: pastel cyc, cloner field already rippling, first drop of the hero.
- 1.2-5s: wave builds, hero lands and displaces the field.
- 5-7s (hero at 60-75%): collision, wordmark inflates and jiggles, camera long-tail push.
- 7-10s: settle to a clean composition, hold 1s with a slow idle wobble.

## Sound
Airy cinematic pad with ASMR-style soft thuds, squishes and bubbly pops, frame-synced to impacts.

## Build it in HyperFrames
Blender is not available. Use Three.js (WebGL2) with MeshPhysicalMaterial (clearcoat, sheen, transmission, thickness for SSS-like glow), RoomEnvironment or an HDRI for lighting, SSAO plus a bokeh pass for DOF, and a sub-frame accumulation buffer (render 8-16 sub-times per frame, average) for real motion blur. Instanced mesh for the cloner, the wave as a closed-form function of (distance, t). Hero springs are closed-form damped oscillators, no stateful physics.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the hero is the logo SVG's own paths extruded and bevelled (Three.js SVGLoader plus ExtrudeGeometry), dropped in as the mark's primitives in construction order (outer shape first, then cuts and counters), each landing with its own damped-spring squash. The jelly inflation swells those exact paths; it never adds letters, a wordmark or a name the logo does not have.
- Resolve: during the 1s hold the camera settles front-on and orthographic-matched, and in the last 0.3s the depth, SSS, clearcoat and bokeh flatten out so the hold frame is the flat logo SVG in brand colors. An invented inflated wordmark is never the resolve.

## Watch out
Browser render cost: cap sub-frames and instance counts. Muddy transmission on dark backgrounds. SSS is faked, tune with a rim light. Without DOF and motion blur it reads as a game engine.

## Glass product variant (Lemo-Opuscar `glass-product`)
- Swap the pastel cyc for an infinite black studio. The hero is glass, metal and light, with internals visible like a display case.
- Lighting: a small scene of emissive strips rebuilt into the environment every frame instead of an HDRI, plus one tall sweep strip on an arc behind the camera. Its highlight, refraction and dispersion move physically, so never paint a 2D highlight. Clear glass: full transmission, near-zero roughness, dispersion on. Frosted glass needs a bright opaque emitter inside or behind it or it reads as dark plastic. Anything inside glass must be opaque.
- Color roles: neutral world (black, greys, metal tints). One accent family reserved for light only (emission, caustic rings), optionally drifting between two neighboring hues. Rainbow dispersion only at thick glass edges. Use neutral tone mapping, since filmic AgX washes accents to white.
- Type: ultra-thin (weight 200) grotesk such as Inter Tight, very large with wide tracking in the upper third, a glint crossing the letters in sync with the sweep light. Subtitles on a frosted slab filled with the blurred live frame.
- Motion and camera: the camera always drifts (slow orbit or push), never locked, cuts and sweeps only on beats. Exploded view: long ease-out apart, short hover, very short ease-in snap on a downbeat, with the axis about 40 degrees to camera, since edge-on parts collapse to lines.
- Native move: show the invisible thing the product does as light traveling inside the glass, with a ring-shaped caustic spreading across the floor from each pulse.
- Sound: minimal electronic, never piano and strings. Glass shimmer for sweeps, magnetic clicks for snaps, a real beat of silence before a release.
- Watch out: concave glass facing camera prints a front light card as a grey rectangle (turn it off), and pure side profiles read as simple pots and mushrooms (use 3/4 views).
