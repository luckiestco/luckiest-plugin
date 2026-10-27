# Changelog: luckiest-video-studio-cuts

## 1.2.0 (2026-10-27)
- Cut between phrases, never inside one: `find-cut-candidates.mjs` proposes a
  `filler` (um, uh) cut only with 0.1 s of silence on both sides, and drops a
  stutter or retake whose edge sits in continuous speech to `review`
  (`insidePhrase`). Covers word decay: transcripts end words 40 to 80 ms early.
- New `find-cut-candidates.test.mjs`.
- From the Herk Edit Kit editing playbook, in our own words.

## 1.1.0 (2026-10-07)
- Step 4 reviews the silence cut in the review player from
  `luckiest-video-studio-review`: `scripts/build-cuts-reel.mjs` writes
  `footage/reel.json`, one scene per kept range so every join is a scene boundary.
  Replaces `build-edl-review.mjs` and its `review.html`.

## 1.0.0 (2026-09-29)
- New sub-skill: silence pass and review-gated mistake pass for talking-head
  footage, output as a clean clip plus retimed transcript for a storyboard scene.
- Local transcription only; no API keys or uploads.
