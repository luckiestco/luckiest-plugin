---
name: luckiest-video-studio-motion
description: >-
  Motion taste for luckiest-video-studio. Decides whether a beat should move,
  then picks the easing, duration, origin, stagger, and transition for HyperFrames
  and GSAP scenes so the motion reads as designed instead of default. Also reviews
  a run's compositions scene by scene against a strict bar, and names motion
  effects with exact terms for reference breakdowns and generation prompts. Used by
  luckiest-video-studio while composing and before the judge. Trigger on "the
  motion feels cheap", "make the animation feel better", "review the motion",
  "why does this transition look off", "what is that effect called", or
  "/luckiest-video-studio-motion". For building the whole video use
  luckiest-video-studio.
argument-hint: "[run-dir] [--review] [--scene <id>]"
user-invocable: true
license: MIT. See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
metadata:
  version: "1.3.0"
  listing_id: luckiest-video-studio-motion
  author: luckiest
---

# Motion taste for video

Rules for motion that feels designed. Adapted from Emil Kowalski's interface
animation rules for video, where nothing is clicked and every frame is fixed in
time. What carries over is the craft: purpose, easing direction, physicality,
origin, rhythm, restraint. What does not is everything about input: hover, press,
interruption, and how often a user triggers something.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-video-studio-motion", installedSemver: "1.3.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-video-studio-motion", skill_version: "1.3.0", matched: true, success: <true|false> }`.
Metadata only, never prompt text. Skip silently if unavailable.

## Modes

| Mode | Use when | Output |
|---|---|---|
| Build (default) | Composing or fixing a motion scene | Code that follows the rules below |
| `--review` | After `npx hyperframes check` passes, before render or the judge | `<run-dir>/qa/motion-review.md` |
| Name it | "What is that effect called?", reference breakdowns, recreate prompts | Terms from [references/vocabulary.md](references/vocabulary.md) |

## 1. Should this beat move?

Every motion beat in `storyboard.json` names its purpose in one word. If it has
none, it holds still or cuts.

| Purpose | Means |
|---|---|
| **Reveal** | Shows where something came from or where it goes |
| **Emphasis** | Points at the one thing to read now (the accent rule) |
| **Bridge** | Connects two scenes that would otherwise jump |
| **Explain** | Shows how the product works, step by step |
| **Cause** | In a demo, shows the click or input causing the change |
| **Rhythm** | Lands on a beat of the music or the voice |
| **Delight** | Only in the hook or the outro, one or two per video |

Repetition replaces frequency. A move the viewer sees in every scene (lower
thirds, captions, section cards) gets shorter and quieter each time. The hero
moment gets the budget. Text and product UI the viewer is reading never drift,
float, or parallax for style.

## 2. Easing

| Situation | GSAP ease | Never |
|---|---|---|
| Entering the frame (default) | `power3.out` | any `.in` ease |
| Hero entrance, logo, big stat | `expo.out` or `power4.out` | `power1.out`, `sine.out` (too weak to read as intentional) |
| Moving or morphing on screen, A to B | `power3.inOut` | `.out` alone (it lands soft but leaves abruptly) |
| Leaving the frame | `power2.in` or a cut | a slow `.out` exit that lingers |
| Constant motion: marquee, ticker, progress, slow push | `none` or `sine.inOut` with `repeat` | `none` on a one-off entrance |
| Stop-motion or collage styles | `steps(n)` | mixing stepped and smooth in one element |
| Overshoot (pop) | `back.out(1.2-1.7)`, playful tones up to `2.4` | `elastic` in `polished` or `cinematic` tones |

Entrances never use `.in`: it starts slow, which delays the exact frame the
viewer is watching. Exits may, because the viewer's eye has already moved on, and
so may a visible object falling under gravity. Slow pushes and tickers over 2s
stay linear.
Match overshoot to the tone in
[tones.md](../luckiest-video-studio/references/tones.md): crisp for polished, bouncy
only for playful or chaotic.

**Land decelerates, leave accelerates.** On professional films most of an
entrance's travel happens in its first 4 to 8 frames, then a long tail with no
bounce; exits ease in, then leave or shrink. One visible overshoot or spring per
film, 4 to 12% past the target, spent on the hero moment. Everything else lands
clean.

| Role | GSAP | CSS cubic-bezier (for stills and editors) |
|---|---|---|
| Soft land (most entrances) | `expo.out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Snap and settle (CTA, toggles, counters) | `power4.out` | `cubic-bezier(0.165, 0.84, 0.44, 1)` |
| A to B on screen | `power3.inOut` | `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| Accelerating exit | `power2.in` to `power3.in` | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` |
| The one overshoot | `back.out(1.4)` or a spring | n/a |

## 3. Duration and hold

| Element | Duration |
|---|---|
| Mock UI inside a demo (dropdown, toast, button press) | 150-300ms, so the product looks real |
| Element entrance: text line, card, icon | 0.35-0.7s |
| Full-frame transition between scenes | 0.4-0.8s |
| Hero logo reveal | 0.8-1.6s |
| Exit | about two thirds of its entrance |

After the move, hold. A short label settles about 0.8s and a sentence about
0.3s per word (the main skill's readability law). Fast in, long hold beats slow in,
short hold.

Measured on professional films at 30fps (use as the default when the tone gives
no reason otherwise):

| Move | Frames | Seconds |
|---|---|---|
| Median move | 10 | 0.33 |
| Translate in | 12 | 0.4 |
| Opacity on a single object | 6 | 0.2 |
| Blur resolve | 7 | 0.23 |
| Translate out | 13-14 | 0.45 |
| Scale out | 10 | 0.33 |
| CTA entrance | 6 | 0.2 |

A held frame is never dead: keep one living thing (a slow drift of 1 to 3px per
frame, a caret, moving light). Something new every 0.3 seconds at most, a major
change about every 0.8 seconds.

## 4. Physicality and origin

- **Nothing appears from nothing.** Cards, panels, text blocks, and screenshots
  enter from `scale: 0.9-0.97` with `autoAlpha: 0`, never `scale: 0`. Hero
  arrivals decelerate from oversize instead: a logo crashes in from about 3.5x to
  1.0 within 20 frames, a cursor enters 1.5 to 5x its size, a thesis word shrinks
  into place. A small accent
  (a dot, badge, or icon) may pop from `scale: 0` only with a `back.out` or
  `steps()` ease, where the overshoot is the point.
- **Scale from the source.** A callout over demo footage grows from the point it
  annotates (`transformOrigin` at that point). Full-frame cards stay centered.
- **Exit the way it came.** A card that slides in from the right leaves to the
  right, or cuts.
- **Springs for things with mass.** Cards, cursors, containers, and logos
  settle on a spring from `templates/spring.js` (presets and the retarget rule in
  [references/vocabulary.md](references/vocabulary.md#springs)). Keep GSAP eases
  for fades, wipes, and linear fills.
- **Transform, not layout.** Animate `x`, `y`, `scale`, `rotate`, `autoAlpha`,
  `clipPath`, and `filter`. `width`, `height`, `top`, and `left` snap to whole
  pixels and shimmer in the render.
- **Fast moves strobe.** At 30fps, an element crossing more than about a tenth of
  the frame per frame reads as jumps. Shorten the distance, lengthen the move, or
  make it a deliberate whip with a blur.

## 5. Transitions and groups

- **Mask the crossfade.** When two states overlap and read as two objects, add
  `filter: "blur(4-8px)"` at the midpoint and keep it under 20px. A full-frame
  opacity fade fails the `crossfade` gate. Use a clip-path wipe
  (`clipPath: "inset(0 100% 0 0)"` to `"inset(0 0% 0 0)"`), a scale-and-blur, or a
  cut instead.
- **Stagger groups.** Items entering together stagger 40-100ms (30-80ms for mock
  UI). Everything at once reads as a slide change. A long stagger reads as slow.
  Measured: the gap is about half the move's duration (a 3-frame median); a CTA
  wave uses 8-frame gaps and finishes inside 0.6s.
- **Never crossfade scenes.** Things arrive by moving, cutting, unmasking or
  focusing. Fades are for single objects (calm brands and privacy dissolves are
  the exceptions, stated in the plan).
- **Asymmetric timing.** Slow where the viewer should take something in, snappy
  where the system responds: a 1.2s linear progress fill, then a 0.2s `power3.out`
  confirmation.
- **Sound on the same frame.** An SFX lands on the frame its visual cause lands,
  never a frame early or late ([audio.md](../luckiest-video-studio/references/audio.md)).

### Handoffs between scenes

The last frame of scene A is the first frame of scene B. For each cut, write:

1. What carries across (an object, a shape, a colour, or nothing).
2. A's exit state over its last 1 to 3 frames: position, size as % of frame
   height, speed, blur, ground colour.
3. B's frame 0 matches that state within 2% of the frame, and something in B is
   already moving.
4. A ground colour change is caused by an object (a card fills the frame), never
   a flat swap.
5. Cut at peak speed, never on rest. A speeds up over its last 3 to 8 frames; 0 to
   3 empty frames between are fine.
6. Which spoken word lands on the cut.

An object pinned at the same coordinates through three or more scenes is a
defect. A carrier travels at every cut.

| What changes from A to B | Use |
|---|---|
| Same object, new state | Match cut on the object (morph, scale, recolor) |
| New subject, same world | Cut on motion, or a whip (8 frames, peak speed a quarter in, about 13% of frame width per frame) |
| Soft change of topic | Blur-matched cut: A blurs out to about 18px, B starts at about 80px and resolves in about 8 frames |
| New ground colour | Feathered wipe painted in B's ground (feather 30 to 40% of the axis, 0.56 to 0.6s, starting 0.1 to 0.2s before the voice line ends) |
| Light to dark theme | A 4-frame grey dip hides the flip |
| Into the product | A camera push into the UI, then cut inside it |

Cuts fall every 0.3 to 2.3 seconds. Transitions start 3 to 6 frames before the
voice line ends.

### Camera

- **Push** size by duration: 1.25x over 6 frames, 1.4x over 12 to 18, 1.5x over
  20 to 45. 2.4x only on a slow drift.
- **Snap zoom:** one jump frame changes scale by a ratio of 0.56 to 0.77 (or its
  inverse), then a 9 to 18 frame tail settles it.
- **Parallax:** near layers move 2 to 2.4x the far ones.
- **Drift:** 1 to 3px per frame keeps a hold alive.

**Camera as punctuation.** The table above is the accent set. Before every move,
answer three questions: where should the eye be and is it readable at this size,
is this a transition or an accent, what did the previous shot do. Hold when the
footage itself moves or text is being read. Set `scenes[].camera` in
`storyboard.json` and run `node <studio>/scripts/qa.mjs storyboard <run-dir>`.

| Move | Duration | Use |
|---|---|---|
| Slow push | 0.6-1.5s, sine in-out, 10-40% | Transition into detail |
| Pull | 0.8-2s, fast start, long tail | Reveal the whole |
| Glide | 0.5-0.9s (1.3-1.8s following a moving thing) | Carry the eye across |
| Snap push | 0.25-0.35s for 18-32%, then stop | Accent: reveal, key number |
| Whip | 0.26-0.30s with blur | Accent: topic change |
| Slam | 0.17s, scale 1.55 to 0.94 to 1.0, one per shot | Accent: the gag or the hit |

- Accents (snap, whip, slam) are at most a third of shots and only on a reveal,
  a reversal, a key number or a gag.
- Never three push-ins in a row, never the same move three times (holds excluded).
- Moves go out and come back; do not restart every cut from scale 1.0.
- A constant slow drift is for mood scenes only. On explainer and demo shots it
  reads as a slide deck. So does a push on every shot, slow or fast.
- Enter slow (0.3-0.4s), exit fast (about 0.18s), then hold: at least 0.5s after
  a number, 0.9s after a punchline.
- Land each reveal frame on a beat or a spoken word: start the move at the cue
  time minus the move's reveal point.
- Zoom with log interpolation, and redraw vectors at each zoom; never scale a
  rendered bitmap.

### One system per film

One frame clock (smooth, or on twos for a hand-made look; a stepped style may run
elements at 12 fps under a smooth camera), one blur grammar
(motion blur, or smear frames, or crisp steps), one accent colour with one
meaning (for example "done"). Mixing clocks or blur styles inside one film reads
as two films.

## 6. Type and depth

Read [references/kinetic-type.md](references/kinetic-type.md) when a scene
animates words, a counter, or typing. Read
[references/ui-demo.md](references/ui-demo.md) when a scene shows product UI, a
cursor, a click, or a toggle.


- Display text tracks tight (`letter-spacing: -0.02em` and below as size grows,
  `line-height` about 1.05). Captions and small labels track slightly open.
- Build hierarchy with weight, size, and leading together, not size alone.
- Glass cards over footage: bigger surfaces get a stronger blur and a deeper
  shadow. Never stack a light translucent card on another. Bring glass in by
  animating blur and scale together, not opacity alone.

## Review mode

Run after `npx hyperframes check` passes and `node <luckiest-video-studio-dir>/scripts/qa.mjs motion <run-dir>/composition`
has been read. For each scene in `storyboard.json`, read its composition and write
`<run-dir>/qa/motion-review.md`:

1. **Findings table**, one row per issue, citing `file:line`:

   | Scene | Before | After | Why |
   |---|---|---|---|
   | 03-reveal | `.from(card, { scale: 0, ease: "power2.out" })` | `{ scale: 0.95, autoAlpha: 0, ease: "power3.out" }` | Nothing appears from nothing |

2. **Verdict per scene: Block or Approve.** Default to flagging; approval is
   earned. Block on: a motion beat with no purpose, an `.in` ease on an entrance,
   `scale: 0` on a card or text block, a full-frame opacity crossfade, drifting text
   the viewer is reading, overshoot that fights the tone, a second visible
   overshoot in the film, a cut on rest, an object pinned through three scenes, or
   a headline typed letter by letter.

Fix in this order, preferring earlier moves: delete the motion, reduce it, fix the
easing, fix the origin, mask the transition (blur or clip-path), stagger the
group, then tune it to the tone. Re-render only the scenes you changed.

## Feel check

Some calls can't be settled from code: a blur amount, an overshoot, an
opacity-and-scale balance. Render the scene, then look at it slowed down and
frame by frame:

```bash
ffmpeg -i clips/NN-id.mp4 -vf "setpts=4*PTS" -an /tmp/NN-slow.mp4
```

Look again after the next scene is done, with fresh eyes. When unsure whether a
move helps, delete it and compare.

## Done when

- Every motion beat names its purpose.
- `qa.mjs motion` passes, or each finding is explained in `TIMING.md`.
- In review mode, `qa/motion-review.md` has a verdict for every scene and no
  scene is left on Block.
