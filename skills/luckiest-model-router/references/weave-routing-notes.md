# Weave Router ideas behind model mode

Load this file only when changing the routing rules in `scripts/route.py` or SKILL.md.

Weave Router (github.com/weave-os/router, Apache 2.0) is a Go proxy that picks a model for every upstream API request. It uses an embedding cluster scorer trained offline. This skill ports its routing rules, not its code.

| Rule | Weave source | What this skill does |
|---|---|---|
| Route per action | `docs/SEMANTICS.md`: the router decides per request, not per session | Each plan task gets its own tier |
| Classify first | `internal/router/turntype`: MainLoop, ToolResult, SubAgentDispatch, Compaction and TitleGen each route differently | `TASK_TYPES` in route.py maps task type to a base tier |
| Cost vs quality is one knob | `internal/router/cluster`: α blends cost into the rankings at training time | `--prefer` shifts all tiers by one step |
| Session pin | `session_pin` tables keep a session on one model so the cache stays warm | `depends_on` chains never drop below the tier of the task they build on |
| Struggle escalation | `struggle_escalation_events`: move a session up after repeated failure | Two failed checks lead to one tier higher, with heavy as the ceiling |
| No fail-open | cluster CLAUDE.md: the old heuristic fallback silently sent everything to Haiku and hid regressions | Unsure means standard, with the reason stated |

Later evidence (trend pass, 2026-09-25):
- AI Engineer, "The State of Model Routing" (NVIDIA, Cognition, OpenRouter), 2026-08-06, https://ai.engineer/talks/QHBjufYK8TA-state-model-routing-nvidia-cognition-openrouter. On Terminal-Bench, Opus scored about 3x Haiku at about a tenth of the total cost, because small models loop on tool calls when a task is outside what they handle well. This is the source of the rule that `--prefer cheap` keeps tool-heavy work at standard or above.
- Gonuguntla, "The Replay Gap: Static Evaluation of Model Switching in LLM Agents Scores the Wrong World", arXiv 2608.08239, Aug 2026, https://arxiv.org/abs/2608.08239. Swapping models in the middle of a SWE-bench run rewrote 61-94% of the actions after the swap. This is the source of two rules: keep a dependency chain on one model, and escalate by re-running a task from the start, not by handing it over mid-run.

What was not ported, and why:
- The embedding scorer. It needs ONNX Runtime, embedder assets and trained centroids. The keyword table is the cheap stand-in. If routing quality becomes the bottleneck, swap `route_task` for a model call and keep the output shape.
- Per-request proxying. Claude Code subagents already take a `model` argument, so no proxy is needed.
