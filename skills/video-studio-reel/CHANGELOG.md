# Changelog: luckiest-video-studio-reel

## 1.3.0 — 2026-10-08
- `templates/reel.html` renders landscape, vertical, and square from one file:
  laid out from the safe-area center, phrase wraps between words, grid 16x9, 7x8,
  or 8x8, HUD on the safe edges with the real size printed. In landscape the HUD
  moves in to the 5% safe area.

## 1.2.0 — 2026-10-05
- Follows `art-direction.json` and runs the director's score loop when installed.

## 1.1.1 (2026-10-03)
- Points at `luckiest-video-studio-composition` (when installed) for focal point, grid, white space, and safe areas.

## 1.1.0 (2026-09-30)
- Verify step runs the coordinator's `qa.mjs` beat grid, pops, dead frames,
  legibility, and cross-fade gates on the rendered reel.

## 1.0.0 (2026-09-29)
- New sub-skill: beat-locked brand reel rendered as a `reel` logo recipe, with a
  starter composition, HUD, and beat grid, splice, and premix scripts.
- No paid generation; user-supplied music and the CC0 sound kit only.
