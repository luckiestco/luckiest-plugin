# Motion vocabulary for video

Exact names for motion effects, so a reference breakdown, a storyboard line, or a
generation prompt says what it means. Find the description on the right, use the
name on the left. The GSAP column is how this skill builds it in a HyperFrames
scene. Adapted from Emil Kowalski's animation-vocabulary (MIT).

## Entrances and exits

| Term | What it looks like | GSAP |
|---|---|---|
| Fade in / out | Appears or disappears through opacity only | `autoAlpha` |
| Slide in | Enters from off frame along one edge | `x` or `y` with `xPercent`/`yPercent` |
| Scale in | Grows to full size from slightly smaller, with a fade | `scale: 0.95, autoAlpha: 0` |
| Pop in | Lands with a small overshoot, like it bounced into place | `back.out(1.4)` |
| Reveal / wipe | Uncovered by a moving edge | `clipPath: "inset(...)"` |
| Mask reveal | Uncovered through a soft-edged shape or gradient | `maskImage` or a gradient layer |
| Line draw | An SVG path traces itself in | `strokeDashoffset` |
| Typewriter | Text appears one character at a time | split text, `steps()` or stagger |

## Sequencing and timing

| Term | What it looks like | GSAP |
|---|---|---|
| Stagger | Items enter one after another with a small gap | `stagger: 0.06` |
| Orchestration | Several moves timed to read as one gesture | one timeline with offsets |
| Hold | The still after a move, while the viewer reads | timeline gap |
| Beat lock | Moves land on the music's beats | positions from the beat grid |
| Stepped | Moves in discrete jumps, like stop-motion | `steps(n)` |
| Tween | The generated in-between frames from start to end | any `to`/`from` |

## Movement and camera

| Term | What it looks like | GSAP |
|---|---|---|
| Push in / pull out | The frame slowly moves toward or away from the subject | `scale` on the scene wrapper |
| Pan / tilt | The frame slides sideways or up and down | `x` / `y` on the wrapper |
| Ken Burns | A slow push and pan across a still image | `scale` and `x` with `sine.inOut` |
| Parallax | Layers move at different speeds, suggesting depth | per-layer `x` multipliers |
| 3D tilt / flip | Turns in depth around X or Y | `rotationX`/`rotationY` with `perspective` |
| Whip | A very fast move, usually blurred, used as a cut | short `x` tween plus `filter: blur` |
| Transform origin | The point a scale or turn grows from | `transformOrigin` |
| Origin-aware | Grows out of the thing it belongs to, not its own center | `transformOrigin` at the source |

## Between states and scenes

| Term | What it looks like | GSAP |
|---|---|---|
| Hard cut | Instant change, no transition | none |
| Crossfade | One layer fades out as another fades in | avoid full-frame; see the `crossfade` gate |
| Blur dissolve | A crossfade bridged by a brief blur | `filter: "blur(6px)"` at the midpoint |
| Match cut | The next scene opens on a shape or position that matches the last | shared position across scenes |
| Morph | One shape becomes another | path tween or scale and radius together |
| Shared element | One element travels and resizes into its new place | `x`, `y`, `scale` on the same node |
| Direction-aware | Forward moves one way, back moves the other | sign of `x` follows story direction |
| Zoom transition | The camera dives into an element to reach the next scene | `scale` on wrapper to fill frame |

## Easing and springs

| Term | What it looks like | GSAP |
|---|---|---|
| Ease-out | Fast start, soft landing. Default for anything arriving | `power3.out`, `expo.out` |
| Ease-in | Slow start, fast finish. Exits only | `power2.in` |
| Ease-in-out | Slow, fast, slow. On-screen moves from A to B | `power3.inOut` |
| Linear | Constant speed. Loops, tickers, progress | `none` |
| Overshoot | Goes past the target and settles back | `back.out(n)` |
| Spring / bounce | Settles with oscillation, like a physical spring | `elastic.out(1, 0.5)`, playful tones only |
| Anticipation | A small wind-up the opposite way before the move | a short reverse tween first |
| Follow-through | Parts keep moving briefly after the main move stops | trailing child tweens |
| Squash and stretch | Deforms while moving to show weight and speed | `scaleX`/`scaleY` against each other |

## Ambient and loops

| Term | What it looks like | GSAP |
|---|---|---|
| Marquee | Content scrolls continuously in a loop | `x` with `none`, `repeat: -1` |
| Float | A slow up-and-down drift | `y` with `sine.inOut`, `yoyo` |
| Pulse | A gentle repeating scale or glow to draw the eye | `scale` with `yoyo` |
| Orbit | Circles around another element | rotation on a parent |
| Yoyo | Plays forward then backward each loop | `yoyo: true` |

## Polish

| Term | What it looks like | GSAP |
|---|---|---|
| Number ticker | Digits count or roll up to a value | tween a number, tabular figures |
| Tabular numbers | Fixed-width digits so a counter doesn't wobble | `font-variant-numeric: tabular-nums` |
| Text morph | Characters change one at a time to the new value | per-character tweens |
| Shimmer | A moving sheen across a surface | gradient `backgroundPosition` |
| Glass materialize | A frosted card arrives by blur and scale together | `backdropFilter` with `scale` |
| Motion blur | A smear that encodes speed on a fast move | `filter: blur` on the moving layer |
