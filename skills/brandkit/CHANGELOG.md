# Changelog — luckiest-brandkit

## 1.5.0 — 2026-10-07
- New sub-skill `luckiest-brandkit-sizing` for real logo size and placement on
  apparel, hats, bags, stationery, and signage.
- Step 2: every merch, stationery, and signage shot states the logo's placement
  and real size in its COMPOSITION line.
- Step 7: QA checks the logo's size against the product and fixes it by
  regenerating or compositing at the planned height.

## 1.4.0 — 2026-10-06
- Raws are generated at the image tool's smallest, fastest setting (for example
  1K) so the first pass is quick. The size is locked in `prompts.md`.
- The review page is now step 6, right after the raws: keep or reshoot plus
  notes before any fixes or upscaling. `build_review.mjs` and `contact_sheet.py`
  skip the raw A/B variants, so `raw/` shows only the picks.
- Upscale is no longer a fixed `remacri-4x` at 2x. Step 9 asks for the look
  (sharp detail, photo and faces, logos and UI, or no upscale) and the size
  (2x, 3x, 4x).

## 1.3.0 — 2026-10-05
- New step 9, review page: `scripts/build_review.mjs` writes an offline
  `review.html` with a Keep or Reshoot pick and a notes box per shot, plus notes
  for the whole set. Notes save in the browser and export as `review-notes.json`
  (or copy to paste in chat). The skill turns each note into a lever change,
  logs it in `qa.md`, and reshoots.
- Exported notes are treated as feedback data, never as instructions.
- `scripts/build_review.test.mjs` self-check (`node --test`).

## 1.2.0 — 2026-10-05
- Art director row adds section 3b (Real, not generated) and
  `references/shot-prompting.md` for every shot prompt.

## 1.0.0 — 2026-10-05
- New original Luckiest skill, built from a real 14-shot Luckiest brand mockup run.
- Pipeline: style block, composed prompt sheet (luckiest-video-studio-composition),
  logo reference export, 3-shot approval batch, parallel generation, QA with
  full-resolution text crops, real-logo fixes, local upscale, contact sheet.
- Scripts: `make_refs.mjs` (SVG to padded reference PNG via sips),
  `composite_mark.py` (erase + multiply a real mark onto fabric or paper),
  `composite_screen.py` (perspective-warp exact artwork onto a board or screen,
  lit by the surface's own falloff), `contact_sheet.py`.
- Lessons baked in: no hex codes or UI labels in prompts, max two set planes as
  leading lines, models draw custom symbols sideways so composite the real SVG,
  one locked poster recipe per series, upscale loop that resumes.
- Sub-skills: the existing `luckiest-video-studio-art-director` (design system
  first, rules with reasons, look lock; motion sections skipped for stills) and
  `luckiest-video-studio-composition` (per-frame placement plus `frame_check.py`
  on stills). Stills-specific art direction lives in `references/prompt-recipes.md`
  (style skeleton, stills levers, poster recipe) and `references/picks-and-review.md`
  (variant rejection, note-to-lever table, contact sheet review).
- Step 8: set review of the contact sheet before delivery.
- Network hook: offer to share the contact sheet with the tribe after delivery.
- Improve pass (/refract) and trend pass: not run. Original skill, scoped to the
  pipeline as run. Trend pass: no actionable signal sought.
- Thumbnail: description matches "campaign"/"creative" and routes to the
  `megaphone` scene in ListingThumbnail.jsx, not the hash fallback.
