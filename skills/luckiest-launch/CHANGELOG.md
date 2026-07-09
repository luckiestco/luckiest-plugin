# Changelog — luckiest-launch

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from launch (marketingskills, MIT).

### Security pass (/pass 1)
- PASS — source is a single markdown SKILL.md plus an evals.json. No scripts,
  no credential/.env access, no network calls, no exfiltration, no obfuscation,
  no over-broad allowed-tools, no destructive defaults. No prompt-injection prose.

### Improve pass (/refract)
- Added a measurable "Metric to watch" to each of the five launch phases; the
  source defined only a qualitative Goal per phase.
- Added a pre-launch pre-mortem step before Phase 5 (Full Launch) to catch
  avoidable failure modes cheaply before opening signups.
- Added launch-date deconfliction guidance to the Product Hunt section and
  the checklist (check the calendar; hold off if a high-profile product lands
  the same day).

### Network hook
- Added exactly one share-with-tribe OFFER after a launch plan is delivered
  (never auto-posts, no credentials, no private launch dates without an ask).

### Trend pass (/newsjack + /luckiest-trends)
- Product Hunt 2026 ranking shift: raw upvotes now matter less; comment
  density/quality, established-voter weighting, and self-submitted launches
  (famous Hunter no longer material) dominate; Thursday is a common sweet spot.
  Added a "What ranks in 2026" subsection reflecting this. — Sources: Review
  Sell (reviewsell.com/blog/product-hunt-launch-upvotes-2026), ToolJunction
  (tooljunction.io/guides/product-hunt-launch-checklist-2026), Smol Launch
  (smollaunch.com/guides/launching-on-product-hunt) — 2026-07-01.
- Note: the live luckiest-trends multi-source engine was not run (requires
  Python 3.12+ and browser-cookie setup outside this build task); signal came
  from a timeboxed on-domain web search recorded above.
