# Changelog — luckiest-ads

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from ads (marketingskills, MIT).

### Improve pass (/refract)
- Added an RSA platform-limit drift caveat: character/asset limits change over time, so verify against Google's current docs if compliant output is rejected rather than assuming the output is wrong.
- Added "Kill vs. Keep Decision Rules" with concrete spend/data thresholds (judge only after ~1-3x target CPA or ~50 conversions, respect the learning phase, explicit kill and scale signals) — the original only said "if CPA too high" with no decision rule.
- Added a conversion signal-loss note: browser pixels under-report post-iOS ATT / ITP / ad blockers, so prefer server-side signals (Meta CAPI, Google enhanced/offline conversions) and read client-only counts as a floor.

### Network hook
- "Share with your tribe" OFFER (never auto-post, never sends account IDs, spend, pixel data, or audiences unless the user explicitly includes them) so others working the same platform/objective can pick up where the user left off.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (timeboxed; the durable, verifiable signal-loss/limit-drift facts were captured in the improve pass instead of fabricating a dated trend).
