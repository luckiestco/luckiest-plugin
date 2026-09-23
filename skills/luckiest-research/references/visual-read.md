# Visual read with pixelshot

pixelshot renders a URL, PDF, or local HTML file into tiled JPEGs so the agent can read
a page the way a person sees it. Adapted from PixelRAG's pixelbrowse skill.

## Install (ask first)

```bash
uv tool install pixelrag     # or: pipx install pixelrag
uvx playwright install chromium   # only if the cdp backend cannot find a browser
```

## Capture

```bash
mkdir -p /tmp/luckiest-research/shots
pixelshot "<URL>" --output /tmp/luckiest-research/shots --tile-height 1568 --wait-network-idle
# desktop layout
pixelshot "<URL>" --output /tmp/luckiest-research/shots --tile-height 1568 --viewport-width 1280 --wait-network-idle
# several pages at once
pixelshot "<URL1>" "<URL2>" --output /tmp/luckiest-research/shots --tile-height 1568 --wait-network-idle --workers 4
# a PDF
pixelshot report.pdf --output /tmp/luckiest-research/shots
```

Always pass `--tile-height 1568`. The vision model downscales anything with a longer
edge above 1568px and text becomes unreadable. Always pass `--wait-network-idle` for
URLs, or client-rendered pages come back blank.

## Read

1. Read `/tmp/luckiest-research/shots/<sanitized-url>.png.tiles/tiles.json`.
2. Read every tile it lists, in order. A long article is a dozen tiles; reading only
   the first one is reading 5 percent of the page.
3. `"complete": false` means the page height could not be measured. Say the capture
   is partial. Rerun with `--wait-network-idle` or a different `--viewport-width`.
4. No `tiles.json` means the render failed. Report the error, do not call the page empty.
5. `Batch complete: done=0 failed=0` with no output folder is a first-launch flake of the
   headless Chrome profile. Rerun the same command once before reporting a failure.
6. Only the `cdp` backend exists in pixelrag 0.4.x; it needs Google Chrome or Chromium
   installed. There is no `--backend playwright`.

## Crop

When labels, axes, or fine print are too small:

```bash
python3 -c "from PIL import Image; Image.open('<tile>').crop((x1, y1, x2, y2)).save('/tmp/luckiest-research/shots/crop.png')"
```

Coordinates are pixels from the tile's top left. Keep crops near 800x800 or smaller,
then read the crop with the Read tool.

## What was left out on purpose

PixelRAG also ships an embedding index and a search server. This skill uses only the
capture step. Building a visual index is a separate task.
