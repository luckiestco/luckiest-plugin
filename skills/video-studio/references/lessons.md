# Build lessons

Each of these broke a real HyperFrames build once. Read them before writing a
scene. The project layout rules are in `step-3-compose.md`; these are the traps
that layout does not cover.

## Scenes

- **No id inside a scene may equal its host slot's id.** If
  `compositions/hook.html` has an element `id="scene-hook"` and the root hosts it in
  `<div id="scene-hook">`, the scene never mounts and nothing errors.
- **Drive changing state from a tween, not a callback.** For a counter, a typed
  line, or a canvas, tween a plain clock object from 0
  (`tl.to(clock, { t: dur, ease: "none", onUpdate: draw }, 0)`) and draw from
  `clock.t`. `tl.call` fires only when playback crosses it, so a renderer that
  seeks backward or jumps into the middle shows the wrong state.
- **Seeded randomness only.** Use a small seeded generator (mulberry32 with a fixed
  seed) for scatter, noise, and particles. `Math.random()` and `Date` give a
  different frame on every render, so a one-scene re-render no longer matches.
- **Shared backgrounds stay in the root.** When `index.html` owns a background
  that runs across scenes (a sky, grain, a HUD), scenes must be transparent. A
  scene that paints its own full-frame ground hides it.
- **Overlap scene hosts for reveals.** When the next scene should reveal itself
  over the last one, start its host a few tenths of a second before the last one
  ends. Back-to-back hosts can only hard cut.

## WebGL and three.js

- **Load three.js once, in the root `<head>`**, from `composition/assets/vendor/`.
  Loading it again inside a scene replaces the global `THREE` and drops add-ons
  such as `TextGeometry`.
- **Render WebGL from the timeline.** Create the renderer with
  `preserveDrawingBuffer: true` and call `renderer.render` from one clock tween's
  `onUpdate`, never from `requestAnimationFrame`.

## Rendering

- **Check free disk before a long render.** HyperFrames refuses to render with
  under about 1 GB free, and a long 1080p render wants 3 GB or more. Run
  `df -h .` first and tell the user if space is short.
- **Render with fewer workers when other renders are running** (`--workers 2`), or
  two renders on one machine starve each other and time out.
- **Use absolute paths in background commands.** A background shell does not keep
  your working directory.
