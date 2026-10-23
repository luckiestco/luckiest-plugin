# Changelog — luckiest-trends

## 1.2.1 — 2026-10-21
Upstream mvanhorn/last30days-skill 13a6cc5 (#217), 14 fixes.
- The engine footer is a fenced `text` block. Relay it with the fence so Markdown keeps its `---` lines.
- `--search` sources you name are kept. `--as-of` end dates are honored by YouTube, arXiv, Bluesky, and dev.to.
- Reddit, GitHub person mode, Digg, and Hacker News comment order fixes. xAI default model follows upstream.
- Not ported: the yt-dlp proxy env vars (held, see the deferred issue).

## 1.2.0 — 2026-10-16
Engine resync to upstream mvanhorn/last30days-skill 3.28.0 at 50998cd (MIT). Our engine was an older snapshot than the 5103ba4 pin, so this brings in everything up to 3.28.0, not only the 87 commits in #179.

### Security fixes from upstream
- Credentials are stripped from direct-request redirects.
- The hosted API must be https, and local state files are owner-only.
- Provider endpoint overrides and loopback proxy routing are guarded.
- Browser cookie discovery needs durable consent, cookie pairs must be complete, and denied cookie access is reported.
- X research via Grok runs behind an audited tool boundary.

### New in the engine
- Sources: dev.to (keyless, opt-in), Stocktwits, Amazon, Meta ad library and Telegram (via ScrapeCreators), Dripstack, a local document corpus, Bright Data pipelines (only with its CLI installed), and the official X API (`X_BEARER_TOKEN`).
- Extra X cookie lookups on Linux and Mac mini hosts only (agentcookie CLI, or live Chrome over a debugging port with consent). A plain MacBook never runs them.
- `doctor`, research library, watchlist spend accounting, freshness checks, and many ranking, date-window and reporting fixes.

### Skill
- `references/` now carries upstream's per-stage instruction files; `engine-contract.md` is the 3.28.0 contract.
- "What this skill can access" updated for the new cookie paths, local files, and CLIs, with current code lines.
- Brand strings in the badge, report titles and HTML strip rule reapplied. Dropped `scripts/lib/reddit_rss.py` (removed upstream, unused).

## 1.1.1 — 2026-10-10
- Security disclosure: new "What this skill can access" section listing browser cookies (opt-in, off by default), Keychain (only `last30days-*` items), API key sources, network, and installs, each with the code line that enforces it. No behavior change. SkillSpector rates this CAUTION (needed and disclosed), not a defect.

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
