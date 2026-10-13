# Synthwave VHS Retro

- id: `synthwave`
- Source: mg-styles-15 `prompts/10-synthwave.md` (MIT, Vincentwei1021)
- Best for: retro title sequences, music videos, trend brand films, gaming and nostalgia content, Y2K chrome revivals
- Not for: clean corporate, calm editorial, medical or finance
- Triggers: synthwave, outrun, 80s, retro, neon, VHS, vaporwave, Y2K, chrome text, scanlines, grid horizon, retrowave
- Tone cell: kinetic-sharp
- Clock: smooth 30 fps, with deliberate 15 fps stutters in key moments

## Look
Starry deep purple sky gradient. Striped retro sun with horizontal band cut-outs, magenta to orange to yellow. Wireframe mountains, palm silhouettes. Neon magenta and cyan perspective grid. Chrome title with a multi-stop metallic gradient and bevel highlight. Pink neon script word. Double glow: tight about 4px and wide about 30px. VHS pass: RGB split (red and blue offset 1-2px), scanlines (2px spacing, 10% black), 4:3 rounded mask optional.

## Motion
Camera flies low over the grid, grid scrolls toward the camera in a looping vertical offset, sun rises. Chrome title SLAMS in with a lens flare and a star glint sweeping across. Neon script writes on like a tube with flicker. Glitch burst 1-2 times a second (random but seeded), occasional 2-frame rewind, stutter to 15 fps for tape feel. Y2K variant motion: pop-up windows, cursor click, window drag.

## Signature features (judged against these)
- Perspective grid rushing to the horizon with a striped sun.
- Double-layer neon glow (tight plus wide).
- Chrome text with bevel and glint sweep.
- VHS chain: RGB split, scanlines, wavy jitter, glitch 1-2 times per second.
- Opening with a tracking-noise plus PLAY OSD.
- Neon script writing on with flicker.
- Deliberate frame stutter in key sections.

## 10-second beat seed
- 0-1s: tracking noise, PLAY OSD.
- 1-4s: low flight over the grid, sun rises.
- 4-6s (hero at 60%): chrome title slams in, flare, glint.
- 6-7.5s: neon script writes on, flicker.
- 7.5-10s: sustained ride with chroma bleed, end on the hero frame.

## Sound
Synthwave: gated-reverb snare, arpeggiated saw bass, lush pads, big chord and crash on the title slam.

## Build it in HyperFrames
WebGL fragment shader for sky, sun bands, grid (grid lines from fract of (z + t*speed) in perspective space) and mountain wireframes. Chrome text on a 2D canvas with a gradient plus bevel then uploaded as a texture. Glow via two blur passes. VHS pass as a post shader: channel offset, scanline multiply, per-second seeded glitch rows.

## Watch out
Banding in the sky gradient: add noise. Too much glitch kills legibility of the title. Chrome without strong contrast steps looks like plain grey. Keep glitch timing seeded.

## Vaporwave variant (huashu-art-motion `26_vaporwave`)
- Wall gradient `#0d0322` to `#4a0f6a`; magenta `#ff4fd8`, hot pink `#ff2f8f`, cyan `#3ff6ff`, sun yellow `#ffd84a`, orange `#ff8a3a`.
- Neon tube: stroke with a wide glow, then a 2-3px near-white core. Build sign lettering from polylines, no font. Flicker = seeded hash of floor(30t) under 0.07; one letter drops out with a dim purple off state.
- Sunset sliced by 7 horizontal slits (width `2 + q^2 * 16`) rising 0.9/s; floor grid lines at `y = 600 + 520/d`, `d = k + 1 - phase`, `phase = 1.3t mod 1`.
- VHS post pass: RGB split with a 3 + 1.5 sin(7t) px offset, a 70px tracking-noise band, scanlines, an on-screen "PLAY" with a drawn triangle. Transition in: VHS tear with vertical roll, 0.30s.
- Watch out: glow shows at joints if you outline each part; stroke the silhouette instead. Draw kana and symbols as paths, they fall back silently.
