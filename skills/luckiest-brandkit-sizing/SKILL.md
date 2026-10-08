---
name: luckiest-brandkit-sizing
description: >-
  Real-world logo size and placement for brand mockups: apparel (left chest,
  center chest, full front, upper back, full back, back neck, sleeve, hoodie),
  hats, bags, embroidery limits, business cards, letterhead, minimum size and
  clear space, and signage letter height by viewing distance. Gives each
  placement in inches, cm, and as a share of the garment, so a shot prompt can
  state the scale and QA can check it. Sub-skill of luckiest-brandkit, used at
  its prompt sheet and QA steps. Trigger on "logo size on a shirt", "how big
  should the logo be", "where does the logo go", "left chest logo size", "hat
  logo size", "sign size", "how big should the letters be on the sign", or
  "/luckiest-brandkit-sizing". For the whole mockup set use luckiest-brandkit.
  For framing inside the shot use luckiest-video-studio-composition.
argument-hint: "[placement or product] [--viewing-distance <ft>]"
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Grep
metadata:
  version: "1.0.0"
  listing_id: luckiest-brandkit-sizing
  author: luckiest
---

# Logo sizing for mockups

Mockups look fake when the logo is the wrong size for the product. A left chest
logo drawn 8 inches wide or a cap logo that wraps onto the side panels gives the
image away. This skill gives the real size for each placement, so every shot
prompt states it and QA can measure it.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-brandkit-sizing", installedSemver: "1.0.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-brandkit-sizing", skill_version: "1.0.0", matched: true, success: <true|false> }`.
Metadata only, never prompt text. Skip silently if unavailable.

## Apparel (adult)

Use the default unless the brief gives a size. "Share" is logo width divided by
the flat chest width of an adult L tee (22 in, 55.9 cm). Use it to state scale in
a prompt and to check it in QA.

| Placement | Default width | Range | Share | Position |
|---|---|---|---|---|
| Left chest | 3.5 in (8.9 cm) | 2.5 to 5 in | 16% | 3 to 4 in below collar, 4 to 6 in from center line, wearer's left |
| Left chest, embroidered | 3.5 in (8.9 cm), 1.5 to 2.5 in tall | 2 to 3.75 in | 16% | Same. About the size of a business card |
| Center chest | 8 in (20.3 cm) | 6 to 10 in | 36% | About 4 in below collar |
| Full front | 12 in (30.5 cm), up to 14 in tall | 12 to 14 in | 55% | About 3 in below collar |
| Upper back (word or name) | 12 in (30.5 cm) | 12 to 14 in | 55% | About 4 in below collar |
| Full back | 12 in (30.5 cm), up to 14 in tall | 12 to 14.5 in | 55% | A little lower than full front |
| Back neck | 2.5 in (6.4 cm) | 2 to 3 in | 11% | About 1 in below collar edge |
| Sleeve | 3 in (7.6 cm) | 1 to 4.5 in | 14% | Midway between shoulder seam and armpit |
| Hoodie or zip jacket | 3.5 in (8.9 cm) | Left chest range | 16% | Left chest, 0.5 to 1 in clear of zipper, pocket, and seams |
| Youth chest | 2.5 in (6.4 cm) | 2 to 3 in | Same visual spot as adult | Scale position with the garment |

Spacing: 0.5 to 1 in between graphics, about 1 in from garment edges, 0.5 to 1
in clear of seams, zippers, and pockets. Pair a left chest with a full back for
the classic combo. Pair a left chest print with a right sleeve to balance it.

## Hats

| Placement | Default (W x H) | Range | Position |
|---|---|---|---|
| Structured cap front | 4 x 1.75 in (10.2 x 4.4 cm) | 4 to 5 in wide, up to 2.25 in tall | Centered, 0.5 to 1 in above the brim, never wrapping onto side panels |
| Dad hat front | 3.5 x 1.75 in (8.9 x 4.4 cm) | 3.5 to 4 in wide, 1.75 to 2 in tall | Same |
| Trucker front | 4 x 1.75 in | Up to 5 x 2 in | Foam front panel |
| Beanie front | 4.5 x 1.75 in (11.4 x 4.4 cm) | Up to 5 x 2 in | Front cuff |
| Side | 2 x 1 in (5.1 x 2.5 cm) | 1 to 2.5 in wide | Side panel, clear of seams |
| Back | 2.5 x 0.75 in (6.4 x 1.9 cm) | 2.25 to 3 in wide, 0.5 to 1 in tall | Above the closure |

## Bags

| Placement | Default width | Range |
|---|---|---|
| Backpack upper front, above the strap anchors | 4 in (10.2 cm) | 3 to 5 in |
| Duffel side panel, centered | 6 in (15.2 cm) | 4 to 8 in |

## Embroidery limits

Embroidered marks need letters at least 0.25 in tall (0.3 in uppercase on
beanies) and lines at least 0.05 in thick. Below that, letters merge. When a
wordmark breaks these at the planned size, use the symbol instead.

## Write it into the shot

Add the size to the shot's COMPOSITION line in plain words: placement, width in
inches, and share of the product. Never write a hex code or a label the model
could print.

```
COMPOSITION: ... Left chest logo about 3.5 inches wide, about one sixth of the
chest width, 3 inches below the collar on the wearer's left.
```

```
COMPOSITION: ... Front logo about 4 inches wide and 1.75 inches tall, centered on
the front panel just above the brim, not wrapping onto the sides.
```

## Check it in the image

1. Measure, in pixels, the garment's flat chest width just under the armpits and
   the logo's width.
2. Divide. A left chest logo should land near 16% (pass from 11% to 22%). Use the
   "Share" column for other placements, with the same plus or minus 5 point band.
3. On hats, the logo must stay inside the front panel and clear of the brim.
4. Fail when the share is outside the band. Fix by regenerating with the size
   in the COMPOSITION line, or by compositing the real logo at the right height.

## Print, brand kit, and signage

Load [references/signage-and-print.md](references/signage-and-print.md) for
business cards, letterhead, minimum logo size, clear space, mockup scale, and
signage letter height by viewing distance.

## Sources

Wooter (logo placement on sports apparel, 2025-12-12), Rush Order Tees (screen
printing placement standards), ThreadLogic (embroidery size guide), Printful
(hat logo size guide), ooshirts (Gildan 5000 flat widths). All read 2026-10-07.
Numbers are vendor practice, not a formal standard. When sources disagree the
default is the most common value.
