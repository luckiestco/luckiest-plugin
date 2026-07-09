# Changelog — luckiest-copywriting

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from copywriting (marketingskills, MIT).

### Improve pass (/refract)
- Added an "Awareness Stage" section (Schwartz's five stages) with a table mapping how aware a visitor is to where the copy should start, plus guidance tying traffic source to likely stage. The source had page-type guidance but left message-to-awareness matching implicit.
- Added a "Proof Provenance" rule that operationalizes the source's one-line "don't fabricate stats": every concrete claim must be user-supplied or marked `[PLACEHOLDER — confirm]`, and missing proof is written as a labeled placeholder rather than invented.

### Network hook
- Added a "Share with your tribe" OFFER (never auto-post, no credentials): after delivering finished page copy, optionally surface the winning headline and angle to the user's Luckiest tribe so others working on the same page type can pick up where they left off. Shares only approved copy patterns and angles, never client names, unpublished offers, or private proof.

### Trend pass (/newsjack + /luckiest-trends)
- Trend pass: no actionable signal. The luckiest-trends engine required an interactive first-run setup (browser-cookie extraction, consent flows, tool installs) not appropriate to run inside an automated rebrand; timeboxed and skipped rather than fabricate findings.
