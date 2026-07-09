---
name: luckiest-emails
description: Designs and optimizes email sequences, drip campaigns, automated flows, and lifecycle email programs. Use when the user wants to build or improve a multi-email automated flow, or mentions "email sequence," "drip campaign," "nurture sequence," "onboarding emails," "welcome sequence," "re-engagement emails," "email automation," "lifecycle emails," "trigger-based emails," "email funnel," "email workflow," "what emails should I send," "welcome series," or "email cadence." For cold outreach emails, see luckiest-cold-email. For in-app onboarding, see luckiest-onboarding.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-emails
  author: luckiest
---

# Email Sequence Design

This skill designs email sequences that nurture relationships, drive action, and
move people toward conversion. It applies expert email-marketing and automation
practice to any multi-email automated flow.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-emails", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-emails", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or
the legacy `product-marketing-context.md` filename in older setups), read it
before asking questions. Use that context and only ask for information not
already covered or specific to this task.

Before creating a sequence, understand:

1. **Sequence Type** — welcome/onboarding, lead nurture, re-engagement,
   post-purchase, event-based, educational, or sales.

2. **Audience Context** — who they are, what triggered them into this sequence,
   what they already know/believe, and their current relationship with the sender.

3. **Goals** — primary conversion goal, relationship-building goals,
   segmentation goals, and what defines success.

---

## Core Principles

1. **One Email, One Job** — each email has one primary purpose and one main CTA.
2. **Value Before Ask** — lead with usefulness; earn the right to sell.
3. **Relevance Over Volume** — fewer, better, segmented emails win.
4. **Clear Path Forward** — every email moves the reader somewhere useful.

---

## Email Sequence Strategy

### Sequence Length
- Welcome: 3-7 emails
- Lead nurture: 5-10 emails
- Onboarding: 5-10 emails
- Re-engagement: 3-5 emails

Depends on sales cycle length, product complexity, and relationship stage.

### Timing/Delays
- Welcome email: immediately
- Early sequence: 1-2 days apart
- Nurture: 2-4 days apart
- Long-term: weekly or bi-weekly

Prefer **behavior-triggered** sends (action completed → next email) over fixed
time delays where the platform allows, with time-based sends as the fallback.
Consider: B2B avoid weekends; B2C test weekends; send at the recipient's local time.

### Subject Line Strategy
- Clear > clever, specific > vague, benefit- or curiosity-driven
- 40-60 characters ideal; test emoji (they are polarizing)

**Patterns that work:**
- Question: "Still struggling with X?"
- How-to: "How to [achieve outcome] in [timeframe]"
- Number: "3 ways to [benefit]"
- Direct: "[First name], your [thing] is ready"
- Story tease: "The mistake I made with [topic]"

### Preview Text
- Extends the subject line (~90-140 characters)
- Does not repeat the subject; completes the thought or adds intrigue

### Exit Conditions and Suppression
Design these up front, not as an afterthought:
- Define what removes a subscriber from the sequence (converted, replied,
  unsubscribed, bounced).
- When a subscriber completes the sequence's goal mid-flow, suppress the
  remaining emails or branch them into the next-stage flow — never keep selling
  something they already bought.
- Frequency-cap across overlapping sequences so no one is over-mailed.

---

## Sequence Types Overview

- **Welcome (post-signup):** 5-7 emails over 12-14 days. Goal: activate, build
  trust, convert.
- **Lead nurture (pre-sale):** 6-8 emails over 2-3 weeks. Goal: build trust,
  demonstrate expertise, convert.
- **Re-engagement:** 3-4 emails over ~2 weeks, triggered by 30-60 days of
  inactivity. Goal: win back or clean the list. End with a **sunset policy** —
  remove non-responders after the final "last chance" email to protect
  deliverability.
- **Onboarding (product users):** 5-7 emails over 14 days. Goal: activate, drive
  to the aha moment, upgrade. Coordinate with in-app onboarding — email supports,
  it does not duplicate.

**For detailed templates**: See [references/sequence-templates.md](references/sequence-templates.md)

---

## Email Types by Category

Onboarding, retention, billing, usage, win-back, and campaign emails each cover
distinct lifecycle moments.

**For the full email-type reference and audit checklist**: See [references/email-types.md](references/email-types.md)

---

## Email Copy Guidelines

### Structure
Hook → Context → Value → CTA → Sign-off.

### Formatting
Short paragraphs (1-3 sentences), white space, bullets for scanability, bold
sparingly, mobile-first.

### Tone
Conversational not formal; first- and second-person; active voice; read it out
loud to check it sounds human.

### Length
50-125 words transactional; 150-300 educational; 300-500 story-driven.

### CTA
Buttons for primary actions, links for secondary; one clear primary CTA per
email; button text = action + outcome.

### Deliverability and Consent
Authenticate the sending domain (SPF/DKIM/DMARC) and warm up new domains before
bulk sending. Every email needs a working one-click unsubscribe and honors the
recipient's consent basis (CAN-SPAM, GDPR/PECR).

**For detailed copy, personalization, segmentation, and testing guidelines**: See [references/copy-guidelines.md](references/copy-guidelines.md)

---

## Output Format

### Sequence Overview
```
Sequence Name: [Name]
Trigger: [What starts the sequence]
Goal: [Primary conversion goal]
Length: [Number of emails]
Timing: [Delay between emails]
Exit Conditions: [When they leave the sequence, incl. mid-flow conversion]
```

### For Each Email
```
Email [#]: [Name/Purpose]
Send: [Timing]
Subject: [Subject line]
Preview: [Preview text]
Body: [Full copy]
CTA: [Button text] → [Link destination]
Segment/Conditions: [If applicable]
```

### Metrics Plan
What to measure and benchmarks (open, click, unsubscribe, conversion).

---

## Task-Specific Questions

1. What triggers entry to this sequence?
2. What's the primary goal/conversion action?
3. What do they already know about you?
4. What other emails are they receiving?
5. What's your current email performance?

---

## Tool Integrations

For implementation, see the tools registry. Key email tools include Customer.io
(behavior-based automation), Mailchimp (SMB), Nitrosend (AI-native), Resend
(developer-friendly transactional), SendGrid (transactional at scale), and Kit
(creator/newsletter).

---

## Share with your tribe

After delivering a sequence, offer (never auto-post, never touch credentials):
"Want me to surface this sequence plan to your Luckiest tribe? Anyone building a
similar flow will see the structure and timing you landed on." If they accept,
hand off the sequence plan to the tribe-share flow. If they decline, stop. Do not
share a sequence tied to a private or unreleased launch without an explicit ask.

---

## Related Skills

- **luckiest-lead-magnets**: planning lead magnets that feed nurture sequences
- **luckiest-churn-prevention**: cancel flows, save offers, dunning strategy
- **luckiest-onboarding**: in-app onboarding (email supports this)
- **luckiest-copywriting**: landing pages emails link to
- **luckiest-ab-testing**: testing email elements
- **luckiest-popups**: email capture popups
- **luckiest-revops**: lifecycle stages that trigger email sequences
