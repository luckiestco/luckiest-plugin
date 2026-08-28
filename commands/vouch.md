---
description: Request or approve a warm intro to someone outside your tribe.
---

Output rules for this command: plain language, no em dashes, no internal terms, and end with exactly one next-step line in the form `Next: <one action>`. The server may return internal words; translate them and never show them: PLAN means plan, APPLY means go, UNIFY means finish, DRAFT means in progress, DOING means active, DONE means complete, UAT means testing, AC means requirements, HANDOFF means ready for review, skill_loop means status.

## Step 1: Figure out the intent

- If the user is asking for an intro to someone (e.g. `/luckiest vouch <targetId>`, or "I need a warm intro to X"), go to Step 2.
- If the user is approving a vouch someone asked them for (e.g. "approve vouch <vouchId>", or they were told about a pending vouch elsewhere), go to Step 3.
- If neither is clear, ask which one they mean.

## Step 2: Request a warm intro

Call the `request_vouch` tool from the luckiest MCP server with `{ targetId }`. If this request is tied to an open assist request, include `assistRequestId` too.

This asks a shared 1st-degree tribe member (someone in your direct tribe who also knows the target) to vouch for you before you can reach a 3rd-degree person directly.

Report plainly that the request was sent and who needs to approve it, if the tool response says.

## Step 3: Approve a vouch

Call the `approve_vouch` tool from the luckiest MCP server with `{ vouchId }`.

Confirm plainly that the vouch was approved and the intro can proceed.

## Step 4: Wrap up

End your response with exactly one line, nothing after it:

```
Next: /luckiest helpers
```
