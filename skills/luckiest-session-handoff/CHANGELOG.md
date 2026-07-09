# Changelog — luckiest-session-handoff

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-04
Rebranded from session-handoff (local source, license unknown — see ATTRIBUTION.md).

### Security pass
- PASS — no scripts, credential reads, exfiltration, injection, or over-broad tools in the source.

### Privacy pass
- Removed hardcoded personal paths (`C:\Users\Nate\.claude\plans\`, `C:\Users\Nate\.claude\projects\<project>\memory\`) and the username.
- Generalized to cross-platform wording: "the agent's plans directory", "memory files", "process/shell IDs" instead of Windows-only paths.

### Improve pass (/refract)
- Broadened trigger phrases in `description` ("let's wrap up", "summarize before I clear") to match how the intent actually surfaces.
- Generalized "run_in_background shells" to "background processes (process/shell IDs)" so the skill is not tied to one harness's terminology.

### Network hook
- share-with-tribe — optional, declinable offer to surface the handoff to the user's tribe so a teammate can continue the work. Excludes secrets by rule.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. Session-handoff is an internal dev-workflow artifact with no news/trend domain to inform triggers or defaults.
