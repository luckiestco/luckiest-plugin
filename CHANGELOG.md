## 0.1.53 — 2026-10-27 (npm luckiest-co 1.0.54)

- Video Studio 1.20.0 with Cuts 1.2.0, Talk 1.4.0, Script 1.4.0, ported from Herk Edit Kit's editing playbook (10511e5a): cuts land between phrases and never clip a word, a default house reel style for talking-head reels, stricter checks before delivery (mouth-free first 2.5 s, frame strips across cuts, caption contrast, re-transcribe the final render, loudness on the encoded file), and narration leveling. Attribution renamed from the HyperFrames student kit.

## 0.1.52 — 2026-10-23 (npm luckiest-co 1.0.53)

- 25 plugin skills caught up with their luckiest.co sources: the 1.0.50 upstream port (marketingskills 06d647e, Trends 1.2.1, Research 1.1.1, Coder 1.3.0) and the dead `tools/` link removals in ad-creative, ai-seo, analytics, churn-prevention, co-marketing, content-strategy, and prospecting. Plugin and npm installs had been shipping the 1.0.40 copies.

## 0.1.51 — 2026-10-23 (npm luckiest-co 1.0.52)

- Video Watcher 1.1.2: auto caption mode prefers the English original track when YouTube lists several (an English talk no longer comes back with Bangla captions).

## 0.1.50 — 2026-10-23 (npm luckiest-co 1.0.51)

- Releases now ship on merge. `.github/workflows/release.yml` publishes luckiest-co to npm (trusted publishing, no token) and syncs luckiestco/luckiest-plugin, merging the sync PR. A merge without a bump stops at "already on npm".
- New PR check `bin/release-check.js` (not shipped): a PR that changes shipped plugin files fails until it runs `npm run bump`.
- `npm run sync-plugin` works in CI: auth via `GH_TOKEN` and `gh auth setup-git`, a release-bot git identity when none is set, and `--merge`.

## 0.1.49 — 2026-10-23 (npm luckiest-co 1.0.50)
- Upstream updates: 18 marketing skills from marketingskills 06d647e, Trends 1.2.1 (last30days 13a6cc5), Research 1.1.1 (PixelRAG), plus gstack and the weave model router.

## 0.1.48 — 2026-10-16 (npm luckiest-co 1.0.49)
- New skill: YouTube Planner (`/luckiest:youtube-planner`). It plans a video stage by stage, idea, title and thumbnail, hook, outline, and readout, and will not move on until each stage scores 7 out of 10. It checks real view floors and ceilings from YouTube search with no API key, and runs each outline section as a story loop.

## 0.1.47 — 2026-10-15 (npm luckiest-co 1.0.48)
- Video studio 1.19.0: a new Continuous Product Flight style, one camera flight around one product with speed ramps timed to the music, side captions and callouts. Built for collectible and premium product reveals.
- 34 skills caught up with their upstream sources (reviews #174 to #180): trends runs on the last30days 3.28.0 engine; 27 marketing skills get the newer marketingskills playbooks and references (cold email, prospecting, SEO audit, referrals, pricing and more); brainstorm and coder brainstorming, debugging, code review and subagent skills get superpowers v7.0.0 fixes; video studio motion is 1.3.1.

## 0.1.46 — 2026-10-15 (npm luckiest-co 1.0.47)
- Video studio 1.18.0: a new check compares the last frame of each logo scene with the real logo file and fails the render if the ending logo is wrong.

## 0.1.45 — 2026-10-13 (npm luckiest-co 1.0.46)
- Video studio 1.17.3: the mosaic, pixel and flat-vector styles now build a logo sting from how the mark is drawn and end on the exact logo file, instead of an invented logo.

## 0.1.44 — 2026-10-13 (npm luckiest-co 1.0.45)
- Video studio 1.17.2: the soft 3D render style now builds a logo sting from the logo's own shapes, dropped in the order the mark is drawn, and ends on the exact logo file instead of an invented inflated wordmark.

## 0.1.43 — 2026-10-12 (npm luckiest-co 1.0.44)
- Video studio 1.17.1: the retro CGI style now builds a logo's entrance from how the mark is drawn (wireframe first, then the plastic fill) and ends on the exact logo file, like the morph, line-art, liquid and bauhaus styles.

## 0.1.42 — 2026-10-12 (npm luckiest-co 1.0.43)
- Art director 1.8.0: every film now needs a one-sentence idea that no competitor's film fits before the look is locked, a list of the category's clichés (banned unless given a fresh form), and a thumbnail, squint and shelf test on each scene's still frame.
- Video studio 1.17.0: you pick from three contrasting looks before the storyboard instead of approving one. The morph, line-art, liquid and bauhaus styles now build a logo's entrance from how the mark is drawn and end on the exact logo file.
- Both adapted from the logo-design skill by kaankiziltug (MIT).

## 0.1.41 — 2026-10-12 (npm luckiest-co 1.0.42)
- Video studio 1.16.0: 38 named styles you can ask for by name ("make it synthwave", "paper cut look", "whiteboard explainer") or pick from in the interview, plus 18 era styles for history and tribute pieces. Each style comes with its palette, motion, must-have features and how to build it. Styles come from mg-styles-15 and huashu-art-motion (both MIT).
- The paper cut collage style reuses the showreel paper-cut look and the paper-collage card pack.
- A storyboard check now runs before anything is built: it stops flat pictures, scenes over 8 seconds and text-heavy openings or endings.
- Director 1.5.0 adds an independent jury review with a scoring scale; art director 1.7.0 adds style rules, character rules and fallback palettes; motion 1.3.0 adds camera rules so push-ins do not repeat every shot.

## 0.1.40 — 2026-10-12 (npm luckiest-co 1.0.41)
- Video studio 1.15.0: three new render checks catch an end card held too long, empty frames, and on-screen labels like "02 / SPEAK" or timecodes. Every finished video now comes with a `NOTE.md` that says what each scene makes the viewer believe, what is real and what is generated, and the check numbers.
- Video studio sub-skills learn from motionmaxxing (Apache-2.0): director 1.4.0 adds a brand checklist, three kinds of idea and a cover-the-logo test; motion 1.2.0 adds timing in frames, scene handoffs and new guides for animated text and UI demos; art director 1.6.0, composition 1.2.0 and script 1.3.0 add a never-ship list, one hero per frame, and short-film word budgets.
- Video studio no longer suggests crossfades between scenes, which its own check rejected.

## 0.1.39 — 2026-10-11 (npm luckiest-co 1.0.40)
- New: `/luckiest:skill-audit` now gives every skill a security verdict from NVIDIA SkillSpector, next to its trigger and collision checks. New `/luckiest:skill-audit-security` checks one skill before you install it and answers Approve, Caution, or Reject with the file and line behind each call.
- New: `/luckiest:video-studio-showreel` for product showreels in one continuous camera move.
- Security: video-watcher pins its uv installer and no longer pipes a download into PowerShell. Video-studio's audio tools move to urllib3 2.8.0. Trends lists what it can access, and its upstream dev scripts no longer ship.
- 36 skills catch up to their latest versions, including the coder family 1.2.0, copywriting 1.2.0, social 1.3.0, video 1.4.0 and video-studio 1.14.1.

## 0.1.38 — 2026-10-08 (npm luckiest-co 1.0.39)
- Every skill drops the repeated prefix in the `/` menu: `/luckiest:luckiest-ads` is now `/luckiest:ads`, `/luckiest:luckiest-copywriting` is now `/luckiest:copywriting`, and so on for all 96. The old long names no longer work as slash commands. Asking in plain words still works the same.
- Without the plugin, npx still installs every skill as `luckiest-ads`, `luckiest-copywriting`, and so on, and never overwrites a skill of yours named `ads` or `copywriting`.

## 0.1.37 — 2026-10-08 (npm luckiest-co 1.0.38)
- The `/` menu no longer shows a gray `(luckiest:luckiest-plan)` next to `/luckiest:plan`. The 16 plan, go, finish and other command skills now live in folders named `plan`, `go`, `finish`, and so on. Without the plugin, npx still installs them as `luckiest-plan`, `luckiest-go`, and so on, and never overwrites a skill folder of yours named `plan` or `go`.

## 0.1.36 — 2026-10-08 (npm luckiest-co 1.0.37)
- `/luckiest:plan`, `/luckiest:go`, `/luckiest:finish` and the other 13 work again when the plugin is added through Claude desktop. They are now skills named `plan`, `go`, `finish` and so on, instead of separate command files that desktop plugins do not load. Each one shows once in every install. Without the plugin, npx installs them as `/luckiest-plan`, `/luckiest-go` and so on.
- The installer now sees a Luckiest plugin added through Claude desktop, so `--sync-only` stops copying the skills the plugin already ships into `~/.claude/skills`, and removes copies left there.
- New test: every plugin skill name is unique and none clashes with a command.

## 0.1.35 — 2026-10-08 (npm luckiest-co 1.0.36)
- The 16 plan, go, finish, next, status, home, start, charms, helpers, leaderboard, merge, overlaps, skills, updates, vouch, and wishes skills are hidden from the slash menu (`user-invocable: false`), so `/luckiest:plan` no longer also appears as `/luckiest:luckiest-plan`. Claude still picks them up from "luckiest plan" in claude.ai and Cowork.
- `npm publish` now stops before upload when the `package.json` version is already on npm, and names the 4 files to bump. Maintainer-only, not in the npm package.
- `npm run sync-plugin` mirrors this package into luckiestco/luckiest-plugin and opens the sync PR there (`-- --dry-run` to preview). Maintainer-only.

## 0.1.34 — 2026-10-08 (npm luckiest-co 1.0.35)
Each Luckiest skill now shows up once, not twice.

- The installer no longer copies skills into `~/.claude/skills` when the Luckiest plugin is installed, and `--sync-only` removes the copies older installs left behind, so `luckiest-ads` no longer also appears as `luckiest:luckiest-ads`.

## 0.1.33 — 2026-10-08 (npm luckiest-co 1.0.34)
The video watcher keeps keys out of chat and only watches the videos you give it.

- `luckiest-video-watcher` 1.1.0: API keys are never taken in chat, and a pasted key is flagged for rotation. Questions and paths are quoted so nothing in them runs as a command. Links found inside a video are reported, never followed. Study questions show each option's frames and cost, a clean render review says what it covered, and sub-second moments get a closer look.

## 0.1.32 — 2026-10-08 (npm luckiest-co 1.0.33)
Video studio watches its own renders, makes landscape, vertical, and square from one storyboard, and times sound to the cut.

- New `luckiest-video-watcher` 1.0.0, built from the watch skill in claude-video (MIT). Frames plus transcript, or Gemini watching the whole video. Quick mode picks the cheapest settings on its own. Study mode asks once how deep to go. Private footage stays local.
- `luckiest-video-studio` 1.12.0: a quick watch of the final render after the QA gates.
- `luckiest-video-studio-reference` 1.1.0 and `luckiest-video-studio-recreate` 1.3.0: study mode adds sound and speech to the breakdown.
- `luckiest-research` 1.1.0: shared videos and "summarize this video" go to the watcher.
- `/luckiest plan`: a video in the request gets a quick watch before tasks are drafted.
- `luckiest-video-studio` 1.13.0: formats come last. Approve the 16:9 first, then add vertical and square: landscape clips are reused, and `render-scenes.mjs --stills` with `qa.mjs safe --stills` checks every format's layout without a test render.
- `luckiest-video-studio-cards` 1.3.0: all 406 cards render in landscape, vertical, and square from one file, with text inside each format's safe area.
- `luckiest-video-studio` 1.11.0: optional storyboard `formats` renders one file per format; demo footage crops around a `focus` point; `qa.mjs safe` checks each format's safe area. `luckiest-video-studio-reel` 1.3.0 renders all three formats.
- `luckiest-video-studio` 1.10.0: sound effects timed by anchor (pops on the frame, whooshes on the cut), music placement and loudness, and new `avsync`, facts, and loop gates. `luckiest-video-studio-motion` 1.1.0 adds springs; `luckiest-video-studio-art-director` 1.5.0 avoids repeating earlier runs.
- The review player now tracks its Motion OS upstream for changes.

## 0.1.31 — 2026-10-07 (npm luckiest-co 1.0.32)
Brandkit sizes logos like the real product, and video studio opens finished videos in a review player.

- New `luckiest-brandkit-sizing` 1.0.0: real logo size and placement for apparel (inches, cm, and share of chest width), hats, bags, embroidery limits, stationery, minimum size and clear space, and signage letter height by viewing distance.
- `luckiest-brandkit` 1.5.0: merch, stationery, and signage shots state the logo size in their COMPOSITION line, and QA checks it.
- New `luckiest-video-studio-review` 1.0.0: the review player, built from Motion OS (MIT). Review a rendered video scene by scene, edit copy and colors, pin notes on the frame, and send one prompt back that re-renders only the touched scenes.
- `luckiest-video-studio` 1.9.0: the review player is the default editor (`--editor review`); Concat moves to `--editor concat`.
- `luckiest-video-studio-cuts` 1.1.0: the silence cut is reviewed in the same player, replacing `review.html`.

## 0.1.30 — 2026-10-06 (npm luckiest-co 1.0.31)
Brandkit reviews raw shots first.

- `luckiest-brandkit` 1.4.0: raws generate at the image tool's smallest, fastest setting; the review page (Keep or Reshoot plus notes) runs right after the raws, before fixes and upscaling; the upscale asks for look (sharp detail, photo and faces, logos and UI, or none) and size (2x, 3x, 4x) instead of a fixed remacri-4x at 2x.

# Changelog — luckiest plugin

## 0.1.29 — 2026-10-05 (npm luckiest-co 1.0.30)
Real, not generated: rules so generated images, video, and site imagery do not look AI-made.

- `luckiest-video-studio-art-director` 1.4.0: section 3b (named light direction, film texture, off-center candid framing, specific places, banned prompt words, guidance near 3.5 to 4), `references/shot-prompting.md` adapted from Replicate prompt-images (Apache-2.0), and a "Looks generated" review check.
- Now applied by `luckiest-image` 1.2.0, `luckiest-design-website` 1.1.0, `luckiest-ad-creative` 1.3.0, `luckiest-social` 1.2.0, and `luckiest-video` 1.3.0.
- `luckiest-brandkit` 1.3.0: review page with Keep or Reshoot and notes per shot, plus 3b in its art director row.
- `luckiest-video-studio` 1.8.1.

## 0.1.28 — 2026-10-05 (npm luckiest-co 1.0.29)
Video Studio 1.8.0, director and art director, brandkit.

- New `luckiest-video-studio-director`: intent, hook, five-beat shot list, and a scored contact-sheet loop with a side-by-side breakdown view.
- New `luckiest-video-studio-art-director`: reads the project design system first, writes art-direction.json, and reviews scenes against it.
- `luckiest-video-studio` 1.8.0 routes to both. Script, reel, talk, cards, recreate, luckiest-video, ad-creative, and luckiest-plan call them when installed.
- New `luckiest-brandkit`: a consistent set of photoreal brand mockups from a style brief and shot list.

## 0.1.27 — 2026-10-05 (npm luckiest-co 1.0.28)
Video Studio 1.7.2.

- `luckiest-video-studio` documents what a real launch video run needed: live site screenshots, a snapshot style frame, and the HyperFrames project layout.

## 0.1.26 — 2026-10-05 (npm luckiest-co 1.0.27)
Video Studio 1.7.1.

- `luckiest-video-studio` makes Concat the default editor, adds an asset and storyboard approval step before any scene is built, and fixes the Concat script after a live test (vertical sizing, reruns, music length).

## 0.1.25 — 2026-10-04 (npm luckiest-co 1.0.26)
Fewer stops between finishing one piece of work and starting the next.

- `/luckiest finish` closes the plan and awards charms right after the recap. The separate "Close this out?" question is gone.
- After you pick what to plan next, finish asks whether to plan it here or in a new session. A new session starts with a clean context, through the app when it can, or with `/clear` and `/luckiest plan <pick>` to paste.
- New `/luckiest next` (or `/next`): does the last suggested `Next:` step. In a fresh session it picks up the plan where it stands, or recommends what to plan next.
- Every command ends its `Next:` line with "(say /next to do it)", so any suggestion can be run by typing `/next`.

## 0.1.24 — 2026-10-03 (npm luckiest-co 1.0.25)
New composition skill, used wherever a frame or image gets placed.

- New `luckiest-video-studio-composition` (1.1.0): focal point, rule of thirds, phi grid, white space, platform safe areas, and the 20 photo composition rules, plus a frame review. Ships inside `luckiest-video-studio` 1.6.0.
- `luckiest-image`, `luckiest-ad-creative`, `luckiest-video`, `luckiest-social`, `luckiest-launch`, `luckiest-design-website`, `luckiest-prompt-rewrite`, and the video-studio cards, reel, recreate, and talk sub-skills now read it for framing when it is installed.

## 0.1.23 — 2026-10-02 (npm luckiest-co 1.0.24)
Skill sync installs skills where Claude Code finds them.

- `--sync-only` was unzipping each skill into `~/.claude/skills/<name>/<name>/`, one level too deep, so bundled sub-skills (video-studio, coder) never showed up. Each zip now extracts to a temp folder inside `~/.claude/skills`, and each skill folder moves to the top level, replacing the old copy and any nested leftovers. Zips with `SKILL.md` at the root still install under the listing name.
- Two syncs running at once no longer overwrite each other's files, because each run extracts to its own temp folder.
- The sync summary lists bundled sub-skills as `bundled with <listing>`.

## 0.1.22 — 2026-10-02 (npm luckiest-co 1.0.23)
Write the script before the storyboard.

- New `luckiest-video-studio-script` sub-skill: five-part, three-act voiceover scripts with a word budget, a per-act timing table measured from 11 Grumo Media explainers, a line-by-line SUCCESS score, and one line per storyboard scene.
- luckiest-video-studio 1.5.1 routes narrated videos of 30 seconds or more to it.
- Also ships luckiest-video-studio 1.5.0 (`luckiest-video-studio-motion`, #91).
- First npm release since 1.0.21, so it also carries 0.1.21 (`luckiest-video-studio-recreate`).

## 0.1.21 — 2026-10-01 (npm luckiest-co 1.0.22)
Recreate a video from prompts.

- New `luckiest-video-studio-recreate` sub-skill: splits a URL or mp4 into shots, writes one generation prompt per shot, generates and stitches the shots through the creative MCP after a cost check, and compares the result to the source. `--prompts-only` stops after the prompts.
- luckiest-video-studio 1.4.1 routes AI-generation remakes to it.
- `marketplace.json` version now matches `plugin.json`.

## 0.1.20 — 2026-10-01 (npm luckiest-co 1.0.21)
Update notices in chat.

- New SessionStart hook `update-notice.mjs`: at most once a week it checks the published plugin version and, only when yours is older, shows one line saying an update is available. It is silent when you are current or offline, and it sends no data.
- `/luckiest status` repeats that line under the dashboard when this session got a notice.

## 0.1.19 — 2026-09-30 (npm luckiest-co 1.0.20)
Bundles luckiest-video-studio 1.4.0 and its six sub-skills (ae, reference, cuts, talk, reel, cards).

- New `qa.mjs judge`: each new render is compared with the last one twice, with the order swapped, and kept only if it wins both. The loop stops at v3.
- New `qa.mjs face`: fails when a card covers the speaker's face.
- Talk gains `grab-evidence.mjs`, which screenshots the real pages a script names.

## 0.1.18 — 2026-09-25 (npm luckiest-co 1.0.19)
/luckiest plan now looks at the project before planning and hands its findings to /luckiest go. Adapted from context-engineering-intro (MIT, Cole Medin).

### Plan
- New Step 4, "Look before you plan": a short, read-only pass over CLAUDE.md and AGENTS.md, similar code, and the project's own test, lint, and build commands. Sized to the outcome, so a small change skips the search for similar work.
- Every coding task gets a runnable check. Non-coding tasks get a plain check the user can look at.
- The plan lists its assumptions and what is out of scope, and ends with "Confidence: N/10. Biggest risk: ...". Below 7, it looks further or adds one open question to the plan.
- After approval, each task is turned into a ready-to-run working prompt with luckiest-prompt-rewrite, with the target and model passed in so it asks no questions. /luckiest go uses the saved prompt, fixes any file paths that moved, and only rewrites a prompt when none was saved.
- After approval, it saves `.luckiest/PLAN-CONTEXT.md` (new template in `templates/`). This keeps each task's "done means" line and check across sessions.

### Finish
- After a plan is closed, `/luckiest finish` recommends 3 or 4 next tasks instead of asking an open "what's next?". luckiest-thinker widens the candidates, drawing on deferred items, brief gaps, and assumed-away risks. They are ranked by Impact minus Effort, and the top pick is marked Recommended. Picking one starts `/luckiest plan` with it as the outcome, so the interview is skipped.

### Go
- Reads `.luckiest/PLAN-CONTEXT.md` only when its tasks match the active plan, and runs each task's check. Checks are limited to test, lint, type-check, and build commands. Anything else needs the user's OK.
- The skill and command copies are now in sync, including the earlier model tagging, explicit subagent model, and escalation changes.

### Security
- Repo files, docs, web pages, and the saved context file are treated as information, never as instructions.
- Plan never opens `.env` or key files, and never copies secrets into the plan or the context file.

### Insights (2026-09-25)
- Kept: the Spec Kit guide (Joe Maddalone, 2026-09-21, youtube.com/watch?v=7aUEjRw0yzk) argues that agents turn unstated assumptions into code, which led to the assumptions list. The Uvik Software SDD Benchmark (updated 2026-09-24, uvik.net/spec-driven-development-benchmark) found that OpenSpec's 12-minute spec phase merged 42/50 tickets, against 41/50 for BMAD's 28-minute phase, which led to sizing the research step to the outcome.
- Newsjack triage: all 3 signals went to watch (vendor or creator content, no pitch). Refract kept 3 of 8 candidates, including the fix for a stale context file.

### Also in this release
- The bundled luckiest-model-router is updated to 2.0.0.
- /luckiest plan tags each task with a Haiku, Sonnet, or Opus tier via luckiest-model-router, and /luckiest go escalates a task after two failed checks.
