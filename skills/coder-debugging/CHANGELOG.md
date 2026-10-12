# Changelog — luckiest-coder-debugging

## 1.2.0 — 2026-09-22
Practices adopted from BuilderOS, Compound Engineering, and firstmate.

### Added
- Trigger / masking condition / symptom separation and a falsification check per hypothesis (firstmate diagnostic-reasoning).
- Anti-thrash threshold: three failed fixes or hypotheses stops the loop (Compound Engineering ce-debug).
- Causal chain stated in the same turn as the fix-choice question (Compound Engineering ce-debug).

### Analytics
- `check_updates` installedSemver and `report_usage` skill_version -> 1.2.0.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from systematic-debugging (Superpowers, MIT).

### Improve pass (/refract)
- no changes beyond rebrand (four-phase process kept intact; cross-references remapped to luckiest-coder-tdd and luckiest-coder-verification)

### Network hook
- N/A (debugging emits no shareable artifact)

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
