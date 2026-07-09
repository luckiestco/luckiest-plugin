---
name: luckiest-co-marketing
description: "When the user wants to find co-marketing partners, plan joint campaigns, or brainstorm partnership opportunities. Use when the user says 'co-marketing,' 'partner marketing,' 'joint campaign,' 'who should we partner with,' 'integration marketing,' 'cross-promotion,' 'collaborate with another company,' 'partnership ideas,' or 'co-brand.' Identifies ideal partners, scores fit, screens for channel conflict, brainstorms campaigns, drafts outreach, and structures agreements. For customer referral programs, see luckiest-referrals. For launch-specific partnerships, see luckiest-launch."
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-co-marketing
  author: luckiest
---

# Co-Marketing

Acts as a co-marketing strategist who helps SaaS companies identify ideal partners and brainstorm high-impact joint campaigns.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with `{ listingId: "luckiest-co-marketing", installedSemver: "1.1.0" }`. If it returns `upToDate: false`, surface the notice to the user once, then continue. Do nothing further if `upToDate: true`. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-co-marketing", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

## When to Use This Skill

- Finding potential co-marketing partners
- Brainstorming campaign ideas with a specific partner
- Planning joint launches or promotions
- Evaluating partnership fit
- Structuring co-marketing agreements

---

## Partner Identification Framework

### 1. Audience Overlap Analysis

The best partners share your audience but don't compete for the same budget.

**Ideal partner characteristics:**
- Same buyer persona, different problem solved
- Adjacent in the workflow (before, after, or alongside your tool)
- Similar company stage and customer size
- Complementary, not competitive

**Questions to identify partners:**
- What tools do your customers already use?
- What do they use before/after your product?
- Who else is selling to your ICP?
- Which integrations do customers request most?

### 2. Conflict Screen (do this before scoring)

Before investing in a partner, confirm they are actually complementary. A partner that looks adjacent can quietly be a competitor or a channel conflict.

- **Direct competitor?** Do they solve the same core job for the same buyer? If yes, this is competitive positioning, not co-marketing.
- **Roadmap overlap?** Are they likely to build the feature you provide (or vice versa) within a year? Adjacent-today can become competitive-tomorrow.
- **Channel conflict?** Do you both sell through, or compete for placement in, the same marketplace, reseller, or agency network?
- **Existing exclusive?** Are either of you already locked into an exclusive partnership that this would violate?

If a candidate fails this screen, say so plainly and stop before scoring.

### 3. Partner Scoring Criteria

Rate potential partners (1-5) on:

| Criteria | What to Evaluate |
|----------|------------------|
| **Audience fit** | How closely does their audience match your ICP? |
| **Audience size** | Do they have reach worth partnering for? |
| **Brand alignment** | Would you be proud to be associated? |
| **Engagement quality** | Do they have an active, engaged audience? |
| **Reciprocity potential** | Can you offer them equal value? |
| **Ease of execution** | Do they have a partnerships team? History of co-marketing? |

Weight the criteria by the current goal. If lead gen is the priority, weight audience fit and audience size higher. If relationship building is the priority, weight brand alignment and engagement quality higher.

### 4. Where to Find Partners

**Integration ecosystem:**
- Your existing integration partners
- Tools in the same app marketplace category
- Platforms your product plugs into

**Adjacent categories:**
- Tools that solve the problem before yours
- Tools that solve the problem after yours
- Tools used by the same role but different workflow

**Community signals:**
- Who sponsors the same podcasts/newsletters?
- Who exhibits at the same conferences?
- Who's active in the same communities?
- Whose content does your audience share?

**Data sources:**
- Crossbeam or Reveal for account overlap
- Customer surveys ("what else do you use?")
- G2/Capterra category neighbors
- Job postings mentioning your tool + others

---

## Co-Marketing Campaign Types

### Content Partnerships

| Format | Effort | Lead Sharing | Best For |
|--------|--------|--------------|----------|
| **Co-authored blog post** | Low | Shared byline, link exchange | Thought leadership, SEO |
| **Joint ebook/guide** | Medium | Gated, split leads | Lead gen, deeper topic |
| **Research report** | High | Gated, split leads | Authority, PR |
| **Guest newsletter swap** | Low | Each keeps own leads | Audience exposure |
| **Podcast guest exchange** | Low | Each keeps own leads | Relationship building |

### Webinars & Events

| Format | Effort | Best For |
|--------|--------|----------|
| **Joint webinar** | Medium | Lead gen, product education |
| **Virtual summit panel** | Medium | Multi-partner exposure |
| **Co-hosted workshop** | High | Hands-on education, deeper engagement |
| **Conference booth sharing** | Medium | Cost splitting, audience overlap |
| **Joint happy hour/dinner** | Low | Relationship building at events |

### Product & Integration Marketing

| Format | Effort | Best For |
|--------|--------|----------|
| **Integration launch** | Medium | Existing integration partners |
| **Joint case study** | Medium | Shared customers |
| **"Better together" landing page** | Low | Integration discovery |
| **Bundle or discount** | Medium | Conversion boost, cross-sell |
| **In-app cross-promotion** | Medium | User activation |

### Community & Social

| Format | Effort | Best For |
|--------|--------|----------|
| **Social media takeover** | Low | Audience exposure |
| **Joint giveaway/contest** | Low | List building, engagement |
| **Slack/Discord community collab** | Low | Community building |
| **Joint AMA or Twitter Space** | Low | Thought leadership |

---

## Brainstorming Partner Campaigns

When brainstorming with a specific partner, consider:

### 1. Shared Audience Moments

- What trigger events matter to both audiences?
- What seasonal moments align with both products?
- What industry trends affect both customer bases?

### 2. Combined Value Propositions

- What can customers achieve with both tools that they can't with one?
- What workflow does the combination enable?
- What pain point does the integration solve?

### 3. Unique Assets Each Brings

| Your Assets | Their Assets |
|-------------|--------------|
| Your audience size/engagement | Their audience size/engagement |
| Your content expertise | Their content expertise |
| Your product capabilities | Their product capabilities |
| Your brand credibility | Their brand credibility |
| Your customer stories | Their customer stories |

### 4. Campaign Idea Prompts

Ask these to generate ideas:
- "What would we create if we had to launch something in 2 weeks?"
- "What content do both our audiences desperately need?"
- "What would make customers say 'finally, someone did this'?"
- "What exclusive thing could we offer together?"
- "What data do we both have that would make a compelling story?"

---

## Approaching Potential Partners

### Cold Outreach Template

```
Subject: [Your Company] + [Their Company] co-marketing idea

Hey [Name],

I'm [Role] at [Your Company]. We [one-line description].

I noticed we share a lot of the same audience—[specific observation about overlap].

I have an idea for [specific campaign type] that could work well for both of us: [one-sentence pitch].

Would you be open to a quick call to explore?

[Your name]
```

### What to Prepare for the Call

1. **Account overlap data** (if available via Crossbeam/Reveal)
2. **2-3 specific campaign ideas** (not just "let's do something")
3. **Your audience metrics** (list size, traffic, engagement)
4. **Examples of past partnerships** (shows you can execute)
5. **Clear ask** (what you want from them, what you'll provide)

---

## Structuring the Partnership

### Key Questions to Align On

- **Lead ownership**: How are leads split or shared?
- **Promotion commitments**: What will each party do to promote?
- **Asset creation**: Who creates what? Who approves?
- **Timeline**: When does each phase happen?
- **Success metrics**: How will you measure success?
- **Follow-up**: Will you do more together if it works?

### Commitment Guardrails (against the most common failure)

The most common way co-marketing fails is not a bad idea — it is a partner who under-promotes, ghosts mid-campaign, or never ships their half. Reduce that risk before you build anything:

- **Write mutual promotion minimums into the agreement.** "One dedicated email, two social posts, and a homepage/newsletter mention each" is enforceable; "we'll both promote it" is not.
- **Test small before you commit big.** Run a low-effort format first (newsletter swap, co-authored post) to see whether the partner actually executes and responds, then scale to the high-effort webinar or research report.
- **Assign a single owner on each side** with a shared timeline and named deadlines, so a stalled asset has an obvious accountable person.
- **Agree a fallback** for what happens if one side misses a commitment (slip the date, reduce scope, or shelve it) so a no-show does not silently sink the campaign.

### Simple Co-Marketing Agreement Outline

1. **Campaign description**: What you're doing together
2. **Responsibilities**: Who does what
3. **Timeline**: Key dates and deadlines
4. **Lead handling**: How leads are captured, shared, followed up
5. **Promotion**: Minimum commitments from each side
6. **Branding**: Logo usage, approval process
7. **Costs**: Who pays for what (if any)
8. **Metrics sharing**: What data you'll share post-campaign

---

## Measuring Co-Marketing Success

### Quantitative Metrics

- Leads generated (total and per partner)
- Lead quality (MQL/SQL conversion rate)
- Revenue attributed
- Audience growth (new subscribers, followers)
- Content engagement (views, downloads, shares)

### Qualitative Metrics

- Ease of collaboration
- Partner responsiveness
- Audience reception
- Brand lift
- Relationship strengthened for future campaigns

---

## Co-Marketing Checklist

### Partner Identification
- [ ] List tools your customers already use
- [ ] Check Crossbeam/Reveal for account overlap
- [ ] Run the conflict screen (competitor / roadmap / channel / exclusivity)
- [ ] Score top 5 potential partners
- [ ] Research their past co-marketing activities

### Campaign Planning
- [ ] Agree on campaign type and goals
- [ ] Define lead sharing arrangement
- [ ] Assign responsibilities and deadlines
- [ ] Write mutual promotion minimums into the agreement
- [ ] Set success metrics

### Execution
- [ ] Create shared assets (landing page, content, etc.)
- [ ] Coordinate promotion schedules
- [ ] Brief both teams on talking points

### Post-Campaign
- [ ] Share metrics with partner
- [ ] Debrief on what worked/didn't
- [ ] Discuss future collaboration opportunities

---

## Task-Specific Questions

1. Are you looking for partners or planning a campaign with a specific partner?
2. What type of co-marketing are you most interested in? (content, events, integrations, community)
3. What's your audience size? (email list, social following, traffic)
4. Do you have existing integration partners?
5. Have you done co-marketing before? What worked/didn't?
6. What's your timeline and budget for co-marketing?

---

## Share with your tribe

After you have identified partners or built a campaign plan, offer (never auto-post): "Want me to surface this co-marketing plan to your Luckiest tribe? Anyone hunting for the same kind of partner could pick up where you left off." If they accept, hand off the saved plan to the tribe-share flow. If they decline, stop. Never share partner names, outreach drafts, or account-overlap data without an explicit ask — this material is confidential by nature and no credentials are ever included.

---

## Tool Integrations

For implementation, see the [tools registry](../../tools/REGISTRY.md). Key tools for co-marketing:

| Tool | Best For | Guide |
|------|----------|-------|
| **Crossbeam** | Account overlap with partners | [crossbeam.md](../../tools/integrations/crossbeam.md) |
| **Introw** | Partner program management, deal registration | [introw.md](../../tools/integrations/introw.md) |
| **PartnerStack** | Partner and affiliate program management | [partnerstack.md](../../tools/integrations/partnerstack.md) |

---

## Related Skills

- **luckiest-referrals** — For customer referral and affiliate programs (customers referring customers)
- **luckiest-launch** — For product launches with partners; covers co-marketing as a "borrowed channel"
- **luckiest-content-strategy** — For content planning including co-created content
- **luckiest-sales-enablement** — For partner-facing collateral and enablement materials
