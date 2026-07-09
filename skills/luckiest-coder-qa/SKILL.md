---
name: luckiest-coder-qa
description: >-
  Systematically QA-test a running web app in a real browser, then fix the bugs it
  finds. Explores pages, drives interactions, captures screenshot evidence, scores app
  health, then iteratively fixes each bug in source — one atomic commit per fix — and
  re-verifies with a before/after pair plus a regression test. Use when asked to "qa",
  "QA this", "test this site", "test the app", "find bugs", "does this work?", "test and
  fix", or "fix what's broken". For a bug report with no code changes, run in report-only
  mode ("just report bugs", "qa report only", "test but don't fix"). Suggest it when the
  user says a feature is ready to test.
license: See ATTRIBUTION.md
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
  - WebSearch
metadata:
  version: "1.1.0"
  listing_id: luckiest-coder-qa
  author: luckiest
---

# Luckiest Coder — QA

Drive a real browser against a running app, find bugs with evidence, score health, then
fix and re-verify. Two outcomes:

- **Test → Fix → Verify (default):** find bugs, fix them in source, prove each fix.
- **Report-only:** run the test half and produce a report — never touch code. Use when the
  user says "just report bugs" / "don't fix". Stop after the Report phase; skip Fix Loop on.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-coder-qa", installedSemver: "1.1.0" }`. If it returns
`upToDate: false`, surface the `notice`. Do nothing if `upToDate: true`.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-coder-qa", skill_version: "1.1.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Browser capability (read first)

This skill needs to drive a browser. Use whatever the host provides — a browser MCP, a
`/browse`-style skill, or the built-in preview tools — for: navigate, screenshot, snapshot
the accessibility tree, read console errors, inspect elements, fill/click, resize viewport.
The steps below are tool-agnostic; map each action to your host's equivalent. If no browser
is available, say so and fall back to `curl` for status/response checks only, noting that
visual and interaction testing was skipped.

## Modes

- **Diff-aware** (default on a feature branch with no URL): read `git diff <base>...HEAD`,
  map changed files to affected routes/pages, detect the running local app (common dev
  ports), and test only those pages plus adjacent regressions. Cross-reference commits/PR
  intent — verify the change does what it claims. Fall back to Quick if the diff maps to no
  obvious page (backend/config still needs the app verified).
- **Full** (default when a URL is given): systematic exploration of every reachable page.
- **Quick** (`--quick`): 30-second smoke test — homepage + top 5 nav targets; loads? console
  errors? broken links?
- **Regression** (`--regression <baseline>`): run Full, then diff against a prior
  `baseline.json` — fixed vs new issues, score delta.

Tiers control how much gets fixed later: **Quick** = critical+high, **Standard** = +medium,
**Exhaustive** = +cosmetic.

---

## Test phase (both modes run this)

**1. Initialize.** Create an output dir for screenshots and the report; copy the report
template from [references/qa-report-template.md](references/qa-report-template.md). Start a timer.

**2. Authenticate (if needed).** Log in via the form, or import a cookie file. **Never write
real passwords into the report — redact them.** For 2FA/CAPTCHA, ask the user and wait.

**3. Orient.** Load the target, screenshot, map navigation links, check landing-page console.
Detect the framework (Next.js, Rails, WordPress, SPA) and note it. For SPAs, find nav via the
accessibility snapshot since link-mapping returns little.

**4. Explore.** Visit pages systematically. At each, run the per-page checklist in
[references/issue-taxonomy.md](references/issue-taxonomy.md): visual scan, click every
interactive element, fill/submit forms (empty, invalid, edge cases), check navigation in/out,
check empty/loading/error/overflow states, re-check console after interactions, and test a
mobile viewport where relevant. Spend depth on core features (dashboard, checkout, search),
less on secondary pages.

**5. Document each issue immediately** (don't batch). Interactive bugs get a before/action/
after screenshot sequence plus repro steps; static bugs get one annotated screenshot. Write
each into the report using the template, classified by the taxonomy's severity + category.

**6. Wrap up.** Compute the health score (rubric below), write "Top 3 Things to Fix", a
console-health summary, severity counts, and metadata. Save a `baseline.json`
(`{date, url, healthScore, issues[], categoryScores}`) for future regression runs.

### Health score

Each category starts at 100; weighted average is the final score.
- Console (15%): 0 err→100, 1-3→70, 4-10→40, 10+→10.
- Links (10%): -15 per broken link.
- Visual (10%), Functional (20%), UX (15%), Performance (10%), Content (5%),
  Accessibility (15%): deduct per finding — critical -25, high -15, medium -8, low -3.

`score = Σ(category_score × weight)`, min 0 per category.

**Report-only mode stops here** — write the report and hand it over. No code changes.

---

## Fix phase (default mode only)

**7. Triage.** Sort issues by severity; fix the set the tier allows (Quick: crit+high,
Standard: +medium, Exhaustive: all). Mark anything unfixable from source (third-party
widgets, infra) as deferred.

**8. Fix loop** — per issue, in severity order:
- **Locate** the responsible source file(s) via grep/glob on error text, component names,
  routes. Touch only files directly related to the bug.
- **Fix minimally** — the smallest change that resolves it. No refactoring or unrelated
  "improvements" (invoke a `luckiest-coder-debugging` mindset for root cause when the bug is
  non-obvious).
- **Commit atomically:** `git commit -m "fix(qa): ISSUE-NNN — <desc>"`. One commit per fix,
  never bundled. End with the project's co-author trailer if one is required.
- **Re-test:** reload the page, capture a before/after screenshot pair, check console, verify
  the intended effect.
- **Classify:** *verified* (re-test confirms, no new errors), *best-effort* (applied but
  unverifiable), or *reverted* (`git revert HEAD`, mark deferred) on regression.
- **Regression test** (skip if not verified, or pure CSS, or no test framework): match the
  nearest existing tests' conventions, reproduce the exact precondition that triggered the
  bug, assert correct behavior (never "it renders"), add an attribution comment
  (`// Regression: ISSUE-NNN — <what broke>, found by luckiest-coder-qa <date>`), run just the
  new file, commit as `test(qa): regression test for ISSUE-NNN` on green.

**Self-regulation.** Every 5 fixes (or after any revert) compute a WTF-likelihood: +15% per
revert, +5% per fix touching >3 files, +1% per fix past 15, +20% for touching unrelated
files. **Over 20% → STOP**, show what you've done, ask whether to continue. **Hard cap: 50
fixes.**

**9. Final QA.** Re-run the test phase on affected pages, recompute the health score. If the
final score is *worse* than baseline, warn prominently — something regressed.

**10. Report.** Write the full report (template) with per-issue fix status, commit SHA, files
changed, before/after screenshots, and a summary: issues found, fixes (verified/best-effort/
reverted), deferred, and health delta. Include a one-line PR summary:
"QA found N issues, fixed M, health score X → Y." If a `TODOS.md` exists, add new deferred
bugs and annotate any it listed that you fixed.

---

## After QA

Report plainly: issues found, fixed, deferred, health before → after. State the ship verdict
honestly — do not call an app ship-ready if critical/high issues remain deferred.

**Network hook (share-with-tribe):** After a QA run that fixed bugs, offer once to call the
Luckiest MCP `share_artifact` tool with the health-score delta and fix count so the tribe
leaderboard reflects the quality pass. Never share without the user's yes.
