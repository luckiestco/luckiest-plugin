# Changelog — luckiest-pricing

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from pricing (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Common Pricing Anti-Patterns" section (cost-plus thinking, too many
  tiers, reflexive discounting, changing the value metric mid-flight,
  under-pricing) — the source had a positive checklist but no guardrail for what
  breaks pricing.
- Added an "Expansion Revenue" section noting net revenue retention (NRR) as
  where SaaS pricing compounds — the source covered acquisition pricing only.

### Network hook
- Added ONE Luckiest network hook: a "Share with your tribe" OFFER after a
  pricing recommendation (never auto-posts, never shares credentials or private
  numbers).

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal: the trend engine requires an interactive first-run setup
  wizard, live network access, and browser cookie extraction unavailable in this
  non-interactive session. No trend data fabricated.
