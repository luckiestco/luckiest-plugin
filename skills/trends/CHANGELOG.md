# Changelog — luckiest-trends

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration + rebrand completion.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

### Rebrand completion
- `agents/openai.yaml`: `display_name` "Last 30 Days" → "Luckiest Trends";
  `short_description` and `default_prompt` rebranded to reference the full
  source set (Reddit, X, YouTube, TikTok, HN, Polymarket, GitHub, web) and
  the configurable time window.
- `references/save-html-brief.md`: added brand note distinguishing user-facing
  `luckiest-trends` text from unchanged technical identifiers; fixed 5 stale
  `last30days` references in badge text, command examples, and the renderer
  strip-list.

### Security
- No new findings. Prior 1.0.0 pass remains valid (local-only cookie
  extraction, https-only webhooks, no prompt-injection vectors).

## 1.0.0 — 2026-07-01
Rebranded from **last30days** (last30days-skill by mvanhorn, MIT).

### Security pass (Pass 1)
- PASS — scanned all 104 source files. Browser-cookie extraction
  (`cookie_extract.py`, `chrome_cookies.py`, `safari_cookies.py`) is local
  only, writes 0600 temp copies, and is used solely to authenticate the
  skill's own X/Twitter scraping - not exfiltrated. Keychain/`pass` setup
  scripts store secrets locally. `html_publish` and the `watchlist` webhook
  both require `https` and match Slack by exact hostname (a prior SSRF was
  already fixed upstream). No pipe-to-shell, no `eval` of remote content, no
  prompt-injection prose, no over-broad tools. Nothing to strip.

### Best-practices pass (Pass 2)
- Distilled the 2040-line `SKILL.md` into a lean ~230-line contract: the nine
  output LAWs, the six invocation steps, and the time-window feature.
- Preserved the full original contract verbatim at
  `references/engine-contract.md` (its regression war-stories are load-bearing
  enforcement anchors) with a brand note at the top. Nothing was lost.
- Rewrote the `description` for trigger-matching and added an
  `argument-hint` showing `--days`.

### Improve pass (Pass 3, /refract)
- **Time window is now a first-class, discoverable feature.** The engine
  already threaded a configurable `lookback_days` (default 30) end-to-end via
  `get_date_range` → per-source `since:`/`until:` bounds → recency scoring;
  the `--days`/`--lookback-days` CLI flag existed but was buried at line ~1341
  and never surfaced to the model. The lean `SKILL.md` now documents it up
  front, adds natural-language → `--days` mapping ("this week" → 7, "this
  quarter" → 90), a `1..180` clamp, and an honest note that social sources
  thin out past ~90 days. No engine code change was needed - verified the two
  hardcoded `timedelta(days=30)` sites (`bird_x.probe_works`,
  `xquik.probe_works`) are throwaway auth health-checks, not the search
  window, so they correctly stay fixed.
- Rebranded the engine-emitted badge and Markdown titles to `luckiest-trends`
  (`render.py`, `html_render.py`) so passed-through output carries the brand.

### Network hook (Pass 3)
- share-with-tribe — after delivering the report, the skill offers (never
  auto-posts) to surface the saved brief to the user's Luckiest tribe so
  members researching the same topic can see it. Declinable; suppressed for
  private-by-nature topics.

### Trend pass (Pass 4, /newsjack + /lastXdays)
- No actionable signal recorded. This session was non-interactive and the
  live news/social connectors were not authorized, so no dated external signal
  could be verified. The domain improvement this release needed (a
  user-chosen window) came from the source code, not a news hook; nothing was
  fabricated to fill the pass.

### Rebrand pass (Pass 5)
- Directory + `name` → `luckiest-trends`; command, badge, and self-references
  rebranded. Technical identifiers (`scripts/last30days.py`, `LAST30DAYS_*`,
  `~/.config/last30days/`) kept intact so the engine runs unchanged.
- `ATTRIBUTION.md` added with the verbatim MIT license and original credit.

### Version pass (Pass 6)
- `metadata.version: 1.0.0`, `metadata.listing_id: luckiest-trends`, and a
  top-level `version:` line (read by the engine badge). Added the
  `check_updates` staying-current instruction matching the Luckiest MCP
  contract (`listingId` + `installedSemver`).
