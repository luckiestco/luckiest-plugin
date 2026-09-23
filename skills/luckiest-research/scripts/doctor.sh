#!/usr/bin/env bash
# luckiest-research doctor: which sources are live on this machine. Read-only, no installs.
# ponytail: prints a flat list, no JSON. Add --json if a caller ever needs to parse it.
has() { command -v "$1" >/dev/null 2>&1; }
row() { printf '%-12s %s\n' "$1" "$2"; }

has curl && row "web-read" "live (curl r.jina.ai)" || row "web-read" "missing curl"
if has mcporter; then row "web-search" "live (mcporter exa)"; else row "web-search" "host WebSearch tool only (mcporter missing)"; fi
has gh && row "github" "live" || row "github" "missing gh"
has yt-dlp && row "youtube" "live" || row "youtube" "missing yt-dlp"
python3 -c 'import feedparser' 2>/dev/null && row "rss" "live (feedparser)" || row "rss" "live (curl, raw XML)"
if has twitter; then
  [ -n "$TWITTER_AUTH_TOKEN" ] && [ -n "$TWITTER_CT0" ] && row "x" "live" || row "x" "needs TWITTER_AUTH_TOKEN and TWITTER_CT0"
else row "x" "missing twitter-cli"; fi
has rdt && row "reddit" "live" || row "reddit" "missing rdt-cli"
has pixelshot && row "sight" "live (pixelshot)" || row "sight" "missing pixelshot (uv tool install pixelrag)"
