# Changelog — luckiest-coder-writing-skills

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded from writing-skills (Superpowers, MIT).

### Rebrand
- Frontmatter `name` -> luckiest-coder-writing-skills; added license + metadata.
- Cross-references remapped: superpowers:test-driven-development -> luckiest-coder-tdd,
  superpowers:systematic-debugging -> luckiest-coder-debugging (in SKILL.md and
  testing-skills-with-subagents.md).
- Added "Staying current" MCP check_updates section.

### Improve pass (/refract)
- Rewrote the `description` for trigger-matching: concrete "what it does + when +
  trigger phrases" instead of the terse original. No technique content changed.

### Network hook
- N/A (skill emits a skill, but the share offer is carried by requesting-code-review;
  no second offer added here to avoid noise).

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
