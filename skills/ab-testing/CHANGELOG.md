# Changelog — luckiest-ab-testing

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from ab-testing (marketingskills, MIT).

### Improve pass (/refract)
- Added Sample Ratio Mismatch (SRM) as a mandatory Step 0 data-quality check before reading any metric, plus a dedicated SRM section in the sample-size guide and a results-template row. SRM was a genuine gap: the source covered peeking thoroughly but had no data-integrity guardrail.
- Added a low-traffic default: when the sample-size math exceeds ~60 days, steer to Bayesian/sequential/CUPED/qualitative instead of grinding a fixed-horizon test.
- Added trigger phrases: "sample ratio mismatch," "SRM," "my test results look weird," "why is my split uneven," "Bayesian A/B test." Added eval #8 covering the SRM edge case.

### Network hook
- Share-with-tribe: after a winning test's playbook entry is written, the skill OFFERS to surface the sanitized winning pattern to the user's Luckiest tribe (never auto-posts; excludes raw traffic data, customer records, and any credentials/tokens).

### Trend pass (/newsjack + /luckiest-trends)
- Sample Ratio Mismatch prevalence ~6-10% of A/B tests; check-before-metrics is the standard guardrail — VWO "20 Best Practices for A/B Testing in Enterprise for 2026" (vwo.com); Kameleoon; Microsoft Research "Diagnosing Sample Ratio Mismatch" — 2026-07-01.
- CUPED variance reduction (Microsoft) can tighten confidence intervals without more traffic (~equivalent to +20% traffic for one team); added to the low-traffic options — KDnuggets "A/B Testing Pitfalls"; GrowthBook — 2026-07-01.
- Sequential testing with anytime-valid confidence sequences (Netflix approach) noted as the modern basis for early stopping — 2026-07-01.
- Note: /luckiest-trends requires a full multi-source setup wizard outside this task's timebox; signal above was gathered via host web search and is dated/attributed.
