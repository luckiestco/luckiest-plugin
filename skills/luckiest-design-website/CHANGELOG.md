# Changelog — luckiest-design-website

## 1.0.0 — 2026-09-04
Rebranded from scrollcraft (scroll-craft by Nate Herk, MIT, upstream v0.2.0).

### Security pass
- PASS. 29 files scanned. One low advisory, now documented in the skill body:
  `scripts/kie.mjs` reads `KIE_AI_API_KEY` from env or the nearest `.env` and
  sends it as a bearer token to two kie.ai hosts (`api.kie.ai` and the upload
  host `kieai.redpandaai.co`). Only the `--ref` image the user names is
  uploaded. Both hosts are central to the skill's stated purpose. The skill
  now tells the agent to reference the env var name only and never ask for the
  key in chat.

### Best-practices pass
- SKILL.md rewritten from 415 to 372 lines, third person, each reference
  named with when to load it. `license`, `metadata.version`, and
  `metadata.listing_id` added. `allowed-tools` kept minimal (Bash is required
  for the doctor, encode, serve and shoot scripts).
- Upstream `CHANGELOG.md` preserved as `UPSTREAM-CHANGELOG.md`; upstream
  `EXAMPLES.md` preserved as `references/registry-examples.md`.
- Engine, scripts, env vars and workspace file names kept verbatim so the
  upstream mechanism runs unchanged. Prose self-references rebranded.
- `scripts/doctor.mjs`: ffmpeg hint now names the macOS and Linux installs
  next to the Windows one. The preflight was run on macOS during this rebrand
  and works; upstream said it had only ever been run on Windows.

### Improve pass (/refract)
- Interview question 9: a dollar spend cap for generated assets. Zero routes
  the build to the user's own footage plus CSS-only devices. The source had a
  first-class no-spend route but never asked for the cap up front.
- CSS-first device rule: `reveal`, `parallax`, `in` and `drift` run on
  `animation-timeline: scroll()` / `view()` behind `@supports`, with the engine
  as fallback; the engine keeps `scrub`, `pin`, `pan` and `--sc-p` consumers.
- Performance budget in the verify step: LCP under 2.5s on the hero poster,
  INP under 200ms while scrubbing, and a mobile poster-plus-CSS fallback for
  any act that cannot hold it.
- New triggers: "rebuild my landing page as an experience", "this looks
  AI-made", "design my website".
- Copy is now a step, not an afterthought: `luckiest-copywriting` writes the
  act headlines, belief sentence and CTA label; `luckiest-copywriting-humanize`
  is the finishing pass.
- Head metadata and one JSON-LD block via `luckiest-schema`; an event plan
  (act reached, peak reached, CTA click) via `luckiest-analytics`. The peak
  reach rate is named as the page's success metric.
- `luckiest-extract-design-system` seeds tokens from an existing site when no
  brand kit exists. `luckiest-image` and `luckiest-video` are offered as asset
  generators alongside kie.ai. `luckiest-cro` reviews the close act.
- Hard rules extended with the AI-slop tells the trend pass surfaced: uniform
  radius and card heights, Inter or system font as the display face, blue-purple
  gradients, "Build the future" class headlines, and the INP ship-blocker.

### Network hooks
- Assist-request: when the human is unreachable, offer to raise an
  assist-request to the tribe before self-authoring the brief.
- Share-with-tribe: after the report, OFFER to share the fingerprint row and
  contact sheet only. Never BRIEF.md, brand assets, client names or copy.
- Pick-up-where-they-left: offer to seed a follow-up Luckiest plan (events
  wired, real-phone check, one A/B test on the peak or close).

### Trend pass (/newsjack + /luckiest-trends)
- The luckiest-trends engine ran with a query plan but timed out on YouTube
  transcript fetching before emitting evidence and saved no output. The
  newsjack CLI is not installed. Signals below came from host web search on
  2026-09-04 and are best-effort on freshness.
- CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`) at
  roughly 84% global support, compositor-driven, Chrome 115+, Firefox 132+,
  Safari 18+. Acted on as the CSS-first device rule. Sources: MDN CSS
  scroll-driven animations guide; CSSAWWWARDS "Scroll Timelines Guide (2026)";
  dev.to "Creating Complex Scroll-driven Animations with Pure CSS in 2026".
  Retrieved 2026-09-04.
- Safari 26.2 (released 2025-12-12) ships LCP and the Event Timing API behind
  INP, so iOS can now be measured; INP is the most-failed Core Web Vital
  (about 43% of sites over 200ms) and scrollytelling video scrub is a known
  offender on phones. Acted on as the performance budget and the INP
  ship-blocker. Sources: DebugBear "Firefox And Safari Now Support Two Core
  Web Vitals Metrics"; RUMvision "Safari catching up: INP and LCP in 26.2";
  scrollytelling.ai examples review. Retrieved 2026-09-04.
- "AI slop" web design is being named by its tells: Inter or system fonts,
  blue-purple gradients, "Build the future" headlines, uniform 16px radius,
  identical card heights, distributional convergence. Acted on as new hard
  rules and new triggers. Source: 925 Studios "AI Slop Web Design: Complete
  Guide to Spotting and Fixing Generic Websites (2026)". Retrieved 2026-09-04.

### Thumbnail
- Routes to the `nodes` scene via "design" in the title (also "structure",
  "design", "system" in the description). No hash fallback.

### Recommendations not implemented (next versions)
- R1. Ship a `scripts/vitals.mjs` that reads LCP and INP from the shoot run,
  so the budget is measured by the harness rather than by hand. Small
  Playwright addition to `shoot.mjs`.
- R2. Emit the CSS-first devices as a documented `engine/scrollcraft-css.css`
  layer with `@supports` fallbacks, so builds do not hand-write the same
  `animation-timeline` blocks.
- R3. Replace the kie.ai-only generator with a provider switch in `kie.mjs`
  (kie.ai, fal, Replicate) so `luckiest-image` and `luckiest-video` routes
  share the encode pipeline instead of ending at a file handoff.
- R4. A `--brand <dir>` flag on `workspace.mjs` that reads
  `luckiest-extract-design-system` tokens straight into the `:root` block of
  `template.html`.
- R5. An eval fixture: one recorded interview plus expected BRIEF.md, grammar
  choice and gate result, so a regression in the procedure is caught without
  a real build.
