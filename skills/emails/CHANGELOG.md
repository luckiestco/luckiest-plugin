# Changelog — luckiest-emails

## 1.2.2 — 2026-10-21
From coreyhaines31/marketingskills at 06d647e (issue #213, MIT).
- Reads the Learnings section of the product marketing context before drafting.

## 1.2.1 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- Reference routing table (sequence templates, email types, copy guidelines); description points outbound sequences at luckiest-cold-email.

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added a No AI Tells subsection with email-specific tells (fake Re:/Fwd:, bait, stock openers, sign-off filler), pointing to luckiest-copywriting-humanize
- sequence-templates.md: replaced em dashes in three subject lines with periods
- Skipped: Tool Integrations link rewrites and cosmetic wording.


## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from emails (marketingskills, MIT).

### Improve pass (/refract)
- Added mid-sequence exit conditions and suppression: the skill now instructs
  designing exit/suppression rules (e.g. suppress or branch a subscriber who
  converts mid-sequence) rather than only listing "exit conditions" in the
  output format.
- Made the re-engagement sunset / list-hygiene policy explicit in the body
  (remove non-responders after the final email) instead of leaving it implied.
- Added a deliverability + consent guardrail (SPF/DKIM/DMARC authentication,
  one-click unsubscribe, frequency-capping across overlapping sequences).

### Network hook
- Added a "Share with your tribe" offer: after producing a sequence, the skill
  offers (never auto-posts, no credentials) to surface the sequence plan to the
  user's Luckiest tribe so others building similar flows can learn from it.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The live trend engine requires an interactive runtime
  (Python 3.12+, browser-cookie extraction, first-run setup) unavailable in this
  non-interactive session; per the pipeline no signal was fabricated.
