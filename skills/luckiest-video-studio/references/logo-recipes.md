# Logo recipes

Ten logo reveals built on HyperFrames registry blocks. Each is one `logo` scene in
`storyboard.json` with `"recipe": "<name>"`. Install a block into the composition
with `npx hyperframes add <block> --dir composition --no-clipboard`, wire it as the
scene's sub-composition, and pass the logo through its slot or variables. Load
`hyperframes-registry` before wiring; it covers slots and variables.

## Inputs

- **Logo file.** SVG first: it keeps paths for draw-on, masks, and morphs. PDF
  converts to SVG with `pdftocairo -svg`. PNG only works for recipes marked
  *raster ok*. Copy each logo into `composition/assets/logos/` and list it in the
  scene's `assets` so a replacement re-renders the scene.
- **Brand tokens** from [brand.md](brand.md): paper, ink, accent, type.
- **Name and one-line context** for the caption (client, year, discipline), only
  when the user gave them.

## Recipes

| Recipe | Block(s) | Look | Needs | Length |
|---|---|---|---|---|
| `line-draw` | bundled `templates/logo-line-draw.html` | Every path traces in its own color, fills, holds | SVG | 5-6s |
| `mask-wipe` | `svg-mask-reveal` | A soft accent sweep reveals the mark through its own shape | SVG | 3-5s |
| `piece-assembly` | `logo-outro` | Parts fly in and lock together, glow bloom, tagline | SVG with separate groups | 5-7s |
| `particle-build` | `particle-image-reveal` | Seeded particles converge and settle into the mark | raster ok | 4-6s |
| `ink-bleed` | `ink-bleed-reveal` | Ink blooms through paper and resolves to a crisp mark | raster ok | 4-6s |
| `iris` | `iris-reveal` | Circle opens from an origin, previous logo to next | raster ok | 2-3s, transition |
| `morph-swap` | `morph-swap` | Previous logo condenses and reshapes into the next | raster ok | 2-3s, transition |
| `facet` | `facet-morph` | Low-poly mass reshapes and lands on a badge silhouette | SVG silhouette | 5-6s |
| `sting` | `logo-sting` | Wordmark slams to scale, one accent ring, holds still | wordmark text or SVG | 2-3s |
| `wall` | `logo-wall` | Every logo fades and scales into a grid | raster ok | 4-6s, closer |

For a whole brand film rather than one reveal, use `reel`: a beat-locked 8 to 30 s
reel built from the bundled `luckiest-video-studio-reel/templates/reel.html`, in
which the brand motif runs through labeled chapters and lands in the lockup. It
needs an SVG logo, a brand phrase, and a user-supplied music track. The
`luckiest-video-studio-reel` sub-skill owns it.

Wordmark-only logos can also use `logo-brand-close` (letter cascade) or
`stitched-text-draw` (thread stitches) when the font is available.

`line-draw` ships as a template because the registry's `svg-stroke-trace` takes one
path in a fixed frame. The template traces every path of a real logo, fits the
viewBox to the artwork, and keeps the mark's own colors. For a single-stroke
signature, `svg-stroke-trace` is still the better fit.

## Showcase structure

A portfolio reel is not ten different effects in a row. Pick a system:

1. **One reveal, one transition.** The same reveal recipe for every logo, joined
   by one transition recipe (`iris` or `morph-swap`). Consistent and calm.
2. **Match the mark.** Line-based marks get `line-draw`, geometric marks `facet`
   or `mask-wipe`, textured or illustrative marks `ink-bleed` or `particle-build`.
   Use at most three recipes in one reel.
3. **Close on `wall`.** All logos together, then the designer's name.

Hold every finished logo still for at least 1.2s before the next move. Keep 12%
safe margin around the mark. The accent color marks one thing per scene.

## Scene example

```json
{ "id": "acme", "kind": "logo", "recipe": "line-draw", "duration": 5,
  "composition": "compositions/acme.html",
  "assets": ["composition/assets/logos/acme.svg"],
  "variables": { "logo": "assets/logos/acme.svg", "caption": "Acme, 2025, identity" },
  "line": "Acme identity" }
```

## After Effects

With `--ae`, the same scene can be rebuilt in After Effects through the Luckiest
AE MCP: `importFile` for the SVG or AI file, `trimPaths` for `line-draw`,
`setLayerMask` for `mask-wipe`, `precompose` per logo, and `render` to a MOV. The
HyperFrames version stays the reference for timing.
