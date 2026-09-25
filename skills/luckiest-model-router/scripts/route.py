#!/usr/bin/env python3
"""Detect which coding agents are available, then score a prompt against each.

Usage:
    python3 route.py "your prompt text here"
    echo "prompt" | python3 route.py
    python3 route.py --list        # just show what's installed
    python3 route.py --model "task title" [--prefer quality|balanced|cheap]
    python3 route.py --model --batch tasks.json   # or JSON on stdin
        tasks.json: [{"title": ..., "skill": ..., "depends_on": [0]}]

--model picks a model tier (light/standard/heavy) per task. The rules are
ported from Weave Router (Apache 2.0): route each task on its own, classify
the task type first, keep a dependency chain on one model, and never fall
back to the cheap model when unsure. See references/weave-routing-notes.md.

Output: JSON on stdout with available tools and a ranked score per available tool.
The scores are a heuristic starting point, not a verdict. The calling agent is
expected to read the rationale and apply its own judgment on top.

ponytail: keyword heuristic with a known ceiling. If routing quality matters more
than this gives, replace `score_prompt` with a model call; the detection half stays.
"""
import json
import os
import re
import shutil
import sys

# How each tool announces itself on the system. First hit wins.
# A CLI on PATH, or (for GUI-only tools) a known app bundle.
DETECT = {
    "claude":    {"cli": ["claude"],                    "app": []},
    "codex":     {"cli": ["codex"],                     "app": []},
    "cursor":    {"cli": ["cursor-agent", "cursor"],    "app": ["/Applications/Cursor.app"]},
    "conductor": {"cli": ["conductor"],                 "app": ["/Applications/Conductor.app"]},
    "factory":   {"cli": ["droid", "factory"],          "app": []},
}

# What each tool is comparatively good at, as (signal, weight) rules.
# `signal` is a regex matched case-insensitively against the prompt.
# Every available tool also gets its `base` score so a no-signal prompt still ranks.
PROFILES = {
    "claude": {
        "base": 3,
        "good_at": "Deep multi-file reasoning, refactors, debugging, architecture, "
                   "writing and explaining code. Strong all-rounder and default pick.",
        "rules": [
            (r"\b(refactor|architecture|design|debug|why|explain|understand|root cause)\b", 3),
            (r"\b(multi-file|across (the )?codebase|whole (repo|project)|trace)\b", 2),
            (r"\b(review|write|document|test|reason)\b", 1),
        ],
    },
    "codex": {
        "base": 2,
        "good_at": "Autonomous long-running coding in a sandbox, algorithmic and "
                   "self-contained implementation tasks, running to completion unattended.",
        "rules": [
            (r"\b(algorithm|leetcode|competitive|solve|implement (a|the)|from scratch)\b", 3),
            (r"\b(sandbox|autonomous|run (it )?to completion|long.running|unattended)\b", 2),
            (r"\b(script|function|module)\b", 1),
        ],
    },
    "cursor": {
        "base": 2,
        "good_at": "Fast in-editor edits and inline iteration while a file is open; "
                   "quick local changes, tab-style completions, tight edit loops.",
        "rules": [
            (r"\b(inline|in the editor|open file|this file|quick|small|tweak|autocomplete|tab)\b", 3),
            (r"\b(edit|change|fix (this|the) line|rename|adjust)\b", 2),
        ],
    },
    "conductor": {
        "base": 1,
        "good_at": "Orchestrating several agents in parallel across worktrees; "
                   "many independent tasks fanned out at once on a Mac.",
        "rules": [
            (r"\b(parallel|in parallel|at (the )?same time|fan.?out|multiple (tasks|agents|branches)|worktrees?)\b", 4),
            (r"\b(orchestrate|batch|several (features|tasks|tickets))\b", 2),
        ],
    },
    "factory": {
        "base": 1,
        "good_at": "Enterprise end-to-end delivery, spec-to-PR, background/remote "
                   "execution across many integrated tools (droids).",
        "rules": [
            (r"\b(end.to.end|spec.to.pr|ticket|jira|linear|ship (a|the) (feature|pr)|delivery)\b", 3),
            (r"\b(background|remote|ci|pipeline|integration|enterprise)\b", 2),
        ],
    },
}


def detect():
    """Return the subset of tools actually available on this machine."""
    found = {}
    for name, how in DETECT.items():
        hit = next((c for c in how["cli"] if shutil.which(c)), None)
        if not hit:
            hit = next((p for p in how["app"] if os.path.exists(p)), None)
        if hit:
            found[name] = hit
    return found


def score_prompt(prompt, tools):
    prompt = prompt.lower()
    ranked = []
    for name in tools:
        prof = PROFILES[name]
        score = prof["base"]
        hits = []
        for pattern, weight in prof["rules"]:
            if re.search(pattern, prompt, re.I):
                score += weight
                hits.append(pattern)
        ranked.append({
            "tool": name,
            "command": tools[name],
            "score": score,
            "good_at": prof["good_at"],
            "matched_signals": hits,
        })
    ranked.sort(key=lambda r: r["score"], reverse=True)
    return ranked


# ---- Model tier routing (--model) ----------------------------------------

TIERS = ["light", "standard", "heavy"]
# Same provider table as server/mcp/modelHint.js. LUCKIEST_MODEL_PROVIDER picks one.
PROVIDER_MODELS = {
    "anthropic": {"light": "claude-haiku-4-5-20251001", "standard": "claude-sonnet-5", "heavy": "claude-opus-5-5"},
    "openai": {"light": "gpt-5-mini", "standard": "gpt-5", "heavy": "gpt-5"},
    "google": {"light": "gemini-flash", "standard": "gemini-pro", "heavy": "gemini-pro"},
}
MODELS = PROVIDER_MODELS.get(os.environ.get("LUCKIEST_MODEL_PROVIDER", "anthropic"),
                             PROVIDER_MODELS["anthropic"])

# Task types, checked in order; first match wins. Each maps to a base tier.
# Heavy types are checked first so "research then redesign" is not routed light.
TASK_TYPES = [
    ("design", "heavy", r"\b(architect(ure)?|design (the|a)|schema|migration|data model|system design|trade.?offs?|rfc|strategy|pricing model)\b"),
    ("debug", "heavy", r"\b(debug|root cause|race condition|flaky|deadlock|memory leak|why (is|does)|investigate (a|the) (bug|failure|crash))\b"),
    # Security needs an action, not a topic word: "research how auth works" stays research.
    ("security", "heavy", r"\b(harden|secure (the|our|a)|security (fix|review|audit)|vulnerab\w*|exploit|threat model|permission model|rotate (keys|secrets)|(fix|change|rewrite|refactor) (the )?auth\w*)\b"),
    ("review", "standard", r"\b(review|audit|critique|check (the|my))\b"),
    ("implement", "standard", r"\b(implement|build|add|create|write|refactor|fix|wire|integrate|ship|update|test)\b"),
    ("content", "standard", r"\b(draft|compose|copy|email|newsletter|post|blog|landing page|calendar|outline|script)\b"),
    ("research", "light", r"\b(research|look up|find|search|explore|list|locate|summari[sz]e|read|scan|gather|collect)\b"),
    ("utility", "light", r"\b(rename|format|lint|typo|bump|title|label|tag|move|copy|translate|reword)\b"),
]
# Signals that push a task one tier up regardless of type.
UPSHIFT = r"\b(across (the )?(codebase|repo)|multi.file|end.to.end|whole (app|system)|production|irreversible|data loss)\b"
PREFER_SHIFT = {"cheap": -1, "balanced": 0, "quality": 1}
# Multi-step tool work never drops to light, even with --prefer cheap. Small
# models outside their comfort zone loop on tool calls and end up costing more
# (AI Engineer, "The State of Model Routing", 2026-08-06).
LIGHT_FLOOR_EXEMPT = {"research", "utility", "content", "review"}


def _shift(tier, n):
    return TIERS[max(0, min(len(TIERS) - 1, TIERS.index(tier) + n))]


def route_task(title, skill=None, prefer="balanced"):
    text = f"{title} {skill or ''}"
    task_type, tier, hits = None, None, []
    for name, base, pattern in TASK_TYPES:
        m = re.search(pattern, text, re.I)
        if m:
            task_type, tier, hits = name, base, [m.group(0)]
            break
    if task_type is None:
        # Weave rule: never fail open to the cheap model. Unsure means standard.
        return {"tier": "standard", "model": MODELS["standard"], "task_type": "unsure",
                "reason": "unsure: no task-type signal, defaulting to standard", "signals": []}
    reason = f"{task_type} task"
    up = re.search(UPSHIFT, text, re.I)
    if up:
        tier = _shift(tier, 1)
        hits.append(up.group(0))
        reason += f", upshift for '{up.group(0)}'"
    elif "```" in title or len(title.split()) > 60:
        # Same rule as the server fallback: pasted code or a long spec is heavier work.
        tier = _shift(tier, 1)
        reason += ", upshift for long or code-bearing task"
    if PREFER_SHIFT.get(prefer, 0):
        tier = _shift(tier, PREFER_SHIFT[prefer])
        reason += f", prefer {prefer}"
        if tier == "light" and task_type not in LIGHT_FLOOR_EXEMPT:
            tier = "standard"
            reason += ", held at standard (tool-heavy work loops on small models)"
    return {"tier": tier, "model": MODELS[tier], "task_type": task_type,
            "reason": reason, "signals": hits}


def route_batch(tasks, prefer="balanced"):
    """Route each task, then pin dependent chains to one model (Weave session pin).

    A task that depends on another inherits the higher of the two tiers, so a
    chain shares one model and its context, unless a later task needs more.
    """
    out = [dict(route_task(t.get("title", ""), t.get("skill"), prefer), title=t.get("title", ""))
           for t in tasks]
    warnings = []
    for i, t in enumerate(tasks):
        for dep in t.get("depends_on") or []:
            if not (isinstance(dep, int) and 0 <= dep < i):
                warnings.append(f"task {i}: depends_on {dep!r} ignored, must be an earlier task index")
                continue
            a, b = out[dep], out[i]
            if TIERS.index(a["tier"]) > TIERS.index(b["tier"]):
                b.update(tier=a["tier"], model=a["model"],
                         reason=b["reason"] + f", pinned to task {dep} model")
    return out, warnings


def main():
    args = [a for a in sys.argv[1:]]
    if "--model" in args:
        return model_main([a for a in args if a != "--model"])
    list_only = "--list" in args
    args = [a for a in args if a != "--list"]
    prompt = " ".join(args).strip() or (sys.stdin.read().strip() if not sys.stdin.isatty() else "")

    tools = detect()
    if not tools:
        print(json.dumps({"available": {}, "ranking": [],
                          "note": "No supported coding agents detected."}, indent=2))
        return

    if list_only or not prompt:
        print(json.dumps({"available": tools}, indent=2))
        return

    ranking = score_prompt(prompt, tools)
    print(json.dumps({
        "available": tools,
        "recommended": ranking[0]["tool"],
        "ranking": ranking,
    }, indent=2))


def model_main(args):
    prefer = "balanced"
    if "--prefer" in args:
        i = args.index("--prefer")
        prefer = args[i + 1] if i + 1 < len(args) else "balanced"
        del args[i:i + 2]
    if prefer not in PREFER_SHIFT:
        sys.exit(f"--prefer must be one of {', '.join(PREFER_SHIFT)}")
    if "--batch" in args:
        args.remove("--batch")
        raw = open(args[0]).read() if args else sys.stdin.read()
        tasks = json.loads(raw)
        if not isinstance(tasks, list):
            sys.exit("--batch expects a JSON array of tasks")
        routed, warnings = route_batch(tasks, prefer)
        result = {"prefer": prefer, "tasks": routed}
        if warnings:
            result["warnings"] = warnings
        print(json.dumps(result, indent=2))
        return
    title = " ".join(args).strip() or (sys.stdin.read().strip() if not sys.stdin.isatty() else "")
    if not title:
        sys.exit("give a task title")
    print(json.dumps(dict(route_task(title, None, prefer), prefer=prefer), indent=2))


if __name__ == "__main__":
    main()
