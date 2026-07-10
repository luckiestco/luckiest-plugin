---
description: Plan your next piece of work. Guided questions, then a plan Claude can run.
---

Read `references/vocabulary.md` first and follow it for all output in this command: plain language, no em dashes, no internal terms, one next-step recommendation at the end.

## Step 1: Gather context

Check whether `.luckiest/BRIEF.md` exists in the current project. If it exists, read it and use it as context for the interview below (what they're building, who it's for, what winning looks like). If it does not exist, continue without it.

## Step 2: Check for active work

Call the `status` tool from the luckiest MCP server.

- If the returned state's position is active (already in progress), stop here. Tell the user a plan is already active and offer `/luckiest go` to resume it instead. Do not stage a new plan over an active one unless the user explicitly confirms they want to replace it. If they confirm, continue to Step 3.
- Otherwise, continue to Step 3.

## Step 3: Run the interview

Open the interview with a short line that says no plan is active and you are starting the interview.

Then ask question 1 using the AskUserQuestion tool so the user can click an answer instead of typing one. Do not put the examples in plain text for them to copy. Present them as selectable options:

1. What outcome do you want this week?

Build 3 to 4 options for that question. Draw them from their brief if one exists, otherwise use plausible outcomes for their project (for example: "About page rewritten to explain the full skills network, live on luckiest.co"). Keep the "Other" free-text choice available so they can still write their own outcome if none fit.

Use the picked option (or their typed answer) plus the brief, if present, to shape the plan.

Use the answer (plus the brief, if present) to shape a draft task list of 3 to 7 tasks. Each task title must be a single clean line under 200 characters, describing one piece of work. Do not append "done means" text or any acceptance-criteria text to the title.

For each draft task, call the `skill_router` tool from the luckiest MCP server to suggest a matching owned skill for that task. Attach the suggested skill(s) to the task.

For each task, state a one-line "done means..." in chat (not in the title, not stored anywhere) so the user sees what complete looks like for that task.

## Step 4: Present the plan

Show the full draft plan: each task's title, its suggested skill(s), and its "done means..." line. Then ask exactly one approval question, nothing else:

"Here's your plan, good to go?"

Wait for the answer.

- If the user wants changes, revise the plan and ask the same approval question again.
- If the user says yes, continue to Step 5.

## Step 5: Stage the plan

Call the `plan` tool from the luckiest MCP server with:

```
{ phase: <short phase name if any>, tasks: [{ title, skills }] }
```

Include at most 25 tasks. Each title must stay under 200 characters. Do not include acceptance criteria or "done means" text in any task field.

## Step 6: Wrap up

End your response with exactly one line, nothing after it:

Next: /luckiest go to start.
