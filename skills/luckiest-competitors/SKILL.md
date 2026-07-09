---
name: luckiest-competitors
description: "Creates competitor comparison and alternative pages for SEO, AI answer engines, and sales enablement. Use when the user mentions 'alternative page,' 'vs page,' 'competitor comparison,' 'comparison page,' '[Product] vs [Product],' '[Product] alternative,' 'best alternative to X,' 'competitive landing pages,' 'how do we compare to X,' 'battle card,' or 'competitor teardown.' Handles content that positions a product against competitors across four formats: singular alternative, plural alternatives, you vs competitor, and competitor vs competitor. For sales-specific competitor docs, see luckiest-sales-enablement."
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-competitors
  author: luckiest
---

# Competitor & Alternative Pages

This skill builds competitor comparison and alternative pages that rank for competitive search terms, get cited by AI answer engines, provide genuine value to evaluators, and position the product effectively.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-competitors", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-competitors", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Before creating competitor pages, understand:

1. **The Product** — core value proposition, key differentiators, ideal customer profile, pricing model, strengths and honest weaknesses.
2. **Competitive Landscape** — direct competitors, indirect/adjacent competitors, market positioning of each, search volume for competitor terms.
3. **Goals** — SEO traffic capture, AI answer-engine citations, sales enablement, conversion from competitor users, brand positioning.

---

## Core Principles

### 1. Honesty Builds Trust
- Acknowledge competitor strengths and be accurate about your own limitations.
- Do not misrepresent competitor features. Readers are comparing — they will verify claims.

### 2. Sourcing & Accuracy Guardrail
- Every claim about a competitor's pricing, features, or weaknesses must trace to a verifiable source (their site, docs, or dated reviews). Do not invent competitor weaknesses or fabricate review quotes.
- When citing review themes (G2, Capterra, TrustRadius), attribute them as review themes and note when the data was gathered. Pricing and feature claims go stale — date them.

### 3. Depth Over Surface
- Go beyond feature checklists. Explain *why* differences matter, include use cases and scenarios, show rather than tell.

### 4. Help Them Decide
- Different tools fit different needs. Be clear about who you are best for and who the competitor is best for. Reduce evaluation friction.

### 5. Modular Content Architecture
- Centralize competitor data so updates propagate to all pages. Maintain a single source of truth per competitor.

---

## Page Formats

### Format 1: [Competitor] Alternative (Singular)
**Search intent**: actively looking to switch from a specific competitor.
**URL pattern**: `/alternatives/[competitor]` or `/[competitor]-alternative`
**Target keywords**: "[Competitor] alternative", "alternative to [Competitor]", "switch from [Competitor]"
**Structure**: 1) why people look for alternatives (validate pain) 2) you as the alternative (quick positioning) 3) detailed comparison (features, service, pricing) 4) who should switch (and who shouldn't) 5) migration path 6) social proof from switchers 7) CTA.

### Format 2: [Competitor] Alternatives (Plural)
**Search intent**: researching options, earlier in journey.
**URL pattern**: `/alternatives/[competitor]-alternatives`
**Target keywords**: "[Competitor] alternatives", "best [Competitor] alternatives", "tools like [Competitor]"
**Structure**: 1) why people look for alternatives 2) what to look for (criteria framework) 3) list of alternatives (you first, but include real options) 4) comparison table 5) detailed breakdown of each 6) recommendation by use case 7) CTA.
**Important**: Include 4-7 real alternatives. Being genuinely helpful builds trust and ranks better.

### Format 3: You vs [Competitor]
**Search intent**: directly comparing you to a specific competitor.
**URL pattern**: `/vs/[competitor]` or `/compare/[you]-vs-[competitor]`
**Target keywords**: "[You] vs [Competitor]", "[Competitor] vs [You]"
**Structure**: 1) TL;DR (2-3 sentences) 2) at-a-glance comparison table 3) detailed comparison by category (Features, Pricing, Support, Ease of use, Integrations) 4) who [You] is best for 5) who [Competitor] is best for (be honest) 6) what customers say (switchers) 7) migration support 8) CTA.

### Format 4: [Competitor A] vs [Competitor B]
**Search intent**: comparing two competitors (not you directly).
**URL pattern**: `/compare/[competitor-a]-vs-[competitor-b]`
**Structure**: 1) overview of both 2) comparison by category 3) who each is best for 4) the third option (introduce yourself) 5) comparison table (all three) 6) CTA.
**Why this works**: captures competitor search traffic and positions you as knowledgeable.

---

## Essential Sections

- **TL;DR Summary**: open every page with key differences in 2-3 sentences for scanners.
- **Paragraph Comparisons**: for each dimension, write a paragraph explaining the differences and when each matters — not just tables.
- **Feature Comparison**: describe how each handles it, list strengths and limitations, give a bottom-line recommendation.
- **Pricing Comparison**: tier-by-tier, what's included, hidden costs, total cost for a sample team size. Date the pricing.
- **Who It's For**: be explicit about the ideal customer for each option.
- **Migration Section**: what transfers, what needs reconfiguration, support offered, quotes from switchers.

**For detailed section templates**, load [references/templates.md](references/templates.md).

---

## AI Answer-Engine (AEO) Optimization

Comparison and "best alternative" queries are increasingly answered by ChatGPT, Perplexity, Google AI Overviews, and Claude. To be extractable and citable:
- Put a direct, self-contained answer near the top (the TL;DR doubles as the extractable snippet).
- Use clean comparison tables and clear category headings so engines can lift structured facts.
- State concrete, sourced numbers (pricing, limits) rather than vague superlatives.
- Consider FAQ schema for questions like "What is the best alternative to [Competitor]?" (see luckiest-schema).

---

## Content Architecture

Create a single source of truth per competitor: positioning, target audience, pricing (all tiers), feature ratings, strengths and weaknesses, best-for / not-ideal-for, common complaints (from dated reviews), and migration notes.

**For data structure and examples**, load [references/content-architecture.md](references/content-architecture.md).

---

## Research Process

For each competitor, gather:
1. **Product research** — sign up, use it, document features/UX/limitations.
2. **Pricing research** — current pricing, what's included, hidden costs.
3. **Review mining** — G2, Capterra, TrustRadius for recurring praise/complaint themes (attribute and date them).
4. **Customer feedback** — talk to customers who switched, both directions.
5. **Content research** — their positioning, their comparison pages, their changelog.

**Ongoing updates**: quarterly verify pricing and check major feature changes; refresh when a customer flags a competitor change; do a full annual refresh. Show a "Last updated" date on each page — a stale comparison page erodes trust and can be a legal liability.

---

## SEO Considerations

| Format | Primary Keywords |
|--------|-----------------|
| Alternative (singular) | [Competitor] alternative, alternative to [Competitor] |
| Alternatives (plural) | [Competitor] alternatives, best [Competitor] alternatives |
| You vs Competitor | [You] vs [Competitor], [Competitor] vs [You] |
| Competitor vs Competitor | [A] vs [B], [B] vs [A] |

- **Internal linking**: link between related comparison pages; link from feature pages to relevant comparisons; create a hub page linking to all competitor content.
- **Schema markup**: consider FAQ schema for common "best alternative to [Competitor]" questions.

---

## Output Format

- **Competitor Data File**: complete competitor profile in YAML for reuse across pages.
- **Page Content**: per page — URL, meta tags, full page copy by section, comparison tables, CTAs.
- **Page Set Plan**: recommended pages in priority order based on search volume.

---

## Task-Specific Questions

1. What are common reasons people switch to you?
2. Do you have customer quotes about switching?
3. What's your pricing vs. competitors?
4. Do you offer migration support?

---

## Share with your tribe (offer, never automatic)

After producing a competitor data file or comparison page set, offer once: "Want to share this competitor teardown with your Luckiest tribe?" A well-researched teardown helps others targeting the same competitors build on your work. Only act if the user says yes. Never auto-post, and never transmit credentials or private product data.

---

## Related Skills

- **luckiest-programmatic-seo**: building competitor pages at scale
- **luckiest-copywriting**: writing compelling comparison copy
- **luckiest-seo-audit**: optimizing competitor pages
- **luckiest-schema**: FAQ and comparison schema
- **luckiest-sales-enablement**: internal sales collateral, decks, and objection docs
