---
description: Where you are. Progress, tasks, and your one next step.
---

Output rules for this command: plain language, no em dashes, no internal terms, and end with exactly one next-step line in the form `Next: <one action>`. The server may return internal words; translate them and never show them: PLAN means plan, APPLY means go, UNIFY means finish, DRAFT means in progress, DOING means active, DONE means complete, UAT means testing, AC means requirements, HANDOFF means ready for review, skill_loop means status.

Read `references/chart-renderer.md` before rendering any chart and follow it.

## Step 1: Check for a plan

Derive the project key once per session: run `git config --get remote.origin.url` and normalize the result to lowercase `host/owner/repo` with any `.git` suffix removed (for example `git@github.com:acme/app.git` becomes `github.com/acme/app`). If it is not a git repo, use the absolute working directory path. If there is no local shell (web chat, Cowork), omit `project` entirely. Then call the `status` tool from the luckiest MCP server with that `project` value so you read this project's plan and not another one.

If the returned state is null (no active plan), output nothing except these two lines, in order:

```
No plan yet. Start with /luckiest plan.
```

Then end with:

```
Next: /luckiest plan
```

Do not proceed further.

## Step 2: Render the status dashboard

If a plan exists, render one fenced code block following the chart-renderer grammar. The block MUST include:

1. **Plan phase and header**: First line shows the plan's phase name (if present) or a generic title like "Your Work".
2. **Progress bar**: One line with format `█` (filled) and `░` (empty) chars, exactly 20 chars total, with the count `done/total` right-aligned. Example: `██████░░░░░░░░░░░░  3/5`
3. **Task lines**: One line per task in the plan's task list. Each line shows:
   - Task title (truncate to fit on line)
   - Status glyph: `✓` for done, `▸` for doing, `·` for ready, `?` for assist
4. **Pass rate (if any)**: If the state includes any verified task results, add a line showing pass rate in the format `pass rate: X/Y` where X is completed verifications and Y is total tasks.
5. **Bookmark line (if paused)**: If the state includes a bookmark (pause), add a line showing the bookmark message.
6. **Footer**: Last line in the block ends with the command to check status again (e.g. `→ /luckiest status`).

Use only user-facing vocabulary. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

Map each task's status to a glyph (these are the task status values, not the plan position):
- "done" -> `✓`
- "doing" -> `▸`
- "ready" -> `·`
- "assist" -> `?`
- "blocked" -> `✗`

## Step 3: Recommend next action

End your response with exactly one line, nothing after it, derived from the MCP `nextAction` field:

```
Next: <nextAction>
```

If nextAction is null or empty, default to the most logical next step based on the current state (e.g., `Next: /luckiest go` if tasks are ready).
