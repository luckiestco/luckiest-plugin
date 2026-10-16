# Changelog — luckiest-cold-email

## 1.3.0 — 2026-10-16
From coreyhaines31/marketingskills at 1efedbc (issue #174, MIT).

- New references: deliverability, LinkedIn outreach, multichannel cadence, outbound plays, reply handling. Sending setup (secondary domains, list verification, tracking off) folded into Deliverability; reply classification folded into Handling the Reply; new Beyond Email section.
- Benchmarks: vendor-sourced ranges, reply rate ~3.4% average, drop open rate as a metric; personalization with AI section.
- Two new evals. Skipped upstream's tools-registry table.

## 1.2.0 — 2026-10-08
Upstream sync with coreyhaines31/marketingskills dda3841 (issue #112).

- Added an AI-tells list to the avoid list (contrast reveals, negation lists, self-answered questions, stock phrases, em dashes) and to the human-sounding gut-check; description now mentions it.
- Replaced em dashes in prose and example emails in SKILL.md, frameworks.md, follow-up-sequences.md, and personalization.md.
- Skipped: evals and upstream version line.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from cold-email (marketingskills, MIT).

### Improve pass (/refract)
- Added a "Handling the Reply" section — objection/response guidance for "not interested," "send info," "who are you," "bad timing," and positive signals. The source skill stopped at getting the reply.
- Added a "Deliverability" section — plain-text sending, link minimization, spam-trigger phrasing, and domain warmup. Great copy that lands in spam gets zero replies.
- Added a "Compliance" section — CAN-SPAM and GDPR/PECR guardrails for outbound (identify yourself, physical address, lawful basis, honor opt-outs).

### Network hook
- One OFFER-only "Share with your tribe" section. Never auto-posts, never touches credentials; offers to share a finished draft/playbook with the Luckiest tribe and stops on decline.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The luckiest-trends engine requires an interactive first-run setup (browser-cookie extraction and tool installs) that is unavailable in this non-interactive session, and its config store is out of scope to probe. No trend data was fabricated.
