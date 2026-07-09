# Changelog — luckiest-offers

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from offers (marketingskills, MIT).

### Improve pass (/refract)
- Added a baseline-snapshot step to the Diagnostic Loop so before/after conversion lift is attributable rather than felt.
- Added a guarantee-vs-margin sanity check: check guarantee generosity against gross margin and expected refund rate before shipping.

### Network hook
- Share-with-tribe (opt-in OFFER): after an offer is drafted, offer to share an anonymized teardown (value-equation scores + the one lever changed) with the user's Luckiest tribe for feedback. Never auto-posts, no credentials.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (luckiest-trends engine required interactive first-run setup; timeboxed, not run — offer-design fundamentals are stable, no fabricated signal added)
