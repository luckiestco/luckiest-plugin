---
name: video-studio-composition
description: >-
  Frame composition for video scenes, generated images, product photos, mockups,
  thumbnails, ads, and launch videos. Places the focal point, sets the grid, and
  reserves white space using the rule of thirds, golden ratio (phi grid, golden
  spiral, golden triangles), 12 column and 8px grids, platform safe areas, and the
  20 classic photo composition rules (leading lines, rule of odds, rule of space,
  frame within a frame, and more). Also reviews frames and stills against those
  rules. Used by luckiest-video-studio while composing, and by image, video, ad,
  social, and prompt skills before they frame a shot. Trigger on "the frame feels
  cluttered", "where should this go", "where should the subject go", "frame this",
  "compose this shot", "use the rule of thirds", "golden
  ratio layout", "more white space", "review the composition", "adapt this to 9:16", or "/luckiest-video-studio-composition". For easing
  and transitions use luckiest-video-studio-motion. For building the whole video
  use luckiest-video-studio.
argument-hint: "[run-dir] [--review] [--scene <id>] [--aspect 16:9|9:16|1:1|4:5]"
user-invocable: true
license: MIT. See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
metadata:
  version: "1.1.0"
  listing_id: luckiest-video-studio-composition
  author: luckiest
---

# Composition for video frames

Decides where things sit in the frame and how much empty space surrounds them.
Every scene is judged at its **hold frame**, the frame where motion has settled
and the viewer reads it. Motion between holds belongs to
`luckiest-video-studio-motion`.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-video-studio-composition", installedSemver: "1.1.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-video-studio-composition", skill_version: "1.1.0", matched: true, success: <true|false> }`.
Metadata only, never prompt text. Skip silently if unavailable.

## Modes

| Mode | Use when | Output |
|---|---|---|
| Build (default) | Composing or fixing a scene | A composition plan per scene, then code that follows it |
| `--review` | After `npx hyperframes check` passes, before `luckiest-video-studio-motion --review` | `<run-dir>/qa/composition-review.md` |
| `--aspect` | Adapting a master to another aspect | Restack plan for that aspect |

## 1. Pick one placement system per scene

Pick before placing anything. Mixing systems in one frame makes alignment drift.

| System | Use when | Anchor points (fraction of W and H) |
|---|---|---|
| **Rule of thirds** | Default. One subject plus supporting text | 0.333 / 0.667 |
| **Phi grid** (golden ratio) | Premium, editorial, calm. A subject that needs more breathing room on one side | 0.382 / 0.618 |
| **Golden spiral** | One hero object with a detail to land on (a phone screen, a logo mark) | Spiral eye at ~0.618 / 0.618 from the open corner |
| **Golden triangles** | Diagonal products, angled UI, a strong slant in the shot | Main diagonal plus perpendiculars from the other two corners |
| **Centered symmetry** | Logo reveals, single-word statements, end cards, deliberate stillness | 0.5 / 0.5, mirrored weight |

Phi and thirds differ by about 5% of the frame (on 1920px: 640 vs 733). Use phi
when the extra room on the open side matters. Do not claim a frame "uses the
golden spiral" unless the subject's detail actually lands on the spiral eye.

Formulas and pixel tables for every aspect are in
[references/grids-and-ratios.md](references/grids-and-ratios.md). Load it when
placing exact coordinates.

## 2. Set the grid

- 12 columns for 16:9 and 1:1, 6 columns for 9:16.
- 8px base unit. Spacing from 8, 16, 24, 32, 48, 64, 96, 128. Type sizes on the
  same scale.
- Every element edge lands on a column edge or a baseline. A 3px misalignment
  reads as a mistake at 1080p.

## 3. Reserve white space before placing content

White space is assigned, not left over. Set these budgets first, then fit
content into what remains.

| Scene type | Minimum empty area of the safe frame |
|---|---|
| Logo, statement, end card | 60% |
| Hero product with headline | 40% |
| Stat or data card | 30% |
| Dense explainer (diagram, UI walkthrough) | 20% |

- Space around the focal point is at least 1.5x the space between supporting
  elements. Equal gaps everywhere make the frame read as a list, not a hierarchy.
- Related items sit closer to each other than to anything else (proximity).
- When a frame feels cluttered, remove an element before shrinking anything.

## 4. Rank the hierarchy

One primary focal point per hold frame. Rank every element by
**size > contrast > color > position**. Secondaries must lose on at least two of
those four. Test it with the squint check in section 7.

## 5. Apply the 20 composition rules

The full rule set, each adapted to motion graphics with a pass/fail test, is in
[references/twenty-rules.md](references/twenty-rules.md). Load it in Build mode
when a scene's placement is still undecided, and always in `--review`.

Rules that most often decide a video frame:

- **Rule of space / lead room.** A subject that moves or faces a direction gets
  open space on that side. A speaker looking right sits on the left third.
- **Leading lines and diagonals.** UI edges, arrows, and gradients point at the
  focal point, never off-frame.
- **Rule of odds.** Groups of 3 or 5 cards, icons, or logos read as designed.
  Groups of 2 or 4 invite comparison. Use even numbers only when comparing.
- **Frame within a frame.** Device bezels, cards, and masks frame the subject.
  One frame level per scene.
- **Left to right.** New content enters and progresses left to right (reverse
  for RTL scripts). Reverse direction only to mean "back" or "against".
- **Balance.** A large element on one side is balanced by a smaller, higher
  contrast element or by deliberate empty space on the other.

## 6. Safe areas and aspects

Critical content (text, logos, faces, CTAs) stays inside title-safe. On 9:16,
platform UI covers the top 15%, the bottom 35%, and the right 18%, with TikTok's
action rail reaching 28% in from the right from mid-frame down. Per-platform
pixels are in the grids reference. Use one platform's row when the video targets
only that platform.

To adapt across aspects, master in 16:9 with the focal point near the vertical
center band. For 9:16, restack side-by-side elements vertically, enlarge type
15-25%, and move the focal point up toward 0.4 H. Never make vertical by cropping
the master.

## 7. Checks that catch what reading the code misses

Run these on a rendered still of each hold frame
(`npx hyperframes render --frame <t>` or a screenshot of the preview), then:

```bash
python3 <skill-dir>/scripts/frame_check.py still.png --focal <x>,<y> [--aspect 9:16]
```

It writes `still.overlay.png` (thirds cyan, phi gold, golden triangles magenta,
safe area red, focal point white), `still.squint.png`, and `still.thumb.png`, and
prints the focal point's distance to each anchor system. It exits 1 when the focal
point is not within 3% of any anchor. Ignore that failure for scenes planned as
centered symmetry.

Read all three images:

1. **Squint.** The brightest or largest blob must be the intended focal point.
2. **Thumbnail.** The focal point and the headline must still read at 160px.
3. **Overlay.** The focal point sits on its planned anchor, and text, logos, and
   faces stay inside the red safe area.
4. **Empty area.** Estimate the empty share of the safe area against the budget
   in section 3.

The script needs Pillow. If it is missing, ask before running
`pip install pillow`. If the user declines, do the checks by eye on the still
and say which checks were done by eye.

## 8. Composition plan (Build mode output)

Per scene, write into the scene's entry in `storyboard.json` or alongside it:

- Placement system and the anchor the focal point sits on, in px.
- Grid: columns, margin, gutter, base unit.
- White-space budget and the scene type it came from.
- Hierarchy rank of every element.
- Which of the 20 rules the scene leans on (one to three, named).
- Safe areas and restack plan for each target aspect.

## 9. Review mode

`--review` reads `storyboard.json` and the composition files, renders or
screenshots each hold frame, runs section 7, and checks each scene against the
20 rules. Write `<run-dir>/qa/composition-review.md`:

| Scene | System | Focal on anchor | White space vs budget | Rules broken | Fix | Verdict |
|---|---|---|---|---|---|---|

Verdict is **Approve** or **Block**. Block when the focal point is ambiguous,
critical content leaves title-safe, the white-space budget is missed by more
than 10 points, or a scene breaks a rule without a stated reason. A broken rule
with a stated reason in the plan ("centered for stillness") passes.

After writing the review, offer once to share the worst-scoring frame and its
fix with the user's Luckiest tribe for a second eye. Never post automatically.

## Anti-patterns

| Symptom | Fix |
|---|---|
| Everything centered on one vertical axis | Move the primary to a thirds or phi anchor. Keep center only for symmetry scenes |
| Two elements tie for attention | Shrink or desaturate one until it loses on two of the four hierarchy factors |
| Frame filled edge to edge | Cut an element, then meet the white-space budget |
| Subject faces or moves into the near edge | Flip placement so lead room is on the facing side |
| Vertical made by cropping | Restack per section 6 |
| Different placement systems in one frame | One system per scene |
| Hold frame different from what was planned | Plan the hold frame, not the first or last frame |

## Reference files

- [references/grids-and-ratios.md](references/grids-and-ratios.md): thirds, phi,
  spiral, and triangle math with pixel tables per aspect, grid math, safe areas,
  depth layers, and camera moves in GSAP. Load when placing coordinates.
- [references/twenty-rules.md](references/twenty-rules.md): the 20 photo
  composition rules adapted to video frames, each with a pass/fail test. Load for
  undecided placement and for every review.
