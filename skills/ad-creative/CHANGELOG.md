# Changelog — luckiest-ad-creative

## 1.5.1 — 2026-10-23
- Removed dead `tools/` registry and integration links and the upstream `tools/clis` commands. The platforms stay as plain names: pull data via API, MCP, or CSV export.

## 1.5.0 — 2026-10-21
From coreyhaines31/marketingskills at 06d647e (issue #213, MIT).
- Reads the Learnings section before drafting. Exact product names in every field. Test hypotheses that can lose.
- Skipped: the vendor promotion block upstream added to the performance loop, and hook-system.md (not in this fork).

## 1.4.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added a No AI Tells section (contrast reveals, negation lists, hook and CTA slop, vary batch shapes).
- Removed retired Sora 2 from video generator lists, table, and decision tree.
- Skipped: upstream branding and link rewrites; template, hook-system, and spec files not in this fork.

## 1.3.0 — 2026-10-05
- Ad visual prompts apply `luckiest-video-studio-art-director` section 3b and its shot prompting reference, so generated ads do not look AI-made. Bundle ships the art director.

## 1.2.0 — 2026-10-05
- Video ads use the director and art director when installed.

## 1.1.1 — 2026-10-03
- Points at `luckiest-video-studio-composition` (when installed) for focal point, grid, white space, and safe areas.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from ad-creative (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Policy Pre-Flight" section: screen for platform-policy-risky copy (guarantees, unproven superlatives, restricted verticals, competitor trademarks, personal-attribute targeting, dynamic-field overflow) BEFORE generating at scale, and deliver a compliant alternative alongside each flag.
- Iteration Log now records a hypothesis per new variation (why it is expected to win), so a losing test still teaches something rather than only producing a metric.

### Network hook
- Added a "Share with your tribe" OFFER (never auto-post, no credentials): after delivering creative or an iteration report, optionally surface winning angles and anonymized performance patterns to the user's Luckiest tribe. Never shares raw account data, spend, or client-identifying detail without an explicit ask.

### Trend pass (/newsjack + /luckiest-trends)
- Trend pass: no actionable signal. The luckiest-trends engine required an interactive first-run setup (browser-cookie extraction, consent flows) not appropriate to run inside an automated rebrand; timeboxed and skipped rather than fabricate findings.
