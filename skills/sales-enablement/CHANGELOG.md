# Changelog — luckiest-sales-enablement

## 1.3.0 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- New cold-call-scripts reference (openers, voicemails, pushback).

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added Claims Reps Can Defend, Live Deal Objection, Battle Cards, and Win-Loss Analysis sections, two output-format rows, two related skills, and new description triggers.
- Added references/win-loss-analysis.md.
- Skipped: upstream tool-table links, evals, version bump.


## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from sales-enablement (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Every Proof Point Must Trace to a Real Source" principle: forbids fabricated metrics, logos, quotes, or analyst mentions and requires explicit placeholders when the real figure is unknown.
- Added a "Freshness Footer" convention (Last reviewed / Owner / Review by) across all reusable asset types to fight stale-library rot.

### Network hook
- Added a "Share with your tribe" OFFER (never auto-post): after delivering an asset, offer to surface it to the user's Luckiest tribe for reps on the same persona/deal stage, with guardrails against sharing unpublished pricing, private customer data, or unapproved metrics.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends engine requires interactive Python/source setup and a full live run outside this timeboxed rebrand; no verified current signal was obtained, and none was fabricated.
