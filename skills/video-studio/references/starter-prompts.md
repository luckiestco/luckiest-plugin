# Starter prompts

Nine request shapes that work well, written for this skill's flow. Use one when the
user asks "what can you make?", gives a one-line request, or wants a repeatable
format. Each maps onto the normal steps (interview, inspect, plan, storyboard
review, compose, render). Fill the [brackets]; keep everything else.

Ideas from opus-video-prompts and the guide that collected them, rewritten here.
Lyric and mascot rules come from pdoom-video and ClaudeAnimationBase (MIT).

## Before any starter

- **Effort.** Run planning and the final build at high or xhigh effort. Low
  effort skips the storyboard self-check and reads like a template.
- **Length.** Start at 10 to 30 seconds. Render time and cost grow with every
  second; go longer once the style is approved. Budget for two rounds: the
  polished films people post were made, reviewed and revised.
- **Storyboard first.** Never skip the storyboard review (Step 2), even for a
  one-line request. Fixing the plan takes minutes; fixing a render takes a re-render.
- **Write the reads.** For each scene, list in order what the viewer must
  understand. One read at a time, fast actions, slow meanings. A scene is as long
  as its reads need.
- **One note per revision.** After the first cut, take one change per message
  ("slower", "bigger logo at the end") and re-render only the touched scene.
- **Keys stay out of reach.** When a voice or music service is used, the key
  lives in `.env` and the run folder's `.claude/settings.json` has
  `"permissions": {"deny": ["Read(./.env)"]}`.

## The starters

1. **Launch film from a URL.** "A 15-second launch film for [url]. Pull the real
   logo, product screenshots and copy from the site. Motion-design showreel
   quality." Step 1 inspects the site; real assets only, nothing invented.
2. **Showreel.** "A 15-second motion showreel that shows off what this studio
   can do, in [style id or 'pick for me']." Use it to show a prospect the range
   before touching their brand. Highest effort.
3. **Five-scene explainer.** "A 30-second explainer for [what I sell, who it is
   for, brand colors]. Five scenes: the customer's problem, what we do, how it
   works in 3 steps, one proof point, our name." Proof uses real data or is cut.
4. **Recipe or how-to.** "A 30-second step-by-step of [recipe, setup, how-to],
   from empty to finished, with a step counter, the measurements as they go in,
   and a progress bar." Good for food, drinks, product setup.
5. **Lyric video.** "A word-synced lyric video for song.mp3 with lyrics.txt."
   Follow the lyric video section of [audio.md](audio.md): rights check first,
   timings before any scene.
6. **Mascot scene.** "A 15-second scene of [brand mascot] trying to [goal]."
   Art director route (d): model sheet and emotion sheet approved before shots.
7. **9:16 app ad.** "A 45-second vertical ad for my app. Record each feature
   being used in the simulator; let each feature break out of the phone into the
   world around it. Every number and label comes from the recordings. Each
   feature stays on screen at least 2.5 seconds. Text clear of the platform UI."
   Screen recordings go in the run's `demo/` folder; OpenScreen is optional
   ([openscreen.md](openscreen.md)).
8. **Faceless short series.** "A 30-60 second vertical short in [one style id]
   on the topic: [topic]." Keep the style and structure fixed and change only
   the topic line, so the channel is recognizable.
9. **Crew mode, films over 60 seconds.** Write the storyboard and a style guide
   (palette, renderer rules, shared props, the karaoke or caption band) first.
   Then one subagent builds each scene or chapter in its own file, in parallel.
   Shared files are read-only to them: a missing helper is written privately, a
   real bug is reported, not fixed. Every frame is a pure function of time, so
   scenes render out of order (`render-scenes.mjs --jobs`).

## Deliverable packs

Offer one when the user is making this for a client.

| Pack | Contents |
|---|---|
| Launch | 15s at 16:9, a 9:16 cut, 3 stills from hold frames |
| Ad test | the same ad with 3 different hooks (first 2 seconds), 9:16, platform-safe captions |
| Agency | 30s explainer in 2 styles plus a 9:16 cutdown, no studio branding |
| Lyric | full lyric video at 16:9 plus a 15s 9:16 chorus clip |
