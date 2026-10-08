# Changelog — luckiest-coder-dispatching-parallel-agents

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from dispatching-parallel-agents (Superpowers, MIT).

### Improve pass (/refract)
- no changes beyond rebrand — the independence decision graph and agent-prompt
  structure are the load-bearing content and were kept intact.

### Network hook
- N/A (coordinates ephemeral subagents; emits no durable shareable artifact)

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
