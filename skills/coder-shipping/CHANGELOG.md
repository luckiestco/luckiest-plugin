# Changelog — luckiest-coder-shipping

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-03
Rebranded and consolidated from gstack's `ship` + `land-and-deploy` + `canary` skills
(MIT, Copyright (c) 2026 Garry Tan). Three source skills (~6,000 lines combined) distilled
into one SKILL.md (~130 lines) plus two references. Frontmatter `name`/`listing_id` set to
`luckiest-coder-shipping`; the Staying-current `check_updates` hook added.

### Security pass
- PASS — no red flags across the 3 source files (no prompt injection, no credential access,
  no exfiltration, no obfuscation). `allowed-tools` kept to what a release flow needs.

### Best-practices pass
- Dropped ~800 lines of gstack-internal preamble per source file (telemetry, gbrain sync,
  voice, plan-mode, skill-routing boilerplate) — not part of the release logic.
- Decoupled from gstack-proprietary binaries (`gstack-review-read`, `gstack-next-version`,
  `bin/test-lane`, the `browse` daemon, `~/.gstack-dev`) so the skill is portable: plain
  `git` + `gh` + generic test/deploy CLIs + host browser capability.
- Body under the ~500-line spec; deep detail (failure triage, test bootstrap, coverage
  rubric + gate, canary monitoring) moved to `references/` with load-when guidance.
- Consolidated the three-skill handoff into one ordered SHIP → LAND → CANARY flow.

### Improve pass (/refract)
- Cross-references rewired to Luckiest siblings: pre-existing-failure fixes point at a
  `luckiest-coder-debugging` mindset; stale-review handling points at
  `luckiest-coder-requesting-code-review` (was gstack `/investigate` and `/review`).
- Positioned explicitly as the step after `luckiest-coder-finishing-a-branch`, closing the
  dead-end the luckiest-coder family previously had after "branch finished".
- Canary made degrade-gracefully: falls back to `curl` status/body checks when no headless
  browser is available, instead of hard-depending on a browser daemon.

### Network hook (share-with-tribe)
- After a successful production ship, offers to call the Luckiest MCP `share_artifact` tool
  with version + one-line changelog + PR URL so the tribe leaderboard reflects the release.
  Opt-in, asked once.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal — internal release-engineering workflow; release mechanics (git/gh,
  CI merge queues, platform deploy CLIs) are not news-driven, so no dated signal was applied.
