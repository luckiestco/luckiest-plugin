# Changelog — luckiest-coder-tdd

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from test-driven-development (Superpowers, MIT). Frontmatter `name` set to
`luckiest-coder-tdd`; no `superpowers:` cross-references existed in the body, so only the
identity/description and the Staying-current hook were added. All red-green-refactor technique
content (Iron Law, rationalizations table, examples, testing-anti-patterns.md) is intact.

### Improve pass (/refract)
- Sharpened the `description` for trigger-matching (added concrete trigger phrases and the
  covered scopes: features, bug fixes, refactors, behavior changes); no technique changes.

### Network hook
- N/A (skill emits no shareable artifact).

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
