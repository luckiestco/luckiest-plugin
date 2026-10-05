#!/usr/bin/env python3
"""Warp exact artwork onto a flat surface in a photo (billboard, screen, poster, sign).

  composite_screen.py <photo.png> <art.png> <out.png> TLx,TLy TRx,TRy BRx,BRy BLx,BLy [--fit crop|stretch]

Corners are the surface's inner corners in photo pixels, clockwise from top left.
--fit crop (default) center-crops the art to the surface's aspect. The art is lit by
the surface's own smoothed light falloff, so old text on the surface never shows through.
"""
import argparse, math
import numpy as np
from PIL import Image, ImageChops, ImageFilter

a = argparse.ArgumentParser()
a.add_argument("photo"); a.add_argument("art"); a.add_argument("out")
a.add_argument("corners", nargs=4); a.add_argument("--fit", choices=["crop", "stretch"], default="crop")
o = a.parse_args()

bg = Image.open(o.photo).convert("RGB"); art = Image.open(o.art).convert("RGB")
dst = [tuple(map(float, c.split(","))) for c in o.corners]
if o.fit == "crop":  # aspect from the average edge lengths of the quad
    d = lambda p, q: math.dist(p, q)
    ratio = (d(dst[0], dst[1]) + d(dst[3], dst[2])) / (d(dst[0], dst[3]) + d(dst[1], dst[2]))
    w, h = art.size
    if w / h > ratio: nw = int(h * ratio); art = art.crop(((w - nw) // 2, 0, (w + nw) // 2, h))
    else: nh = int(w / ratio); art = art.crop((0, (h - nh) // 2, w, (h + nh) // 2))
src = [(0, 0), (art.width, 0), (art.width, art.height), (0, art.height)]
A, B = [], []
for (x, y), (u, v) in zip(dst, src):  # PIL maps output -> input
    A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; B += [u, v]
k = tuple(np.linalg.solve(np.array(A, float), np.array(B, float)))
warped = art.transform(bg.size, Image.PERSPECTIVE, k, Image.BICUBIC)
mask = Image.new("L", art.size, 255).transform(bg.size, Image.PERSPECTIVE, k, Image.BICUBIC).filter(ImageFilter.GaussianBlur(1))
# max filter removes dark text from the light map, blur keeps only the falloff
lum = bg.convert("L").filter(ImageFilter.MaxFilter(31)).filter(ImageFilter.GaussianBlur(40)).point(lambda p: min(255, int(p * 255 / 225)))
Image.composite(ImageChops.multiply(warped, Image.merge("RGB", [lum] * 3)), bg, mask).save(o.out)
print(o.out)
