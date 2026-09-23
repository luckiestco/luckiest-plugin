# Sources: commands and retry chains

All commands are read-only. Replace `<URL>` and `<query>` literally. Save output under
`/tmp/luckiest-research/<slug>/`. Stop a retry chain at the first non-empty result.

## Web read (Jina Reader, zero config)

```bash
curl -s "https://r.jina.ai/<URL>"
```

If `JINA_API_KEY` is set in the environment, send it as `-H "Authorization: Bearer $JINA_API_KEY"`
for higher rate limits. Name the variable only; never ask for or print the value.

Retry chain:
1. Retry once; Jina rate-limits briefly.
2. Host `WebFetch` tool with the same URL.
3. `pixelshot` (see visual-read.md). JS-heavy pages often need this.
4. Public archive copy. Jina returns 403 for web.archive.org, so go direct:
   `curl -s "https://archive.org/wayback/available?url=<URL>"` gives the closest snapshot
   URL and timestamp, then `curl -sL --compressed "<snapshot url>"` (without `--compressed`
   the body is gzip bytes). Read the HTML, or pixelshot the snapshot URL. Say the answer
   comes from an archived snapshot and give its date.
5. Report the page as unreachable.

## PDFs and local files

`pixelshot report.pdf --output /tmp/luckiest-research/shots` renders a PDF to tiles. For a
PDF URL, download it first with `curl -sL -o /tmp/luckiest-research/doc.pdf "<URL>"`. Read
tiles as in visual-read.md. Use the host Read tool for a local PDF when it supports pages.

## Web search

```bash
# Prefer the host WebSearch tool. If absent and mcporter is installed:
mcporter call exa.web_search_exa query="<query>" numResults=5
```

Retry chain: rephrase the query once (fewer words, no quotes), then try a site-scoped
search (`site:docs.example.com <query>`), then GitHub search for code topics.

## GitHub (gh, zero config for public repos)

```bash
gh search repos "<query>" --sort stars --limit 10
gh search code "<query>" --language <lang> --limit 10
gh repo view owner/repo
gh api repos/owner/repo/readme --jq .content | base64 -d
gh issue list -R owner/repo --state open --limit 20
gh issue view <n> -R owner/repo
gh pr list -R owner/repo --state open --limit 20
gh release list -R owner/repo
gh run list -R owner/repo --limit 10
```

Retry chain: `gh auth status`; if logged out, public reads still work but rate limits
are lower, so wait and retry once. Private repos need the user to run `gh auth login`
themselves.

## YouTube (yt-dlp, zero config)

```bash
yt-dlp --dump-json "<URL>" | jq '{title, channel, upload_date, view_count, duration}'
yt-dlp --write-sub --write-auto-sub --sub-lang "en" --skip-download -o "/tmp/luckiest-research/%(id)s" "<URL>"
cat /tmp/luckiest-research/<id>.*.vtt
yt-dlp --dump-json "ytsearch5:<query>" | jq -r '.title + " | " + .webpage_url'
```

Retry chain for transcripts:
1. The `--write-sub --write-auto-sub` command above.
2. If the response hits a bot check or writes no `.vtt`, retry once after 10 seconds.
3. If the video has no captions, say so. Do not download audio or transcribe without
   asking; that adds a dependency and may send audio to a third party.

Auto captions repeat lines; dedupe before quoting. Never use yt-dlp for Bilibili.

## RSS

```bash
python3 -c "import feedparser,sys; [print(e.get('published',''),'|',e.title,'|',e.link) for e in feedparser.parse(sys.argv[1]).entries[:10]]" "<FEED_URL>"
```

If feedparser is missing, `curl -s "<FEED_URL>"` and read the XML directly. Do not
install feedparser mid-task.

## X (twitter-cli, login-backed)

Only when doctor reports `live`. Requires `TWITTER_AUTH_TOKEN` and `TWITTER_CT0` in the
environment. Name them; never ask for values.

```bash
twitter tweet <URL_OR_ID> --json
twitter user-posts @handle -n 20 --json
twitter search "<query>" -n 10 --json
```

Retry chain for search: retry once, then fall back to `user-posts` for a named account,
then report search as unavailable. Do not call `followers`/`following` from a server IP.

## Reddit (rdt-cli, login-backed)

Only when doctor reports `live`.

```bash
rdt search "<query>" --limit 10
rdt post <URL>
```

Retry chain: retry once, then read the thread through Jina
(`curl -s "https://r.jina.ai/<reddit URL>"`), then pixelshot, then report as unreachable.

## Podcasts

Most podcast pages have an RSS feed and a transcript page. Read the RSS for episode
links, then the episode page with Jina. Do not transcribe audio without asking.
