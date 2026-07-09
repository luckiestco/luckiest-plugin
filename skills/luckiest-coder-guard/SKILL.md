---
name: luckiest-coder-guard
description: >-
  Safety guardrails for risky sessions. Warns before destructive shell commands
  (rm -rf, DROP TABLE, TRUNCATE, git push --force, git reset --hard, kubectl delete,
  docker prune) and can hard-block file edits outside a chosen directory. Use when
  touching production, debugging live systems, or working in a shared repo. Trigger
  phrases: "be careful", "safety mode", "prod mode", "guard mode", "full safety",
  "lock it down", "freeze edits to this folder", "restrict edits", and "unfreeze" /
  "unlock edits" to clear the boundary.
license: See ATTRIBUTION.md
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/bin/check-careful.sh"
          statusMessage: "Checking for destructive commands..."
    - matcher: "Edit"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/bin/check-freeze.sh"
          statusMessage: "Checking freeze boundary..."
    - matcher: "Write"
      hooks:
        - type: command
          command: "bash ${CLAUDE_SKILL_DIR}/bin/check-freeze.sh"
          statusMessage: "Checking freeze boundary..."
metadata:
  version: "1.1.0"
  listing_id: luckiest-coder-guard
  author: luckiest
---

# Luckiest Coder — Guard

Session-scoped safety rails, enforced by PreToolUse hooks (not by remembering to be
careful). Two protections, independently controllable:

- **Careful** — every Bash command is screened for destructive patterns and you are asked
  to confirm before it runs. Active as soon as this skill is on. Nothing to configure.
- **Freeze** — Edit/Write to any file outside a chosen directory is *blocked* (denied, not
  just warned). Off until you set a boundary.

"Guard mode" is simply both at once: careful is always on, plus a freeze boundary.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-coder-guard", installedSemver: "1.1.0" }`. If it returns
`upToDate: false`, surface the `notice`. Do nothing if `upToDate: true`.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-coder-guard", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Activating

Tell the user careful mode is now active: destructive commands will prompt for
confirmation before running, and they can always override. Then ask what they want:

- **Just careful** (warnings only) → done, no boundary needed.
- **Freeze / guard** (also lock edits to one folder) → run the Set a boundary step below.

## Set a boundary (freeze / guard)

Ask, via AskUserQuestion with a free-text answer, which directory edits should be
restricted to. Files outside it will be blocked. Then persist it:

```bash
BOUNDARY=$(cd "<user-provided-path>" 2>/dev/null && pwd -P)
[ -z "$BOUNDARY" ] && { echo "That path does not exist — pick an existing directory."; exit 1; }
STATE_DIR="${CLAUDE_PLUGIN_DATA:-$HOME/.luckiest}"
mkdir -p "$STATE_DIR"
printf '%s/\n' "${BOUNDARY%/}" > "$STATE_DIR/freeze-dir.txt"
echo "Freeze boundary set: ${BOUNDARY%/}/"
```

Tell the user: edits are now restricted to that directory; any Edit or Write outside it is
blocked. To change it, run this step again. To remove it, run the Unfreeze step.

## Unfreeze (clear the boundary)

Removes the edit restriction without ending the session. Careful-mode warnings stay on.

```bash
STATE_DIR="${CLAUDE_PLUGIN_DATA:-$HOME/.luckiest}"
if [ -f "$STATE_DIR/freeze-dir.txt" ]; then
  PREV=$(cat "$STATE_DIR/freeze-dir.txt")
  rm -f "$STATE_DIR/freeze-dir.txt"
  echo "Freeze boundary cleared (was: $PREV). Edits allowed everywhere again."
else
  echo "No freeze boundary was set."
fi
```

## What careful mode catches

| Pattern | Example | Risk |
|---|---|---|
| `rm -rf` / `rm -r` / `--recursive` | `rm -rf /var/data` | Recursive delete |
| `DROP TABLE` / `DROP DATABASE` | `DROP TABLE users;` | Data loss |
| `TRUNCATE` | `TRUNCATE orders;` | Data loss |
| `git push --force` / `-f` | `git push -f origin main` | History rewrite |
| `git reset --hard` | `git reset --hard HEAD~3` | Uncommitted work loss |
| `git checkout .` / `git restore .` | `git checkout .` | Uncommitted work loss |
| `kubectl delete` | `kubectl delete pod x` | Production impact |
| `docker rm -f` / `system prune` | `docker system prune -a` | Container/image loss |

**Safe exceptions** (no warning): recursive delete of `node_modules`, `.next`, `dist`,
`build`, `__pycache__`, `.cache`, `.turbo`, `coverage`.

## Limits (be honest about these)

- This prevents *accidents*, it is not a security boundary. A Bash command like `sed -i` or
  `> file` can still modify files outside the freeze boundary — only the Edit/Write tools are
  gated. Careful screens command *text*; it does not sandbox execution.
- Hooks and the boundary are **session-scoped**. Warnings and blocks stop when the
  conversation ends; the boundary state file is cleared by the Unfreeze step or ignored once
  the hooks are no longer registered.
- Boundary matching resolves symlinks; if both the boundary and a target's parent directory
  are unresolvable, a path may be over-blocked. Point the boundary at a directory that exists.

Network hook: N/A — a guardrail emits no shareable artifact.
