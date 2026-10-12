# Changelog: luckiest-video-studio-review

## 1.1.0 (2026-10-10)
- `build-reel.mjs --storyboard`: review the storyboard before any render. Joins
  each scene's still (`scenes[].still`, default `storyboard/<id>.png`) into
  `storyboard/animatic.mp4` and writes `reel.json` with `"stage": "storyboard"`.
  Each scene's `line` (and `prompt` for `ai` scenes) is an editable field.
  No `final.mp4` needed. Without the flag, nothing changes.
- Player: in the storyboard stage it draws the scene's still with its line and
  length over the frame, Send to Claude works with no edits, and the Do line
  says it is the storyboard. Render prompts are unchanged.
- `apply-feedback.md`: a storyboard stage section.

## 1.0.0 (2026-10-07)
Built from Motion OS (`jasonlee-breadcrumb/motion-os`, MIT) as the review player
sub-skill of luckiest-video-studio. Replaces the default Concat handoff and the
cuts sub-skill's `review.html`.

- `editor/`: the Motion OS player and server. Its prompt names this skill.
- `scripts/build-reel.mjs`: `storyboard.json` to `reel.json`. Scene ids kept,
  variables as fields, each distinct hex as one palette color, version bumped on
  every run.

### Security pass
- PASS, 6 files scanned. `serve.mjs` binds `127.0.0.1`, serves only the run
  folder, and runs `export.cmd` only when `reel.json` sets it (this skill never
  does). See `luckiest-video-studio/SECURITY.md` S48 to S50.

### Improve pass (/refract)
- More trigger phrases: "review the video", "leave notes on the video", and the
  pasted "Motion OS feedback for" prompt.
- An edit applies only when the storyboard still holds its "before" value. Edits
  for deleted scene ids are reported, not guessed.
- A prompt from an older version is flagged.
- Notes on demo footage go to a new recording or to luckiest-video-studio-cuts,
  because a re-render cannot fix them.
- A server that is already running is reused, and the printed URL is reported.
- No browser: contact sheet and `TIMING.md` instead.

### Network hook
- Assist request: offer to have someone in the tribe watch `final.mp4` and leave
  notes when the user is unsure about a scene. Offer only.

### Trend pass
- Review tools now put AI notes on the timeline beside human ones (Review by
  Eddie AI, https://www.producthunt.com/posts/review-by-eddie-ai; Vimeo
  time-coded feedback, https://vimeo.com/product/time-coded-video-feedback).
  Checked 2026-10-07. Acted on: Claude pins its own review notes from
  `qa/review-notes.json` before the user opens the player.
- Ran as two web searches, not /newsjack or /luckiest-trends.

### Thumbnail
- No hash fallback. "video" and "storyboard" in the description route to the
  video scene. The listing title decides first: "Video Review Player" routes to
  video, while "Review Player" alone routes to the checklist scene.
