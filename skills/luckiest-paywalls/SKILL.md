---
name: luckiest-paywalls
description: When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates. Also use when the user mentions "paywall," "upgrade screen," "upgrade modal," "upsell," "feature gate," "convert free to paid," "freemium conversion," "trial expiration screen," "limit reached screen," "plan upgrade prompt," "in-app pricing," "free users won't upgrade," "trial to paid conversion," or "how do I get users to pay." Use this for any in-product moment where the user is asking someone to upgrade. Distinct from public pricing pages (see luckiest-cro) — this focuses on in-product upgrade moments where the user has already experienced value. For pricing decisions, see luckiest-pricing.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-paywalls
  author: luckiest
---

# Paywall and Upgrade Screen CRO

This skill guides expert work on in-app paywalls and upgrade flows. The goal is to convert free users to paid, or upgrade users to higher tiers, at moments when they have experienced enough value to justify the commitment.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-paywalls", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-paywalls", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Initial Assessment

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

**Verify the funnel is instrumented before optimizing.**
Before recommending tests or redesigns, confirm the paywall funnel is actually tracked: impression, view-to-click, click-to-checkout, checkout completion, and post-upgrade retention. If these events are not captured, fixing instrumentation is the first recommendation — optimization without measurement is guessing.

Before providing recommendations, understand:

1. **Upgrade Context** - Freemium → Paid? Trial → Paid? Tier upgrade? Feature upsell? Usage limit? Reactivation or price change?
2. **Product Model** - What is free? What is behind the paywall? What triggers prompts? Current conversion rate?
3. **User Journey** - When does this appear? What have they experienced? What are they trying to do?
4. **Platform** - Web, mobile app, or both? Mobile changes what is possible (see Platform Constraints).

---

## Core Principles

### 1. Value Before Ask
- The user should have experienced real value first
- The upgrade should feel like a natural next step
- Timing: after the "aha moment," not before

### 2. Show, Don't Just Tell
- Demonstrate the value of paid features
- Preview what they are missing
- Make the upgrade feel tangible

### 3. Friction-Free Path
- Easy to upgrade when ready
- Do not make them hunt for pricing

### 4. Respect the No
- Do not trap or pressure
- Make it easy to continue free
- Maintain trust for future conversion

---

## Paywall Trigger Points

### Feature Gates
When the user clicks a paid-only feature:
- Clear explanation of why it is paid
- Show what the feature does
- Quick path to unlock
- Option to continue without

### Usage Limits
When the user hits a limit:
- Clear indication of limit reached
- Show what upgrading provides
- Do not block abruptly

### Trial Expiration
When the trial is ending:
- Early warnings (7, 3, 1 day)
- Clear "what happens" on expiration
- Summarize value received

### Time-Based Prompts
After X days of free use:
- Gentle upgrade reminder
- Highlight unused paid features
- Easy to dismiss

### Reactivation and Price Changes
For lapsed or churned users, and existing users at a price increase:
- Reactivation: acknowledge the return, summarize what they built before, offer a low-friction path back
- Price change: grandfather where fair, explain the change plainly, give a clear window to lock the old rate. Avoid surprise increases — they drive churn and support load.

---

## Paywall Screen Components

1. **Headline** - Focus on what they get: "Unlock [Feature] to [Benefit]"
2. **Value Demonstration** - Preview, before/after, "With Pro you could..."
3. **Feature Comparison** - Highlight key differences, current plan marked
4. **Pricing** - Clear, simple, annual vs. monthly options
5. **Social Proof** - Customer quotes, "X teams use this"
6. **CTA** - Specific and value-oriented: "Start Getting [Benefit]"
7. **Escape Hatch** - Clear "Not now" or "Continue with Free"

---

## Specific Paywall Types

### Feature Lock Paywall
```
[Lock Icon]
This feature is available on Pro

[Feature preview/screenshot]

[Feature name] helps you [benefit]:
• [Capability]
• [Capability]

[Upgrade to Pro - $X/mo]
[Maybe Later]
```

### Usage Limit Paywall
```
You've reached your free limit

[Progress bar at 100%]

Free: 3 projects | Pro: Unlimited

[Upgrade to Pro]  [Delete a project]
```

### Trial Expiration Paywall
```
Your trial ends in 3 days

What you'll lose:
• [Feature used]
• [Data created]

What you've accomplished:
• Created X projects

[Continue with Pro]
[Remind me later]  [Downgrade]
```

---

## Platform Constraints (mobile)

Native mobile paywalls are not free-form web pages. Account for store rules:

- **In-app purchase requirement** - Apple and Google generally require digital subscriptions to go through StoreKit / Play Billing, which caps copy, pricing display, and CTA behavior.
- **External-link entitlements** - Post-litigation, some external-purchase links are allowed in some regions, but the rules are narrow and shifting. Do not assume a "just take them to the website" flow is compliant; verify against current store policy.
- **Required elements** - Store review often requires visible price, billing period, terms, and a restore-purchases path. Omitting these can block release.
- **Server-side entitlement** - Grant access based on validated receipts, not client state, so paid features unlock reliably across devices.

When the platform is unknown, ask before giving mobile-specific pricing or CTA copy.

---

## Timing and Frequency

### When to Show
- After a value moment, before frustration
- After activation / aha moment
- When hitting genuine limits

### When NOT to Show
- During onboarding (too early)
- When they are in a flow
- Repeatedly after dismissal

### Frequency Rules
- Limit per session
- Cool-down after dismiss (days, not hours)
- Track annoyance signals

---

## Upgrade Flow Optimization

### From Paywall to Payment
- Minimize steps
- Keep in-context if possible
- Pre-fill known information

### Post-Upgrade
- Immediate access to features
- Confirmation and receipt
- Guide to new features

---

## A/B Testing

### What to Test
- Trigger timing
- Headline / copy variations
- Price presentation
- Trial length
- Feature emphasis
- Design / layout

### Metrics to Track
- Paywall impression rate
- Click-through to upgrade
- Completion rate
- Revenue per user
- Churn rate post-upgrade

**For comprehensive experiment ideas**: load [references/experiments.md](references/experiments.md) when the user wants a menu of tests to run or is scoping an experimentation roadmap.

---

## Anti-Patterns to Avoid

### Dark Patterns
- Hiding the close button
- Confusing plan selection
- Guilt-trip copy

### Conversion Killers
- Asking before value delivered
- Too frequent prompts
- Blocking critical flows
- Complicated upgrade process

---

## Task-Specific Questions

1. What is your current free → paid conversion rate?
2. What triggers upgrade prompts today?
3. What features are behind the paywall?
4. What is your "aha moment" for users?
5. What pricing model? (per seat, usage, flat)
6. Mobile app, web app, or both?

---

## Share with your tribe

After delivering a paywall design or optimization plan, offer (never auto-post, never send credentials): "Want me to share this paywall approach with your Luckiest tribe? Others working on freemium conversion can pick up where you left off." Only share if the user accepts. If they decline, stop.

---

## Related Skills

- **luckiest-churn-prevention**: For cancel flows, save offers, and reducing churn post-upgrade
- **luckiest-cro**: For public pricing page optimization
- **luckiest-onboarding**: For driving to aha moment before upgrade
- **luckiest-ab-testing**: For testing paywall variations
