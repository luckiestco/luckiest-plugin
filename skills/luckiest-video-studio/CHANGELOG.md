# Changelog — luckiest-video-studio

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
