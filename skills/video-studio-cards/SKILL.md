---
name: video-studio-cards
description: >-
  Pick, brand, and place ready-made motion-graphic cards in a luckiest-video-studio
  run: 406 cards in two packs (paper-collage, aurora-glass) covering full-frame
  takeovers (section, stat, overview) and overlays that keep the speaker visible
  (lower third, label), plus two scene templates. Cards take the run's brand.json
  colors and fonts and render as storyboard motion scenes. Usually driven by
  luckiest-video-studio or luckiest-video-studio-talk. Trigger on "add a stat card",
  "use a card for this", "lower third with my name", "section title card",
  "pick a card style", or "make a new card pack".
argument-hint: "<run-dir> [--pack <id>] [--purpose <purpose>]"
user-invocable: false
license: MIT. See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
metadata:
  version: "1.3.0"
  listing_id: luckiest-video-studio-cards
  author: luckiest
---

# Card packs

A card is one finished motion-graphic moment: a big number, a section title, a
name strap. Picking a proven card and filling its slots is faster and more
consistent than drawing each beat from scratch.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-video-studio-cards", installedSemver: "1.3.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-video-studio-cards", skill_version: "1.3.0", matched: true, success: <true|false> }`.
Metadata only. Skip silently if unavailable.

## Standing rules

1. **Sample copy is not content.** Card names, sources, and numbers are
   placeholders. Replace every slot with the user's verified words, or leave the
   card out.
2. **Brand first.** Cards take the run's `brand.json`; never ship a pack's default
   palette on a branded video without asking.
3. **One pack per video.** Mixing packs reads as two videos.
4. **Local assets only**, apart from the pinned GSAP script tag every card carries.

`<skill-dir>` is the folder holding this file. Cards are in `<skill-dir>/packs/`,
the index in `<skill-dir>/packs/registry.json`.

## The packs

| Pack | Look | Cards |
|---|---|---|
| `paper-collage` | Warm paper, engraving cutouts, serif statements, hand-drawn arrows, choppy stop-motion timing | 106 |
| `aurora-glass` | Near-black canvas, soft glow from below, frosted glass panels, smooth glide and bloom | 300 |

| Tier | Background | Purposes | Use |
|---|---|---|---|
| `tier1` | opaque, replaces the frame | `section`, `stat`, `overview` | its own storyboard scene |
| `tier2` | transparent except the card | `lower-third`, `label` | on top of the speaker, inside a talk scene |

Read a pack's `DESIGN.md` before choosing. The full card rules are in
[references/card-contract.md](references/card-contract.md).

## Step 1: Choose

Filter `packs/registry.json` by pack, tier, and purpose, then open two or three
candidates and pick the one whose layout fits the copy (slot count and length,
one number or several). Every card lists its `slots` and a `duration` range.
Check its `qa` field: prefer `render-ok`, avoid `broken`.

## Step 2: Brand the pack for this run

```bash
node <skill-dir>/scripts/apply-brand.mjs <run-dir> <pack-id>
```

It copies the pack to `<run-dir>/composition/cards/<pack-id>/` and rewrites its
`tokens.css` from `<run-dir>/brand.json` (paper, ink, accent, fonts). Fonts are
loaded from `composition/assets/fonts/` when the files are there.

## Step 3: Place

Read `luckiest-video-studio-composition` for the card's focal point, grid, and white space at its hold frame.

If the run already has `art-direction.json`, follow it; otherwise, if `luckiest-video-studio-art-director` is installed, run it first. Map its palette, faces, and easing onto the pack tokens; the pack never overrides them.

- **tier1:** copy the branded card to `composition/compositions/<scene-id>.html`
  (its `tokens.css` link, `cards/<pack-id>/tokens.css`, is already relative to
  `composition/`, so it resolves in Studio and in the render), fill every
  `data-slot`, and set `data-duration` to the scene length (inside the card's
  range). Add a `motion` scene to `storyboard.json` with `composition` pointing at
  it and the tokens file in `assets`.
- **tier2:** mount the card inside a talk overlay scene with
  `data-composition-src`, wrapped in a `<template>` as the contract describes, on
  a track above the clip. The talk sub-skill owns the timing.

Scene templates in `<skill-dir>/templates/` (`graph-paper` for a full-frame
backdrop, `glass-popout` for a side panel over a reframed camera) are starting
points for a whole scene rather than one card. Both are sized with the coordinator's
size tokens, so they render landscape, vertical, and square from one file when the
storyboard lists `formats`. `glass-popout` moves its panel to the bottom of the safe
area in vertical and square.

Every pack card renders in all three formats from one file. The card reads the
coordinator's size tokens (`--w`, `--h`, the `--safe-*` insets) and restacks under
`[data-format=vertical]` and `[data-format=square]`: tier1 layouts stack inside the
safe area, tier2 overlays move to the bottom of the safe area clear of the face, and
type runs 20% larger in vertical. Nothing extra to do: add `formats` to the storyboard
once the master is approved (coordinator `step-4-deliver.md`, "Other formats (last)").

## Step 4: Check

Easing, duration, and stagger edits to a card follow `luckiest-video-studio-motion`.

Render the scene with the coordinator's `render-scenes.mjs` and look at the hero
frame at full size and phone size, in every format the storyboard lists: every slot
filled with real copy, no text clipped at the longest slot value, text inside the
safe area (`node <coordinator>/scripts/qa.mjs safe <run-dir>`), the brand colors in
place of the pack defaults.

To check cards themselves, `node <skill-dir>/scripts/qa-cards.mjs sample <run-dir>
--format all` writes a sample run with one card per purpose in each format
(`--pack`, `--tier`, `--all` narrow or widen it; tier2 cards get a gray backdrop).

## Make a new pack

```bash
node <skill-dir>/scripts/new-pack.mjs 03 <slug> "Human Name"
node <skill-dir>/scripts/build-registry.mjs
```

Fill `DESIGN.md`, `tokens.css`, and `style.json`, build cards under
`packs/NN-slug/cards/`, and rebuild the registry. Follow the card contract.
