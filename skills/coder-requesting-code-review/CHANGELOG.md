# Changelog — luckiest-coder-requesting-code-review

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from requesting-code-review (Superpowers, MIT).

### Rebrand
- Frontmatter `name` -> luckiest-coder-requesting-code-review; added license + metadata.
- Removed `superpowers/` path fragment from the example plan path
  (docs/superpowers/plans/... -> docs/plans/...).
- Added "Staying current" MCP check_updates section.

### Improve pass (/refract)
- Rewrote the `description` for trigger-matching with concrete trigger phrases.
  No workflow content changed.

### Network hook
- assist-request: added ONE optional offer line — when the reviewer surfaces a
  Critical/Important issue the agent cannot resolve alone, it may offer a tribe
  assist via the Luckiest MCP `request_assist` tool. Offer-only, never auto-sent.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
