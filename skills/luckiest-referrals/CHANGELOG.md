# Changelog — luckiest-referrals

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from referrals (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Qualify Before You Build" gate: confirm a natural share trigger, referral-vs-broad-discount fit, and a large enough active base before designing a loop.
- Added an "Attribution Caveat" under Measuring Success: distinguish incremental referrals, use a consistent attribution model across channels, and hold out a control cohort to measure true lift rather than over-crediting last-touch.

### Network hook
- "Share with your tribe": after delivering a program design, OFFER (never auto-post, no credentials) to surface the approach to the user's Luckiest tribe; skip for private-by-nature requests unless explicitly asked.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. luckiest-trends run (referral/affiliate tactics, 30-day window) returned zero usable evidence — HN blocked by SSL cert failure, no web backend, no X cookies. Nothing recorded to avoid fabrication.
