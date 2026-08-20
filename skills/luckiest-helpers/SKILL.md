---
name: luckiest-helpers
description: "See who in your Luckiest tribe needs a hand right now, and claim a request to help. Use when the user says /luckiest helpers, luckiest helpers, or asks who needs help."
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

Call the `overview` tool from the luckiest MCP server to get the `openAssists` count. If an assist listing tool is available that returns the actual open requests (title, poster, wish reward, and id for each), use it and prefer that list over the raw count. In v1 a per-request listing may not be available through the MCP server: in that case, do not invent requests. Show the count and point the user to the full board, as described in Step 2.

## Step 2: Render the open requests

If the count is zero and no requests come back, output nothing except:

```
No open requests right now.
```

Then end with:

```
Next: /luckiest home
```

Do not proceed further.

If you have the count but no per-request details (no listing tool available), render one fenced block with the count and an honest pointer, then stop:

```
 Needs Help
 open requests 3
 Full board and claiming at luckiest.co/dashboard
 → /luckiest home
```

and end with `Next: open luckiest.co to claim a request`.

If there are open requests with details, render one fenced code block following the chart-renderer grammar:

1. Title line: `Needs Help (X open)` where X is the number of requests actually listed.
2. One entry per request, each showing:
   - Title of the request
   - Poster name
   - Wish reward, right-aligned, e.g. `reward 8 wishes`
   - A claim line directly under it: `→ tell me "claim <id>" and I'll pick it up with respond_to_assist`

Example:

```
 Needs Help (2 open)
 Fix the onboarding copy         posted by Priya      reward 8 wishes
 → tell me "claim a12" and I'll pick it up with respond_to_assist

 Review the pricing page         posted by Marcus     reward 5 wishes
 → tell me "claim a13" and I'll pick it up with respond_to_assist
```

Use only user-facing vocabulary. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term. Do not fabricate requests, posters, or rewards beyond what the tools return.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it:

Next: tell me "claim <id>" for the request you want to help with
