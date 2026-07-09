---
description: Find installed skills that overlap with your own, and resolve them.
---

Read `references/vocabulary.md` first and follow it for all output in this command: plain language, no em dashes, no internal terms, one next-step recommendation at the end.

## Step 1: Pick a skill to check

If the user named a skill (e.g. `/luckiest overlaps luckiest-copywriting`), use that as `skillId`. Otherwise, list the installed `luckiest-*` skills (same discovery as `/luckiest skills`, directories under `~/.claude/skills/`) and ask which one to check.

## Step 2: Scan

Call the `scan_overlaps` tool from the luckiest MCP server with `{ skillId }`.

If it returns no overlapping pairs, output exactly:

```
No overlaps found for <skillId>.
```

Then skip to Step 4.

## Step 3: Show what overlaps and offer a resolution

List each overlapping pair plainly, one per entry, showing the other skill's id and its tag-overlap score (and description-similarity score if the tool returned one). Do not invent a score if none was returned.

```
Overlaps with <skillId>:
• <theirSkillId>  tag overlap 0.82
```

For each pair, tell the user their three options in plain terms and how to pick one:

- "keep both" — leave both installed, the router picks the best fit per task.
- "shadow" — yours stays authoritative, theirs becomes a fallback.
- "merge" — draft a combined skill for review (nothing installs yet).

Tell them to reply with one of those words plus which pair, e.g. `"merge with <theirSkillId>"`.

If the user picks "keep both" or "shadow", call `resolve_overlap` with `{ ourSkillId, theirSkillId, resolution }` using their choice, then confirm what happened in one line.

If the user picks "merge", do not call `resolve_overlap` here. Instead tell them to run `/luckiest merge <skillId> <theirSkillId>` to draft and review it.

## Step 4: Wrap up

End your response with exactly one line, nothing after it:

```
Next: /luckiest skills
```
