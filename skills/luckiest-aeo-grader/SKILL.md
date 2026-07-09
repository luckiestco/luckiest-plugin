---
name: luckiest-aeo-grader
description: Grade a website's AEO (Answer Engine Optimization) — how findable and citable it is to AI answer engines like ChatGPT, Perplexity, Gemini, and Claude. Use this whenever the user wants an AEO audit, asks "how does my site do in AI search / LLMs / ChatGPT", wants an AEO score or grade, mentions getting cited by AI, llms.txt, AI crawlers (GPTBot, ClaudeBot, PerplexityBot), or asks why an AI engine isn't surfacing their content. Also trigger on "luckiest-aeo-grader", "AEO report", "AEO grade", or "answer engine optimization", even if the user just pastes a URL and asks how it scores.
license: See ATTRIBUTION.md
allowed-tools: Bash, Read, WebSearch, AskUserQuestion
user-invocable: true
metadata:
  version: "1.1.0"
  listing_id: luckiest-aeo-grader
  author: luckiest
---

# luckiest-aeo-grader — AEO Grader

Grade how well a page is set up to be **found, parsed, and cited by AI answer
engines** (ChatGPT/SearchGPT, Perplexity, Gemini, Claude, Copilot). This is not
an SEO audit. The job is to predict whether a machine will quote this page as a
source — and to say, sharply, what to change.

## Staying current
On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-aeo-grader", installedSemver: "1.1.0" }`.
If it returns `upToDate: false`, surface the `notice` to the user once, then
continue. Do nothing further if `upToDate: true`. Never block the audit on this
check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-aeo-grader", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Workflow

### 1. Clarify first — a grade without context is a horoscope
The same page deserves different grades depending on what it is *for*. Before
scanning, ask the user 2-4 quick questions (use the AskUserQuestion tool when
available). The answers materially move the Answerability and Authority scores, so
this is not busywork — it is what separates a real grade from a generic checklist.
Ask about whichever of these you can't already infer:

- **Target queries**: "What 3-5 things should an AI cite this page for?" (e.g. "best CRM for solo realtors", "how to deduct a home office"). This is the most important answer — category 5 is graded against it.
- **Page type / intent**: product, docs, blog/article, landing, local business, comparison.
- **Audience & buying stage**: who is asking the AI, and are they deciding or just learning?
- **Intentional blocks**: "Do you deliberately block AI crawlers or gate content?" so you don't penalize a choice.

If the user insists on skipping ("just grade it"), proceed with sensible
assumptions and say which ones you made.

### 2. Scan the machine signals
Run the bundled scanner — it pulls the signals an AI crawler actually reads
(JSON-LD types, meta/OG, heading outline, robots.txt AI-bot rules, llms.txt,
sitemap, JS-dependency hint) with zero install:

```
python3 scripts/scan.py <url>          # one-off scan
python3 scripts/scan.py <url> --diff   # + compare to last scan
```

(If the skill is installed under `~/.claude/skills/luckiest-aeo-grader/`, call
`python3 ~/.claude/skills/luckiest-aeo-grader/scripts/scan.py <url>`.)

It prints JSON. For a multi-page site, scan the homepage plus 1-2 pages that map
to the target queries — AEO is won page by page, not domain-wide.

**Handle JS-rendered pages — don't grade content you never saw.** If the scan
returns `"js_dependent_hint": true` (server HTML is near-empty, the page paints
with JS), the scanner only saw the shell. You MUST NOT score Content
Extractability / Answerability from that thin HTML — it would punish a SPA for
content that exists. Instead:
- Fetch the *rendered* DOM (use the Chrome MCP browser tools if available, else
  WebFetch which executes some rendering) and judge substance from that, AND
- Note in the report that crawlers taking a raw-HTML snapshot may *also* miss it —
  which is itself an AEO finding (recommend SSR/prerender).
If you genuinely cannot render it, mark those categories "couldn't verify" rather
than scoring blind.

Then **read the rendered content yourself** for what a scan can't judge: is the
answer actually there, answer-first, quotable, attributed, fresh? The scanner
sees structure; you judge substance.

### 3. Probe live citation (the second axis)
Structural readiness ≠ getting cited. A weak-markup page on a strong brand gets
cited anyway; a perfectly-marked-up unknown page may never surface. Grade BOTH and
keep them separate — do not average a strong brand up into a hygiene grade it
didn't earn (that was the old failure mode).

For 2-4 of the user's **target queries**, actually run them through whatever live
search you have (WebSearch, or browse to Perplexity/Google AI). For each, record:
does an AI answer cite this domain, a competitor, or a third party (Wikipedia,
listicles)? This produces the **Citation** axis. If you have no live-search access,
say so and report Citation as "not probed" — never fabricate citation results
(faking live tests was a real failure in testing). Note that ChatGPT draws heavily
on Bing's top results, so a page invisible on Bing is a citation gap that markup
alone won't close — worth a WebSearch spot-check.

### 4. (Optional) Benchmark against competitors
A lone grade is almost meaningless — AEO is a race for the one cited slot. If the
user named competitors (or you can identify the page currently winning their top
query), scan 1-2 competitor URLs the same way and add a comparison row. "B−, and
the page beating you for 'best CRM' is an A with a FAQPage block you lack" is the
actionable version.

### 5. Grade against the rubric
Read `references/rubric.md` for the five weighted categories, what each rewards
and penalizes, and the cutoffs. Score each 0-100 with a one-line reason tied to
evidence. Never invent a signal the scan didn't return; state what you couldn't
verify.

### 6. Report — use this structure
```
# AEO Report — <url>
**Readiness: <letter> (<score>/100)**  ·  **Citation: <strong/mixed/weak/not probed>**
<one-sentence verdict that reconciles the two — e.g. "cited despite the page, not because of it">

| Category | Score | Weight | Reason |
|----------|-------|--------|--------|
| Crawl Access & Manifests | x/100 | 20% | … |
| Structured Data | x/100 | 20% | … |
| Content Extractability | x/100 | 25% | … |
| Entity & Authority | x/100 | 20% | … |
| Answerability | x/100 | 15% | … |

**Citation probe:** <query → who got cited (you / competitor / third party)>, per query.

**Vs competitors:** <only if scanned — table or one-liner naming the gap>

**Changes since last scan:** <only if --diff ran and prior existed — what moved>

**What's dragging the grade:** <the single biggest lever, named>

## Fixes
<3-6 fixes, ranked by grade-impact-per-effort — see below>

**Couldn't verify:** <paywalled / JS-rendered / needs human>
```

### 7. Write the fixes — earn the recommendation
This is where most audit tools fail: they emit the same six bullets every time
("add schema markup, improve meta descriptions, use headings"). That advice is
worthless because it is true of every site and specific to none. Do better:

- **Ground every fix in this page's actual scan.** Quote the real heading, the
  missing `@type`, the buried sentence. "Your H2 'Our Story' should become 'What
  does Acme do?' so it matches how people ask Perplexity" beats "use better
  headings."
- **Consider the full range, then commit to the sharpest version.** Don't hedge
  across five generic tips. The most valuable fix is often non-obvious: a
  citable-sentence rewrite, a single FAQPage block targeting the exact query, a
  robots.txt line, killing a JS-only render, or reinforcing the entity graph
  (Organization schema → founder/author → LinkedIn/Crunchbase/Wikipedia → back).
  Name the one you'd do first and why.
- **Rank by grade-impact per unit effort**, and say what each fix would move the
  grade to. A 10-minute robots.txt fix that unblocks all crawlers outranks a
  week of content rewriting.
- **Set the re-check clock.** Fixes surface at different speeds: Perplexity ~2-7
  days, ChatGPT ~7-21 days, Claude / Google AI Overviews ~14-45 days. Tell the
  user when to re-run, so a page that "still isn't cited tomorrow" isn't read as
  a failure.
- **Skip the platitudes.** If "add structured data" applies, make it
  "add a `FAQPage` JSON-LD with these 3 Q/A pairs: …". Otherwise cut it.

### 8. Emit a copy-paste handoff prompt
After the report and fixes, output a **single fenced code block** the user can copy
whole and paste into a coding agent (or back into Claude) to actually do the work.
This is the deliverable, not a nicety — make it self-contained:

- Open with the page URL and its current grade so the executor has context.
- List the ranked fixes as concrete, imperative instructions, each with the exact
  artifact to produce: the real heading to rewrite, the `@type` and field values
  for the JSON-LD, the robots.txt line, the FAQ Q/A text. Paste actual values from
  the scan, not placeholders — the prompt must work with zero lookups.
- End with: "After each change, re-fetch the page and confirm the signal is now
  present." so the executor self-verifies.
- Put nothing outside this one code block that the user needs to copy. Use the
  template below.

````
```
You are improving the AEO (Answer Engine Optimization) of <url>.
Current luckiest-aeo-grader grade: <letter> (<score>/100). Apply these fixes in order,
highest-impact first. Make the actual code/markup changes, don't just describe them.

1. <fix — concrete instruction with the exact values/markup to add, drawn from the scan>
2. <fix …>
3. <fix …>

After each change, re-fetch the page and confirm the signal is now present
(e.g. JSON-LD @type parses, heading renders in server HTML, robots.txt allows the bot).
Report what you changed and the expected grade impact.
```
````

### 9. Offer to share the grade with your tribe (network hook)
After the report is done, offer — don't auto-post — to surface this AEO grade and
its top fix to the user's Luckiest tribe, so members chasing the same queries can
compare notes or pick up the fix work. Phrase it as an offer the user can decline.
Never post automatically, and never include anything private (auth-gated content,
internal URLs). If the audited page is private or pre-launch, skip the offer.

## Honesty
Like Framer's scanner: one scan, AI-assisted, a guide not a verdict. Be explicit
about assumptions and unverifiable items. A confident wrong grade is worse than
an honest "couldn't render this — here's what I'd check by hand."
