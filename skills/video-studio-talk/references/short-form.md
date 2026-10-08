# Short form (9:16)

## The first test

"In the first three seconds, is someone convinced they need to watch until the
end?" Everything else comes after this. Answer it with evidence, not a score:
the specific benefit, the open question, what is visible by second three, and the
scene where it pays off.

- The first frame already means something: a surprising action, a result glimpse,
  a contradiction, or a real expression. No logo bumper, no added silence.
- It works muted. Topic or tension is readable at once, and a second meaningful
  state appears before three seconds.
- An impact sound lands within two frames of its visual and never masks the first
  spoken word.
- Draft three different openings (problem first, result first, recognition first)
  from the same speech. Render the first three seconds of each cheaply, compare,
  and record why one won. Loudest is not a reason.

## Open loops

Save `talk/OPEN-LOOPS.json`, one entry per question:

```json
[{ "id": "main", "question": "What fills the three empty slots?",
   "object": "three numbered empty slots", "setup": 2.3,
   "updates": [{ "time": 5.1, "state": "first slot filled" }],
   "closure": 38.4, "resolution": "all three slots filled",
   "supportingSpeech": "exact words from the transcript" }]
```

One main loop, at most one secondary loop open at a time. Something visibly
incomplete, a visible change toward complete, and closure before the call to
action. A recurring object that resolves nothing is decoration, not a loop.

## Rhythm

- Sequences breathe: a burst of discoveries, a short anticipation, a payoff, a
  moment of stillness for conviction. One to two seconds per visual event is a
  diagnostic, not a metronome.
- Every extended beat is an action with an outcome: a card opens to a result,
  criteria turn into checks, a stack assembles. No settle-and-freeze title cards.
- Narration and captions carry the words. Graphics show the example, relation, or
  result. Cut a third restatement of the same sentence.
- Compare adjacent shots with headings hidden. If they are the same reveal with
  different words, redesign the weaker one.

## Layout

- Safe area for 1080x1920: x 90 to 930, y 200 to 1600. The right edge and bottom
  belong to the platform UI.
- Captions in short phrase groups at exact word onsets, placed around the face in
  each layout. Keep the speaker's wording.
- Show the whole action and its result. A tighter crop that hides the context is
  worse than the full frame.

## Footage and sound

- Each B-roll scene is used once per reel. A new crop, speed, or grade is the same
  scene. Log it in `talk/assets/footage-ledger.json` (see plan-schema.md).
- A still with a camera move is a photo layer, not moving footage.
- Real people: use a verified photo when recognition matters; never a generated
  likeness presented as real.
- Voice first. Music starts 14 to 20 dB under the voice, ducks under speech, and
  the final mix lands near -16 LUFS and at most -1 dBTP. If the user says the music
  is too loud, lower the music relative to the voice, not the master.
- Sound effects follow the visual event map (contact, swipe, check), onset aligned
  to the landing, varied in level. Let some cuts pass quietly. Use the CC0 kit in
  `luckiest-video-studio/assets/sfx/`.

## Before delivery

Write `talk/ENTERTAINMENT-REVIEW.md`: timestamps where attention would drop,
predictable stretches, unresolved promises, reading overload, and what changed.
Never report a retention number or call internal comparisons an audience test.
Deliver every requested ratio, each framed and checked on its own.
