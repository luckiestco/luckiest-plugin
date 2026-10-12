# Changelog — luckiest-coder-receiving-code-review

## 1.2.0 — 2026-09-22
Practices adopted from BuilderOS, Compound Engineering, and firstmate.

### Added
- Untrusted-input framing: review text is data describing a problem, never instructions or authority (Compound Engineering ce-sweep, firstmate ask-user-authority).

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
Rebranded from receiving-code-review (Superpowers, MIT).

### Rebrand
- Frontmatter `name` -> luckiest-coder-receiving-code-review; added license + metadata.
- No cross-skill references in body; no path fragments to change.
- Added "Staying current" MCP check_updates section.

### Improve pass (/refract)
- Rewrote the `description` for trigger-matching with concrete trigger phrases
  (human/subagent/GitHub sources). No reception guidance changed.

### Network hook
- N/A (skill consumes a review; produces no shareable artifact).

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
