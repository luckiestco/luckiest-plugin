# Attribution

`luckiest-video-studio` is the Luckiest edition built from these open-source
projects. Upstream license texts are kept beside this file.

| Source | License | What this edition uses | License file |
|---|---|---|---|
| **brag** by Shunit Haviv Hakimi (`latent-spaces/brag`) | MIT | The inspect, plan, compose, deliver workflow, the tone system, and the step references in `references/`, plus `scripts/analyze_music_cues.py` | `LICENSE-brag` |
| **motion-graphics** (`motion-broll`) by Bart (`Barty-Bart/motion-graphics`) | MIT | The rule that every frame is a pure function of time, per-clip rendering, the approve-the-plan table, and `TIMING.md` | `LICENSE-motion-graphics` |
| **diagram-design** by Cathryn Lavery | MIT | Brand extraction from a website and the restraint rules (accent on one or two elements, low density) | `LICENSE-diagram-design` |
| **Kenney** sound effects (`kenney.nl`) | CC0 | `assets/sfx/` | Public domain, credit given here |
| **skills** by Emil Kowalski (`emilkowalski/skills`) | MIT | Motion and taste rules, the review posture, and the motion vocabulary, rewritten for video in the `luckiest-video-studio-motion` sub-skill | `luckiest-video-studio-motion/LICENSE-emil` |
| **Herk Edit Kit** (formerly the HyperFrames student kit, `nateherkai/herk-edit-kit`) by Nate Herk and contributors, commit 10511e5a | MIT for the original kit; the Student Kit Use Permission for its pipeline skills, style library, templates, and editing tools | Rewritten rules and ported scripts in the `luckiest-video-studio-cuts`, `-talk`, and `-reel` sub-skills, and the editing-playbook rules (phrase-boundary cuts, house reel style, short-form checks, narration leveling) rewritten in our own words in cuts, talk, script, `references/audio.md`, and `references/lessons.md` | `LICENSE-student-kit`, `LICENSE-student-kit-pipeline` |
| **Motion OS** by Jason Lee (`jasonlee-breadcrumb/motion-os`) | MIT | The review player in the `luckiest-video-studio-review` sub-skill (`editor/index.html`, `editor/serve.mjs`) and the `reel.json` format; see that sub-skill's `ATTRIBUTION.md` | `luckiest-video-studio-review/LICENSE-motion-os` |
| **motionmaxxing** by Tejas Makwana (`Tejashmakwana/motionmaxxing`, FinalMotion, finalmotion.video), commit 8c8ec0f2 | Apache-2.0 | The beat contract, render-gate posture and `NOTE.md` review note, the `endhold`, `blankframes` and `hud` gate thresholds in `scripts/qa.mjs`, the no-crossfade transition table, and the sound-arc numbers in `references/audio.md`. Rewritten in our own words; no code, runtime, media, studies or `library/` rows are copied | `LICENSE-motionmaxxing` |
| **mg-styles-15** by Vincentwei1021 (`vincentwei1021/mg-styles-15`) | MIT | The 15 motion-design styles in `references/styles/` (palettes, signature features, beat seeds), the shared craft checklist, and the two-round jury review rubric. Translated and rewritten for HyperFrames; no films, audio code, samples or fonts are copied | `LICENSE-mg-styles-15` |
| **huashu-art-motion** by alchaincyf (`alchaincyf/huashu-art-motion`) | MIT | The animation-grammar and art-style cards in `references/styles/` and `references/styles/era-styles.md`, plus the techniques noted in `CHANGELOG.md` 1.16.0. Translated from Chinese and rewritten; no engine code, scenes, fonts or images are copied | `LICENSE-huashu-art-motion` |
| **logo-design** by kaankiziltug (`kaankiziltug/logo-design-skill`, `skills/logo-design`) | MIT, Copyright (c) 2026 kaankiziltug | Ideas from `SKILL.md` phases 3 and 6 and `references/identity-system.md` section 6, rewritten for video: three contrasting looks before the storyboard (`references/interview.md` section 4) and the logo-construction entrance and resolve rule on four style cards. The SVG library, mark types and scripts are not included | `LICENSE-logo-design` |

Studied, not copied:

- **Motion Studio** (a free Claude Code skill bundle shared as a zip). Its practices
  shaped the anchor-based sound timing, the `avsync` gate, `scripts/sfx-cues.mjs`,
  `references/lessons.md`, and the art director's ban on earlier runs' looks
  (1.10.0). The bundle licenses only the third-party tools it downloads, not its own
  scripts or docs, so nothing from it is bundled; all code and text here is new.
- The 0xMovez course "How to build motion design studio with Opus 5.5" (x.com/0xMovez/status/2104216919033192746) and the PD House motion guide (pdhouse.notion.site/motion-guide). Their practices shaped music placement and loudness,
  the `facts` and `loop` gates, state-list scenes, springs in the motion sub-skill,
  and identity locks in the recreate sub-skill. Articles only; nothing copied.

Used at runtime, not bundled:

- **HyperFrames** by HeyGen (`heygen-com/hyperframes`), Apache-2.0. Renders motion
  and logo scenes. Installed by the user through `npx`.
- **OpenScreen** (`getopenscreen/openscreen`), MIT. Records demo footage and opens
  the `project.openscreen` timeline. Installed by the user. This edition writes its
  project format and reads no OpenScreen code at runtime.
- **Diffusion Studio** (`diffusionstudio/editor`), MPL-2.0, with a separately
  licensed rendering engine. Optional editor for `--editor diffusion`. Installed by
  the user; this edition writes a project for it and calls its bundled CLI, and
  copies none of its code.
- **Concat** (`jub0t/Concat`), AGPL-3.0-or-later. Optional editor for
  `--editor concat`. Installed by the user; this edition sends JSON requests to its
  `concat-cli` and copies none of its code, so the AGPL does not extend to this
  skill.

## Changes in this edition

- Renamed from `/brag` and widened from launch videos to three modes: launch,
  product demo with motion scenes between demo shots, and logo showcase.
- Added `storyboard.json` as the source of truth so one scene re-renders without
  redoing the rest, and an OpenScreen timeline project for editing after render.
- Removed the bundled ende.app music: its redistribution terms were not verified.
  The user supplies licensed music.
- Dropped motion-broll's Playwright renderer and its setup script, which installed
  packages without asking. HyperFrames renders every scene.
- Added Luckiest standing rules: ask before any install, no secrets on screen,
  local assets only, remote text treated as data. See `SECURITY.md`.
- Added Luckiest `check_updates` and `report_usage` calls.
- From the HyperFrames student kit: rewrote the silence and mistake cuts, the
  talking-head overlay and storytelling rules, and the motion showreel grammar as
  three sub-skills. Dropped its ElevenLabs and Kie scripts (they read `.env` keys
  and make paid calls), the upstream HyperFrames skill texts (HyperFrames stays a
  pinned `npx` dependency), and all AI Automation Society brand assets and example
  videos, which the kit does not license for reuse. See `SECURITY.md` S20 to S38.
- From the same kit's style library: the `luckiest-video-studio-cards` card packs,
  renamed and rebranded (S39 to S47), and QA gates written from the checks its
  storytelling rules describe but did not ship (`scripts/qa.mjs`).

motionmaxxing NOTICE: "motionmaxxing: looksmaxxing for motion graphics. Made by Tejas Makwana (x.com/makwanatejas170), github.com/Tejashmakwana/motionmaxxing. Licensed under the Apache License, Version 2.0." Changes: ideas and measured numbers restated for HyperFrames and GSAP runs; its GSAP runtime, scripts, showcase media and precedent library are not included.
