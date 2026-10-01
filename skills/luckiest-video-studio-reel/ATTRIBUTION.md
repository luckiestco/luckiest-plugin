# Attribution

`luckiest-video-studio-reel` is a Luckiest sub-skill of `luckiest-video-studio`.
It is rewritten from the `motion-showreel` skill of the **HyperFrames student kit**
by Nate Herk and contributors, and ports that skill's `beatgrid.mjs`,
`splice-music.mjs`, and `mix.mjs`. The kit is MIT; its pipeline skills carry the
Student Kit Use Permission. Both texts are kept in
`luckiest-video-studio/LICENSE-student-kit` and `LICENSE-student-kit-pipeline`.

## Changes in this edition

- Runs as one `logo` scene with the `reel` recipe inside a video-studio run, with a
  bundled starter composition (`templates/reel.html`) on the coordinator's brand
  tokens.
- Beat analysis uses the coordinator's `analyze_music_cues.py`; the kit's
  `music-grid.mjs` and `analyze-reference.mjs` are not included.
- Removed the paid image, video, music, and sound generators (`kie.mjs`,
  `sfx.mjs`), which read API keys from `.env`. Sound comes from the CC0 kit.
- Rewrote the grammar and chapter notes without the source reel's breakdown,
  brand examples, or personal references. See `luckiest-video-studio/SECURITY.md`
  S26 to S31.
