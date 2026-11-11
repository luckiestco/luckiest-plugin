---
name: photographer
description: >-
  Turns a photo of a perfume, skincare, makeup, or other beauty product into a
  luxury ad campaign: identifies the product and its materials, proposes 3
  distinct creative concepts, generates 3 shots in 2 variants each with the
  photo as the reference, checks every image against the real product (shape,
  cap, glass, label), lets the user pick, and can turn a pick into a short
  video ad. Sub-skill of luckiest-ad-creative for beauty product visuals.
  Trigger on "perfume ad", "fragrance campaign", "beauty product photography",
  "cosmetic ad", "skincare product shot", "make my bottle look luxury",
  "product photo to ad", "product photographer", "lipstick campaign",
  "serum hero shot", or "/luckiest-photographer". For ad copy and platform specs use
  luckiest-ad-creative. For general marketing images use luckiest-image. For a
  full video edit use luckiest-video-studio.
argument-hint: "[product photo path] [style or channel]"
user-invocable: true
license: See ATTRIBUTION.md
metadata:
  version: "1.0.0"
  listing_id: luckiest-photographer
  author: luckiest
---

# Beauty product campaign photography

A white-background product photo becomes a set of luxury campaign images that
still show the real product. The hard part is not the mood, it is fidelity: AI
image models swap caps, melt bottles, and invent labels. This skill puts the
product's real structure first and checks every image against it.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-photographer", installedSemver: "1.0.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-photographer", skill_version: "1.0.0", matched: true, success: <true|false> }`.
Metadata only, never prompt text. Skip silently if unavailable.

## Before starting

- **Inputs.** One product photo, ideally on white. If the user has several
  angles, use all of them. If the file is too large for the Read tool, run
  `python3 scripts/compress_product_img.py --images <path>` (needs Pillow) and
  read the printed path.
- **Rights.** Make campaigns only for products the user owns, sells, or is
  hired to shoot. The real-brand campaigns in `references/photography-styles.md`
  are style study only. Do not put another brand's name or logo on the user's
  product.
- **Channel.** Ask where the images run only if the user has not said. Generate
  to that aspect ratio: 4:5 for Instagram feed, 9:16 for Stories, Reels, and
  TikTok, 1:1 for marketplace listings, 16:9 or 3:2 for web heroes. Default 4:5.
- **Image tool.** Use a reference-image tool in this session (a connected image
  MCP, or the models `luckiest-image` lists). It must accept the product photo
  as a reference. Text-only generation cannot keep the product true. If no such
  tool is available, say so and deliver the concepts and prompts only. Pick by
  risk: in a same-product test (Masonry, updated 2026-10-27, small sample) Nano
  Banana 2 changed the product least, while GPT Image 2 rendered new text and
  hands best but grew the cap and widened the bottle. Default to the
  least-drift model, and switch only for hand-held or new-text shots.
- **Look.** If `luckiest-video-studio-art-director` is installed, apply its
  section 3b (Real, not generated) to every prompt. Skip its motion sections.

## 1. Identify the product

Look at the photo and fill this card. List only the parts the product has.

| Attribute | Details |
|---|---|
| Brand and line | From the label, or "unbranded" |
| Category | Fragrance / skincare / makeup / hair / body / set |
| Container | Bottle, jar, tube, dropper, compact, stick, pump, palette |
| Material | Clear glass / frosted glass / faceted crystal / metal / ceramic / plastic / composite (name each part) |
| Silhouette | Exact geometry and proportions |
| Closure | Stopper, screw cap, snap cap, spray pump, dropper, press-down, magnetic |
| Part list | Every visible part |
| Product color | Liquid, cream, powder, or packaging color |
| Label | Placement, color, type style, and the exact words on it |
| Design language | The brand mood the packaging already signals |
| Size | e.g. 50 ml, 100 ml, 30 g jar, mini |

Material sets the lighting. Clear glass refracts and throws caustics. Frosted
glass and opaque packaging glow and scatter instead, so never prompt caustics
for them. Read `references/photography-styles.md` Section I for the product's
material only.

For a set of several products, fill one card per product and decide which one
is the hero.

## 2. Propose 3 concepts

Read Sections VI (four commercial approaches), VII (fragrance-mood starting
points), and III (echo vs. contrast) of `references/photography-styles.md`.
For non-fragrance products, map the product's claim (hydrating, matte, glow,
clean, clinical) to the mood column instead of a scent family.

Fill the diversity matrix before writing any concept:

| Dimension | Concept 1 | Concept 2 | Concept 3 |
|---|---|---|---|
| Commercial approach | Botanical / Light & Shadow / Lifestyle / Abstract | | |
| Lighting family | Dark / Bright / Warm | | |
| Background tone | Light / Dark / Color / Textured | | |
| Color strategy | Echo / Contrast / Monochrome / Complementary | | |

Rules: at least 2 lighting families and 2 approaches across the 3, and at least
1 contrast concept when the product's own mood is strong. If all 3 could be
frames from one shoot, revise before showing them. If the user gave a style up
front, honor it in at least one concept.

Write each concept as: title, one-line idea, approach and why, lighting (what
the light does on this material), set and props, palette, emotional tone, best
shot types. Ask the user to pick one or ask for changes.

## 3. Generate the campaign

**Shot list.** Pick 3 shots for the chosen concept. Default Hero + Detail +
Environment. Other types: Flat lay (overhead editorial) and Artistic (cropped,
asymmetric). Skincare and makeup often want a Texture shot (swatch, smear, or
drop of the formula) in place of Detail.

**Prompts.** Read Section IV of `references/photography-styles.md` for prompt
wording. Each prompt states, in this order of effort:

1. Scene, lighting behavior on this material, surface and props, palette
2. Composition: shot type, angle, placement, depth of field
3. A short named product description, e.g. "the frosted pink bottle with the
   gold honeycomb cap". The reference image carries the structure, so do not
   spend the prompt re-describing every part
4. Fidelity line: keep the silhouette, closure, materials, label position, and
   every visible part exactly as in the reference
5. Style: high-end beauty campaign photography, real set, real light

Describe the visual result, not camera gear. Lens names and f-stops do not
change the output.

**Label text.** Models keep the label words more often than the product's
exact shape, but small text still drifts. Ask for the label "as in the
reference", never retype long label copy in the prompt. For any final the user
will publish, composite the real label, logo, or packshot over the generated
one rather than trusting generation.

**Generate.** 2 variants per shot, 6 images by default, in parallel. The user's
photo is the primary reference for every image. Extra official packshots may be
secondary references. Never let them override the user's photo.

**QA.** Before showing anything, compare each image to the product photo:

| Check | Fail when |
|---|---|
| Silhouette | Proportions, curves, or corners differ, or the body got wider |
| Closure | Cap height, pump tiers, stopper, or lid changed shape, color, or count |
| Parts | A part is missing, added (a dip tube the bottle lacks is common), or swapped for a generic one |
| Fill and scale | Liquid fill line moved, or the label's size relative to the body changed |
| Material | Frosted reads as clear, metal reads as plastic, liquid color shifted |
| Label | Moved, or a garbled word sits where a reader will look |
| Hands and skin | Extra fingers, waxy skin, or a face when none was asked for |

Regenerate a failed variant with a stronger fidelity line and a simpler scene.
After 2 failed tries on the same shot, show the best one and name the defect.
Do not hide defects to save a round.

**Show.** Group by shot so the user compares A and B side by side. Ask for one
pick per shot, or a regenerate.

## 4. Iterate

Ask which scope applies: one shot, one element across all shots, or new
concepts. Regenerate only what changed. A new-concepts request returns to
step 2.

## 5. Video ad (optional)

After the stills are approved, offer a 3 to 5 second image-to-video clip from
one pick. Read `references/video-generation.md` only now. For a multi-shot cut
with captions, music, or an end card, hand off to `luckiest-video-studio` with
the approved stills.

## Delivering

Give the final images (and video) with one line of creative intent each. Keep
logs and request payloads out of the reply. If the user asks which model,
settings, or prompt made an image, answer plainly and give the prompt.

Note in one line that the images are AI-generated and may need a disclosure
where they run. Some platforms and places require a prominent label on
synthetic ad content (Pennsylvania's Act 99 of 2026 does from 2026-12-21).
Never generate before/after, skin-result, or efficacy visuals. AI imagery that
overstates what a beauty product does draws NAD and regulator action.

## Network hook

After delivery, offer once (never auto-post): "Want me to share the concept and
prompt recipe with your Luckiest tribe? Members shooting similar products will
see what worked." Share the recipe, not the user's unreleased product images,
unless they ask. If they decline, stop.

## Common mistakes

- Prompting caustics or transparency for frosted, matte, or opaque packaging
- Three concepts that are the same moody dark set in different colors
- Re-describing the whole bottle in the prompt instead of trusting the reference
- Retyping label copy and getting misspelled brand names
- Showing images before QA, or shipping a swapped cap because the mood is good

## Related skills

- `luckiest-ad-creative`: ad copy, platform specs, and policy pre-flight
- `luckiest-image`: model choice and non-product marketing images
- `luckiest-video-studio`: full video ads from the approved stills
- `luckiest-video-studio-art-director`: section 3b, keeps images from looking AI-made
