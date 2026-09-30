# Chapter techniques

Pick five to seven and chain them so each chapter's out-transform is the next
one's in-transform. Everything runs on one paused GSAP timeline, timed in beats.

## Physics: squash and stretch
- **Build:** a contact on each beat. Fall on `power2.in`, rise on `power2.out`. On
  contact, `scaleX 1.35 / scaleY 0.7` for two or three frames, then ease back.
  Stretch to `scaleY 1.3` while falling fast. A readout (position, velocity) is
  computed in the per-frame driver from the current value.
- **Out:** the motif shoots sideways into a line, blooms to a two-frame flash, and
  the flash becomes the next chapter's paper.
- **Motif ideas:** a cursor, a progress dot, a drop, a map pin.

## Kinetic type
- **Build:** split the phrase into spans, drop them in shuffled order with
  `back.out(2)`, fake motion blur with `filter: blur` plus a short `scaleY`
  stretch. A selection box with handles and a cursor resizes the word (measure the
  word once, after fonts load). Repeat the key word into outline wallpaper
  (`-webkit-text-stroke`), rotate the wall a few degrees, slide alternate rows, and
  fill two rows with the accent. Invert on a beat with one `tl.set`.
- **Brand swaps:** the brand's own search box or chat input typing the phrase, a
  price tag, the first slogan.

## Motif to grid
- **Build:** motif copies line up, then fill a 16 by 9 grid of divs. A wave is a
  pure function of time and distance from an origin, set in the driver: scale,
  color mix, and corner radius from `phase = t * speed - distance`. Shapes morph by
  `border-radius` and `clip-path`. A parent with `perspective` gives a camera tilt.
- **Brand swaps:** real product imagery fading into the cells, app icons, a pixel
  mosaic of the logo.

## Particles
- **Build:** one `<canvas>` of 2,000 to 4,000 particles with seeded starts and
  targets (a ring, a number, logo pixels sampled from the image). Each frame draws
  `lerp(start, target, ease(progress))` plus a curl offset that fades as it
  settles. Additive blending for glow.
- **Out:** particles condense into the next hero object's silhouette, and the real
  object replaces them inside a two-frame flash.

## Hero object
- **Build:** the brand's product or mark as a real asset the user supplies (a
  render, a photo, a short clip). Push in with `scale` and `blur` over the last half
  beat and cut hard on the beat. A readout with counting numbers sits on a leader
  line.

## Easing curve
- **Build:** an SVG curve draws on, a ball rides it at `ease(t)`, eight ghost copies
  trail at falling opacity.
- **Brand swaps:** a growth curve of a verified brand metric.

## Flurry (about four beats, five or six cuts)
- **Build:** each cut is a full-bleed layer shown by `tl.set` on its beat with one
  internal move (spin, slide, pop, stutter). This is where the held-back color
  appears. Glitch: three offset copies of the text in `mix-blend-mode: screen` plus
  horizontal slices jittered on alternate frames. Noise: a canvas of large pixels
  in brand colors, seeded per frame.
- **Brand swaps:** one signature UI moment of the brand per cut.

## Lockup
- **Build:** the wordmark resolves from blur and noise over about 12 frames, a
  rule draws from the left, subtitles type on with a block cursor, the motif falls
  and lands as part of the logo with the physics chapter's contact squash, and the
  tagline fades in last at low opacity. Hold at least 1.2 s.
