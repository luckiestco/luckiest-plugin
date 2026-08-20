---
name: luckiest-home
description: "The Luckiest community dashboard: wishes and charms, plan progress, tribe pulse, and who needs help. Use when the user says /luckiest home, luckiest home, or asks for their Luckiest dashboard."
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

Use only user-facing vocabulary. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it, based on whether a plan is active:

- If `loop` is present (active plan): `Next: /luckiest go`
- If `loop` is null (no active plan): `Next: /luckiest plan`
