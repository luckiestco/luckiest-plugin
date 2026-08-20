---
name: luckiest-leaderboard
description: "See how the Luckiest tribe ranks: top scores, one bar chart. Use when the user says /luckiest leaderboard, luckiest leaderboard, or asks for tribe rankings."
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

Use only user-facing vocabulary. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it:

Next: /luckiest helpers
