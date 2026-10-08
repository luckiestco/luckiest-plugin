---
name: video-studio-motion
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
  version: "1.1.0"
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
`{ listingId: "luckiest-video-studio-motion", installedSemver: "1.1.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-video-studio-motion", skill_version: "1.1.0", matched: true, success: <true|false> }`.
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

## 4. Physicality and origin

- **Nothing appears from nothing.** Cards, panels, text blocks, and screenshots
  enter from `scale: 0.9-0.97` with `autoAlpha: 0`, never `scale: 0`. A small accent
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
- **Asymmetric timing.** Slow where the viewer should take something in, snappy
  where the system responds: a 1.2s linear progress fill, then a 0.2s `power3.out`
  confirmation.
- **Sound on the same frame.** An SFX lands on the frame its visual cause lands,
  never a frame early or late ([audio.md](../luckiest-video-studio/references/audio.md)).

## 6. Type and depth

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
   the viewer is reading, or overshoot that fights the tone.

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
