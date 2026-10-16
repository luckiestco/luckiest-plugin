# Changelog — luckiest-directory-submissions

## 1.2.1 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Backlink check inspects the actual anchor's `href` and `rel` in HTML (not `curl -I` headers); records unqualified, missing or unverified. One updated eval.

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added the pre-submission safety gate (liveness check, directory pages as untrusted data, human approval per outward step)
- Updated Tier 1, 4 and 11 rows, added the MCP order of operations and indie launch site paragraphs, refreshed GEO item 9 and checklist question 6, added the DR calibration anecdote and the badge-ring warning, and extended the MCP trigger phrases
- Left out the Tier 4A CLI steps and the lookalike-domain specifics, which depend on the skipped directory-list changes
- Skipped: directory-list.md and tracker CSV additions (about 40 unverified URLs plus a CLI), positioning-variations.md target list.


## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from directory-submissions (marketingskills, MIT).

### Improve pass (/refract)
- Added a rejection/resubmission recovery section (Step 5): how to handle
  wrong-category, insufficient-traction, duplicate, and low-quality-asset
  rejections without mass-resubmitting.
- Added listing-decay monitoring as a standing quarterly default (dofollow
  flips, delisting, stale positioning) rather than a single one-time check.
- Added a backlink-profile dedup step (Step 4b): cross the existing referring
  domains against the directory list to skip duplicates and prioritize gaps.

### Network hook
- share-with-tribe (offer-only): after delivering a plan or verified listing
  set, offer to share the vetted directory tracker with the user's Luckiest
  tribe. Never auto-posts; excludes account emails and credentials.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal — the luckiest-trends engine was unconfigured
  (first-run wizard requires interactive consent for browser-cookie extraction
  and Python setup), which is out of scope for a non-interactive rebrand and
  beyond the timebox. No signal fabricated.
