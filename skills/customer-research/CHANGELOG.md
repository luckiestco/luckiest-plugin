# Changelog — luckiest-customer-research

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from customer-research (marketingskills, MIT).

### Improve pass (/refract)
- Added a silent-majority / survivorship caveat to the Mode 1 guardrails: every source in this skill over-samples people who chose to speak, so vocal signal is a hypothesis about the silent majority, not proof.
- Added an authenticity check for AI-generated, incentivized, and astroturfed reviews/comments before treating a batch as voice-of-customer, with tells to scan for and instruction to down-weight rather than silently average.
- Added personal-data de-identification guidance: strip usernames, employer names, and identifying details when a quote or profile signal leaves the research doc (persona, quote bank, shared brief, copy).
- Dropped candidates that were novelty-for-novelty (extra scoring rubrics, new persona templates, added frameworks) — the original already covers those.

### Network hook
- Share-with-tribe (offer, never auto-post): after delivering a synthesis, quote bank, or persona, offer to surface findings to the user's Luckiest tribe so others researching the same ICP can build on it. De-identifies first; declines and private/sensitive customer data suppress the offer. No credentials referenced.

### Trend pass (/newsjack + /luckiest-trends)
- The /luckiest-trends live engine requires Python 3.12+ and social/API setup not available in this non-interactive environment; no live social signal was pulled — no fabrication.
- One actionable, verifiable signal informed the AI-content authenticity check: the U.S. FTC final rule banning fake and AI-generated consumer reviews and testimonials (effective 2024-10-21; source: FTC, "Rule on the Use of Consumer Reviews and Testimonials," ftc.gov). This makes screening AI/incentivized reviews a current, on-domain default rather than a speculative one.
