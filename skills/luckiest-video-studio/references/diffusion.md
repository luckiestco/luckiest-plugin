# Editing in Diffusion Studio (`--editor diffusion`)

Diffusion Studio (`diffusionstudio/editor`, MPL-2.0) is a video editor built for
agents: the project is a folder of JSX, and edits in the app are written back into
that source. Use it when the user wants to tweak motion and logo scenes with
inspector controls and re-export without clicking, or when OpenScreen's export
button is in the way. Use OpenScreen ([openscreen.md](openscreen.md)) for recorded
product demos with cursor zoom.

| | OpenScreen | Diffusion Studio |
|---|---|---|
| Best for | Screen-recorded demos: cursor, auto-zoom, captions | Motion and logo scenes with live controls |
| Logo scenes | Rendered clips | Native, editable scenes (line-draw) |
| Export | User clicks Export in the app | Agent exports through the CLI |

## Requirements

- Diffusion Studio installed at `/Applications/Diffusion Studio.app` (or set
  `DIFFUSION_CLI` to its `Contents/Resources/cli/bin/dapi`). Installing it is the
  user's step; ask before downloading anything.
- The app must be running for any command. `dapi open` launches it.
- Licensing: the editor is MPL-2.0. Diffusion Studio's rendering engine is free with
  a "Made with Diffusion Studio" watermark and a paid key removes it. An app export
  tested on 2026-09-29 (version 0.207.0) showed no watermark, but confirm the
  current terms on diffusion.studio before telling a user their export is
  commercial-ready.

## Build the project

```bash
node <skill-dir>/scripts/assemble-diffusion.mjs <run-dir>                  # write <run-dir>/diffusion/
node <skill-dir>/scripts/assemble-diffusion.mjs <run-dir> --open           # also open it in the app and check it
node <skill-dir>/scripts/assemble-diffusion.mjs <run-dir> --export out.mp4 # open, check, and export
```

Run `render-scenes.mjs` first: non-native scenes play their rendered clips.

- **`logo` scenes with `recipe: "line-draw"`** and an SVG in `assets` become native
  scenes from `templates/diffusion/line-draw.tsx`. The SVG's paths, fills, and
  clipPath are embedded in `diffusion/logos/<id>.ts`. Flatten nested transforms in
  the SVG first; the reader does not apply them.
- **`demo` scenes** play the raw footage from `demo/`, trimmed with `sourceIn`, so a
  trim can be widened in the app.
- **Everything else** plays `clips/NN-id.mp4`.
- The music bed, if any, is an `<audio>` track under the whole sequence.
- Media is symlinked into `diffusion/assets/` and named by path, as Diffusion's
  editor guide asks.
- Export settings (H.264, the storyboard's fps and resolution) are written to the
  project's `package.json` under `diffusion.export.main`.

## Inspector controls

The generated `index.tsx` hoists editable values to top-level `@inspect` consts, so
they show as controls in the app's sidebar:

- `Brand/Paper`, `Brand/Ink`, `Brand/Caption font`
- Per line-draw scene: `<id>/Caption`, `<id>/Draw seconds`, `<id>/Logo size`

A change in the app is written back into `index.tsx`, and the next
`dapi export main <file>` uses it. Tell the user this in the handoff.

## Check before exporting

`assemble-diffusion.mjs --open` runs `dapi check main` and fails on errors. To look
at frames without exporting, use `dapi capture main -t 1 4 8`, which writes a
labelled contact sheet. A caption that starts at opacity 0 is reported as a warning;
that is the fade-in, not a fault.

## Why the logo is a canvas

Diffusion's `<html>` layer does not apply the SVG stroke-dash styling the
HyperFrames template uses, so the line-draw would show fully drawn from frame one.
The Diffusion template draws on a `<surface>` canvas with `Path2D`, a line dash
measured from each path, and the artwork's clip rect. Driven by `useTicker`, it is
frame-accurate in capture and export.
