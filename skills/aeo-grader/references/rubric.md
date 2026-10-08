# luckiest-aeo-grader Rubric

AEO = Answer Engine Optimization: how findable, parseable, and *citable* a page is
to AI answer engines (ChatGPT/SearchGPT, Perplexity, Gemini, Claude, Copilot).
This is not SEO. SEO optimizes for a ranked list of blue links a human clicks.
AEO optimizes for a machine that reads your page, extracts a claim, and decides
whether to quote you as the source. The failure mode is different: in SEO you lose
by ranking #8; in AEO you lose by being unparseable or uncitable, so you are
invisible at any rank.

Five categories, weighted. Score each 0-100, then weight to a final 0-100 and a
letter. Always show the per-category breakdown — a single number hides where the
work is.

## 1. Crawl Access & Machine Manifests — weight 20%
Can the engines reach the content at all, and is there a machine-readable map?
- robots.txt does NOT block AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, etc.). Blocking root = near-zero on this category, because intent to be cited is absent. (Flag, don't auto-penalize: some sites block on purpose. Ask.)
- Content is in the server HTML, not painted by JS after load (`js_dependent_hint`). Most crawlers take a snapshot; JS-only content is often unseen.
- sitemap.xml referenced in robots.txt.
- llms.txt present (emerging standard; bonus, not yet table stakes — reward it, don't punish its absence hard).
- HTTP 200, canonical set, `lang` set.

## 2. Structured Data — weight 20%
Schema.org JSON-LD is the single highest-leverage AEO signal: it hands the engine
a typed, unambiguous fact instead of asking it to infer from prose.
- JSON-LD present and the `@type` matches the page intent: `FAQPage`/`QAPage` for Q&A, `Article`/`BlogPosting` + `author` + `datePublished` for content, `Product`+`Offer`+`AggregateRating` for commerce, `Organization`/`LocalBusiness` for entity, `BreadcrumbList` for hierarchy.
- Open Graph + Twitter card present (cheap, widely consumed).
- Penalize: no JSON-LD at all (you are forcing inference). Reward: multiple correct, nested types.

## 3. Content Extractability — weight 25% (highest)
This is where most sites actually win or lose, and it is the most fixable.
- Exactly one H1; logical H2/H3 nesting (no skipped levels, no div-soup headings).
- Question-shaped headings ("How does X work?") that mirror how users prompt AIs — these become extractable Q/A pairs.
- Answer-first / inverted-pyramid: the direct answer sits in the first 1-2 sentences under the heading, not buried after three paragraphs of throat-clearing.
- Self-contained statements: a sentence that still makes sense when quoted alone (engines lift single sentences). "It costs $20/mo" is uncitable; "Acme Pro costs $20/month" is citable.
- Lists, tables, and `<details>` for structured facts engines love to lift.

## 4. Entity & Authority — weight 20%
Engines cite sources they can attribute and trust.
- Clear entity definition near the top: who/what is this, in one plain sentence.
- Named author / byline, and an About/Org presence that ties the page to a real entity.
- Outbound citations to primary sources (engines favor pages that themselves cite).
- **Entity graph reinforcement** (2026 signal): `Organization` schema that points at real, corroborating nodes — founders/authors linking out to LinkedIn, Crunchbase, or Wikipedia that link back to the domain. Engines follow this graph to decide who to trust. A page tied to a reinforced entity outscores an orphaned one. (Source: Frase / Poweredbysearch AEO guides, 2026-07.)
- **Statistical density** (2026 signal): concrete, quotable numbers and stats near the answer. Stat-rich sentences ("cuts onboarding to 4 minutes") get lifted more often than qualitative claims.
- Freshness: visible + machine-readable dates (`datePublished`/`dateModified`). Stale or dateless pages get discounted on time-sensitive queries.

## 5. Answerability — weight 15%
Would this page actually answer the prompt the user told us about?
- Judge against the SPECIFIC target queries gathered in clarification. Read the text: does a direct, quotable answer to each query exist on the page?
- FAQ / Q&A blocks covering real follow-ups.
- No critical answer locked inside an image, PDF, video, or accordion that ships empty in HTML.

## Scoring to a letter (the Readiness axis)
The five weighted categories produce the **Readiness** grade — how well the page
is *built* to be cited. Weighted total → A 90-100, B 80-89, C 70-79, D 60-69,
F <60. Call out the single category dragging it down, not a flat average vibe.

**Readiness is page-craft only. Do NOT inflate it because the brand is famous.**
Brand pull shows up in the separate **Citation** axis (the live probe in the
workflow). A page can be Readiness-C / Citation-strong (cited despite weak markup —
flag the fragility) or Readiness-A / Citation-weak (well-built but unknown — needs
authority/distribution). Reporting one number hides exactly the gap the user needs
to see. Keep the two axes separate and reconcile them in the verdict sentence.

## Honesty
The scanner sees machine signals; you read the rendered content for 3, 4, 5.
State what you could not verify (paywalled, JS-rendered, needs a human). Like the
Framer tool: this is a guide, not a verdict. Never invent a JSON-LD type or a date
the scan did not return.

## Citation latency — set expectations, don't promise instant results
Structural fixes surface at different speeds per engine (observed 2026-07, Poweredbysearch/AuthorityTech): Perplexity in ~2-7 days, ChatGPT in ~7-21 days, Claude and Google AI Overviews in ~14-45 days. When you hand off fixes, say a re-check is worth doing on that cadence — a page that "still isn't cited" the next day has not failed. Note also that ChatGPT leans heavily on Bing's top results, so a Bing-invisible page is a citation problem no amount of markup fixes alone.
