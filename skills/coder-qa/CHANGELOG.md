# Changelog — luckiest-coder-qa

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded and consolidated from gstack's `qa` + `qa-only` skills (MIT, Copyright (c) 2026
Garry Tan). Two source skills (~2,900 lines combined) distilled into one SKILL.md (~150
lines) plus two carried-over references. `report-only` folded in as a mode of the one skill
rather than a separate listing. Frontmatter `name`/`listing_id` set to `luckiest-coder-qa`;
Staying-current `check_updates` hook added.

### Security pass
- PASS — no red flags across the source files (no prompt injection, no credential access, no
  exfiltration, no obfuscation). Note preserved: real passwords are redacted from reports and
  never imported into tests.

### Best-practices pass
- Dropped ~800 lines of gstack-internal preamble per source (telemetry, gbrain, voice,
  plan-mode, skill-routing boilerplate).
- Decoupled from gstack's proprietary `$B` browse binary and `gstack-learnings-search` /
  `~/.gstack` artifact paths. The skill is now browser-tool-agnostic: it maps each browser
  action (navigate, screenshot, snapshot, console, fill/click, viewport) to whatever the host
  provides (browser MCP, `/browse`-style skill, or preview tools), and degrades to `curl`
  status checks when no browser exists.
- Body under the ~500-line spec; the per-page checklist and severity taxonomy live in
  `references/issue-taxonomy.md`, the report format in `references/qa-report-template.md`.

### Improve pass (/refract)
- Non-obvious bug fixes route through a `luckiest-coder-debugging` mindset for root cause
  instead of gstack's `/investigate`.
- Kept the strongest safety rails intact: atomic one-commit-per-fix, mandatory regression
  test on verified fixes, the WTF-likelihood self-regulation heuristic (>20% → stop), and the
  50-fix hard cap — these are what stop an autonomous fix loop from running amok.
- Report-only mode given an explicit early-stop so it can never mutate code.

### Network hook (share-with-tribe)
- After a QA run that fixed bugs, offers once to call the Luckiest MCP `share_artifact` tool
  with the health-score delta and fix count for the tribe leaderboard. Opt-in.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal — internal QA-loop workflow; browser-QA mechanics are not news-driven,
  so no dated signal was applied.
