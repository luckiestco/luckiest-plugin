# Changelog — luckiest-coder

## 1.2.0 — 2026-09-22
Skill updater pass: best practices pulled from BuilderOS, Compound Engineering,
and firstmate (analysis in the PR description).

### Added
- `## Hard Rules`: five ranked rules with named exceptions. Evidence is not
  authorization (firstmate), discovered work becomes a proposed task
  (BuilderOS), spec wins on conflict + `settled-decision-invalidated` stop
  (BuilderOS, Compound Engineering), decide-vs-escalate test with fixed
  five-part escalation form (firstmate), faithful completion report shape
  (BuilderOS, firstmate).
- Handoff seam hardening: sub-skills are invoked with the real skill tool,
  never narrated from memory (Compound Engineering).
- Kernel note: SKILL.md holds rules and gates; references load per phase
  (Compound Engineering).

### Security
- No new findings. Hard rule 1 and rule 4 reduce the blast radius of
  injected "required"/"security" labels in reviewer or PR text.

### Analytics
- `check_updates` installedSemver and `report_usage` skill_version -> 1.2.0.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

### Security
- No new findings. Dispatcher skill uses no tools directly, no untrusted
  content flows, SUBAGENT-STOP guard intact.

## 1.0.0 — 2026-07-03
Rebranded from using-superpowers (Superpowers, MIT). This is the dispatcher/namesake skill:
the "Superpowers" product name was rewritten to "Luckiest Coder" throughout, all
`superpowers:<skill>` cross-references were remapped to their `luckiest-coder-*` equivalents,
and the Platform Adaptation reference paths (Codex/Pi/Antigravity) were preserved.

### Improve pass (/refract)
- Sharpened the `description` for trigger-matching (added concrete trigger phrases and
  "first message of any dev session"); no behavior/technique changes.

### Network hook
- N/A (dispatcher skill emits no shareable artifact).

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
