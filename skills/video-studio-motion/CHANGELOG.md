# Changelog — luckiest-video-studio-motion

## 1.2.0 — 2026-10-12

- Frame-measured durations at 30fps, ease roles with GSAP and cubic-bezier equivalents, one overshoot per film, hero arrivals from oversize.
- Handoff recipe between scenes, a transition picker keyed to what changes, camera push and snap values, and one system per film.
- New `references/kinetic-type.md` (word gaps, reading holds, typing only in product fields, counters, sizes on the studio's type tokens) and `references/ui-demo.md` (camera magnification, cursor timing, states, no customer data on screen).
- Review blocks a second overshoot, a cut on rest, a pinned object and a typed headline.
- From Tejas Makwana's motionmaxxing (Apache-2.0), in our own words.

## 1.1.0 — 2026-10-08
- `templates/spring.js`: closed-form springs computed from the time alone, with
  `track()` for values that change target (one spring per change, summed, so a
  retarget never stops dead), `settleTime()`, and four presets (snappy, default,
  heavy, playful). Tested in `templates/spring.test.mjs`.
- Springs section in `references/vocabulary.md` and a "springs for things with
  mass" rule in section 4.
- Practice studied from the 0xMovez course "How to build motion design studio with Opus 5.5" (x.com/0xMovez/status/2104216919033192746) and the PD House motion guide (pdhouse.notion.site/motion-guide). Ideas only, no code copied.

## 1.0.0 — 2026-10-02
- New sub-skill: motion purpose, GSAP easing, video durations, physicality and
  origin, masked transitions, stagger, and type rules, adapted from Emil Kowalski's
  skills (MIT).
- `--review` writes a per-scene findings table and Block or Approve verdict.
- `references/vocabulary.md`: motion terms with their GSAP build.
