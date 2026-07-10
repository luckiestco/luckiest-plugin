---
description: The community dashboard. Wishes and charms, plan progress, tribe pulse, and who needs help.
---

Read `references/vocabulary.md` and `references/chart-renderer.md` first and follow them for all output in this command.

## Step 1: Get the data

Call the `overview` tool from the luckiest MCP server. It returns `{ wishes, charms, loop, openAssists, tribePulse }`.

## Step 2: Render the dashboard

Render one fenced code block following the chart-renderer grammar, with four boxes in this order. Separate boxes with a blank line.

1. **Wishes + Charms box**
   - Title line: `Wishes & Charms`
   - One line showing the two balances, aligned columns, thousands separators, for example `wishes 42        charms 130`
   - Footer: `→ /luckiest wishes`

2. **Active plan progress box**
   - Title line: `Plan Progress`
   - If `loop` is null, one line: `No plan yet.`
   - If `loop` is present, one progress bar line using `█` (filled) and `░` (empty), exactly 20 chars total, with `done/total` right-aligned, for example `██████░░░░░░░░░░░░  3/5`, plus the phase name if present.
   - Footer: if `loop` is present, `→ /luckiest go`; if `loop` is null, `→ /luckiest status`

3. **Tribe pulse box**
   - Title line: `Tribe Pulse`
   - One line per entry in `tribePulse`, showing the member name and the raw `event` string exactly as returned. Do not rewrite, embellish, or invent a friendlier phrasing for the event text. If `tribePulse` is empty, one line: `No recent activity.`
   - Footer: `→ /luckiest leaderboard`

4. **Needs help box**
   - Title line: `Needs Help`
   - One line: `open requests X` where X is `openAssists`.
   - Footer: `→ /luckiest helpers`

Use only user-facing vocabulary from `references/vocabulary.md`. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it, based on whether a plan is active:

- If `loop` is present (active plan): `Next: /luckiest go`
- If `loop` is null (no active plan): `Next: /luckiest plan`
