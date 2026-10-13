# Chiaroscuro Candlelight

- id: `chiaroscuro`
- Source: huashu-art-motion `32_rembrandt.md` (MIT)
- Best for: drama, luxury and heritage brands, documentary intros, whisky or coffee, serious narration
- Not for: bright playful products, flat explainers, kids' content
- Triggers: rembrandt, chiaroscuro, candlelight, caravaggio, dutch golden age, dark portrait, tenebrism, oil painting lighting
- Tone cell: calm-sharp
- Clock: smooth 30/60 fps

## Look
Everything is painted in full light first, then a light map multiplies the whole frame so only a few pools of light remain.
- Ambient floor rgb(30,21,13) (about 13% light).
- Light pools stacked with lighter, then multiplied: window shaft (blurred wedge, alpha 0.8-0.95), window itself radius 330, face pool radius 250 alpha 0.95, chest 230 alpha 0.55, second subject 240 alpha 0.8, table 280 alpha 0.6, candle `190+40*flame` radius.
- A rim "separation light" on the wall behind the dark side (radius 300, alpha 0.35) lifts the figure from the background.
- Brown palette; heavy impasto only where light lands (hair, collar, porcelain, pearls, highlights).
- Glaze: soft-light `rgba(200,140,60,0.35)`, craquelure alpha 0.28, grain density 0.05 alpha 0.12, vignette 0.75.
- Lost edges: the subject layer is drawn once blurred 2.4 px, then overlaid sharp at 0.62.

## Motion
- Flame flicker `flick(t) = 0.5*noise(2.2t) + 0.25*noise(6.5t)`; light pools drift +/-14 px on `noise(0.9t)`.
- Cloud shadow: `cloud = 0.5+0.5*sin(2.2t-0.6)` dims the window light by up to 35% while a dark patch crosses the glass at 260 px/s.
- 70 dust motes visible only inside the shaft, 24-frame flicker; steam rises.
- Transition family: an old-film iris, the picture closes to a black circle then pops open on the next scene.

## Signature features (judged against these)
- Full-frame multiply light map, dark 87% of the image.
- Warm pools with one clear key, one dim fill.
- Bristle-stroke impasto highlights (parallel hairs), not offset stripes.
- Soft lost edges on the shadow side, sharp edges in the light.
- Rim light on the background behind the shadowed side.
- Flicker and cloud-shadow modulate the light, not the geometry.
- Amber glaze and craquelure on top.

## 10-second beat seed
- 0-1.2s: near-black frame, candle flare, face emerges.
- 1.2-6s: slow reveal of subject, dust in the shaft, cloud passes the window.
- 6-7.5s (hero): light pool settles on the key object or title.
- 8.8-10s: hold, flame keeps flickering.

## Sound
Low cello and lute, 55-70 BPM, room tone, soft crackle. Single warm swell on the reveal.

## Build it in HyperFrames
Canvas 2D: paint bright version, then build the light map on an offscreen canvas and composite with multiply.
- Impasto stroke = `round(w/1.3)` parallel bristles, brightness +/-17, ends shortened 0-25%, line width 1.4-2.6, a shadow stroke at alpha 0.28.
- Props go on their own layer after the brush pass. Do not copy back regions from the base image (rectangular patches).
- Draw hands before cups so the oval does not cover the vessel.

## Watch out
- Current weak spot: figures read flat (review 5/10). This style most needs a redo that gives volume to subjects.
- Three tidy offset lines for highlights read like a sticker or bandage. Use bristles.
- Grain density 0.12 alpha 0.22 makes the face look dirty. Use 0.05 / 0.12.
