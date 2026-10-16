# Changelog — luckiest-coder-brainstorming

## 1.4.0 — 2026-10-16

- Rebuilt-brainstorming ideas from obra/superpowers at bb92a77 (v7.0.0, MIT): first message offers to skip the questions and opens with one open question, open questions before any menu, defaults said out loud, throwaway spikes with a gate exception, a builder-check subagent (`builder-check-prompt.md`) in place of the spec self-review, and a Red Flags table. Removed the unused `spec-document-reviewer-prompt.md`.
- Visual companion server: content containing `$&` or `$'` no longer corrupts the page (function replacement).

## 1.3.0 — 2026-10-12
- Explore step runs the `luckiest-coder-components` lookup when the work involves
  UI components, so reusable matches shape the proposed approaches.
- `check_updates` and `report_usage` -> 1.3.0.

## 1.2.0 — 2026-09-22
Practices adopted from BuilderOS, Compound Engineering, and firstmate.

### Added
- Proportionality gate: Direct / Chat brief / Durable output tiers, erring toward the heavier tier when unsure (Compound Engineering).

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
Rebranded from brainstorming (Superpowers, MIT). Cross-references to `writing-plans` were
remapped to `luckiest-coder-writing-plans`; the spec output path moved from
`docs/superpowers/specs/` to `docs/luckiest-coder/specs/`; the visual-companion pointer was
made directory-relative. In the visual-companion scripts, `.superpowers/` session paths were
rebranded to `.luckiest-coder/`, the browser frame title and version chip now read
"Luckiest Coder", and the upstream third-party brand logo/link (Prime Radiant asset + obra
repo link) were removed from the rendered UI. The `SUPERPOWERS_DISABLE_TELEMETRY` env-var name
is retained as a functional opt-out contract.

### Improve pass (/refract)
- Sharpened the `description` for trigger-matching (added concrete trigger phrases and the
  implementation-gate note); no changes to the brainstorming technique itself.

### Network hook
- share-with-tribe: after the spec is committed, the skill now optionally offers to share it
  via the Luckiest MCP `share_artifact` tool (offer-only, never auto-shares).

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (internal dev-workflow skill)
