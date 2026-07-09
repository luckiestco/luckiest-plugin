---
description: Run your plan, one task at a time, checked as it goes.
---

Read `references/vocabulary.md` first and follow it for all output in this command: plain language, no em dashes, no internal terms, one next-step recommendation at the end.

## Step 1: Load the plan

Call the `status` tool from the luckiest MCP server. This is a zero-context resume, treat its result as the full picture of where things stand: don't assume anything about prior state beyond what it returns.

## Step 2: Execute in-session

Do all task work yourself, in this session, message by message.

- Forbidden: spawning subagents to execute tasks. Never hand off the actual work of a ready task to a subagent.
- Allowed: spawning subagents for research only (for example, looking something up, exploring the codebase for context). The work itself, writing code, making changes, running commands, stays in this session.

## Step 3: Work through ready tasks, one at a time

Take the ready tasks one at a time, in order. For each one:

1. Do the work using the task's suggested skill. If that skill is installed, invoke it via the Skill tool. If it isn't installed, do the work directly without it.
2. Check your result against the task's "done means..." line. Don't move on until it's actually met.
3. If the result is something the user can try themselves (a page, a feature, a flow), ask exactly this: "Try it yourself, does it work? yes / needs fixes." Wait for their answer.
4. On a pass, call the `apply` tool with `{ taskId }` for that task, then call the `verify` tool with `{ results: [{ taskId, pass: true }] }`.
5. On a fail, fix the problem before moving on to the next task. Only call `verify` with `pass: false` for that task if the user explicitly chooses to defer the fix instead of having you fix it now.

Only move to the next ready task once the current one is applied and verified (or deferred).

## Step 4: Stop conditions

Pause and ask the user before doing any of the following, even if it seems like the obvious next step:

- Any destructive action (deleting data, dropping tables, force-pushing, overwriting files with no way back).
- Adding a new dependency.
- Any schema change.

If the session has to end before the plan is done, call the `pause` tool with `{ reason }`, a one-line reason describing where things were left.

## Step 5: Wrap up

End your response with exactly one line, nothing after it.

- If all tasks are done: `Next: /luckiest finish to wrap up.`
- Otherwise: `Next: <the next task title>.`
