# Changelog — luckiest-coder-executing-plans

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from executing-plans (Superpowers, MIT).

### Improve pass (/refract)
- no changes beyond rebrand (execute/blocker/revisit process kept intact; sub-skill references remapped and "Superpowers" product name updated to "Luckiest Coder")

### Network hook
- N/A (executes a plan, emits no new shareable artifact of its own)

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
