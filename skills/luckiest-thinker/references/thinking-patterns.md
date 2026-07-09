# Thinking Patterns: Task-Specific Application

This reference provides concrete guidance for applying the Luckiest Thinker protocol to different task types. The principle is always the same - consider the full space of valid responses before committing - but the specifics differ by domain.

## Table of Contents
1. [Writing](#writing)
2. [Brainstorming and Ideation](#brainstorming)
3. [Personas, Characters, and Names](#personas)
4. [Problem Solving and Technical Recommendations](#problem-solving)
5. [Coding and Implementation](#coding)
6. [Example Data and Placeholders](#example-data)
7. [Explanations and Analogies](#explanations)

---

## Writing {#writing}

Mode collapse in writing manifests as predictable openings, uniform sentence structure, the same vocabulary, and convergence on the "safest" tone. Research shows LLM writing is dramatically more homogeneous than human writing even when controlling for response structure (Wenger & Kenett 2025).

**Before writing, consider:**
- 3-4 different tonal approaches (authoritative, conversational, reflective, provocative, understated)
- 2-3 structural options (narrative arc, inverted pyramid, in medias res, list-based, Q&A)
- Multiple opening strategies (anecdote, question, bold claim, quiet observation, concrete detail)

**Collapse indicators to watch for:**
- Starting emails with "I hope this finds you well"
- Starting blog posts with "In today's fast-paced world..." or "Have you ever wondered..."
- Every paragraph being 3-4 sentences of similar length
- Defaulting to an enthusiastic, slightly formal tone regardless of context
- Using the same transitional phrases ("Moreover," "Furthermore," "That being said")

**The fix isn't being weird.** It's recognizing that real writers use many different openings, structures, and tones. A business email can start with "Quick question --" or "Following up on Thursday's call" or "I've been thinking about what you said about the timeline." All are valid; mode collapse picks one pattern and uses it every time.

**Vocabulary:** When you reach for an adjective or verb, notice if it's the first one that came to mind. For common modifiers like "important," "interesting," "great," "challenging" - these often have more precise alternatives that better fit the specific context. Not fancier words, just more fitting ones.

---

## Brainstorming and Ideation {#brainstorming}

Mode collapse in brainstorming produces ideas that are variations of the same concept rather than genuinely different approaches. "Five marketing strategies" becomes five versions of content marketing. "Ten startup ideas" becomes ten SaaS variations.

**Apply the full divergent-convergent model:**

Phase 1 (Divergent): Generate ideas across genuinely different categories before generating within categories. If asked for marketing strategies, think across different strategic dimensions first:
- Channel diversity (paid, organic, partnership, community, event, referral)
- Audience angle diversity (who benefits, who influences, who decides, who pays)
- Timing diversity (launch vs. growth vs. retention strategies)
- Budget diversity (zero-budget guerrilla vs. paid acquisition vs. brand investment)

Phase 2 (Convergent): Select for quality and relevance to the user's specific context. An idea that's unusual but irrelevant isn't creative - it's noise.

**Distribution check for brainstorming:** After generating a list, ask: "Would a room of 10 different domain experts produce roughly this range of ideas?" If your list could have come from a single person's perspective, it's likely mode-collapsed.

---

## Personas, Characters, and Names {#personas}

This is where mode collapse is most visibly harmful and over-correction is the most common failure mode.

**Mode collapse pattern:** Every persona is a variation of 3-4 archetypes. For fitness apps: young professional, busy parent, retiree. For B2B SaaS: startup founder, enterprise IT manager, marketing lead. Names cluster around the same small handful that every LLM rotates through - you know which ones. The real population of first names follows a long-tail distribution where the top 10 names cover only about 15-20% of people.

**Over-correction pattern:** Every persona is an edge case. The wheelchair-using competitive athlete, the 80-year-old bodybuilder, the non-binary teenager in rural Wyoming. This is equally unrealistic and unhelpful for actual product decisions.

**Calibrated approach:**
1. Start by considering the actual user base or population the personas represent
2. Include the common archetypes at their natural frequency (they're common for a reason)
3. Include 1-2 less obvious but realistically sized segments (they exist, they're just usually suppressed)
4. For demographic details, draw from realistic distributions. If the user base is 65% women, roughly 65% of personas should be women. Not 50/50, not 100%.

**Names specifically:** Vary beyond the first names that come to mind. Real populations follow a long-tail distribution - the top 10 names cover maybe 15-20% of people, with hundreds of less-common-but-real names making up the rest. A realistic list of 10 names will include some very common ones and some less common ones. That's what real distributions look like.

---

## Problem Solving and Technical Recommendations {#problem-solving}

Mode collapse in technical recommendations means always suggesting the most popular tool regardless of context. The most popular answer is sometimes the best answer - but not always, and the reason it's your recommendation should be fit-to-context, not familiarity.

**Before recommending an approach, consider at least 3 options:**

Ask yourself for each: "Why this one over the alternatives, for THIS specific context?"

If you can't articulate why the common choice is better than a specific alternative for the user's actual constraints, you may be picking it on typicality rather than merit.

**Common collapse pattern:** Always recommending the most popular tool in a category regardless of the user's actual constraints (scale, team size, complexity budget, maintenance burden). The most popular option is often right - but the reason should be fit-to-context, not familiarity.

**The correction isn't to avoid popular tools.** Popular tools are popular for good reasons. The correction is to evaluate fit rather than defaulting. A simple internal tool for 3 people might need a spreadsheet, not a full-stack app.

---

## Coding and Implementation {#coding}

**Variable and function naming:**
Mode collapse produces generic names: `data`, `result`, `items`, `processData()`, `handleClick()`, `utils.js`. These are sometimes appropriate (a truly generic utility function might reasonably be called `utils`), but often a more specific name exists that communicates intent: `customerOrders`, `validationResult`, `parseInvoiceLineItems()`.

Don't rename for the sake of it. But notice when a generic name is hiding specificity.

**Example data and test fixtures:**
Mode-collapsed test data always uses the same placeholder values. When generating multiple examples, vary them. Real data has people of different ages, cities across the full geography, and names that reflect actual population diversity.

**Solution architecture:**
Before implementing, briefly consider whether the typical pattern is the best fit:
- Does this need a class, or would a function suffice?
- Does this need a state management library, or would local state work?
- Does this need an abstraction layer, or is the direct approach clearer?
- Does this need a config file, or would a constant in the code be simpler?

The bias here is toward over-engineering (adding abstractions, layers, and configurations that the scope doesn't require) because training data is full of production codebases with those patterns. For the user's actual task, simpler is often better.

---

## Example Data and Placeholders {#example-data}

When generating sample data, demos, or documentation examples, mode collapse produces the same handful of values every time:

**Collapsed defaults:** The same placeholder names, emails, addresses, phone numbers, company names, and prices that every LLM produces. You know the ones.

**The fix:** Draw from a wider set of realistic values. Not unusual values, just the VARIETY that real data naturally has:

- Names: Mix common and less common names from the relevant population. "Maria Chen," "Diane Palmer," "Kenji Watanabe," "Rachel Torres" are all normal names that aren't the first five any LLM would generate.
- Places: Austin, Portland, Minneapolis, Tampa, Raleigh - not just SF/NYC/Chicago
- Companies: Actual-sounding company names relevant to the domain, not the same placeholder names every LLM defaults to
- Prices: $47.00, $12.50, $189.99 - not always round numbers or $99.99
- Dates: Various days and months, not always January 1 or today's date

---

## Explanations and Analogies {#explanations}

When explaining concepts, mode collapse produces the same analogies every time. Every API explanation uses the restaurant waiter analogy. Every database explanation uses the filing cabinet. Every version control explanation uses "saving checkpoints in a video game."

These analogies aren't wrong - they're popular because they work. But they're not the ONLY ones that work, and for users who've heard them before, a fresh angle can be more illuminating.

**Before reaching for the standard analogy:**
- Consider the user's specific background (if known) - what domains do they already understand?
- Consider whether a different metaphor might illuminate a different aspect of the concept
- Consider whether a concrete example might work better than any analogy

The goal is to explain well, not to be novel. If the standard analogy is genuinely the clearest, use it. But if you're using it because it's the first one that came to mind rather than because you considered alternatives, that's mode collapse.
