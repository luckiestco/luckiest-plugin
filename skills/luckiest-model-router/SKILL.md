---
name: luckiest-model-router
description: Use when the user asks which agent or which model should handle a task. Two modes. Agent mode detects which of Claude, Codex, Cursor, Conductor, or Factory is installed and picks the best fit for the prompt. Model mode tags each task with a Haiku, Sonnet, or Opus tier by task type, so subagents run on the smallest model that fits. Triggers include "which tool should I use", "route this", "best model for this task", "haiku or opus", "which model for each task", "tag tasks with models", and /luckiest plan drafting a task list. Use it whenever someone is choosing between coding agents or model sizes, even if they don't name one.
license: See ATTRIBUTION.md
metadata:
  version: "2.0.0"
  listing_id: luckiest-model-router
  author: luckiest
---

# Luckiest Model Router

Two jobs:
- **Agent mode:** pick which installed coding agent (claude, codex, cursor, conductor, factory) should take a task.
- **Model mode:** pick the model tier (light, standard, heavy) for each task, so work runs on the smallest model that fits.

Rules for both modes:
1. Route each task on its own. A plan with five tasks gets five decisions.
2. Base the pick on what the specific task needs, not on a generic ranking.
3. Never recommend a tool that isn't installed. Never fall back to the cheap model because you are unsure. When unsure, use standard and say so.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "641e0cd7-0695-4caf-b97a-f7a0b3f872ec", installedSemver: "2.0.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check. If the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-model-router", skill_version: "2.0.0", matched: true, success: <true if the skill completed, false otherwise> }. Send metadata only, never prompt text. Never block on it. If the tool is unavailable, skip silently.

## Model mode

Use this mode when the question is about model size, or when /luckiest plan is tagging a task list.

1. Route one task:

   ```bash
   python3 scripts/route.py --model "task title" [--prefer quality|balanced|cheap]
   ```

   Route a whole plan in one call. Each item's `depends_on` lists the indexes of earlier tasks it builds on:

   ```bash
   echo '[{"title":"design the billing schema"},{"title":"add the billing API route","depends_on":[0]}]' \
     | python3 scripts/route.py --model --batch
   ```

2. The output gives `tier`, `model`, `task_type` and a one-line `reason` for each task.

| Task type | Base tier | Examples |
|---|---|---|
| design | heavy | architecture, schema, migration, trade-offs, strategy |
| debug | heavy | root cause, flaky test, race condition, "why does" |
| security | heavy | harden, vulnerability, threat model, fix auth |
| review | standard | review, audit, critique |
| implement | standard | build, add, fix, refactor, write, test |
| content | standard | draft, copy, email, blog post, landing page, calendar |
| research | light | find, search, explore, summarize, read |
| utility | light | rename, format, bump, label, translate |
| unsure | standard | no signal, so never light |

3. Tier adjustments:
   - Scope words such as "across the codebase", "end to end", "production" or "data loss" move a task up one tier. So does pasted code or a task description over 60 words.
   - `--prefer quality` moves every task up one tier. `--prefer cheap` moves every task down one tier, except that design, debug, security and implement tasks never drop below standard, because small models loop on multi-step tool work and end up costing more. Read the preference from the user's words: "keep it cheap", "save tokens" or "on a budget" means `cheap`. "Best quality", "don't cut corners" or "this is critical" means `quality`. Otherwise use `balanced`.
   - A dependent task never drops below the tier of the task it builds on, so a chain can share one model and its context. It can still move up if it needs more. If the output has `warnings`, a `depends_on` index was wrong. Fix the index and route again.
4. Treat the script as a starting point. When the title undersells the task, raise the tier and say why in the reason. Only lower a tier when the task is clearly trivial.
5. Model IDs: light `claude-haiku-4-5-20251001`, standard `claude-sonnet-5`, heavy `claude-opus-5-5`. Setting `LUCKIEST_MODEL_PROVIDER=openai` or `google` switches to that provider's table, which matches the server. When showing tiers to the user, say **Haiku**, **Sonnet** or **Opus**. When a subagent runs the task, always pass its model explicitly. Claude Code subagents inherit the session model when none is set, and that is Opus by default.

### Escalation during execution

When a subagent's result fails its "done means" check twice on the same task, re-run the task one tier higher from the start and tell the user in one line. Do not hand a half-done run to the bigger model, because switching models mid-task rewrites most of the actions that follow. Tasks that depend on it and have not started yet move up to at least the new tier. Heavy is the ceiling. If a heavy run still fails, stop and hand the task back to the user.

Read [references/weave-routing-notes.md](references/weave-routing-notes.md) only when changing the rules above. It explains where each rule came from.

## Agent mode

1. Run `python3 scripts/route.py "the user's task prompt"`. It prints JSON with `available` (the detected tools and their launch commands), a `ranking` scored for this prompt, and `recommended`.
2. The `score` and `matched_signals` are keyword heuristics. Weigh them against your own read of the task.
3. Give the top pick, one line on why it fits, and the launch command. If the top two are close, name the tie-breaker. On a genuine tie, prefer **claude**.
4. If the ideal tool isn't installed, name it, but still recommend the best available one.

What each agent is for:
- **claude**: deep multi-file reasoning, refactors, debugging, architecture, writing. The default all-rounder.
- **codex**: autonomous, self-contained implementation in a sandbox, and algorithmic tasks.
- **cursor**: fast in-editor edits and tight iteration on an open file.
- **conductor**: running several independent tasks in parallel across worktrees.
- **factory**: enterprise spec-to-PR delivery and background or remote execution.

## Output format

Keep it short.

> **Recommended: conductor**. You have 4 independent features, and Conductor runs parallel agents across worktrees.
> Runner-up: claude (more depth per task, but runs them one at a time).
> Launch: `conductor`

For model mode, write one line per task: `1. Design the billing schema: **Opus** (design task)`.

## Network hook

When the ideal agent for a task is not installed, offer to call the Luckiest MCP `request_assist` tool so a tribe member who has that agent can take the task. Only offer it. Never send without the user's go-ahead.
