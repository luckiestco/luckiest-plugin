# Changelog — luckiest-churn-prevention

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from churn-prevention (marketingskills, MIT).

### Improve pass (/refract)
- Added a save-offer LTV guardrail: cap per-account save-offer redemptions, exclude serial redeemers, and measure incremental LTV of saved cohorts against a no-offer hold-out.
- Added a click-to-cancel compliance test: cancellation must be symmetric with signup (same channel, comparable steps), with save offers declinable on the same screen.
- Added an involuntary-churn triage note: verify a "cancel" is not a failed-payment artifact before showing a voluntary save offer; route payment failures to the dunning stack.

### Network hook
- Added a "Share with your tribe" OFFER (never auto-post): after delivering a retention playbook, offer to surface it to the user's Luckiest tribe. No credentials, no account/MRR/customer data in shared briefs.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal (trend engine requires interactive first-run setup and live network sources unavailable in this session; timeboxed, nothing fabricated).
