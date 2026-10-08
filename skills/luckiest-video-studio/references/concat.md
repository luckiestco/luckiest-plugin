# Editing in Concat (`--editor concat`)

Concat (`jub0t/Concat`, AGPL-3.0) is a free, local video editor for macOS,
Windows, Linux, and Android, with a scriptable API. Exports have no watermark, it
needs no account, and the agent can build and export a project without anyone
clicking. Use it when the user wants a timeline. The review player
(`luckiest-video-studio-review`) is the default for reviewing a run. Use OpenScreen
([openscreen.md](openscreen.md)) for recorded product demos with cursor zoom, and
Diffusion Studio ([diffusion.md](diffusion.md)) when line-draw logo scenes need to
stay native and editable.

| | Concat | OpenScreen | Diffusion Studio |
|---|---|---|---|
| Best for | Trimming, reordering, captions, effects on the finished cut | Screen-recorded demos: cursor, auto-zoom | Motion and logo scenes with live controls |
| Logo scenes | Rendered clips | Rendered clips | Native, editable (line-draw) |
| Export | Agent through the CLI, or the user in the app | User clicks Export | Agent through the CLI |
| Cost | Free, no watermark | Free | Engine watermark unless a paid key |

## Requirements

- `concat-cli` on `PATH`, or `CONCAT_CLI` set to it. The app download
  (https://concatenate.pages.dev/#download) does not include it as of 0.2.5. Its
  `concat` binary only opens the editor window. Build the CLI from the source
  release with Rust and Homebrew FFmpeg:
  `FFMPEG_DIR=$(brew --prefix ffmpeg) cargo build --release -p concat-cli` in the
  source's `src/` folder. The binary lands in `src/target/release/concat-cli`.
  Installing or building it is the user's step. Ask before downloading anything.
- Tested end to end on 2026-10-04 against Concat 0.2.5 (API 0.2): a vertical
  3-scene run with music exported at the right size, rate, length, and scene order.
  The script calls `version` first and prints the build and API version.
- Concat's MCP server is planned but not shipped. The script talks to
  `concat-cli api` directly (one JSON request per line on stdin), so no MCP setup is
  needed.

## Build the project

```bash
node <skill-dir>/scripts/assemble-concat.mjs <run-dir> --dry-run          # print the requests, touch nothing
node <skill-dir>/scripts/assemble-concat.mjs <run-dir>                    # create <run-dir>/concat/
node <skill-dir>/scripts/assemble-concat.mjs <run-dir> --export out.mp4   # also export through Concat
```

Run `render-scenes.mjs` first: every scene goes in as its rendered clip.

- The project is the folder `<run-dir>/concat/`, at the storyboard's frame size
  and fps, and its path is written to `project.concat.txt`. On a rerun, an
  existing `concat/` is renamed to `concat-<timestamp>/` first, because Concat
  will not create a project over one. Edits made in Concat survive there.
- Every `clips/NN-id.mp4` goes on track `T1` in storyboard order, back to back, in
  one `batch` edit, so one undo removes them all.
- The music bed, if any, goes on track `T4` from 0 and is trimmed to the video's
  length. A track shorter than the video is not looped.
- `--export` runs `export.run` with H.264 at the storyboard's size and fps, then
  waits for `export.done`. Without it, tell the user to open the project in Concat,
  edit, and export.
- A `refused` reply stops the script with Concat's reason. Nothing changed in the
  project when that happens.

## What the user can do in Concat

Trim and reorder scenes, add captions (local Whisper), text and transitions, set
keyframes, and remove backgrounds. Edits made in Concat stay in the Concat project.
A later `render-scenes.mjs --scene <id>` run does not see them, so tell the user:
change scenes by asking first, then polish in Concat last.
