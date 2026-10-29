# Broadcast News Package

- id: `news-package`
- Source: Lemo-Opuscar `styles/news-package/STYLE.md` (MIT, lemomo-ai)
- Best for: weekly or daily round-ups, market and launch recaps, brand "news of the week" bulletins. 45-120s, 16:9.
- Not for: an argument built on real clippings, photos and maps (that is `newsroom-collage`, a hand-placed paper desk, where this is flat graphics in a fixed bulletin order). Not for one chart per beat (`finance-chart`), slammed captions, or a studio set with an anchor on camera.
- Triggers: news, news bulletin, broadcast, breaking news, headline, lower third, news ticker, rundown, market close, weekly roundup, news desk, tv news, split-flap, news graphics, BBC, CNN, Bloomberg, CNBC, Sky News
- Tone cell: calm-sharp
- Clock: 30 fps, every cut and wipe on a beat of a 120 BPM grid

## Look
A package system, not a drawing style. Every graphic is built from the same few parts so the viewer reads the system before the words: a brand plate (a slanted parallelogram), an accent tab, a paper strap, dark cards with an accent top edge, mono datelines, stamps. Clean frame: no crawl, no burned-in subtitles. Colors as roles: ground = near-black ink, ink-on-accent text, one accent, one muted metal secondary (for thresholds, datelines, source lines), paper for the strap and documents, and one reserved alarm color used only for BREAKING or LIVE. Map to the brand: brand dark as ground, brand accent as accent. Example palette (example only): ground `#121417`, accent `#F2CF1D`, secondary `#D4B064`, paper `#F4F1E8`, alarm `#FE6B3D`. Type is small and orderly: a condensed bold face for numbers and names, a tracked mono caps face for datelines and sources, labels on one line. Photos, if any, share one duotone grade and are tagged as illustration.

## Motion
Everything lands on the beat grid. The sting slams the plate in (small overshoot, impact ring, short shake), then the plate flies to the top corner and stays as the channel bug. Between stories a vertical accent band wipes across in about 0.3s. Inside a story, hard cuts only. The strap changes words with a vertical flip. Something happens every 0.5 to 1s (flip, count, stamp, tick, line step). Stamps land large to small in about 0.16s with an expanding ring, one per story at most. No dissolves, page turns, 3D flips or fly-throughs.

## Signature features (judged against these)
- A sting whose plate becomes the corner channel bug, so opening and programme are one object.
- A rundown of the stories that opens the bulletin and returns at the end with each row ticked off.
- A lower-third strap that never exits mid-programme: new words flip in, the category tab flashes on a change.
- One fact per full-frame graphic (a price, a break, a place, a quote, a verdict), each dated in a mono eyebrow with its source.
- At least one data move with a before and after on one object (split-flap board, line stepping toward a dashed threshold, proportion bars on one scale).
- Vertical band wipes between stories, hard cuts inside them, nothing else.
- The package layer travels with its picture: under a wipe, strap, tab and source line change with their own side of the cut.
- Reserved alarm color appears only when the story is breaking or live.

## 10-second beat seed
- 0-1.5s: two accent slashes, the plate slams in with ring and shake, wordmark and dateline open, a glint.
- 1.5-4s: the plate flies to the corner and becomes the bug while a band wipe reveals the rundown: date block left, three rows flipping in on the beat.
- 4-6.5s (hero at 55-70%): wipe into story one, strap enters with category tab, a split-flap board turns from old value to new, call-out to the right.
- 6.5-8s: hard cut, a line steps day by day toward the dashed threshold and crosses it in the accent with a shake and a ring.
- 8-10s: wipe to the closing frame, the brand plate returns large, then resolves to the logo SVG (see Logo construction).

## Sound
A 120 BPM minor-key news theme: short string eighths, pizzicato bass on the beat, horn pad, kick on 1 and 3, snare on 2 and 4. Hits: full-ensemble sting, glockenspiel as rundown rows land, timpani on hard cuts, one beat of silence before the biggest break then the heaviest hit. Foley: wipe whoosh, flap clicks, stamp thump. One narrator, one sentence per graphic, starting 0.1s after the cut, music ducked under it. Master near -14 LUFS.

## Build it in HyperFrames
HTML/CSS with a canvas or SVG layer for charts and maps. Every frame a pure function of time t, no timers, no Math.random. Convert t to beats (`beat = t * bpm / 60`) and drive every cut, wipe and flip from `Math.floor` or `smoothstep` of the beat. Build the strap, tab, source line and corner tag per picture, inside that picture's clip, so a wipe brushes old and new states apart. Split-flap tiles: top and bottom halves clipped separately, flipped with a transform driven by t. Chart lines advance one data point per step from a fixed series. Fonts: OFL faces (for example a condensed grotesque and a mono) or brand faces. Draw every word in code, never baked into an image.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: two accent slashes cut across, then the mark's shapes slam in on the plate in construction order with a small overshoot, an impact ring and a short shake on the beat. Wordmark letters drop in one by one if the logo has one. A single glint crosses the finished mark.
- Resolve: on the closing frame the plate settles in 1 to 2 beats and the mark ends as the clean logo SVG in brand colors, centered, with a dateline beside it. The corner bug uses the same SVG, scaled.

## Watch out
- Strap, source line or tags drawn once on top of everything lag a wipe by 0.3 to 0.5s. Draw them per picture.
- Rolling counters on a close price show values that never existed. Set closes with a mask push and label only what the data supports.
- A threshold depends on its reference ("down 20% from which high?"). Name it on the axis.
- Attribute anything only a report says, on screen and in the voice. Never word a claim stronger than the source.
- Accent or metal text on paper is too weak. Use ink or a dark olive.
- Never use a real company's logo for a company in the news. Set its name in type. Do not copy a broadcaster's marks, fonts, colors, music or idents.
