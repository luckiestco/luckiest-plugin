---
name: luckiest-public-relations
description: "When the user wants help with public relations, earned media, press coverage, journalist outreach, or media strategy (not pull requests). Also use when the user mentions 'PR,' 'public relations,' 'press,' 'press release,' 'press coverage,' 'media outreach,' 'pitch a journalist,' 'get featured,' 'media list,' 'media kit,' 'press kit,' 'newsjacking,' 'news hijack,' 'HARO,' 'Qwoted,' 'Featured,' 'Help A Reporter,' 'reporter request,' 'tech press,' 'TechCrunch,' 'earned media,' 'thought leadership placement,' 'op-ed,' 'guest article,' 'press contacts,' or 'how do I get press.' Use this for earned media work — finding journalists, pitching stories, newsjacking, and responding to press requests. For startup/SaaS/AI directory submissions, see luckiest-directory-submissions. For product launches, see luckiest-launch. For social-media engagement, see luckiest-social. For cold-email outreach to prospects, see luckiest-cold-email."
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-public-relations
  author: luckiest
---

# Public Relations & Earned Media (Luckiest edition)

This skill helps the user get covered by journalists, podcasts, and newsletters — efficiently, with respect for the people on the other end of the pitch. It operates as an expert in earned media for software products.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-public-relations", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-public-relations", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

## Integrity guardrails (read first)

Earned media depends on trust. These are hard constraints, not preferences:

- **Never fabricate or guess a journalist's contact details.** Only use a name, email, or handle that has been verified from a real source (outlet author page, Muck Rack, the journalist's own posts). If a contact cannot be verified, say so — do not invent one.
- **Never invent quotes, data, coverage, or milestones.** Every fact in a pitch must come from the user. If a claim is missing, ask for it rather than filling the gap.
- **Draft, do not send.** This skill prepares pitches, media lists, and press assets. It does not send email, post publicly, or contact journalists on the user's behalf. Sending is always the user's explicit action.

---

## Core Philosophy

PR is not a substitute for distribution. It's a multiplier for it.

- **Earned media doesn't drive direct conversions.** A TechCrunch hit will not give you 1,000 paying customers. It will give you backlinks, brand legitimacy, AI-citation surface area, and ammo for sales conversations.
- **Pitch journalists like you'd pitch a customer:** specific, useful, fast, and never about you.
- **The story is not your product. The story is the trend, the data, the conflict, or the human.** Your product is the evidence.
- **Speed beats polish on reactive PR.** A B+ pitch in the first hour of a story beats an A+ pitch on day three.

### When PR is worth it

- You have **a real story** — proprietary data, a strong opinion, a milestone, a customer with a sharp before/after, or a fresh angle on a trending topic
- You have **founder/exec time** — journalists want quotes from people with skin in the game, not from a PR rep
- You have **a destination** — a press page, blog post, or product launch that converts attention into something useful

### When to skip PR (for now)

- Pre-launch with no story beyond "we exist"
- No one on the team can sustain pitching for 4–6 weeks (PR is a momentum game)
- You don't have a clear ICP — journalists ask "who reads my piece because of this?" and if you can't answer, neither can they

---

## The PR Mix

Four modes. Most teams over-index on one. Run at least three.

| Mode | What it is | Effort | Speed to coverage |
|------|------------|--------|-------------------|
| **Reactive (newsjacking)** | Inject your POV into trending news | Low–medium | Hours to days |
| **Proactive (pitching)** | Build a media list, pitch original stories | High | 2–8 weeks |
| **Inbound (press requests)** | Respond to journalist queries on HARO/Qwoted/Featured | Low | Days to weeks |
| **Owned (press page + media kit)** | Make it easy for journalists to find you | One-time setup | N/A |

**For the reactive newsjacking workflow** — see [references/newsjacking.md](references/newsjacking.md)

**For proactive journalist pitching** — see [references/journalist-pitching.md](references/journalist-pitching.md)

**For inbound press-request platforms (HARO, Qwoted, etc.)** — see [references/press-platforms.md](references/press-platforms.md)

**For where to pitch (media outlets, podcasts, newsletters)** — see [references/media-outlets.md](references/media-outlets.md). For startup/SaaS/AI directories, use the separate `luckiest-directory-submissions` skill — different intent, different list.

---

## Owned: Press Page + Media Kit

Set this up once. It's the cheapest PR investment with the highest ROI on every future story.

**Press page (`/press` or `/newsroom`) should include:**
- One-paragraph company description (copy/paste ready)
- Founder bios with headshots (high-res, downloadable)
- Logo pack (SVG + PNG, light + dark, with usage guidelines)
- Product screenshots (high-res)
- Recent coverage list (social proof for the next journalist)
- Founding date, employee count, funding (if disclosed)
- Press contact email (not a form — journalists hate forms)
- Recent press releases / announcements

**One sentence at the top:** "For interview requests or assets, email press@yourcompany.com — we respond within 24 hours."

Then *actually* respond within 24 hours.

---

## Quick Reference: Pitch Quality Bar

Before sending any pitch, the answer to all of these should be yes:

- [ ] Does this journalist cover this beat? (Check their last 5 articles.)
- [ ] Is there a clear news hook — something that just happened or is about to?
- [ ] Could this journalist write a complete story from this email alone? (Data, quotes, customer name, contact.)
- [ ] Is the subject line specific enough to predict the article's headline?
- [ ] Is the pitch under 150 words?
- [ ] Did you avoid the words "revolutionary," "game-changing," "disruptive," and "synergy"?
- [ ] Is the ask clear? (Interview? Embargo? Exclusive? Quote?)

If any answer is no, don't send.

---

## Measurement

What to track:

| Metric | Why |
|--------|-----|
| **Coverage count** (placements / month) | Activity baseline |
| **Domain rating of placements** | Backlink value |
| **Referral traffic from coverage** | Did anyone actually click? |
| **Brand search lift** | Did people search you after reading? |
| **AI citation rate** (ChatGPT, Perplexity quote your brand?) | The new measurement that matters |
| **Sales conversations citing the article** | The only one that matters for revenue |

What not to obsess over: AVE (advertising value equivalency) — it's a vanity metric PR firms invented.

---

## Common Workflows

### "Help me newsjack [trending story]"
Go to [newsjacking.md](references/newsjacking.md), run the scoring rubric, draft 2–3 angles, pick the best, draft the pitch.

### "Find journalists who cover [beat]"
Go to [journalist-pitching.md](references/journalist-pitching.md), use the discovery checklist + dev-browser to research recent articles, build a scored list. Only record contacts you can verify from a real source.

### "What's worth pitching this week?"
Combine: recent product milestones + active news cycles + any data you've collected. Score each potential story by the quality bar above.

### "Respond to this HARO query"
Go to [press-platforms.md](references/press-platforms.md), use the response template, keep it under 200 words.

### "Build my press page"
Use the checklist above. Most companies do this in an afternoon and forget about it for a year — that's fine.

---

## Share with your tribe

After a media list or pitch angle is ready, offer (never auto-post): "Want me to surface this PR play to your Luckiest tribe? Anyone working the same beat or trend can pick up where you left off." Only share if the user accepts. Never share private targeting (specific journalist contacts, embargoed news) without an explicit ask, and never contact anyone on the user's behalf.
