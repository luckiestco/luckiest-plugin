# Anime Light (volumetric cel)

- id: `anime-light`
- Source: huashu-art-motion `35_shinkai.md` (MIT)
- Best for: romantic or nostalgic brand films, travel, music visuals, summer campaigns, product reveals with a sky
- Not for: flat UI, data, gritty or dark-edgy brands
- Triggers: makoto shinkai, your name, anime sky, lens flare, god rays, cumulonimbus, cel shading, golden hour, anime light
- Tone cell: calm-soft
- Clock: smooth 30/60 fps

## Look
A near-realistic background (cool-warm wall gradients, window frames, wires, rooftops) lit by a huge sky, with cel-shaded subjects on top.
- Skin `#ffe8dc / #f2b6a8`, hair highlight `#f8d681 / #d8a050`, white `#fbfbfe / #b9c3dc`, navy `#2c3a66 / #1b2446`, line `#6a4632` at 2.2 px.
- Cloud silhouettes `#b7c6e6` to `#8297c6` with bright white cores toward the sun.
- Light comes from the window: shadow falls lower right (light dir -1, -0.55). Backlit subjects (against a window) put shadow below and add a thin warm rim `rgba(255,220,160,0.55)`.
- Eyes: white 8x12, vertical iris gradient `#1f3f7a` to `#3f7fd0` to `#9fd4ff`, two highlights.
- Final grade: bloom plus soft-light split toning (cool shadows, warm highlights).

## Motion
- Clouds boil and drift at about 10 px/s, each puff breathing `0.05*sin(1.3t)`.
- Light shafts pulse `0.75+0.25*sin(3.4t)`, 60 dust motes twinkle.
- Lens flare: sun core radius 130, 10 spikes rotating 0.25 rad/s, a horizontal streak 840x4, five hexagon ghosts along the sun-to-center line.
- A droplet slides down glass leaving a trail; sheer curtain and its shadow sway; birds flap; hair moves in wind.
- Transition family: a diagonal sweep of light flare, bright band with streaks and ghosts, wipes the old frame.

## Signature features (judged against these)
- Hard-edged cel shadow shifted off the shape toward the lit side (evenodd clip), plus a rim line.
- Cumulus clouds from silhouette, offset bright core and a blur plus sharp double layer.
- Triangular or wedge light shafts with floating dust.
- Hexagonal flare ghosts aligned on one axis.
- Window-shaped light patches on floors and walls.
- Bloom pass (render small, blur 6 px, screen at 0.28).
- Sun inside the glass, never on the frame edge.

## 10-second beat seed
- 0-1.2s: wide sky, clouds already moving, shaft of light.
- 1.2-6s: subject action, curtain, droplet, birds.
- 6-7.5s (hero): sun peeks, flare sweeps across the frame.
- 8.8-10s: hold with dust and cloud drift.

## Sound
Piano and strings with a pop-rock lift, 110-130 BPM. Airy shimmer on the flare sweep.

## Build it in HyperFrames
Canvas 2D layers or Three.js sky plane.
- Cel function: clip to the shape, subtract the shape shifted by `(lx*sd, ly*sd)` (evenodd) for shadow; same with reverse shift for rim. Order: fill, shadow, rim, line, so occlusion is correct without hidden-line removal.
- Clouds: draw all puffs as blue-gray silhouettes, add a bright radial 0.82r sphere offset toward the sun per puff, blur 3 px, overlay 55% sharp.
- Cache light shafts blurred 18 px, composite with screen.

## Watch out
- Current weak spot: interior backgrounds lack detail density.
- Sun on a window corner makes the flare spill onto the wall like a lamp. Keep it inside the glass, flare radius 130 or less.
- One radial gradient per cloud with a rim arc reads as soap bubbles.
- A full-width flare streak (1800 px) looks like a bug line. Keep it near 840 px at alpha 0.35.
- Droplets drawn solid look like bubbles. Draw only a lower arc, alpha 0.22, and one highlight.
