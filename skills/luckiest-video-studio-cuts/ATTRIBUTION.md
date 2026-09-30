# Attribution

`luckiest-video-studio-cuts` is a Luckiest sub-skill of `luckiest-video-studio`.
It is built from the `cut-silences` and `cut-mistakes` skills and the
`build-edl-review.mjs` script of the **HyperFrames student kit** by Nate Herk and
contributors. The kit is MIT; its pipeline skills and editing tools carry the
Student Kit Use Permission. Both texts are kept in
`luckiest-video-studio/LICENSE-student-kit` and `LICENSE-student-kit-pipeline`.

## Changes in this edition

- Merged the two skills into one sub-skill that writes into a video-studio run
  folder and hands its clip back to `storyboard.json`.
- Transcription runs locally through `npx hyperframes@0.8.84 transcribe`. The
  kit's ElevenLabs uploader, which read an API key from `.env`, is not included.
- Scripts accept the bare word array that HyperFrames writes.
- The review page escapes the file name and cut reasons, and opens as a local file
  instead of through an unpinned `npx serve`.
- See `luckiest-video-studio/SECURITY.md` S20 to S25.
