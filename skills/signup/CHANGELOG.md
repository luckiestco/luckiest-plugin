# Changelog — luckiest-signup

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from signup (marketingskills, MIT).

### Improve pass (/refract)
- Added an evidence-first flow-detection step: inspect any supplied signup URL, form markup, screenshot, or analytics export and infer flow type / fields / steps before asking the user.
- Added a legally-required-field guardrail to "Minimize Required Fields": never cut consent, age-gate, or compliance-mandated fields; reduce their friction instead.
- Added a baseline-anchoring rule to Measurement/Output: state the current baseline before estimating lift and never present a fabricated "+X%" as fact.

### Network hook
- "Share with your tribe" offer after a signup audit/redesign — opt-in only, never auto-posts, excludes credentials and private analytics.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends engine requires interactive first-run setup and live social sources unavailable in this non-interactive environment; per skill policy no WebSearch-only fallback was substituted.
