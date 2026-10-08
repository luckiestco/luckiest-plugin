# Attribution

`luckiest-video-studio-composition` is a Luckiest sub-skill of `luckiest-video-studio`.

| Source | License | What this sub-skill uses | License file |
|---|---|---|---|
| **shot-composition** by iart.ai (`iart-ai/motion-design-skills`, https://github.com/iart-ai/motion-design-skills/tree/main/skills/shot-composition) | MIT, Copyright (c) 2026 iart.ai | Grid math and worked tables, rule-of-thirds placement, hierarchy order, negative space, depth layers and parallax speeds, safe-area table, camera-move values, and the anti-pattern framing | `LICENSE-iart` |
| **20 rules of photo composition** (SlideShare deck, https://www.slideshare.net/slideshow/20-rules-of-photo-composition/248755645) | Not stated | The list of 20 rule names only. Explanations, video adaptations, and tests are original | n/a |

## Changes in this edition

- Refocused from general motion design to hold frames in `luckiest-video-studio`
  runs (HyperFrames and GSAP).
- Added the golden ratio: phi grid, golden spiral, golden triangles, phi type
  scale, with pixel tables per aspect.
- Added white-space budgets per scene type and the 20 rules with pass/fail tests.
- Added `--review` mode and rendered-still checks (squint, thumbnail, overlay).
- Removed cross-references to iart skills not installed here
  (`animation-principles`, `motion-art-direction`, `gsap-web`, `remotion-video`,
  `after-effects`). Easing and timing defer to `luckiest-video-studio-motion`.
- Replaced CSS scroll, pointer, and Three.js parallax code with GSAP. Dropped the
  orbit and dolly-zoom recipes.
