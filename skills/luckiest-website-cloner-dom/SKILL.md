---
name: luckiest-website-cloner-dom
description: >-
  Extract and rebuild the DOM/CSS layer of a web page — layout, typography,
  colors, spacing, real content, assets, and normal interactions — into clean
  components, section by section, from exact getComputedStyle() values rather
  than guesses. This is the DOM/CSS track: it deliberately does NOT handle
  WebGL/WebGPU/canvas shader surfaces (those go to luckiest-website-cloner-shaders). Usually
  driven by the luckiest-website-cloner coordinator, but can be used directly when the user
  wants to rebuild a page's markup/styling and there are no GPU-rendered
  effects. Trigger on "rebuild this section", "extract the CSS/layout", "clone
  the markup and styling of this page", or the DOM half of a full site clone.
argument-hint: "<url> | <output-dir with surface-map.json + ROUTING.md>"
user-invocable: false
license: MIT. See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
metadata:
  version: "1.0.0"
  listing_id: luckiest-website-cloner-dom
  author: luckiest
---

# DOM Clone

Rebuild the DOM/CSS layer of a page as clean components whose every value is
**measured, not estimated**. The difference between a clone that reads as
"pixel-perfect" and one that reads as "AI slop" is almost entirely whether the
spacing, type scale, and colors are the site's real computed values or an
approximation. So the whole method is built to remove guessing.

**Scope boundary — read this first.** This track handles DOM/CSS only. Any
`<canvas>` painting WebGL/WebGPU/2D pixels is invisible to `getComputedStyle()`
and belongs to `luckiest-website-cloner-shaders`. When you meet a GPU surface (the surface map
tags them, or you see a `<canvas>` you can't style your way into), do NOT rebuild
it — leave a **placeholder mount** (below) and move on. Rebuilding a shader as
HTML is the classic failure that makes a clone look empty.

## Inputs

- Driven by luckiest-website-cloner: you get an output dir containing `surface-map.json` and
  `ROUTING.md`. Build only the sections routed to the DOM track; leave mounts for
  GPU surfaces.
- Standalone: you get a URL. Do a quick recon first (screenshots + the interaction
  sweep below). If you spot GPU `<canvas>` surfaces, tell the user those need the
  luckiest-website-cloner-shaders track and build the DOM around them.

Requires a browser MCP (Chrome/Playwright/Puppeteer). Keep large extraction
artifacts in the output dir, not the conversation.

## The method: extract → spec → build → verify

### 1. Foundation first (sequential, do it yourself)

Nothing can be built until the shared ground exists, because every later
component depends on it:

- **Design tokens** — run `../luckiest-website-cloner/scripts/tokens-probe.js`
  (`tokensProbe()`) at 1440/768/390 if the coordinator hasn't already left
  `tokens-*.json` in the output dir. Its frequency-ranked palette, type scale,
  spacing, radii, shadows, and `:root` custom props ARE the tokens — write them
  as CSS variables / Tailwind theme, keeping the site's own `--names` when it
  has them. Colors and fonts wrong here poison every component.
- **Motion params** — likewise take `motion.json` (`../luckiest-website-cloner/scripts/
  motion-probe.js`) as the source for every GSAP/ScrollTrigger/Lenis/WAAPI
  value a spec needs. A spec that says `scrub: 1.2, start: "top top", end:
  "+=200%"` came from the runtime; one that says "scrubs on scroll" is a guess.
- **Fonts** — identify actual `font-family` on headings/body/labels; wire up the
  same families (self-hosted or Google) so metrics match.
- **Global assets** — favicons, logos, and site-wide images to the project.
  Resolve each through the asset ladder in `references/asset-resolution.md`:
  download the REAL file first; only fall back to reconstructing, generating
  (Higgsfield, for decorative assets — never brand identity), or a placeholder,
  and label which tier was used. This keeps the clone honest about what's real.
- **Global behaviors** — smooth-scroll library (Lenis/Locomotive), scroll-snap,
  global keyframes. See `references/interaction-fingerprints.md` to detect and
  reproduce these; they change how sections must be built.

Verify the empty shell builds before going further.

### 2. Extract each section with exact values

For each DOM section top-to-bottom, use the browser to capture — don't hand-
measure:

- A section screenshot (for the builder's reference and later QA).
- **Computed styles** for every meaningful element via `getComputedStyle()` —
  real px/color/weight values, not "looks like `text-lg`".
- **Real content** — verbatim text, alt text, and every image/`<img>`/background
  image in the section, including **layered/overlay** images (a hero is often a
  background + a foreground mockup + an icon; miss the overlay and it looks bare).
  Resolve each asset through `references/asset-resolution.md` (REAL → RECONSTRUCT
  → GENERATE → PLACEHOLDER), tagging any that couldn't be downloaded.
- **All states, not just the default** — for tabs/accordions click each and
  record per-state content; for scroll- or hover-triggered changes, capture the
  before AND after computed styles and the transition (duration/easing) plus the
  exact trigger. See `references/interaction-fingerprints.md`.

### 3. Write a spec file — the contract

Write one spec per section to `<output>/specs/<section>.spec.md` BEFORE building.
This is the contract between measurement and construction: the builder works from
the spec, not from its memory of a browser session, so it can't drift into
guessing. A spec has: target file, screenshot path, **interaction model**
(static / click / scroll / hover / time), exact computed styles per element,
per-state content, assets with local paths, verbatim text, and responsive
behavior at 1440 / 768 / 390. If a builder would have to invent any value, the
spec isn't done yet.

For GPU surfaces in this section, the spec says only: **placeholder mount** — a
positioned empty container with the id, size, z-index, and pointer-events from
the surface map, for luckiest-website-cloner-shaders to fill later. Nothing more.

### 4. Build — size agents to the model, not to dogma

Dispatch builders that each receive their spec inline (never "go read the spec").
On agent granularity: splitting a page into many tiny builders is a choice for
**speed and edit-isolation**, not a fidelity requirement — a capable model holds
a whole section's spec fine. So prefer **one builder per section** by default,
and split further only when a section contains genuinely independent pieces
(three distinct card variants, separate interactive widgets) that benefit from
parallel isolation. Over-splitting just adds merge and coordination cost.

If builders run in parallel and might touch shared files, isolate them (git
worktrees or separate output subtrees) and merge with the section topology in
hand. Each builder verifies its own typecheck/build before finishing.

### 5. Verify with a real diff

After assembly, run an automated pixel diff (Playwright `toHaveScreenshot()`),
original vs clone, at all three breakpoints — **masking any GPU placeholder
regions** so their emptiness/animation doesn't dominate the result. Tune
`maxDiffPixelRatio` rather than demanding zero diff (anti-aliasing causes false
positives). For each real discrepancy, decide: was the spec value wrong
(re-extract, fix spec) or did the builder ignore a correct spec (fix component)?
Fix at the source, not with a compensating fudge.

## Output

- `site/` (or the coordinator's chosen substrate) with styled sections + mounts
- `specs/*.spec.md` — one per section, the audit trail
- Downloaded assets under the project's public dir
- QA diff results per breakpoint + list of placeholder mounts left for GPU track

## What not to do

- Don't clone from a screenshot; extract the real DOM/CSS/content.
- Don't rebuild a `<canvas>` shader/3D effect as HTML — leave a mount.
- Don't approximate a computed value you could have measured.
- Don't freeze a `<video>` or animated SVG to a static image — re-embed / keep it.
- Don't build a click-based UI when the original is scroll-driven; settle the
  interaction model before building (it's a rewrite, not a tweak, to change later).

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
