#!/usr/bin/env python3
"""Composition checks on a rendered hold-frame still.

Writes next to the still:
  <name>.overlay.png  thirds (cyan), phi (gold), golden triangles (magenta), safe area (red)
  <name>.squint.png   blurred copy, the brightest/largest blob should be the focal point
  <name>.thumb.png    160px wide copy, focal point and headline must still read
With --focal X,Y, prints the distance to the nearest thirds/phi line and triangle anchor
as a fraction of the frame, and PASS when within 3%.

Usage: frame_check.py still.png [--aspect 16:9|9:16|1:1|4:5] [--focal 1280,360]
Needs Pillow (pip install pillow).
"""
import argparse
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

# top, bottom, left, right as fractions, from references/grids-and-ratios.md
SAFE = {"16:9": (.05, .05, .05, .05), "9:16": (.15, .35, .11, .18),
        "1:1": (.07, .07, .07, .07), "4:5": (.08, .08, .06, .06)}
THIRDS = (1 / 3, 2 / 3)
PHI = (0.382, 0.618)
TOL = 0.03


def guess_aspect(w, h):
    r = w / h
    def ratio(k):
        x, y = map(int, k.split(":"))
        return x / y
    return min(SAFE, key=lambda k: abs(r - ratio(k)))


def triangle_anchors(w, h):
    d = w * w + h * h
    t1, t2 = w * w / d, h * h / d
    pts = [(t1 * w, t1 * h), (t2 * w, t2 * h)]
    return pts + [(w - x, y) for x, y in pts]  # mirrored diagonal


def focal_report(fx, fy, w, h):
    lines = []
    for name, fr in (("thirds", THIRDS), ("phi", PHI)):
        dx = min(abs(fx / w - f) for f in fr)
        dy = min(abs(fy / h - f) for f in fr)
        d = min(dx, dy)
        lines.append((name, d, d <= TOL))
    d = min(max(abs(fx - ax) / w, abs(fy - ay) / h) for ax, ay in triangle_anchors(w, h))
    lines.append(("triangle", d, d <= TOL))
    return lines


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("still")
    ap.add_argument("--aspect", choices=SAFE)
    ap.add_argument("--focal")
    a = ap.parse_args()

    src = Path(a.still)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    aspect = a.aspect or guess_aspect(w, h)
    stroke = max(2, w // 640)

    ov = im.copy()
    dr = ImageDraw.Draw(ov)
    for fr, color in ((THIRDS, (0, 220, 255)), (PHI, (255, 190, 0))):
        for f in fr:
            dr.line([(f * w, 0), (f * w, h)], fill=color, width=stroke)
            dr.line([(0, f * h), (w, f * h)], fill=color, width=stroke)
    dr.line([(0, 0), (w, h)], fill=(255, 0, 200), width=stroke)
    dr.line([(w, 0), (0, h)], fill=(255, 0, 200), width=stroke)
    for ax, ay in triangle_anchors(w, h):
        r = stroke * 4
        dr.ellipse([ax - r, ay - r, ax + r, ay + r], outline=(255, 0, 200), width=stroke)
    t, b, l, r_ = SAFE[aspect]
    dr.rectangle([l * w, t * h, w - r_ * w, h - b * h], outline=(255, 40, 40), width=stroke)
    if a.focal:
        fx, fy = map(float, a.focal.split(","))
        rr = stroke * 6
        dr.ellipse([fx - rr, fy - rr, fx + rr, fy + rr], outline=(255, 255, 255), width=stroke * 2)

    stem = src.with_suffix("")
    ov.save(f"{stem}.overlay.png")
    im.filter(ImageFilter.GaussianBlur(radius=max(8, w // 160))).save(f"{stem}.squint.png")
    im.resize((160, max(1, round(160 * h / w))), Image.LANCZOS).save(f"{stem}.thumb.png")
    print(f"{w}x{h} aspect {aspect}: wrote overlay, squint, thumb next to {src.name}")

    if a.focal:
        ok = False
        for name, d, passed in focal_report(fx, fy, w, h):
            ok |= passed
            print(f"  {name:8} {d:.1%} from nearest {'PASS' if passed else 'off'}")
        print("focal:", "PASS" if ok else "FAIL (not within 3% of any anchor system)")
        sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
