# Changelog — luckiest-prompt-rewrite

## 1.2.0 — 2026-07-06
### luckiest-thinker integration + analytics
- Added a **Variant diversity** technique to Safe Techniques: when a request asks
  for multiple variants (CRISPE variants, A/B headline sets, name/persona lists,
  creative-domain prompts), invoke the `luckiest-thinker` skill first so the
  options span real diversity instead of near-duplicates of the mode. Skipped for
  single-prompt requests.
- Added the matching variant note to Template D (CRISPE) in `references/templates.md`.
- Insights pass now runs via `luckiest-thinker` (the Luckiest analog of /refract).
- Version bump 1.1.0 → 1.2.0 (frontmatter, `check_updates`, `report_usage`
  `skill_version`, changelog). `report_usage` already present — kept, version synced.

## 1.1.0 — 2026-07-02
### Fable 5 support
- Added a **Claude Fable 5 / Mythos 5** routing block with model-specific guidance
  (longer turns, effort as primary control, over-engineering guard, brevity,
  progress grounding, boundary-setting, subagents, and the hard "don't ask it to
  echo its reasoning → refusal" rule). Sourced from platform.claude.com Fable 5
  prompting docs.
- Added a **Fable 5 gate** to the Claude route: ask once whether the user is
  targeting Fable 5/Mythos 5; if choosing a model, defer to the `model-router`
  skill.
- Model Migration Mode: added the Fable-5 re-fit (strip enumerated behavior lists
  to intent, remove show-your-reasoning instructions).
- Version bump 1.0.0 → 1.1.0 (frontmatter, check_updates, changelog).

## 1.0.0 — 2026-07-01
Rebranded from prompt-master (Nidhin Joseph Nelson, MIT).

### Security pass
- Clean. No prompt injection, credential access, exfiltration, obfuscation, or
  over-broad tools in the source. The only `.env`/"reveal system prompt" hits
  are defensive instructions telling target tools NOT to touch them.

### Best-practices pass
- Rewrote `description` for trigger-matching (added rewrite/adapt/split/migrate
  verbs and concrete trigger phrases including `/luckiest-prompt-rewrite`).
- Added `license`, `metadata.version`, `metadata.listing_id`.
- Fixed a corrupted trailing cell on pattern 37 in `references/patterns.md`.

### Improve pass (/refract)
- Added **Model Migration Mode** — a dedicated route for porting a prompt that
  worked on one model to another, with the specific re-fits (strip CoT moving to
  reasoning-native models, add structure for weaker instruction-followers, add
  literal-scope locks for Claude Opus). The original only covered generic Adapt.

### Network hook
- share-with-tribe — after delivering a prompt the user likes, offer once to
  share it with their Luckiest tribe. Offer only, never auto-post; skips prompts
  containing private context or secrets.

### Trend pass (/newsjack + /luckiest-trends)
- Current Claude lineup is Claude Opus 4.8 and the Claude 5 family — source:
  Claude Code runtime environment, 2026-07-01. The source skill treated Opus 4.7
  as latest. Updated the Claude and Claude Code routing sections and Template M
  to reference Opus 4.8 / Claude 5; behavioral guidance (literal following,
  over-engineering guard, adaptive thinking) carried forward unchanged.
- No other actionable, verifiable signal for the prompt-engineering domain in
  window; the tool-specific routing (GPT-5.x, Gemini 3, MiniMax M2.7, o3) was
  already current and left as-is.

### Rebrand pass
- Directory, `name`, `description`, and all self-references → `luckiest-prompt-rewrite`.
- Copied original MIT LICENSE; wrote ATTRIBUTION.md crediting the original author.

### Version pass
- `metadata.version: "1.0.0"`, `metadata.listing_id: luckiest-prompt-rewrite`.
- Added the Luckiest MCP `check_updates` instruction to the skill body.
