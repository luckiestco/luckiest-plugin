#!/usr/bin/env python3
"""Grid every image in a folder onto a near-black sheet with tracked labels.

  contact_sheet.py <dir> <out.png> [--cols 5] [--cell 640]

Files sort by name, so prefix shots with 01-, 02-, ... Labels come from the file name.
"""
import argparse, glob, os, re
from PIL import Image, ImageDraw, ImageFont

a = argparse.ArgumentParser()
a.add_argument("dir"); a.add_argument("out")
a.add_argument("--cols", type=int, default=5); a.add_argument("--cell", type=int, default=640)
o = a.parse_args()
fs = sorted(f for f in glob.glob(os.path.join(o.dir, "*")) if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))
            and os.path.abspath(f) != os.path.abspath(o.out)
            and not re.search(r"-[a-z]\.\w+$", os.path.basename(f)))  # skip raw A/B variants
if not fs: raise SystemExit("no images")
cols, cell, g, lab = o.cols, o.cell, 32, 40
rows = -(-len(fs) // cols)
sheet = Image.new("RGB", (cols * cell + (cols + 1) * g, rows * (cell + lab) + (rows + 1) * g), (14, 14, 14))
d = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 20)
except OSError: font = ImageFont.load_default()
for i, f in enumerate(fs):
    im = Image.open(f).convert("RGB"); im.thumbnail((cell, cell), Image.LANCZOS)
    x0 = g + (i % cols) * (cell + g); y0 = g + (i // cols) * (cell + lab + g)
    sheet.paste(im, (x0 + (cell - im.width) // 2, y0 + (cell - im.height) // 2))
    name = os.path.splitext(os.path.basename(f))[0].upper().replace("-", " · ")
    d.text((x0, y0 + cell + 10), "  ".join(name), fill=(150, 150, 150), font=font)
sheet.save(o.out)
print(o.out, len(fs))
