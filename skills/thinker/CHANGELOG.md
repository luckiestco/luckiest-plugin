# Changelog

## 1.2.0 - 2026-10-31
Routes "research direction nobody has tried" asks to the new sub-skill
**luckiest-think-different** (adapted from alejandrohdez00/alien-space-of-science,
sha 39cbccc).

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 - 2026-07-06

Initial Luckiest edition, derived from Anthropic's refract skill.

- Added lite/full effort tiers (lite default, full for creative/brainstorm work).
- Replaced in-head SSoT hashing with real RNG via python3 when a shell is
  available; SSoT retained as no-shell fallback.
- Compiled the original red-flag lists into a binary pre-response self-check gate.
- Added session anti-repetition (halve weight of already-produced candidates).
