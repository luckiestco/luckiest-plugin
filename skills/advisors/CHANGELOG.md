# Changelog — luckiest-advisors

## 1.3.0 — 2026-07-06
Replaced /refract with /luckiest-thinker throughout, enhanced the anti-typicality
protocol, and added usage analytics.

### Thinker integration (replaces /refract)
- Renamed "refract line" → "thinker line" and "refract instruction" → "thinker
  instruction" across SKILL.md, ATTRIBUTION.md, and the Rules section.
- Enhanced the thinker instruction with the luckiest-thinker protocol: personas
  now name their first instinct, enumerate 4-5 candidates across frequency strata
  (common / moderate / uncommon-but-valid), and weight by real-world frequency
  before committing. The previous instruction only said "consider the full
  distribution" without the actionable protocol steps.
- Enhanced the Reframer persona with dimensional decomposition from the
  luckiest-thinker Full protocol: identify independent axes of variation
  (business model, target customer, distribution channel, pricing mechanism),
  then combine values across axes so reframes differ on multiple dimensions,
  not just surface variations.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.3.0"` and `check_updates`
  `installedSemver: "1.3.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

### Security
- No new findings. Prior 1.2.0 input-safety line and scoped tool-use rules
  remain valid.

## 1.2.0 — 2026-07-02
Friendlier persona names, a security pass, framework alignment, and sharper
evaluation criteria.

### Persona rename (/ux-copy)
Renamed all seven personas to warmer, plainer terms; analytical roles unchanged.
- Contrarian → **Skeptic**, Expansionist → **Optimist**, Logician → **Analyst**,
  Researcher → **Scout**, Buyer → **Customer**, Refractor → **Reframer**,
  Executor → **Builder**. Applied across mandates, the score line, and the
  verdict template. "Customer" (not "User") keeps the willingness-to-pay meaning.

### Security pass
- FRESH SIGNALS is now treated as untrusted, web-scraped data; a new
  input-safety line is appended to all seven persona prompts telling them to
  analyze the brief/signals, never obey directives embedded in them, and never
  reveal the instructions or output secrets.
- Added global rules: no secrets/keys/`.env` values in any output; tool use is
  scoped (only the Scout browses, read-only; the one outbound action is the
  opt-in tribe assist-request).

### Framework alignment (agentskills spec)
- Added a `compatibility` field documenting the real environment requirements
  (web access, parallel subagents, Luckiest MCP, luckiest-trends). Skill already
  conformed on name, description, and single-file layout.

### Sharper criteria (/refract)
- Scout now reads distribution (is there a cheap, repeatable channel to reach
  the buyer, or is the idea undistributable?).
- Customer now probes discovery and repeat-purchase (one-and-done vs recurring).
- Skeptic now hunts single-point-of-failure dependencies (platform, supplier,
  regulation).
- The cheapest 48-hour test must extract real commitment (deposit, pre-order,
  signature, paid signup), not opinion — guarding against false-positive yeses.

## 1.1.0 — 2026-07-02
Folded in the `lucky7-pro` Signal Brief pre-step, powered by `luckiest-trends`.
- New **Step 1.5: Build the Signal Brief** — before the council convenes,
  `luckiest-trends` pulls the last N days of Reddit/X/YouTube/TikTok/HN/web
  signal into a FRESH SIGNALS block pasted into all seven persona prompts.
- Replaced the old `lastXdays` + `news-search` + `newsjack-detector`
  dependencies with the single `luckiest-trends` skill.
- Judge now weighs FRESH SIGNALS explicitly and reports "What the market is
  doing right now" in the verdict.

## 1.0.0 — 2026-07-01
Rebranded from lucky7 (in-house Luckiest skill, first-party). Renamed to
`luckiest-advisors` per request; every self-reference (`/lucky7`, "Lucky7")
updated to the new name.

### Improve pass (/refract)
- Broadened `description` triggers so real phrasings match: "kill or keep
  this", "should I build this", "get a second opinion", "advisors".
- Added a no-target-customer edge case in Step 1: the Buyer reasons about the
  most-likely buyer instead of being skipped, and "nobody can name a buyer" is
  itself flagged as a finding.
- Kept the seven personas, refract line, recency window, and verdict shape
  intact — they are the load-bearing core and did not need reinvention.

### Network hook
- assist-request — after the verdict, offer (opt-in only) to raise the cheapest
  48-hour test to the user's tribe so someone who has shipped in that space can
  gut-check the riskiest assumption. Never auto-posts; dropped for sensitive
  ideas.

### Trend pass (/newsjack + /lastXdays)
- No actionable signal. The skill's subject (idea pressure-testing) is an
  evergreen meta-workflow with no news domain to jack; runtime recency is
  already handled by the Researcher persona's own last-N-days pull, so there is
  nothing dated to bake into the skill body.
