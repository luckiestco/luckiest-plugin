# Changelog — luckiest-churn-prevention

## 1.2.0 — 2026-11-01
- Support message signals: the same optional `scripts/triage.py` reads churn risk, refund asks and frustration from support text as a health score input. Runs only when the user prefers Laya; exit 2 means skip it.

## 1.1.3 — 2026-10-23
- Removed dead `tools/` registry and PostHog guide links. The tool tables stay.

## 1.1.2 — 2026-10-21
From coreyhaines31/marketingskills at 06d647e (issue #213, MIT).
- Health score components share one 0-100 scale; missing signals are unavailable, not healthy. Detractor wording fixed. Dunning ROI shown gross and net of tooling.

## 1.1.1 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Paddle Billing webhook names corrected (`transaction.payment_failed`, `subscription.past_due`, `subscription.canceled`).

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
