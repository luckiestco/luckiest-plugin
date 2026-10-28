#!/usr/bin/env python3
"""Lint a YouTube title and thumbnail text as one pairing.

Usage:
  pairing.py --title '<title>' [--thumb '<thumbnail words>'] [--json]
  pairing.py <file> [--json]       one 'title | thumb' per line, ranked
  pairing.py --self-test

Checks: desktop search cuts near 60 characters, a mobile feed near 40, and the
hard limit is 100. The thumbnail must not repeat a title word and should carry
3 words or fewer. More than 2 all-caps words reads as spam. Vague adjectives
lose to a number, a name, or a date. The first 3 words must carry the subject.
Score is 0-100: a heuristic for comparing options, not a CTR prediction.
"""
import argparse
import json
import re

DESKTOP, MOBILE, HARD = 60, 40, 100
VAGUE = {"amazing", "awesome", "best", "complete", "crazy", "epic", "everything",
         "huge", "incredible", "insane", "massive", "perfect", "powerful",
         "revolutionary", "secret", "ultimate", "unbelievable"}
FILLER = {"a", "an", "and", "are", "for", "how", "i", "in", "is", "it", "my", "of",
          "on", "or", "that", "the", "this", "to", "what", "why", "with", "you", "your"}


def words(text):
    return re.findall(r"[a-z0-9']+", text.lower())


def has_specific(title):
    # a digit, or a capitalised word after the first (a name, a product, a month)
    return bool(re.search(r"\d", title)) or any(w[:1].isupper() and not w.isupper()
                                                for w in title.split()[1:])


def lint(title, thumb=None):
    t = title.strip()
    n = len(t)
    issues = []
    if n > HARD:
        issues.append(("length", f"{n} chars, over YouTube's {HARD} limit"))
    elif n > DESKTOP:
        issues.append(("length", f"{n} chars, desktop search cuts near {DESKTOP}"))
    if n > MOBILE:
        shown = t[:MOBILE].rsplit(" ", 1)[0]
        issues.append(("mobile", f'mobile feed shows about "{shown}...": does the subject survive?'))
    caps = [w for w in t.split() if len(w) > 2 and w.isupper()]
    if len(caps) > 2:
        issues.append(("caps", f"{len(caps)} all-caps words, keep it to 2"))
    vague = sorted({w for w in words(t) if w in VAGUE})
    if vague:
        issues.append(("vague", f"{', '.join(vague)}: swap for a number, a name, or a date"))
    if not has_specific(t):
        issues.append(("specific", "no number, name, or date"))
    if words(t) and all(w in FILLER for w in words(t)[:3]):
        issues.append(("front", "first 3 words are filler, move the subject forward"))
    if thumb:
        shared = sorted((set(words(t)) - FILLER) & (set(words(thumb)) - FILLER))
        if shared:
            issues.append(("repeat", f"thumbnail repeats {', '.join(shared)}: say what the title does not"))
        if len(words(thumb)) > 3:
            issues.append(("thumb", f"{len(words(thumb))} thumbnail words, 3 is the most that reads at feed size"))
    # ponytail: flat 15 points per issue, weight by kind if scores start tying
    return {"title": t, "thumb": thumb, "chars": n,
            "score": max(0, 100 - 15 * len(issues)), "issues": issues}


def show(r):
    pair = f'"{r["title"]}"' + (f'  +  [{r["thumb"]}]' if r["thumb"] else "")
    print(f"{r['score']:>3}/100  {pair}  ({r['chars']} chars)")
    for kind, msg in r["issues"]:
        print(f"         x {kind:<9} {msg}")


def self_test():
    long = lint("This is a really long title that goes on and on past sixty characters")
    assert any(k == "length" for k, _ in long["issues"]), long
    rep = lint("I Tried 7 Cold Email Tools for 30 Days", "COLD EMAIL WINNER")
    assert any(k == "repeat" for k, _ in rep["issues"]), rep
    clean = lint("I Tried 7 Cold Email Tools for 30 Days", "ONE WON")
    assert clean["issues"] == [] and clean["score"] == 100, clean
    vague = lint("the ultimate guide to growth")
    kinds = {k for k, _ in vague["issues"]}
    assert {"vague", "specific"} <= kinds, vague
    assert any(k == "front" for k, _ in lint("how is it done in 2026")["issues"])
    assert lint("STOP DOING THIS NOW Please")["issues"][0][0] == "caps"
    print("self-test ok")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file", nargs="?")
    ap.add_argument("--title")
    ap.add_argument("--thumb")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--self-test", action="store_true")
    a = ap.parse_args()
    if a.self_test:
        return self_test()
    if a.title:
        rows = [lint(a.title, a.thumb)]
    elif a.file:
        rows = []
        with open(a.file, encoding="utf-8") as fh:
            for line in fh:
                if line.strip():
                    title, _, thumb = line.partition("|")
                    rows.append(lint(title, thumb.strip() or None))
    else:
        ap.error("give --title or a file")
    rows.sort(key=lambda r: -r["score"])
    if a.json:
        print(json.dumps(rows, indent=2))
    else:
        for r in rows:
            show(r)


if __name__ == "__main__":
    main()
