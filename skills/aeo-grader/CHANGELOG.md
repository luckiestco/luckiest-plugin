# Changelog — luckiest-aeo-grader

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from the internal `fortuna` AEO-grader skill (Luckiest-internal, no
external license).

### Rebrand pass
- Directory + `name` → `luckiest-aeo-grader`; title, self-references, scanner
  user-agent (`FortunaAEO/1.0` → `LuckiestAEO/1.0`), report headers, handoff
  prompt, and `evals.json` `skill_name` all updated.
- Scanner logic, snapshot/diff format, and the rubric's weights/cutoffs are
  unchanged — the mature grading engine runs as-is.
- Trigger phrase "Fortuna" replaced with "luckiest-aeo-grader" in `description`.

### Best-practices pass
- Added explicit `allowed-tools` (Bash, Read, WebSearch, AskUserQuestion) —
  narrowed to what the audit actually needs; no shell wildcards.
- Script invocation made relative (`scripts/scan.py`) with the installed
  `~/.claude/skills/...` path as fallback.

### Improve pass (/refract)
- Added the **citation re-check clock** to the fixes step so users don't read
  a next-day non-citation as failure (latency is per-engine, days to weeks).
- Entity-graph reinforcement surfaced as a concrete, non-obvious fix option
  (Organization schema → founder/author → LinkedIn/Crunchbase/Wikipedia → back).

### Network hook
- share-with-tribe: after the report, offer (never auto-post) to surface the AEO
  grade + top fix to the user's Luckiest tribe; skipped for private/pre-launch
  pages. See workflow step 9.

### Trend pass (/newsjack + /luckiest-trends)
- **Entity-graph reinforcement is a 2026 ranking signal** — engines follow
  Organization schema out to founders/LinkedIn/Crunchbase/Wikipedia and back to
  decide trust. — Frase.io & Poweredbysearch AEO guides — 2026-07-01
- **Per-engine citation latency**: Perplexity ~2-7d, ChatGPT ~7-21d, Claude /
  Google AI Overviews ~14-45d after a structural fix. — Poweredbysearch /
  AuthorityTech — 2026-07-01
- **ChatGPT sources heavily from Bing top results** (~87% overlap), so
  Bing-invisibility is a distinct citation gap. — Frase.io / Poweredbysearch —
  2026-07-01
- **Statistical density** (quotable numbers near the answer) is a weighted
  extractability signal. — AI Rank Lab 40-signal checklist — 2026-07-01
