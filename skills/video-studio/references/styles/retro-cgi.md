# Retro CGI Render

- id: `retro-cgi`
- Source: huashu-art-motion `15_raytrace.md` (MIT)
- Best for: nostalgia tech, intros for software, games, 3D-logo reveals, retro brand throwbacks (narrow use)
- Not for: modern minimal UI, organic subjects, handmade looks
- Triggers: 90s cgi, early ray tracing, chrome sphere, checkerboard floor, plastic render, wireframe, pov-ray, silicon graphics
- Tone cell: kinetic-sharp
- Clock: smooth 30/60 fps

## Look
Every object looks like glossy plastic from a 1993 render.
- Walls teal `#7dbcb9 -> #64a6a6 -> #3f8285` with a radial light at the window; sky `#a24cc4 -> #df62ae -> #f5a08a -> #f8c070`; pink wireframe grid mountains (28 x 26 cells) with sawtooth snow caps.
- Ground is a perspective checkerboard computed per pixel (vanishing point (960,480), `X=(x-960)/dy`, `Z=1/dy`, tile 0.27 x 0.00029, 2x2 supersampling, fog over the nearest 140 px by 35%).
- Plastic shading helper `plastic(path, base, hx, hy, R)`: base fill, radial gradient from the highlight (white 0.55 -> 0.06 at 0.28 -> clear at 0.62 -> deep purple `rgba(10,0,30,0.42)` at the edge), `lighter` ambient bounce in the wall color, then a small hard-edged white ellipse specular (0.16R x 0.09R, alpha 0.85).
- Limbs are cylinders: gradient across the normal (dark 0.25, bright 0.5 band at 22%, dark 0.45) plus a thin white highlight line. Joints are visible balls (toy-figure feel).
- Floor reflections: mirror the object layer, alpha 0.34, drawn each object on its own layer first so many small pieces do not stack to opaque.

## Motion
- Ring of 140 spheres spinning about a vertical axis at 7 rad/s, tilted 0.35, depth-sorted (a dark base layer first so spheres merge into a tube).
- Chrome ball: per-pixel environment map (down: checkerboard, up: pink-purple sky plus a window strip); the checker u coordinate shifts `t*4.5`; Fresnel rim brightens; diameter 104 px, under 2 ms.
- Lens flare (`lighter`): core 170 px pulsing +/-8% at 23 rad/s, 12 spikes at 1.6 rad/s, 960 px horizontal bar, five circle and hexagon ghosts along the sun-to-center line sliding `sin(5t)*0.03`.
- Glowing eyes or lights pulse +/-25% at 18 rad/s; a diagonal glass reflection slides 260 px/s.
- Transition family: green wireframe of the new image (edges cached on first frame) then scanline-fills into the rendered picture.

## Signature features (judged against these)
- Uniform plastic shading with the same highlight logic on every object.
- Perspective checker floor with fog and mirrored reflections.
- Spinning ring/ball with visible per-sphere highlights.
- Pink wireframe terrain and a gradient sunset sky.
- Chrome sphere reflecting the scene.
- Lens flare with ghosts, rotating spikes.
- Wireframe to render transition.

## 10-second beat seed
- 0-1.2s: wireframe resolves to rendered scene.
- 1.2-6s: ring spins, chrome ball rolls, flare glints.
- 6-7.5s (hero): camera-fixed flare sweep and title in chrome.
- 8.8-10s: hold, ring continues to spin.

## Sound
FM synth pads and a gated snare, 100-115 BPM. Whoosh on flare, "bling" on specular glints.

## Build it in HyperFrames
Fake it in Canvas 2D or really render in Three.js with MeshPhong materials and a 4x4 checker texture.
- The checkerboard and fog are cached (cold start about 53 ms); hot frame about 23 ms.
- Snapshot the wireframe from the first frame of the incoming scene, so that frame must be complete (no blank first frame).
- Smooth any polyline silhouettes before applying plastic shading or corners show.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the mark first appears as the card's wireframe, its edges drawn in the mark's construction order (outer silhouette, then cuts and counters), then the scanline fill turns it into plastic shading. The chrome ball, ring and flare keep moving behind it; they never stand in for the mark.
- Resolve: the plastic bevel, specular and floor reflection fade out in the last 0.3s, and the hold frame is the flat logo SVG in brand colors. A chrome or extruded rendering of the name is never the resolve.

## Watch out
- Current weak spot: legs look like straight columns and the face reads like a mask. Give organic parts rounded profiles and expression.
- Narrow use: only works when the retro 3D joke is the point.
