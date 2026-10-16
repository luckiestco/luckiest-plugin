# Changelog — luckiest-marketing-plan

## 1.2.1 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Budget formula corrected: retain the starting base first, then size new customers on retained ARR (the old formula undercounted by ignoring base churn; worked example now $225.5K, not $200K).

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added path safety rules for the client slug in SKILL.md and references/methodology.md Step 1.1.2
- Added references/market-sizing.md (TAM/SAM/SOM, four-method triangulation, attractiveness scorecard) with a pointer in SKILL.md and market-sizing trigger phrases in the description
- Skipped: nothing.


## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from marketing-plan (marketingskills, MIT).

### Improve pass (/refract)
- Executive summary big bets now carry an explicit kill criterion (observable result + date that would make the team stop the bet), not just a success definition — reduces sunk-cost drift.
- Every revenue, CAC, LTV, and budget figure carries a confidence tag ([measured] / [benchmarked] / [assumed]) so modeled numbers are not read as verified when founders lift them into investor updates; [assumed] load-bearing numbers auto-populate the Open decisions section.

### Network hook
- Share-with-tribe OFFER at FINALIZE: after the plan is finalized, offers once to surface an anonymized outline (AARRR structure + funding stage only, never client names/budgets/unit-economics/credentials) to the user's Luckiest tribe. Offer only, never auto-posts, stops on decline.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends engine requires an interactive first-run setup wizard (browser-cookie consent, tool installs) that cannot run in this non-interactive rebrand session; skill content is timeless strategic methodology with no time-sensitive claims to update. No signal fabricated.
