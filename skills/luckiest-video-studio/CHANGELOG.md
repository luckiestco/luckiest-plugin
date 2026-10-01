# Changelog — luckiest-video-studio

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
