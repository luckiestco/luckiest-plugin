# Changelog — luckiest-co-marketing

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from co-marketing (marketingskills, MIT).

### Improve pass (/refract)
- Added a **conflict screen** (competitor / roadmap-overlap / channel-conflict / exclusivity) that runs before partner scoring, so an apparently adjacent partner that is actually a competitor is caught early. Addresses the confusion shown directly in eval #2.
- Added **partnership commitment guardrails** to the Structuring section: mutual promotion minimums in the agreement, test-small-before-big, a single accountable owner per side, and an agreed fallback for a missed commitment. Targets the most common real failure mode (partner under-promotes or ghosts mid-campaign), which the source never addressed.
- Threaded both into the checklist (conflict screen under Partner Identification; promotion minimums under Campaign Planning).
- Considered but rejected as bloat: a standalone legal/brand-usage caution (already covered by the agreement outline's Branding item).

### Network hook
- share-with-tribe — after identifying partners or building a campaign plan, the skill OFFERS (never auto-posts) to surface the plan to the user's Luckiest tribe so others hunting a similar partner can pick up where they left off. Declinable; partner names, outreach drafts, and account-overlap data are never shared without an explicit ask; no credentials involved.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The session was non-interactive and the live news/social connectors were not authorized, so no dated external signal could be verified. Nothing was fabricated to fill the pass.
