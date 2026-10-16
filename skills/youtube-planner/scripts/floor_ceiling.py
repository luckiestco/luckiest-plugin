#!/usr/bin/env python3
"""Floor and ceiling views for a YouTube topic, from public search results.

Usage:
  floor_ceiling.py '<topic>' [--limit 30] [--json]
  floor_ceiling.py --self-test

Floor = median views. Ceiling = p90 and max views. Fresh = share uploaded in the
last 12 months. Entries with no view count or date are counted, never guessed.
Stdlib only. Calls yt-dlp as an external tool, with no shell.
"""
import argparse
import datetime as dt
import json
import math
import shutil
import statistics
import subprocess
import sys

FRESH_DAYS = 365


def percentile(sorted_vals, p):
    # ponytail: nearest-rank percentile, fine for 10-50 samples
    if not sorted_vals:
        return None
    k = max(0, min(len(sorted_vals) - 1, math.ceil(p / 100 * len(sorted_vals)) - 1))
    return sorted_vals[k]


def summarize(entries, today):
    views = sorted(e["view_count"] for e in entries if isinstance(e.get("view_count"), int))
    dated = [e for e in entries if e.get("upload_date")]
    fresh = 0
    for e in dated:
        d = dt.datetime.strptime(e["upload_date"], "%Y%m%d").date()
        if (today - d).days <= FRESH_DAYS:
            fresh += 1
    top = sorted((e for e in entries if isinstance(e.get("view_count"), int)),
                 key=lambda e: -e["view_count"])[:5]
    return {
        "results": len(entries),
        "with_views": len(views),
        "missing_views": len(entries) - len(views),
        "missing_dates": len(entries) - len(dated),
        "floor_median": int(statistics.median(views)) if views else None,
        "ceiling_p90": percentile(views, 90),
        "ceiling_max": views[-1] if views else None,
        "fresh_share": round(fresh / len(dated), 2) if dated else None,
        "top": [{"views": e["view_count"], "date": e.get("upload_date"),
                 "channel": e.get("channel"), "title": e.get("title")} for e in top],
    }


def search(topic, limit):
    if not shutil.which("yt-dlp"):
        sys.exit("yt-dlp not found. Install it, or ask the user for view counts.")
    # ponytail: full metadata per result is slow (~1s each), flat-playlist lacks dates
    cmd = ["yt-dlp", "--dump-json", "--skip-download", "--no-warnings",
           "--ignore-errors", f"ytsearch{limit}:{topic}"]
    out = subprocess.run(cmd, capture_output=True, text=True, timeout=600).stdout
    entries = []
    for line in out.splitlines():
        try:
            d = json.loads(line)
        except json.JSONDecodeError:
            continue
        entries.append({k: d.get(k) for k in ("view_count", "upload_date", "channel", "title")})
    return entries


def fmt(n):
    return "unknown" if n is None else f"{n:,}"


def report(topic, s):
    print(f"Topic: {topic}")
    print(f"Results: {s['results']} (missing views {s['missing_views']}, missing dates {s['missing_dates']})")
    print(f"Floor (median): {fmt(s['floor_median'])}")
    print(f"Ceiling: p90 {fmt(s['ceiling_p90'])} / max {fmt(s['ceiling_max'])}")
    fs = s["fresh_share"]
    print(f"Fresh (last 12 months): {'unknown' if fs is None else f'{int(fs * 100)}%'}")
    for t in s["top"]:
        print(f"  {t['views']:>12,}  {t['date'] or '????????'}  {(t['channel'] or '')[:20]:<20}  {(t['title'] or '')[:60]}")
    if s["results"] and s["missing_views"] > s["results"] / 3:
        print("Note: over a third of results lack views. Rerun with a larger --limit or use user counts.")


def self_test():
    today = dt.date(2026, 10, 16)
    sample = [
        {"view_count": 1000, "upload_date": "20260901"},
        {"view_count": 5000, "upload_date": "20250101"},
        {"view_count": 20000, "upload_date": "20260501"},
        {"view_count": 300000, "upload_date": "20260101"},
        {"view_count": None, "upload_date": "20260801"},
        {"view_count": 8000, "upload_date": None},
    ]
    s = summarize(sample, today)
    assert s["results"] == 6 and s["with_views"] == 5
    assert s["missing_views"] == 1 and s["missing_dates"] == 1
    assert s["floor_median"] == 8000, s
    assert s["ceiling_max"] == 300000 and s["ceiling_p90"] == 300000
    assert s["fresh_share"] == 0.8, s  # 4 of 5 dated are within 365 days
    assert s["top"][0]["views"] == 300000
    empty = summarize([], today)
    assert empty["floor_median"] is None and empty["fresh_share"] is None
    print("self-test ok")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("topic", nargs="?")
    ap.add_argument("--limit", type=int, default=30)
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--self-test", action="store_true")
    a = ap.parse_args()
    if a.self_test:
        return self_test()
    if not a.topic:
        ap.error("topic is required")
    a.limit = max(1, min(a.limit, 100))
    s = summarize(search(a.topic, a.limit), dt.date.today())
    if a.json:
        print(json.dumps({"topic": a.topic, **s}, indent=2))
    else:
        report(a.topic, s)


if __name__ == "__main__":
    main()
