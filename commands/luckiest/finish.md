---
description: Wrap up, what shipped, what changed, what's next.
---

Read `references/vocabulary.md` first and follow it for all output in this command: plain language, no em dashes, no internal terms, one next-step recommendation at the end.

## Step 1: Check that everything is done

Call the `status` tool from the luckiest MCP server.

If any task is still open (not complete), list those tasks for the user and stop here. Do not proceed to the rest of this command. End your response with exactly one line, nothing after it:

Next: /luckiest go

## Step 2: Compose the recap

If every task is complete, write a short recap in chat with these sections:

- **Shipped**: what got built or changed, in plain terms.
- **Decisions**: any notable choices made along the way and why.
- **Key files**: the main files touched, so the user knows where to look.
- **Deferred**: anything explicitly pushed off, if applicable. Say "none" if there's nothing deferred.

## Step 3: Close it out

Call the `finish` tool from the luckiest MCP server with:

```
{ decisions, keyFiles, deferred }
```

using the same lists from your recap. This awards Charms and archives the history automatically.

Report the Charms earned in friendly, plain terms, for example: "You earned 3 charms."

## Step 4: Wrap up

End your response with exactly one line, nothing after it:

Next: /luckiest plan for the next piece, or /luckiest home to see where you stand.
