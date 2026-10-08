# Changelog: luckiest-video-studio-cards

## 1.3.0 — 2026-10-08
- All 406 pack cards render in landscape, vertical, and square from one file. Cards
  size the canvas with `--w`/`--h`, place text from the safe insets, and restack under
  `[data-format=vertical]` and `[data-format=square]`; tier2 overlays sit at the bottom
  of the safe area in vertical and square. Removed the "packs are 1920x1080 only" note.
- Pack `tokens.css` carries the landscape size defaults and `--type`, which makes type
  20% larger in vertical.
- Slot text that sat in the landscape margins or bled off the frame (hero numerals,
  edge tabs) now sits inside the safe area.
- `qa-cards.mjs sample` takes `--format <name,...|all>`, `--tier`, and `--all`, and puts
  tier2 cards on a gray backdrop.

## 1.2.0 — 2026-10-08
- `graph-paper` and `glass-popout` scene templates use the coordinator's size
  tokens and render in all three formats; `glass-popout` stacks its panel at the
  bottom of the safe area in vertical and square, and sits on the safe edge in
  landscape. Card packs stay 1920x1080 only, noted in SKILL.md.

## 1.1.0 — 2026-10-05
- Cards follow `art-direction.json` when installed.

## 1.0.1 (2026-10-03)
- Points at `luckiest-video-studio-composition` (when installed) for focal point, grid, white space, and safe areas.

## 1.0.0 (2026-09-30)
- New sub-skill: 406 cards in the paper-collage and aurora-glass packs, a
  blueprint, two scene templates, and registry and new-pack scripts.
- Cards take brand.json colors and fonts; no remote font loading.
- Fixed the 57 cards that failed HyperFrames lint in the kit; all 406 now lint
  clean.
