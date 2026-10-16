# Pixel Art 8-bit

- id: `pixel`
- Source: mg-styles-15 `prompts/20-pixel.md` (MIT, Vincentwei1021)
- Best for: game trailers and attract screens, 8-bit music videos, nostalgic brand marketing, indie game promos
- Not for: smooth premium brand films, photoreal, long text
- Triggers: pixel art, 8-bit, 16-bit, retro game, sprite, chiptune, side scroller, CRT, dithering, PICO-8, Aseprite, Minecraft, Terraria
- Tone cell: kinetic-sharp
- Clock: stepped 10-12 fps for sprites (30 fps timeline for scrolling)

## Look
Internal resolution 320x180 scaled x6 to 1920x1080 with nearest-neighbour. Limited palette (PICO-8-like 16-32 colors), dithered sky gradient. 3-4 parallax layers (sky, far mountains, mid forest or city, near ground tiles). Sprites hand-authored 16x16 to 24x24 as pixel arrays. Chunky pixel version of the real logo, pixel font dialogue box. Optional CRT pass: scanlines, slight barrel, phosphor glow, without blurring pixels into mush.

## Motion
Strictly integer pixel positions and stepped timing, no smooth easing on sprites. Run cycle 6-8 frames at about 10-12 fps. Coin sparkle, slime bop, chest opens with a light burst. Parallax layers move by whole pixels at different speeds. Palette shifts day to sunset. Dialogue types out character by character. Logo drops in with a shine sweep.

## Signature features (judged against these)
- Hard pixel edges via nearest-neighbour, no anti-aliasing.
- Limited palette (8-32 colors) with dither.
- Sprite animation at 8-12 fps, steps() timing.
- Integer-pixel positions only, including parallax.
- 3-4 parallax layers at different whole-pixel speeds.
- Typewriter dialogue box in a pixel font.
- CRT scanlines that keep pixels crisp.

## 10-second beat seed
- 0-1.2s: sky and hero already running, coin sparkle.
- 1.2-4s: run, jump, bop a slime, parallax scrolling.
- 4-7s (hero at 60-75%): palette shifts to sunset, chest opens with a light burst.
- 7-8.5s: dialogue typed out.
- 8.5-10s: the real logo builds in pixels with a shine sweep, then resolves to the logo SVG (see Logo construction).

## Sound
Chiptune: pulse lead, triangle bass, noise drums, plus jump, coin and chest SFX.

## Build it in HyperFrames
Canvas 2D at 320x180 with imageSmoothingEnabled = false, then drawImage upscaled x6 (or CSS image-rendering: pixelated). Sprite frame = floor(t*10) mod N. Parallax offset = floor(t * speed). Palette as an array of hex values, palette shift by lerping and re-quantising. Ordered-dither (Bayer 4x4) for gradients. CRT pass applied after upscale.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the mark is drawn into the low-res grid in its construction order (outer silhouette, then cuts and counters), stepped a few pixels per frame at the card's 10-12 fps, palette-quantized from the logo's own colors. The shine sweep runs once the shape is complete.
- Resolve: on the hold the pixel grid steps up to full resolution in 2 to 3 hard steps (no smooth scale), ending on the crisp logo SVG in brand colors. A chunky pixel wordmark is never the resolve.

## Watch out
Fractional positions cause shimmer. Never use a smooth scale or rotation on sprites. Scanlines that are too heavy hide the art. Pixel CJK fonts must be OFL.

## Art-history variant (huashu-art-motion `14_8bit`)
- Draw the whole scene on a 240x135 canvas (1 low pixel = 8 screen pixels), scale up once with image smoothing off. Gradients become a 3-tone checkerboard dither band (sky `#0856ef #47c4f8 #aae9fb`).
- Sprites: rasterize each part on its own layer, drop alpha under 110, quantize to a 14-color palette, give each part its own 1px black outline. Draw small props directly at low resolution, never scaled down from smooth paths.
- HUD text at full resolution in Press Start 2P (OFL) with an 8px drop shadow; icons as 8x8 bitmaps.
- Motion stepped: 4-pose loops at 15 fps, integer pixel shakes `[0,1,0,-1]`, coin pop as a half sine of 9px, 1px cloud moves every 2 frames. Transition in: pixel blocks scale up then down.
