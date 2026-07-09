---
name: luckiest-marketing-psychology
description: "Applies psychological principles, mental models, and behavioral science to marketing decisions. Diagnoses the real behavioral obstacle, then recommends the 2-3 highest-leverage models (not the whole catalog) with ethical, concrete applications. Use when the user wants to understand why people buy, influence behavior ethically, or make better marketing decisions. Also use when the user mentions 'psychology,' 'mental models,' 'cognitive bias,' 'persuasion,' 'behavioral science,' 'why people buy,' 'decision-making,' 'consumer behavior,' 'anchoring,' 'social proof,' 'scarcity,' 'loss aversion,' 'framing,' or 'nudge.' For applying psychology to specific pages, see luckiest-cro; for pricing tactics, see luckiest-pricing; for copy framing, see luckiest-copywriting."
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-marketing-psychology
  author: luckiest
---

# Luckiest Marketing Psychology & Mental Models

This skill applies psychological principles and mental models to marketing. It helps
the user understand why people buy, how to influence behavior ethically, and how to make
better marketing decisions.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with `{ listingId: "luckiest-marketing-psychology", installedSemver: "1.1.0" }`. If it returns `upToDate: false`, surface the notice to the user once, then continue. Do nothing further if `upToDate: true`. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-marketing-psychology", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## How to use this skill

**Check for product marketing context first.** If `.agents/product-marketing.md` exists (or
`.claude/product-marketing.md`, or the legacy `product-marketing-context.md` in older
setups), read it before applying mental models and tailor recommendations to the specific
product and audience.

**Diagnose before prescribing. Do not dump the catalog.** This skill lists ~70 models, but
the value is selection, not enumeration. For any request:

1. Identify the specific behavior the user is trying to influence and what currently blocks it.
2. Pick the **2-3 highest-leverage models** for that situation. Naming more than three at once
   dilutes focus and creates the same choice paralysis these models warn against.
3. Explain the psychology briefly, give a concrete marketing application, and note how to
   implement it ethically.
4. Flag any way the chosen tactic can backfire (see "When these backfire").

## Ethics gate (apply before recommending any persuasion tactic)

A bias catalog is dual-use. Recommend the honest version only:

- **Scarcity/urgency must be real.** Fake countdowns and invented "low stock" erode trust and
  invite legal risk. Only surface scarcity that genuinely exists.
- **Defaults and nudges keep an easy opt-out.** Guide choice; never trap it.
- **No exploiting vulnerable states.** Do not target grief, addiction, financial desperation,
  or minors with loss-aversion or urgency pressure.
- **Frame truthfully.** Positive framing is fine; misrepresenting the facts is not.

If a request can only be satisfied with a deceptive pattern, say so and offer the ethical
alternative instead.

## Foundational thinking models

Sharpen strategy and solve the right problem.

- **First Principles** — break to basic truths, ask "why" (5 Whys) instead of copying competitors.
- **Jobs to Be Done** — people "hire" a product for an outcome. A drill buyer wants a hole; frame around the job, not features.
- **Circle of Competence** — double down where genuine expertise exists; do not chase every channel.
- **Inversion** — ask "what guarantees failure?" (confusing messaging, wrong audience, slow page) and prevent each.
- **Occam's Razor** — check the obvious first (broken form, page speed) before complex attribution theories.
- **Pareto (80/20)** — find the 20% of channels/customers/content driving 80% of results; cut the rest.
- **Local vs. Global Optima** — optimizing email subject lines will not help if email is the wrong channel. Zoom out first.
- **Theory of Constraints** — fix the single bottleneck (e.g., traffic) before optimizing elsewhere (e.g., conversion).
- **Opportunity Cost** — time on a low-ROI channel is time off a high-ROI one. Compare against alternatives.
- **Law of Diminishing Returns** — the 10th blog post rarely matches the first. Know when to diversify.
- **Second-Order Thinking** — a flash sale lifts revenue (first order) but can train customers to wait for discounts (second order).
- **Map ≠ Territory** — a dashboard or persona is a model, not the customer. Stay in touch with real users.
- **Probabilistic Thinking** — plan for scenarios where the primary strategy underperforms; spread risk.
- **Barbell Strategy** — ~80% into proven channels, ~20% into experimental bets; avoid the mediocre middle.

## Understanding buyers & human psychology

How customers think, decide, and behave.

- **Fundamental Attribution Error** — when customers do not convert, examine the process before blaming them; the cause is usually situational.
- **Mere Exposure Effect** — familiarity breeds liking; consistent cross-channel presence builds preference.
- **Availability Heuristic** — case studies and testimonials make success easy to imagine, so it feels achievable.
- **Confirmation Bias** — align messaging with what the audience already believes; fighting beliefs head-on rarely works.
- **The Lindy Effect** — proven principles (clear value props, social proof) outlast trendy tactics; do not abandon fundamentals for fads.
- **Mimetic Desire** — desire is socially contagious; waitlists, exclusivity, and social proof trigger it.
- **Sunk Cost Fallacy** — kill underperforming campaigns; past spend should not justify future spend.
- **Endowment Effect** — trials, samples, and freemium let customers "own" the product and resist giving it up.
- **IKEA Effect** — customization and configuration raise perceived value and commitment.
- **Zero-Price Effect** — "free" is psychologically distinct; the jump from $1 to $0 beats $2 to $1.
- **Hyperbolic Discounting / Present Bias** — emphasize immediate benefits ("start saving time today") over distant ROI.
- **Status-Quo Bias** — reduce switching friction; make transitions feel safe ("import your data in one click").
- **Default Effect** — pre-selected options win; apply opt-out ethically.
- **Paradox of Choice** — fewer options convert better; three tiers beat seven; recommend one "best for most."
- **Goal-Gradient Effect** — progress bars and "almost there" messaging drive completion.
- **Peak-End Rule** — design memorable peaks (surprise upgrades) and strong endings (thank-you pages, follow-ups).
- **Zeigarnik Effect** — open loops pull ("you're 80% done"); abandoned carts and cliffhangers leverage this.
- **Pratfall Effect** — admitting a small flaw ("we're not the cheapest, but...") can raise trust.
- **Curse of Knowledge** — your product seems obvious to you, confusing to newcomers; test copy with outsiders.
- **Mental Accounting** — "$3/day" feels different than "$90/month" though identical; frame into favorable accounts.
- **Regret Aversion** — guarantees, trials, and "no commitment" reduce fear of regret.
- **Bandwagon Effect / Social Proof** — counts, testimonials, logos, reviews, and "trending" build confidence.

## Influencing behavior & persuasion

Ethically influence decisions (apply the ethics gate above).

- **Reciprocity** — give value first (free content, tools, generous tiers) before asking.
- **Commitment & Consistency** — get a small commitment (signup, trial); people continue in-line with it.
- **Authority Bias** — feature credentials, certifications, "featured in," and expert endorsements.
- **Liking / Similarity Bias** — relatable spokespeople and founder stories; "built by marketers for marketers."
- **Unity Principle** — position the brand inside the customer's tribe; use insider language and shared values.
- **Scarcity / Urgency** — limited-time or low-stock signals raise value. Use ONLY when genuine.
- **Foot-in-the-Door** — small request first (free trial), then escalate (paid → annual → enterprise).
- **Door-in-the-Face** — show enterprise pricing first; the affordable starter then feels reasonable.
- **Loss Aversion / Prospect Theory** — losses hurt ~2x gains; "don't miss out" often beats "you could gain."
- **Anchoring Effect** — show the higher price first (original, competitor, enterprise) to set expectations.
- **Decoy Effect** — a clearly-worse third tier makes the preferred tier the obvious choice.
- **Framing Effect** — "90% success" vs. "10% failure" are identical but feel different; frame positively and truthfully.
- **Contrast Effect** — show the "before" clearly so the "after" reads as a vivid improvement.

## Pricing psychology

How people perceive and respond to prices. For deeper pricing work, see **luckiest-pricing**.

- **Charm Pricing / Left-Digit Effect** — $99 feels much cheaper than $100; use .99/.95 for value products.
- **Rounded-Price (Fluency) Effect** — round numbers feel premium; $500 signals quality, $497 signals value.
- **Rule of 100** — under $100 show percentage off ("20% off"); over $100 show absolute off ("$100 off").
- **Price Relativity / Good-Better-Best** — three tiers, middle is the target; expensive tier anchors, cheap tier grounds.
- **Mental Accounting (Pricing)** — "$1/day" or "less than your morning coffee" reframes the same expense.

## Design & delivery models

Design effective marketing systems.

- **Hick's Law** — more/complex choices slow decisions; one clear CTA beats three, fewer form fields beat more.
- **AIDA Funnel** — Attention → Interest → Desire → Action; capture attention before building desire.
- **Rule of 7** — ~7 touchpoints before converting; build multi-touch campaigns (retargeting, sequences).
- **Nudge Theory / Choice Architecture** — defaults, ordering, and friction reduction guide behavior without restricting it.
- **BJ Fogg Behavior Model** — Behavior = Motivation × Ability × Prompt; all three must be present.
- **EAST Framework** — make it Easy, Attractive, Social, Timely.
- **COM-B Model** — behavior needs Capability, Opportunity, Motivation; address all three.
- **Activation Energy** — reduce starting friction (pre-fill forms, templates, quick wins).
- **North Star Metric** — one metric capturing delivered value; align all efforts toward it.
- **The Cobra Effect** — incentives can backfire (a referral bonus attracting gamers); test incentive structures.

## Growth & scaling models

How marketing compounds and scales.

- **Feedback Loops** — build virtuous cycles (more users → more content → better SEO → more users).
- **Compounding** — consistent content/SEO/brand compound; start early.
- **Network Effects** — value grows with users; design shared workspaces, integrations, communities.
- **Flywheel Effect** — content → traffic → leads → customers → case studies → more content.
- **Switching Costs** — raise them ethically via integrations, data, and workflow adoption.
- **Exploration vs. Exploitation** — keep working channels; allocate some budget to experiments.
- **Critical Mass / Tipping Point** — reach self-sustaining scale in one segment before expanding. Depth before breadth.
- **Survivorship Bias** — study failed campaigns too; the viral hit had 99 invisible failures.

## When these backfire (check before recommending)

- **Scarcity/urgency, faked** — erodes trust fast and invites regulatory risk. Only surface real scarcity.
- **Too many nudges** — stacking defaults, popups, and urgency produces manipulation fatigue and higher bounce/unsubscribe.
- **Decoy/anchoring overdone** — obvious price manipulation reads as insulting and damages brand.
- **Discount-driven urgency, repeated** — trains customers to wait for the next sale (second-order effect).
- **Social proof without substance** — invented counts or fake reviews backfire when exposed.
- **Foot-in-the-door escalation, too aggressive** — early over-asking reads as bait-and-switch.

## Quick reference

Match the challenge to a few models, not the whole list.

| Challenge | Relevant models |
|-----------|-----------------|
| Low conversions | Hick's Law, Activation Energy, BJ Fogg, friction reduction |
| Price objections | Anchoring, Framing, Mental Accounting, Loss Aversion |
| Building trust | Authority, Social Proof, Reciprocity, Pratfall Effect |
| Increasing urgency | Scarcity (genuine), Loss Aversion, Zeigarnik Effect |
| Retention / churn | Endowment Effect, Switching Costs, Status-Quo Bias |
| Growth stalling | Theory of Constraints, Local vs. Global Optima, Compounding |
| Decision paralysis | Paradox of Choice, Default Effect, Nudge Theory |
| Onboarding | Goal-Gradient, IKEA Effect, Commitment & Consistency |

## Diagnostic questions

1. What specific behavior are you trying to influence?
2. What does the customer believe before encountering your marketing?
3. Where in the journey (awareness → consideration → decision) is this?
4. What currently prevents the desired action?
5. Have you tested this with real customers?

## Share with your tribe

After delivering a psychology recommendation or teardown, offer (never auto-post): "Want me to
surface this to your Luckiest tribe? Anyone who asked for help on the same behavioral problem
can see which models you applied and how." If the user accepts, hand off the summary to the
tribe-share flow. If they decline, stop. Do not share when the underlying material is
private-by-nature (customer data, unreleased pricing).

## Related skills

- **luckiest-cro** — apply psychology to page optimization (incl. pricing-page work).
- **luckiest-copywriting** — write copy using psychological principles.
- **luckiest-popups** — use triggers and psychology in popups.
- **luckiest-pricing** — pricing tactics.
- **luckiest-ab-testing** — test psychological hypotheses.
