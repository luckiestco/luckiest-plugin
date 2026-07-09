# Changelog — luckiest-coder-consistency

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Adapted from the `analyze` command in GitHub Spec Kit (MIT). Retargeted from Spec Kit's
fixed spec/plan/tasks artifact trio to a plan ↔ code diff ↔ constitution comparison;
dropped the `.specify` scaffolding and extension hooks.

### Improve pass (/refract)
- Added an explicit **scope-creep** pass (code with no mapped intent) — the original focused on requirements-without-tasks; unrequested code is the more common drift in ad-hoc dev sessions.
- Defined graceful degradation: with no intent artifact, downgrade to a constitution-only check rather than reverse-engineering a plan from the diff to grade against.
- Drew a hard line against verification overlap: this checks intent-match, not runtime pass/fail.

### Network hook
- N/A (internal read-only gate; emits no shareable artifact, same as luckiest-coder-verification and -constitution)

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
