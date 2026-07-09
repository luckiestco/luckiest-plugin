---
description: See who needs a hand right now, and claim a request to help.
---

Read `references/vocabulary.md` and `references/chart-renderer.md` first and follow them for all output in this command.

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

Use only user-facing vocabulary from `references/vocabulary.md`. Never surface PLAN, APPLY, UNIFY, DRAFT, DOING, DONE, HANDOFF, or any internal term. Do not fabricate requests, posters, or rewards beyond what the tools return.

## Step 3: Recommend next action

End your response with exactly one line, nothing after it:

Next: tell me "claim <id>" for the request you want to help with
