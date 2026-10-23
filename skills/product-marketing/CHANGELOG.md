# Changelog — luckiest-product-marketing

## 1.2.0 — 2026-10-21
From coreyhaines31/marketingskills at 06d647e (issue #213, MIT).
- Voice attributes with means, doesn't mean, and a real line. New references/brand-voice.md.
- Paid Ads and Learnings sections in the context document, plus how to maintain Learnings. New brand-voice and learnings triggers.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from product-marketing (marketingskills, MIT).

### Improve pass (/refract)
- Added a staleness check: on an existing doc, flag context older than ~90 days and offer a freshness review before other skills rely on it.
- Added inferred-vs-confirmed field tagging when auto-drafting from a codebase, so downstream skills don't treat guesses as confirmed facts.

### Network hook
- Share-with-tribe offer (Step 5): after saving, offers to surface the positioning brief to the user's Luckiest tribe so others in the same product space can pick up where they left off. Offer only, never auto-post, no credentials.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (subject is evergreen positioning/ICP methodology; no dated, on-domain signal warranting changed defaults)
