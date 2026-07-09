# Changelog — luckiest-paywalls

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from paywalls (marketingskills, MIT).

### Improve pass (/refract)
- Added Platform Constraints (mobile) section: StoreKit / Play Billing in-app-purchase requirement, external-link entitlements caveat, store-required elements (price, terms, restore-purchases), and server-side entitlement grant. The source treated web and mobile identically.
- Added Reactivation and Price Changes trigger point: lapsed-user return flows and grandfathering/price-increase moments — real in-app upgrade moments the source omitted.
- Added funnel-instrumentation gate to Initial Assessment: verify impression → view → click → checkout → retention are tracked before recommending A/B tests.
- Told the agent when to load references/experiments.md (scoping an experiment roadmap) rather than only that it exists.

### Network hook
- Share-with-tribe OFFER after delivering a paywall design/plan: offers to surface the approach to the user's Luckiest tribe so others working on freemium conversion can pick up where they left off. Never auto-posts, never sends credentials, stops on decline.

### Trend pass (/newsjack + /luckiest-trends)
- no actionable signal (live multi-source engine requires Python/first-run setup not available in this run; timeboxed, nothing verifiable to record — no fabrication).
