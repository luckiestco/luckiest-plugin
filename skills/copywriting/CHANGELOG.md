# Changelog — luckiest-copywriting

## 1.3.0 — 2026-10-21
From coreyhaines31/marketingskills at 06d647e (issue #213, MIT).
- Diagnose the situation first (blank, real voice, point edit), drafting protocol with the three-question gate, supportable claims with an unlock path.
- Reads the Learnings section before drafting. New real-voice eval.
- Skipped: references/ai-tells.md (luckiest-copywriting-humanize covers it).

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added a No AI Tells section (never-write list, keep-rare list, pre-delivery check) and an "Any AI tells?" quality-check bullet
- Reworded the rhetorical-questions guidance and flagged self-labelling questions as a tell
- copy-frameworks.md: added a starting-points note under Headline Formulas and removed the "Everything you need to {outcome}" formula
- natural-transitions.md: removed self-answered-question and throat-clearing transitions, tightened the moreover/furthermore and question-based notes
- Did not add upstream references/ai-tells.md: luckiest-copywriting-humanize already covers negative parallelism, rule of three, em dashes and AI vocabulary, so the skill points to it instead
- Skipped: em dash punctuation rewrites and the "Option A" format change.


## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from copywriting (marketingskills, MIT).

### Improve pass (/refract)
- Added an "Awareness Stage" section (Schwartz's five stages) with a table mapping how aware a visitor is to where the copy should start, plus guidance tying traffic source to likely stage. The source had page-type guidance but left message-to-awareness matching implicit.
- Added a "Proof Provenance" rule that operationalizes the source's one-line "don't fabricate stats": every concrete claim must be user-supplied or marked `[PLACEHOLDER — confirm]`, and missing proof is written as a labeled placeholder rather than invented.

### Network hook
- Added a "Share with your tribe" OFFER (never auto-post, no credentials): after delivering finished page copy, optionally surface the winning headline and angle to the user's Luckiest tribe so others working on the same page type can pick up where they left off. Shares only approved copy patterns and angles, never client names, unpublished offers, or private proof.

### Trend pass (/newsjack + /luckiest-trends)
- Trend pass: no actionable signal. The luckiest-trends engine required an interactive first-run setup (browser-cookie extraction, consent flows, tool installs) not appropriate to run inside an automated rebrand; timeboxed and skipped rather than fabricate findings.
