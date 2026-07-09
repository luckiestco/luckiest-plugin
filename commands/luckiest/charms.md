---
description: Your charms balance and recent related activity.
---

Read `references/vocabulary.md` and `references/chart-renderer.md` first and follow them for all output in this command.

## Step 1: Get the data

Call the `overview` tool from the luckiest MCP server. Use the `charms` balance and scan `tribePulse` for any entries whose `event` text relates to charms (earning or spending).

## Step 2: Render the dashboard

Render one fenced code block following the chart-renderer grammar:

1. Title line: `Charms`
2. Balance line: `balance X` where X is the `charms` value from `overview`, right-aligned if paired with other numbers.
3. If any charm-related entries exist in `tribePulse`, list them plainly, one per line, using the raw `event` text exactly as returned. Do not invent a friendlier phrasing.
4. If there is no daily earn/spend history available (there is no history endpoint in this version), add this exact line: `History view coming soon.` Do not invent daily numbers, trends, or a chart of activity over time. Only render a bar chart of actual daily values if such data is actually returned by a tool; since none is available here, skip the bar chart and show the line above instead.
5. Footer: `→ /luckiest charms`

Example:

```
 Charms
 balance 130
 History view coming soon.
 → /luckiest charms
```

Use only user-facing vocabulary from `references/vocabulary.md`. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it:

Next: /luckiest home
