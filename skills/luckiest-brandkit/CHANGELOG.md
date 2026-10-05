# Changelog — luckiest-brandkit

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
