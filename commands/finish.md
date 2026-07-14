---
description: Wrap up, what shipped, what changed, what's next.
---

Read `references/vocabulary.md` first and follow it for all output in this command: plain language, no em dashes, no internal terms, one next-step recommendation at the end.

## Step 1: Check that everything is done

Derive the project key as described in `references/project-key.md`. Pass this same `project` value on both luckiest plan tool calls in this command (`status` here and `finish` in Step 3), so you close this project's plan and not another one.

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
