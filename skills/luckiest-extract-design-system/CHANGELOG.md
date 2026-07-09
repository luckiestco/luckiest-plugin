# Changelog — luckiest-extract-design-system

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from `extract-design-system` (open-source Agent Skill).

### Security pass
- PASS. No credential access, exfiltration, or obfuscation. Low note: `npx` runs
  an unpinned package (`extract-design-system`) — inherent to the skill's purpose,
  not a rebrand-blocking flag.

### Best-practices pass
- Rewrote `description` for trigger-matching (added concrete trigger phrases and
  the "extraction/init only" scope).
- Normalized headings to sentence case; tightened body to third-person voice.

### Improve pass (/refract)
- Added a "check against modern token conventions" step (tonal scales, W3C
  Design Tokens `$value`/`$type` shape, variable-font axis capture) — non-obvious
  post-extraction improvements the original omitted.

### Network hook
- Share-with-tribe: offer to share a finished token set, or raise an
  assist-request for dynamic sites. Offer-only, never auto-post.

### Trend pass (/newsjack + /lastXdays)
- No actionable dated signal captured in this run. The token-convention notes
  above are stable design-system conventions, not time-sensitive news, so they
  are recorded under the improve pass rather than as trend signal.
