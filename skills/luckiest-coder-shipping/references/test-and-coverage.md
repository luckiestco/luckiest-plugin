# Tests & Coverage (SHIP phase, steps 3–4)

Load this when the branch has failing tests, no test framework, or you are running the
coverage audit.

## Test failure ownership triage

When a test fails on the merged code, do not stop blindly — determine ownership first.

**Classify each failure** against `git diff origin/<base>...HEAD --name-only`:
- **In-branch** — the failing test file or the code it exercises was changed on this branch,
  or you can trace the failure to a branch change. **When ambiguous, default to in-branch.**
- **Pre-existing** — neither the test nor its code under test was touched on this branch and
  the failure is unrelated to anything in the diff.

**In-branch failures → STOP.** These are the developer's own breakage. Do not ship.

**Pre-existing failures → triage, don't block.** Offer, via AskUserQuestion:
- A) Investigate and fix now (switch to a `luckiest-coder-debugging` mindset: root cause,
  then minimal fix; commit separately as `fix: pre-existing test failure in <file>`).
- B) Add as a P0 TODO and continue.
- C) In a collaborative repo, blame + open an issue for the author
  (`git log -1 --format='%an' -- <file>`; prefer the author of the *source under test* over
  the test file author) and continue.
- D) Skip and note it in the PR body.

After triage: if any in-branch failure remains unfixed, STOP. Otherwise continue.

## Test framework bootstrap (only if none exists)

Detect runtime by manifest (`package.json`, `Gemfile`, `go.mod`, `Cargo.toml`,
`pyproject.toml`, `composer.json`, `mix.exs`) and check for existing config/test dirs.
If a framework is already present, read 2–3 existing test files to learn conventions and
skip bootstrap. If none:

- Confirm the runtime with the user if it can't be detected; let them opt out entirely.
- Pick a current-best framework (WebSearch, or the defaults below), install and configure it,
  write one example test that passes, then generate 3–5 real tests for the
  most-recently-changed, highest-risk files (error handlers and branching logic first —
  never `expect(x).toBeDefined()`; test what the code *does*).
- Add a CI test job (`.github/workflows/test.yml`) if GitHub Actions is the CI.
- Commit as `chore: bootstrap test framework (<name>)`.

Default framework picks: Node/Next → vitest + testing-library; Ruby/Rails → minitest or
rspec; Python → pytest; Go → stdlib testing + testify; Rust → cargo test; PHP → phpunit;
Elixir → ExUnit. Never import secrets or credentials into test files.

## Coverage audit (dispatch as a subagent)

Run in a fresh context via the Agent tool so the parent only sees the conclusion. Instruct
the subagent: audit what was *actually coded* from `git diff <base>...HEAD`, do not commit.

1. **Trace every changed code path.** Read each changed file in full (not just the hunk).
   From each entry point, follow the data: where input comes from, what transforms it, where
   it goes, and what can go wrong (null, invalid input, network failure, empty collection).
   Diagram every added/modified function, every branch (if/else, switch, guard, early return),
   every error path, and every call into another function that has its own branches.

2. **Map user flows and error states**, not just code lines: the sequence of actions that
   touches the change, interaction edge cases (double-submit, navigate-away mid-op, stale
   data, slow network, concurrent tabs), user-visible error states, and empty/zero/boundary
   states.

3. **Check each branch and flow against existing tests.** Score quality: ★★★ behavior +
   edges + error paths, ★★ happy path only, ★ smoke/existence check. Decide the right tool
   per gap: `[→E2E]` for multi-component flows and auth/payment/data-loss paths, `[→EVAL]`
   for LLM/prompt changes, otherwise a unit test.

4. **Regression rule (mandatory, no prompt):** if the diff broke previously-working behavior
   the suite doesn't cover, write the regression test immediately. Commit as
   `test: regression test for <what broke>`.

5. **Output an ASCII coverage diagram** covering both code paths and user flows, ending with
   a `COVERAGE: X/Y (Z%)` line and a gap count.

6. **Generate tests for gaps** (match existing conventions, mock external deps, real
   assertions). Caps: ~30 paths, ~20 generated tests, 2 min exploration per test. Commit
   passing ones as `test: coverage for <feature>`; revert failures and note the gap.

## Coverage gate

Read CLAUDE.md for a `## Test Coverage` section (`Minimum:` / `Target:`); else default
Minimum 60% / Target 80%, using the `COVERAGE: Z%` from the diagram.

- **≥ target** → pass, continue.
- **≥ minimum, < target** → AskUserQuestion: A) generate more tests (loop back, max 2 passes),
  B) ship anyway and record "coverage gate: Z% — user accepted risk" in the PR body,
  C) mark the paths intentionally uncovered.
- **< minimum** → hard gate: recommend generating tests; ship only on explicit user override.

Diff is test-only or docs-only → skip the audit ("no new application code paths to audit").
