---
description: Your skills, list what's installed, pull new purchases.
---

Read `references/vocabulary.md` first and follow it for all output in this command. Never delete skills.

## Step 1: List installed luckiest skills

First, identify all directories in `~/.claude/skills/` that match the pattern `luckiest-*`. For each one:

1. Read its `SKILL.md` file
2. Extract the one-line `description:` value from the YAML frontmatter
3. Display the skill name and description as a clean list

Format each line as:
```
• <skill-name>: <one-line description>
```

If no luckiest skills are installed, output:
```
No luckiest skills installed yet. Use /luckiest skills sync to pull your purchases from luckiest.co.
```

Then jump to Step 3.

## Step 2: Offer sync

After the list, add a blank line, then this prompt:

```
You can pull newly purchased skills by replying "sync" below.
```

## Step 3: Handle sync request

If the user replies "sync" or similar intent:

1. Run this command via Bash: `npx luckiest-co --sync-only`
2. Report what was added (skill names and versions) from the command output
3. If no new skills were synced, acknowledge that the installation is already up to date

If the user does not request sync, skip this step.

## Step 4: Next line

End your response with exactly one line, nothing after it:

```
Next: /luckiest plan
```

Never modify or delete any installed skills. This command is read-only except for the sync operation.
