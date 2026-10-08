# Distribution Calibration: Realistic vs. Mode-Collapsed vs. Over-Corrected

This reference helps you calibrate the Luckiest Thinker protocol. The goal is recovering realistic distributions - not flipping the bias from "always typical" to "always unusual."

## The core principle

A realistic distribution is **mostly common answers.** That's what "common" means - most people, most of the time, converge on these responses. The problem with mode collapse isn't that common answers exist. It's that mode-collapsed models produce ONLY common answers, suppressing the tails to near-zero probability.

**Target:** If 60% of thoughtful humans would give answer A, 25% would give B, and 15% would give C, the model should produce A roughly 60% of the time, B roughly 25%, and C roughly 15%.

**Mode-collapsed behavior:** A appears ~95% of the time. B and C are effectively suppressed.

**Over-corrected behavior:** A is deliberately avoided. B and C appear disproportionately often, or the model reaches for answers D and E that virtually nobody would naturally give.

---

## Worked Examples

### Example 1: Naming a business

**Mode-collapsed:** Always the same structural pattern (e.g., always puns, always compound words, always "[Noun] & [Noun]"). If you ask 100 times, you get maybe 6 unique answers.

**Over-corrected:** Names so unusual that no real business would use them. Abstract, pretentious, or confusing.

**Calibrated:** The set across many invocations should feel like the actual variety you'd see walking down different streets in different neighborhoods. Some simple and descriptive, some evocative, some playful. The naming patterns themselves should vary, not just the words within one pattern.

### Example 2: Customer personas for a fitness app

**Prompt:** "Create 5 customer personas for a fitness app."

**Mode-collapsed:**
All five are variations of three archetypes: the busy professional who wants efficiency, the new parent getting back in shape, the retiree maintaining health, the college student on a budget, and the executive who wants results. They all want the same things (convenience, progress tracking, motivation), they all face the same barriers (time, consistency), and they're all from the same cultural context. The names come from the same small pool every LLM uses.

**Over-corrected:**
Every persona is an extreme edge case - a wheelchair athlete, an 80-year-old CrossFitter, a formerly incarcerated person rebuilding health. Each is individually plausible, but a set where ALL are edge cases isn't realistic or useful for product decisions.

**Calibrated:**
Use Morphological Analysis - pick values on each dimension independently:
- **Dimensions:** age decade, occupation sector, geographic region, primary motivation, lifestyle constraint
- 3 personas from common archetypes WITH specific details (specific city, specific device, specific spending threshold, specific churn reason)
- 2 personas from less-common-but-real segments (people with unusual schedule constraints, people whose primary motivation isn't weight loss)
- Names drawn from the actual long-tail distribution of the relevant population, not the same handful every time

The key is specificity within archetypes (a 44-year-old restaurant owner in a specific city is more useful than "busy professional") combined with 1-2 segments that represent real but underrepresented users (long-haul truck drivers, people seeking stress relief rather than aesthetics).

### Example 3: Technical recommendation

**Prompt:** "How should I handle authentication for my app?"

**Mode-collapsed:**
"Use JWT tokens with OAuth 2.0. Here's how to set up JWT with bcrypt for password hashing..." (Same recommendation regardless of whether the app is a personal project, an internal tool, or a multi-tenant SaaS.)

**Over-corrected:**
"Consider using WebAuthn with passkeys and zero-knowledge proofs for a passwordless experience..." (Cutting-edge but inappropriate for most contexts.)

**Calibrated:**
Asks about context first, or tailors to context if given:
- **Personal project / hackathon:** "Session-based auth with cookies is simplest. Libraries like Passport.js or NextAuth handle this in a few lines."
- **Internal tool for 5 people:** "Basic auth behind a VPN, or SSO if your company has Google/Okta. Don't over-engineer this."
- **Public SaaS product:** "OAuth 2.0 with a provider like Auth0 or Clerk. JWT for API access. Standard bcrypt for any local passwords."
- **High-security / regulated:** "MFA is non-negotiable. Consider passkeys/WebAuthn as primary, TOTP as backup. Audit logging on all auth events."

The common recommendation (OAuth + JWT) is still the most frequent answer because it's the most frequently appropriate answer. But it's chosen for fit, not by default.

### Example 4: Blog post opening

**Prompt:** "Write an opening line for a blog post about remote work productivity."

**Mode-collapsed:**
"In today's increasingly digital workplace, remote work has become the new normal..."

Every time. Some variation of "the world has changed" + "remote work" + "new normal/paradigm shift."

**Over-corrected:**
"My cat threw up on my keyboard at 2pm on a Tuesday, and that's when I realized everything I knew about productivity was wrong."

Trying too hard to be distinctive. Feels forced.

**Calibrated - range of valid openings across invocations:**
- "Three years into full-time remote work, I've stopped pretending my home office setup matters." (Personal, direct)
- "The most productive remote workers I know don't follow any of the advice you'll find in most articles about remote work." (Contrarian hook)
- "Remote work didn't make us more productive. It made productivity more visible." (Observation)
- "Here's what I tell every new remote hire on their first day." (Practical, specific)
- "The data on remote work productivity tells a more complicated story than either side wants to admit." (Analytical)

Any of these is valid. The mode-collapsed version is also valid - but it shouldn't be the ONLY one.

---

## Red Flags: Am I Over-Correcting?

- Every item in a list is unusual or surprising - a realistic list is mostly normal with some variety
- The response feels contrarian rather than considered - you're avoiding the common answer BECAUSE it's common, not because an alternative is better
- All examples represent edge cases or minorities - realistic sets are proportional
- You're reaching for obscure vocabulary, frameworks, or references when familiar ones would communicate better
- The user would need to ask "what?" rather than nodding along - the response is surprising in a confusing way, not an illuminating way

## Red Flags: Am I Still Mode-Collapsed?

- The response is indistinguishable from what ChatGPT/Claude/Gemini would produce with the same prompt and no special instructions
- All examples share the same demographic assumptions (US-centric, tech-industry, urban, 25-35 age range)
- You considered only one option before writing the response
- Every name in a list is from the same cultural background
- The opening/structure/vocabulary matches the most common pattern for this type of content
- Example data uses the same placeholder values every LLM defaults to
- You're recommending the most popular tool/framework without considering whether a simpler or more context-appropriate option exists
