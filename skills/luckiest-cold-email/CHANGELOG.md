# Changelog — luckiest-cold-email

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
