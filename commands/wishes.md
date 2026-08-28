---
description: Your wishes balance and recent related activity.
---

Output rules for this command: plain language, no em dashes, no internal terms, and end with exactly one next-step line in the form `Next: <one action>`. The server may return internal words; translate them and never show them: PLAN means plan, APPLY means go, UNIFY means finish, DRAFT means in progress, DOING means active, DONE means complete, UAT means testing, AC means requirements, HANDOFF means ready for review, skill_loop means status.

Read `references/chart-renderer.md` before rendering any chart and follow it.

## Step 1: Get the data

Call the `overview` tool from the luckiest MCP server. Use the `wishes` balance and scan `tribePulse` for any entries whose `event` text relates to wishes (earning or spending).

## Step 2: Render the dashboard

Render one fenced code block following the chart-renderer grammar:

1. Title line: `Wishes`
2. Balance line: `balance X` where X is the `wishes` value from `overview`, right-aligned if paired with other numbers.
3. If any wish-related entries exist in `tribePulse`, list them plainly, one per line, using the raw `event` text exactly as returned. Do not invent a friendlier phrasing.
4. If there is no daily earn/spend history available (there is no history endpoint in this version), add this exact line: `History view coming soon.` Do not invent daily numbers, trends, or a chart of activity over time. Only render a bar chart of actual daily values if such data is actually returned by a tool; since none is available here, skip the bar chart and show the line above instead.
5. Footer: `→ /luckiest wishes`

Example:

```
 Wishes
 balance 42
 History view coming soon.
 → /luckiest wishes
```

Use only user-facing vocabulary. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it:

Next: /luckiest charms
