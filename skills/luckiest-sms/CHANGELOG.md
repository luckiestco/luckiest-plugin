# Changelog — luckiest-sms

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from sms (marketingskills, MIT).

### Improve pass (/refract)
- Added "Compliance — Read First" as a gating step (TCPA consent, quiet hours, opt-out handling) ahead of any send.
- Added "Segment Count — Estimate As You Draft" so cost/length is considered during copywriting, not after.
- Added "RCS — The Emerging Channel" guidance for brands evaluating richer messaging.

### Network hook
- share-with-tribe — offer-only ("Share with your tribe"), never auto-posts, never shares subscriber lists, numbers, or credentials.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (live trends engine required interactive first-run setup unavailable in this run; nothing fabricated)
