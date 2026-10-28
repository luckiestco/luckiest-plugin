#!/usr/bin/env python3
"""Read a YouTube Studio audience-retention export and find where viewers leave.

Usage:
  retention.py <retention.csv> [--duration <seconds>] [--transcript <file.srt|.vtt>] [--json]
  retention.py --self-test

Export: Studio > the video > Analytics > Engagement > audience retention chart >
download > "Audience retention". Each row is a position (seconds, or percent of
the video) and the percent still watching. Pass --duration when the position is
a percent, so the opening and the cliffs come out in seconds.

Three readings, three different fixes:
  Hook leak  share lost in the first 30 seconds. Under 25 healthy, under 40 leaking, else severe.
  Cliffs     the 5 steepest drops (points per second): a moment to look at.
  Slide      average loss per second across the middle: pacing, fixed by cutting.
Stdlib only. Reads local files, never the network.
"""
import argparse
import csv
import json
import re

HOOK_SECONDS = 30
CLIFF_MIN = 0.8  # ponytail: fixed drop floor in points, scale by video length if short videos over-report


def load_rows(path):
    rows = []
    with open(path, newline="", encoding="utf-8-sig", errors="replace") as fh:
        for cells in csv.reader(fh):
            nums = []
            for c in cells:
                try:
                    nums.append(float(c.strip().replace("%", "").replace(",", "")))
                except ValueError:
                    pass
            if len(nums) >= 2:
                rows.append((nums[0], nums[1]))
    return rows


def to_seconds(rows, duration):
    if duration and max(x for x, _ in rows) <= 100.5:
        return [(x / 100 * duration, y) for x, y in rows]
    return rows


def load_cues(path):
    text = open(path, encoding="utf-8-sig", errors="replace").read()
    stamp = r"(\d+):(\d\d):(\d\d)[,.](\d+)"
    cues = []
    for block in re.split(r"\n\s*\n", text):
        m = re.search(stamp + r"\s*-->\s*" + stamp, block)
        if not m:
            continue
        g = [int(v) for v in m.groups()]
        start = g[0] * 3600 + g[1] * 60 + g[2] + g[3] / 1000
        end = g[4] * 3600 + g[5] * 60 + g[6] + g[7] / 1000
        words = " ".join(line for line in block[m.end():].splitlines() if line.strip())
        cues.append((start, end, re.sub(r"<[^>]+>", "", words)))
    return cues


def analyze(rows, cues=None):
    start = rows[0][1]
    opening = [y for x, y in rows if x <= HOOK_SECONDS]
    hook_leak = start - min(opening) if opening else 0.0
    band = "healthy" if hook_leak < 25 else "leaking" if hook_leak < 40 else "severe"
    # steepest first: points lost per second, so a sharp drop beats a long gentle one
    drops = [((rows[i - 1][1] - rows[i][1]) / ((rows[i][0] - rows[i - 1][0]) or 1),
              rows[i - 1][1] - rows[i][1], rows[i - 1][0], rows[i][0]) for i in range(1, len(rows))]
    cliffs = []
    for _, lost, x0, x1 in sorted(drops, reverse=True):
        if len(cliffs) == 5:
            break
        if lost < CLIFF_MIN:
            continue
        said = " ".join(c[2] for c in cues or [] if c[0] <= x0 + 4 and c[1] >= x0 - 4)
        cliffs.append({"at": round(x0, 1), "to": round(x1, 1), "lost": round(lost, 2), "said": said[:160]})
    middle = [r for r in rows if r[0] > HOOK_SECONDS]
    span = middle[-1][0] - middle[0][0] if len(middle) > 1 else 0
    slide = (middle[0][1] - middle[-1][1]) / span if span else 0.0
    return {"start": start, "end": rows[-1][1], "hook_leak": round(hook_leak, 2), "hook_band": band,
            "cliffs": cliffs, "slide_per_second": round(slide, 4)}


def report(r):
    print(f"Retention {r['start']:.1f}% -> {r['end']:.1f}%")
    print(f"Hook leak: {r['hook_leak']:.1f} points lost in the first {HOOK_SECONDS}s [{r['hook_band']}]")
    print("Cliffs:")
    for c in r["cliffs"]:
        said = f'  "{c["said"]}"' if c["said"] else ""
        print(f"  -{c['lost']:.1f} at {c['at']:.0f}{said}")
    if not r["cliffs"]:
        print(f"  none over {CLIFF_MIN} points: the loss is slide, not moments")
    print(f"Slide: {r['slide_per_second']:.3f} points per second across the middle")


def self_test():
    # 300s video in percent positions; a 6-point cliff at 15% (45s)
    rows = [(0, 100), (5, 88), (10, 82), (15, 80), (20, 74), (40, 70), (60, 66), (80, 62), (100, 58)]
    rows = to_seconds(rows, 300)
    assert rows[3] == (45.0, 80)
    cues = [(40.0, 46.0, "quick word from our sponsor"), (100.0, 104.0, "later")]
    r = analyze(rows, cues)
    assert r["hook_leak"] == 18 and r["hook_band"] == "healthy", r
    assert r["cliffs"][0]["lost"] == 12 and r["cliffs"][0]["at"] == 0.0, r  # opening drop is steepest
    cliff45 = next(c for c in r["cliffs"] if c["at"] == 45.0)
    assert cliff45["lost"] == 6 and "sponsor" in cliff45["said"], r
    assert r["slide_per_second"] == round((80 - 58) / 255, 4), r  # middle starts at 45s
    assert analyze([(0, 100), (10, 55), (60, 50)])["hook_band"] == "severe"
    print("self-test ok")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("csv", nargs="?")
    ap.add_argument("--duration", type=float)
    ap.add_argument("--transcript")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--self-test", action="store_true")
    a = ap.parse_args()
    if a.self_test:
        return self_test()
    if not a.csv:
        ap.error("csv is required")
    rows = load_rows(a.csv)
    if len(rows) < 8:
        ap.error("need at least 8 data rows from the export")
    rows = to_seconds(rows, a.duration)
    if max(x for x, _ in rows) <= 100.5 and not a.duration:
        print("Note: positions look like percents. Pass --duration for seconds; the hook window is approximate.")
    r = analyze(rows, load_cues(a.transcript) if a.transcript else None)
    if a.json:
        print(json.dumps(r, indent=2))
    else:
        report(r)


if __name__ == "__main__":
    main()
