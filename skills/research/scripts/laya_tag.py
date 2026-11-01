#!/usr/bin/env python3
"""Tag many short texts with Laya, locally, and list the ones worth reading first.

Usage:
    python3 laya_tag.py --preset guard passages.txt       # one item per line
    python3 laya_tag.py --preset moderation comments.csv --column text
    python3 laya_tag.py --questions my-questions.json items.txt
    cat items.txt | python3 laya_tag.py --preset guard
    add --all to print every item's tags, not only the flagged ones

Presets come with Laya: guard (jailbreak, prompt_injection, sensitive_data,
harm_severity, topic) and moderation (toxic, harassment, threat, spam,
severity). --questions takes a JSON file in Laya's question format.

Optional. It runs only when the user prefers Laya ({"laya": true} in
~/.luckiest/config.json, or LUCKIEST_LAYA=1) and Laya is installed. Otherwise
it exits 2 with one line on stderr, and the skill does that step by hand as
before. Exit 1 means bad input.

Output: JSON with yes counts per yes/no question, counts per choice, the
average per score, and the flagged items: any confident yes, or a score of 2
or more out of 3. Answers under the confidence floor are left out, and items
with no confident answer are counted in `unsure`.

Same copy in every skill that ships it.
"""
import csv
import json
import os
import shutil
import subprocess
import sys

CONFIDENCE_FLOOR = 0.4
FLAG_SCORE = 2.0
FLAGGED_LIMIT = 50
CONFIG_PATH = os.path.expanduser("~/.luckiest/config.json")


class Unavailable(Exception):
    """Laya is off, missing, or failed. The skill falls back to doing the step by hand."""


def laya_preferred():
    env = os.environ.get("LUCKIEST_LAYA")
    if env:
        return env.strip().lower() in ("1", "true", "yes", "on")
    try:
        with open(CONFIG_PATH) as f:
            return json.load(f).get("laya") is True
    except (OSError, ValueError, AttributeError):
        return False


def laya_bin():
    venv = os.path.expanduser("~/.venvs/laya/bin/laya")
    return shutil.which("laya") or (venv if os.access(venv, os.X_OK) else None)


def read_items(path=None, column=None):
    f = open(path, newline="", encoding="utf-8") if path else sys.stdin
    with f:
        if column:
            reader = csv.DictReader(f)
            if column not in (reader.fieldnames or []):
                sys.exit(f"column {column!r} not found, have: {', '.join(reader.fieldnames or [])}")
            rows = [r[column] or "" for r in reader]
        else:
            rows = f.read().splitlines()
    return [" ".join(r.split()) for r in rows if r.strip()]


def laya_answers(items, mode):
    """One Laya batch call. mode is ["--preset", name] or ["--questions", path]."""
    if not laya_preferred():
        raise Unavailable("laya not preferred (set {\"laya\": true} in ~/.luckiest/config.json)")
    exe = laya_bin()
    if not exe:
        raise Unavailable("laya not installed")
    try:
        run = subprocess.run([exe, *mode, "--json", "--batch", "-"],
                             input="\n".join(items) + "\n", capture_output=True, text=True,
                             timeout=60 + len(items) // 2)
        if run.returncode != 0:
            raise Unavailable(f"laya failed: {run.stderr.strip()[-200:]}")
        answers = [json.loads(l)["answers"] for l in run.stdout.splitlines() if l.strip()]
    except (OSError, subprocess.TimeoutExpired, ValueError, KeyError, TypeError) as e:
        raise Unavailable(f"laya failed: {type(e).__name__}")
    if len(answers) != len(items):
        raise Unavailable("laya returned the wrong number of rows")
    return answers


def tags(ans):
    """Confident answers only: yes/no -> bool, score -> 0-3, choice -> label."""
    out = {}
    for q, a in (ans or {}).items():
        try:
            if a["answer_confidence"] < CONFIDENCE_FLOOR:
                continue
            kind = a["type"]
            if kind == "noul":
                out[q] = a["noul"] >= 0.5
            elif kind == "score":
                out[q] = round(float(a["score"]), 1)
            elif kind == "choice":
                out[q] = a["choice"]
        except (KeyError, TypeError, ValueError):
            continue
    return out


def flagged(t):
    return any(v is True or (type(v) is float and v >= FLAG_SCORE) for v in t.values())


def summarize(items, answers, show_all=False):
    rows = [tags(a) for a in answers]
    counts = {}
    for t in rows:
        for q, v in t.items():
            if type(v) is bool:
                counts.setdefault(q, {"yes": 0, "no": 0})["yes" if v else "no"] += 1
            elif type(v) is float:
                counts.setdefault(q, []).append(v)
            else:
                c = counts.setdefault(q, {})
                c[v] = c.get(v, 0) + 1
    for q, v in counts.items():
        if type(v) is list:
            counts[q] = {"avg": round(sum(v) / len(v), 2), "n": len(v)}
    hits = [i for i, t in enumerate(rows) if flagged(t)]
    pick = range(len(rows)) if show_all else hits[:FLAGGED_LIMIT]
    return {
        "engine": "laya",
        "items": len(items),
        "unsure": sum(1 for t in rows if not t),
        "flagged_count": len(hits),
        "counts": counts,
        ("all" if show_all else "flagged"): [
            {"row": i + 1, "text": items[i][:240], "tags": rows[i], "flagged": flagged(rows[i])}
            for i in pick],
    }


def pop_opt(argv, name):
    if name not in argv:
        return None
    i = argv.index(name)
    if i + 1 >= len(argv):
        sys.exit(f"{name} needs a value")
    value = argv[i + 1]
    del argv[i:i + 2]
    return value


def main(argv):
    argv = list(argv)
    show_all = "--all" in argv
    argv = [a for a in argv if a != "--all"]
    preset, questions, column = (pop_opt(argv, n) for n in ("--preset", "--questions", "--column"))
    if bool(preset) == bool(questions):
        sys.exit("give exactly one of --preset NAME or --questions FILE")
    if questions and not os.path.isfile(questions):
        sys.exit(f"questions file not found: {questions}")
    items = read_items(argv[0] if argv else None, column)
    if not items:
        sys.exit("no items found")
    mode = ["--preset", preset] if preset else ["--questions", questions]
    try:
        answers = laya_answers(items, mode)
    except Unavailable as e:
        print(f"laya unavailable: {e}. Do this step by hand.", file=sys.stderr)
        return 2
    print(json.dumps(summarize(items, answers, show_all), indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
