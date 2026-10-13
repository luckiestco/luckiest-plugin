# Product Keynote Screens

- id: `keynote-ui`
- Source: huashu-art-motion `references/动画语法/t2_keynote_ui.md` (MIT)
- Best for: product or feature launches, release notes, "three new features", pricing and spec reveals, UI walkthrough steps. 30-90s, voiceover made of nouns and numbers.
- Not for: explaining how something works (use a morphing style), data trends, bad news or serious events, topics with no product or object to enlarge.
- Triggers: apple keynote, apple event, product launch video, linear, stripe, openai launch, release video, feature announcement, glass card, ui walkthrough, screen recording explainer
- Tone cell: calm-sharp
- Clock: smooth 30/60 fps

## Look
- Start from the real thing: a screenshot, screen recording or product photo goes full frame (at least 80% of width, 90% on vertical) and is pushed in to the part being discussed. Do not crop key UI.
- Background near-black: `#050508`, or `#08090a` with text `#f7f8f8`. Take the product's own brand color for accents, not a default purple-blue.
- Text: primary `#f5f5f7`, secondary white at 60%, eyebrow `#a7a7b4` with +6px tracking.
- Type: Inter (or a similar neutral grotesque). Headings weight 600, large sizes tightened to -0.02em to -0.03em at 64px and up.
- Optional wrappers, pick two at most per video: blurred color blobs, frosted glass cards, gradient text, blur-in text, floating. All five together reads as an AI template.
- Glass card, if used: blur 40px, 7.5% white fill, 14% top light band, 1.5px gradient border, shadow blur 70-80 with y +30-40 at alpha 0.5. Radius 36px, inner radius = outer minus padding (22px). Glass needs colorful content behind it.
- Shapes: rounded rectangles, capsules, thin round-cap line icons.

## Motion
- Springs are the main tool, defined by duration and bounce. Default bounce 0, entrances 0.15 to 0.3, never above 0.4. Card entrance duration 0.75s, small bubble 0.5s.
- Non-spring curves: `cubic-bezier(.25,.1,.25,1)` for text reveals, `cubic-bezier(.4,0,.6,1)` for nav moves at 0.32s, Stripe-like `(.2,1,.2,1)` under 500ms.
- Text enters: blur 18-26px to 0, rise 16-40px, opacity 0 to 1, 0.7-1.0s. Eyebrow, name, subtitle stagger 0.2-0.4s. Do this only on some screens.
- Card entrance (no screenshot): from 170px below, rotate about 31 degrees around Y facing outward, scale 0.9 to 1, 0.1s stagger.
- Camera: still after settle. Slow push about 0.9s to the area being discussed, 0.7s to move to the next area. Fast push 0.28s only for a reveal or comparison. Number or big word slams in 0.17s (1.55 to 0.94 to 1.0).
- Count-up: 0.9s, ease-out-expo, tabular digits, counted once only.

## Signature features (judged against these)
- One idea per screen: one noun, one number, or one screenshot.
- Real screenshot or product is the hero at 80% width or more and gets zoomed to a detail.
- Large headings visibly tightened, no loose tracking at 64px+.
- Spring bounce 0 to 0.3, never wobbly.
- Numbers settle on the exact spoken moment and are counted once.
- After a settle nothing floats and nothing creeps. Next motion happens at the next noun.
- Layout changes every screen (title, screenshot zoom, big number, comparison), no title-three-cards loop.
- Accent color comes from the product, not a default blue-violet.

## Beat pattern (30-60s)
- 0-3s: product on screen first, name rises 0.2-0.3s before the voice says it.
- Next 15-25s: screenshot beats. Full-frame, push to detail on the spoken noun, glide to the next area, pull back out.
- 50-70%: hero reveal. Two timings or two screenshots compared, then the ratio slams in over the screenshot, dimmed.
- Insert one empty or quiet screen after a dense run.
- Last 3-5s: closing name or single line, hold 0.6s or more.

## Sound
Clean minimal electronic or soft piano, 90-110 BPM or no beat. Soft click on text landing, low thud on a slam, subtle whoosh on a blur push.

## Build it in HyperFrames
- CSS plus canvas. Screenshot is an image layer with a camera transform (translate and scale) driven by a keyframe table.
- Blur and spring are pure functions of t. Never read a clock. Seed any grain.
- Blur push transition: old scene scales to 0.92 with 24px blur and fades, new scene arrives from 1.06 with blur to 1.0, 0.55s. Put a 1.08x heavily blurred copy of the old scene underneath so the edges never show black.
- Shared-element expand: selected card grows from its rect to full screen with spring duration 0.55 and bounce 0. The new content is opaque on frame one.

## Watch out
- Glass over a flat dark color is just a grey rectangle.
- Springs too bouncy, or several groups moving at once.
- Floating cards and constant slow push were old habits in the source and should not be copied.
- A count that restarts from 0 after a card expands, or a second copy of the same text during the expand.
- Bright good-news mood used on serious subject matter.
