---
name: luckiest-go
description: "Run the active Luckiest plan, one task at a time, checked as it goes. Use when the user says /luckiest go, luckiest go, or wants to continue their staged Luckiest plan."
---

Vocabulary rules for all output: plain language, no em dashes, no internal terms. Never surface internal words like PLAN, APPLY, UNIFY, skill_loop, UAT, AC, HANDOFF, DRAFT, DOING in user-visible output; say plan, go, finish, status, testing, requirements, ready for review, in progress, active, complete instead. End every response with exactly one next-step line in the form `Next: <one action>`.

Project key for luckiest MCP plan tool calls: if a shell is available, run `git config --get remote.origin.url` and normalize to `host/owner/repo` (lowercase, no `.git`); if not a git repo, use the absolute path from `pwd`. If there is no shell at all (web chat, Cowork), omit `project` entirely. Use the same value on every plan tool call this whole session.

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

## Step 1: Load the plan

Derive the project key as described in the project key rules above. Pass this same `project` value on every luckiest plan tool call in this command (`status`, `apply`, `verify`, `pause`), so you run this project's plan and not another one.

Call the `status` tool from the luckiest MCP server with that `project` value. This is a zero-context resume, treat its result as the full picture of where things stand: don't assume anything about prior state beyond what it returns.

## Step 2: Pick how to run

Default: do all task work yourself, in this session, message by message. This is the safe, reviewable mode.

Fast mode (subagents): if the user wants tasks done faster, you may hand a ready task to a subagent instead of doing it yourself. Only do this when the user has asked to go fast, or says yes when you offer it.

Before dispatching anything, check that you can actually assign agents: confirm the Agent (or Task) tool is available in this session. If it is not, say so plainly and fall back to default mode. Never claim work was handed off to a subagent you could not launch.

When you do run in fast mode, assign work top down in this order: subagents > tasks > skills > model.

- Subagents: one subagent owns a task. Independent tasks run in parallel; tasks that depend on an earlier one wait for it.
- Tasks: give each subagent one ready task from `status`, turned into a tight working prompt.
- Skills: inside its task, the subagent invokes the task's suggested skill via the Skill tool.
- Model: run each subagent on the task's `model` hint from `status` (light work like haiku, heavy work like opus), so each task uses the smallest model that fits and saves tokens.

You still own Step 3's checks: read the subagent's result, hold it to the "done means..." line, and only then apply and verify.

Research subagents (looking something up, exploring the codebase) are always allowed in either mode.

## Step 3: Work through ready tasks, one at a time

Take the ready tasks one at a time, in order. For each one:

1. First, turn the task into a tight working prompt with the `luckiest-prompt-rewrite` skill, targeting whoever will do the work (yourself, or the subagent and its model from Step 2). Use that rewritten prompt to do the task. If the skill is not installed, write a clear prompt yourself and continue. Do this before every task, in both default and fast mode.
2. Do the work using the task's suggested skill. If that skill is installed, invoke it via the Skill tool. If it isn't installed, do the work directly without it.
3. Check your result against the task's "done means..." line. Don't move on until it's actually met.
4. If the result is something the user can try themselves (a page, a feature, a flow), ask with the AskUserQuestion tool so they can click instead of typing. Question: "Try it yourself, does it work?" Options: "Works" and "Needs fixes" (keep the "Other" free-text choice available). Wait for their answer.
5. On a pass, call the `apply` tool with `{ project, taskId }` for that task, then call the `verify` tool with `{ project, results: [{ taskId, pass: true }] }`. Use the same `project` from Step 1.
6. On a fail, fix the problem before moving on to the next task. Only call `verify` with `pass: false` for that task if the user explicitly chooses to defer the fix instead of having you fix it now.

Only move to the next ready task once the current one is applied and verified (or deferred).

After a task passes and is verified, run a quick automation check. Ask yourself: was this task repeatable, rule-based, or the kind of thing that will come up again? If yes, offer it with the AskUserQuestion tool so the user can click instead of typing. Question: "This looks worth automating. Turn it into a skill you can schedule or run as a routine?" Options: "Automate it" and "Skip" (keep the "Other" free-text choice available). Only offer, never build it without a yes. If they say yes, create the skill (with the skill-builder or skill-creator skill) and set it up to run on a schedule or as a routine. If the task was a one-off, skip the offer and move on.

## Step 4: Stop conditions

Pause and ask the user before doing any of the following, even if it seems like the obvious next step:

- Any destructive action (deleting data, dropping tables, force-pushing, overwriting files with no way back).
- Adding a new dependency.
- Any schema change.

If the session has to end before the plan is done, call the `pause` tool with `{ project, reason }` (same `project` from Step 1), a one-line reason describing where things were left.

## Step 5: Wrap up

End your response with exactly one line, nothing after it.

- If all tasks are done: `Next: /luckiest finish to wrap up.`
- Otherwise: `Next: <the next task title>.`
