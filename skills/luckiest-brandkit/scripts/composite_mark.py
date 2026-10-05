#!/usr/bin/env python3
"""Print a real logo mark onto a surface (fabric, paper) that the model drew wrong.

Erase the bad mark first (image retouch, mode erase), then:
  composite_mark.py <erased.png> <mark-ink-on-white.png> <out.png> --x X --y Y --height H
      [--rotate DEG] [--squash 0.86] [--dot "#EE425C"]

Multiply blend keeps folds and shading. --squash fakes top-down foreshortening.
--dot adds a small accent circle right of the mark's foot.
"""
import argparse
from PIL import Image, ImageChops, ImageDraw, ImageFilter

a = argparse.ArgumentParser()
a.add_argument("base"); a.add_argument("mark"); a.add_argument("out")
a.add_argument("--x", type=int, required=True); a.add_argument("--y", type=int, required=True)
a.add_argument("--height", type=int, required=True)
a.add_argument("--rotate", type=float, default=0); a.add_argument("--squash", type=float, default=1.0)
a.add_argument("--dot", default=None)
o = a.parse_args()

base = Image.open(o.base).convert("RGB")
m = Image.open(o.mark).convert("L")
m = m.crop(Image.eval(m, lambda p: 255 - p).getbbox())
m = m.resize((max(1, int(m.width * o.height / m.height)), o.height), Image.LANCZOS)
art = Image.new("L", (m.width + (40 if o.dot else 0), m.height), 255); art.paste(m, (0, 0))
art = Image.merge("RGB", [art] * 3)
if o.dot:
    r = max(3, o.height // 16); cx, cy = m.width + 22, int(o.height * 0.80)
    ImageDraw.Draw(art).ellipse((cx - r, cy - r, cx + r, cy + r), fill=o.dot)
art = art.resize((art.width, max(1, int(art.height * o.squash))), Image.LANCZOS)
art = art.rotate(o.rotate, Image.BICUBIC, expand=True, fillcolor=(255, 255, 255)).filter(ImageFilter.GaussianBlur(0.6))
region = base.crop((o.x, o.y, o.x + art.width, o.y + art.height))
base.paste(ImageChops.multiply(region, art), (o.x, o.y))
base.save(o.out)
print(o.out)
