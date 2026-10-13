# Hand-Drawn Whiteboard Explainer

- id: `whiteboard`
- Source: huashu-art-motion `references/动画语法/y3_whiteboard.md` (MIT)
- Best for: arguments, cause-and-effect chains, historical threads, step-by-step reasoning with a steady voiceover. Ideas that can be drawn as a map. 45-180s.
- Not for: precise data charts, complex spatial action with depth, high-emotion stories, any claim that it improves learning (the source cites a study that found no gain, its value is attention and company).
- Triggers: rsa animate, minute physics, whiteboard animation, hand-drawn explainer, doodle video, videoscribe, doodly, sketch explainer, marker drawing, draw my life
- Tone cell: calm-soft
- Clock: smooth 30/60 fps (pen and strokes follow length, camera is smooth)

## Look
- Choose one mode and do not mix. Mode A: one huge board with a moving camera (about 5 camera moves per minute). Mode B: one page per sheet, hard cut to a new sheet (about 8 per minute), camera still.
- Mode A colors: board `#FBFBFB`, line `#0A0503`, one accent orange (text `#EB701F`, fill `#F3742D`, hatch tone about `#E9A67C`). Orange is about 22% of ink pixels and only for key words and hatching. The demo used `#EF7226` and a 22% orange wash on a cat body.
- Mode B colors: pinkish paper `#E7DBE1`, pale yellow pencil `#EDE6A2`, pale blue `#B5CBE8`, thicker lines (about 0.8% of frame height).
- Line width about 0.65% of frame height (6-7px at 1080p). Hatching about 0.3%. Title text about 5.5% of frame height.
- Plan the final full board first, then draw backwards. Each view holds 3-6 picture and text groups.
- Text: all-caps hand lettering in the source. For Chinese, a handwriting kai face. For English, a marker print face.
- Hand: right hand holding a black marker enters from the lower right, forearm angled, covering 15-25% of the frame, leaves entirely when not drawing. Keep object shapes safe (avoid shapes that read as rude silhouettes).
- Line type is fixed from the first stroke: solid = happened, dashed = planned, dotted = cross-reference. Nothing fades. Things are drawn or erased.

## Motion
- Writing speed: median 16 characters per second for body text, about 7.5 for the opening title, close to the speaking rate (about 13). Small icons 0.5-1s, a head or portrait about 2s. Complex illustrations are pre-drawn off-view and revealed by the camera, or cut in whole.
- Stroke time = length / pen speed (demo 2600 world px per second, about 2x real, which is too fast for a real piece). Min 0.04s per stroke, 0.02s lift gap. Sine in-out per stroke.
- Between strokes under 0.25s the pen slides in an arc (lift 30px). Longer gaps: hand exits 0.35s cubic-in, re-enters 0.3s before the next stroke, cubic-out.
- Characters with no stroke order reveal with 3 zigzag rows of a mask while the pen follows.
- Some accent words pop in without the hand: back-out overshoot 2.2 over 0.3s.
- Camera: sine in-out, 1.2-2.4s for a normal pan. A pan moves only about 0.23 of frame width so 75% of the previous view stays visible. For far jumps use a 0.8s whip pan (cubic in-out) with 9-sample motion blur only during that move. Ending: pull back to the whole board (0.65s sine in-out to about 0.45x), hold 0.5s.
- Timing to voice: start writing 0.2-0.8s after the phrase begins (median +0.5s), finish within 1s of the phrase ending. Never ahead of the voice, except pre-drawn setup.

## Signature features (judged against these)
- Voice leads, hand follows about 0.5s behind.
- Black line plus exactly one accent color.
- Line width around 0.65% of frame height with slight hand wobble.
- Hand enters only to draw and leaves after.
- Camera pans overlap the previous view by roughly 75%.
- Ending is a pull-back to the whole board.
- Pictures and jokes drawn, not sentences copied. Handwriting that duplicates more than half the spoken words fails.
- Same block template used at most 3 times in a row.

## Beat pattern (30-60s)
- 0-3s: title written slowly at 7.5 cps next to a first simple drawing.
- 3-35s: one block per argument. Write a line, draw an icon, add an orange keyword, repeat. Pan 1.2-2.4s to the next block. Use compare, flow, and zoom-detail blocks to vary.
- 60-75%: a far jump with a whip pan, or a big drawing revealed by the camera.
- Optional: a pop-in orange word for the punchline.
- Last 6-8s: pull back to show the whole board, hold 0.5s, voice closes.

## Sound
Mode A has no music under speech (room tone, marker scratch). Mode B has a low music bed about 9 dB under the voice. Marker squeak on strokes, soft thump on pop-ins.

## Build it in HyperFrames
- SVG or Canvas 2D on one big world canvas, with a time-driven camera. Transitions are only camera moves, so nothing on the board jumps.
- Build a stroke timeline (line, text, pop, fill, character) from lengths and speeds, then print it and compare each block's end to the camera move.
- Reveal text with a zigzag mask and use its front edge as the pen position.
- Smudge texture lives in screen space, following camera pan but not zoom.

## Watch out
- Drawing a full block before talking, or finishing after the talk ends.
- Cutting to a fresh blank screen each time, or leaving the hand on screen all the time.
- Many colors, thin uniform lines.
- Planning a new stroke timeline that runs later than the camera move (the source found one block 2.5s late).
