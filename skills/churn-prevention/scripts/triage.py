#!/usr/bin/env python3
"""Tag customer messages (reviews, tickets, survey answers) with Laya, locally.

Usage:
    python3 triage.py messages.txt              # one message per line
    python3 triage.py reviews.csv --column body # one CSV column
    cat messages.txt | python3 triage.py

Optional. It runs only when the user prefers Laya ({"laya": true} in
~/.luckiest/config.json, or LUCKIEST_LAYA=1) and Laya is installed. Otherwise
it exits 2 with one line on stderr, and the skill tags messages by hand as
before. Exit 1 means bad input.

Output: a JSON summary on stdout: intent counts, the share of messages that are
urgent, ask for a refund, or hint at leaving, average frustration (0 calm to 3
very angry), and the most flagged messages to read first. Messages Laya is
unsure about are counted in `unsure` and left out of the numbers.

Same copy in luckiest-customer-research and luckiest-churn-prevention.
"""
import csv
import json
import os
import shutil
import subprocess
import sys

CONFIDENCE_FLOOR = 0.4
FLAGGED_LIMIT = 20
CONFIG_PATH = os.path.expanduser("~/.luckiest/config.json")
INTENTS = ["refund", "technical_help", "billing_question", "information", "cancellation", "other"]


class Unavailable(Exception):
    """Laya is off, missing, or failed. The skill falls back to tagging by hand."""


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


def read_messages(path=None, column=None):
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


def laya_answers(messages):
    """One Laya batch call for all messages. Raises Unavailable on any failure."""
    if not laya_preferred():
        raise Unavailable("laya not preferred (set {\"laya\": true} in ~/.luckiest/config.json)")
    exe = laya_bin()
    if not exe:
        raise Unavailable("laya not installed")
    try:
        run = subprocess.run([exe, "--preset", "triage", "--json", "--batch", "-"],
                             input="\n".join(messages) + "\n", capture_output=True, text=True,
                             timeout=60 + len(messages) // 2)
        if run.returncode != 0:
            raise Unavailable(f"laya failed: {run.stderr.strip()[:200]}")
        answers = [json.loads(l)["answers"] for l in run.stdout.splitlines() if l.strip()]
    except (OSError, subprocess.TimeoutExpired, ValueError, KeyError, TypeError) as e:
        raise Unavailable(f"laya failed: {type(e).__name__}")
    if len(answers) != len(messages):
        raise Unavailable("laya returned the wrong number of rows")
    return answers


def tag(ans):
    """One message's tags, or None when Laya is unsure of its intent."""
    try:
        intent = ans["intent"]
        if intent["answer_confidence"] < CONFIDENCE_FLOOR:
            return None
        return {
            "intent": intent["choice"],
            "frustration": round(float(ans["frustration"]["score"]), 1),
            "urgent": ans["is_urgent"]["noul"] >= 0.5,
            "refund": ans["refund_requested"]["noul"] >= 0.5,
            "churn_risk": ans["churn_risk"]["noul"] >= 0.5,
        }
    except (KeyError, TypeError, ValueError):
        return None


def summarize(messages, answers):
    tags = [(i, tag(a)) for i, a in enumerate(answers)]
    rows = [(i, t) for i, t in tags if t]
    n = len(rows)
    pct = lambda key: round(100 * sum(t[key] for _, t in rows) / n) if n else 0
    intents = {k: 0 for k in INTENTS}
    for _, t in rows:
        intents[t["intent"]] = intents.get(t["intent"], 0) + 1
    # Read first: angriest, then leaving, refund, urgent.
    weight = lambda t: t["frustration"] + 2 * t["churn_risk"] + t["refund"] + t["urgent"]
    flagged = sorted((r for r in rows if weight(r[1]) >= 2), key=lambda r: -weight(r[1]))
    return {
        "engine": "laya",
        "messages": len(messages),
        "tagged": n,
        "unsure": len(messages) - n,
        "intent": intents,
        "urgent_pct": pct("urgent"),
        "refund_pct": pct("refund"),
        "churn_risk_pct": pct("churn_risk"),
        "avg_frustration": round(sum(t["frustration"] for _, t in rows) / n, 2) if n else 0,
        "flagged": [dict(t, row=i + 1, text=messages[i][:240]) for i, t in flagged[:FLAGGED_LIMIT]],
    }


def main(argv):
    column = None
    if "--column" in argv:
        i = argv.index("--column")
        if i + 1 >= len(argv):
            sys.exit("--column needs a name")
        column = argv[i + 1]
        del argv[i:i + 2]
    messages = read_messages(argv[0] if argv else None, column)
    if not messages:
        sys.exit("no messages found")
    try:
        answers = laya_answers(messages)
    except Unavailable as e:
        print(f"laya unavailable: {e}. Tag messages by hand.", file=sys.stderr)
        return 2
    print(json.dumps(summarize(messages, answers), indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
