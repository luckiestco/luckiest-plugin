---
name: luckiest-charms
description: "Your Luckiest charms balance and recent related activity. Use when the user says /luckiest charms, luckiest charms, or asks about their charms."
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

Use only user-facing vocabulary. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it:

Next: /luckiest home
