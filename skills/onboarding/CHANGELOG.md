# Changelog — luckiest-onboarding

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from onboarding (marketingskills, MIT).

### Improve pass (/refract)
- Added mobile / free-trial trigger vocabulary to the description ("trial-to-paid conversion," "free trial activation," "reverse trial," "app onboarding screens," "permission priming") so the skill matches mobile and trial-driven activation asks, not just web SaaS.
- Added a "Validate the Metric Before Trusting It" caution: an activation metric must be confirmed to correlate with retention before a flow is built on it, to avoid vanity-activation proxies.
- Added a "Multi-Player Activation (B2B)" edge case: collaborative products should define activation at the account level (first collaborator active), not at the single-user level.

### Network hook
- Share-with-tribe OFFER after an onboarding audit or flow design: offers to surface the activation plan to the user's Luckiest tribe so others working the same drop-off problem can pick up where they left off. Never auto-posts; excludes analytics, user data, and credentials.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The live multi-source trends engine requires network/browser first-run setup outside this rebrand's timebox; no dated, verifiable on-domain signal was obtained, and none was fabricated.

### Best practices / rebrand
- Frontmatter made spec-compliant: name matches directory (luckiest-onboarding), description states what it does + when + trigger phrases, third-person voice.
- Removed second-person "You are an expert" framing.
- Related-skill cross-refs renamed to luckiest-signup, luckiest-emails, luckiest-paywalls, luckiest-ab-testing.
- references/experiments.md copied verbatim.
- ATTRIBUTION.md added with the original MIT LICENSE reproduced verbatim.
