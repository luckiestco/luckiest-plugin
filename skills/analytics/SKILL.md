---
name: analytics
description: When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions "set up tracking," "GA4," "Google Analytics," "conversion tracking," "event tracking," "UTM parameters," "tag manager," "GTM," "analytics implementation," "tracking plan," "how do I measure this," "track conversions," "attribution," "Mixpanel," "Segment," "consent mode," "server-side tracking," "are my events firing," or "analytics isn't working." Use this whenever someone asks how to know if something is working or wants to measure marketing results. For A/B test measurement, see luckiest-ab-testing.
license: See ATTRIBUTION.md
metadata:
  version: "1.2.1"
  listing_id: luckiest-analytics
  author: luckiest
---

# Analytics Tracking

This skill helps set up analytics tracking and measurement that provides actionable insights for marketing and product decisions. It operates as an expert in analytics implementation, validation, and auditing.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "f1cb04a5-ae1d-44bd-90c3-7c267e04a9eb", installedSemver: "1.2.1" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-analytics", skill_version: "1.2.1", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Before implementing tracking, understand:

1. **Business Context** - What decisions will this data inform? What are key conversions?
2. **Current State** - What tracking exists? What tools are in use?
3. **Technical Context** - What's the tech stack? Any privacy/compliance requirements?

---

## Core Principles

### 1. Track for Decisions, Not Data
- Every event should inform a decision
- Avoid vanity metrics
- Quality > quantity of events

### 2. Start with the Questions
- What do you need to know?
- What actions will you take based on this data?
- Work backwards to what you need to track

### 3. Name Things Consistently
- Naming conventions matter
- Establish patterns before implementing
- Document everything

### 4. Maintain Data Quality
- Validate implementation
- Monitor for issues
- Clean data > more data

### 5. Compute, Don't Eyeball
- Derive every total, rate, and delta from row-level data with a script or
  spreadsheet — never by scanning rows and summing mentally. One silently
  dropped row corrupts every figure downstream of it.
- Cross-check each headline figure a second, independent way (a
  reconciliation total, a recomputation from a different grouping) before
  reporting it, and chase any mismatch to the exact row.
- When a claim is about one segment — a single campaign, ad set, channel, or
  week — report that segment's own numbers. Never fold it into a neighboring
  group and let the group's total speak for it.

### 6. Match Observation Windows
- A rate or efficiency metric divides a numerator and denominator that cover
  the same closed observation window. Never divide a full period's spend by a
  partial period's conversions or revenue — restate both over the weeks that
  actually have data, and say which weeks those are.
- Cohort rates use only cohorts whose observation window has ended. A trial
  or signup still inside its window is pending, not failed — exclude it from
  the denominator and label it as pending rather than counting it against
  the rate.

### 7. Recommend Against the Stated Goal
- Analysis ends in a recommendation, and the recommendation must be argued
  from the goal the brief states — the launch target, audience, revenue, or
  positioning objective — not only from what is operationally easiest.
  Name which stated goal each option serves and what it trades away.

---

## Tracking Plan Framework

### Structure

```
Event Name | Category | Properties | Trigger | Notes
---------- | -------- | ---------- | ------- | -----
```

### Event Types

| Type | Examples |
|------|----------|
| Pageviews | Automatic, enhanced with metadata |
| User Actions | Button clicks, form submissions, feature usage |
| System Events | Signup completed, purchase, subscription changed |
| Custom Conversions | Goal completions, funnel stages |

**For comprehensive event lists**: See [references/event-library.md](references/event-library.md)

---

## Event Naming Conventions

### Recommended Format: Object-Action

```
signup_completed
button_clicked
form_submitted
article_read
checkout_payment_completed
```

### Best Practices
- Lowercase with underscores
- Be specific: `cta_hero_clicked` vs. `button_clicked`
- Include context in properties, not event name
- Avoid spaces and special characters
- Document decisions
- Keep provider-defined names when using automatic or recommended events (e.g. GA4 `click`, `view_search_results`, `purchase`). Map internal business names explicitly; naming a custom event does not make the provider collect it automatically.

---

## Essential Events

### Marketing Site

| Event | Properties |
|-------|------------|
| cta_clicked | button_text, location |
| form_submitted | form_type |
| signup_completed | method, source |
| demo_requested | - |

### Product/App

| Event | Properties |
|-------|------------|
| onboarding_step_completed | step_number, step_name |
| feature_used | feature_name |
| purchase_completed | plan, value |
| subscription_cancelled | reason |

**For full event library by business type**: See [references/event-library.md](references/event-library.md)

---

## Event Properties

### Standard Properties

| Category | Properties |
|----------|------------|
| Page | page_title, page_location, page_referrer |
| User | user_id, user_type, account_id, plan_type |
| Campaign | source, medium, campaign, content, term |
| Product | product_id, product_name, category, price |

### Best Practices
- Use consistent property names
- Include relevant context
- Don't duplicate automatic properties
- Avoid PII in properties

---

## GA4 Implementation

### Quick Setup

1. Create GA4 property and data stream
2. Install gtag.js or GTM
3. Enable enhanced measurement
4. Configure custom events
5. Mark conversions in Admin

### Custom Event Example

```javascript
gtag('event', 'signup_completed', {
  'method': 'email',
  'plan': 'free'
});
```

**For detailed GA4 implementation**: See [references/ga4-implementation.md](references/ga4-implementation.md)

---

## Google Tag Manager

### Container Structure

| Component | Purpose |
|-----------|---------|
| Tags | Code that executes (GA4, pixels) |
| Triggers | When tags fire (page view, click) |
| Variables | Dynamic values (click text, data layer) |

### Data Layer Pattern

```javascript
dataLayer.push({
  'event': 'form_submitted',
  'form_name': 'contact',
  'form_location': 'footer'
});
```

**For detailed GTM implementation**: See [references/gtm-implementation.md](references/gtm-implementation.md)

---

## UTM Parameter Strategy

### Standard Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| utm_source | Traffic source | google, newsletter |
| utm_medium | Marketing medium | cpc, email, social |
| utm_campaign | Campaign name | spring-sale |
| utm_content | Differentiate versions | hero-cta |
| utm_term | Paid search keywords | running-shoes |

### Naming Conventions
- **Lowercase everything.** GA4 treats `LinkedIn` and `linkedin` as two sources, and the split never merges back.
- **Hyphens between words.** No spaces, underscores, or `+`. Pick one separator for the whole company; this skill uses hyphens.
- **One spelling per source.** `linkedin`, never also `li` or `linkedin.com`. Keep the allowed values in a shared sheet and build links from it.
- **No personal data.** Never put emails, names, phone numbers, or user IDs in a UTM. They land in analytics reports and in referrer logs, and Google's terms prohibit sending PII to GA4.
- **Specific but short:** `blog-footer-cta`, not `cta1`.
- **Test the final URL.** Shorteners and redirects can drop or double parameters. Click the live link and check the landing URL before the campaign ships.

### UTM Patterns by Partner Type

Partner links break most often because each deal gets named on the spot. Fix the pattern per partner type once: `utm_medium` names the kind of deal, `utm_source` names who sent the traffic.

| Partner type | utm_source | utm_medium | utm_campaign | utm_content |
|---|---|---|---|---|
| Newsletter | `{partner}` (one per partner, across all their publications) | `newsletter` | `{partner}-{publication}-{yyyy}-{mm}` | `{placement}-{yyyy-mm-dd}` |
| Creator (YouTube, LinkedIn, TikTok) | `{platform}` | `creator` | `{creator}` | `{post-date}` or the video ID |
| Podcast | `{podcast}` | `podcast` | `{podcast}-{yyyy}-{mm}` | `{spot}-{yyyy-mm-dd}` (pre-roll, mid-roll) |
| Affiliate | `{partner}` | `affiliate` | `{partner}-affiliate` | placement, if they have several |
| Community | `{community}` | `community` | `{community}-{program}` | the channel or post, if known |

- **Use `creator` as the medium for paid creator deals**, not `social` (which mixes them with your organic posts) or `video` (which mixes them with paid video ads). The platform goes in `utm_source`.
- **One link per placement.** A newsletter that runs you on two dates gets two links, so each date's clicks stay separate. The monthly `utm_campaign` rolls them up.
- **Add a custom channel group in GA4.** GA4's default grouping sends mediums like `newsletter`, `creator`, `podcast`, and `community` to Unassigned (only `affiliate` and `email` map to a default channel). Create a channel group with a rule per medium so partner traffic shows up as its own channels.
- Podcast and video links often aren't clickable, so pair the UTM link with a promo code or vanity URL.

*The partner-type pattern is adapted from Wispr Flow's link-creator skill (MIT).*

### Traffic From AI Assistants

You can't tag links that ChatGPT, Claude, Perplexity, Gemini, or Copilot put in their answers. Some of those visits arrive with a referrer (`chatgpt.com`, `perplexity.ai`) or an assistant-added `utm_source`; many arrive as direct, or come later through a branded search.

- Add a GA4 channel group rule that matches known assistant referrers and sources into an "AI assistants" channel, and update the list as new assistants appear.
- Treat that channel as the floor. Assistant-driven visits that show up as direct or branded search can be most of the effect, and they won't carry the referrer.
- For measuring the full effect (exposure, delayed visits, and longer attribution windows), see **luckiest-ai-seo**.

---

## Data Loss and Durable Collection

Client-side tags (gtag.js, client-side GTM) are not ground truth. Assume a
meaningful share of events never reach the server:

- Ad blockers and privacy extensions drop a large slice of client-side hits.
- Browser tracking-prevention (Safari ITP, Firefox ETP) shortens or removes
  client-set cookies, breaking attribution and inflating "new" users.
- Consent-declined sessions are missing entirely unless consent mode models them.

When accuracy matters (revenue, paid-media attribution), flag this to the user
and offer the durable path: server-side GTM or a first-party tracking endpoint,
so collection does not depend on the visitor's browser cooperating. Treat
client-side numbers as a directional floor, not a true count.

---

## Debugging and Validation

### Testing Tools

| Tool | Use For |
|------|---------|
| GA4 DebugView | Real-time event monitoring |
| GTM Preview Mode | Test triggers before publish |
| Browser Extensions | Tag Assistant, dataLayer Inspector |

### Validation Checklist

- [ ] Events firing on correct triggers
- [ ] Property values populating correctly
- [ ] No duplicate events
- [ ] Works across browsers and mobile
- [ ] Conversions recorded correctly
- [ ] No PII leaking
- [ ] Bot and internal traffic filtered (see below)

### Filter Bots and Internal Traffic

Unfiltered internal and bot traffic silently corrupts conversion rates and
inflates engagement. Set this up as part of every implementation, not after:

- Enable GA4's built-in "Exclude known bots and spiders" (on by default) and
  verify it is not disabled.
- Define an internal-traffic filter (office/VPN IP ranges or a `traffic_type`
  parameter) and set it to **Active**, not just Testing.
- Exclude staging/preview hostnames from the production property.

### Common Issues

| Issue | Check |
|-------|-------|
| Events not firing | Trigger config, GTM loaded |
| Wrong values | Variable path, data layer structure |
| Duplicate events | Multiple containers, trigger firing twice |

---

## Audit Mode (Existing Setup)

When the user asks to *audit* rather than build, run a concrete pass instead of
proposing a fresh plan:

1. **Inventory** - list every tag/event actually firing (GTM Preview, GA4
   DebugView, Tag Assistant), not what the docs claim fires.
2. **PII leak scan** - inspect event payloads, page paths, and query strings for
   emails, names, phone numbers, or user IDs landing in analytics. Flag any hit;
   this is a compliance risk, not a style issue.
3. **Duplicate / double-fire check** - watch for the same event firing twice
   (duplicate containers, a trigger matching more than intended, SPA route
   changes re-firing page_view).
4. **Naming drift** - find events that violate the naming convention or mean the
   same thing under different names (`signup` vs `sign_up` vs `signup_completed`).
5. **Conversion integrity** - confirm each marked conversion maps to a real event
   and counts the way the business assumes.

Report findings as a prioritized list (compliance/PII first, then data-integrity,
then hygiene) with the specific fix for each.

---

## Privacy and Compliance

### Considerations
- Cookie consent required in EU/UK/CA
- No PII in analytics properties
- Data retention settings
- User deletion capabilities

### Implementation
- Use consent mode (wait for consent; model consent-declined traffic where supported)
- IP anonymization
- Only collect what you need
- Integrate with consent management platform

---

## Output Format

### Tracking Plan Document

```markdown
# [Site/Product] Tracking Plan

## Overview
- Tools: GA4, GTM
- Last updated: [Date]

## Events

| Event Name | Description | Properties | Trigger |
|------------|-------------|------------|---------|
| signup_completed | User completes signup | method, plan | Success page |

## Custom Dimensions

| Name | Scope | Parameter |
|------|-------|-----------|
| user_type | User | user_type |

## Conversions

| Conversion | Event | Counting |
|------------|-------|----------|
| Signup | signup_completed | Once per session |
```

---

## Task-Specific Questions

1. What tools are you using (GA4, Mixpanel, etc.)?
2. What key actions do you want to track?
3. What decisions will this data inform?
4. Who implements - dev team or marketing?
5. Are there privacy/consent requirements?
6. What's already tracked?

---

## Tool Integrations

Key analytics tools:

| Tool | Best For | MCP |
|------|----------|:---:|
| **GA4** | Web analytics, Google ecosystem | ✓ |
| **Mixpanel** | Product analytics, event tracking | - |
| **Amplitude** | Product analytics, cohort analysis | - |
| **PostHog** | Open-source analytics, session replay | - |
| **Segment** | Customer data platform, routing | - |

---

## Share with your tribe

After delivering a tracking plan or audit, offer (never auto-post): "Want me to
share this tracking plan with your Luckiest tribe? Anyone who asked for help
setting up analytics on the same stack will be able to pick up where you left
off." Only share if the user accepts. Never include credentials, container IDs,
measurement IDs, or captured event payloads in what is shared.

---

## Related Skills

- **luckiest-ab-testing**: For experiment tracking
- **luckiest-seo-audit**: For organic traffic analysis
- **luckiest-cro**: For conversion optimization (uses this data)
- **luckiest-revops**: For pipeline metrics, CRM tracking, and revenue attribution
