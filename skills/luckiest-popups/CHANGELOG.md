# Changelog — luckiest-popups

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from popups (marketingskills, MIT).

### Improve pass (/refract)
- Added a hard mobile guardrail under Google Guidelines: never let a popup render before main content paints on mobile, since a blocking overlay both triggers Google's intrusive-interstitial penalty and harms Core Web Vitals (LCP and interaction responsiveness/INP). The source warned about intrusive interstitials generically but had no first-paint / Core Web Vitals rule.
- Strengthened the Accessibility section: return focus to the triggering element on close (genuine a11y gap beyond the existing focus-trap), plus explicit `role="dialog"` / `aria-modal="true"` / labelled-heading guidance.
- Added a consent-management (CMP) note under GDPR/Privacy: in consent-required regions, sequence the marketing popup behind the consent banner and wire opt-in state into the site's CMP rather than firing independently.
- Added trigger phrases "my popups are annoying people" and "intrusive interstitial," and eval #7 covering the mobile-first-paint / Core Web Vitals edge case.

### Network hook
- Share-with-tribe: after a popup pattern proves itself (variant beats control, or complaints drop while conversion holds), the skill OFFERS to surface the sanitized winning pattern to the user's Luckiest tribe. Never auto-posts; strips raw traffic numbers, customer records, email addresses, discount codes, and anything resembling a credential or token.

### Trend pass (/newsjack + /luckiest-trends)
- Google's mobile intrusive-interstitial guidance remains an active ranking signal and interacts with Core Web Vitals; INP replaced FID as a Core Web Vital in March 2024, making blocking overlays a measurable responsiveness cost — Google Search Central "Intrusive interstitials and dialogs" + web.dev "INP" — 2026-07-01.
- EEA/UK consent-mode expectations (Google Consent Mode v2, enforced 2024) reinforce sequencing marketing popups behind the consent banner and wiring opt-in into a CMP — Google "Consent Mode v2" — 2026-07-01.
- Note: /luckiest-trends requires a full multi-source setup wizard outside this task's timebox; the signals above were gathered via host web knowledge and are dated/attributed. No fabricated live-feed data.
