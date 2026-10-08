# Changelog — luckiest-video-studio-reference

## 1.1.0 — 2026-10-08
- Step 1 also runs `luckiest-video-watcher` in study mode for what `shots.mjs`
  skips: voiceover, music energy, and sound on cuts. The breakdown gains a Sound line.

## 1.0.0 — 2026-09-28
- New sub-skill: URL or mp4 inspiration video to a shot list (`shots.json`,
  per-shot frames, `contact.jpg`, `reference.md`) and a draft `storyboard.json`.
- Tested on a local 3-scene mp4 (cuts found at the exact scene boundaries) and a
  public 81s teaser (13 shots).
- Video-only download; source footage is never reused in output.
