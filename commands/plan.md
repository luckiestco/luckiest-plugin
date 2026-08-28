---
description: Plan your next piece of work. Guided questions, then a plan Claude can run.
---

Output rules for this command: plain language, no em dashes, no internal terms, and end with exactly one next-step line in the form `Next: <one action>`. The server may return internal words; translate them and never show them: PLAN means plan, APPLY means go, UNIFY means finish, DRAFT means in progress, DOING means active, DONE means complete, UAT means testing, AC means requirements, HANDOFF means ready for review, skill_loop means status.

Asking the user a question: this command tells you to use the AskUserQuestion tool
so the user can click instead of typing. That tool only exists in Claude Code. In
web chat and Cowork it is not there, and waiting for it will stall the command.

So, every time this command says to use AskUserQuestion:

- If the tool is available, use it exactly as written.
- If it is not, ask the same question in plain chat as a numbered list of the
  same options, and tell the user to reply with a number or type their own
  answer. Treat a typed answer the same as the "Other" free-text choice.

The options, their order, and their wording stay the same either way. Only the
delivery changes. Never skip a question, never answer it on the user's behalf,
and never merge several questions into one just because they are text.

For example, "Here's your plan, good to go?" with options "Good to go" and
"Make changes" becomes:

```
Here's your plan, good to go?

1. Good to go
2. Make changes

Reply with a number, or tell me what to change.
```

## Step 1: Gather context

Check whether `.luckiest/BRIEF.md` exists in the current project. If it exists, read it and use it as context for the interview below (what they're building, who it's for, what winning looks like). If it does not exist, continue without it.

## Step 2: Check for active work

Derive the project key once per session: run `git config --get remote.origin.url` and normalize the result to lowercase `host/owner/repo` with any `.git` suffix removed (for example `git@github.com:acme/app.git` becomes `github.com/acme/app`). If it is not a git repo, use the absolute working directory path. If there is no local shell (web chat, Cowork), omit `project` entirely. Pass this same `project` value on every luckiest plan tool call in this command (`status` here and `plan` in Step 5), so this project gets its own plan and does not collide with another project's.

Call the `status` tool from the luckiest MCP server with that `project` value.

- If the returned state's position is active (already in progress), stop here. Tell the user a plan is already active and offer `/luckiest go` to resume it instead. Do not stage a new plan over an active one unless the user explicitly confirms they want to replace it. If they confirm, continue to Step 3.
- Otherwise, continue to Step 3.

## Step 3: Run the interview

If the user's invocation already states the outcome they want (they passed arguments describing a goal, a feature, or a problem to solve), skip the interview question entirely. Say in one line that you are planning from what they gave you, use their stated outcome directly, and jump ahead to drafting the task list below. The approval question in Step 4 still runs; it is the only question they get.

Otherwise, open the interview with a short line that says no plan is active and you are starting the interview.

Then ask question 1 using the AskUserQuestion tool so the user can click an answer instead of typing one. Do not put the examples in plain text for them to copy. Present them as selectable options:

1. Let's confirm what best describes the outcome you want

Build 3 to 4 options for that question. Draw them from their brief if one exists, otherwise use plausible outcomes for their project (for example: "About page rewritten to explain the full skills network, live on luckiest.co"). Keep the "Other" free-text choice available so they can still write their own outcome if none fit.

Use the picked option (or their typed answer) plus the brief, if present, to shape the plan.

Use the answer (plus the brief, if present) to shape a draft task list of 3 to 7 tasks. Each task title must be a single clean line under 200 characters, describing one piece of work. Do not append "done means" text or any acceptance-criteria text to the title.

Include non-coding work too. Marketing, content, design, research, and ops tasks belong in the plan alongside code. Never drop a task just because it is not a coding task; route it to its matching skill like any other.

Route all draft tasks in ONE `skill_router` call from the luckiest MCP server: pass `prompts` as an array of every task title. It returns `results`, one entry per task with `skills` (matching owned skills) and `who` (up to 3 tribe members who finished a similar task before). Attach the suggested skill(s) to each task, and attach `who` so the plan can carry who has done this kind of work. If the server rejects `prompts` (older server), fall back to one `skill_router` call per task, issued in parallel in a single message, never one at a time.

For each task, state a one-line "done means..." in chat (not in the title, not stored anywhere) so the user sees what complete looks like for that task. When `who` is not empty, add a short line naming those people, for example "Done before by: **Sam**, **Alex**."

Whenever you name a skill or a person in your output, wrap it in markdown bold so it stands out, for example **Copywriting** or **Sam**. Bold the skill and person names everywhere they appear in this command, both in the draft plan and in the "done means..." and "done before by" lines.

## Step 4: Present the plan

Show the full draft plan: each task's title, its suggested skill(s), and its "done means..." line. Then ask exactly one approval question using the AskUserQuestion tool so the user can click instead of typing. Use "Here's your plan, good to go?" as the question, with these options (keep the "Other" free-text choice available for anything else):

- "Good to go" — stage the plan as shown.
- "Make changes" — the user wants edits before staging.

Wait for the answer.

- If the user picks "Make changes" (or types their own edit), revise the plan and ask the same approval question again.
- If the user picks "Good to go", continue to Step 5.

## Step 5: Stage the plan

Call the `plan` tool from the luckiest MCP server with:

```
{ project: <the project key from Step 2>, phase: <short phase name if any>, tasks: [{ title, skills, who }] }
```

Pass the `who` list you got from `skill_router` for each task so the plan keeps who has done this kind of work before.

Include at most 25 tasks. Each title must stay under 200 characters. Do not include acceptance criteria or "done means" text in any task field.

## Step 6: Start it

Once the plan is staged, do not make the user type the next command. Start the `/luckiest go` flow now, fresh, as if newly invoked, so the first task begins immediately in this session.
