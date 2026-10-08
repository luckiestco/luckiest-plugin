# Changelog — luckiest-video-studio

## 1.13.0 — 2026-10-08
- Formats come last: iterate and approve the master 16:9, then add `formats`
  ("Other formats (last)" in `step-4-deliver.md`).
- A landscape format reuses the clips of a finished single-format 16:9 render at
  the same quality, so adding formats renders only vertical and square.
- `render-scenes.mjs --stills [--jobs 2]` writes one hold-frame PNG per scene per
  format to `stills/<format>/` plus a `sheet.png` each, without rendering video.
  Optional `scenes[].hold` sets the frame (default 0.5s before the cut).
- `qa.mjs safe <run-dir> --stills` runs the safe-area gate on those stills.

## 1.12.0 — 2026-10-08
- Step 4 adds a quick watch of `final.mp4` with the new `luckiest-video-watcher`
  sub-skill (local engine only, `qa/watch`). It reads frames and transcript
  together to catch captions that differ from the voiceover, audio dropouts, and
  text clipped at a seam. Earlier gates' flagged times go in as `--timestamps`.
- The video-studio zip bundles `luckiest-video-watcher`.

## 1.11.0 — 2026-10-08
- One storyboard, every format: optional `formats` (`landscape`, `vertical`,
  `square`) renders the same scenes once per format into `clips/<format>/` and
  `final-<format>.mp4`, each with its own cache. `--formats` in the options table.
- `scripts/stamp-format.mjs` writes a per-format copy of each scene with the root
  size, `data-format`, and `--w`, `--h`, `--u`, and safe-area tokens, so HyperFrames
  renders it at that size.
- Demo footage is cropped to fill around a new `scenes[].focus` instead of
  letterboxed when rendering formats or when focus is set.
- "Build once, render every format" in `step-3-compose.md`: size tokens, safe-area
  insets on clips, `[data-format]` restacks, larger type in vertical.
  `templates/logo-line-draw.html` is the worked example.
- `qa.mjs safe` fails sharp edges (text, logos) in the margins each format's
  platforms cover. `crossfade` now finds full-frame layers at any canvas size.
- Step 2 asks which formats to make; step 4 delivers one file per format.

## 1.10.0 — 2026-10-08
- Sound timing by anchor (`references/audio.md`): pops and impacts start on the
  frame, whooshes peak on the cut, risers and swells end on the hit. Adds layered
  hero hits, a gain ladder, and music ducking under hero hits.
- New `scripts/sfx-cues.mjs`: mixes a cue file plus per-scene `*.motion.json`
  events into one `audio/sfx.wav` and a cue sheet, each sound placed by its anchor.
  `storyboard.json` takes an optional `sfx` track that `render-scenes.mjs` mixes
  under the joined video, like the music bed.
- New `qa.mjs avsync` gate: the final MP4 has audio, the right length, and every
  expected hit within one frame. Tested against built controls.
- New `references/lessons.md`: HyperFrames traps (slot id collisions, callback
  state under seeking, unseeded randomness, three.js loaded twice, disk and
  worker limits), linked from Step 3.
- Music lands, not just starts: `music.offset` skips into the track and
  `music.at` starts it in the video. The join normalizes the final mix to -14 LUFS
  (two-pass, -1.2 dBTP; `loudness` overrides or `false` skips). Tested in
  `scripts/render-scenes.test.mjs`.
- New `qa.mjs facts` gate and `storyboard.json` `facts`: every on-screen number,
  price, and id must match a listed story fact, and no em dash appears on screen.
- State-list scenes (`scenes[].states`, "One shape, never cut" in
  `step-2-plan.md`) and a `qa.mjs loop` gate for pieces that must loop.
- Practices studied from the Motion Studio skill bundle. Ideas only, no code or text copied: the bundle carries no license for its own scripts or docs.

## 1.9.0 — 2026-10-07
- The review player is the default editor (`--editor review`). Step 5 hands the
  run to the new `luckiest-video-studio-review` sub-skill, built from Motion OS
  (`jasonlee-breadcrumb/motion-os`, MIT). The user edits copy and colors per
  scene, pins notes on the frame, and sends one prompt back; edits land in
  `storyboard.json` and re-render only the touched scenes.
- Concat moves to `--editor concat`. OpenScreen and Diffusion Studio are unchanged.
- The cuts sub-skill's review page now opens in the same player (cuts 1.1.0).
- SECURITY.md S48 to S50 cover the player.

## 1.8.1 — 2026-10-05
- Bundle ships art director 1.4.0 (section 3b Real, not generated, and shot prompting).

## 1.8.0 — 2026-10-05
- Step 2 hands off to `luckiest-video-studio-director` (intent, hook, shot list)
  and `luckiest-video-studio-art-director` (`art-direction.json`) before planning.
- Step 4 adds the art-direction review and the director's score loop (all 8+).

## 1.7.2 (2026-10-05)
From a real luckiest.co launch video run end to end (storyboard approvals, render, QA gates, Concat export matching the render at 58 dB PSNR):
- Step 2b: capture live site pages with headless Chrome (wait budget, crop out cookie banners); the style frame is now a `hyperframes snapshot` still, no video render.
- Step 3: the project layout HyperFrames 0.8 needs: root `index.html` hosts every scene, per-scene files with their own composition id, assets and fonts under `composition/assets/` with root-relative paths, no named font fallbacks, ids on timed elements, and a one-pass hold-frame snapshot before the full render.

## 1.7.1 (2026-10-04)
- `assemble-concat.mjs` tested end to end against Concat 0.2.5. Fixes found by the
  live run and by reading Concat's source: progress events between replies no
  longer break the script; the project gets the storyboard's frame size and fps
  (Concat defaulted to 1080p30); a rerun moves the old project aside instead of
  failing; music longer than the video is trimmed to it; an empty `CONCAT_CLI`
  falls back to `concat-cli`.
- `references/concat.md`: the app download lacks `concat-cli`; how to build it.

## 1.7.0 (2026-10-04)
- Concat (`jub0t/Concat`, AGPL-3.0) is the default editor. New
  `scripts/assemble-concat.mjs` builds a Concat project from a run through
  `concat-cli api`, places every clip in storyboard order in one batch, and
  exports with `--export`. `--dry-run` prints the requests. Reference in
  `references/concat.md`. OpenScreen and Diffusion Studio stay available with
  `--editor`.
- New Step 2b, assets and storyboard: every asset is collected and shown per scene
  on `storyboard/board.html` for approval, then one style frame of the hook is
  approved before any other scene is built. Rejected assets cost a still, not a
  rendered scene.

## 1.6.0 (2026-10-03)
- New `luckiest-video-studio-composition` sub-skill: focal placement (thirds, phi
  grid, golden spiral and triangles), white-space budgets, platform safe areas,
  and the 20 photo composition rules adapted to video.
- Step 3 reads it for each scene's hold frame. Step 4 runs
  `luckiest-video-studio-composition --review` (writes `qa/composition-review.md`)
  before the motion review.

## 1.5.1 (2026-10-02)
- Step 2 routes narrated videos of 30 seconds or more to the new
  `luckiest-video-studio-script` sub-skill, whose lines become scenes.

## 1.5.0 (2026-10-02)
- New `luckiest-video-studio-motion` sub-skill: motion purpose, GSAP easing,
  video durations, origin, masked transitions, and a per-scene review, adapted from
  Emil Kowalski's skills (MIT).
- `qa.mjs motion`: flags ease-in entrances, scale 0 cards without an overshoot,
  and short one-off linear moves, with file and line.
- Step 2 gives every motion beat a purpose. Step 3 reads the motion rules. Step 4
  runs the motion gate and review before the judge, and the judge now weighs
  motion craft.
- The cards, reel, and talk sub-skills follow the motion rules. The reference
  and recreate sub-skills name moves with its vocabulary.

## 1.4.1 (2026-10-01)
- Step 1 routes AI-generation remakes of a shared video to the new
  `luckiest-video-studio-recreate` sub-skill.

## 1.4.0 (2026-09-30)
- `qa.mjs judge`: compares new and old renders using contact sheets, asking twice
  with the order swapped. The new version is kept only if it wins both. The
  building model judges by default, or pass `--cmd` to use a model picked by
  luckiest-model-router. Step 4 runs it for each version, up to v3.
- `qa.mjs face`: fails when a card covers the speaker's face, using the new
  `faceRect` field on storyboard scenes.
- Ideas from SeeCut (PolyForm Noncommercial), rewritten from scratch. No code
  was copied.

## 1.3.0 (2026-09-30)
- `scripts/qa.mjs`: eight QA gates (tokens, cross-fade, legibility, pops,
  dead frames, speaker presence, beat sync, beat grid) built on ffmpeg only, with
  `scripts/qa.test.mjs` running each gate against a control built to fail it.
  Step 4 now runs the four whole-video gates.
- Routes ready-made cards to the new `luckiest-video-studio-cards` sub-skill.
- Security review of the kit's style library as `SECURITY.md` S39 to S47.

## 1.2.0 (2026-09-29)
- Routes to three new sub-skills rewritten from the HyperFrames student kit:
  `luckiest-video-studio-cuts` (silence and mistake cuts for talking-head
  footage), `luckiest-video-studio-talk` (overlays, captions, and story rules as
  motion scenes over the cleaned clip), and `luckiest-video-studio-reel`
  (beat-locked brand reel as the new `reel` logo recipe).
- No storyboard schema change: every new scene is `motion`, `logo`, or `demo`.
- Security review of the kit added as `SECURITY.md` S20 to S38, and its license
  texts as `LICENSE-student-kit` and `LICENSE-student-kit-pipeline`.

## 1.1.0 — 2026-09-29
- `--editor diffusion`: `scripts/assemble-diffusion.mjs` turns a run into a
  Diffusion Studio project, with line-draw logo scenes as native scenes
  (`templates/diffusion/line-draw.tsx`) and inspector controls for captions, brand
  colors, draw time, and logo size; checks and exports through the app's CLI.
- Tested on the Luckiest run: 3 scenes, native logo scene between two clips,
  12s export at 1080p.

## 1.0.0 — 2026-09-28
New skill built from brag (MIT), motion-graphics motion-broll (MIT), and
diagram-design (MIT), rendering with HyperFrames (Apache-2.0) and editing in
OpenScreen 1.13.0 (MIT).

### Security pass
- 18 items reviewed in `SECURITY.md`. Five fixed, five dropped, eight kept.
- Dropped the bundled music (unverified license) and motion-broll's setup script
  (`pip install --break-system-packages`, silent `npm install`).
- After Effects bridge `eval()` and silent `sudo` are fixed in the separate
  `luckiest-ae-mcp` package.

### Added
- Three modes: launch, demo, logos.
- `storyboard.json` with per-scene re-render.
- OpenScreen `schemaVersion: 7` timeline project for editing after render.
- `templates/logo-line-draw.html`: traces every path of a real logo in its own
  color, fits the viewBox to the artwork, fills, holds.
- Sub-skills `luckiest-video-studio-ae` (After Effects rebuild through
  luckiest-ae-mcp) and `luckiest-video-studio-reference` (inspiration video to shot
  list and draft storyboard).

### Tested
- End to end on the Luckiest logomark: 3 scenes rendered with HyperFrames 0.8.84,
  joined to a 12s MP4, OpenScreen project opened in OpenScreen 1.13.0.
- Editing one scene re-rendered only that scene; reordering reused every clip.
