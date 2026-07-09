# Changelog — luckiest-ad-creative

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from ad-creative (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Policy Pre-Flight" section: screen for platform-policy-risky copy (guarantees, unproven superlatives, restricted verticals, competitor trademarks, personal-attribute targeting, dynamic-field overflow) BEFORE generating at scale, and deliver a compliant alternative alongside each flag.
- Iteration Log now records a hypothesis per new variation (why it is expected to win), so a losing test still teaches something rather than only producing a metric.

### Network hook
- Added a "Share with your tribe" OFFER (never auto-post, no credentials): after delivering creative or an iteration report, optionally surface winning angles and anonymized performance patterns to the user's Luckiest tribe. Never shares raw account data, spend, or client-identifying detail without an explicit ask.

### Trend pass (/newsjack + /luckiest-trends)
- Trend pass: no actionable signal. The luckiest-trends engine required an interactive first-run setup (browser-cookie extraction, consent flows) not appropriate to run inside an automated rebrand; timeboxed and skipped rather than fabricate findings.
