# Glowing Flat Science Explainer

- id: `science-explainer`
- Source: huashu-art-motion `references/动画语法/y1_kurzgesagt.md` (MIT)
- Best for: scale and "what is inside" topics (cell to galaxy, pixel to model), systems and mechanisms drawn as glowing particles and lines, calm popular-science narration. 45-120s.
- Not for: real people, real events, archive evidence (use a collage style). Step-by-step reasoning (use a whiteboard style). Very small budgets, because the look depends on something always alive in the frame.
- Triggers: kurzgesagt, in a nutshell, flat science animation, scale zoom, immune system explainer, cell zoom, popular science, glowing vector, optimistic nihilism, zoom into
- Tone cell: calm-soft
- Clock: smooth 30/60 fps

## Look
- Dark era: deep base, 2-3 saturated accents, strong radial glow. Do not copy a purple-blue starfield gradient, it reads as generic AI. Use a flat deep ink or navy base and keep the rule: one dark base plus 2-3 high-saturation accents that contrast (orange against indigo, cyan against magenta).
- Reference accents from the source: cyan `#32BAEE`, orange `#F48301`, yellow `#FACC12`, glow core `#F9EF93`, magenta `#BE3A95`, highlight white `#F9FCFB`.
- Never mix eras in one scene. A bright light-grey low-saturation era is also valid for a "daytime" section. Changing sections can change the whole color temperature.
- Draw the concept as a concrete object (cell, gear, pipe, city, drop of water). A glowing ball with a few label capsules is not enough.
- No outlines. Shadow is a block of the same hue one step darker, highlight is a white ellipse or an arc. Two-tone facets: shadow band at about (10, 12)px bottom right, thin highlight edge (4, 5)px top left.
- Rounded everything. Glowing objects always carry a radial glow.
- Composition: main subject on the lower third line, sky above for stars and labels. Parallax layers: stars 0.05, far 0.12-0.3, near 0.65, subject 1.0, foreground blur 1.5 (7px blur, dark).
- Label capsules: large radius, saturated fill, bold sans.

## Motion
- Core easings: `cubic-bezier(.75,0,.25,1)` for most moves (soft start, fast middle, soft end), and `cubic-bezier(.333,0,.667,1)` for loops. Normal action 50 frames at 60fps (0.83s), snappy 10-30 frames, pop-ins 5-10 frames.
- Pop: card reaches 90% in 0.25s, overshoots to 108% at frame 20, settles about 0.5s. Label uses back-out with overshoot 1.1 over 0.5s.
- Stagger: similar items 10-20 frames, limbs 3-4 frames, a pause of 20 frames between actions. Title letters 45ms apart.
- Blink: closed 5 frames, open 10, irregular gaps, eyes never shrink to zero.
- Ambient layer (stars, particles, glow) can keep moving. Subject and labels hold still once settled. Cut or change state at least once per narration sentence.
- Camera: zoom is the main verb. Use log interpolation so every frame scales by the same factor. Hold 0.3s and light up the thing you will enter, then push. Pull back out for reveals.

## Signature features (judged against these)
- A concrete visual metaphor object, not a generic orb.
- Dark flat base with 2-3 glowing accents, no outlines.
- Two-tone facets on every shape, same-hue darker shadows.
- Parallax layers with depth blur in the foreground.
- Scale transitions use log zoom and redraw vectors at each scale.
- Subject is still after landing while the background stays alive.
- One state change per narration sentence.
- Labels: thin white leader line, then text typed in, about 40 characters per second, then erased after about 3s.

## Beat pattern (30-60s)
- 0-5s: world establishes with ambient motion, title letters rise.
- Every 5-7s: a new visual unit (pop a label, morph, transition). Hard cuts land 0-0.2s before a sentence starts.
- 60-75%: scale transition. Light the target for 0.3s, push in 0.45-1.4s until its color fills the screen, resolve into the new world.
- Optional gag: a mascot appears for one joke beat.
- Last 6-8s: pull back (1.45s, ease in out) to a calm wide frame, ambient motion only, hold 1s.

## Sound
Warm ambient orchestral or soft synth pad, 60-90 BPM, composed after the picture. Gentle chime on pops, deep swell on scale transitions, soft whoosh on pull-backs. Voice is calm, about 168 words per minute.

## Build it in HyperFrames
- Canvas 2D or SVG layers, each with a depth value. Position scales linearly by depth, zoom by z^depth.
- The camera is a function of time only. During a transition window the previous scene keeps drawing with its own zoom, so vectors are redrawn and never blown up as a bitmap.
- Glow is a radial gradient, not a filter. Stars use per-star phase with seeded random.
- Avoid expo-out for the scale transition because the first frame jumps most of the scale.

## Watch out
- Everything breathing and drifting at once, with a constant slow push to fill time.
- Linear zoom, or scaling a screenshot 20x.
- Bright mixed colors, black outlines, or mid-tone backgrounds drift into children's picture book style.
- The source built this over very long production times. A cheap version looks like a slide deck.
