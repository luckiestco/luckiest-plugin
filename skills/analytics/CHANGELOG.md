# Changelog — luckiest-analytics

## 1.2.1 — 2026-10-23
- Removed dead `tools/` registry and integration links. The tool table keeps names, use cases, and MCP availability.

## 1.2.0 — 2026-10-21
From coreyhaines31/marketingskills at 06d647e (issue #213, MIT).
- Compute, don't eyeball; match observation windows; recommend against the stated goal.
- UTM rules rewritten (hyphens, one spelling per source, no personal data, test the final URL), UTM patterns by partner type, and traffic from AI assistants.

## 1.1.1 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Keep provider-defined event names. GA4 enhanced-measurement names corrected (`click`, `view_search_results`, `video_start` / `video_progress` / `video_complete`).
- GTM price variable reads a machine-readable `data-price`, never display text (`parseFloat("$1,234.56")` returned 1).

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
