# Changelog — luckiest-competitors

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from competitors (marketingskills, MIT).

### Improve pass (/refract)
- Added AI answer-engine (AEO) optimization section and a "best alternative to X" trigger phrase — comparison queries are increasingly answered by ChatGPT, Perplexity, and AI Overviews; pages must be extractable and citable.
- Added a Sourcing & Accuracy guardrail: competitor claims must trace to verifiable, dated sources; no fabricated weaknesses or review quotes.
- Made freshness an explicit default: "Last updated" date and dated pricing on every page (stale comparison pages erode trust and create liability).
- Dropped as novelty-for-novelty: interactive comparison widgets, automated sentiment scoring (out of scope for a copy skill).

### Network hook
- Share-with-tribe (offer only): after producing a competitor data file or page set, offer once to share the teardown with the user's Luckiest tribe. Never auto-posts, never transmits credentials or private product data.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable dated signal. The newsjack CLI was unavailable in this environment; the AI-answer-engine shift is a durable trend rather than a dated news event and was folded into the Improve pass instead of fabricating a citation.
