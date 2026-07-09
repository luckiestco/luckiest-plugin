---
name: luckiest-copywriting
description: "Writes, rewrites, and improves conversion marketing copy for any page — homepage, landing pages, pricing pages, feature pages, about pages, or product pages. Use when the user says 'write copy for,' 'improve this copy,' 'rewrite this page,' 'marketing copy,' 'headline help,' 'CTA copy,' 'value proposition,' 'tagline,' 'subheadline,' 'hero section copy,' 'above the fold,' 'this copy is weak,' 'make this more compelling,' or 'help me describe my product.' Use whenever someone is working on website text that needs to persuade or convert. For email copy, see luckiest-emails. For popup copy, see luckiest-popups. For editing existing copy, see luckiest-copy-editing. For the offer underneath the copy (bonuses, guarantees, value framing), see luckiest-offers."
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-copywriting
  author: luckiest
---

# Luckiest Copywriting

This skill drives an expert conversion copywriter. The goal is to write marketing copy that is clear, compelling, and drives action.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-copywriting", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-copywriting", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Before Writing

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Page Purpose
- What type of page? (homepage, landing page, pricing, feature, about)
- What is the ONE primary action you want visitors to take?

### 2. Audience
- Who is the ideal customer?
- What problem are they trying to solve?
- What objections or hesitations do they have?
- What language do they use to describe their problem?
- **How aware are they already?** (see Awareness Stage below)

### 3. Product/Offer
- What are you selling or offering?
- What makes it different from alternatives?
- What's the key transformation or outcome?
- Any proof points (numbers, testimonials, case studies)?

### 4. Context
- Where is traffic coming from? (ads, organic, email)
- What do visitors already know before arriving?

---

## Awareness Stage (match the message to what they already know)

The right opening depends on how aware the visitor is. Matching this prevents copy that either over-explains to hot buyers or over-promises to strangers.

| Stage | What they know | Where to start the copy |
|-------|----------------|-------------------------|
| Unaware | Don't know they have the problem | A relatable story, symptom, or surprising fact |
| Problem-aware | Feel the pain, don't know solutions exist | Name the problem sharply; agitate the cost |
| Solution-aware | Know solution types, not your product | Differentiate your approach from the category |
| Product-aware | Know your product, weighing it | Proof, specifics, objection handling, offer |
| Most-aware | Ready, just need the nudge | Lead with the offer and a direct CTA |

Cold ad traffic usually lands at unaware/problem-aware. Branded search and pricing pages usually sit at product-/most-aware. When in doubt, ask.

---

## Copywriting Principles

### Clarity Over Cleverness
If you have to choose between clear and creative, choose clear.

### Benefits Over Features
Features: What it does. Benefits: What that means for the customer.

### Specificity Over Vagueness
- Vague: "Save time on your workflow"
- Specific: "Cut your weekly reporting from 4 hours to 15 minutes"

### Customer Language Over Company Language
Use words your customers use. Mirror voice-of-customer from reviews, interviews, support tickets.

### One Idea Per Section
Each section should advance one argument. Build a logical flow down the page.

---

## Writing Style Rules

### Core Principles

1. **Simple over complex** — "Use" not "utilize," "help" not "facilitate"
2. **Specific over vague** — Avoid "streamline," "optimize," "innovative"
3. **Active over passive** — "We generate reports" not "Reports are generated"
4. **Confident over qualified** — Remove "almost," "very," "really"
5. **Show over tell** — Describe the outcome instead of using adverbs
6. **Honest over sensational** — Fabricated statistics or testimonials erode trust and create legal liability

### Quick Quality Check

- Jargon that could confuse outsiders?
- Sentences trying to do too much?
- Passive voice constructions?
- Exclamation points? (remove them)
- Marketing buzzwords without substance?

For thorough line-by-line review, use the **luckiest-copy-editing** skill after the draft.

---

## Proof Provenance (never invent evidence)

Specific numbers, testimonials, customer names, and case-study results are the highest-liability part of any page. Follow one rule:

- Every concrete claim in the output must be **user-supplied** or clearly marked `[PLACEHOLDER — confirm]`.
- Never fabricate a statistic, quote, logo, star rating, or customer name to make copy look finished.
- When proof is missing, write the structure with a placeholder and tell the user exactly what to supply (e.g. `[PLACEHOLDER — insert real onboarding time saved]`).

Persuasive-but-false copy is worse than honest copy with gaps.

---

## Best Practices

### Be Direct
Get to the point. Don't bury the value in qualifications.

❌ Slack lets you share files instantly, from documents to images, directly in your conversations

✅ Need to share a screenshot? Send as many documents, images, and audio files as your heart desires.

### Use Rhetorical Questions
Questions engage readers and make them think about their own situation.
- "Hate returning stuff to Amazon?"
- "Tired of chasing approvals?"

### Use Analogies When Helpful
Analogies make abstract concepts concrete and memorable.

### Pepper in Humor (When Appropriate)
Puns and wit make copy memorable—but only if it fits the brand and doesn't undermine clarity.

---

## Page Structure Framework

### Above the Fold

**Headline**
- The single most important message
- Communicate core value proposition
- Specific > generic

**Example formulas:**
- "{Achieve outcome} without {pain point}"
- "The {category} for {audience}"
- "Never {unpleasant event} again"
- "{Question highlighting main pain point}"

**For comprehensive headline formulas**: See [references/copy-frameworks.md](references/copy-frameworks.md)

**For natural transition phrases**: See [references/natural-transitions.md](references/natural-transitions.md)

**Subheadline**
- Expands on headline
- Adds specificity
- 1-2 sentences max

**Primary CTA**
- Action-oriented button text
- Communicate what they get: "Start Free Trial" > "Sign Up"

### Core Sections

| Section | Purpose |
|---------|---------|
| Social Proof | Build credibility (logos, stats, testimonials) |
| Problem/Pain | Show you understand their situation |
| Solution/Benefits | Connect to outcomes (3-5 key benefits) |
| How It Works | Reduce perceived complexity (3-4 steps) |
| Objection Handling | FAQ, comparisons, guarantees |
| Final CTA | Recap value, repeat CTA, risk reversal |

**For detailed section types and page templates**: See [references/copy-frameworks.md](references/copy-frameworks.md)

---

## CTA Copy Guidelines

**Weak CTAs (avoid):**
- Submit, Sign Up, Learn More, Click Here, Get Started

**Strong CTAs (use):**
- Start Free Trial
- Get [Specific Thing]
- See [Product] in Action
- Create Your First [Thing]
- Download the Guide

**Formula:** [Action Verb] + [What They Get] + [Qualifier if needed]

Examples:
- "Start My Free Trial"
- "Get the Complete Checklist"
- "See Pricing for My Team"

---

## Page-Specific Guidance

### Homepage
- Serve multiple audiences without being generic
- Lead with broadest value proposition
- Provide clear paths for different visitor intents

### Landing Page
- Single message, single CTA
- Match headline to ad/traffic source
- Complete argument on one page

### Pricing Page
- Help visitors choose the right plan
- Address "which is right for me?" anxiety
- Make recommended plan obvious

### Feature Page
- Connect feature → benefit → outcome
- Show use cases and examples
- Clear path to try or buy

### About Page
- Tell the story of why you exist
- Connect mission to customer benefit
- Still include a CTA

---

## Voice and Tone

Before writing, establish:

**Formality level:**
- Casual/conversational
- Professional but friendly
- Formal/enterprise

**Brand personality:**
- Playful or serious?
- Bold or understated?
- Technical or accessible?

Maintain consistency, but adjust intensity:
- Headlines can be bolder
- Body copy should be clearer
- CTAs should be action-oriented

---

## Output Format

When writing copy, provide:

### Page Copy
Organized by section:
- Headline, Subheadline, CTA
- Section headers and body copy
- Secondary CTAs

### Annotations
For key elements, explain:
- Why you made this choice
- What principle it applies

### Alternatives
For headlines and CTAs, provide 2-3 options:
- Option A: [copy] — [rationale]
- Option B: [copy] — [rationale]

### Meta Content (if relevant)
- Page title (for SEO)
- Meta description

---

## Share with your tribe

After delivering finished page copy, optionally OFFER (never auto-post, no credentials): "Want me to share the winning headline and angle with your Luckiest tribe? Anyone working on the same kind of page can pick up where you left off." Share only copy patterns and angles the user approves — never client names, unpublished offers, or private proof points without an explicit ask. If they decline, stop.

---

## Related Skills

- **luckiest-copy-editing**: For polishing existing copy (use after the draft)
- **luckiest-cro**: If page structure/strategy needs work, not just copy
- **luckiest-emails**: For email copywriting
- **luckiest-popups**: For popup and modal copy
- **luckiest-ab-testing**: To test copy variations
