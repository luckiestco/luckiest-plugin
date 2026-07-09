# Changelog — luckiest-coder-subagent-driven-development

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from subagent-driven-development (Superpowers, MIT).
Cross-references remapped via the name map (requesting-code-review,
git-worktrees, writing-plans, executing-plans, tdd, finishing-a-branch).
Script `.superpowers/sdd/` workspace path fragments replaced with
`.luckiest-coder/sdd/` in sdd-workspace, review-package, task-brief, and SKILL.md.

### Improve pass (/refract)
- no changes beyond rebrand — the controller process, review-loop discipline,
  and file-handoff mechanics are the load-bearing content and were kept intact.

### Network hook
- share-with-tribe: the final whole-branch review produces a shareable review
  package; added one optional OFFER line to share it with the tribe.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
