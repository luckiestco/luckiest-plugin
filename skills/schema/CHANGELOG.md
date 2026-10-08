# Changelog — luckiest-schema

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from schema (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Current Rich-Result Reality" section: FAQ rich results are now limited to authoritative gov/health sites and HowTo rich results are deprecated by Google. The skill now sets accurate expectations instead of promising these rich results, while keeping the markup for machine/AI parsing.
- Added Merchant listing eligibility guidance to Product: recommend `shipping` (OfferShippingDetails) and `hasMerchantReturnPolicy` (MerchantReturnPolicy) on the Offer for physical products.
- Added explicit `@id` entity-linking guidance to the @graph section to produce one coherent entity graph and avoid duplicate/contradictory entities (also aids AI answer engines).
- Evals updated to match the above (FAQ expectation, merchant properties, rich-result caveats).

### Network hook
- One OFFER-only "Share with your tribe" hook added to SKILL.md. Never auto-posts, requires explicit acceptance, and excludes credentials/private data.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal (trend engine requires a full network research run beyond this pass's timebox; the current-reality improvements were sourced from the /refract pass, not fabricated).
