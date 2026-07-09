---
name: luckiest-schema
description: When the user wants to add, fix, or optimize schema markup and structured data on their site. Also use when the user mentions "schema markup," "structured data," "JSON-LD," "rich snippets," "schema.org," "FAQ schema," "product schema," "review schema," "breadcrumb schema," "Google rich results," "knowledge panel," "star ratings in search," or "add structured data." Use this whenever someone wants their pages to show enhanced results in Google. For broader SEO issues, see luckiest-seo-audit. For AI search optimization, see luckiest-ai-seo.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-schema
  author: luckiest
---

# Schema Markup

This skill implements structured data and schema.org markup that helps search engines understand content and enables rich results in search. The assistant acts as an expert in structured data.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-schema", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-schema", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Before implementing schema, understand:

1. **Page Type** - What kind of page? What's the primary content? What rich results are possible?

2. **Current State** - Any existing schema? Errors in implementation? Which rich results already appearing?

3. **Goals** - Which rich results are you targeting? What's the business value?

---

## Core Principles

### 1. Accuracy First
- Schema must accurately represent page content
- Don't markup content that doesn't exist
- Keep updated when content changes

### 2. Use JSON-LD
- Google recommends JSON-LD format
- Easier to implement and maintain
- Place in `<head>` or end of `<body>`

### 3. Follow Google's Guidelines
- Only use markup Google supports
- Avoid spam tactics
- Review eligibility requirements

### 4. Validate Everything
- Test before deploying
- Monitor Search Console
- Fix errors promptly

---

## Current Rich-Result Reality (verify before promising results)

Valid schema does not guarantee a rich result, and Google's supported list changes. Before telling a user a schema type "will" produce a rich result, confirm it is still supported for their site class:

- **FAQ rich results** are now restricted to well-known, authoritative government and health sites. For most sites, `FAQPage` markup no longer renders an FAQ rich result. Still valid to include for entity understanding and AI answer engines — just do not promise the search enhancement.
- **HowTo rich results** were deprecated by Google and no longer appear in search. Treat `HowTo` as machine-readable structure, not a rich-result play.
- Frame these two as "helps machines and AI engines parse the page" rather than "gets you a rich snippet." Reserve rich-result promises for types Google actively supports (Product, Review/AggregateRating, Breadcrumb, Article, Event, LocalBusiness, and similar).

When unsure, point the user to Google's current Search Central "structured data features" list rather than asserting from memory.

---

## Common Schema Types

| Type | Use For | Required Properties |
|------|---------|-------------------|
| Organization | Company homepage/about | name, url |
| WebSite | Homepage (search box) | name, url |
| Article | Blog posts, news | headline, image, datePublished, author |
| Product | Product pages | name, image, offers |
| SoftwareApplication | SaaS/app pages | name, offers |
| FAQPage | FAQ content (machine/AI parsing; rich result limited) | mainEntity (Q&A array) |
| HowTo | Tutorials (machine parsing; rich result deprecated) | name, step |
| BreadcrumbList | Any page with breadcrumbs | itemListElement |
| LocalBusiness | Local business pages | name, address |
| Event | Events, webinars | name, startDate, location |

**For complete JSON-LD examples**: See [references/schema-examples.md](references/schema-examples.md)

---

## Quick Reference

### Organization (Company Page)
Required: name, url
Recommended: logo, sameAs (social profiles), contactPoint

### Article/BlogPosting
Required: headline, image, datePublished, author
Recommended: dateModified, publisher, description

### Product
Required: name, image, offers (price + availability)
Recommended: sku, brand, aggregateRating, review
Merchant listing eligibility: Google increasingly expects `shipping` (OfferShippingDetails) and `hasMerchantReturnPolicy` (MerchantReturnPolicy) on the Offer for physical products. Add both when the data is available — omitting them can suppress merchant rich results even when the core Product schema is valid.

### FAQPage
Required: mainEntity (array of Question/Answer pairs)

### BreadcrumbList
Required: itemListElement (array with position, name, item)

---

## Multiple Schema Types

Multiple schema types can be combined on one page using `@graph`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", ... },
    { "@type": "WebSite", ... },
    { "@type": "BreadcrumbList", ... }
  ]
}
```

**Link entities explicitly with `@id`.** Give each node a stable `@id` (for example `https://example.com/#organization`) and reference it from other nodes rather than repeating the object. This lets search engines and AI answer engines resolve one coherent entity graph instead of guessing that duplicated names are the same thing — and it prevents contradictory duplicate entities on the same page.

---

## Validation and Testing

### Tools
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Search Console**: Enhancements reports

### Common Errors

**Missing required properties** - Check Google's documentation for required fields

**Invalid values** - Dates must be ISO 8601, URLs fully qualified, enumerations exact

**Mismatch with page content** - Schema doesn't match visible content

---

## Implementation

### Static Sites
- Add JSON-LD directly in HTML template
- Use includes/partials for reusable schema

### Dynamic Sites (React, Next.js)
- Component that renders schema
- Server-side rendered for SEO
- Serialize data to JSON-LD

### CMS / WordPress
- Plugins (Yoast, Rank Math, Schema Pro)
- Theme modifications
- Custom fields to structured data

---

## Output Format

### Schema Implementation
```json
// Full JSON-LD code block
{
  "@context": "https://schema.org",
  "@type": "...",
  // Complete markup
}
```

### Testing Checklist
- [ ] Validates in Rich Results Test
- [ ] No errors or warnings
- [ ] Matches page content
- [ ] All required properties included

---

## Task-Specific Questions

1. What type of page is this?
2. What rich results are you hoping to achieve?
3. What data is available to populate the schema?
4. Is there existing schema on the page?
5. What's your tech stack?

---

## Share with your tribe

After implementing schema for the user, the assistant may OFFER (never automatically): "Want me to share this schema pattern with your Luckiest tribe? Anyone working on the same page type can pick up where you left off." Only share on explicit acceptance. Never post automatically and never include credentials, private URLs, or unpublished data in a shared pattern.

---

## Related Skills

- **luckiest-seo-audit**: For overall SEO including schema review
- **luckiest-ai-seo**: For AI search optimization (schema helps AI understand content)
- **luckiest-programmatic-seo**: For templated schema at scale
- **luckiest-site-architecture**: For breadcrumb structure and navigation schema planning
