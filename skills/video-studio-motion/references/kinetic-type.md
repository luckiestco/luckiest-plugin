# Kinetic type

Numbers for words on screen, measured on professional films at 30fps. Ideas and
values from Tejas Makwana's `motionmaxxing` (Apache-2.0), restated for HyperFrames
and GSAP. See `../ATTRIBUTION.md`.

## Words arrive at speech rhythm

Animate whole words, not letters. Gap between word onsets:

| Pace | Gap |
|---|---|
| Fast hook | 2-4 frames |
| Headline | 4-6 frames |
| Voice-led line | 8-12 frames |

- The stinger (the last, most important word) waits 1.5 to 2x the normal gap.
- Vary each gap by up to 40% so it does not tick like a metronome.
- Each word rises 3 to 7% of the frame height, with most of its travel in the
  first 5 frames (`expo.out`).
- An accent colour on a word lasts 0.13 to 0.28 seconds, then decays to the ink
  colour. One accent word per line at most.

```js
// gaps in frames at 30fps; pick the row for the pace
const gaps = [4, 5, 4, 8]; // last gap is the stinger
let t = 0;
words.forEach((w, i) => {
  tl.from(w, { yPercent: 60, autoAlpha: 0, duration: 0.33, ease: "expo.out" }, t);
  t += (gaps[i] ?? 5) / 30;
});
```

## Reading holds

| Text | Hold after it lands |
|---|---|
| Any text | 0.45 s minimum |
| Per word | about 0.2 s |
| 6 to 8 words | 1.7 to 2.0 s |
| A number | 0.5 to 1.2 s |
| About 20 characters | 1.2 s |

The studio's readability law (about 0.3 s per word for a sentence) is the safe
ceiling for narration-free videos; these are the floor. Never cut a line before
its floor.

## On-screen words and the voice

- Words land 0 to 2 frames before they are heard (up to 5 frames for names).
- At most about 7 words on screen at once. Claims are 2 to 6 words.

## Typing

Type only into the product's own input field. A headline is never typed letter
by letter with a caret: it reads as a template.

- 14 to 30 characters per second when the viewer must read it, bursts of 70 to 85
  otherwise.
- Pause 6 to 10 frames after a space or a comma.
- The caret appears 1 frame before the first letter and stays solid (no blink)
  while typing.
- Use a real query or prompt from the product, 20 to 70 characters.

## Counters

- Step once per frame, 15 to 23 steps over 0.5 to 0.9 seconds, decelerating.
- Land on a round value for a claim ("2x"), an un-round value for data
  ("1,284"). The number must be real (the `facts` gate).
- Spend the hero number once per film, at 22 to 29% of the frame height.

## Sizes and weights

| Role | Size (share of frame height) |
|---|---|
| Headline | 7-11% (9% typical) |
| Supporting line | 5-7% |
| Hero number | 22-29%, once per film |
| Readable floor | 4% (under 2% reads as texture) |

- Weights 400 to 550. 600 only on a wordmark.
- Track display sizes tight, -1.5% to -5.5%. Sentence case.
- Use the brand's own face, a serif if the brand uses one.
- Most type is small. Scale is spent once; the ending usually gets smaller.

At 1080p these map onto the studio's type tokens (22, 30, 42, 60, 84px, checked
by `qa.mjs tokens`): headline 84px (7.8%), supporting 60px (5.6%), readable floor
42px (3.9%). A hero number is off the default scale: add its one size to the run's
tokens file and pass it with `qa.mjs tokens --tokens <file>`.
