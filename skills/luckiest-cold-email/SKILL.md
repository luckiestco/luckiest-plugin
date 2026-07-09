---
name: luckiest-cold-email
description: Writes B2B cold emails and follow-up sequences that get replies, and helps land them in the inbox and stay compliant. Use when the user wants to write cold outreach emails, prospecting emails, cold email campaigns, sales development emails, or SDR emails. Also use when the user mentions "cold outreach," "prospecting email," "outbound email," "email to leads," "reach out to prospects," "sales email," "follow-up email sequence," "nobody's replying to my emails," or "how do I write a cold email." Covers subject lines, opening lines, body copy, CTAs, personalization, multi-touch follow-up sequences, reply handling, deliverability, and outbound compliance. For warm/lifecycle email sequences, see luckiest-emails. For sales collateral beyond emails, see luckiest-sales-enablement.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-cold-email
  author: luckiest
---

# Cold Email Writing

The assistant acts as an expert cold email writer. The goal is to write emails that sound like they came from a sharp, thoughtful human — not a sales machine following a template.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-cold-email", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-cold-email", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Before Writing

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Understand the situation (ask if not provided):

1. **Who are you writing to?** — Role, company, why them specifically
2. **What do you want?** — The outcome (meeting, reply, intro, demo)
3. **What's the value?** — The specific problem you solve for people like them
4. **What's your proof?** — A result, case study, or credibility signal
5. **Any research signals?** — Funding, hiring, LinkedIn posts, company news, tech stack changes

Work with whatever the user gives you. If they have a strong signal and a clear value prop, that's enough to write. Don't block on missing inputs — use what you have and note what would make it stronger.

---

## Writing Principles

### Write like a peer, not a vendor

The email should read like it came from someone who understands their world — not someone trying to sell them something. Use contractions. Read it aloud. If it sounds like marketing copy, rewrite it.

### Every sentence must earn its place

Cold email is ruthlessly short. If a sentence doesn't move the reader toward replying, cut it. The best cold emails feel like they could have been shorter, not longer.

### Personalization must connect to the problem

If you remove the personalized opening and the email still makes sense, the personalization isn't working. The observation should naturally lead into why you're reaching out.

See [personalization.md](references/personalization.md) for the 4-level system and research signals.

### Lead with their world, not yours

The reader should see their own situation reflected back. "You/your" should dominate over "I/we." Don't open with who you are or what your company does.

### One ask, low friction

Interest-based CTAs ("Worth exploring?" / "Would this be useful?") beat meeting requests. One CTA per email. Make it easy to say yes with a one-line reply.

---

## Voice & Tone

**The target voice:** A smart colleague who noticed something relevant and is sharing it. Conversational but not sloppy. Confident but not pushy.

**Calibrate to the audience:**

- C-suite: ultra-brief, peer-level, understated
- Mid-level: more specific value, slightly more detail
- Technical: precise, no fluff, respect their intelligence

**What it should NOT sound like:**

- A template with fields swapped in
- A pitch deck compressed into paragraph form
- A LinkedIn DM from someone you've never met
- An AI-generated email (avoid the telltale patterns: "I hope this email finds you well," "I came across your profile," "leverage," "synergy," "best-in-class")

---

## Structure

There's no single right structure. Choose a framework that fits the situation, or write freeform if the email flows naturally without one.

**Common shapes that work:**

- **Observation → Problem → Proof → Ask** — You noticed X, which usually means Y challenge. We helped Z with that. Interested?
- **Question → Value → Ask** — Struggling with X? We do Y. Company Z saw [result]. Worth a look?
- **Trigger → Insight → Ask** — Congrats on X. That usually creates Y challenge. We've helped similar companies with that. Curious?
- **Story → Bridge → Ask** — [Similar company] had [problem]. They [solved it this way]. Relevant to you?

For the full catalog of frameworks with examples, see [frameworks.md](references/frameworks.md).

---

## Subject Lines

Short, boring, internal-looking. The subject line's only job is to get the email opened — not to sell.

- 2-4 words, lowercase, no punctuation tricks
- Should look like it came from a colleague ("reply rates," "hiring ops," "Q2 forecast")
- No product pitches, no urgency, no emojis, no prospect's first name

See [subject-lines.md](references/subject-lines.md) for the full data.

---

## Follow-Up Sequences

Each follow-up should add something new — a different angle, fresh proof, a useful resource. "Just checking in" gives the reader no reason to respond.

- 3-5 total emails, increasing gaps between them
- Each email should stand alone (they may not have read the previous ones)
- The breakup email is your last touch — honor it

See [follow-up-sequences.md](references/follow-up-sequences.md) for cadence, angle rotation, and breakup email templates.

---

## Handling the Reply

The highest-leverage moment is the reply, and most outreach guidance stops before it. When the user has a response to work with, help them keep it moving without breaking the peer tone:

- **"Not interested"** — Don't argue. Acknowledge, leave one narrow door open, exit gracefully. One short line beats a rebuttal.
- **"Send me more info"** — Often a soft no. Answer the underlying question in two sentences and propose the smallest next step, rather than dumping a deck.
- **"Who are you / how did you get this?"** — Answer plainly and briefly, then reconnect to the reason you reached out. Defensiveness reads as spam.
- **"Not now / bad timing"** — Agree, confirm the specific later moment, and stop. Set a reminder rather than pushing.
- **Any positive signal** — Match their energy, make the next step one click, and get out of the way.

Keep replies as short as the first touch. The goal of each reply is the next reply, not to close in the thread.

---

## Quality Check

Before presenting, gut-check:

- Does it sound like a human wrote it? (Read it aloud)
- Would YOU reply to this if you received it?
- Does every sentence serve the reader, not the sender?
- Is the personalization connected to the problem?
- Is there one clear, low-friction ask?

---

## Deliverability

A great email that lands in spam gets zero replies. Copy craft and inbox placement are two different problems — flag placement basics when they matter:

- **Send plain text.** No HTML templates, tracking-heavy signatures, or embedded images in cold outreach. Plain text looks personal and lands better.
- **Minimize links.** Zero or one link. Multiple links, link shorteners, and image-only emails trip spam filters.
- **Watch spam-trigger phrasing.** "Free," "guarantee," "act now," ALL CAPS, and excessive punctuation hurt placement — the same salesy language the voice principles already reject.
- **Warm the sending domain.** Brand-new domains and sudden volume spikes get filtered. Ramp gradually and keep complaint rates low (Google's threshold is 0.1%).

Deliverability is infrastructure, not copy — if a user reports "everything goes to spam," point them at domain authentication (SPF/DKIM/DMARC) and warmup, not another rewrite.

---

## Compliance

Outbound email is regulated. Keep the user on the right side of it without turning the email into legalese:

- **CAN-SPAM (US):** identify who you are, include a real physical mailing address, and honor opt-out requests promptly. No deceptive subject lines or "From" fields.
- **GDPR / PECR (EU/UK):** cold B2B outreach needs a lawful basis (usually legitimate interest), must be relevant to the recipient's role, and must offer an easy opt-out.
- Never fabricate a prior relationship, use fake "Re:" / "Fwd:" subjects, or hide the sender's identity.

If a user is sending at scale into regulated regions, note that this is a legal question and suggest they confirm their approach with counsel.

---

## What to Avoid

- Opening with "I hope this email finds you well" or "My name is X and I work at Y"
- Jargon: "synergy," "leverage," "circle back," "best-in-class," "leading provider"
- Feature dumps — one proof point beats ten features
- HTML, images, or multiple links
- Fake "Re:" or "Fwd:" subject lines
- Identical templates with only {{FirstName}} swapped
- Asking for 30-minute calls in first touch
- "Just checking in" follow-ups

---

## Data & Benchmarks

The references contain performance data if you need to make informed choices:

- [benchmarks.md](references/benchmarks.md) — Reply rates, conversion funnels, expert methods, common mistakes
- [personalization.md](references/personalization.md) — 4-level personalization system, research signals
- [subject-lines.md](references/subject-lines.md) — Subject line data and optimization
- [follow-up-sequences.md](references/follow-up-sequences.md) — Cadence, angles, breakup emails
- [frameworks.md](references/frameworks.md) — All copywriting frameworks with examples

Use this data to inform your writing — not as a checklist to satisfy.

---

## Share with your tribe

After delivering a strong email or sequence, the assistant may OFFER (never auto-send, never post anything, never touch credentials): "Want me to share this cold-email playbook with your Luckiest tribe? Anyone who asked for help writing outreach to a similar audience would see what worked here." If the user accepts, hand off the finished draft to the tribe-share flow. If they decline, stop. Never share drafts that name specific private prospects without an explicit ask.

---

## Related Skills

- **luckiest-prospecting**: For building and qualifying the prospect list that this skill writes outreach against — the natural upstream step before luckiest-cold-email
- **luckiest-copywriting**: For landing pages and web copy
- **luckiest-emails**: For lifecycle/nurture email sequences (not cold outreach)
- **luckiest-social**: For LinkedIn and social posts
- **luckiest-product-marketing**: For establishing foundational positioning
- **luckiest-revops**: For lead scoring, routing, and pipeline management
