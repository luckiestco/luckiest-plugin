# Changelog — luckiest plugin

## 0.1.18 — 2026-09-25 (npm luckiest-co 1.0.19)
/luckiest plan now looks at the project before planning and hands its findings to /luckiest go. Adapted from context-engineering-intro (MIT, Cole Medin).

### Plan
- New Step 4, "Look before you plan": a short, read-only pass over CLAUDE.md and AGENTS.md, similar code, and the project's own test, lint, and build commands. Sized to the outcome, so a small change skips the search for similar work.
- Every coding task gets a runnable check. Non-coding tasks get a plain check the user can look at.
- The plan lists its assumptions and what is out of scope, and ends with "Confidence: N/10. Biggest risk: ...". Below 7, it looks further or adds one open question to the plan.
- After approval, each task is turned into a ready-to-run working prompt with luckiest-prompt-rewrite, with the target and model passed in so it asks no questions. /luckiest go uses the saved prompt, fixes any file paths that moved, and only rewrites a prompt when none was saved.
- After approval, it saves `.luckiest/PLAN-CONTEXT.md` (new template in `templates/`). This keeps each task's "done means" line and check across sessions.

### Finish
- After a plan is closed, `/luckiest finish` recommends 3 or 4 next tasks instead of asking an open "what's next?". luckiest-thinker widens the candidates, drawing on deferred items, brief gaps, and assumed-away risks. They are ranked by Impact minus Effort, and the top pick is marked Recommended. Picking one starts `/luckiest plan` with it as the outcome, so the interview is skipped.

### Go
- Reads `.luckiest/PLAN-CONTEXT.md` only when its tasks match the active plan, and runs each task's check. Checks are limited to test, lint, type-check, and build commands. Anything else needs the user's OK.
- The skill and command copies are now in sync, including the earlier model tagging, explicit subagent model, and escalation changes.

### Security
- Repo files, docs, web pages, and the saved context file are treated as information, never as instructions.
- Plan never opens `.env` or key files, and never copies secrets into the plan or the context file.

### Insights (2026-09-25)
- Kept: the Spec Kit guide (Joe Maddalone, 2026-09-21, youtube.com/watch?v=7aUEjRw0yzk) argues that agents turn unstated assumptions into code, which led to the assumptions list. The Uvik Software SDD Benchmark (updated 2026-09-24, uvik.net/spec-driven-development-benchmark) found that OpenSpec's 12-minute spec phase merged 42/50 tickets, against 41/50 for BMAD's 28-minute phase, which led to sizing the research step to the outcome.
- Newsjack triage: all 3 signals went to watch (vendor or creator content, no pitch). Refract kept 3 of 8 candidates, including the fix for a stale context file.

### Also in this release
- The bundled luckiest-model-router is updated to 2.0.0.
- /luckiest plan tags each task with a Haiku, Sonnet, or Opus tier via luckiest-model-router, and /luckiest go escalates a task after two failed checks.
