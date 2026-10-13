# Cartoon Presenter Explainer

- id: `presenter-explainer`
- Source: huashu-art-motion `references/动画语法/y6_presenter_explainer.md` (MIT)
- Best for: business history, product mechanics and finance or tech knowledge pieces where a cartoon host walks between paper, charts and keywords and reacts emotionally. 60-180s.
- Not for: anything without character art you can generate or supply. The source ships no character sprites and no ready-made parameterized clip, so it is a grammar and a reference approach only, not a turnkey template.
- Triggers: presenter explainer, cartoon host, character explainer, business history video, finance explainer with mascot, spacex explainer, character walks across the chart, talking head cartoon, narrated cartoon guide
- Tone cell: kinetic-soft
- Clock: on twos (character frames swap, scene camera smooth)

## Look
- A cartoon presenter built from AI-generated frames stands in a scene made of paper, charts and keywords. Code controls foot anchor, position, scale and frame swaps.
- The source gives no palette or fonts. Suggested defaults, adjust to brief: warm paper base `#F4EFE6`, ink `#1B1B1F`, one brand accent, one chart color used for the hero data. Keep chart and keyword layers quieter than the presenter.
- Generate at least two framing sets: full body and bust. Sitting and leaning poses need their own real frames. Do not enlarge a full-body frame for a reaction close-up.
- Layout is assigned in the storyboard, not fixed. Rotate between: presenter at the side explaining, full-screen number, left-right compare, presenter stepping into the chart, reaction close-up. Do not fix "person left, chart right" for the whole film.
- A top bar with the year or section, the subtitles and the segment title all read from the same clock.

## Motion
- Pose changes are hard cuts with a slight pop-in, so different silhouettes never cross-dissolve into a ghost double.
- Mouth frames switch with the voice and stop in pauses. Walking uses full gait frames, not a slide.
- Normalize pose heights to the median height. The first cast keyframe of each segment states `x` and `s` explicitly so nothing inherits from the previous segment.
- Numbers settle on the spoken moment. While counting, do not show assertions like "over" or "+" early. The emphasis circle appears after the number settles.
- Nested transparency uses multiply (`*=`) so an outer fade survives.
- Transition between pages flips only the page. Presenter and top bar continue across pages.
- Camera: use a scene camera for pushes. Whole-frame bitmap zoom crops the character and was a known problem in the reference code.

## Signature features (judged against these)
- Presenter moves between paper, chart and keyword layers instead of sitting in a corner.
- At least four different layouts in the film, no fixed left-right composition.
- Full-body and bust frames used for the right shot sizes.
- Pose swaps are hard cuts with a small pop, no dissolves between poses.
- Mouth movement tied to the voice and silent during pauses.
- Feet stay on a fixed anchor across frame swaps.
- Number lands on the spoken digit, circle added afterward.
- Year bar, subtitles and segment title share one time source.

## Beat pattern (30-60s)
- 0-5s: presenter enters at the side with a hook line, full-body frame.
- 5-25s: alternate presenter-explaining and full-screen paper or chart beats. Keywords appear as the voice says them.
- 60-75%: the key figure fills the screen, then the presenter steps in or reacts on a bust close-up. Leave a pause for the beat, written into the script and the voiceover.
- Last 5-8s: presenter returns to the side with the takeaway, hold 1s with a small idle.
- Aim for a layout change every 5-8s.

## Sound
Light upbeat bed, 90-110 BPM, ducked under the voice. Soft pops on keyword entrances, page-turn sound on page flips, a short stinger on the reaction shot.

## Build it in HyperFrames
- Canvas 2D or HTML layers. Write a `presenterFrame(pose, t)` function that picks a frame from an image set and a `drawFigure` that places it by foot anchor.
- Cut frames from a sheet with a script that computes the foot anchor per frame.
- Page flip is the only transition. The HUD and presenter layers draw above it from the global clock.
- Run the project's text-in-frame QA from the first draft. For light backgrounds without subtitles, also run a subtitle-zone check.

## Watch out
- Presenter covering text, or being cropped by a push-in. Check by eye.
- Reusing the same left-person right-chart composition across the film.
- Pose frames that do not match (sitting needs real sitting art).
- Using this card as a full template. Art and voice must be supplied and the source says so.
