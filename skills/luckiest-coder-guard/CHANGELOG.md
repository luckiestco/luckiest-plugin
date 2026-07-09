# Changelog — luckiest-coder-guard

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded and consolidated from gstack's `careful` + `freeze` + `guard` + `unfreeze` skills
(MIT, Copyright (c) 2026 Garry Tan) into one hook-driven safety skill. Frontmatter
`name`/`listing_id` set to `luckiest-coder-guard`; Staying-current `check_updates` hook added.

### Security pass
- PASS — the two hook scripts read stdin JSON and emit permission decisions only; no
  credential access, no network calls, no obfuscation. The sole side effect in the originals
  was a local-only analytics append, which was removed.

### Best-practices pass
- Four source skills collapsed into one. This exploits the fact that the freeze hook is a
  no-op when no boundary file exists: "careful" is just the skill active with no boundary,
  "freeze"/"guard" set a boundary, "unfreeze" clears it — one skill, four behaviors, no
  cross-skill hook-path dependency (gstack's `guard` reached into sibling `../careful/bin`
  and `../freeze/bin`; this skill owns both scripts).
- Removed the gstack analytics/telemetry writes to `~/.gstack/analytics/skill-usage.jsonl`
  from both scripts and the skill body.
- Rebranded hook state root from `~/.gstack` to `~/.luckiest` (still honors
  `CLAUDE_PLUGIN_DATA`); warning/deny message prefix changed to `[guard]`.
- Added an honest "Limits" section (not a security boundary; Bash can still write outside the
  freeze dir; session-scoped; symlink-resolution edge) — the original scattered these caveats.

### Improve pass (/refract)
- Boundary-set step now hard-fails if the path does not resolve to an existing directory,
  instead of silently writing an empty/garbage boundary.

### Verification
- Smoke-tested the scripts: destructive commands warn (`rm -rf /var/data`, `git push -f`),
  safe/build-artifact deletes allow (`rm -rf node_modules`, `ls`), no-boundary allows all
  edits, a set boundary allows edits inside (including new files) and denies edits outside.

### Network hook
- N/A — a guardrail skill emits no shareable artifact.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal — safety-guardrail tooling is not news-driven.
