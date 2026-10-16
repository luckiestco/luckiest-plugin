# Changelog — luckiest-ai-seo

## 1.3.0 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Reference routing table for the six bundled references.
- Test queries spread across buyer awareness stages; findings turned into page fixes and a PR target list; Wikipedia and review-site presence asked up front.
- Related skills: luckiest-lead-magnets.

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Crawler guidance rewritten by purpose (search discovery, user retrieval, training, Google-Extended); fixed the mistake and pitfall that said blocking GPTBot kills citation; robots.txt example and checklist row updated.
- Critical stats rewritten with sources and dates plus a drift caveat; added the organic-rankings-still-matter sentence.
- Inauthentic-mentions rule extended (fake awards, owned review sites, FTC 2024 reviews rule); added consensus-profile and LinkedIn bullets and a prompt-tracking tip.
- platform-ranking-factors.md: softened AI Overviews and schema claims, updated Copilot and Claude sections.
- content-types.md: added Industry / Segment Pages.
- Added references/linkedin-ai-citations.md and references/positioning-and-consensus.md (curl check removed, links to files absent in this fork removed).
- Skipped: updates to agent-readiness, citations-vs-recommendations, format-volatility, youtube-ai-citations (not in this fork), evals, and registry link rewrites.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from ai-seo (marketingskills, MIT).

### Improve pass (/refract)
- Added `AGENTS.md` as a first-class machine-readable file (new trigger phrase + a short section alongside `llms.txt` and `/pricing.md`). The original mentioned it only in passing.
- Added an "Audit non-determinism" note: AI answers vary across sessions/regions/days, so priority queries should be checked 2-3 times and logged as a citation rate rather than a single yes/no.

### Network hook
- Share-with-tribe: after the AI Visibility Audit, the skill offers (never auto-posts) to surface the query set, citation findings, and gaps to the user's Luckiest tribe so others auditing the same competitors can pick up where they left off. No credentials or private analytics shared.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The newsjack CLI is not installed and no verifiable host web-search tool was available in this session, so no external signal could be confirmed. The source content is already dated to mid-2026 (Google OKF June 2026, Princeton GEO KDD 2024). No fabricated signal was added.
