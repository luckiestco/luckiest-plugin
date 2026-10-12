# UI demos

How to show a real product on screen so it reads as proof, measured on
professional films at 30fps. Ideas and values from Tejas Makwana's
`motionmaxxing` (Apache-2.0), restated for HyperFrames and GSAP. See
`../ATTRIBUTION.md`.

## Magnify with the camera, not the type

- Keep the UI at its real size (15 to 17pt text in the product) and push the
  camera in: crop 1.4 to 4.4x.
- Proof is readable when UI text is at least 4% of the frame height and the
  fragment is at least 55% of the frame width, or cropped by the frame edge.
- Keep the top and bottom 28% of the frame clear of UI when a line of copy shares
  the shot.
- Show a magnified fragment with identity (the product's own colours, icons and
  copy), lit and placed in a world, not a small card on a flat colour.
- Captured screens follow the studio's standing rule: no real customer data,
  emails, keys or tokens on screen. Swap them for the product's demo data before
  the capture, never blur them after.
- Never invent the UI. A rounded card with a status dot and "label . $value", a
  "Good morning" card, grey skeleton bars, or made-up names and numbers read as
  generic web components. Use the captured screens.

## Cursor

| Step | Value |
|---|---|
| Size | 4 to 6% of the frame width |
| Entry | 1.5 to 5x its size, 60% of the travel in the first frame, over 0.5 to 0.9 s |
| Park | Still for 2 to 15 frames before it acts |
| Press | Squeezes to 0.71 to 0.9 scale over 2 frames |
| Target | Answers 0 to 1 frame after the press, dipping to 0.63 to 0.81 scale |
| Release | Cut before it; the release is never shown |

The cursor arrives, parks, then acts. It never clicks while still moving.

## States

- A toggle flips in 2 frames.
- A cascade (rows reacting to one action) starts 5 frames after the action, then
  2 to 3 frames per item, all done within 0.6 s.
- A checklist row takes about 0.9 s.
- "Working" shimmer: a light band about 23% of the frame width sweeps for 13
  frames, twice, with a 6-frame gap.
- A log or feed scroll accelerates from about 6 to 250px per frame over about
  1.8 s, then holds 0.8 s.

## Depth behind UI

- Backdrop blur: 4px keeps the background readable, 7 to 15px for panels that
  are not the hero, at most 11px behind a headline.
- Two panels in one frame only when one is at least twice the other's area, or
  the camera moves between them. One hero per frame.

## Typing in the product

See [kinetic-type.md](kinetic-type.md#typing): real queries, 14 to 30 characters
per second, a solid caret.
