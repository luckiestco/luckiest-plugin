---
name: luckiest-video-studio-reel
description: >-
  Build a 8 to 30 second brand reel for luckiest-video-studio: one brand motif
  transformed through labeled craft chapters, a persistent HUD, cuts locked to the
  music's beat grid, a short flurry, and a held logo lockup that answers the
  opening. Rendered as one `logo` scene with the `reel` recipe, so it drops into a
  logo showcase or closes a launch video. Usually driven by luckiest-video-studio.
  Trigger on "make a brand reel", "sizzle reel", "motion reel", "showreel for my
  brand", "a 15 second brand film cut to music", or "show off our motion design".
argument-hint: "<run-dir> [--length <s>] [--bpm <n>]"
user-invocable: false
license: MIT. See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
metadata:
  version: "1.2.0"
  listing_id: luckiest-video-studio-reel
  author: luckiest
---

# Brand reel

A reel promises that every frame was a decision. Pick one motif, push it through
chapters that look nothing alike, cut on the beat, and end on the motif.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-video-studio-reel", installedSemver: "1.2.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-video-studio-reel", skill_version: "1.2.0", matched: true, success: <true|false> }`.
Metadata only. Skip silently if unavailable.

## Standing rules

1. **Licensed music only.** The user supplies the track. No generation from this
   skill.
2. **Real brand marks only.** Use the supplied logo file; never redraw it. Only
   marks the user has the right to use.
3. **Verified facts only.** Any number or claim on screen is in the brief with a
   source and date.
4. **Local assets.** Fonts, logo, music, and sound effects live in
   `composition/assets/`.

`<skill-dir>` is the folder holding this file. The coordinator is
`<skill-dir>/../luckiest-video-studio`.

## The grammar

1. **One motif, transformed.** The brand's most reduced element (a dot, a corner,
   a letter). It opens the reel, becomes each chapter's material, and closes the
   reel inside the lockup. Transitions turn the current object into the next one;
   hard cuts belong to the flurry only.
2. **Labeled chapters.** Five to seven, each named in the HUD by the craft it shows
   (`01 · MOTIF`). Use the brand's own words when it has them.
3. **Show the work.** Each chapter gets one tool overlay: a readout, a selection
   box, a parameter panel, a curve, or the brand's own UI.
4. **Persistent HUD.** Crop marks, title top left, spec line top right with the
   measured BPM and a blinking dot, timecode, a progress bar, the chapter label.
   Mono caps, wide tracking. It flips color with the background.
5. **Paper, ink, one accent, one held-back color** that appears only in the flurry.
   Every chapter change flips value (dark or light) or saturation.
6. **Cut on the beat, animate on the off-beats.** Every cut, flash, and invert
   lands within two frames of a beat. One half-beat music dip before the midpoint
   hit.
7. **Accelerate, then hold.** About 75 percent development, 13 percent flurry
   (one beat per cut, then half beats), 12 percent lockup.
8. **Density breathes.** One object, a wall of type, a grid of a hundred, one hero
   object, the flurry, one word.
9. **Three type voices.** A heavy display face, a contrasting accent voice, and
   wide mono for the machine layer.
10. **Physical finish.** Squash and stretch, blur on fast moves, bloom on light
    over dark, grain. It should look photographed, not exported.
11. **Bookend.** The lockup resolves, a rule draws, the motif lands as the final
    punctuation with a squash, the tagline arrives last.

Chapter techniques are in [references/chapters.md](references/chapters.md).

## Step 1: Brief

From the coordinator's brand tokens ([brand.md](../luckiest-video-studio/references/brand.md))
and the user: logo file, motif, held-back color, three to five verified facts,
the brand phrase, and the tagline. If the user shared an inspiration reel, the
`luckiest-video-studio-reference` sub-skill has already written its shot list;
borrow its structure, never its footage or copy.

## Step 2: Beat grid

Measure the user's track with the coordinator's analyzer (ask before the first
`uv run`), or `npx hyperframes@0.8.84 beats <run-dir>/composition` once the
track is wired in, when Python is unavailable:

```bash
uv run --project <skill-dir>/../luckiest-video-studio/scripts \
  python <skill-dir>/../luckiest-video-studio/scripts/analyze_music_cues.py track.mp3 \
  --output-json cues.json --output-md cues.md --window-duration 60
```

`period = 60 / tempo`, `phase` = the first beat time. Pick the strongest cue as
the drop. Splice a bed that fits the reel, ducking the half beat before the drop:

```bash
node <skill-dir>/scripts/splice-music.mjs track.mp3 --period 0.4688 --phase 0.08 \
  --segments "4-20,36-44" --length 15 --gap 16 --out composition/assets/music-bed.wav
node <skill-dir>/scripts/beatgrid.mjs --period 0.4688 --fps 30 --length 15 \
  --chapters "01 Motif:4, 02 Type:8, 03 Grid:4, 04 Drop:4, Flurry:4, End:rest"
```

Rerun the analyzer on the bed; its first beat should be near 0. Write the frame
sheet into `reel/STORYBOARD.md`, one row per chapter: label, value, frame, tool
overlay, in and out transform, sound. Before building, check that every frame
reads as the brand with the HUD covered and every transition transforms the
object.

## Step 3: Sound

Place cues from the CC0 kit (`../luckiest-video-studio/assets/sfx/`, see its
`sfx-analysis.md`) on the beat sheet in `reel/events.json`, then premix:

```bash
node <skill-dir>/scripts/mix.mjs --bed composition/assets/music-bed.wav \
  --events reel/events.json --out composition/assets/reel-master.wav --length 15
```

It targets -14 LUFS and -1.2 dBTP. The master is the reel's single `<audio>`.
Do not also set `storyboard.json` `music`, or the bed plays twice.

## Step 4: Build

Read `luckiest-video-studio-composition` for each chapter's hold frame: focal point, grid, and the 9:16 safe areas.

If the run already has `art-direction.json`, follow it; otherwise, if `luckiest-video-studio-art-director` is installed, run it first. Palette, faces, easing, and the one wow moment come from that file. Before the full render, run `luckiest-video-studio-director` `--score` when it is installed.

Copy [templates/reel.html](templates/reel.html) to
`composition/compositions/reel.html` and fill its tokens. It already has the
motif bounce, the type chapter with an invert, the grid wave, the lockup, and the
HUD, all timed with `B(n)` beats. Extend or replace chapters from
`references/chapters.md`. Rules that keep it render-safe:

- Tween transforms and opacity only. Canvas and HUD are drawn from one per-frame
  driver that is a pure function of time, with seeded values, never
  `Math.random()`.
- Measure layout once at build time, never inside `onUpdate`.
- Staggers finish before their cut: start plus largest delay plus duration.
- New or changed chapters follow `luckiest-video-studio-motion` for easing,
  origin, and overshoot.
- `background-clip: text` renders invisible; use solid fills and `text-shadow`.

Add the scene to `storyboard.json`:

```json
{ "id": "reel", "kind": "logo", "recipe": "reel", "duration": 15,
  "composition": "compositions/reel.html",
  "assets": ["composition/assets/reel-master.wav", "composition/assets/logos/brand.svg"] }
```

## Step 5: Verify

Render with the coordinator: `node <skill-dir>/../luckiest-video-studio/scripts/render-scenes.mjs <run-dir> --scene reel --quality draft`.

Then run the coordinator's gates on the clip (`<qa>` is
`<skill-dir>/../luckiest-video-studio/scripts/qa.mjs`; each exits 1 on a fail):

```bash
node <qa> beatgrid   <run-dir>/clips/NN-reel.mp4 --bpm 128 --phase 0   # every hard cut within 35 ms of a beat or half beat
node <qa> pops       <run-dir>/clips/NN-reel.mp4                       # no one-frame pops or stuck layers
node <qa> deadframes <run-dir>/clips/NN-reel.mp4                       # no black frames, no freeze over 3 s
node <qa> legibility <run-dir>/clips/NN-reel.mp4                       # something readable every second
node <qa> crossfade  <run-dir>/composition/compositions/reel.html      # no full-frame opacity fades
```

Use the bed's measured BPM and first-beat phase. Then look:

- Tile ten-frame strips across every transition and read them; hero frames miss
  stuck layers.
- Pick six random frames: each reads as the brand with the HUD covered.
- Rerun the analyzer on the render's audio to confirm the pre-drop dip is there.
- Loudness near -14 LUFS. If the render came out quieter, remux the master:
  `ffmpeg -i clip.mp4 -i reel-master.wav -map 0:v -map 1:a -c:v copy -c:a aac -shortest out.mp4`.

Save the evidence in `reel/VERIFY.md`.
