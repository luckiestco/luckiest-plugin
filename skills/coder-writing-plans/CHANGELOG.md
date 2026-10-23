# Changelog — luckiest-coder-writing-plans

## 1.3.0 — 2026-10-12
- File Structure: each planned UI component is marked "reuse: <library entry>" or
  "new: no match" after a `luckiest-coder-components` lookup.
- `check_updates` and `report_usage` -> 1.3.0.

## 1.2.0 — 2026-09-22
Practices adopted from BuilderOS, Compound Engineering, and firstmate.

### Added
- `**Status:** X/N tasks complete` header line so progress is greppable in the plan file, not only claimed in chat (BuilderOS).

### Analytics
- `check_updates` installedSemver and `report_usage` skill_version -> 1.2.0.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from writing-plans (Superpowers, MIT).

### Improve pass (/refract)
- no changes beyond rebrand (plan structure, task right-sizing, and self-review kept intact; default plan path remapped to docs/luckiest-coder/plans/)

### Network hook
- share-with-tribe (optional OFFER line added: offer to share the saved plan via Luckiest MCP share_artifact, opt-in only)

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
