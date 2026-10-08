# Grids, ratios, safe areas, and camera framing

Load this when placing exact coordinates. Pixel values are rounded to the
nearest pixel. Adapted from iart.ai `shot-composition/references/camera-and-grids.md`
(MIT), with phi and triangle math added and code moved to GSAP.

## Anchor points per aspect

Thirds lines at `W/3, 2W/3` and `H/3, 2H/3`. Phi lines at `0.382 W, 0.618 W`
and `0.382 H, 0.618 H`.

| Frame | Thirds x | Thirds y | Phi x | Phi y |
|---|---|---|---|---|
| 1920x1080 (16:9) | 640 / 1280 | 360 / 720 | 733 / 1187 | 413 / 667 |
| 1080x1920 (9:16) | 360 / 720 | 640 / 1280 | 413 / 667 | 733 / 1187 |
| 1080x1080 (1:1) | 360 / 720 | 360 / 720 | 413 / 667 | 413 / 667 |
| 1080x1350 (4:5) | 360 / 720 | 450 / 900 | 413 / 667 | 516 / 834 |

Power points are the four intersections of each set.

## Golden triangles

Draw one corner-to-corner diagonal, then a perpendicular to it from each of the
other two corners. The two feet of those perpendiculars are the anchors.

```
t1 = W² / (W² + H²)    foot from the corner at (W, 0), on the diagonal (0,0)→(W,H)
t2 = H² / (W² + H²)    foot from the corner at (0, H)
anchor = (t * W, t * H)
```

| Frame | Anchor A | Anchor B |
|---|---|---|
| 1920x1080 | (1459, 820) | (462, 260) |
| 1080x1920 | (260, 462) | (820, 1459) |
| 1080x1080 | (540, 540) | (540, 540) |

On 1:1 both anchors collapse to the center. Use thirds or phi on square frames instead.
Mirror the diagonal to suit the direction of the subject's slant.

## Golden spiral

The spiral is built from a golden rectangle (1:1.618). Video frames are not golden
rectangles, so the spiral is an approximation on 16:9 and 9:16. Its tight end
lands near the phi intersection on the side where the spiral closes. Place the
detail (screen, logo mark, face) there and let the larger subject sweep along the
outer arc. Rotate or flip the spiral to match where the detail is.

## Golden ratio beyond placement

- Split a frame into a 61.8 / 38.2 content and empty zone for calm hero scenes.
- Type scale by phi: 16, 26, 42, 68, 110. It has bigger jumps than an 8px scale,
  so use it for statement scenes and the 8px scale for dense scenes.
- A card at 1:1.618 reads as more considered than an arbitrary rectangle.

## Grid math

```
content_width = frame_width - 2 * margin
column_width  = (content_width - (cols - 1) * gutter) / cols
column_x(i)   = margin + i * (column_width + gutter)        // 0-indexed
span_width(n) = n * column_width + (n - 1) * gutter
```

| Frame | margin | gutter | cols | content | column | 4-col span |
|---|---|---|---|---|---|---|
| 1920x1080 | 100 | 24 | 12 | 1720 | 121.3 | 557.3 |
| 1080x1080 | 64 | 16 | 12 | 952 | 64.7 | 306.6 |
| 1080x1920 | 48 | 16 | 6 | 984 | 150.7 | 650.6 |

Spacing values are 4, 8, 16, 24, 32, 48, 64, 96, 128.

## Safe areas

| Aspect | Top | Bottom | Left | Right | Reason |
|---|---|---|---|---|---|
| 16:9 (1920x1080) | 5% (54) | 5% (54) | 5% (96) | 5% (96) | Web and video. Use 10% for broadcast |
| 9:16 (1080x1920) | 15% (288) | 35% (672) | 11% (120) | 18% (192) | Strictest of TikTok, Reels, and Shorts combined (see below) |
| 1:1 (1080x1080) | 7% (76) | 7% (76) | 7% (76) | 7% (76) | Symmetric feed crop |
| 4:5 (1080x1350) | 8% (108) | 8% (108) | 6% (65) | 6% (65) | Taller feed crop |

9:16 per platform, in px on 1080x1920 (checked 2026-10-03):

| Platform | Top | Bottom | Left | Right |
|---|---|---|---|---|
| TikTok | 240 | 660 | 120 | 120, and 300 from y=840 down for the action rail |
| Instagram Reels | 269 | 672 | 65 | 65 |
| YouTube Shorts | 288 | 672 | 48 | 192 |

Sources: postplanify.com/blog/social-media-safe-zones-2026-complete-guide,
brandeal.ai/en/blog/tiktok-safe-zone-guide. The combined row above takes the
largest value per side. When a video targets one platform, use that platform's
row for more room. Platform UI changes, so re-check this table when it is more
than six months old.

## Depth layers

| Depth | Role | Parallax speed | Contrast |
|---|---|---|---|
| Background | Ambient | 0.1-0.3x | Low, often blurred or desaturated |
| Midground | Supporting | 0.5-0.7x | Mid |
| Foreground | Primary, the thing the eye follows | 1.0-1.5x | Sharp. Props crossing the subject blur 2-4px |

```js
// GSAP parallax pan, one timeline, distinct speeds per layer
const dist = 300;
tl.to(".bg",  { x: -dist * 0.2, duration: 1.6, ease: "power2.inOut" }, 0)
  .to(".mid", { x: -dist * 0.6, duration: 1.6, ease: "power2.inOut" }, 0)
  .to(".fg",  { x: -dist * 1.2, duration: 1.6, ease: "power2.inOut" }, 0);
```

## Camera moves

One move per beat. Combining push, pan, and rotate reads as chaos.

| Move | Values | Ease | Use |
|---|---|---|---|
| Push-in | scale 1.0 → 1.12 over 1.6s, origin on the focal point | `power2.inOut` | Focus, intimacy |
| Pull-out | scale 1.15 → 1.0 over 1.8s, origin centered | `power2.inOut` | Reveal context |
| Pan | x 0 → -300 over 1.5s | `power2.inOut` | Reveal space. Keep the subject a third from the trailing edge so it leads |
| Whip-pan | out: x 0 → -120% over 0.28s, `power3.in`. In: 120% → 0 over 0.28s, `power3.out`, overlapped | see values | Energetic scene change |

Set `transformOrigin` to the focal point's anchor for pushes, so the subject stays
on its thirds or phi point while the frame grows around it.
