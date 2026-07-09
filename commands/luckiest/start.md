---
description: Tell me about your project, a short interview that writes your Brand Brief.
---

Read `references/vocabulary.md` first and follow it for all output in this command: plain language, no em dashes, no internal terms, one next-step recommendation at the end.

## Step 1: Check for an existing brief

Check whether `.luckiest/BRIEF.md` exists in the current project.

- If it exists, read it and show the user a short summary (what they're building, who it's for, what winning looks like). Then ask: "Keep this brief as is, or update it?" Wait for their answer.
  - If they choose to keep it, skip straight to the sync step below and end the command.
  - If they choose to update it, continue to the interview below, but only ask about the sections they want to change.
- If it does not exist, continue to the interview below.

Never overwrite `.luckiest/BRIEF.md` silently. The user always gets to see what's there first and decide.

## Step 2: Run the interview

Ask the following questions ONE at a time, in order, waiting for the answer before asking the next. There are at most 6 questions. Tell the user up front that any question can be skipped by answering "skip."

1. What are you building?
2. Who is it for?
3. What does winning look like in 30 days?
4. What tone or voice should this have?
5. Is there anything that must not change?
6. Any links to share (designs, docs, prior work)?

Keep the tone conversational, not a form. Ask one question, read the reply, then move to the next. Don't dump all six at once.

## Step 3: Write the brief

Read `templates/BRIEF.md` (in this plugin) for the section structure. Each section carries an HTML-comment prompt like `<!-- filled from the /luckiest start interview -->`. Fill each section in using the interview answers, in the user's own words where possible. If the user skipped a question, leave that section's `<!-- ... -->` comment in place rather than inventing content.

Write the result to `.luckiest/BRIEF.md` in the current project (create the `.luckiest/` directory if it doesn't exist).

## Step 4: Sync

Call the `pause` tool from the luckiest MCP server with a reason like: `Brief created: <one-line summary of what they're building>`. This notes in the session bookmark that the brief now exists.

## Step 5: Wrap up

End your response with exactly one line, nothing after it:

Next: /luckiest plan to plan your first work.
