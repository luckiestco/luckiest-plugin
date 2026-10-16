# Changelog — luckiest-competitor-profiling

## 1.2.1 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Description points account research at luckiest-prospecting.

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Core Principle 1 now separates Observed, Inferred, and Implication; added 'not observed is not absent' and 'never state motive'; a single scrape cannot prove 'unchanged'; 'where we're strong' needs evidence or a hypothesis label.
- Added Tool Stack Selection, a WebFetch fallback for Phase 1, an alternative-SEO-source fallback for Phase 2, and a marketing-plan related skill.
- tool-reference.md: folded firecrawl_extract into scrape JSON mode and added the Alternative Stack section (WebFetch paths, Ubersuggest mapping, execution orders, error table).
- Skipped: evals.

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
