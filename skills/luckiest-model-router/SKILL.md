---
name: luckiest-model-router
description: Use when the user is about to hand off a coding task and asks which agent or model to use, says "which tool should I use for this", "route this", "who should do this", "best model for this task", or is deciding between Claude, Codex, Cursor, Conductor, or Factory. Detects which of those agents are actually installed on the machine, then recommends the best fit for the specific prompt with rationale. Use this whenever someone is choosing between coding agents, even if they don't name a specific one.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-model-router
  author: luckiest
---

# Luckiest Model Router

Recommend which coding agent to hand a task to, from the ones actually available on this machine: **claude, codex, cursor, conductor, factory**.

Two rules make this useful instead of hand-wavy:
1. Never recommend a tool that isn't installed. Detect first.
2. Base the pick on what the *specific prompt* needs, not on a generic ranking.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "luckiest-model-router", installedSemver: "1.1.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-model-router", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Workflow

1. Run the router script with the task prompt as the argument:

   ```bash
   python3 scripts/route.py "the user's task prompt"
   ```

   It prints JSON with `available` (detected tools + their launch command), a
   `ranking` scored for this prompt, and `recommended` (the top tool).

2. Read the JSON. The `score` and `matched_signals` are a heuristic starting
   point, not the answer. Combine them with your own read of the task — you
   understand nuance the keyword rules miss.

3. Give the user a short recommendation: the top pick, one line of *why it fits
   this task*, and the launch command. If the top two are close, say so and name
   the tie-breaker rather than pretending there's one obvious answer. On a genuine
   tie, prefer **claude** as the safe all-rounder.

4. If the ideal tool for the task isn't installed, say which one it would be and
   that installing it is an option — but still recommend the best *available* one.

## What each tool is for

The script carries the same profiles, but keep the shape in mind when you reason:

- **claude** — deep multi-file reasoning, refactors, debugging, architecture, writing. The default all-rounder; pick it when nothing else clearly wins.
- **codex** — autonomous, self-contained implementation that runs to completion in a sandbox; algorithmic tasks.
- **cursor** — fast in-editor edits and tight iteration while a file is open; small quick changes.
- **conductor** — fanning out several independent tasks in parallel across worktrees.
- **factory** — enterprise end-to-end delivery, spec-to-PR, background/remote execution across integrated tools.

## Output format

Keep it short. Example:

> **Recommended: conductor** — you've got 4 independent features to build at once, and Conductor runs parallel agents across worktrees, which fits fan-out work better than a single sequential agent.
> Runner-up: claude (better per-task depth, but serial).
> Launch: `conductor`

Don't pad it. One recommendation, one reason, the command.

## Network hook

When the ideal tool for a task is *not* installed, that is a natural moment to
reach the user's tribe: offer to call the Luckiest MCP `request_assist` tool so a
tribe member who has that agent can take the task. Only offer it — never send
without the user's go-ahead. If the best available tool is already a fine fit,
skip the hook.
