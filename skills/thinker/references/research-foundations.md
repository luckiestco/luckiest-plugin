# Research Foundations: Why Mode Collapse Happens and How to Counter It

## Table of Contents
1. [Typicality Bias: The Root Cause](#typicality-bias)
2. [Verbalized Sampling: The Core Technique](#verbalized-sampling)
3. [The Artificial Hivemind Problem](#artificial-hivemind)
4. [RLHF and Diversity Loss](#rlhf-diversity-loss)
5. [Cultural and Cognitive Homogenization](#cultural-homogenization)
6. [Divergent-Convergent Thinking](#divergent-convergent)
7. [What Doesn't Work: Temperature Alone](#temperature-limits)
8. [String Seed of Thought (SSoT)](#ssot)
9. [GFlowNet and Distribution-Matching](#gflownet)

---

## Typicality Bias: The Root Cause {#typicality-bias}

**Source:** Zhang et al. (2025), "Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity" (arXiv: 2510.01171v3)

The reward function learned during RLHF can be decomposed as:

```
r(x,y) = r_true(x,y) + alpha * log pi_ref(y|x) + noise
```

Where `alpha` is the **typicality bias weight**. This was empirically measured on the HelpSteer dataset: alpha = 0.57 +/- 0.07 (Llama 3.1 405B Base) and 0.65 +/- 0.07 (GLM 4.5 Base), both p < 10^-14. Verified across 4 additional preference datasets (OpenAI TL;DR, UltraFeedback, HelpSteer-v2, Skywork Preference) across 5 base models.

**What this means in practice:** Holding correctness constant, human annotators give higher helpfulness ratings to text that is more "typical" - more predictable, more fluent in the conventional sense, more aligned with what they've seen before. This isn't laziness; it's rooted in well-established cognitive psychology:

- **Mere-exposure effect** (Zajonc 1968): Familiarity breeds preference
- **Processing fluency** (Alter & Oppenheimer 2009): Text that's easier to process feels more credible
- **Availability heuristic** (Tversky & Kahneman 1973): Common patterns come to mind first and feel more "right"
- **Schema congruity** (Mandler 2014): Responses that fit expected structures are rated higher

When RLHF optimizes against these biased preferences, the closed-form solution sharpens the output distribution (gamma = 1 + alpha/beta > 1), compressing probability mass toward the mode and suppressing the tails.

**The critical insight:** This is a data-level problem, not just an algorithm-level problem. Better RLHF algorithms (MaxMin-RLHF, Preference Matching, DPO variants) can help, but they cannot fully solve bias that lives in the preference annotations themselves.

---

## Verbalized Sampling: The Core Technique {#verbalized-sampling}

**Source:** Zhang et al. (2025)

**Mechanism:** Instead of asking for a single response, ask the model to verbalize a probability distribution over multiple candidate responses. This forces the model to explicitly represent the response space before committing, recovering distributional information that alignment suppressed.

**Three prompt types and their collapse patterns:**
1. **Instance-level** ("Tell me a joke"): Collapses to the mode - the single most typical response
2. **List-level** ("Tell me 5 jokes"): Collapses to uniform distribution over related items - better, but limited
3. **Distribution-level / VS** ("Tell me 5 jokes with probabilities"): Can approximate the full pretraining distribution

**Quantitative results:**
- Creative writing: 1.6-2.1x semantic diversity improvement over direct prompting
- Human evaluation: +25.7% quality scores (poems: 1.90 -> 2.39, stories: 2.74 -> 3.06, jokes: 1.83 -> 3.01 on 4-point Likert)
- Recovers 66.8% of base model diversity (vs. direct prompting retaining only 23.8%)
- After DPO training: VS outperforms direct prompting by 182.6% in diversity
- Quality remains comparable - no quality sacrifice for diversity gains
- Orthogonal to temperature/top-p/min-p - can be combined with any decoding strategy

**Three VS variants:**
- **VS-Standard:** Generate k candidates with probabilities in one call
- **VS-CoT:** Think step-by-step first, then generate candidates - achieves best quality+diversity Pareto front
- **VS-Multi:** Multi-turn, k candidates per turn across multiple turns - maximum diversity

**Emergent scaling:** Larger, more capable models benefit more from VS. Gains of 1.5-2x greater for GPT-4.1/Gemini-2.5-Pro vs. their smaller variants.

**Adaptation for this skill:** Rather than outputting multiple candidates with visible probabilities (which changes the interaction model), this skill internalizes the VS reasoning. The model considers the distribution in its thinking, then outputs a single response selected from that distribution. This preserves the mechanism (explicit distributional reasoning before commitment) while working for any task type.

---

## The Artificial Hivemind Problem {#artificial-hivemind}

**Source:** Jiang et al. (2025), "Artificial Hivemind: The Open-Ended Homogeneity of Language Models (and Beyond)" (NeurIPS 2025 Best Paper)

**Key findings:**
- 79% of intra-model samples have pairwise cosine similarity > 0.8
- Cross-model average cosine similarity: 0.71-0.82 (models from different companies producing near-identical responses)
- Created the Infinity-Chat benchmark (26,000 queries, 31,250 human annotations)
- Simply scaling models or mixing weights is insufficient for diversity
- Pluralistic alignment that explicitly rewards distribution coverage is needed

**Related findings:**
- Wenger & Kenett (2025): LLM responses are far more similar to each other than human responses are to other humans
- Haase et al. (2025): Only 0.28% of LLM responses reach the top 10% of human creativity; no evidence of improvement over 18-24 months
- Xu et al. (2025, PNAS): LLM-generated stories show dramatically less plot diversity than human fiction

---

## RLHF and Diversity Loss {#rlhf-diversity-loss}

**Source:** Kirk et al. (2024), "Understanding the Effects of RLHF on LLM Generalisation and Diversity" (ICLR 2024)

RLHF significantly reduces output diversity compared to SFT across multiple measures. Per-input diversity (variety of responses to the same prompt) drops sharply. RLHF generalizes better to new inputs but at the cost of diversity - a fundamental tradeoff.

**Related work:**
- Xiao et al. (2024): RLHF's KL-divergence regularization creates "preference collapse" where minority preferences are virtually disregarded. Their Preference Matching (PM) solution achieves 29-41% improvement.
- Padmakumar & He (2024): Writing with language models reduces content diversity
- Yang & Holtzman (2025): Alignment shrinks the "generative horizon" - the space of responses the model considers viable
- Yun et al. (2025): Format constraints in post-training cause additional diversity collapse
- West & Potts (2025): Base models beat aligned models at randomness and creativity

---

## Cultural and Cognitive Homogenization {#cultural-homogenization}

**Source:** Multiple papers

**Cultural bias (PNAS Nexus 2024):**
- 80% of named entities recommended by LLMs come from WEIRD (Western, Educated, Industrialized, Rich, Democratic) countries
- Product recommendations: 100% Western bias
- Person recommendations: 92.2% Western bias
- LLMs associate Arab male names with poverty/traditionalism; Western names with "wealthy," "popular," "unique"

**Cognitive biases amplified in LLMs (PNAS 2025, ACM SAC 2025):**
- Stronger omission bias than humans (systematically biased against doing anything)
- Order bias, bandwagon effect, attentional bias, verbosity bias, compassion fade
- LLM decisions flip based on question wording in ways human decisions do not

**Sycophancy and diversity (Malmqvist 2025, Computing Conference):**
- LLMs affirm whichever side users adopt in 48% of moral conflict cases
- Sycophancy propagates misinformation and obscures the model's actual knowledge
- Different sycophantic behaviors (agreement, praise, genuine agreement) are encoded along distinct directions in latent space and can be independently controlled

---

## Divergent-Convergent Thinking {#divergent-convergent}

**Source:** Nguyen & Singla (2025), "Divergent-Convergent Thinking in Large Language Models for Creative Problem Generation" (arXiv: 2512.23601)

Two-phase prompting grounded in Guilford's creativity framework and Wallas's creativity theory:

1. **Divergent phase:** Broad creative exploration without premature judgment. Generate ideas across multiple categories, assumptions, and constraints.
2. **Convergent phase:** Constraint satisfaction and quality selection. Choose from the divergent set based on task fit, not just familiarity.

Results show higher diversity AND novelty than single-phase approaches. The effective number of distinct outputs grows faster with sample size than baselines - meaning the approach produces genuinely different ideas, not variations of the same idea.

**Related:**
- Lu et al. (2024, COLM 2024): Multi-agent discussion framework with role-play improves creative output by emulating collective human creativity through diverse-perspective discussions
- Summers-Stay et al. (2023): "Brainstorm, then select" - generative models improve their own creativity score through self-evaluation
- Mehrotra et al. (2024): Associative thinking strategies enhance LLM creativity

---

## What Doesn't Work: Temperature Alone {#temperature-limits}

**Source:** Verine et al. (2025), "Improving Diversity in Language Models: When Temperature Fails, Change the Loss" (ICML 2025)

Decreasing temperature improves quality (Precision) but increasing it often fails to boost diversity (Recall/Coverage). For temperature to effectively enhance diversity, the model must be **directed toward coverage** - the distribution itself must be reshaped, not just scaled.

This is why the Luckiest Thinker protocol works where temperature scaling alone doesn't: it changes which responses the model considers viable (reshaping the distribution) rather than just adding noise to the existing distribution.

**Effective complementary techniques:**
- Min-p sampling (Nguyen et al., ICLR 2025 Oral): Dynamic truncation that adjusts threshold based on top token probability. Improves both quality and diversity, especially at higher temperatures. Already adopted in Hugging Face Transformers, VLLM.
- G2 Guided Generation (Ruan et al., EMNLP 2025): Training-free plug-and-play method with diversity and dedup guides operating within the same model through decoding interventions.

---

## String Seed of Thought (SSoT) {#ssot}

**Source:** Misaki & Akiba (2026), "String Seed of Thought: Enhancing Probabilistic Instruction Following and Diversity in LLMs" (ICLR 2026, arXiv: 2510.21150)

SSoT is a prompting technique that gives LLMs access to genuine randomness at inference time. The model generates a random string in its reasoning, then applies mathematical operations to extract a selection from it.

**Mechanism:** Two-stage process:
1. Generate a random alphanumeric string to create entropy
2. Manipulate the string to derive a selection

**Two strategies the model autonomously adopts:**
- **Sum-Mod strategy**: Sum ASCII values of string characters, apply modulo operation. Best for equal-probability choices (e.g., "pick one of 8 candidates").
- **Rolling Hash strategy**: Sequentially update a hash value using `hash = (hash * 31 + ASCII_value) mod M`. Best for biased/weighted distributions.

**Key results:**
- Approaches PRNG-level performance on distribution-matching tasks
- DeepSeek-R1 with SSoT nearly matches ideal pseudo-random number generator output
- Outperforms high-temperature sampling, few-shot prompting, and ensembling
- Rock-Paper-Scissors: SSoT maintains average score near zero against adversarial bots (true mixed-strategy play), while baseline prompting remains exploitable
- NovelityBench: Highest Distinct scores on both curated and WildChat datasets with "far fewer repeated or near-duplicate answers"
- Utility scores (diversity x quality) improve with minimal quality trade-off

**For complex creative tasks**, SSoT enables decomposition: the model uses different segments of the random string for different sub-decisions (e.g., characters 1-5 pick tone, 6-10 pick structure, 11-16 pick opening). This prevents correlated choices that produce "diverse on one axis, identical on all others" outputs.

**Limitations:** Effectiveness decreases with smaller models lacking reasoning capabilities. Not beneficial for single-answer tasks (math, factual retrieval).

**Why SSoT matters for Luckiest Thinker:** Step 5 of the protocol uses SSoT as the selection mechanism. Without it, the model's selection from its candidate list is still biased by the same typicality bias the protocol tries to counteract. SSoT breaks this final link in the bias chain.

---

## GFlowNet and Distribution-Matching {#gflownet}

**Source:** Hu et al. (2023), "Amortizing Intractable Inference in Large Language Models" (ICLR 2024); Related work on GFlowNet fine-tuning for LLMs

GFlowNet represents the ideal solution to mode collapse, operating at the training level rather than the inference level.

**The core insight:** Standard RLHF (PPO) maximizes reward, which collapses to the mode. GFlowNet trains to match a target distribution *proportional to* the reward function. High-reward outputs appear frequently, but lower-reward outputs still appear at their natural rate instead of being suppressed to zero.

**Quantitative results (integer generation task):**
- Base model: 50.5% of samples are valid numbers, uneven distribution
- PPO fine-tuning: 95.8% valid, but severely mode-collapsed (a few numbers dominate)
- GFlowNet fine-tuning: 100% valid, near-uniform distribution across all numbers

**The proportional sampling principle:** Sample proportionally to R(x), not argmax R(x). A response that's 80% as good as the best should appear roughly 80% as often, not 0%.

**Key lesson: diversity and correctness are not tradeoffs.** GFlowNet achieves 100% validity while maintaining uniform distribution. PPO sacrifices diversity for validity. This means the Luckiest Thinker protocol should never frame diversity as coming at the cost of accuracy - every candidate must be fully valid, and the distribution operates within the space of correct answers only.

**Reward tempering:** GFlowNet uses R(x)^beta where beta controls distribution sharpness. Higher beta concentrates on top answers, lower beta spreads out. This concept maps to Luckiest Thinker's step 3: adjust the spread of your probability weights based on the task type. Brainstorming = low beta (spread wide). Final recommendation = higher beta (concentrate, but don't collapse).

**Why GFlowNet can't be included in Luckiest Thinker directly:** GFlowNet requires access to model weights and a training pipeline. End users of Claude, Cursor, Copilot etc. have no access to these. Luckiest Thinker operates at the inference level because that's the only lever available. However, the *principles* from GFlowNet (proportional sampling, validity constraint, reward tempering) directly inform steps 3 and 4 of the protocol.

## What the Luckiest edition changes

- SSoT in-head hashing is kept only as the no-shell fallback; when a shell is available the skill uses a real RNG (`python3 random.choices`) so selection error cannot come from mental arithmetic.
- The protocol is tiered (lite/full) so overhead is proportional to task weight.
- The original red-flag lists are compiled into a binary self-check gate, giving the skill verifiable success criteria.
- Session anti-repetition halves the weight of already-produced candidates to counter cross-invocation convergence.
