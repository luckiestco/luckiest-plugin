---
name: luckiest-launch
description: "When the user wants to plan a product launch, feature announcement, or release strategy. Also use when the user mentions 'launch,' 'Product Hunt,' 'feature release,' 'announcement,' 'go-to-market,' 'beta launch,' 'early access,' 'waitlist,' 'product update,' 'how do I launch this,' 'launch checklist,' 'GTM plan,' or 'we're about to ship.' Use this whenever someone is preparing to release something publicly. For ongoing marketing after launch, see luckiest-marketing-ideas. For the offer being launched (bonuses, guarantees, scarcity, naming), see luckiest-offers."
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-launch
  author: luckiest
---

# Launch Strategy

This skill helps the user plan SaaS product launches and feature announcements that build momentum, capture attention, and convert interest into users.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-launch", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-launch", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

---

## Core Philosophy

The best companies don't just launch once—they launch again and again. Every new feature, improvement, and update is an opportunity to capture attention and engage the audience.

A strong launch isn't about a single moment. It's about:
- Getting the product into users' hands early
- Learning from real feedback
- Making a splash at every stage
- Building momentum that compounds over time

---

## The ORB Framework

Structure launch marketing across three channel types. Everything should ultimately lead back to owned channels.

### Owned Channels
The company owns the channel (though not the audience). Direct access without algorithms or platform rules.

**Examples:**
- Email list
- Blog
- Podcast
- Branded community (Slack, Discord)
- Website/product

**Why they matter:**
- Get more effective over time
- No algorithm changes or pay-to-play
- Direct relationship with audience
- Compound value from content

**Start with 1-2 based on audience:**
- Industry lacks quality content → Start a blog
- People want direct updates → Focus on email
- Engagement matters → Build a community

**Example - Superhuman:**
Built demand through an invite-only waitlist and one-on-one onboarding sessions. Every new user got a 30-minute live demo. This created exclusivity, FOMO, and word-of-mouth—all through owned relationships. Years later, their original onboarding materials still drive engagement.

### Rented Channels
Platforms that provide visibility but the company doesn't control. Algorithms shift, rules change, pay-to-play increases.

**Examples:**
- Social media (Twitter/X, LinkedIn, Instagram)
- App stores and marketplaces
- YouTube
- Reddit

**How to use correctly:**
- Pick 1-2 platforms where the audience is active
- Use them to drive traffic to owned channels
- Don't rely on them as the only strategy

**Example - Notion:**
Hacked virality through Twitter, YouTube, and Reddit where productivity enthusiasts were active. Encouraged the community to share templates and workflows. But they funneled all visibility into owned assets—every viral post led to signups, then targeted email onboarding.

**Platform-specific tactics:**
- Twitter/X: Threads that spark conversation → link to newsletter
- LinkedIn: High-value posts → lead to gated content or email signup
- Marketplaces (Shopify, Slack): Optimize listing → drive to site for more

Rented channels give speed, not stability. Capture momentum by bringing users into the owned ecosystem.

### Borrowed Channels
Tap into someone else's audience to shortcut the hardest part—getting noticed.

**Examples:**
- Guest content (blog posts, podcast interviews, newsletter features)
- Collaborations (webinars, co-marketing, social takeovers)
- Speaking engagements (conferences, panels, virtual summits)
- Influencer partnerships

**Be proactive, not passive:**
1. List industry leaders the audience follows
2. Pitch win-win collaborations
3. Use tools like SparkToro or Listen Notes to find audience overlap
4. Set up affiliate/referral incentives for channel partner launches

**Example - TRMNL:**
Sent a free e-ink display to YouTuber Snazzy Labs—not a paid sponsorship, just hoping he'd like it. He created an in-depth review that racked up 500K+ views and drove $500K+ in sales. They also set up an affiliate program for ongoing promotion.

Borrowed channels give instant credibility, but only work if borrowed attention converts into owned relationships.

---

## Five-Phase Launch Approach

Launching isn't a one-day event. It's a phased process that builds momentum. Each phase pairs a qualitative goal with one measurable signal to watch, so the user knows when to advance.

### Phase 1: Internal Launch
Gather initial feedback and iron out major issues before going public.

**Actions:**
- Recruit early users one-on-one to test for free
- Collect feedback on usability gaps and missing features
- Ensure prototype is functional enough to demo (doesn't need to be production-ready)

**Goal:** Validate core functionality with friendly users.
**Metric to watch:** Number of testers who complete the core action unaided.

### Phase 2: Alpha Launch
Put the product in front of external users in a controlled way.

**Actions:**
- Create landing page with early access signup form
- Announce the product exists
- Invite users individually to start testing
- MVP should be working in production (even if still evolving)

**Goal:** First external validation and initial waitlist building.
**Metric to watch:** Waitlist signups and landing-page visit-to-signup rate.

### Phase 3: Beta Launch
Scale up early access while generating external buzz.

**Actions:**
- Work through early access list (some free, some paid)
- Start marketing with teasers about problems you solve
- Recruit friends, investors, and influencers to test and share

**Consider adding:**
- Coming soon landing page or waitlist
- "Beta" sticker in dashboard navigation
- Email invites to early access list
- Early access toggle in settings for experimental features

**Goal:** Build buzz and refine product with broader feedback.
**Metric to watch:** Week-over-week active users and qualitative sentiment trend.

### Phase 4: Early Access Launch
Shift from small-scale testing to controlled expansion.

**Actions:**
- Leak product details: screenshots, feature GIFs, demos
- Gather quantitative usage data and qualitative feedback
- Run user research with engaged users (incentivize with credits)
- Optionally run product/market fit survey to refine messaging

**Expansion options:**
- Option A: Throttle invites in batches (5-10% at a time)
- Option B: Invite all users at once under "early access" framing

**Goal:** Validate at scale and prepare for full launch.
**Metric to watch:** Activation rate and, if surveyed, the "very disappointed" PMF score.

### Phase 5: Full Launch
Open the floodgates.

**Pre-launch pre-mortem (do this first):**
Before opening the floodgates, spend ten minutes on a pre-mortem: imagine the launch flopped and write down the three most likely reasons why (assets not ready, wrong day, weak first-hour engagement, onboarding breaks under load). Fix or mitigate the top one or two before proceeding. A launch is expensive to repeat; this cheap step catches the avoidable failures.

**Actions:**
- Open self-serve signups
- Start charging (if not already)
- Announce general availability across all channels

**Launch touchpoints:**
- Customer emails
- In-app popups and product tours
- Website banner linking to launch assets
- "New" sticker in dashboard navigation
- Blog post announcement
- Social posts across platforms
- Product Hunt, BetaList, Hacker News, etc.

**Goal:** Maximum visibility and conversion to paying users.
**Metric to watch:** New signups and signup-to-paid conversion in the first 72 hours.

---

## Product Hunt Launch Strategy

Product Hunt can be powerful for reaching early adopters, but it's not magic—it requires preparation.

### Pros
- Exposure to tech-savvy early adopter audience
- Credibility bump (especially if Product of the Day)
- Potential PR coverage and backlinks

### Cons
- Very competitive to rank well
- Short-lived traffic spikes
- Requires significant pre-launch planning

### What ranks in 2026 (read this first)
The algorithm has shifted away from raw upvote counts toward quality-weighted engagement. Plan around these current realities:
- **Comment density beats upvote count.** A launch with ~700 upvotes and 80 substantive comments tends to outperform one with 1,000 upvotes and 12 comments. Seed genuine discussion and reply to every comment.
- **Voter quality is weighted.** An upvote from an established account that follows the maker and votes in the first hour is worth several times a fresh account's. Upvotes from accounts created on launch day are heavily discounted—so ask people who already have active Product Hunt accounts, never spin up new ones.
- **A famous Hunter is no longer material.** Many top launches now are self-submitted by the founder. Do not chase a big-name hunter as a strategy.
- **Bringing new engaged users to Product Hunt helps**, but only if they engage authentically, not just click upvote.
- **Day choice:** Thursday is a common 2026 sweet spot—full-week visibility with less mid-week crowding. Whatever day you pick, deconflict it: check the launch calendar and hold off if a high-profile product is landing the same day and would bury you.

### How to Launch Successfully

**Before launch day:**
1. Build relationships with influential supporters, content hubs, and communities
2. Optimize the listing: compelling tagline, polished visuals, short demo video
3. Study successful launches to identify what worked, and check for competing launches on your target date
4. Engage in relevant communities—provide value before pitching
5. Prepare the team for all-day engagement

**On launch day:**
1. Treat it as an all-day event
2. Respond to every comment in real-time (comment quality is a top ranking signal)
3. Answer questions and spark discussions
4. Encourage the existing audience—those with active accounts—to engage
5. Direct traffic back to the site to capture signups

**After launch day:**
1. Follow up with everyone who engaged
2. Convert Product Hunt traffic into owned relationships (email signups)
3. Continue momentum with post-launch content

### Case Studies

**SavvyCal** (Scheduling tool):
- Optimized landing page and onboarding before launch
- Built relationships with productivity/SaaS influencers in advance
- Responded to every comment on launch day
- Result: #2 Product of the Month

**Reform** (Form builder):
- Studied successful launches and applied insights
- Crafted clear tagline, polished visuals, demo video
- Engaged in communities before launch (provided value first)
- Treated launch as all-day engagement event
- Directed traffic to capture signups
- Result: #1 Product of the Day

---

## Post-Launch Product Marketing

The launch isn't over when the announcement goes live. Now comes adoption and retention work.

### Immediate Post-Launch Actions

**Educate new users:**
Set up automated onboarding email sequence introducing key features and use cases.

**Reinforce the launch:**
Include the announcement in the weekly/biweekly/monthly roundup email to catch people who missed it.

**Differentiate against competitors:**
Publish comparison pages highlighting why the product is the obvious choice.

**Update web pages:**
Add dedicated sections about the new feature/product across the site.

**Offer hands-on preview:**
Create a no-code interactive demo (using tools like Navattic) so visitors can explore before signing up.

### Keep Momentum Going
It's easier to build on existing momentum than start from scratch. Every touchpoint reinforces the launch.

---

## Ongoing Launch Strategy

Don't rely on a single launch event. Regular updates and feature rollouts sustain engagement.

### How to Prioritize What to Announce

Use this matrix to decide how much marketing each update deserves:

**Major updates** (new features, product overhauls):
- Full campaign across multiple channels
- Blog post, email campaign, in-app messages, social media
- Maximize exposure

**Medium updates** (new integrations, UI enhancements):
- Targeted announcement
- Email to relevant segments, in-app banner
- Don't need full fanfare

**Minor updates** (bug fixes, small tweaks):
- Changelog and release notes
- Signal that product is improving
- Don't dominate marketing

### Announcement Tactics

**Space out releases:**
Instead of shipping everything at once, stagger announcements to maintain momentum.

**Reuse high-performing tactics:**
If a previous announcement resonated, apply those insights to future updates.

**Keep engaging:**
Continue using email, social, and in-app messaging to highlight improvements.

**Signal active development:**
Even small changelog updates remind customers the product is evolving. This builds retention and word-of-mouth—customers feel confident the company will be around.

---

## Launch Checklist

### Pre-Launch
- [ ] Landing page with clear value proposition
- [ ] Email capture / waitlist signup
- [ ] Early access list built
- [ ] Owned channels established (email, blog, community)
- [ ] Rented channel presence (social profiles optimized)
- [ ] Borrowed channel opportunities identified (podcasts, influencers)
- [ ] Product Hunt listing prepared (if using), launch date deconflicted
- [ ] Launch assets created (screenshots, demo video, GIFs)
- [ ] Onboarding flow ready
- [ ] Analytics/tracking in place
- [ ] Pre-mortem run: top failure modes identified and mitigated

### Launch Day
- [ ] Announcement email to list
- [ ] Blog post published
- [ ] Social posts scheduled and posted
- [ ] Product Hunt listing live (if using), team replying to every comment
- [ ] In-app announcement for existing users
- [ ] Website banner/notification active
- [ ] Team ready to engage and respond
- [ ] Monitor for issues and feedback

### Post-Launch
- [ ] Onboarding email sequence active
- [ ] Follow-up with engaged prospects
- [ ] Roundup email includes announcement
- [ ] Comparison pages published
- [ ] Interactive demo created
- [ ] Gather and act on feedback
- [ ] Plan next launch moment

---

## Task-Specific Questions

1. What are you launching? (New product, major feature, minor update)
2. What's your current audience size and engagement?
3. What owned channels do you have? (Email list size, blog traffic, community)
4. What's your timeline for launch?
5. Have you launched before? What worked/didn't work?
6. Are you considering Product Hunt? What's your preparation status?

---

## Share with your tribe

After delivering a launch plan, offer (never auto-post): "Want me to share this launch plan with your Luckiest tribe? Anyone prepping a launch on the same day or channel can compare notes and avoid colliding." Only share if the user accepts. Never post anything, and never include credentials or private launch dates without an explicit ask. If they decline, stop.

---

## Related Skills

- **luckiest-marketing-ideas**: For additional launch tactics (Product Hunt, Early Access Referrals)
- **luckiest-emails**: For launch and onboarding email sequences
- **luckiest-cro**: For optimizing launch landing pages
- **luckiest-marketing-psychology**: For psychology behind waitlists and exclusivity
- **luckiest-programmatic-seo**: For comparison pages mentioned in post-launch
- **luckiest-sales-enablement**: For launch sales collateral and enablement materials
