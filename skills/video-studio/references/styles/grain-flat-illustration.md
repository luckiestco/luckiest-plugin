# Grain Flat Illustration

- id: `grain-flat-illustration`
- Source: huashu-art-motion `16_2026.md` (MIT)
- Best for: SaaS explainers, app launches, character-driven stories with a joke payoff, social shorts, onboarding
- Not for: photoreal products, heavy texture styles, dense data tables
- Triggers: flat illustration, dribbble, grain texture, stipple shading, vector character, modern 2d, noise gradient, editorial illustration
- Tone cell: kinetic-soft
- Clock: smooth 30/60 fps (limited-animation snaps allowed on hits)

## Look
Pure color blocks with no outlines. Volume comes from a slightly deeper shade of the same hue (for example a lit sweater block `#f08b7d`, a leg shape with one darker arc `#f3ad4c`). Grain is the finish: 2 px square stipple dots whose density is a function of position, for example a pink disc `0.12 + 0.75*clamp((y-cy+120)/420)` (denser toward the bottom), lavender blocks and a sun denser toward lower right. Static grain is baked into a cache. Characters get a second static grain texture composited with source-atop (5% dark dots alpha 70, 3.5% light dots alpha 90) so grain lands only on them. Light cones are 26,000 stipple dots, width growing 56 to 150 with y, fading with distance. Compose with a big-head character ratio (head scaled about 1.2x around the neck).

## Motion
- Performance first: anticipation, squash, snap, overshoot, settle. Examples: crouch (sy 1 to 0.86, sx to 1.07), stretch on launch (sy 1.12), squash on landing (sy 0.86 to 0.70, sx 1.18) with the feet pinned to the surface.
- Facing flips on the flattest frame (a snap, cleaner than a paper-turn).
- Repeated hits: prep 7 frames, strike 4, hold 4, recover 8; lean amount grows with reach.
- Falling object: gravity about 1.75 px/frame^2 at 60 fps, rotation `-0.12 - 2.3*q^1.3`, impact lines 8 frames, debris on parabolas, spill that widens then holds, two ripples.
- Secondary motion by damped oscillators: `damped(F, start, amp, period, decay)`, for a hanging lamp (0.055 rad, period 26 frames) and plants.
- Transition family: three-color concentric ring iris.

## Signature features (judged against these)
- No outlines anywhere.
- Grain density varies with position (falls off toward light).
- Character grain only on the character, not on the whole frame.
- Deliberate squash and stretch with feet pinned.
- Overshoot on arrivals, damped motion on environment.
- Three-act gag: set-up, escalation, payoff, then a signature or logo stamp.
- Background decorations boil at 4 fps (+/-1.5 px, +/-0.09 rad).

## 10-second beat seed
- 0-1.2s: character already doing something, title implied.
- 1.2-5s: escalation, three repeated attempts that get bigger.
- 5-7s (hero): the break or payoff with impact lines and debris.
- 8.8-10s: smug or relieved pose held, signature writes on with a clip reveal.

## Sound
Light funk or lo-fi pop, 100-116 BPM. Foley hits on every squash and hit, a cartoon crash, a final soft bell.

## Build it in HyperFrames
Canvas 2D with a pose library. Pose = local key points; `mixPose` lerps numbers between poses.
- Transform order: translate to center, rotate about feet or center, scale (squash about feet so they do not leave the ground).
- When aiming a limb after applying a lean transform, convert the target with `c.getTransform().invertSelf().transformPoint(...)`.
- Signature wipe: clip the text with the writing front moving over frames; underline in 24 segments tapering 3.4 to 1.4 px.

## Watch out
- No weak spot logged in the source. The main risk is a lifeless cut-and-paste character: keep secondary motion on everything.
- Measured frame numbers are written at 60 fps; scale them if you render at 30.
