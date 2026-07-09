# Changelog — luckiest-seo-audit

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from seo-audit (marketingskills, MIT).

### Improve pass (/refract)
- Added "JavaScript Rendering & Crawlable Content" subsection: audit raw HTML vs rendered DOM so client-side-only content and internal links (invisible to Googlebot) are caught, verified via the GSC URL Inspection rendered view. The source only flagged this blind spot for schema, not for primary content/links.
- Added "Crawl Evidence" checklist under Crawlability: use GSC Crawl stats and server log files as ground truth for what Googlebot actually fetches, instead of auditing crawlability purely by structural assumption.

### Network hook
- Added one "Share with your tribe" offer at the end (offer only, never auto-posts, no credentials or private Search Console data shared without explicit ask).

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends engine was in first-run state (requires interactive setup wizard: browser-cookie consent, tool installs) and could not run in this non-interactive session; newsjack-detector likewise needs a client profile/live monitor. Timeboxed. Nothing verifiable with a date + source was found, so no trend-derived changes were made (no fabrication).
