#!/usr/bin/env python3
"""Detect which coding agents are available, then score a prompt against each.

Usage:
    python3 route.py "your prompt text here"
    echo "prompt" | python3 route.py
    python3 route.py --list        # just show what's installed

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


def main():
    args = [a for a in sys.argv[1:]]
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


if __name__ == "__main__":
    main()
