# Variety Show Kinetic Captions

- id: `variety-show`
- Source: mg-styles-15 `prompts/18-hanazi.md` (MIT, Vincentwei1021)
- Best for: 9:16 vlogs, pet and lifestyle shorts, interview and reaction edits, comedic re-edits, caption-heavy social video
- Not for: premium calm brand films, data stories, serious tone
- Triggers: variety show, hanazi, Chinese variety captions, kinetic captions, sticker text, fancy text, reaction text, vlog captions, burst box, outlined text, TikTok captions, Douyin, bilibili
- Tone cell: kinetic-soft
- Clock: smooth 30 fps (vertical 1080x1920)

## Look
Vertical 9:16 over a footage-feel base (CC0 or public-domain photos with Ken Burns, subtle handheld shake, snap punch-in zooms on key moments). Captions in a rounded heavy font, three layers: fill color (gradient allowed), thick white stroke, colored outer stroke or drop shadow. High-saturation pink, yellow, cyan with white strokes. Hand-drawn decoration symbols: burst boxes with speed lines and radial flash, sweat drops, sparkles, question marks, stamps. Keep captions in the safe zone away from UI overlays.

## Motion
Pop scale 0 to 1.15 to 1.0 in about 8 frames. Per-character bounce with 2-frame stagger. Slight random rotation. Gentle wiggle while the caption holds. Captions appear 2-3 frames after the audio or visual moment. Emotion matching: complaint in slanted handwriting, surprise in a radial burst box, awkward with sweat drops. Punch-in zoom and handheld shake on the base layer for the "moment" feel.

## Signature features (judged against these)
- Three-layer outlined text: fill, thick white stroke, colored outer stroke or shadow.
- Pop overshoot 0 to 1.15 to 1.0 in about 8 frames.
- Per-character bounce with 2-frame stagger.
- Caption timed 2-3 frames after the sound hit.
- Hand-drawn decorations (burst box, sweat, sparkle, stamp).
- Wiggle on long holds.
- Base layer has Ken Burns, shake and punch-in zooms.

## 10-second beat seed
- 0-1s: base image punch-in plus the title caption pops.
- 1-4s: question marks bounce, aside caption in small type.
- 4-7s (hero at 60-75%): surprise caption inside a radial burst box with speed lines and flash.
- 7-9s: sparkle caption plus a stamp.
- 9-10s: final title held with wiggle.

## Sound
Bouncy variety bed (pizzicato, bass, claps) with boing, pop, ding, slide whistle, and a record scratch on the question marks.

## Build it in HyperFrames
DOM or SVG text components. Multi-layer stroke via stacked copies with SVG stroke and paint-order: stroke fill, or multiple text-shadow rings. Spring pop with a closed-form damped oscillator of (t minus start). Per-character spans with index times 2 frames of delay. Burst box and decorations are SVG paths. Base layer shake from seeded noise of t.

## Watch out
Fonts: use OFL rounded heavy fonts with full CJK coverage when needed (for example Zen Maru Gothic or a similar OFL face). Do not put captions under platform UI. Text that appears before the audio hit feels wrong. Avoid trademarked mascots.
