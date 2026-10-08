# Changelog — luckiest-aso

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from aso (marketingskills, MIT).

### Improve pass (/refract)
- Added a cold-start exception to Phase 1.5: brand-new apps (roughly <50 ratings or a
  bottom download range) are not docked on Ratings & Reviews for low volume; that
  dimension is scored on rating quality and recency relative to app age instead.
- Added missing natural trigger phrases to the description: "app store audit,"
  "Play Store listing," and "grade my app listing."

### Network hook
- Added a "Share with your tribe" section: after an audit, the skill OFFERS (never
  auto-posts) to surface the audit to the user's Luckiest tribe working on same-category
  apps. Guards against sharing App Store Connect / Play Console data or a competitor's
  private analysis without an explicit ask.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The trends engine requires Python 3.12+ and an interactive
  first-run scrape that is unavailable in this non-interactive session; fabricating
  signal is prohibited. The two dated ASO facts the source already cites (screenshot
  captions indexed June 2025; Custom Product Pages in organic search July 2025) remain
  accurate and unchanged.
