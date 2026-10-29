# Beat-Locked Kinetic Type

- id: `kinetic-type`
- Source: huashu-art-motion `references/动画语法/y5_kinetic_type.md` (MIT)
- Best for: list openers ("3 stages", "5 reasons"), chapter cards, quotes, one-number-per-shot reveals, intros and conclusions where the structure is the message. 15-45s of type per segment, mixed with evidence shots in longer films.
- Not for: stories and emotion (no face to relate to), long explanatory voiceover on a screen of words, lists over 5 items, anything that is all type for more than 30-60s.
- Triggers: kinetic typography, lyric video, text animation, saul bass, typographic video, animated quote, title sequence, big word slam, text reveal, after effects type
- Tone cell: kinetic-sharp
- Clock: smooth 30/60 fps, with all landings on a beat grid (for example 120 BPM)

## Look
- One main word per screen, left-aligned in the left third to half (or mirrored), helper line right under it, a small label top left with a progress track, and an evidence object on the other side (code card, chat bubble, checklist). At least 130px margin.
- Type scale about 3.4 : 1 : 0.4. Demo: main word 340px (heavy black weight), helper line 96px (heavy), label 40px (bold, 6px tracking). The main word is two words or four characters at most so it reads in 0.3s. Helper line 14 characters or fewer.
- Each chapter has its own full-screen background color, so color is the chapter number. Demo set: yellow `#FFD23F`, coral `#FF5A36`, navy `#14213D`, off-white `#F4EFE6`, plus ink `#111111` and white. One accent per screen (for example coral circle, yellow highlighter, blue bubble `#3A86FF`, green check `#2BB673`).
- Shapes: rounded rectangles (card r=26, bubble r=30, keycap r=22), circles for numbers, slanted highlighter blocks (slope 0.18). Dot grid background at 64px spacing, 6-10% opacity. No outlined or shadowed type. Only soft card shadows (8-18%).
- Giant stage numeral at 900px, 5-13% opacity, bottom right behind everything.

## Motion
- Main word slam: scale 1.7 to 1, opacity 0 to 1 in the first 0.06s, under-damped spring `1 - e^(-10t) cos(2 pi 2.2 t)`, about 8% overshoot, settles in 0.35s. Title first word also rotates -8 to 0 degrees.
- Helper line and label rise from a mask under the baseline: from +1.2 text height to 0, expo-out, 0.30-0.35s.
- Icons, numbers, bubbles, keycaps pop with back-out s=2.6-3.0 (17-20% overshoot), 0.30-0.42s.
- Cards slide in from 700px sideways or 260px below, 3.4 degree rotation to zero, expo-out 0.40s.
- Typing 26 characters per second with a 2 Hz cursor. Code completion shows grey text instantly, then turns solid on the Tab press (keycap squash 14%).
- Highlighter wipes left to right in expo-out 0.30s, 1-3 eighth notes after the word lands. Key word scales to 1.35 on the emphasis beat and stays.
- Exit faster than entry: expo-in 0.18s, stagger 0.03s, shrink to 0.6, drop 60px, fade.
- Stagger words by one eighth note (0.25s at 120 BPM).
- Continuous layer is only camera drift (5px sine, 7s and 2.7s periods, +-0.5 degrees), a beat pulse (1.2% scale on each quarter, decay e^(-25t) about 0.12s), and the dot grid sliding 36px/s. Words never drift or breathe after they land.

## Signature features (judged against these)
- Main word at least 3:1 against the helper line, one thing entering at a time.
- Chapter color changes per screen and one accent color on it.
- Main word slams on a strong beat, small items on eighths.
- Entry slower than exit, exit under 0.2s.
- After landing the type is still. Motion lives in camera, beat pulse and background.
- Every landing is on a beat number or a spoken word. Picture early, never late (at most 1 frame ahead of voice).
- Never more than 3 same-layout pages in a row, evidence object or number slam breaks them.
- Transition reveal frame lands on the bar line.

## Beat pattern (30-60s)
- Use one bar per screen. Per bar: beat 1 main word slams (plus giant numeral), beat 1.5 evidence object, beat 2 helper line rises, beat 3 evidence action, beat 3.5 key word grows with highlighter, beat 4 rest or exit.
- 120 BPM gives 2s per bar. A 4-bar demo is 8.5s, a 30-60s piece uses 15-30 bars and groups them into chapters.
- Open with a number slam or a title. Hero moment at 60-75% is the final chapter or a zoom-through transition. Finish with a last-beat hit and hold 0.5s.
- Hold time: main word of 2 characters at least 0.5s, helper line of 7-8 characters at least 1.0s.

## Sound
Beat-driven: kick every beat, clap on 2 and 4, hat on offbeats, bass root note per bar at 105-128 BPM (demo 120). Boom on a main word, pop on small items, click on typing, rising pop on checks, riser 0.3s before each transition.

## Build it in HyperFrames
- Canvas 2D or CSS. Define `beat(n)` and write every cue in beats, not seconds. Segment start = bar line minus reveal point x transition length.
- Transitions: zoom into a shape (first 55% expo-in to 30x, last 45% expo-out, the shape color becomes the next background), three slanted color bands sweeping with 12% stagger (0.5s), and push (0.35s expo in-out, count its "arrival" at about 90% displacement, p near 0.58, not at p=1).
- Progress track is drawn from the global timeline as a fixed overlay, not inside each page.

## Watch out
- All text the same size and moving together.
- Type that keeps drifting while being read.
- Animation that lands off the beat grid, or aimed at the transition's first frame instead of the reveal frame. Each stray landing loosens the whole piece.
- Dense four-pages-in-a-row of the same layout becomes a slideshow.
- Real lyric videos land about once per beat. Eighth-note density works for a short opener only. For word-synced lyrics, follow the lyric video section of [audio.md](../audio.md).
