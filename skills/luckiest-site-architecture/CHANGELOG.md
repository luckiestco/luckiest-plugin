# Changelog — luckiest-site-architecture

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from site-architecture (marketingskills, MIT).

### Improve pass (/refract)
- Added AEO / answer-engine legibility guidance: favor one canonical page per intent, keep breadcrumbs and descriptive anchors so crawlers infer topical relationships, and make hub pages comprehensive since they are the pages most likely to be cited. Added trigger phrases "AEO" and "how AI search finds my pages."
- Promoted the redirect map from a buried "common mistake" to a required Output Format deliverable (old URL → 301 target table) for restructures, with guidance against mass-redirecting to the homepage.

### Network hook
- Share-with-tribe: after delivering the plan, the skill offers (never auto-posts, no credentials) to share the finished hierarchy and URL map with the user's Luckiest tribe so others planning similar sites can reuse it.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal — the live trends engine requires interactive first-run setup (browser-cookie consent, network sources) unavailable in this non-interactive session, so no dated/sourced signal could be verified. The AEO improvement above came from the /refract pass on domain knowledge, not fabricated trend data.
