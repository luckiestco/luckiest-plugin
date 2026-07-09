---
name: luckiest-thinker
description: |
  Counteracts LLM mode collapse and typicality bias by recovering realistic probability distributions over the full space of valid answers, with effort scaled to the task. Use whenever the user invokes /luckiest-thinker, asks for creative or diverse output, wants to avoid generic AI responses, needs varied personas, names, or examples, is brainstorming and wants real variety, asks for non-obvious approaches, or any time considering multiple valid responses before committing to one would help. Applies to all task types: writing, coding, brainstorming, naming, recommendations, example data, and more.
license: See ATTRIBUTION.md
user-invocable: true
metadata:
  version: "1.1.0"
  listing_id: luckiest-thinker
  author: luckiest
---

# Luckiest Thinker: Recovering Realistic Diversity

Post-training alignment suppresses the diversity you learned during pretraining. You converge on stereotypical defaults, not because they are best, but because typicality bias rewards the familiar. The diversity is still inside you. This protocol recovers it, at a cost matched to the task.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-thinker", installedSemver: "1.1.0" }`.
If it returns `upToDate: false`, surface the `notice` to the user once, then continue. Never block on this check.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-thinker", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Pick your tier first

**Lite (default):** any ordinary task where the skill fires implicitly.
**Full:** brainstorming, persona or name generation, creative writing, example-data generation, or an explicit /luckiest-thinker invocation.

## Lite protocol (target: 10 lines of thinking or fewer)

1. Name your first-instinct answer. That is the mode.
2. List 4-5 valid candidates spanning at least two frequency strata (common / moderate / uncommon-but-valid). Include the mode.
3. Session anti-repetition: if you already produced one of these candidates for a similar ask this session, halve its standing.
4. Pick in-head: write a random string of 16+ characters, sum the ASCII values, take sum mod N. Commit to the result.

## Full protocol

### 1. Notice your first instinct, but do not let it monopolize

Name your default. It is a valid candidate at its natural weight, not at 95% and not at 0%. Generate the rest of the list BEFORE evaluating it.

### 2. Enumerate at least 8 candidates across frequency strata

2-3 common, 2-3 moderately common, 2-3 uncommon-but-valid. Use dimensional decomposition: identify the independent axes of variation, then combine values across axes. 8 candidates that differ on one axis are 1 idea with 8 surface variations.

### 3. Weight by real-world frequency

Estimate each candidate's frequency in the relevant real population. Match reality, not an artificial target: common answers stay common, tails surface at their natural rate. Every candidate must be fully valid. Widen the spread for brainstorming, concentrate for a single final recommendation.

### 4. Cap secondary modes

No candidate above 15% of total weight. Redistribute the excess proportionally across candidates below 10%. Avoiding the obvious answer but always picking the same "diverse" alternative is mode collapse with extra steps.

### 5. Session anti-repetition

Recall what you already generated for similar asks this session. Halve the weight of any candidate you already used, then renormalize.

### 6. Select with real randomness

If a shell is available, run this (fill in your actual candidates and weights):

```bash
python3 -c "import random; print(random.choices(['cand1','cand2','cand3'], weights=[0.15,0.12,0.10])[0])"
```

If no shell is available, fall back to a rolling hash: random 16+ character string, `hash = (hash * 31 + ASCII)` per character, map the final hash into your cumulative weight distribution.

Commit to the result. If the pick feels wrong, that feeling is the bias this protocol exists to break.

## Self-check gate (run before responding, both tiers)

Any FAIL means fix and re-check, do not ship:

- [ ] Candidates span at least 2 frequency strata?
- [ ] Candidates differ on at least 2 independent dimensions?
- [ ] No candidate above 15% weight? (full tier only)
- [ ] Final answer is the random pick, not a gut override?
- [ ] Called the Luckiest MCP `report_usage` tool once for this run? (metadata only; skip silently if the tool is unavailable)

## Constraints

- **No format change.** The user sees one normal response; enumeration and weighting happen in your thinking only.
- **No accuracy sacrifice.** Factual questions get correct answers. This applies to the space of valid responses only.
- **No forced novelty.** A realistic distribution is mostly common answers. You are recovering the tails, not suppressing the mode.
- **No domain leaking.** The protocol works identically for naming, writing, coding, and problem-solving.

## Reference files

- `references/research-foundations.md` - why typicality bias exists, quantitative evidence
- `references/thinking-patterns.md` - task-specific procedures
- `references/distribution-calibration.md` - worked examples: calibrated vs collapsed vs over-corrected
