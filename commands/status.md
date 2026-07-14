---
description: Where you are. Progress, tasks, and your one next step.
---

Read `references/vocabulary.md` and `references/chart-renderer.md` first and follow them for all output in this command.

## Step 1: Check for a plan

Derive the project key as described in `references/project-key.md`, then call the `status` tool from the luckiest MCP server with that `project` value so you read this project's plan and not another one.

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

Use only the user-facing vocabulary from `references/vocabulary.md`. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

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
