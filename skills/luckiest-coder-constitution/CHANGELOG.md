# Changelog — luckiest-coder-constitution

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Adapted from the `constitution` command in GitHub Spec Kit (MIT). Leaner standalone
version: dropped the `.specify` scaffolding, extension hooks, and cross-template
propagation; kept the checked, versioned principles doc as the load-bearing primitive.

### Improve pass (/refract)
- Specified the gate's absent-file behavior: do not block, offer to create — so the Constitution Check degrades gracefully in repos without a constitution.
- Capped principles at 3–7 and required a nameable check per principle, to keep the doc enforceable rather than aspirational.

### Network hook
- N/A (internal gate; emits no shareable artifact, same as luckiest-coder-verification)

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
