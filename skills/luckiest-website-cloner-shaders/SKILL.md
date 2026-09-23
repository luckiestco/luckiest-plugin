---
name: luckiest-website-cloner-shaders
description: >-
  Extract, reproduce, and locally replay a single WebGL / WebGPU / Canvas /
  shader / animated-3D visual effect from a web page — the GPU-rendered surface
  that DOM/CSS cloning is blind to. Use whenever a page has a WebGL/WebGPU/canvas
  shader background, animated 3D hero, generative gradient, particle field, or
  Unicorn Studio / Spline / Three.js effect that must be captured and rebuilt as
  a runnable local module. This is the GPU track of a site clone (driven by
  luckiest-website-cloner) but also stands alone. Trigger on "extract this shader", "clone the
  WebGL background", "port this canvas effect", "rebuild this animated hero",
  "reproduce this Three.js scene locally". NOT for ordinary DOM/CSS cloning
  (use luckiest-website-cloner-dom).
argument-hint: "<url> | <locked surface: selector + rect + driver + output-dir>"
user-invocable: false
license: MIT. See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
metadata:
  version: "1.0.0"
  listing_id: luckiest-website-cloner-shaders
  author: luckiest
---

# Shader Extract

Capture one GPU-rendered surface and rebuild it as a verified, runnable local
effect module. The governing principle — inherited from the vendored engine this
skill wraps — is **evidence before implementation**: capture what the page's GPU
pipeline actually does (shaders, uniforms, pass order, textures, timing) and
match it, rather than eyeballing the visual and hand-tuning a lookalike. A
lookalike drifts; a capture-matched baseline is faithful and honest about its
gaps.

## This skill = intake adapter + a vendored evidence-gated engine

The heavy machinery lives in **`vendor/web-shader-extractor/`** — an
evidence-gated state machine (surface lock → source/runtime trace → capture →
verified baseline → projectize) by lixiaolin94 (MIT; see `ATTRIBUTION.md`). Do
not reimplement it. This wrapper does two things the vendored engine assumes were
done elsewhere:

1. **Intake** — accept a *pre-locked* surface from the luckiest-website-cloner coordinator so
   you skip straight to capture instead of re-scouting the whole page.
2. **Capture backends** — make the concrete, research-verified capture tools
   explicit (`references/capture-backends.md`): **Spector.js** for WebGL1/2 and
   **WebGPU Inspector** for WebGPU. These are what actually recover a frame; the
   vendored policy files describe the *discipline*, these describe the *tools*.

## Router: how you were invoked

**Driven by luckiest-website-cloner (common):** you receive a locked surface — selector,
bounding box, guessed driver (three.js / unicorn-studio / spline / regl / raw
WebGL), and an output dir like `output/<host>/effects/<surface-id>/`. The surface
is already attributed, so skip scouting. Go straight to:

1. Read `vendor/web-shader-extractor/SKILL.md` and its `references/replay-policy.md`
   — that is the operating manual for capture → baseline → projectize.
2. Pick the capture backend by surface type (`references/capture-backends.md`):
   WEBGL1/2 → Spector.js; WEBGPU → WebGPU Inspector.
3. Run the vendored state flow from `CAPTURE_MINIMUM_TRUTH` onward, writing
   evidence and the baseline into the given output dir.
4. Return a **mount-contract module** (see below) plus the honesty label.

**Standalone (user hands you a URL):** you must lock the surface first. Run the
full vendored flow from `INTAKE` (read `vendor/web-shader-extractor/SKILL.md`).
The `luckiest-website-cloner` script `scripts/surface-map.js` is a fast way to enumerate and
classify canvases if you want a head start, but the vendored `TARGET_LOCK` gate
is authoritative.

## Non-negotiables (carried from the vendored engine)

- **Honest labels.** Every implementation-critical fact is `SOURCE`, `PARTIAL`,
  or `GUESS`; unlabeled = `GUESS`. The final module carries a fidelity verdict.
  Never quietly upgrade a `BEHAVIOR_REBUILD` (lookalike) to sound like a source
  replay.
- **No compensation tuning.** Don't nudge brightness, speed, offsets, noise
  scale, or color to mask missing pipeline evidence. A visible gap gets recorded
  in `known-gaps.md`, not fudged away.
- **Baseline before projectize.** Get a faithful, verified capture-baseline
  running first; only then refactor it into an editable module. Don't overwrite a
  verified baseline for cleanup.
- **Cross-origin honesty.** If the canvas is cross-origin/tainted and pixel or
  shader readback is blocked, say so and fall back to a captured poster frame —
  don't invent a shader you couldn't read.

## Output contract (so luckiest-website-cloner can mount it)

Beyond the vendored `output/` layout (capture-baseline, editable-project,
qa-report, known-gaps), expose the effect through the mount lifecycle the
coordinator composites against:

```js
export function mount(canvasEl, opts) { /* start renderer + rAF loop */ return handle }
export function unmount(handle)        { /* cancel rAF, loseContext, free GPU */ }
export function resize(handle, w, h, dpr) { /* resize drawing buffer + viewport */ }
```

Also emit a **poster frame** (a captured still) as a fallback for reduced-motion
and for the case where reconstruction only reached poster fidelity. Report the
fidelity label so the coordinator carries it into the final clone report
unchanged.

## Where to read next

- `references/capture-backends.md` — Spector.js (WebGL) and WebGPU Inspector
  (WebGPU): what each captures, how to drive it, what's reliable vs guesswork.
- `vendor/web-shader-extractor/SKILL.md` — the full state machine + reference
  router (surface discovery, target lock, evidence policy, replay policy, QA,
  Three.js/TSL reconstruction, Unicorn Studio / shaders.com adapters).
- `ATTRIBUTION.md` — upstream authorship and MIT license.

## Guardrails

Clone for migration, for recovering your own lost source, or for learning how a
build works. Do not use it to pass off someone else's brand or design as your
own, for phishing or impersonation, or against a site whose terms forbid
reproduction. Logos, brand assets, and copy belong to their owners.

Stop and ask the user before continuing if any of these are true:

- The target looks like it exists to be impersonated: a bank or wallet login, a
  checkout, an account or password page.
- The page is behind a login, a paywall, or a bot wall. Never supply
  credentials, cookies, session tokens, or a stored browser profile to get past
  one, and never work around the block.
- The page holds personal data about real people.

Capture only what renders publicly. Do not read or copy credentials, cookies,
local storage, or session storage from the target.
