# Changelog — luckiest-youtube-planner

## 1.2.0 — 2026-10-27

- `scripts/pairing.py` lints a title and its thumbnail text as one pairing: desktop and mobile cuts, repeated words, thumbnail word count, all-caps, vague adjectives, nothing specific, filler up front. Packaging now writes 10 titles, shows the top 3, and adds a query test (3 searches whose words the title and first description lines must contain).
- `floor_ceiling.py --channel` (repeatable) ranks videos by their multiple over their own channel's median and skips channels with fewer than 4 counted videos.
- `scripts/retention.py` reads a Studio retention export: hook leak in the first 30 seconds with bands, the steepest cliffs with the words spoken there (`--transcript`), and the slide across the middle.
- Hook: rules for the opening lines (confirm the title, one promise, specific beats big, show the promised thing within 20 seconds, no intro or subscribe ask before 0:45), and 3 versions with the best 2 shown.
- Body: `[ON SCREEN]` on every beat, section names of 5 words or fewer that become valid chapters, a runtime at 150 wpm, and 3 Short candidates with new first lines.
- Readout: comment triage into questions, corrections, praise, and bait, a pin suggestion, and a flop report that ends in one change, 3 things to keep, and what not to change yet.
- Reads `voice.md` before writing spoken lines when the user has one.
- Ideas from Jakeschincariol/youtube-agent-skill (MIT), in our own words and code.

## 1.1.0 — 2026-10-16

- Body stage runs each section as a story loop: stakes, open question, turn, and reopen, with the next loop starting before the last one ends. The rubric and per-beat fixes are in stages.md.
- From Kallaway Marketing's storytelling reel, in our own words.

## 1.0.0 — 2026-10-16

- First release. Five scored stages (idea, packaging, hook, body, readout) with a gate at 7, and output written to `youtube-plan.md`.
- `scripts/floor_ceiling.py` reads public YouTube search results with yt-dlp and reports the floor, the ceiling, the fresh share, and missing data. No API key needed.
- Hands off to luckiest-image (thumbnails), luckiest-video-studio-script (spoken script), and luckiest-video-watcher (readout and competitor study).
