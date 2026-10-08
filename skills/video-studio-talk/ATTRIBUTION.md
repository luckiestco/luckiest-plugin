# Attribution

`luckiest-video-studio-talk` is a Luckiest sub-skill of `luckiest-video-studio`.
It is rewritten from the `short-form-edit`, `hyperframes-video-beats`, and
`video-storytelling` skills of the **HyperFrames student kit** by Nate Herk and
contributors, and ports that kit's `validate-plan.mjs` and `validate-footage.mjs`.
The kit is MIT; its pipeline skills carry the Student Kit Use Permission. Both
texts are kept in `luckiest-video-studio/LICENSE-student-kit` and
`LICENSE-student-kit-pipeline`.

## Changes in this edition

- Merged three skills into one, with short and long form split into references.
- Every overlay is a storyboard motion scene that embeds the cleaned clip, so the
  coordinator's per-scene render and cache apply.
- The plan validator accepts `luckiest-video-studio-cuts` output directly.
- Removed paid generation (Kie), ElevenLabs defaults, personal and brand
  references, and QA scripts the kit named but did not ship. See
  `luckiest-video-studio/SECURITY.md` S27, S32, S36, S37.
