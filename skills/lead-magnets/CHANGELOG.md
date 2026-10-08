# Changelog — luckiest-lead-magnets

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from lead-magnets (marketingskills, MIT).

### Improve pass (/refract)
- Added Lead Magnet Principle #6 "Give Something an AI Chat Cannot" — steers away from static PDF magnets that are now commoditized by AI assistants and toward proprietary data, personalization, templates, and access-based offers.
- Elevated the nurture-sequence check into "Before Planning" as an explicit prerequisite gate (a magnet with no downstream sequence collects addresses, not customers), reinforced by the eval suite's repeated focus on nurture handoff.

### Network hook
- Added an optional, opt-in "Luckiest Network" offer: after a plan is complete, offer to share an anonymized winning-format/buyer-stage summary so other members can pick up where this left off. Never auto-posts, requires explicit confirmation, excludes credentials and private data.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable dated news signal available (no client profile / live newsjack CLI run in this environment). General on-domain signal (AI answer engines eroding the value of static gated PDFs, shift toward interactive and personalized magnets) was folded into Principle #6 as durable guidance rather than a dated hook.
