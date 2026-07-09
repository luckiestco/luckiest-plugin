---
name: luckiest-coder-consistency
description: Use before finishing a branch, opening a PR, or calling a multi-step feature done — a read-only cross-check that what was built matches what was planned, with no drift, scope creep, or constitution violations. Trigger on "does this match the plan", "check for drift", "did we build what we said", "consistency check", or the moment implementation is complete and you are about to ship. Distinct from verification (does it run) — this checks does it match intent.
license: See ATTRIBUTION.md
metadata:
  version: "1.1.0"
  listing_id: luckiest-coder-consistency
  author: luckiest
---

# Consistency Check

## Overview

Tests answer "does it run and pass." This answers "does what we built match what we
said we would build." They are different axes. Passing tests on the wrong feature is
still the wrong feature.

**Core principle:** Match intent to implementation before shipping, not after review.

This is **read-only**. It produces a report and, if asked, a remediation list. It does
not edit code — fixing the drift is a separate, explicit step.

## When to use

Run before finishing a branch, opening a PR, or declaring a multi-step feature done —
after `luckiest-coder-verification` confirms it runs, before you ship. On a one-line
fix it is overkill; use it when a plan existed and work spanned several steps.

## Inputs

Gather three things. Skip any that genuinely does not exist, and say so.

1. **Intent** — the plan (from `luckiest-coder-writing-plans`), the spec, the issue, or the brainstorm agreement. What was promised.
2. **Implementation** — the branch diff (`git diff main...HEAD`) and the resulting files.
3. **Constitution** — `.luckiest/constitution.md` if present. Its principles are non-negotiable in this check.

If no intent artifact exists at all, say so and downgrade to a constitution-only check —
do not invent a plan retroactively to grade against.

## Detection passes

Build a short mental inventory of promised items (requirements, user actions, plan
steps), then run these passes. Report high-signal findings only.

- **Coverage gaps** — a promised item with no corresponding code change. The most important pass.
- **Scope creep** — a code change that maps to no promised item. Unrequested work is drift even when it is good code; flag it for a decision, do not silently bless it.
- **Drift** — built differently than planned (different approach, data shape, endpoint, dependency) without the deviation being noted and agreed.
- **Constitution violations** — any diff element conflicting with a MUST principle. Automatically the top severity.
- **Terminology drift** — the same concept named differently across plan and code, which hides coverage.
- **Contradiction** — two parts of the implementation that disagree, or an implementation that contradicts a stated constraint.

## Severity

- **CRITICAL** — violates a constitution MUST, or a core promised item has zero implementation.
- **HIGH** — significant unagreed drift, or scope creep touching security, data, or money paths.
- **MEDIUM** — a secondary item uncovered, terminology drift, minor unagreed deviation.
- **LOW** — wording, cosmetic redundancy, harmless extra.

## Report format

Output Markdown, write nothing:

```
## Consistency Report

| ID | Category | Severity | Where | Finding | Recommendation |
|----|----------|----------|-------|---------|----------------|
| C1 | Coverage gap | CRITICAL | plan step 3 | No code for waitlist opt-in | Implement or drop from scope |

**Coverage:** N of M promised items implemented (X%).
**Scope creep:** <count> changes with no mapped intent.
**Constitution:** PASS / <n> violations.
```

Then a **Next actions** line: if any CRITICAL/HIGH exists, resolve before shipping; if
only LOW/MEDIUM, may ship with the noted follow-ups. Offer a remediation list only if
the user asks — never edit in this skill.

## Red flags

- Editing code from inside this check → it is read-only; drift fixes are separate and explicit.
- Blessing scope creep because "it's good code" → unrequested work is still a scope decision for the user.
- Grading against a plan you reverse-engineered from the diff → circular; say the intent artifact is missing instead.
- Reporting a clean pass without having read the actual diff → read it first.

## The bottom line

Tests prove it works. This proves it is the thing you agreed to build. Run both before
shipping.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-coder-consistency", installedSemver: "1.1.0" }`.
If it returns `upToDate: false`, surface the `notice` to the user. Do nothing if `upToDate: true`.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-coder-consistency", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.
