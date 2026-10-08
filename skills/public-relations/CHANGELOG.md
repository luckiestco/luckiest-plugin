# Changelog — luckiest-public-relations

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from public-relations (marketingskills, MIT).

### Improve pass (/refract)
- Added an integrity guardrail: never fabricate or guess journalist contact details, quotes, data, or coverage; only use verified sources and ask for missing facts.
- Added a draft-not-send constraint: the skill prepares pitches and assets but never sends email, posts publicly, or contacts journalists on the user's behalf.

### Network hook
- Added ONE offer-only "Share with your tribe" hook: after a media list or pitch angle is ready, offer to surface the PR play so tribe members working the same beat can pick up where the user left off. Never auto-posts, never contacts anyone, no credentials, and excludes private targeting unless explicitly asked.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal
