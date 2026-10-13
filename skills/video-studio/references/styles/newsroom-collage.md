# Evidence Desk Collage

- id: `newsroom-collage`
- Source: huashu-art-motion `references/动画语法/y2_vox.md` (MIT)
- Best for: news, history, politics and "how did this happen" explainers built on real material (clippings, screenshots, photos, maps, quotes). Journalist-style argument with evidence. 45-180s.
- Not for: pure concept or mechanism with nothing real to show (it becomes fake archive), derivations, character-driven comedy.
- Triggers: vox, johnny harris, explainer journalism, news explainer, documentary collage, paper desk, red string, highlighter, investigation board, map explainer, archive footage collage
- Tone cell: calm-sharp
- Clock: on twos (elements step at 12 fps, camera smooth 24-60 fps)

## Look
- Three-color system: near-black `#171716`, paper white `#E0DCDA` to `#EEEDED`, one red in two steps (bright `#B65255` for lines, dark `#93403C` for fills). Highlighter yellow `#DACF08` for emphasis only. Old map paper `#E4DCCF`, parchment `#CFB195`. No pure white, no pure black.
- Used in the demo: desk `#e4ddcf`, clue red `#b8433f` (slightly brighter for 1080p legibility), highlighter `rgba(218,207,8,.9)` with multiply blend, a large black card `#1b1b1a` on the desk for one shot.
- Real material is the main picture: screenshots, original text, photos fill the frame or close to it, then push to the sentence being read. A shot where material is under 60% of the frame width, more than twice in a row, is the "photo frame" layout.
- Photos are grayscale with a 45 degree halftone, white border, two semi-transparent tape pieces. Clippings have torn, yellowed edges and a serif headline. Labels are black bars with bold white text. Index cards have ruled lines.
- Paper texture is static. No per-frame grain. Shadows are weak (blur 10, offset (3, 6), alpha 0.28).
- Intentionally imperfect so it reads as editorial, not advertising.
- People can appear as cut-out stickers with a white border and shadow.

## Motion
- Two frame rates. Camera runs smooth. Elements (map color growth, red line tracing, typing, hand-drawn circles, pop-ins) step at 12 fps. Use `step(t - at, 12)` so the first frame is exactly at the cue.
- Camera easing from 13 measured moves: median 1.29s, range 0.71-1.96s, none linear. Seven are symmetric sine in-out for long hops, six are fast-start long-tail near `cubic-bezier(.33,0,.2,1)` for reveals and tracking.
- Defaults: push 0.6-1.5s, pull-out about 1s, follow a clue 1.3-1.8s, find next card 0.5-0.9s, fast push 0.28s only for a reveal.
- Archive photos and clippings appear on the cut, no bounce. Only when following a timeline does the next card slide in from off-screen with a 5-15 degree tilt, flatten, about 0.8s.
- Pen work: red underline 0.5-1s, red oval about 1s in one stroke (not closed, slightly crossing), highlighter 1.5-3s per line following the spoken words, typing about 13 characters per second.
- When the camera is parked and a card has internal animation, the camera holds. Static cards use a push to the line being read, not a slow drift.

## Signature features (judged against these)
- Real material fills the frame and is pushed in to the exact sentence.
- Black, paper white, one red, plus a muted highlighter, no big yellow fields.
- Camera glides while elements step at 12 fps.
- No tear-off paper transition and no per-frame grain.
- Reveal actions rotate (cut-in, push, glide, highlighter, red line, stamp), never the same sequence more than 3 times.
- Text to read is on the topmost layer and drawn last.
- Highlighter timing follows the speaker, not the music.
- The same event is acted out only once. After a zoom, it is not replayed.

## Beat pattern (30-60s)
- 0-4s: the source document or photo is on screen, camera framed on the claim.
- 4-20s: slow tier holds each card 3-7s using internal motion (highlighter, typed label, red circle). Fast tier (1.4-1.8s) is image cuts only.
- 50-70%: follow a red string from the key line to a second piece of evidence. The camera chases for 1.1-1.8s with short motion blur.
- Then a push into the photo and a hard cut to the sharper scan of the same image.
- Last 6-8s: pull out to the whole desk (0.85s long tail), then a closing line typed on black, hold 1s.

## Sound
Understated documentary bed, minimal pulse, change music about every 20s. Paper slide, marker squeak, soft typewriter ticks. Voice is the lead.

## Build it in HyperFrames
- Canvas 2D or SVG. Cache each paper, photo and clipping as a sprite. Seeded paper texture tiles seamlessly (sample on a torus) with fibers.
- Halftone: convert grayscale to a 45 degree dot grid as one path. Torn edges via noise.
- Hand-drawn lines: resample and add low-frequency noise, reveal by length.
- Camera framing: compute the rect that contains the target plus margin. Do not hand-type coordinates. Push no further than keeps the red circle in frame.
- Short motion blur on fast moves by stacking 7 samples along the velocity vector.

## Watch out
- Everything moving smooth at 60 fps looks like a corporate film. Everything at 12 fps makes the camera dizzy.
- Template-style tricks (tear-off transitions, every image bouncing in, jittering paper) are not part of this look.
- Cards stacked so two labels read together as a false sentence ("exceeded" beside "acquired"). Read the visible text in order.
- A photo, clip or later card covering the text that is being read.
- The source marks a highlighter that starts outside the visible frame. Move the camera first.
