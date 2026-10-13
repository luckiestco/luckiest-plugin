# Soft 3D Render

- id: `3d-render`
- Source: mg-styles-15 `prompts/04-3d-render.md` (MIT, Vincentwei1021)
- Best for: premium product ident, brand sting, phone/drink/sneaker spots, satisfying loops
- Not for: fast cutty edits, flat graphic looks, long runtimes on a weak GPU
- Triggers: 3D, C4D, Cinema 4D, Octane, Redshift, Blender render, clay render, soft pastel 3D, jelly, glossy plastic, cloner, satisfying, ASMR, product ident, Maxon reel
- Tone cell: calm-soft
- Clock: smooth 24 fps

## Look
Pastel studio with an infinite cyc backdrop, big soft area lights plus an HDRI, shallow depth of field (about f/1.8 feel), real motion blur. Material trio: SSS gummy (candy pink, peach), glossy plastic (cream, lilac), frosted glass or chrome accent. AO, soft reflections, subtle subsurface glow. Hero is an inflated, bevelled 3D wordmark or glossy jelly logo with an invented brand name. Clean hero composition at the end.

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

## Watch out
Browser render cost: cap sub-frames and instance counts. Muddy transmission on dark backgrounds. SSS is faked, tune with a rim light. Without DOF and motion blur it reads as a game engine.
