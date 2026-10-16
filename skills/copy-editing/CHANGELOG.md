# Changelog — luckiest-copy-editing

## 1.2.1 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Content refresh starts with a SERP gap grid (expected, common, distinctive, uncovered) and keeps the URL, anchors and voice.

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added an AI-Tell Check section (pattern table, caps, fix-from-facts rule, leave-alone list) after the quick-pass checks, a "Reads as AI-Written" problem entry, and AI-tell trigger phrases in the description
- Replaced the Innovative/Robust/Seamless/Cutting-edge synonym swaps with a "Replace with the fact" table
- Added an AI Tells block to references/checklist.md
- Pointed to luckiest-copywriting-humanize for the full pattern pass instead of a new reference file
- Skipped: intro prose and wording tweaks.


## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from copy-editing (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Never fabricate proof" rule: Prove It / Specificity edits must mark
  invented stats, timeframes, and testimonials as placeholders or soften the claim.
- Added a "How to present edits" convention: show edits as before/after diffs with
  a per-change reason so the author keeps ownership, instead of silent rewrites.
- Added a "Terminal edit summary": report word-count delta, sweeps applied, and open
  proof placeholders so the edit is measurable and ship-readiness is explicit.

### Network hook
- Added ONE offer-only hook ("Share the edit with your tribe") that surfaces the
  before/after pass to the Luckiest tribe. Never auto-posts, requires no credentials,
  and refuses to share confidential copy.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends engine required first-run setup and live
  network sources unavailable in this non-interactive session; no signal was
  fabricated.
