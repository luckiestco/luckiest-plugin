# Changelog — luckiest-cro

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from cro (marketingskills, MIT).

### Improve pass (/refract)
- Added confidence labeling (High/Medium/Low) on each recommendation so users do not over-trust advice given on a page seen without analytics.
- Added optional ICE (Impact, Confidence, Ease) prioritization scoring to make the Quick Wins vs. High-Impact split defensible.

### Network hook
- "Pick up where the tribe left off" — after an audit, optionally offer (never auto-post, no credentials) to share the CRO audit with the user's Luckiest tribe so others working on the same page type can continue it.

### Trend pass (/newsjack + /luckiest-trends)
- Added an "AI-Referred Traffic Fit" analysis dimension: traffic from AI answer engines (ChatGPT, Perplexity, Claude, Gemini) arrives pre-briefed and converts far higher than organic (roughly 18% vs. ~1.76% for Google organic), but tolerates less top-of-funnel education and increasingly lands on the homepage. Source: Search Engine Land, "What 13 months of data reveals about LLM traffic, growth, and conversions" (https://searchengineland.com/what-13-months-of-data-reveals-about-llm-traffic-growth-and-conversions-470115); Contentsquare, "What Is AI-Referred Traffic? 2026 Benchmarks" (https://contentsquare.com/blog/ai-referred-traffic/) — retrieved 2026-07-01.
