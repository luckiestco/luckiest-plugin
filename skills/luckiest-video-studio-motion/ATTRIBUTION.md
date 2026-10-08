# Attribution

`luckiest-video-studio-motion` is a Luckiest sub-skill of `luckiest-video-studio`.

| Source | License | What this sub-skill uses | License file |
|---|---|---|---|
| **skills** by Emil Kowalski (`emilkowalski/skills`) | MIT | The animation decision order, easing and duration rules, physicality and origin rules, blur-masked transitions, stagger, asymmetric timing, and the strict review posture from `emil-design-eng`, `animate`, `review-animations`, and `find-animation-opportunities`; type and material rules from `apple-design`; the glossary from `animation-vocabulary` | `LICENSE-emil` |

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
