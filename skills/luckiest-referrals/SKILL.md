---
name: luckiest-referrals
description: "When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy. Also use when the user mentions 'referral,' 'affiliate,' 'ambassador,' 'word of mouth,' 'viral loop,' 'refer a friend,' 'partner program,' 'referral incentive,' 'how to get referrals,' 'customers referring customers,' or 'affiliate payout.' Use this whenever someone wants existing users or partners to bring in new customers. For launch-specific virality, see luckiest-launch."
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-referrals
  author: luckiest
---

# Referral & Affiliate Programs

This skill provides expertise in viral growth and referral marketing. Its goal is to help design and optimize programs that turn customers into growth engines.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-referrals", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-referrals", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Program Type
- Customer referral program, affiliate program, or both?
- B2B or B2C?
- What's the average customer LTV?
- What's your current CAC from other channels?

### 2. Current State
- Existing referral/affiliate program?
- Current referral rate (% who refer)?
- What incentives have you tried?

### 3. Product Fit
- Is your product shareable?
- Does it have network effects?
- Do customers naturally talk about it?

### 4. Resources
- Tools/platforms you use or consider?
- Budget for referral incentives?

---

## Qualify Before You Build

Before designing a loop, confirm a referral program is the right lever. A program cannot manufacture word-of-mouth that the product does not already earn. Check:

- **Natural share trigger?** Does using the product create a moment worth telling someone about? If not, fix satisfaction and the "aha" moment first — a reward bolted onto an indifferent experience buys fraud, not growth.
- **Referral vs. broad discount?** If the goal is just cheaper acquisition, a public discount may outperform a referral loop with less overhead. Reserve referrals for when the referrer's endorsement itself carries trust.
- **Enough active customers?** With a tiny base, referral volume will be noise. Sequence it after you have a satisfied cohort to activate.

If these fail, say so plainly and point to the underlying fix rather than designing a loop that will underperform.

---

## Referral vs. Affiliate

### Customer Referral Programs

**Best for:**
- Existing customers recommending to their network
- Products with natural word-of-mouth
- Lower-ticket or self-serve products

**Characteristics:**
- Referrer is an existing customer
- One-time or limited rewards
- Higher trust, lower volume

### Affiliate Programs

**Best for:**
- Reaching audiences you don't have access to
- Content creators, influencers, bloggers
- Higher-ticket products that justify commissions

**Characteristics:**
- Affiliates may not be customers
- Ongoing commission relationship
- Higher volume, variable trust

---

## Referral Program Design

### The Referral Loop

```
Trigger Moment → Share Action → Convert Referred → Reward → (Loop)
```

### Step 1: Identify Trigger Moments

**High-intent moments:**
- Right after first "aha" moment
- After achieving a milestone
- After exceptional support
- After renewing or upgrading

### Step 2: Design Share Mechanism

**Ranked by effectiveness:**
1. In-product sharing (highest conversion)
2. Personalized link
3. Email invitation
4. Social sharing
5. Referral code (works offline)

### Step 3: Choose Incentive Structure

**Single-sided rewards** (referrer only): Simpler, works for high-value products

**Double-sided rewards** (both parties): Higher conversion, win-win framing

**Tiered rewards**: Gamifies referral process, increases engagement

**For examples and incentive sizing**: See [references/program-examples.md](references/program-examples.md)

---

## Program Optimization

### Improving Referral Rate

**If few customers are referring:**
- Ask at better moments
- Simplify sharing process
- Test different incentive types
- Make referral prominent in product

**If referrals aren't converting:**
- Improve landing experience for referred users
- Strengthen incentive for new users
- Ensure referrer's endorsement is visible

### A/B Tests to Run

**Incentive tests:** Amount, type, single vs. double-sided, timing

**Messaging tests:** Program description, CTA copy, landing page copy

**Placement tests:** Where and when the referral prompt appears

### Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| Low awareness | Add prominent in-app prompts |
| Low share rate | Simplify to one click |
| Low conversion | Optimize referred user experience |
| Fraud/abuse | Add verification, limits |
| One-time referrers | Add tiered/gamified rewards |

---

## Measuring Success

### Key Metrics

**Program health:**
- Active referrers (referred someone in last 30 days)
- Referral conversion rate
- Rewards earned/paid

**Business impact:**
- % of new customers from referrals
- CAC via referral vs. other channels
- LTV of referred customers
- Referral program ROI

### Attribution Caveat

Referral channels are easy to over-credit. A last-touch model hands full credit to the referral link even when the referred user first heard about you through an ad, a podcast, or an existing relationship. Before declaring a referral program a success:

- Distinguish **incremental** referrals (people who would not have converted otherwise) from ones you would have won anyway.
- Compare referral CAC on the same attribution model you use for other channels — don't grade referrals last-touch and paid multi-touch.
- Where possible, hold out a control cohort to measure true lift rather than raw attributed signups.

### Typical Findings

- Referred customers have 16-25% higher LTV
- Referred customers have 18-37% lower churn
- Referred customers refer others at 2-3x rate

---

## Launch Checklist

### Before Launch
- [ ] Define program goals and success metrics
- [ ] Design incentive structure
- [ ] Build or configure referral tool
- [ ] Create referral landing page
- [ ] Set up tracking and attribution
- [ ] Define fraud prevention rules
- [ ] Create terms and conditions
- [ ] Test complete referral flow

### Launch
- [ ] Announce to existing customers
- [ ] Add in-app referral prompts
- [ ] Update website with program details
- [ ] Brief support team

### Post-Launch (First 30 Days)
- [ ] Review conversion funnel
- [ ] Identify top referrers
- [ ] Gather feedback
- [ ] Fix friction points
- [ ] Send reminder emails to non-referrers

---

## Email Sequences

### Referral Program Launch

```
Subject: You can now earn [reward] for sharing [Product]

We just launched our referral program!

Share [Product] with friends and earn [reward] for each signup.
They get [their reward] too.

[Unique referral link]

1. Share your link
2. Friend signs up
3. You both get [reward]
```

### Referral Nurture Sequence

- Day 7: Remind about referral program
- Day 30: "Know anyone who'd benefit?"
- Day 60: Success story + referral prompt
- After milestone: "You achieved [X]—know others who'd want this?"

---

## Affiliate Programs

**For detailed affiliate program design, commission structures, recruitment, and tools**: See [references/affiliate-programs.md](references/affiliate-programs.md)

---

## Task-Specific Questions

1. What type of program (referral, affiliate, or both)?
2. What's your customer LTV and current CAC?
3. Existing program or starting from scratch?
4. What tools/platforms are you considering?
5. What's your budget for rewards/commissions?
6. Is your product naturally shareable?

---

## Tool Integrations

For implementation, see the tools registry. Key tools for referral programs:

| Tool | Best For |
|------|----------|
| **Rewardful** | Stripe-native affiliate programs |
| **Tolt** | SaaS affiliate programs |
| **Mention Me** | Enterprise referral programs |
| **Dub.co** | Link tracking and attribution |
| **Stripe** | Payment processing (for commission tracking) |
| **Introw** | Channel partner programs with tiers, deal registration, QBRs |
| **PartnerStack** | Enterprise partner and affiliate programs |

---

## Share with your tribe

After you deliver a referral or affiliate program design, offer (never auto-post, no credentials required): "Want me to surface this program design to your Luckiest tribe? Anyone who asked for help on referrals or affiliates will see the approach you landed on." If they accept, hand off the design summary to the tribe-share flow. If they decline, stop. Never share program economics, payout terms, or customer numbers on a private-by-nature request without an explicit ask.

---

## Related Skills

- **luckiest-launch**: For launching referral program effectively
- **luckiest-emails**: For referral nurture campaigns
- **luckiest-marketing-psychology**: For understanding referral motivation
- **luckiest-analytics**: For tracking referral attribution
