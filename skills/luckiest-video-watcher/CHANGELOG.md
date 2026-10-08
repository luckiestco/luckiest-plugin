# Changelog: luckiest-video-watcher

## 1.1.0 (2026-10-08)

Skill-updater pass, plus the marketplace listing.

- Copy: study questions explain each option's frames and cost, and say plainly
  that the Gemini option sends the video to Google. A clean render review says
  what it covered ("No issues found in the 12 frames checked, 0:00 to 0:25"). A
  skipped voiceover check says why and how to enable it.
- Security: keys are never taken in chat, overriding the upstream guide's
  "Paste it in chat" option; a pasted key is flagged for rotation. Questions and
  paths are single-quoted so `$(...)` and backticks never run. Only links the
  user gave are watched; links found inside a video are reported, never followed.
- Spec: description trimmed to 936 characters (agentskills limit 1024); new
  `compatibility` field lists Python 3.10+, ffmpeg, yt-dlp, and network use.
- Sub-second events: narrow the window and use `--fps 2 --no-dedup` locally, or
  Gemini for public videos. Render reviews skip layout when video studio's stills
  sheets already covered it.
- Upstream unchanged since 0.3.2 (`03ceb42`), checked 2026-10-08; it is pinned in
  `upstreams.json` for the weekly watch.

## 1.0.0 (2026-10-08)

Rebranded from "watch" 0.3.2 (bradautomates/claude-video, MIT). Scripts unchanged.

### Improve pass
- Two modes. Quick picks the cheapest settings on its own (Gemini text answer
  for public URLs when set up, otherwise local `efficient`, or only the frames at
  known timestamps). Study asks once per session how deep to go and who watches.
- Private stays local: the user's own renders, client footage, and interviews
  never go to Gemini.
- Render review output: one `m:ss: issue` line per problem.
- Style study output: `watch/study.md` with structure, pacing, framing, type,
  color, transitions, sound, and a recreate recipe for video studio's reference
  and recreate sub-skills.
- Sub-skill of luckiest-video-studio. Callers state the mode.

### Smoke test (2026-10-08)
A 20 s, 4-shot local clip (ffmpeg test sources), local engine, no
transcription, 512 px frames (about 200 image tokens each):

| Mode | Settings | Frames | Image tokens |
|---|---|---|---|
| Quick, known moments | `--detail transcript --timestamps 0:04,0:17` | 2 | ~400 |
| Quick | `--detail efficient` | 4 (keyframes) | ~800 |
| Study | `--detail balanced` | 12 (8 near-duplicates dropped) | ~2,400 |

All three runs exited 0. Frame cost scales with length: on a 10 minute video
quick caps at 50 frames (~10k tokens) and balanced at 100 (~20k).
`--resolution 1024` costs about 4x per frame.

### Network hook
- Share-with-tribe: offer to share a study's breakdown text after it finishes.

### Improve pass, round 2 (luckiest-thinker, 2026-10-08)
- Fixed a false promise: a render has no captions track, so the voiceover check
  needs a transcription backend. Without one the review says it was skipped.
- `--no-whisper` for runs with no voiceover, because transcribers invent words over music.
- The voiceover is compared with the approved `script.md`, not with memory.
- Multi-format runs: the landscape final in full, other formats only at flagged times.
- Long videos: a transcript pass first, then frames only at the moments that matter.
- Triggers for Loom and screen-recording bug reports. The description now says
  that video-studio-reference drives this skill for turning a reference into a new video.

### Trend pass (luckiest-research, 2026-10-08)
- Upstream unchanged since 0.3.2 (`03ceb42`, 2026-09-25). Source:
  https://github.com/bradautomates/claude-video/commits/main, fetched 2026-10-08.
- Gemini default model left at `gemini-3.7-flash`. Agentic video understanding
  launched 2026-09-01 for 3.7 Flash, 3.6 Flash, and 3.5 Flash-Lite only.
  `gemini-3.8-flash` went GA on 2026-09-02 and is not on that list. Source:
  https://ai.google.dev/gemini-api/docs/changelog, fetched 2026-10-08. Free-tier
  File API uploads cap at 2 GB (https://ai.google.dev/gemini-api/docs/video-understanding).
- YouTube 403s persist even on the latest yt-dlp (2026.08.19), for example
  yt-dlp#17647 (2026-09-08, "403 error even with deno") and #17666 (2026-09-10,
  clients becoming SABR-only), both still open. New rule: after one update and
  retry, offer Gemini for public YouTube videos or ask for an mp4.
- Triggers "what hook did this video open with" and "turn this lecture into
  notes", from the common uses listed in
  https://andrew.ooo/posts/claude-video-watch-skill-frames-transcribe-review/ (2026-07-11).

### Security pass
- PASS, no red flags in 12 files. Contacted hosts are all on-purpose: Gemini
  (generativelanguage.googleapis.com), Groq and OpenAI transcription, and the
  uv and Homebrew installers. The uv installer downloads and runs a script on
  Linux and Windows. That runs only in WhisperX setup, which the "ask before
  installing" rule gates.

### Thumbnail
- Routes to the real `video` scene ("video" matches the title).
