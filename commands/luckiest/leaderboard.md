---
description: See how the tribe ranks. Top scores, one bar chart.
---

Read `references/vocabulary.md` and `references/chart-renderer.md` first and follow them for all output in this command.

## Step 1: Get the data

Call the `tribe_leaderboard` tool from the luckiest MCP server. If the tool accepts a range argument and the user specified one (e.g. `/luckiest leaderboard 30d`), pass it through. Otherwise call it with no range argument.

## Step 2: Render the leaderboard

Render one fenced code block following the chart-renderer grammar.

1. **Range header**: only include a `[ 7 Days ]  30 Days  All`-style range header if the tool's response indicates it supports ranges (e.g. it echoes back a range or accepts one). If there is no evidence the tool supports ranges, omit the header entirely. Do not invent range options.

2. **Ranked bar chart**: one line per member, in rank order, with columns for rank, name, and a horizontal bar representing score. Use `█` for filled, `░` for empty, width 20 chars, value right-aligned. For example:

```
 Tribe Leaderboard
 1  Priya   ████████████████░░░░  820
 2  Sam     ██████████████░░░░░░  710
 3  Marcus  ████████░░░░░░░░░░░░  405
 → /luckiest leaderboard
```

3. **Movement arrows**: only add a movement indicator (e.g. `▲2`, `▼1`, `=`) next to a member's name if the tool response includes prior-rank data for that member. If no prior-rank data is present anywhere in the response, omit movement indicators entirely for all members. Do not fabricate or estimate movement.

4. **Footer**: last line in the block is `→ /luckiest leaderboard` (or the range-qualified form if a range was passed, e.g. `→ /luckiest leaderboard 30d`).

Use only user-facing vocabulary from `references/vocabulary.md`. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it:

Next: /luckiest helpers
