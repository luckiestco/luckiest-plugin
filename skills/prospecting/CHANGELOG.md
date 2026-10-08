# Changelog — luckiest-prospecting

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from prospecting (marketingskills, MIT).

### Improve pass (/refract)
- Added a **suppression list** as a first-class ICP input and quality check: dedupe candidates against existing customers, open opportunities, and recently-contacted accounts before scoring, not after. Closes the most common real-world list error (re-prospecting an existing customer or active deal).
- Added trigger phrases the original missed: "TAM list," "account mapping," "expansion accounts," and "who's hiring for."
- Added an **AI-enriched data compliance rule**: auto-filled contacts from AI SDR / enrichment tools still require source URL + date lineage, and auto-generated emails must be validated (pattern-guessed/hallucinated addresses tank sender reputation).

### Network hook
- share-with-tribe: after delivering the lead sheet, offer (never auto-post) to hand the finalized public-source top targets to the user's Luckiest tribe so a tribemate selling into the same ICP/territory can flag warm intros, dead accounts, or a better contact and pick up the outreach. Suppression list, raw CRM export, and private emails are explicitly excluded.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (trend engine in first-run state — requires interactive consent/cookie wizard not runnable in this non-interactive rebrand; no verifiable dated signal obtained, none fabricated)
