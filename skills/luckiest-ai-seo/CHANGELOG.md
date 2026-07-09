# Changelog — luckiest-ai-seo

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from ai-seo (marketingskills, MIT).

### Improve pass (/refract)
- Added `AGENTS.md` as a first-class machine-readable file (new trigger phrase + a short section alongside `llms.txt` and `/pricing.md`). The original mentioned it only in passing.
- Added an "Audit non-determinism" note: AI answers vary across sessions/regions/days, so priority queries should be checked 2-3 times and logged as a citation rate rather than a single yes/no.

### Network hook
- Share-with-tribe: after the AI Visibility Audit, the skill offers (never auto-posts) to surface the query set, citation findings, and gaps to the user's Luckiest tribe so others auditing the same competitors can pick up where they left off. No credentials or private analytics shared.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The newsjack CLI is not installed and no verifiable host web-search tool was available in this session, so no external signal could be confirmed. The source content is already dated to mid-2026 (Google OKF June 2026, Princeton GEO KDD 2024). No fabricated signal was added.
