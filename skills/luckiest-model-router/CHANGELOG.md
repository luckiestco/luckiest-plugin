# Changelog — luckiest-model-router

## 2.0.0 — 2026-09-25
Adds model mode: a per-task model tier (Haiku, Sonnet or Opus) with rules derived from Weave Router (Apache 2.0).

### Security (Pass 1)
- The only Weave Router files read were docs (`README.md`, `NOTICE`, `LICENSE`, `docs/SEMANTICS.md`, `internal/router/cluster/CLAUDE.md`, `internal/router/turntype/CLAUDE.md`) and migration file names. No Weave scripts or code were imported. `route.py` is still stdlib only, with no network, credential or `.env` access.

### Best practices (Pass 2)
- The description now covers both modes and adds model triggers. The body is 97 lines. Weave background moved to `references/weave-routing-notes.md`, which is loaded only when changing the rules.

### Improve (Pass 3)
- `route.py --model`: classifies the task type and maps it to a tier (design, debug and security are heavy; review and implement are standard; research and utility are light).
- Unsure tasks default to standard, never light (from Weave's no-fail-open rule).
- Scope words move a task up one tier. `--prefer quality|balanced|cheap` shifts every task by one tier.
- `--batch` routes a whole plan in one call. A `depends_on` task never drops below the tier of the task it builds on (from Weave's session pin).
- Escalation: two failed checks lead to one tier higher, with heavy as the ceiling (from Weave's struggle escalation).
- Security rules match actions ("harden", "fix auth"), not topic words, so "research how auth works" stays light.
- /refract pass (2026-09-25): 10 candidates were considered and 7 kept:
  - Pasted code or a task over 60 words moves up one tier (matches the server fallback).
  - Invalid `depends_on` indexes produce `warnings` instead of being silently ignored.
  - `LUCKIEST_MODEL_PROVIDER` switches to the openai or google table (matches the server).
  - Escalation lifts dependent tasks that haven't started yet.
  - User phrases such as "keep it cheap" or "best quality" set `--prefer`.
  - Added a `content` task type (draft, copy, email, landing page) so marketing tasks get a clear reason instead of "unsure".
  - Added `scripts/test_route.py`.
  Dropped: negation handling (rare), a separate fan-out research rule (research already routes light), and skill-name typing (the skill name is already matched with the title).
- Network hook: kept the `request_assist` offer from 1.0.0.

### Trend (Pass 4)
- /luckiest-trends run on 2026-09-25 (30-day window: Reddit, HN, YouTube, plus web supplements). Two signals were acted on:
  - AI Engineer, "The State of Model Routing" (NVIDIA, Cognition, OpenRouter), 2026-08-06, https://ai.engineer/talks/QHBjufYK8TA-state-model-routing-nvidia-cognition-openrouter. On Terminal-Bench, Opus scored about 3x Haiku at about a tenth of the total cost, because small models loop on tool calls. Change: `--prefer cheap` never drops design, debug, security or implement tasks below standard.
  - arXiv 2608.08239, "The Replay Gap" (Gonuguntla), Aug 2026, https://arxiv.org/abs/2608.08239. Swapping models mid-run rewrote 61-94% of later actions. Change: escalation re-runs a task from the start instead of handing it over mid-run, and the dependency pin rule is confirmed.
- Considered, no change: "jev-router" (HN, Sept 2026, https://github.com/gargpratyush/jev-router), a cheapest-model router for Claude Code. It was not new relative to model mode. The rest of the results (Siri, watermarking, subagent tutorials) were off-domain and discarded.
- Model IDs were updated to the current family (2026-09-25, from the Claude Code environment): `claude-haiku-4-5-20251001`, `claude-sonnet-5`, `claude-opus-5-5`.
- /news-search run on 2026-09-25. Medialyst was unavailable, so this used host web search and the dates are best-effort:
  - Claude Opus 5.5 was released 2026-09-22 at $4/$20 per MTok, 2x Sonnet 5, and Claude Code now defaults to Opus (llm-stats.com/ai-news, morphllm.com/claude-code-models). Claude Code subagents inherit the session model when none is set (claudefa.st/blog/models/model-selection). Change: model mode and /luckiest go always pass the model explicitly. Heavy tier ID `claude-opus-5-5` confirmed.
  - Considered, no change: LiteLLM's Auto-Router shadow evaluation (Aug 2026 blog, docs.litellm.ai/blog) matched or beat the current model on 88.1% of judged responses, which supports routing but needs no rule change. The nexos.ai claim of 60% savings from its router (Sept 2026, agentic.ai/news) is an unverified vendor claim.

### Rebrand (Pass 5)
- `ATTRIBUTION.md` now credits Weave Router (Workweave, Inc.) and includes its NOTICE text. `LICENSE-weave-router` was added.

### Version (Pass 6)
- Bumped `metadata.version` to 2.0.0 and updated `check_updates` and `report_usage` to 2.0.0.
- Thumbnail: the title "Luckiest Model Router" matches the `nodes` scene on "model". It does not fall back to the hash.

### Related changes outside the skill
- The `plan` MCP tool accepts per-task `model` and `model_reason`. A model sent by the client wins over the server heuristic.
- The server and companion `modelHint.js` fallback IDs were updated to the current models.
- /luckiest plan tags each task with a tier, and /luckiest go escalates after two failed checks.

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-02

First Luckiest edition, built from the first-party `model-router` skill.

### Security (Pass 1)
- Scanned `SKILL.md` and `scripts/route.py`. Clean: no credential/`.env` reads,
  no network egress, no obfuscated commands, no over-broad tool grants. The
  script only calls `shutil.which`, `os.path.exists`, `re`, and reads argv/stdin.

### Best practices (Pass 2)
- Frontmatter conforms to spec: `name` matches directory, description carries
  what-it-does + when-to-use + concrete trigger phrases.
- Body under length budget; single-file skill plus one bundled script.

### Improve (Pass 3)
- Added explicit tie-break rule: prefer **claude** on a genuine score tie.
- Detection covers both CLI-on-PATH and GUI app bundles (e.g. Conductor,
  Cursor) so Mac GUI-only installs are still recognized.
- **Network hook:** offer `request_assist` when the ideal tool for a task is not
  installed, so a tribe member who has it can take the task. Opt-in only.

### Trend (Pass 4)
- Trend pass: no actionable signal. The available trend tools (`/newsjack`,
  `/luckiest-trends`) target marketing news and are off-domain for coding-agent
  routing; nothing verifiable and on-domain surfaced, so no changes were made
  rather than fabricating signal.

### Rebrand (Pass 5)
- Renamed to `luckiest-model-router`; updated name, description, self-references.
- Added first-party `ATTRIBUTION.md` (no upstream license to preserve).

### Version (Pass 6)
- `metadata.version: 1.0.0`, `metadata.listing_id: luckiest-model-router`.
- Added the `check_updates` activation block.
