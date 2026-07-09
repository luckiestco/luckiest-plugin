---
name: luckiest-coder-shipping
description: >-
  Release engineering for a finished feature branch — the step after
  luckiest-coder-finishing-a-branch. Runs the full path to production: merge base,
  test, coverage audit, version bump, changelog, commit, push, open PR, then merge,
  wait for CI, deploy, and verify prod health. Use when the user says "ship it",
  "ship this", "deploy", "push to main", "create a PR", "merge and deploy", "land it",
  "get it to production", or says the code is ready to go out. Invoke this skill
  instead of pushing or opening a PR by hand.
license: See ATTRIBUTION.md
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Agent
  - AskUserQuestion
  - WebSearch
metadata:
  version: "1.1.0"
  listing_id: luckiest-coder-shipping
  author: luckiest
---

# Luckiest Coder — Shipping

Take a finished feature branch all the way to verified production. Three phases run
in order: **SHIP** (branch → PR), **LAND** (merge → deploy), **CANARY** (verify prod).
Stop after SHIP if the user only asked to open a PR; continue into LAND/CANARY when
they say "deploy", "land", or "ship to production".

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-coder-shipping", installedSemver: "1.1.0" }`. If it returns
`upToDate: false`, surface the `notice` to the user. Do nothing if `upToDate: true`.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-coder-shipping", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Operating mode

Ship is **automated** — the user said ship, so ship. Do not ask for confirmation on
mechanical choices (uncommitted changes, changelog wording, commit messages, MICRO/PATCH
bump). **Do** stop for judgment calls: on the base branch, unresolvable merge conflicts,
in-branch test failures, coverage below the gate, a MINOR/MAJOR bump, or the one
irreversible gate — the merge itself (LAND phase).

Re-running is idempotent on *actions* (skip the bump if VERSION already moved, update the
PR body instead of creating a duplicate) but never on *verification* — tests, coverage,
and the readiness report run every time.

---

## PHASE 1 — SHIP (branch → PR)

1. **Pre-flight.** Confirm not on the base/default branch (abort if so: "Ship from a
   feature branch"). `git status`, then `git diff <base>...HEAD --stat` and
   `git log <base>..HEAD --oneline` to see what is shipping.

2. **Merge base first.** `git fetch origin <base> && git merge origin/<base> --no-edit`
   so tests run on the merged state. Auto-resolve trivial conflicts (VERSION, CHANGELOG
   ordering, lockfiles); **stop** on anything ambiguous.

3. **Tests.** Detect the test command (CLAUDE.md `## Testing` section, else auto-detect by
   runtime). Run the full suite on the merged code. On failure, apply the ownership triage
   in [references/test-and-coverage.md](references/test-and-coverage.md): in-branch failures
   **stop** the ship; pre-existing failures are triaged (fix / TODO / skip), not auto-blocking.
   If no test framework exists, offer to bootstrap one — see the same reference.

4. **Coverage audit.** Dispatch as a subagent (fresh context) using the Agent tool. It
   traces every changed code path and user flow, diagrams gaps, and generates tests for
   uncovered paths. Regression tests for broken existing behavior are written immediately,
   no prompt. Full rubric and the coverage gate (default minimum 60% / target 80%) in
   [references/test-and-coverage.md](references/test-and-coverage.md).

5. **Version + changelog.** Auto-decide the bump from the diff: MICRO/PATCH ships silently,
   MINOR/MAJOR **asks**. Update the VERSION file (and `package.json`/manifest if present),
   prepend a CHANGELOG entry generated from the diff.

6. **Commit + push.** Commit any remaining changes in coherent, bisectable chunks. Push the
   branch. End every commit body with the project's required co-author trailer if one is set.

7. **Open / update PR.** Create the PR (or update its body if one exists) with `gh pr create`.
   Body: what changed and why, the coverage summary (`Tests: before → after`), and test results.
   Output the PR URL. **If the user only asked to ship/PR, stop here.**

---

## PHASE 2 — LAND (merge → deploy)

Only enter when the user wants production. This phase contains the **one irreversible step**.

1. **Pre-merge checks.** `gh pr checks` — failing required checks **stop** the land; pending
   checks wait (`gh pr checks --watch --fail-fast`, 15-min cap). `gh pr view --json mergeable`
   — `CONFLICTING` **stops**.

2. **Readiness gate.** Gather evidence and show a readiness report before the merge: review
   freshness (stale if the diff moved significantly since last review — offer a quick inline
   review or point to `luckiest-coder-requesting-code-review`), test results (failing free
   tests are a hard blocker), and doc/PR-body accuracy (warnings). Present it with
   AskUserQuestion — **A) merge / B) hold and fix / C) merge anyway**. This is the last gate;
   the merge cannot be undone without a revert.

3. **Merge.** Try `gh pr merge --auto --delete-branch` first (respects merge queues); fall
   back to `gh pr merge --squash --delete-branch`. **Never call `gh pr merge` twice after a
   non-zero exit** — instead query authoritative state with
   `gh pr view --json state,mergeCommit,mergedAt`: `MERGED` → succeeded (handles the
   concurrent-merge case), `OPEN` + auto-merge set → merge queue (poll up to 30 min),
   `OPEN` + no auto-merge → genuine failure, stop.

4. **Deploy.** Detect how this project ships: a CI deploy workflow triggered by the merge
   (`gh run list --branch <base>`), or a platform CLI (Vercel, Fly, Heroku, etc. — detect
   from config files and CLAUDE.md). Watch the deploy to completion. Report the release
   version and deploy duration.

---

## PHASE 3 — CANARY (verify prod)

After deploy, confirm production is actually healthy — do not declare done on a green
deploy alone.

1. Hit the production URL(s) and confirm 2xx. Check the primary user-facing routes, not just
   the homepage.
2. Watch for console errors, failed requests, and obvious visual breakage on the key pages.
   Compare against the pre-deploy baseline where one exists.
3. Emit a short health report: URLs checked, status codes, any anomalies. If a regression
   appears, surface it immediately with the failing route and error — and recommend a revert
   or rollback rather than trying to hot-patch production.

Deep monitoring detail (baseline capture, page discovery, monitoring loop) is in
[references/canary.md](references/canary.md) — load it only when the user wants continuous
post-deploy watching rather than a one-shot check.

---

## After a clean ship

Report the outcome plainly: PR URL, released version, deploy status, canary result. If any
step was skipped or a failure was accepted, say so — never imply a gate passed that did not.

**Network hook (share-with-tribe):** After a successful production ship, offer to share the
release with the user's Luckiest tribe — call the Luckiest MCP `share_artifact` tool with the
version, one-line changelog summary, and PR URL so the tribe leaderboard reflects the ship.
Offer once; never share without the user saying yes.
