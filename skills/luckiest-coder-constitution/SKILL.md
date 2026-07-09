---
name: luckiest-coder-constitution
description: Use to create, amend, or check a project's constitution — the small set of versioned, non-negotiable principles every plan, review, and implementation must obey. Trigger on "set up a constitution", "what are our project rules", "amend the constitution", "does this violate our principles", or the start of any multi-session build where the guardrails should be fixed in writing. Also runs as the Constitution Check gate inside planning and review.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-coder-constitution
  author: luckiest
---

# Project Constitution

## Overview

A constitution is a short, versioned list of non-negotiable principles for a project.
Unlike freeform notes in CLAUDE.md, it is declarative, testable, and gated: every plan
and code review checks against it, so the same rule is not relearned each session.

**Core principle:** Principles are checked, not remembered.

The file lives at `.luckiest/constitution.md`. It supersedes convention and default
behavior; only a direct user instruction overrides it.

## When to use

- **Create** — first time setting durable rules for a project, or the start of a build that will span many sessions.
- **Amend** — a rule changes, is added, or is removed.
- **Check** — before finalizing a plan and before finishing a review (the Constitution Check gate). This is the highest-value use: it catches drift.

## What a principle is

Each principle is one declarative, testable rule with a one-line rationale.

```
✅ III. Service-role writes MUST NOT depend on RLS being off — every table
   migration ships `NO FORCE ROW LEVEL SECURITY`. (Rationale: FORCE RLS has
   broken production writes 7 times.)
❌ "Be careful with database security." (vague, untestable)
```

Use MUST / MUST NOT / SHOULD. If you cannot name the check that would catch a
violation, the principle is too vague — sharpen it or drop it.

Good sources for a first constitution: existing CLAUDE.md hard rules, past
regressions, and stated user preferences. Keep it to 3–7 principles. A constitution
nobody can recite is not enforced.

## Creating or amending

1. Read `.luckiest/constitution.md` if it exists; otherwise start from the structure below.
2. Gather principles from the user, CLAUDE.md, and known past failures. Confirm each with the user before writing — do not invent rules.
3. Write declarative principles with rationale. Remove anything vague.
4. Bump the version (semver):
   - **MAJOR** — a principle removed or redefined incompatibly.
   - **MINOR** — a principle added or materially expanded.
   - **PATCH** — wording, clarification, typo.
5. Set `Last Amended` to today. Set `Ratified` on first creation only.
6. Append a one-line entry to the amendment log.
7. Report the version bump and its rationale to the user.

Do not silently edit principles. Amendments are explicit and logged.

## The Constitution Check gate

When invoked as a gate (from planning, review, or on demand):

1. Read `.luckiest/constitution.md`. If absent, say so and continue — do not block; offer to create one.
2. For each principle, check the plan or diff against it.
3. Report violations as `VIOLATION: <principle> — <where> — <fix>`. Report a clean pass explicitly.
4. A violation blocks completion until fixed or the user explicitly waives it (waivers are noted, not assumed).

## File structure

```markdown
# <Project> Constitution

## Principles

### I. <Name>
<declarative MUST/SHOULD rule>. (Rationale: <why>.)

### II. <Name>
...

## Governance

This constitution supersedes convention and default behavior. Only a direct user
instruction overrides it. Amendments are explicit, versioned, and logged below.

**Version**: X.Y.Z | **Ratified**: YYYY-MM-DD | **Last Amended**: YYYY-MM-DD

## Amendment log
- YYYY-MM-DD vX.Y.Z — <what changed>
```

## Red flags

- Writing a principle you cannot describe a check for → too vague.
- More than ~7 principles → nobody enforces a wall of rules; keep the vital few.
- Editing a principle without a version bump or log entry → silent drift.
- Treating the constitution as advisory → it is a gate, not a suggestion.
- Inventing rules the user never confirmed → confirm first.

## The bottom line

Fix the guardrails in writing once, then check every plan and diff against them.
The constitution is only worth having if it is actually checked.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-coder-constitution", installedSemver: "1.1.0" }`.
If it returns `upToDate: false`, surface the `notice` to the user. Do nothing if `upToDate: true`.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-coder-constitution", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.
