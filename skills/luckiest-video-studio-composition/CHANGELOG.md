# Changelog — luckiest-video-studio-composition

## 1.1.0 — 2026-10-03
- Description widened so it triggers for generated images, product photos,
  mockups, thumbnails, ads, and launch videos, not only video-studio scenes.
- Image, ad creative, AI video, social, launch, website design, and prompt
  rewrite skills now point here when it is installed.

## 1.0.0 — 2026-10-03
- New sub-skill of luckiest-video-studio, based on iart.ai `shot-composition` (MIT).
- Placement systems: rule of thirds, phi grid, golden spiral, golden triangles,
  centered symmetry, with pixel anchors for 16:9, 9:16, 1:1, 4:5.
- White-space budgets per scene type. Focal spacing at least 1.5x supporting spacing.
- `references/twenty-rules.md`: the 20 photo composition rules adapted to video,
  each with a pass/fail test, mapped to motion-skill scene purposes.
- `--review` writes `qa/composition-review.md` with Approve or Block per scene.
- Rendered-still checks: squint blur, 160px thumbnail, anchor overlay.
- Network hook: after `--review`, offer to share the worst frame and its fix with
  the tribe for a second eye.
- `scripts/frame_check.py` (Pillow): draws thirds, phi, golden triangle, and
  safe-area overlays, writes squint and 160px thumbnail stills, and scores the
  focal point against each anchor system (exit 1 when off by more than 3%).
- 9:16 safe areas corrected from 13/19/6/6% to 15/35/11/18%, with per-platform
  pixels for TikTok, Reels, and Shorts. Source: postplanify.com and brandeal.ai
  safe-zone guides, checked 2026-10-03.
- Trend pass: not run. `/newsjack` and `/luckiest-trends` were skipped for this
  build. Safe-area percentages carry a re-check note instead.
- Thumbnail: description routes to `checklist` (matched "rule"). Real keyword
  match but loose. A composition or grid scene would fit better; that is a
  separate `/luckiest-micrographic` task.
