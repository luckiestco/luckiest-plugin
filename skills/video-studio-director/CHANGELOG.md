# Changelog — luckiest-video-studio-director

## 1.6.0 — 2026-10-28

- Benchmark works (what to learn, what not to take), one native move on the peak,
  two real silences and two J- or L-cut sound transitions in films over 20 seconds,
  and a six-point check against the style card's beat seed. From Lemo-Opuscar
  `DIRECTOR.md` (MIT), rewritten.

## 1.5.0 — 2026-10-12

- Anchored 1-10 scale in the score loop and a Style fidelity score when a style is set.
- `references/jury.md`: independent read-only jury and revise prompts (from mg-styles-15, MIT), run in a fresh subagent before sign-off, at most two rounds.
- Six new anti-patterns: copying the sample, no concrete object, dead background, real material drawn in code, a new look every shot, no thread (from huashu-art-motion, MIT).

## 1.4.0 — 2026-10-12

- PAGE check under the creative intent, and a nine-row brand inventory before any idea.
- The top three angles must be three different kinds of film, and each must pass the cover-the-logo test before scoring.
- Every scene writes its belief ("the viewer ...") with a delete test, an importance of 1 to 3 (at most a quarter are 3), and what the picture shows with the text covered.
- Ending rules: 0.6 to 1.4 s resolved hold, CTA at most a quarter of the film, logo arrives by cause, no web-footer ending.
- From Tejas Makwana's motionmaxxing (Apache-2.0), in our own words.

## 1.3.0 — 2026-10-10
- Reads `brief.md` from the studio's context interview for the intent line and
  asks nothing it answers.
- Shot list rows carry `kind` (including `ai`, routed to the recreate sub-skill
  for prompts only) and `duration`. The storyboard review replaces the table
  approval; idea notes from it come back to the shot list.

## 1.2.0 — 2026-10-05
- `scripts/breakdown.mjs`: film over a strip of scene tiles; the active scene plays
  in sync with an accent outline, a playhead runs under it. Writes
  `qa/breakdown.mp4` and `qa/breakdown.png`. Step 3 of the score loop.

## 1.1.0 — 2026-10-05
- Insight line, eight angles from three methods, six weighted criteria (from
  smixs creative-director-skill, CC BY 4.0). Top angle refined to 8+.
- Five-beat shot list and scene-type lengths (from Skill Me video-storyboard, MIT).

## 1.0.0 — 2026-10-05
- New sub-skill of luckiest-video-studio.
- Creative intent, three angles, 2-second hook, energy map, beat-mapped shot list
  with an owning sub-skill per shot.
- `--score`: contact sheet, six scores, fix the worst three, repeat until all 8+
  (five rounds max), written to `qa/director-score.md`.
