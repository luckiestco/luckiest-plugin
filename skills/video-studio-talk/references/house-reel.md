# House reel style (9:16 talking head)

The default for a short talking-head reel when the user gives no style. The
user's brief wins on every line. The numbers are starting points measured on
reels that held attention, not law. Where this file and `short-form.md` disagree,
this file wins for reels built in this style.

## Pacing

- Speech starts within 0.1 s. The file ends right after the last word. No intro
  or outro card.
- No dead air: pauses between phrases stay under about 0.2 s. Natural beats after
  a comma or a list marker ("First,") run 0.2 to 0.4 s and stay. Tightness comes
  from removing dead air between phrases, never from speeding the voice up.
- Shots average 1.1 to 1.4 s, none over about 2.8 s. The first cut lands at 0.6
  to 1.0 s, on the first charged word.
- Each item in a spoken list gets its own shot.

## Layouts (1080x1920, every change is a hard cut)

| Layout | What | Share of the reel |
|---|---|---|
| Split | B-roll on top (y 0 to 880), speaker below | 30 to 42% |
| Full B-roll | Footage fills the frame | 50 to 55% |
| Punch-in | Tight shot of the speaker for pivots, emphasis, and the CTA | 5 to 15% |

The speaker is on screen about 45% of the time and never gone for more than about
3.5 s. The first frame is a split with the topic's tool or brand on top.

## Story

1. Hook in the first 3 s: a claim or command that names the tool or person.
2. One line of credibility or context.
3. If there is a list, show every item early, blurred, as an open loop.
4. Each item: a section card, a one-line definition, two or three literal
   visuals, a punch-in on the key line.
5. A resolution that calls back to the hook visual.
6. CTA: show the resource first, then a punch-in with the comment keyword. Never
   assemble a CTA the speaker did not say.

A raw recording caps the edit: a clip with no hook and no CTA stays weak however
well it is cut. If the user can still record, suggest scripting the hook first.

## B-roll: every shot moves

Video beats images. Preference order:

1. Real footage of the thing named: the product's demo, the person's talk, the
   user's own long-form video.
2. A real screen recording, zoomed into the part being talked about, with a
   visible cursor.
3. An animated UI mock (typing, rows ticking, a counter climbing), labeled as an
   example.
4. AI video the user supplies. Concrete metaphors work; generic "person at a
   computer" reads as stock. Use only the first continuous seconds (models often
   cut to a new angle near 2.5 to 3 s) and keep screens small, since generated
   text turns to gibberish. Consecutive shots of one person must match.
5. Highlight crops of a real page under 1 s, on tool names, prices, badges.

Every shot gets a slow push-in. An AI still image used as B-roll is a build
error; a still is only a first frame for AI video. A whole web page shrunk to
phone size is unreadable: crop to the phrase and highlight it on the spoken word.
Small UI floating in empty space is the fastest tell of an AI edit; zoom UI until
it fills its panel. Never click "Accept" on cookie or terms dialogs while
capturing. Never invent numbers or results to decorate a claim.

## Captions

- 1 to 3 words per chunk, split on phrase boundaries. They hard-swap with no pop
  animation and appear 2 frames before the first word.
- The display face from `brand.json`, heavy weight, all caps, about 62 to 64 px.
  An accent face on 5 to 20% of chunks for soft words, never two in a row.
- Color on 25 to 45% of chunks, whole chunk only: a warning color for the wrong
  way or a loss, the accent for the concept, a positive color for the payoff.
- One look for the whole reel: every caption in the same dark box with a thin
  light edge, so it reads on black, white, and footage alike. Mixing boxed and
  bare captions looks cheap. Never white on light.
- Position: on the seam in a split, on the shirt in a punch-in, and in a clear
  zone on shots full of text to read. Captions never blink out on those shots;
  they move.
- Never over the mouth or chin, least of all in the first second. A caption that
  runs across a cut moves to the new shot's spot on the cut frame.

## Music and sound

- Music by mood: a darker, confident beat for claims and news, a chill groove for
  methods. The bed sits about 11 dB under the voice (9 to 14 dB), ducks under
  speech, and is often quieter for the first 1 to 2 s.
- Sound effects follow visible actions, not every cut: a soft air whoosh on a real
  spatial move, a damped tap when a logo lands, a dry click for small UI, paper
  for documents, one short warm tone for a check, a dry stop for an X. No laser
  zaps, pitch-drop plops, sci-fi chirps, or a whoosh on every cut.
- Vary the files for repeated items so a list does not sound like a loop.
- Master near -14 LUFS, true peak at or below -1.5 dBTP, measured on the encoded
  stereo file (a mono file reads 3 dB lower). Never fade the last spoken word.

## Variants

**Raw reel (lighter):** no B-roll, no music. Cut retakes, stutters, and dead air
only, keeping the last clean take. One word on screen at a time, small, lower
middle, synced to the exact word. When the speaker points while naming a tool,
pop its real logo where they point with a quiet tap.

**Short from a long-form video:** screen recording on top, face cam below,
word-highlight captions on the seam. The value or claim in the first 3 s, then
proofs in the long-form's order, ending on a complete takeaway. Every number on
screen must be explainable from what the Short showed. Name things before using
them. Keep labels below the top 130 px.

## Notes become rules

When the user gives a note on a draft ("I can't read that caption"), fix the
edit, then offer to write the note into this file or the relevant skill as a
rule, a check, or a script change, so the next edit starts from it.
