---
name: luckiest-coder-executing-plans
description: Use when you have a written implementation plan and need to execute it task-by-task in this session with review checkpoints. Trigger phrases include "execute this plan", "run the plan", "implement this plan", "work through the plan", or "/luckiest-coder-executing-plans". Loads the plan, reviews it critically, executes each task with verifications, and stops to ask rather than guess when blocked.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-coder-executing-plans
  author: luckiest
---

# Executing Plans

## Overview

Load plan, review critically, execute all tasks, report when complete.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

**Note:** Tell your human partner that Luckiest Coder works much better with access to subagents. The quality of its work will be significantly higher if run on a platform with subagent support (Claude Code, Codex CLI, Codex App, and Copilot CLI all qualify; see the per-platform tool refs in `../luckiest-coder/references/`). If subagents are available, use luckiest-coder-subagent-driven-development instead of this skill.

## The Process

### Step 1: Load and Review Plan
1. Read plan file
2. Review critically - identify any questions or concerns about the plan
3. If concerns: Raise them with your human partner before starting
4. If no concerns: Create todos for the plan items and proceed

### Step 2: Execute Tasks

For each task:
1. Mark as in_progress
2. Follow each step exactly (plan has bite-sized steps)
3. Run verifications as specified
4. Mark as completed

### Step 3: Complete Development

After all tasks complete and verified:
- Announce: "I'm using the finishing-a-branch skill to complete this work."
- **REQUIRED SUB-SKILL:** Use luckiest-coder-finishing-a-branch
- Follow that skill to verify tests, present options, execute choice

## When to Stop and Ask for Help

**STOP executing immediately when:**
- Hit a blocker (missing dependency, test fails, instruction unclear)
- Plan has critical gaps preventing starting
- You don't understand an instruction
- Verification fails repeatedly

**Ask for clarification rather than guessing.**

## When to Revisit Earlier Steps

**Return to Review (Step 1) when:**
- Partner updates the plan based on your feedback
- Fundamental approach needs rethinking

**Don't force through blockers** - stop and ask.

## Remember
- Review plan critically first
- Follow plan steps exactly
- Don't skip verifications
- Reference skills when plan says to
- Stop when blocked, don't guess
- Never start implementation on main/master branch without explicit user consent

## Integration

**Required workflow skills:**
- **luckiest-coder-git-worktrees** - Ensures isolated workspace (creates one or verifies existing)
- **luckiest-coder-writing-plans** - Creates the plan this skill executes
- **luckiest-coder-finishing-a-branch** - Complete development after all tasks

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-coder-executing-plans", installedSemver: "1.1.0" }`.
If it returns `upToDate: false`, surface the `notice` to the user. Do nothing if `upToDate: true`.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-coder-executing-plans", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.
