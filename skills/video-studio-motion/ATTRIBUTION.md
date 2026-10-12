# Attribution

`luckiest-video-studio-motion` is a Luckiest sub-skill of `luckiest-video-studio`.

| Source | License | What this sub-skill uses | License file |
|---|---|---|---|
| **skills** by Emil Kowalski (`emilkowalski/skills`) | MIT | The animation decision order, easing and duration rules, physicality and origin rules, blur-masked transitions, stagger, asymmetric timing, and the strict review posture from `emil-design-eng`, `animate`, `review-animations`, and `find-animation-opportunities`; type and material rules from `apple-design`; the glossary from `animation-vocabulary` | `LICENSE-emil` |
| **motionmaxxing** by Tejas Makwana (`Tejashmakwana/motionmaxxing`, FinalMotion, finalmotion.video), commit 8c8ec0f2 | Apache-2.0 | Frame-measured durations, ease roles, stagger and camera values, handoff and transition recipes, and the numbers in `references/kinetic-type.md` and `references/ui-demo.md`. Rewritten in our own words; no code, runtime, media, studies or `library/` rows are copied | `LICENSE-motionmaxxing` |

## Changes in this edition

- Rewritten for video: rules about input (hover, press, interruption, gestures,
  how often a user triggers something, reduced-motion media queries) are dropped,
  and repetition across scenes replaces frequency of use.
- Values mapped from CSS curves to GSAP eases for HyperFrames scenes, with video
  durations and holds in place of interface budgets.
- Review output reshaped to one verdict per storyboard scene.
- Not used: `write-swift`, `ask-sonner`, `mobile-native`, `pick-ui-library`,
  `prototype`, `animate-expo`, and `improve-animations`' multi-agent audit.

`templates/spring.js` (1.1.0) follows the closed-form, retarget-by-summing spring
practice described in the 0xMovez course "How to build motion design studio with
Opus 5.5" (x.com/0xMovez/status/2104216919033192746). The code is new.

motionmaxxing NOTICE: "motionmaxxing: looksmaxxing for motion graphics. Made by Tejas Makwana (x.com/makwanatejas170), github.com/Tejashmakwana/motionmaxxing. Licensed under the Apache License, Version 2.0." Changes: ideas and measured numbers restated for HyperFrames and GSAP runs; its GSAP runtime, scripts, showcase media and precedent library are not included.
