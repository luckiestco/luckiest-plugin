# Storytime Character Cuts

- id: `storytime`
- Source: huashu-art-motion `references/动画语法/y4_storytime.md` (MIT)
- Best for: first-person stories, fails, "the first time I..." anecdotes with a setup, a pause and a punchline. A recurring cartoon avatar carries the voiceover. 60-600s, weekly cadence.
- Not for: dense tutorials or data (viewers watch the character and forget numbers), content with no "I" and no stance, voiceover that is not funny or has no pauses.
- Triggers: theodd1sout, jaiden animations, domics, storytime animation, story time, youtube storytime, cartoon avatar, stick figure story, reaction face, smash cut joke, animated anecdote
- Tone cell: kinetic-soft
- Clock: on twos (character at 24 fps stepping, 12 mouth changes per second, camera smooth)

## Look
- Medium shot (waist up, head 25-35% of frame height), character centered or to one side, the other side holds the thing being talked about (computer, person, object).
- Background says only where: 3-5 big flat shapes, or plain white or color. It is always lighter, less saturated, with thinner lines than the character.
- Reaction shot: remove the room, face fills the frame (head radius about one third of frame height), solid cool void with vignette.
- Gag shot often flips to a very wide shot where the character is tiny.
- Palette (demo): skin `#FFE2CC`, white hat and shirt `#FFFFFF` with band `#E4E4E8`, shorts `#CDBB97`, character line `#1B1B1F`, wall `#DCE9EC`, table `#E2C29B`, floor `#E8DCC8`, background line `#5B6470` at 3px, void `#3D405B`, mouth `#6E2430`, tongue `#F07B7B`, blush `rgba(255,140,120,.35)`.
- Character line = head radius x 0.05 (min 4px), so 8px at medium, 12px at close, 6px wide. Character line is at least 2x background line.
- Shapes: all round and blunt. Head slightly flat circle, bean body, head about 58% of height, tube arms with no elbows or fingers, circle hands. Eyes are dots inside glasses, expression comes mostly from eyebrows. Mouth set: smile, flat, wave, half, full.
- The source says code-drawn characters read as AI. Use your own character frame library (generated frames per pose) when the final matters.

## Motion
- Pose-to-pose. Switch pose in 0.1s (expo-out, 2-3 frames at 24 fps), then hold. Body squashes 7% on the switch with a spring settle (about 0.35s).
- Seventy percent of frames in a real example are exactly still. Hold lengths median 0.40s, moves median 100ms. A second reference runs on twos continuously at 12 drawings per second with longer shots (average 5.7s versus 2.4s). Pick one rhythm.
- Mouth follows the voice envelope, changed at most every 1/12 s into 3 shapes (closed under 0.06, half under 0.22, open above).
- Small life: breathing +-1.2% on a 1.6s cycle, blink every 2.4-3.6s (closed 2 frames), eyes shift 0.09R toward what is mentioned, head dips 0.015R per mouth step.
- Props and symbols are the things that pop: back-out with 15-30% overshoot. The question mark pops in 0.26s at 30% overshoot. A big number slams with 23% overshoot.
- Transitions: hard cut (default), smash cut to reaction (starts at 1.22x, springs to 1, 55% white flash for 2 frames, low thump), whip pan toward what he looks at (0.26s expo in-out with 16-sample blur), jump-in to about 2x on the same set, over-the-shoulder shot with a foreground head and a cool rim light on the screen side.

## Signature features (judged against these)
- One sentence is about one shot, cut on the breath between sentences.
- Pose switch about 0.1s then a real hold. No constant floating.
- Reaction shot sits in a silence of 0.8-1.5s after the outrageous line.
- Background is calmer than the character (lighter, thinner line).
- Character line is thicker than background line by 2x or more.
- Mouth changes at most 12 times per second.
- After the punchline the picture holds at least 0.9s, with the sound tail finishing.
- Only on-screen text and key numbers are shown, usually no burned subtitles for the native platform.

## Beat pattern (30-60s)
- 0-2s: character is already in place and talking from the first frame, medium shot.
- 2-4.5s: whip pan or cut to the thing he sees, number slams in on the spoken syllable with a thump and 9 Hz shake for 0.3s.
- Next: smash cut to the reaction close-up, 1.3s silence with one tiny detail (sweat bead, slow blink, eyebrow drop).
- 60-75%: hard cut to a wide shot for the contrast gag, then jump-in to 1.9x on the punchline.
- Last 1.5s: shrug or question mark pops, then hold at least 0.9s.
- A 60s piece repeats this 3-5 times. Average shot in the demo was 1.75s.

## Sound
Voiceover first, music sparse or none. Effect set: whoosh on pans, keyboard clicks, low "dun" on smash cut, thump on numbers, crickets in the silence, small pip and boing on symbols.

## Build it in HyperFrames
- Draw the room once as a large world canvas (static parts cached) and change only the camera between wide, medium and close shots, so cuts match. World must be larger than the farthest camera move or black edges appear.
- Quantize character animation with `step(t, 24)`, mouth with `step(t, 12)`. Camera stays at full frame rate.
- Export the voice RMS envelope as a 60 fps array and read it in the render, so changing the voice track updates the mouth.
- Smash zoom must clamp at 1 or above to avoid exposing the edge.

## Watch out
- Animating everything. The style lives in cut and hold.
- Detailed backgrounds that pull the eye off the face.
- Moving on to the next sentence immediately after the joke.
- A whip pan that cuts mid-sentence. Cut and subtitle change happen on the same frame in the gap.
