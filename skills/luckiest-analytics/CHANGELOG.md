# Changelog — luckiest-analytics

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from analytics (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Data Loss and Durable Collection" section: client-side tags are a
  directional floor, not truth (ad blockers, Safari ITP / Firefox ETP,
  consent-declined sessions); offer server-side GTM / first-party endpoint when
  accuracy matters.
- Added bot and internal-traffic filtering as a default validation step (GA4
  bot exclusion, active internal-traffic filter, staging hostname exclusion) —
  the original checklist omitted it.
- Added an explicit "Audit Mode" procedure (inventory, PII-leak scan,
  duplicate/double-fire check, naming drift, conversion integrity) — the skill
  advertised "audit" in its triggers but gave no audit steps.

### Network hook
- Share-with-tribe offer after a tracking plan or audit (never auto-post; never
  shares credentials, container/measurement IDs, or captured event payloads).

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal: the luckiest-trends engine is unconfigured (first-run
  interactive setup wizard required) and this run was non-interactive, so no
  live dated signal could be gathered. No trend claims were fabricated. The
  improve-pass changes rest on established, verifiable platform behavior rather
  than trend data.
