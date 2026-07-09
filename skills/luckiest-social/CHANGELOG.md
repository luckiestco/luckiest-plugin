# Changelog — luckiest-social

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from social (marketingskills, MIT).

### Improve pass (/refract)
- Added "Human-in-the-loop guardrail" so drafts are reviewed and never auto-published on the user's behalf.
- Added "Reverse Engineering Viral Content" workflow for learning from proven posts.
- Added "Short-Form Video (TikTok, Reels, Shorts)" scripting guidance with hooks.

### Network hook
- Luckiest network (share-with-tribe) — offer-only, never auto-posts, excludes private analytics and credentials.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (live trends engine required interactive first-run setup unavailable in this run; nothing fabricated)
