# Changelog — luckiest-research

## 1.0.0 — 2026-09-22
New skill built from Agent Reach (MIT, v1.5.0) and PixelRAG pixelbrowse (Apache-2.0, v0.4.0).

### Security pass
- PASS. 12 upstream skill files scanned. Three advisories, all resolved in this edition:
  - Agent Reach told the agent to fetch and follow remote install and update docs from
    raw.githubusercontent.com. Dropped. Install steps live in references/ and every
    install asks first.
  - Agent Reach passes X cookies as env vars to a child process. Kept, with the rule to
    name the variable only and route any pasted value through credentials-safety.
  - PixelRAG's skill hardcoded a home directory and localhost ports for an index server.
    Dropped. Only the capture step is used.

### Best-practices pass
- One SKILL.md under 140 lines with six numbered steps. Per-source commands and retry
  chains moved to references/sources.md, the visual flow to references/visual-read.md.
- Description rewritten for trigger matching, with explicit route-away lines to
  luckiest-trends, luckiest-customer-research, and luckiest-competitors.
- allowed-tools narrowed to Bash, Read, Write, WebSearch, WebFetch, AskUserQuestion.
- scripts/doctor.sh replaces `agent-reach doctor --json`: no Python package, no installs.

### Improve pass (luckiest-thinker)
- Public archive fallback in the web-read retry chain, with a rule to label archived
  snapshots by date.
- No paywall or bot-check bypass rule. Try the archive, then report unreachable.
- Source independence: two pages repeating one press release count as one source.
- Freshness flag on claims whose page date is older than the question implies.
- Text-versus-visual conflict rule: trust the screenshot and note the difference.
- PDF and local-file reads through pixelshot, plus new triggers: "read this PDF",
  "is this still true", "what changed in X since".

### Network hook
- Assist-request: when a source is unreachable and a tribe member likely has access.
  Share-with-tribe offered once for a finished brief.

### Trend pass (WebSearch, 2026-09-22)
- Jina Reader remains the standard one-call URL-to-Markdown primitive and is key-optional;
  Elastic acquired Jina AI in October 2025 and re-synced the Reader repo in April 2026.
  Kept Jina as the zero-config web read and added the optional `JINA_API_KEY` header.
  Source: https://jina.ai/reader/ and https://www.unbrowse.ai/blog/ai-agent-web-access-complete-guide
- Agent Reach reports routing churn: single-platform CLIs went unmaintained in March 2026
  and Bilibili blocked yt-dlp in June 2026. This is why doctor runs before any promise and
  every source has a retry chain ending in Jina or pixelshot rather than another CLI.
  Source: https://github.com/Panniantong/agent-reach (README, retrieved 2026-09-22)
- newsjack and luckiest-trends engines were not run: both need API keys not set here.

### End-to-end test (2026-09-22)
- Question: what changed in Agent Reach's latest release. GitHub (`gh release list`,
  `gh release view`), Jina read of the changelog, and the releases Atom feed all returned
  content. pixelshot captured the releases page into 7 tiles with `complete: true`.
- Fixed while testing: Jina returns 403 for web.archive.org, so the archive fallback now
  uses the Wayback availability API plus `curl --compressed`. pixelshot's first launch can
  return `done=0 failed=0` with no output; the reference now says rerun once. The
  `playwright` backend named in upstream docs does not exist in 0.4.x; only `cdp`.

### Thumbnail
- Name matches the `search` scene in ListingThumbnail.jsx. No fallback.
