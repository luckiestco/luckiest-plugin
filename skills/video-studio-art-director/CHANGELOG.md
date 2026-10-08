# Changelog — luckiest-video-studio-art-director

## 1.5.0 — 2026-10-08
- "Do not repeat earlier runs": reads earlier `art-direction.json` files in the
  workspace and bans their signature transition, wow device, texture, and concept,
  plus palette and fonts unless the design system fixes them or the user wants a
  series. Recorded under `bannedFromEarlierRuns`; `wowDevice` is now written so
  later runs can read it.
- Practice studied from the Motion Studio skill bundle. Ideas only, no code or text copied: the bundle carries no license for its own scripts or docs.

## 1.4.0 — 2026-10-05
- Section 3b "Real, not generated": named light direction with hard shadows,
  film stock and grain, skin texture, off-center candid framing, specific
  places, banned prompt words, guidance near 3.5 to 4, real assets first.
  Never hides provenance.
- `references/shot-prompting.md`, adapted from Replicate `prompt-images`
  (Apache-2.0): shot written as sentences, vocabulary, quoted text, edits,
  consistency, model settings, before and after.
- "Looks generated" in style-frame approval, the review table (Block), and
  anti-patterns.
- Now a sub-skill of luckiest-image, luckiest-brandkit, and
  luckiest-design-website.

## 1.3.0 — 2026-10-05
- Section 0: point to existing files instead of describing them; read
  `.luckiest/corrections.md` first.
- Section 0b: every rule is choice, reason, example path, with a freedom level
  (locked, guided, open). The concept is never locked. No "in the style of" names.
- `art-direction.json` adds `freedom`.
- Section 9: log every correction, diagnose repeats (missing, unclear,
  unreachable example, wrong rule), and offer to add the fixed rules to
  `DESIGN.md` with one yes. Review blocks a scene that repeats a logged correction.

## 1.2.0 — 2026-10-05
- Section 0: find the project's design system first (DESIGN.md, tokens, CSS
  variables, Tailwind theme, shadcn/ui, fonts, motion constants). It wins over
  every default; video-only changes are logged under `designSystem.overrides`.
- Review adds a "Matches design system" column.

## 1.1.0 — 2026-10-05
- Video-safe color rules and type-in-motion hold formula, from Skill Me (MIT).
- Review adds Color safe and Type holds columns.

## 1.0.0 — 2026-10-05
- New sub-skill of luckiest-video-studio, based on iart.ai `motion-art-direction` (MIT).
- Writes `art-direction.json`: tone cell, motion personality, palette, faces,
  texture, easing pair, base unit, transition family, stagger, intensity, wow scene.
- Style-frame check before the user sees it. `--review` writes
  `qa/art-direction-review.md` with Approve or Block per scene.
