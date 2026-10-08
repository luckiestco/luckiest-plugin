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
  "formats": ["landscape", "vertical", "square"],
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
| `format` | Master size and frame rate. Landscape 1920x1080, vertical 1080x1920, square 1080x1080. Scenes are designed and reviewed at this size. |
| `formats` | Optional. Render the same scenes once per listed format: `landscape` 1920x1080, `vertical` 1080x1920, `square` 1080x1080, all at `format.fps`. Motion and logo scenes re-lay out for each size (see "Build once, render every format" in `step-3-compose.md`); they are never cropped. Only demo footage is cropped, around `scenes[].focus`. Omit it to render `format` alone. |
| `hyperframes` | Pinned HyperFrames version so a re-render months later looks the same. |
| `music` | Optional bed mixed under the joined video, looped and faded out. Licensed files only. `offset` skips into the track and `at` starts it in the video, so a chosen kick lands on a chosen moment: a kick 10.4s into the track on a cut at 3.0s is `"offset": 7.4, "at": 0` or `"offset": 10.4, "at": 3`. |
| `facts` | Every number, price, and id the video shows, as short phrases: `["3 unpaid invoices, $4,792.44 total", "Tom Becker INV-0039, 5 days late"]`. Write them in Step 2 from the project's real data. `qa.mjs facts` fails any on-screen number with two or more digits, a currency sign, a percent, or an id that no fact contains, and any em dash on screen. Add decorative numbers (a timecode, a year) here too. |
| `loudness` | Integrated loudness of `final.mp4` in LUFS, default `-14` (the streaming norm), two-pass with a -1.2 dBTP ceiling. `false` skips it. |
| `sfx` | Optional `{ "file": "audio/sfx.wav", "volume": 1 }` from `scripts/sfx-cues.mjs`, mixed under the joined video at 0 s. Cue times are global, so re-run the mixer after a scene's length changes. |
| `scenes[].id` | Lowercase and hyphens. Stable: edits refer to scenes by id. |
| `scenes[].kind` | `motion` (HyperFrames scene), `logo` (HyperFrames logo recipe), `demo` (footage). |
| `scenes[].composition` | For motion and logo, the sub-composition under `composition/`. Default `compositions/<id>.html`. |
| `scenes[].source`, `sourceStart` | For demo, the footage file and where to start in it. |
| `scenes[].focus` | For demo, `{ "x": 0.5, "y": 0.5 }` as fractions of the source frame: the point kept in view when the footage is cropped to a different shape (a 16:9 screen recording in a vertical cut). Set it on the cursor, the face, or the UI the line talks about. |
| `scenes[].variables` | Copy, colors, and file paths the composition reads. Keep editable values here, not hardcoded in HTML. |
| `scenes[].assets` | Other files the scene depends on (logo SVG, shared CSS). Changing one re-renders the scene. |
| `scenes[].states` | For a one-shape morph scene, the state list: `{ t, label, shape, cursor? }` per state, local times. See "One shape, never cut" in `step-2-plan.md`. |
| `scenes[].line` | One line on what the scene says or shows. Goes into `TIMING.md`. |
| `scenes[].hold` | Optional. Seconds into the scene where `--stills` captures its hold frame. Default 0.5s before the cut. |

## Rendering

```bash
node <skill-dir>/scripts/render-scenes.mjs <run-dir>                    # render changed scenes, join final.mp4
node <skill-dir>/scripts/render-scenes.mjs <run-dir> --scene stat       # force one scene
node <skill-dir>/scripts/render-scenes.mjs <run-dir> --quality draft    # fast pass while iterating
node <skill-dir>/scripts/render-scenes.mjs <run-dir> --no-join          # clips only
node <skill-dir>/scripts/render-scenes.mjs <run-dir> --stills           # hold-frame PNGs per format, no render
```

The script hashes each scene's JSON, its composition or footage, and its `assets`.
A scene whose hash is unchanged keeps its clip. `--scene` renders only the named
scenes and leaves the rest as they are. Every clip is normalized to the same size,
frame rate, and a stereo audio track, so the join is a lossless concat. It writes
`clips/NN-id.mp4`, `final.mp4`, and `TIMING.md`.

With `formats`, each format gets its own folder and file: `clips/<format>/NN-id.mp4`
and `final-<format>.mp4`, each with its own cache, so adding a format renders only
that format. A landscape format reuses the clips of a finished single-format 16:9
render at the same `--quality`, so adding formats after the master is done renders
only the new sizes (demo footage re-crops, which is ffmpeg only). For motion and logo scenes it writes a stamped copy of the composition
next to the original (`compositions/<id>.<format>.html`, root `data-width`,
`data-height`, and `data-format` set, plus `:root{--w;--h;--u}`), renders it, and
deletes the copy. A scene that sizes itself with those tokens re-lays out; one
hardcoded to 1920x1080 px gets clipped, which `qa.mjs` catches.

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
| "Vertical version" | Add `"vertical"` to `formats`; existing formats keep their clips and only the new one renders |
| "Square too" | Add `"square"` to `formats` |
| "The crop cuts off the button" | Move that demo scene's `focus` toward the button, then `--scene <id>` |
