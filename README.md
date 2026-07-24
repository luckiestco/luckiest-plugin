# Luckiest for Claude Code

Luckiest brings your planning flow, tribe, and skill dashboard into Claude Code. Plan your work inside your editor, track progress, and collaborate with your tribe without leaving the CLI.

Luckiest connects to your luckiest.co account, showing live skill bookmarks, tribe leaderboards, and guided planning workflows. All commands respect DRAFT, DOING, and DONE states tracked on luckiest.co.

## Install

```bash
npx luckiest-co
```

Or add the plugin manually:
```bash
npx claude plugin add luckiest-co
```

## Commands

| Command | What it does |
|---------|------------|
| `/luckiest start` | Begin a new skill or goal |
| `/luckiest plan` | Guided planning for a skill or project |
| `/luckiest go` | Move a bookmark to DOING |
| `/luckiest finish` | Mark work done and close |
| `/luckiest status` | Show current work state: DRAFT, DOING, or DONE |
| `/luckiest skills` | List all your bookmarked skills |
| `/luckiest home` | Jump to your luckiest.co home dashboard |
| `/luckiest leaderboard` | See your tribe's weekly activity and progress |
| `/luckiest helpers` | Find and request help from tribe members |
| `/luckiest wishes` | See what your tribe is working toward |
| `/luckiest charms` | View and use your skill boosters |

## Telemetry

When a Luckiest skill runs, the plugin reports anonymized, metadata-only usage so run counts, version adoption, and owner-facing improvement suggestions stay accurate. Exactly these fields are sent: skill slug, plugin version, whether the skill matched and (when observed) succeeded, an error category, duration, a SHA-256 hash of your key, a SHA-256 hash of the session id, and the reporting surface (`hook`, `mcp`, or `cli`). Prompt text, tool output, and file contents are never sent. Reporting is best-effort and never blocks or fails a skill run. Full policy: https://luckiest.co/privacy

## Requirements

- Claude Code (CLI)
- Active luckiest.co account
- Account API key (set via `claude config`)
