---
name: luckiest-status
description: "Where you are in your Luckiest plan: progress, tasks, and your one next step. Use when the user says /luckiest status, luckiest status, or asks where their plan stands."
---

Vocabulary rules for all output: plain language, no em dashes, no internal terms. Never surface internal words like PLAN, APPLY, UNIFY, skill_loop, UAT, AC, HANDOFF, DRAFT, DOING, DONE in user-visible output; say plan, go, finish, status, testing, requirements, ready for review, in progress, active, complete instead. End every response with exactly one next-step line in the form `Next: <one action>`.

Chart grammar for any dashboard output in this skill:


All dashboard commands use this grammar for rendering data visualizations.

## Grammar Rules

Render dashboards as fenced code blocks using this grammar:
- Section box: title line, then content, no borders needed beyond blank lines.
- Horizontal bar: `█` for filled, `░` for empty, width 20 chars, value right-aligned.
- Numbers: aligned columns, thousands separators.
- Range header when applicable: `[ 7 Days ]  30 Days  All` with the active range bracketed.
- Footer line naming the drill-down command, e.g. `→ /luckiest wishes 30d`.

## Example

```
 Wishes                                [ 7 Days ]
 balance 42        earned 12       spent 5
 06-28 ████████░░░░░░░░░░░░  4
 06-29 ██████████████░░░░░░  7
 07-01 ██░░░░░░░░░░░░░░░░░░  1
 → /luckiest wishes 30d
```

## Implementation Notes

- Each bar is exactly 20 filled/empty blocks.
- Values are right-aligned after the bar.
- Column headers are spaced evenly with at least 2 spaces between.
- The footer command should match the context (e.g., `/luckiest wishes 30d` for a wishes dashboard).
- Use single-space line breaks between sections for clarity.

Project key for luckiest MCP plan tool calls: if a shell is available, run `git config --get remote.origin.url` and normalize to `host/owner/repo` (lowercase, no `.git`); if not a git repo, use the absolute path from `pwd`. If there is no shell at all (web chat, Cowork), omit `project` entirely. Use the same value on every plan tool call this whole session.

## Step 1: Check for a plan

Derive the project key as described in the project key rules above, then call the `status` tool from the luckiest MCP server with that `project` value so you read this project's plan and not another one.

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

Use only the user-facing vocabulary. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

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
