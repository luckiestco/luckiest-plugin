---
description: Check for updates to your installed luckiest skills and plugin.
---

Read `references/vocabulary.md` first and follow it for all output in this command: plain language, no em dashes, no internal terms, one next-step recommendation at the end.

## Step 1: Check for updates

Call the `check_updates` tool from the luckiest MCP server.

## Step 2: Report what's available

If no updates are available, output exactly:

```
Everything is up to date.
```

Then skip to Step 3.

If updates are available, list each one plainly, one per line, using only what the tool returns (skill or plugin name, current version, available version). Do not invent version numbers or changelog details that weren't returned. For example:

```
Updates available:
• luckiest-copywriting  1.2.0 → 1.3.0
• luckiest-cro          2.0.1 → 2.1.0
```

If any update includes a changelog or summary field in the tool response, show it as a short indented line under that entry. Do not fabricate one if it's missing.

## Step 3: Offer to sync

If updates were found, add a blank line, then:

```
You can pull these by replying "sync" below.
```

If the user replies "sync" or similar intent, run this command via Bash: `npx luckiest-co --sync-only`, then report what was actually updated from the command output.

## Step 4: Wrap up

End your response with exactly one line, nothing after it:

```
Next: /luckiest skills
```
