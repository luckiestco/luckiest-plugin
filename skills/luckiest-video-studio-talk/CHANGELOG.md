# Changelog: luckiest-video-studio-talk

## 1.3.0 — 2026-10-05
- Follows `art-direction.json` and runs the director's score loop when installed.

## 1.2.1 (2026-10-03)
- Points at `luckiest-video-studio-composition` (when installed) for focal point, grid, white space, and safe areas.

## 1.2.0 (2026-09-30)
- `scripts/grab-evidence.mjs`: screenshots the real pages a talk names and
  records where and when each was captured, so scenes show real evidence.
- Step 4 runs the `face` gate and judges each new version against the last one,
  up to v3.

## 1.1.0 (2026-09-30)
- Step 4 runs the coordinator's `qa.mjs` gates (beat sync, tokens, cross-fade,
  pops, dead frames, legibility, presence) instead of describing them.
- Overlay scenes carry `source` and `sourceStart` for the presence gate, and can
  use cards from `luckiest-video-studio-cards`.

## 1.0.0 (2026-09-29)
- New sub-skill: lower thirds, takeovers, captions, and persistent-world story
  rules over a cleaned talking-head clip, for 9:16 reels and 16:9 explainers.
- Overlays render as storyboard motion scenes; plan and footage validators ported.
