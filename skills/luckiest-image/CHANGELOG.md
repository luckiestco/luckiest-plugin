# Changelog — luckiest-image

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-01
Rebranded from image (marketingskills, MIT).

### Improve pass (/refract)
- Added "Dimensions: generate to ratio, crop to exact pixels" guidance — AI generators honor aspect ratios, not exact pixel specs; the original repeatedly said "always specify dimensions" without warning that output rarely matches the literal pixel count. Added as a workflow step and as Common Mistake #9.
- Added "AI Content Provenance & Disclosure" section — covers C2PA / Content Credentials metadata (and that strip-metadata optimization commands remove it) plus platform AI-content labeling requirements. A real edge case the original missed for published/ad/app-store assets.

### Network hook
- Added one "Share with your tribe" hook (share-with-tribe pattern) as an explicit OFFER only, never auto-post. Shares a finished asset plus the prompt/style settings that worked with the user's Luckiest tribe. Excludes brand-confidential/NDA assets; includes no credentials.

### Trend pass (/newsjack + /luckiest-trends)
- No actionable signal. The /luckiest-trends engine requires an interactive first-run setup wizard (browser cookie extraction, yt-dlp install, ScrapeCreators signup) that cannot run in this non-interactive session, so no dated/sourced live signal was obtained. Per skill rules, nothing was fabricated to fill the pass. The provenance/disclosure improvement above is grounded in established, pre-existing domain knowledge and is recorded under the improve pass, not claimed as fresh trend signal.
