# Long form (16:9)

Two tools: overlay beats on top of the speaker, and, for explainers where the
subject is a system or a process, one persistent visual world the camera moves
through.

## Overlay beats

Every beat answers one of: what should the viewer remember, what idea needs
structure, what number or turn deserves emphasis, or where is attention drifting.
Do not fill a gap just because it exists.

**Lower-third card** (speaker stays visible): topic labels, a small list, an
equation-style model, "what this means". One headline plus a short subline, or 2
to 4 items. Keep it in the lower third, clear of the face, about 70 percent of the
frame width. One card lives across the whole topic (12 to 45 s) and builds items
as the speaker reaches them. Never a five-second flash while the topic runs on for
thirty.

**Full-frame takeover** (speaker hidden): the thesis, a section change, a big
number, a short quote. 4 to 12 s, sparse type, the accent color only on the number
or one word. Punctuation, not the default.

**Pacing:** early on, no more than 20 to 30 s without a beat; in the body, no more
than 30 to 45 s. If the user shortened a beat, respect it and follow it with a new
short card instead of restoring it.

**Timing:** start 0.2 to 0.6 s before the anchor phrase, hold until the topic
hands off, clear 0.1 to 0.5 s before the next beat. Sub-elements enter on their own
spoken nouns, never on an even stagger.

**Copy:** readable in under a second. Short noun phrases, one model per card,
numbers only when they matter.

## One persistent world

For a script about a system, a process, a comparison, or a list, build one space
that never resets. What the viewer has seen stays where they left it; new material
is added, never redrawn or relabelled.

- **Spatial grammar.** Decide what directions mean (for example: left to right is
  toward the outcome, up is toward a person) and hold it. Break it once, on
  purpose, for meaning.
- **The camera is the edit.** Three altitudes: world (orient, payoff), region (most
  of the runtime), detail (one number or decision). Move between neighbors; jump
  detail to world only as a payoff. Name framings as exact windows whose edges fall
  between labels, and reuse the same window for the same purpose. Duration grows
  with distance travelled.
- **One spotlight.** Exactly one element at full brightness. Drawn context stays
  quiet but legible (roughly luma 120 to 150 against 200 to 235 for the active
  element; no label below 90). A finished prop retires to zero, not to 0.3. A
  label always takes its element's state. One tween owns an element's opacity at a
  time, or it strobes when sections are joined.
- **Open loops are spatial.** Plant something visibly incomplete in the hook,
  re-show it at every section boundary, advance it visibly, close on the opening
  image. Shape it from the script: parallel items become empty slots, a process
  becomes a pipeline with a missing link, tiers become a stack with a ghost top, a
  comparison becomes an unfilled scorecard. A counter carries a one or two word
  name, not only a number.
- **One travelling subject** whose state changes (rows fill, a bar moves) and
  moves only along drawn connectors, never teleporting.

## Discipline

- If it does not get a word, it does not get drawn. About 20 on-screen words per
  section, labels of one or two words.
- One token set for the whole video: four stroke weights, five type sizes, three
  corner radii, five colors with fixed meanings. Take them from
  `luckiest-video-studio/references/brand.md` and never add a near-duplicate. The
  `qa.mjs tokens` gate fails the build on any value outside the set.
- Entrances ease out (`cubic-bezier(0.16,1,0.3,1)`), exits are faster, and bigger
  things move slower. A bounce ease at most once per section.
- No cross-fades on full-frame layers. They enter and exit by clip over an opaque
  background. A camera move and a wipe run one after the other, or merge into one
  gesture with a shared ease; never two moves back to back on the same subject.
- Nothing within 60 px of the frame edge.
- Namespace SVG `defs` ids per scene; a shared `url(#id)` paints nothing once the
  scene that defined it is gone.

## Order of work

1. Lock the cut and transcript.
2. Write down the world, its grammar, the travelling subject, and the open loop.
3. Build one section end to end, render it, and review it muted at 960x540 for
   ornament and legibility. Fix the system, not the section.
4. Build the rest against the proven section, render all scenes, and review the
   joined `final.mp4`, not the section drafts: most defects only exist after the
   join.

Aim for the speaker on screen roughly 40 percent of a graphics-led video. Long
absences are fine at payoff beats that need the full frame.
