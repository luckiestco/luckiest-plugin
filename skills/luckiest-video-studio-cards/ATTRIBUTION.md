# Attribution

`luckiest-video-studio-cards` is a Luckiest sub-skill of `luckiest-video-studio`.
Its two card packs, blueprint, scene templates, and the `build-registry.mjs` and
`new-pack.mjs` scripts come from the style library and style templates of the
**HyperFrames student kit** by Nate Herk and contributors. The kit is MIT; its
style library and templates carry the Student Kit Use Permission. Both texts are
kept in `luckiest-video-studio/LICENSE-student-kit` and
`LICENSE-student-kit-pipeline`.

## Changes in this edition

- Renamed the two styles to `paper-collage` and `aurora-glass`. The originals
  were named after a publication and a creator; the kit notes neither is official
  or endorsed.
- Removed AI Automation Society copy and its palette, which the kit does not
  license for reuse, and replaced placeholder brand names with "Acme".
- Removed remote Google Fonts imports. Cards take fonts and colors from the run's
  `brand.json` through `apply-brand.mjs`.
- Dropped the per-style preview pages and the one-off manifest generator, and the
  templates' upstream registry URL.
- Added a `qa` status per card. See `luckiest-video-studio/SECURITY.md` S39 to S47.
