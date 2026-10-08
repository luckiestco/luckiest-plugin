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
| **HyperFrames student kit** by Nate Herk and contributors (`hyperframes-student-kit`) | MIT for the original kit; the Student Kit Use Permission for its pipeline skills, style library, templates, and editing tools | Rewritten rules and ported scripts in the `luckiest-video-studio-cuts`, `-talk`, and `-reel` sub-skills | `LICENSE-student-kit`, `LICENSE-student-kit-pipeline` |
| **Motion OS** by Jason Lee (`jasonlee-breadcrumb/motion-os`) | MIT | The review player in the `luckiest-video-studio-review` sub-skill (`editor/index.html`, `editor/serve.mjs`) and the `reel.json` format; see that sub-skill's `ATTRIBUTION.md` | `luckiest-video-studio-review/LICENSE-motion-os` |

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
