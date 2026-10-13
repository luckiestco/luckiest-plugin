# Editorial Data Chart

- id: `finance-chart`
- Source: huashu-art-motion `references/动画语法/t3_finance_chart.md` (MIT)
- Best for: revenue, profit, user counts, price trends, market share, regional comparisons, before and after an event. Segments where viewers will screenshot and check numbers. 2.5-6s per chart, 30-90s total.
- Not for: a single number (use a big-number reveal), unreliable or unsourced data, explaining a mechanism.
- Triggers: economist chart, financial times chart, ft chart, bloomberg, data journalism, revenue chart, bar chart race, candlestick, stock chart animation, finance explainer, earnings growth
- Tone cell: calm-sharp
- Clock: smooth 30/60 fps

## Look
- Base: white `#FFFFFF`, warm salmon `#FFF1E5`, or dark `#0E1116` with light text and a teal main bar. The chart base matches the surrounding video's color family. A white report page dropped into a dark film reads as disconnected.
- Layout: thin red top rule (8px), small red tag at top left (96x22), bold headline stating the one conclusion, subtitle with metric and unit, source line bottom left.
- Palette: red `#E3120B`, blue `#006BA2`, cyan `#3EBCD2`, green `#379A8B`, yellow `#EBB434`, grey `#758D99`, black `#0C0C0C`.
- Emphasis: one color tells the story, everything else drops to light grey (`#C6D2D8`).
- Grid: horizontal lines only, thin grey (alpha 0.13, 1.5px). Only the zero baseline is solid black (3px). Tick values sit on the right above their lines.
- Type: condensed sans for numbers, bold headline 700, regular subtitle 400. Axis text smallest, source smallest and lightest.
- Up and down colors: state them on the chart. Red-up/green-down in East Asian markets, green-up/red-down in Western ones. A colorblind-safe option is blue/orange with up and down triangles.
- Line width 5px for the main line, 4px averages, 2px callout leaders. Fictional data carries a "sample data" badge on every shot, real data never does.

## Motion
- Order: layout 0-0.5s, grid lines draw left to right (lag 0.12s, ease-out-quint), x labels fade up, then data, then color emphasis, then the annotation. Each stage 0.5-1.3s.
- Bars grow from the zero baseline with ease-out-quint, staggered 0.22s, value label rides the bar top and counts in sync.
- Lines draw by x (time), not arc length, so steep sections draw fast. Head dot 9px with a following price label, area fill alpha 0.14 to 0.
- Annotation fires the moment the line head passes the event: dot pops (spring 0.45s, bounce 0.25) with a pulse ring, leader draws 0.12s later, text fades 0.3s later. One annotation per shot.
- Candles appear one by one (lag 0.06s), body then wick, volume in sync.
- Counts use ease-out-expo over 0.9-1.3s with tabular digits. Hold at least 0.5s after a number lands.
- Camera stays still. A slow 1s push to a data point or 0.7s glide to the next group, with a fast 0.28s push for the single most important number.

## Signature features (judged against these)
- Headline is a single conclusion and the multiples in it can be recomputed from the chart (a / b shown in the annotation).
- Bars start at zero. A line axis that does not start at zero says so in the subtitle.
- Axes and grid appear before the data.
- Each data point lands on the spoken number.
- One highlight color, everything else grey, red/green meaning labeled.
- One annotation per chart shot.
- No bouncing bars, 3D bars, or rotating pies.
- Unit and source are written on the chart.

## Beat pattern (30-60s)
- 0-4s: chart frame (rule, tag, headline, empty axes). Headline states the conclusion.
- 4-20s: one chart per one or two voiceover sentences. Bars or line grow when named.
- 50-70%: pivot to the key figure. Push in to the final bar or the event point, annotation pops with the ratio (for example "130.5 / 16.7").
- Optional swap: change layout (bar to line) only for the same metric, move first then reshape. Never morph between different metrics.
- Last 4-6s: one clean frame with the conclusion, source visible, hold 0.8s or more.

## Sound
Light low-key pulse or soft pad, no big beat. Small tick as each bar lands, clean tone on the final number. Voice sits on top.

## Build it in HyperFrames
- SVG or Canvas 2D with seeded data. Scales have an inverse so you can compute `tHit = start + duration * smooth^-1(x fraction)` for the annotation trigger.
- Tick generator uses 1, 2, 2.5, 5 times 10^k, and pads one tick above and below the data range so bars never leave the axes.
- Panel push transition: new panel slides in from the right with a thin red bar leading, 0.5s on `cubic-bezier(.7,0,.2,1)`, and starts building its layout during the slide.
- Zoom into a local area: camera redraws vector content, never scales a bitmap.

## Watch out
- Truncated bar axes, too many colors, every series highlighted.
- "Rose to 8.7x" is not "rose by 8.7x". Check the wording against the numbers.
- Animation so busy the value cannot be read.
- Three identical chart layouts in a row. Insert a push to a detail, a big number, or real footage.
