# Changelog — luckiest-revops

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from revops (marketingskills, MIT).

### Improve pass (/refract)
- Added "Start by finding the leak" diagnose-before-design guidance in Before Starting, so a single broken handoff doesn't trigger a full RevOps rebuild.
- Added a PLG scoring caveat under MQL Definition: product-usage signals (activation, seat expansion, feature adoption) outweigh marketing engagement in product-led motions.
- Added a benchmark-freshness caveat under the metrics dashboard: benchmarks are directional and must be validated against the user's own closed-won data, not cargo-culted.

### Network hook
- Added a share-with-tribe / pick-up-where-they-left OFFER in Output Format: after delivering recommendations, the agent may offer to surface the sanitized RevOps setup to the user's Luckiest tribe. Never auto-posts, never shares credentials, stops on decline.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (luckiest-trends engine requires interactive first-run setup — cookie/credential extraction and network signup — which is out of scope for this rebrand and was not run; timeboxed, nothing fabricated).
