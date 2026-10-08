# Step 3: Hand off to Hyperframes

## Create the composition brief

Write `<output-dir>/composition-brief.md` before creating or editing the Hyperframes composition.

```markdown
# Hyperframes Composition Brief: [App Name]

## Objective
Create a short launch-style video for [App Name].

## Output
- Composition directory: `<output-dir>/composition/`
- Rendered video: `<output-dir>/final.mp4`
- Format: [landscape / vertical / square] — [width]x[height]
- Also render: [none / vertical / square / landscape] (storyboard `formats`)
- Duration: [15-25 seconds]

## Source Material
- Project root: [path]
- Primary files read: [index.html, styles.css, README, etc.]
- Product name: [name]
- Tagline / strongest claim: [line]
- Key UI or visual moment to recreate: [specific element]
- Copy that must appear verbatim:
  - [line 1]
  - [line 2]

## Creative Direction
- Tone preset: [default / polished / yc-parody / chaotic / deadpan / cinematic / app-store]
- Creative direction: [freeform phrase, inferred or user-provided]
- Interpretation: [how tone affects pacing, writing, visual energy, and restraint]
- Angle: [one paragraph from plan.md]
- Hook: [first 2-3 seconds]
- Outro / punchline: [final line]
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign

## Visual Identity
- Background: [exact value from project]
- Text: [exact value from project]
- Accent: [exact value from project]
- Display font: [font or fallback decision]
- Body font: [font or fallback decision]
- Visual references from the project: [short list]

## Storyboard
Use the storyboard in `<output-dir>/plan.md` as the creative contract.

Scene summary:
1. [Scene name] — [duration]s — [what must be seen / read]
2. [Scene name] — [duration]s — [what must be seen / read]
3. [...]

## Audio
- Audio role: [warm bed / sparse professional accents / cinematic support / dense rhythmic layer / intentional silence]
- Audio arc: [how sound changes across the video]
- Music: [filename, or none only if disabled, missing, or intentionally silent]
- Music treatment: [volume posture, fade-in/out intent, beat/swell notes; e.g. fade under final logo]
- Music cue guidance: [cue source — existing preset path, or "detect at composition via analyze_music_cues.py / hyperframes beats" — plus concise optional timing hints; or unavailable]
- Audio-reactive treatment: [none / subtle / expressive; what visual qualities may respond to RMS/frequency energy]
- Audio-coupled moments:
  - [scene/moment] — [typing / beat reveal / counter / card sequence / simulated interaction / final logo]
  - [scene/moment] — [intent]
- SFX selection guidance: [how sound should match motion and interaction; examples only, not rigid rules]
- SFX analysis guidance: [path to sfx-analysis.md/json if present; use lower high-frequency-risk sounds for repeated or polished moments]
- Exact SFX choice: Hyperframes should choose filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: copy the chosen music and any Hyperframes-selected SFX into `<output-dir>/composition/assets/`

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core` (composition contract + `data-*` timing), `hyperframes-animation` (motion), `hyperframes-creative` (design spec, beats, audio-reactive), `hyperframes-keyframes` (seek-safe keyframes), and `hyperframes-cli` (lint/check/render). /video is its own workflow: do not enter the `hyperframes` entry-point intent interview and do not route into its generic promo / launch-video workflow. Prefer native Hyperframes conventions over anything in `luckiest-video-studio`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project.
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds.
- Include the planned music/SFX layer unless audio was explicitly disabled or documented as intentionally silent.
- Treat `luckiest-video-studio` audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints. Hyperframes decides exact animation timing and should ignore cues that hurt readability, scene pacing, or the product story.
- Major reveals may move toward nearby strong cues within about 0.15s. Smaller entrances may align to nearby beat points within about 0.10s. Use only 1-3 strong cue locks in a 15-25s video unless the edit clearly benefits from more.
- Use SFX to support motion and interaction: card sounds for card-like reveals, short announcement cues for major payoffs, key/click sounds for text or user actions, and restraint when the edit is already busy.
- Honor planned music treatment such as fade-outs, ducking, beat-aligned reveals, or letting a final SFX ring over the music, using the best Hyperframes-supported implementation.
- When music is present and the treatment is not `none`, consider Hyperframes audio-reactive workflow: extract audio data and use RMS/frequency bands for subtle, brand-specific motion. Good targets are glow, depth, background warmth, card presence, title emphasis, or other existing visual elements. Avoid waveform/equalizer visuals, musical-note graphics, generic particle systems, strobing, or heavy pulsing.
- Use local assets for audio and any required runtime/media dependencies when possible.
- Run `hyperframes check` before render — it is the single gate.
```

The brief is the boundary: if a detail belongs to product positioning, copy, tone, source material, or selection of moments, `luckiest-video-studio` should specify it. If a detail belongs to composition implementation, Hyperframes should decide it.

---

## Audio asset preparation

Read [audio.md](audio.md). Copy the planned music into `<output-dir>/composition/assets/music/` before building the composition.

```bash
mkdir -p <output-dir>/composition/assets/music
cp <skill-dir>/assets/music/<track>.mp3 <output-dir>/composition/assets/music/
```

`<skill-dir>` is this skill's own directory (see "Skill directory" in `SKILL.md`).

Hyperframes copies any SFX it selects into the same `assets/` tree after choosing exact files.

---

## Voiceover (only when the user explicitly asks)

Voiceover is disabled unless the user explicitly requests it, for example
with `--voice` or "narrate this". Do not offer or enable narration during a
normal `luckiest-video-studio` run.

When voice is disabled, do not write a voiceover script, generate narration,
transcribe audio, duck music, add a voice track, or merge narration into the
video. The normal video export must remain entirely voice-agnostic.

When voice is enabled, write the narration lines into `plan.md` under a
`## Voiceover script` section, then generate the audio through Kokoro:

```bash
npx hyperframes tts "<narration text or path to script>" \
  --voice af_heart \
  --output <output-dir>/composition/assets/voiceover.wav
```

If the user wants a different Kokoro voice, run `npx hyperframes tts --list`
to see the available options. The command above is the voice implementation
for this PR and should be used directly.

Wire it into the composition on its own track. Music ducks to 0.12–0.15 for the duration of the voiceover, then returns to its normal level:

```html
<audio id="vo" data-start="0" data-track-index="3" data-volume="1" src="assets/voiceover.wav"></audio>
```

Scene durations must flex to match the generated audio — check the WAV duration after generation and adjust `data-duration` values accordingly. Do not hardcode scene lengths when voiceover is present; let the voice set the pace.

---

## Audio-reactive extraction (when music is present)

When music is present and the treatment is not `none`, the composition can react to per-frame audio data. **Delegate the extraction to the Hyperframes audio-reactive workflow** — `luckiest-video-studio` does not ship an extraction script and must not hardcode a path to one.

In the composition step, follow the audio-reactive guidance owned by the `hyperframes-creative` skill (let that skill locate its own files). It owns the data format, the extraction helper (which ships with that skill, not with `luckiest-video-studio`, so don't hardcode a path to it), and the per-frame sampling pattern. Ask Hyperframes to extract the audio data and wire at least one visual element to it.

If extraction is unavailable (no helper, or ffmpeg missing), note it in the brief and skip audio-reactive — do not block the render.

---

## Beat sync (when a cue source is available)

Get a cue source first (see `audio.md` → "Beat and cue sources"): an existing preset, `analyze_music_cues.py` on any track (needs Python; run via `uv`), or `npx hyperframes beats` (no Python; needs Hyperframes ≥ 0.6.99). The rich sources (preset / `analyze_music_cues.py`) give two arrays; `hyperframes beats` gives one.

- **`strongCues`** — high-intensity beats (drops, swells, accents). Use for **major moments**: scene transitions, hero reveals, match payoff, logo landing. Lock 1–3 per video. With `hyperframes beats` (no `strongCues`), take the highest-`strength` beats instead.
- **`beats`** — the full beat grid. Use to **snap small sequential events** into the music's pulse: cards arriving one by one, stats popping in, sequenced SFX hits.

### How to implement

**Major moments (strong cues):**
1. Load the cue source: the preset/analysis JSON (`strongCues` + `beats`), or the beat-grid JSON that `hyperframes beats` writes (a plain beat list; see the current hyperframes-cli skill for its location).
2. Pick 1–3 strong timestamps near a planned major visual moment — `strongCues`, or the highest-`strength` beats.
3. Shift the reveal's start time to land within ±0.15s of the cue.
4. Mark it: `// beat-locked: 5.80s`

**Sequential events (beats):**
1. Decide how many sequential items there are (e.g. 3 stats, 4 profile cards).
2. Find the nearest beat to your intended start time for the first item.
3. Use consecutive beats from that point for each subsequent item — snap each within ±0.10s of a beat timestamp.
4. Mark it: `// beat-grid: stat 1 at 12.65s, stat 2 at 13.17s, stat 3 at 13.70s`

**Readable text vs the beat grid:** if the sequential items are text the viewer reads (stat labels, list rows, callouts) and the beats are close (under ~0.6s apart at fast tempos), do not reveal a new line on every beat — it outruns reading (this rushed the bicycles spec rows). Snap to every other beat, or reveal them quickly and hold the full set on screen afterward. Non-text accents (glows, dots, ticks) may still hit every beat. See the reading-time floor in `step-2-plan.md`.

This gives you two layers of musicality: the big moments land on the strongest hits, and the small events tick along with the pulse.

Do not force every tween onto a beat — readability and scene pacing come first. If snapping a tween to a beat hurts copy legibility or the product story, use the natural timing instead.

If SFX are enabled, also pass `<skill-dir>/assets/sfx/sfx-analysis.md` as selection guidance. Prefer low high-frequency-risk files for repeated or polished moments. SFX on sequential events should fire at the same timestamp as the visual — the sound and motion land together.

---

## Call Hyperframes

After `<output-dir>/plan.md`, `<output-dir>/composition-brief.md`, and selected audio assets exist:

1. Load the Hyperframes domain skills (`hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`) to create or update `<output-dir>/composition/`. /video is its own workflow — do not enter the `hyperframes` entry-point intent interview or route into its generic promo / launch-video workflow.
2. Pass Hyperframes the composition brief, the video plan, and the source files it should reference.
3. Let Hyperframes choose the implementation details.
4. Run Hyperframes check (the single gate before render).
5. Render to `<output-dir>/final.mp4`.

Do not manually copy stale composition snippets from this skill into the output. The point of delegating is to benefit from the latest Hyperframes guidance.

### Project layout that passes check and `render-scenes.mjs`

Learned on a real run with HyperFrames 0.8.x:

- Scaffold with `hyperframes init composition --example blank --resolution <landscape|portrait|square> --non-interactive` inside `<output-dir>`.
- One file per scene at `composition/compositions/<scene-id>.html`, each a full composition with its own `data-composition-id="<scene-id>"` and a paused timeline registered as `window.__timelines["<scene-id>"]`. `render-scenes.mjs` renders these one at a time.
- The root `composition/index.html` must host every scene back to back: `<div id="scene-<id>" class="clip" data-composition-id="<id>" data-composition-src="compositions/<id>.html" data-start=".." data-duration="..">`. A root with no scenes fails `check` with "Timeline did not advance under seek".
- Copy every approved asset into `composition/assets/`, and reference it as `assets/...` from the project root, never `../`.
- Fonts: declare each family with `@font-face` pointing at a local file in `composition/assets/fonts/`. Leave out named fallbacks such as Georgia; HyperFrames maps them to a Google font and fetches it.
- Give every timed element an `id`, or check warns that Studio cannot edit it.
- Before the full render, check every scene's hold frame in one pass: `hyperframes snapshot . --at <hold1>,<hold2>,... --no-end -o ../qa/holds`, then read `qa/holds/contact-sheet.jpg`.

### Build once, render every format

When the storyboard lists `formats`, `render-scenes.mjs` renders each motion and logo
scene once per format from a stamped copy. The stamp sets the root `data-width`,
`data-height`, and `data-format` (`landscape`, `vertical`, `square`) and appends these
tokens after your styles:

| Token | Value |
|---|---|
| `--w`, `--h` | Canvas size in px |
| `--u` | One hundredth of the short side: 10.8px at all three sizes |
| `--safe-t`, `--safe-b`, `--safe-l`, `--safe-r` | Safe area per side, from `luckiest-video-studio-composition/references/grids-and-ratios.md`. Vertical is the strictest of TikTok, Reels, and Shorts combined: 288, 672, 119, 194 |

Write every scene so the same HTML lays out at any of the three sizes:

1. Declare the master defaults on `:root` (`--w:1920px;--h:1080px;--u:10.8px;--safe-t:54px;--safe-b:54px;--safe-l:96px;--safe-r:96px` for landscape) so the scene still previews on its own.
2. `html,body{width:var(--w);height:var(--h)}`. Never write the canvas size in px.
3. Size type, spacing, strokes, and boxes in `calc(var(--u) * n)`, never raw px. Text that would cross the safe area wraps or shrinks; it never runs into it.
4. Keep every word, logo, and CTA inside a box inset by the safe tokens: `position:absolute; inset:var(--safe-t) var(--safe-r) var(--safe-b) var(--safe-l)`, plus `margin:auto` and a fixed size to center it in the safe area. Padding on the composition root does not move clip elements, so put the insets on the clips themselves. Vertical's safe area sits high (288 top, 672 bottom), so center there, not on the frame.
5. Restack with `[data-format=vertical]` and `[data-format=square]` selectors: side-by-side rows become columns, a 12-column grid becomes 6. Never make vertical by cropping a landscape layout.
6. In vertical, set headline and body type 15 to 25% larger than landscape (`calc(var(--u) * 10)` where landscape uses 8), because the phone shows the whole frame smaller.
7. Motion distances in GSAP use the same tokens: read them once with `getComputedStyle(document.documentElement).getPropertyValue("--u")` and multiply, so a slide is the same share of the frame in every format.
8. Check each format's hold frame without rendering: `render-scenes.mjs <run-dir> --stills` writes `stills/<format>/sheet.png` per format, and `qa.mjs safe <run-dir> --stills` fails any text outside the format's safe area. Do this once the master is approved (`step-4-deliver.md`, "Other formats (last)"), not on every iteration.

`templates/logo-line-draw.html` is a worked example.

---

## Self-review checklist

Before moving to delivery, verify:

- [ ] `<output-dir>/composition-brief.md` exists.
- [ ] The brief clearly identifies the exact product moments to show.
- [ ] The composition uses the current Hyperframes workflow, not a hardcoded `luckiest-video-studio` template.
- [ ] With `formats`, every scene sizes itself with `--w`, `--h`, `--u`, and the safe tokens, and restacks under `[data-format]`; no canvas size in px.
- [ ] Music file is copied into `<output-dir>/composition/assets/music/`.
- [ ] At least one visual element subtly reacts to the music (audio-reactive treatment present), or extraction failure is documented.
- [ ] At least 1 major tween is beat-locked to a strong cue (a `strongCue`, or the highest-`strength` beat from `hyperframes beats`) within ±0.15s, marked `// beat-locked` (or natural timing was chosen for readability).
- [ ] Sequential events (cards, stats, list items) snap to consecutive `beats[]` timestamps (±0.10s), marked `// beat-grid` (or natural timing was chosen for readability).
- [ ] The composition shows at least one real UI, copy, or visual element from the project.
- [ ] Total duration is 15-25 seconds.
- [ ] Hyperframes check passes, or any blocker is documented for the user.
