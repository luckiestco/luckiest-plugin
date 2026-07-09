# Changelog — luckiest-directory-submissions

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from directory-submissions (marketingskills, MIT).

### Improve pass (/refract)
- Added a rejection/resubmission recovery section (Step 5): how to handle
  wrong-category, insufficient-traction, duplicate, and low-quality-asset
  rejections without mass-resubmitting.
- Added listing-decay monitoring as a standing quarterly default (dofollow
  flips, delisting, stale positioning) rather than a single one-time check.
- Added a backlink-profile dedup step (Step 4b): cross the existing referring
  domains against the directory list to skip duplicates and prioritize gaps.

### Network hook
- share-with-tribe (offer-only): after delivering a plan or verified listing
  set, offer to share the vetted directory tracker with the user's Luckiest
  tribe. Never auto-posts; excludes account emails and credentials.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal — the luckiest-trends engine was unconfigured
  (first-run wizard requires interactive consent for browser-cookie extraction
  and Python setup), which is out of scope for a non-interactive rebrand and
  beyond the timebox. No signal fabricated.
