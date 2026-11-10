#!/usr/bin/env python3
"""
Shrink local product photos so an agent can read them as images.

Fits each image inside 1024x1024, converts it to JPEG (quality 85), then lowers
quality and scale until the file is at most 145 KB. Reads local files only and
makes no network calls. Needs Pillow (pip install pillow).

Usage:
  python3 compress_product_img.py --images photo.jpg [more.jpg ...] [--out-dir DIR]

Prints one line per image:
  [COMPRESSED] <out path> (1200KB -> 140KB, 1024x768)
"""

import argparse
import io
import os
import sys
import tempfile
import uuid

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("[ERROR] Pillow is not installed. Run: pip install pillow")

MAX_DIM = 1024
MAX_BYTES = 148_480  # 145 KB, under the agent Read tool's image size limit


def _open_rgb(raw: bytes) -> Image.Image:
    img = Image.open(io.BytesIO(raw))
    img = ImageOps.exif_transpose(img) or img
    return img.convert("RGB") if img.mode != "RGB" else img


def compress(raw: bytes) -> tuple[bytes, int, int]:
    """Return (jpeg_bytes, width, height), at most MAX_BYTES when reachable."""
    img = _open_rgb(raw)
    img.thumbnail((MAX_DIM, MAX_DIM), Image.Resampling.LANCZOS)
    base_w, base_h = img.size

    quality, scale = 85, 1.0
    while True:
        size = (max(1, round(base_w * scale)), max(1, round(base_h * scale)))
        frame = img if scale == 1.0 else img.resize(size, Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        frame.save(buf, format="JPEG", quality=quality)
        out = buf.getvalue()
        if len(out) <= MAX_BYTES or (quality <= 30 and scale <= 0.3):
            return out, frame.width, frame.height
        if quality > 30:
            quality -= 10
        else:
            scale -= 0.1


def main():
    parser = argparse.ArgumentParser(description="Shrink product photos for agent vision")
    parser.add_argument("--images", nargs="+", required=True, help="Local image paths")
    parser.add_argument("--out-dir", default=tempfile.gettempdir(), help="Where to write JPEGs")
    args = parser.parse_args()
    os.makedirs(args.out_dir, exist_ok=True)

    for src in args.images:
        if not os.path.isfile(src):
            print(f"[ERROR] Not a local file: {src}")
            continue
        with open(src, "rb") as f:
            raw = f.read()
        try:
            data, w, h = compress(raw)
        except Exception as e:  # bad or unsupported image
            print(f"[ERROR] Could not compress {src}: {e}")
            continue
        out = os.path.join(args.out_dir, f"product_{uuid.uuid4().hex[:12]}.jpg")
        with open(out, "wb") as f:
            f.write(data)
        print(f"[COMPRESSED] {out} ({len(raw) // 1024}KB -> {len(data) // 1024}KB, {w}x{h})")


if __name__ == "__main__":
    main()
