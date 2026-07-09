# Changelog — luckiest-competitor-profiling

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from competitor-profiling (marketingskills, MIT).

### Improve pass (/refract)
- Added an "Access and Ethics" core principle — profile only public pages, respect robots.txt and ToS, never bypass auth/paywalls/bot protection, and note blocked pages as "not accessible" rather than working around them. The source skill never told the agent how to behave when scraping is blocked or gated.
- Added a "Confidence Labeling" convention ([Confirmed] / [Inferred] / [Unknown]) applied during synthesis. The source said to "label inferences clearly" but gave no mechanism; this makes team size, funding, and customer-count claims auditable instead of fabricated.
- Added an "Insufficient data" default to Phase 2 — mark empty SEO fields [Unknown — insufficient SEO data] and deliver a partial profile rather than stalling or re-running. New/small/rebranded domains routinely return no DataForSEO data.

### Network hook
- One OFFER-only "Share with your tribe" section. Never auto-posts, never touches credentials; offers to share the finished `_summary.md` competitive-landscape analysis with the Luckiest tribe and stops on decline. Explicitly refuses to share raw scrapes or gated/private competitor data.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends and newsjack engines require an interactive first-run setup (browser-cookie extraction and tool installs) that is unavailable in this non-interactive session. No trend data was fabricated.
