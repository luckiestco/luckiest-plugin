# Prompt recipes

Load this when writing the style block or a shot prompt. Every recipe here came
from a real 14-shot run (Luckiest brand, 2026-10-05) and fixed something a first
draft got wrong.

## Stills levers

The video art director's look table covers palette, accent, faces, and texture.
Stills also need these fixed once for the whole set. A set drifts when any is left open.

| Lever | Decide | Default that worked |
|---|---|---|
| Light | One source, its side, shadow quality | One hard light, upper left, long crisp black shadows |
| Materials | Surface and finish per object type | Textured cotton paper, heavyweight cotton, matte only |
| Set | What the subject sits on, and how much of it | One or two raw planes at most, edges used as leading lines |
| Camera | Angle per category | High three-quarter for objects, low close three-quarter for posters, straight on for walls |
| Space | Empty share of the frame | 60% |

## Style block skeleton

Fill each slot. Prepend the whole block to every shot.

```
Moody editorial brand mockup for an award-winning design agency portfolio.
Minimal set: <material> with <texture>. One or two simple planes at most, never
a stack of blocks or steps. Each plane edge is a leading line toward the subject.
A single hard directional light from the <side> casts long, crisp, deep-black shadows.
Palette: <neutrals>. The only color is <one accent, described in words, no hex>.
Materials: <paper/fabric/finish>, matte, no gloss.
<Camera angle>, medium-format photograph with photoreal micro-texture, cinematic,
60% negative space.
```

Then the shot: `SHOT:` object and set, `COMPOSITION:` placement in percent of
the frame, and a closing text line:

```
The only text is exactly "<string 1>", "<string 2>", and the "<Brand>" wordmark,
spelled correctly. No other text, logos, extra colors, gradients, props, glossy
plastic, or soft flat lighting.
```

## Rules

| Rule | Why |
|---|---|
| Describe colors in words ("one small coral-red dot"), never hex | Hex codes get printed onto surfaces |
| Never name UI parts ("domain card", "button", "nav") as labels | They get printed as text. Describe the shape instead ("one small white rounded card that shows only the price") |
| Ask for "no menus, paragraphs, small print, URLs" on screens and letterheads | Models fill empty screens and paper with fake copy |
| Max two set planes, stated as leading lines | Without it, sets fill with stacked plinths and steps that compete with the subject |
| Name the light direction and where the shadow falls | Keeps the series consistent and gives each shot a diagonal |
| State the empty side ("the upper-left 60% is empty concrete") | Models center everything by default |
| Attach the logo as a reference and describe its shape in words | The reference alone is not enough for custom letterforms |
| Wordmark references work. Symbol references often come back rotated or simplified | Plan to composite the symbol on fabric and signage |

## Poster series recipe (approved composition)

Use one recipe for every poster so the series reads as a set:

- Low, close three-quarter camera from the lower left, looking slightly up.
- Unframed poster leaning at a steep 28 degree tilt, top edge to the right.
- One diagonal cone of light from the upper left frames the poster like a spotlight (rule 12, isolate).
- Headline about 60% of the poster width, upper left of the poster, accent period on a phi point (rule 20).
- One short line right under the headline, the small wordmark bottom right of the poster.
- Dark variant: black paper, white type, the same accent.

## Billboard or screen with existing artwork

Do not ask the model to repaint finished artwork. Generate the structure with a
plain board, then warp the real artwork on with `scripts/composite_screen.py`.
The artwork may carry its own colors and gradients. Say in `qa.md` that the
shot is an intentional exception to the one-accent rule.

## Picking between variants

Reject a variant that adds a second accent dot, a frame, a colored wall, or
extra platforms, even when it is more striking. Consistency across the set
beats any single frame.
