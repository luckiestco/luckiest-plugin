---
name: luckiest-merge
description: "Merge two overlapping Luckiest skills into one, after the user reviews the diff. Use when the user says /luckiest merge, luckiest merge, or wants to combine overlapping skills."
---

Vocabulary rules for all output: plain language, no em dashes, no internal terms. Never surface internal words like PLAN, APPLY, UNIFY, skill_loop, UAT, AC, HANDOFF, DRAFT, DOING, DONE in user-visible output; say plan, go, finish, status, testing, requirements, ready for review, in progress, active, complete instead. End every response with exactly one next-step line in the form `Next: <one action>`.

## Step 1: Get the two skill ids

If the user named both skills (e.g. `/luckiest merge luckiest-copywriting their-copy-skill`), use those as `ourSkillId` and `theirSkillId`. Otherwise ask which two skills to merge, or point them to `/luckiest overlaps` to find a pair first.

## Step 2: Draft the merge

Call the `draft_merge` tool from the luckiest MCP server with `{ ourSkillId, theirSkillId }`.

This does not install or archive anything yet. Show the user the returned diff plainly, as a fenced code block. Do not summarize it away, they need to see exactly what changes.

Ask exactly one approval question:

"Use this merged version? yes / no"

Wait for the answer.

- If no, stop here. End with the wrap-up line in Step 4.
- If yes, continue to Step 3.

## Step 3: Apply the merge

Call the `apply_merge` tool from the luckiest MCP server with `{ ourSkillId, theirSkillId, mergedName, mergedContent }`, using the merged name and content from the draft in Step 2.

Tell the user plainly what happened: the two original skill directories were archived (moved to `~/.claude/luckiest-archive/`, never deleted) and the merged skill was installed under `mergedName`.

## Step 4: Wrap up

End your response with exactly one line, nothing after it:

```
Next: /luckiest skills
```
