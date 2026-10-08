# Step 2b: Assets and storyboard

Building and rendering a scene is the expensive part of a run. Getting the assets
approved first is cheap. Get the user's yes on every asset and on one finished
frame before building any scene, so no scene is built around a logo, screenshot,
font, or image the user would reject.

## 1. Collect every asset

Use the approved scene table from Step 2. For each scene, list what will be on
screen and put each file in `<output-dir>/assets/`:

- Logos, screenshots, product UI captures, and photos from the project (Step 1).
- Fonts and brand colors from [brand.md](brand.md).
- Generated images, only when the scene needs one and the user's project has no
  real one. Generate a still, never a clip, at this stage.
- Demo footage the scene will play (`demo/`), as a single frame grab:
  `ffmpeg -ss <in> -i <file> -frames:v 1 assets/<scene-id>-demo.png`.

To capture a page of the user's live site, headless Chrome works with no install:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --window-size=1920,1400 --virtual-time-budget=25000 --screenshot=<abs-path>.png "<url>"
```

Read the screenshot before using it. Pages that load data late come back empty
with a short budget, so raise `--virtual-time-budget`. Crop with ffmpeg
(`-vf crop=w:h:x:y`) to the part the scene shows, and keep cookie banners, promo
bars, and anything personal out of the crop.

Every file must exist on disk before the board is shown. Never show a placeholder
as if it were the real asset.

## 2. Build the board

Write `<output-dir>/storyboard/board.html`, a single static page with no remote
URLs. It has one row per scene:

| Column | Content |
|---|---|
| Scene | number, id, kind (`motion`, `demo`, `logo`) |
| Line | the script line or on-screen text |
| Time | duration in seconds |
| Assets | thumbnails of every file the scene uses, with their file names |
| Layout | one line: where the focal element sits and what moves |

Put the brand palette and the type sample (headline and caption fonts) at the top.
Then save a screenshot of the page as `storyboard/board.png` (with `npx hyperframes`
or any headless browser already available), so the user can see it without opening
the HTML.

## 3. Approve the assets

Show `board.png` and ask with AskUserQuestion, one question per scene where assets
changed since the last round (up to four per call):
"Scene <n> (<id>): keep these assets?" with the options "Keep" and "Swap"
(the "Other" choice carries what to swap in).

For each "Swap", replace only that scene's assets, rebuild only its rows, and ask
again about those scenes only. Write the approved list into each scene's `assets`
in `storyboard.json`.

## 4. Approve one style frame

Build only the hook scene (the first scene) as Step 3 describes, with the root
`index.html` hosting just that scene for now, pass `hyperframes check`, and capture
its hold frame as a still. No video render is needed:

```bash
cd <output-dir>/composition
npx hyperframes snapshot . --at <hold-seconds> --no-end -o ../storyboard/snap
cp ../storyboard/snap/frame-00-*.png ../storyboard/style-frame.png
```

Show the frame and ask: "Does this look right for the whole video?" with the
options "Looks right" and "Change the look". A change of look (type, color, spacing,
motion feel) is fixed here, on one scene, and the frame is shown again. The hook
composition carries into Step 3 as built.

**Gate:** every scene's assets are approved, `storyboard.json` lists them, and the
user approved `storyboard/style-frame.png`. Build no other scene before this.
