# Card contract

Every card in `packs/` follows these rules. A new card that breaks one is not
added to a pack.

## Layout of a pack

```
packs/NN-slug/
  style.json   manifest: id, name, palette, fonts, motion, and every card with its slots
  DESIGN.md    the look: palette meanings, type voices, motion rules, what not to do
  tokens.css   CSS variables for colors, fonts, easings; cards read only these
  cards/tier1/ full-frame takeovers
  cards/tier2/ overlays that keep the speaker visible
```

`packs/registry.json` is generated from every `style.json` by
`scripts/build-registry.mjs`. Never edit it by hand.

## Ids

- Pack folder `NN-slug` (for example `02-aurora-glass`), pack id `slug`.
- Card id `<pack>.<tier>.<purpose>[.<treatment>]`, for example
  `aurora-glass.t1.stat.dotgrid`. Stable and unique.

## Each card

1. A standalone HyperFrames composition: a root `<div>` with `id`,
   `data-composition-id`, `data-start="0"`, `data-width="1920"`,
   `data-height="1080"`, directly in `<body>`, with its own pinned GSAP script tag.
2. Exactly one paused GSAP timeline, registered on
   `window.__timelines["<data-composition-id>"]`.
3. Colors, fonts, and easings come from `tokens.css` variables, linked as
   `<link rel="stylesheet" href="cards/<pack-id>/tokens.css" />`. Paths are
   relative to the run's `composition/` folder; HyperFrames lint rejects `../`
   paths because Studio preview resolves them against the project root. A card that still
   holds a literal color is listed in `references/palette-leftovers.md`.
4. Background by tier: `tier1` is opaque edge to edge; `tier2` is transparent
   everywhere except the card itself and never covers the speaker's face.
5. All text sits in elements with `data-slot="<name>"`, and every slot is declared
   in `style.json` with its name and type.
6. Deterministic: no `Math.random()`, no `Date.now()`, no network calls.

## Mounting a card inside another scene

Cards are written standalone so they preview and render alone. To place a tier2
card over a talk scene, wrap the card's root `<div>` in
`<template id="<id>-template">`, drop its GSAP tag (the parent loads GSAP), and
mount it from the scene:

```html
<div id="lt-1" data-composition-id="<card-composition-id>"
     data-composition-src="compositions/cards/<card>.html"
     data-start="3.2" data-duration="12" data-track-index="3"></div>
```

## QA status

`style.json` cards carry a `qa` field that `scripts/qa-cards.mjs` sets:
`lint-ok` (HyperFrames lint clean), `render-ok` (also rendered and inspected), or
`broken` (lint errors; do not use until fixed). New cards start `unchecked`.

At 1.0.0: 396 `lint-ok` and 10 `render-ok`, none `broken`. The 57 cards the kit
shipped with lint errors were fixed:

- Starting transforms moved from CSS into a `gsap.set` right after the timeline is
  created, so GSAP owns the whole transform (`gsap_css_transform_conflict`).
- Template-literal selectors became plain strings (`template_literal_selector`).
- Tweens on `left` and `top` became `x` or percent centering, and one
  `letterSpacing` tween was dropped (`gsap_non_transform_motion`).

Rendered before and after, 14 of 15 sampled fixes match within encoding noise.
The kinetic section card changed on purpose: its entrance no longer reflows onto
two lines and jumps back.

Keep new cards to the same rules: no CSS `transform` on anything GSAP tweens,
plain-string selectors, and motion through transforms only.
