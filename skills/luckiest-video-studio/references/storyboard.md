# storyboard.json

`storyboard.json` in the run folder is the source of truth. `plan.md` explains the
idea; `storyboard.json` is what renders. Every edit after the first render changes
this file and re-renders only what it touched. Schema:
`<skill-dir>/scripts/storyboard.schema.json`.

## Shape

```json
{
  "version": 1,
  "title": "Acme launch",
  "mode": "demo",
  "tone": "polished",
  "format": { "width": 1920, "height": 1080, "fps": 30 },
  "hyperframes": "0.8.84",
  "music": { "file": "audio/bed.mp3", "volume": 0.3, "license": "user supplied" },
  "scenes": [
    { "id": "hook", "kind": "motion", "duration": 2.5, "line": "Your invoices, done in one click" },
    { "id": "create-invoice", "kind": "demo", "duration": 6, "source": "demo/create.mp4", "sourceStart": 1.2, "line": "Create an invoice" },
    { "id": "stat", "kind": "motion", "duration": 2, "line": "3x faster than last year", "variables": { "value": "3x" } },
    { "id": "logo-close", "kind": "logo", "recipe": "piece-assembly", "duration": 3, "assets": ["brand/logo.svg"], "line": "Acme" }
  ]
}
```

| Field | Meaning |
|---|---|
| `format` | Output size and frame rate. Landscape 1920x1080, vertical 1080x1920, square 1080x1080. |
| `hyperframes` | Pinned HyperFrames version so a re-render months later looks the same. |
| `music` | Optional bed mixed under the joined video, looped and faded out. Licensed files only. |
| `scenes[].id` | Lowercase and hyphens. Stable: edits refer to scenes by id. |
| `scenes[].kind` | `motion` (HyperFrames scene), `logo` (HyperFrames logo recipe), `demo` (footage). |
| `scenes[].composition` | For motion and logo, the sub-composition under `composition/`. Default `compositions/<id>.html`. |
| `scenes[].source`, `sourceStart` | For demo, the footage file and where to start in it. |
| `scenes[].variables` | Copy, colors, and file paths the composition reads. Keep editable values here, not hardcoded in HTML. |
| `scenes[].assets` | Other files the scene depends on (logo SVG, shared CSS). Changing one re-renders the scene. |
| `scenes[].line` | One line on what the scene says or shows. Goes into `TIMING.md`. |

## Rendering

```bash
node <skill-dir>/scripts/render-scenes.mjs <run-dir>                    # render changed scenes, join final.mp4
node <skill-dir>/scripts/render-scenes.mjs <run-dir> --scene stat       # force one scene
node <skill-dir>/scripts/render-scenes.mjs <run-dir> --quality draft    # fast pass while iterating
node <skill-dir>/scripts/render-scenes.mjs <run-dir> --no-join          # clips only
```

The script hashes each scene's JSON, its composition or footage, and its `assets`.
A scene whose hash is unchanged keeps its clip. `--scene` renders only the named
scenes and leaves the rest as they are. Every clip is normalized to the same size,
frame rate, and a stereo audio track, so the join is a lossless concat. It writes
`clips/NN-id.mp4`, `final.mp4`, and `TIMING.md`.

It runs `hyperframes` when it is on the PATH, otherwise `npx hyperframes@<pinned
version>`. Before the first `npx` run in a session, tell the user it downloads
HyperFrames from npm and ask.

## Rules for scenes that re-render cleanly

- One sub-composition per scene. A scene never reads another scene's timeline.
- Every frame is a function of time: GSAP or keyframes seeked by HyperFrames, no
  CSS transitions, no `setTimeout`, no state carried between frames.
- Put transitions inside the scene that owns them (the outgoing scene's last 0.3s
  or the incoming scene's first 0.3s), never across a clip boundary.
- Demo footage stays raw in `demo/`; trims live in `sourceStart` and `duration`.
- Sound effects belong to the scene they punctuate, so they move with it.

## Edits people ask for

| Request | Change |
|---|---|
| "Change the headline in scene 3" | `scenes[2].variables` or the composition text, then `--scene <id>` |
| "Make the demo part shorter" | `duration` or `sourceStart` of that demo scene |
| "Swap scenes 2 and 4" | Reorder `scenes`; clips are reused and renamed, nothing re-renders |
| "Different logo in the outro" | Replace the file listed in that scene's `assets` |
| "Vertical version" | Change `format`; every scene re-renders |
