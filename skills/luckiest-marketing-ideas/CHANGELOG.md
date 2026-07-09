# Changelog — luckiest-marketing-ideas

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from marketing-ideas (marketingskills, MIT).

### Improve pass (/refract)
- Added "Sequence, don't just list": present compounding ideas as an ordered
  start-here-then chain (e.g. ship a free tool before running ads to it) rather
  than a flat parallel list, so recommendations build momentum.
- Added "Name what to skip": after recommending, briefly flag 1-2
  tempting-but-wrong-fit ideas with a one-line "not now, and why" to protect the
  user's limited attention.

### Network hook
- "Pick up where the tribe left off": after delivering ideas, OFFER (never
  auto-post, no credentials) to surface the shortlist to the user's Luckiest
  tribe so others asking for ideas on a similar product/stage can continue from
  it instead of starting cold.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends engine requires first-run interactive
  setup (browser-cookie extraction, source API signup) that is not available in
  this non-interactive session; the pass was timeboxed and no signal was
  fabricated.
