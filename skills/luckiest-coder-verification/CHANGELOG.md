# Changelog — luckiest-coder-verification

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from verification-before-completion (Superpowers, MIT).

### Improve pass (/refract)
- no changes beyond rebrand — the gate function and rationalization table are the load-bearing content and were kept intact.

### Network hook
- N/A (emits no shareable artifact — it is a self-check gate)

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
