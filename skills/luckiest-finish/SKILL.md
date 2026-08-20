---
name: luckiest-finish
description: "Wrap up a completed Luckiest plan: recap what shipped, close it out, award charms. Use when the user says /luckiest finish, luckiest finish, or all plan tasks are done."
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

## Step 1: Check that everything is done

Derive the project key as described in the project key rules above. Pass this same `project` value on both luckiest plan tool calls in this command (`status` here and `finish` in Step 3), so you close this project's plan and not another one.

Call the `status` tool from the luckiest MCP server with that `project` value.

If any task is still open (not complete), list those tasks for the user and stop here. Do not proceed to the rest of this command. End your response with exactly one line, nothing after it:

Next: /luckiest go

## Step 2: Compose the recap

If every task is complete, write a short recap in chat with these sections:

- **Shipped**: what got built or changed, in plain terms.
- **Decisions**: any notable choices made along the way and why.
- **Key files**: the main files touched, so the user knows where to look.
- **Deferred**: anything explicitly pushed off, if applicable. Say "none" if there's nothing deferred.

## Step 3: Close it out

After the recap, confirm with the AskUserQuestion tool so the user can click instead of typing. Question: "Close this out and award charms?" Options: "Close it out" and "Not yet" (keep the "Other" free-text choice available). Only continue on "Close it out"; on "Not yet", stop and end with `Next: /luckiest go` so they can keep working.

Call the `finish` tool from the luckiest MCP server with:

```
{ project: <the project key from Step 1>, decisions, keyFiles, deferred }
```

using the same lists from your recap. This awards Charms and archives the history automatically.

Report the Charms earned in friendly, plain terms, for example: "You earned 3 charms."

## Step 4: Wrap up

Offer the next move with the AskUserQuestion tool so the user can click instead of retyping a command. Question: "What's next?" Options (keep the "Other" free-text choice available):

- "Plan the next piece" — on this pick, start the `/luckiest plan` flow now, fresh, as if newly invoked.
- "See where I stand" — on this pick, run the `/luckiest home` flow now.

Whichever they click, start that flow immediately in this session so they never have to type the command themselves. If they pick "Other" or dismiss, end with exactly one line, nothing after it:

Next: /luckiest plan for the next piece, or /luckiest home to see where you stand.
