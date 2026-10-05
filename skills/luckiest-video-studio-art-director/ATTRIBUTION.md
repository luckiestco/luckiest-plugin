# Attribution

`luckiest-video-studio-art-director` is a Luckiest sub-skill of `luckiest-video-studio`.

| Source | License | What this sub-skill uses | License file |
|---|---|---|---|
| **motion-art-direction** by iart.ai (`iart-ai/motion-design-skills`, https://github.com/iart-ai/motion-design-skills/tree/main/skills/motion-art-direction) | MIT, Copyright (c) 2026 iart.ai | Tone and energy matrix, motion personality table, motion-language spec rows, hero/support/texture hierarchy, restraint rules, consistency checklist | `LICENSE-iart` |
| **motion-color-and-light** and **kinetic-typography** by Skill Me (`SkillMedev/motion-video-direction`, https://github.com/SkillMedev/motion-video-direction) | MIT, Copyright (c) 2026 Alexander Ouellet | Video-safe color rules (near-black and near-white, accent saturation, anti-banding), reading-time hold formula, type hierarchy ratio, one-property entrances | `LICENSE-skillme` |
| **"AI finally designs like me"** by The Design Guy (YouTube, 2026-09-27, https://www.youtube.com/watch?v=E3Lgtf4xjeM) | Video, all rights reserved | Ideas only: DESIGN.md as a file of decisions already made, rules as choice plus reason plus example, locked/guided/open freedom levels, mining repeated review corrections for rules, pointing to existing assets instead of describing them, and checking that the agent read the file. No text or footage is copied | n/a |

## Changes in this edition

- 1.3.0: rule format, freedom levels, corrections loop, and the "repeats a logged correction" review column.

- 1.1.0: added video-safe color and type-in-motion rules, and two review columns.

- Added the look lock (palette, accent budget, two faces, texture, banned defaults).
- Added `art-direction.json` as a file the studio and other sub-skills read.
- Mapped studio tone presets to tone cells.
- Added style-frame approval at studio Step 2b and `--review` with Approve or Block.
