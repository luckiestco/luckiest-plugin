---
name: luckiest-design-website
description: "Builds a premium, scroll-driven landing page for any business and holds it to a real design floor. Scroll is the timeline: video scrubs under the wheel, sections pin and advance, rails pan sideways, headlines assemble, the ground shifts colour. Interviews the human first, picks one of eight page grammars plus a bespoke signature move so no two builds share a skeleton, writes copy with luckiest-copywriting, builds from own footage or generated assets, ships real semantic HTML, then verifies by screenshotting its own scroll and grading contrast, dead scroll and INP. Use for 'scrollytelling', 'scroll animation site', 'a site where scrolling plays a video', 'Apple-style landing page', 'interactive landing page', 'make my brand a scroll experience', 'rebuild my landing page as an experience', 'this looks like a template', 'this looks AI-made', 'design my website', or any page that should feel like an experience rather than a document."
license: See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
metadata:
  version: "1.0.0"
  listing_id: luckiest-design-website
  author: luckiest
---

# luckiest-design-website

Scroll is the only input every visitor already knows. This skill treats it as a
timeline: the wheel is a scrubber, the page is a film with real text on top, and
each section behaves differently enough that the visitor keeps going.

**What it produces:** an interview brief, a page grammar, a journey, a feeling
curve with one engineered peak, a scroll score, one signature move, page copy,
assets, one real HTML page on a token-driven design floor, and a strip of
screenshots proving it holds at every scroll position.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-design-website", installedSemver: "1.0.0" }`. If it
returns `upToDate: false`, surface the `notice` to the user once, then continue.
Do nothing further if `upToDate: true`. Never block on this check; if the tool
is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP `report_usage` tool once
with `{ listing_id: "luckiest-design-website", skill_version: "1.0.0", matched: true, success: <true if the skill completed, false otherwise> }`.
Metadata only, never prompt text. Never block on it; if the tool is
unavailable, skip silently.

## The spine

Four rules. Everything else follows from them.

1. **Variety is the product.** At least four device families per page, never
   the same device twice in a row. Read [references/devices.md](references/devices.md)
   when scoring acts.
2. **The world is photographic** unless the brand is genuinely illustrated.
   Clay diorama and low-poly are banned defaults. Read
   [references/worlds.md](references/worlds.md) before writing an asset prompt.
3. **No continuous chain** unless the brief literally says "one continuous
   journey". Varying the device hides the cut for free.
4. **Structure is its own axis.** A different world is not a different page.
   Read [references/uniqueness.md](references/uniqueness.md) before picking a
   grammar.

## Step 0: The interview

**Always interview the human before generating anything.** Nine questions, one
pass, answers written verbatim into `<workspace>/builds/<name>/BRIEF.md`.

1. **Vibe in three to five words**, plus up to three references from any medium
   except websites. Naming sites is how a page ends up looking like one.
2. **The scroll journey, section by section, in their words.**
3. **The energy curve.** Where calm, where intense.
4. **How should someone feel, stage by stage, and what is the ONE moment they
   should remember?** This becomes the feeling curve and the peak. See
   [references/feel.md](references/feel.md).
5. **One thing this site should do that no site they have seen does.** The seed
   of the signature move. "Be memorable" is not an answer.
6. **How far from premium-minimal?** Offer the range in uniqueness.md §5.
7. **One unbroken world, or distinct scenes?** The biggest structural fork.
   Offer both plainly. Continuous world is
   [references/worldflight.md](references/worldflight.md).
8. **What assets and brand material exist?** Footage, photos, product shots, a
   brand kit, an existing site. "Nothing" is fine and means a generated world.
9. **Spend cap for generated assets, in dollars.** Zero is a first-class answer
   and routes the build to own-assets plus CSS-only devices. See Step 3.

If they have an existing site and no brand kit, run `luckiest-extract-design-system`
on the URL to pull colours, fonts, spacing and radius into starter tokens.
Those tokens seed the six colour roles and two fonts in Step 4. A hard rule in a
real brand kit beats anything in this skill.

BRIEF.md must also contain the feeling curve, the peak (as the sentence a
visitor would say to a friend), the completed "It's the site where ___"
sentence, and any authored silence, so verification can tell it from dead
scroll. Spec: [references/feel.md](references/feel.md).

**If the human is unreachable** on a fully autonomous run, first offer to raise
an assist-request to the user's Luckiest tribe: a person who knows the brand
answers questions 1, 4 and 5 better than a model guessing in the brand's voice.
Only if that is declined or unavailable, self-author BRIEF.md, mark it
`Self-authored, not interviewed` at the top, and say so in the final report.

## Bootstrap

Once, after the interview, before Step 1.

```bash
node <skill>/scripts/doctor.mjs              # node, full ffmpeg, playwright, Chrome, key, workspace
node <skill>/scripts/workspace.mjs --ensure  # resolves the workspace, seeds an empty registry
```

`doctor` exists because the common setup faults surface later as misleading
errors: a stripped ffmpeg reports a missing filter as a syntax error in your
command. Say which items are missing rather than working around them silently.
Verified on macOS and Windows; the scripts also search Linux paths.

The workspace resolves, first hit wins: `SCROLLCRAFT_HOME`, then the nearest
`.scrollcraft.json` walking up from the cwd, then `<project root>/scrollcraft`.
Builds land in `<workspace>/builds/<name>/`, the registry is
`<workspace>/FINGERPRINTS.md`, and it starts empty on purpose. The engine, env
vars and workspace file keep their upstream names so the mature scripts run
unchanged; the skill's name is what changed.

Copy `engine/scrollcraft.js` and `engine/scrollcraft.css` into the build folder.
**Never edit the engine per project.** Theme it with tokens, write your own
markup, and drive anything bespoke off the `--sc-p` custom property it
publishes. A runtime that builds the page from a config object is exactly why
every site built on one looks the same.

`KIE_AI_API_KEY` is only needed to generate assets, and only if the user chose
kie.ai in Step 3. Reference the env var name; never ask the user to paste the
key into chat. The key is sent as a bearer token to two kie.ai hosts
(`api.kie.ai` for jobs, `kieai.redpandaai.co` for `--ref` image upload), and
the only local file that leaves the machine is the reference image the user
passes explicitly.

## Step 1: The brief, journey first

Ask only what Step 0 did not cover, open-ended, never as a made-up industry menu:

1. What is this, and who is it for?
2. What must the visitor believe by the end? One sentence. Three means pick one.
3. What does the visitor do next? One action, one label, used everywhere.
4. Art direction: offer the worlds in worlds.md as a real choice.

Then write the journey: four to seven beats, each a shift in what the visitor
knows or feels (Recognition, Tension, Turn, Substance, Range, Commitment is one
shape, not the shape). Sections serve beats. A section that serves no beat is
cut. Show the journey and get it right before generating a single asset.

## Step 2: Grammar, gate, then score

In order. Detail in [references/uniqueness.md](references/uniqueness.md).

**Pick a grammar.** Eight, mutually exclusive: filmic one-shot, chaptered
editorial, live surface, continuous world, typographic poster, gallery, split
stage, rhythmic cutlist. Nav, hero and close follow from it. Choosing filmic
one-shot means saying in the report why the other seven lost.

**Invent the signature move.** One bespoke interaction coded in the page, not a
parameter change to a kit device. Interview question 5 is the seed.

**Run the fingerprint gate.** The build must differ from every row in
`<workspace>/FINGERPRINTS.md` on at least 4 of 6 dimensions: grammar, nav, hero
device, act-sequence shape, close pattern, signature move. Fail it and change
the plan, not the registry.

**Write the feeling curve before the score table.** One line per act: the
emotion, then what causes it. Name the peak and give it the largest span.

Then score each beat with a device and write the table (beat, device, why).
Checks before building:

- The grammar's bans hold.
- Four or more device families, none twice in a row, at most two `scrub` acts.
- No two adjacent acts carry the same feeling.
- One peak, largest span by a visible margin, quieter act before it.
- Total length 8 to 14 viewport-heights.
- **Lightweight devices go to CSS first.** `reveal`, `parallax`, `in` and
  `drift` can run on `animation-timeline: scroll()` / `view()` behind
  `@supports`, off the main thread, with the engine's JS as the fallback. Keep
  the engine for `scrub`, `pin`, `pan` and anything reading `--sc-p`. Fewer
  scroll listeners is the cheapest INP win on the page.

## Step 3: Assets

Route by the spend cap from question 9:

| Cap | Route |
|---|---|
| $0 | User's own footage and photos only. Grade and encode them (assets.md, "Real footage"). Stills-only acts where no footage exists. |
| Small | Stills from `luckiest-image` or kie.ai, at most two clips. |
| Real budget | kie.ai stills and camera moves via `scripts/kie.mjs`, or `luckiest-video` for a model the user already pays for. |

Whatever generates them, three things decide premium versus generated:

- **One style preamble, reused verbatim in every prompt.** Six images become
  one shoot. Write it once, never paraphrase.
- **Look at every asset before using it.** Rerolling is cheaper than shipping a
  bad frame.
- **Encode for scrubbing, not playback.** `scripts/encode.sh` sets a dense GOP;
  a normal web encode scrubs like mud. Cut phone clips portrait.

```bash
node <skill>/scripts/kie.mjs still "<style preamble>\n\n<scene>" out/01.png --ar 16:9 [--ref brand.png]
node <skill>/scripts/kie.mjs shot  "<camera move>" out/01.png out/01.mp4 --dur 5
bash  <skill>/scripts/encode.sh out/01.mp4 assets/01.mp4
bash  <skill>/scripts/encode.sh out/01.mp4 assets/01-m.mp4 mobile
```

Full pipeline, prompt scaffolds, ratios kie.ai actually accepts, and the cost
ceiling arithmetic: [references/assets.md](references/assets.md). Report
per-call sums as a planning ceiling, never as measured spend.

## Step 4: Build the page

**Copy first, markup second.** Run `luckiest-copywriting` against BRIEF.md and
the journey: one headline per act, the belief sentence, the one CTA label, in
the awareness stage the traffic arrives at. Then run
`luckiest-copywriting-humanize` as the finishing pass. The refuse list in
taste.md and the filler-verb ban apply to copy as much as to layout: no
"Build the future" class headlines, no invented numbers, no em dashes.

Write real HTML: real `<h1>`, real `<p>`, real links, real reading order. The
engine reads `data-sc-*` attributes off your markup and never generates DOM.
Start from `references/template.html` and then delete what you keep verbatim,
because a page that keeps its structure looks like every other page that did.
Device patterns: [references/devices.md](references/devices.md). Spacing, type,
colour, depth, motion and the refuse list: read
[references/taste.md](references/taste.md) before writing markup, not after.

Theme by overriding tokens, six colours and two fonts:

```css
:root {
  --sc-canvas: #0A0806;  --sc-surface: #16110E;
  --sc-ink:    #F5EBDD;  --sc-ink-soft: #A2968A;
  --sc-accent: #FF5A3D;  --sc-accent-ink: #15110F;
  --sc-font-display: "Archivo", system-ui, sans-serif;
  --sc-font-text:    "Geist", system-ui, sans-serif;
}
```

Two things a scroll page still owes search and measurement, both cheap here
because the copy is real markup:

- **Head and structured data.** Title, meta description, OG image from the
  hero poster, and one JSON-LD block. Run `luckiest-schema` for the block; a
  service company is `LocalBusiness` or `Organization`, a product is `Product`.
- **Events.** Run `luckiest-analytics` for the tracking plan: `act_reached`
  per act, `peak_reached`, `cta_click`, and one scroll-depth event. The peak
  reach rate is the number that tells you whether the page works.

## Step 5: Verify by scrolling it

Not optional. A scroll page has no single state; the failures live between the
two positions you looked at. Procedure: [references/verify.md](references/verify.md).

```bash
cd <build> && npm i playwright-core                                   # once
node <skill>/scripts/serve.mjs --root . --port 4500 &
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out lab/shots
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out lab/mobile --width 390 --height 844
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out lab/reduced --reduced-motion
```

The harness walks every act at six positions, waits for the scrub video to
settle, and reports dead scroll, cues that never reach full opacity, contrast
measured on the composited page at the brightest frame under each line, and
legs stuck on a poster. It writes a contact sheet.

Then the passes the harness cannot do:

1. **Read `sheet.png`.** Composition, motion, meaning.
2. **Tab through** for focus order.
3. **The feel check** (feel.md §6): scroll cold, one word per act, then diff
   against the intended curve. Where they disagree the page is wrong.
4. **Performance budget.** Load the page with the DevTools performance panel or
   a `PerformanceObserver` for `event` and `largest-contentful-paint`: LCP
   under 2.5s on the hero poster, INP under 200ms while scrubbing. Video scrub
   is the usual INP offender on phones; if the mobile run cannot hold 200ms,
   the mobile variant of that act falls back to the poster plus CSS motion
   rather than shipping a stutter. Safari 26.2+ reports both metrics, so the
   phone can now be measured, not guessed at.
5. **A real phone.** Headless Chrome cannot reproduce an iPhone's decoder,
   autoplay policy, Low Power Mode or touch scroll. On the first mobile defect
   report, deploy `references/device-diag.html` beside the site and let the
   device answer.
6. **The close, through a conversion lens.** Run `luckiest-cro` on the final
   act only: one action, label matches the page, nothing competing, the page
   resolves and holds rather than fading into a footer.

Fix, shoot again, and report what was verified and what was not.

## Hard rules

Ship-blockers. Each one makes a page read as machine-made.

| Never | Instead |
|---|---|
| Clay diorama, low-poly, claymation as the default world | Photographic. worlds.md |
| A "scroll" cue, arrow or animated mouse | Nothing. They know |
| `01 / 06` section counters | Delete. Sequence is not information |
| An eyebrow above every heading | At most one per three sections |
| Em dash anywhere visible | Period, comma, colon, parentheses |
| Centred copy in every act | Vary the anchor: lead, trail, centre, split |
| Same device twice in a row | Score the journey properly |
| Generating before the interview | Step 0, or mark BRIEF.md self-authored |
| No engineered peak, or three competing | One peak: asset budget, silence before it, most scroll room |
| An ending that fades into a footer | The close resolves and holds |
| Acts planned before the feeling curve | Curve first |
| No bespoke signature move | Invent one. A recoloured spotlight is not one |
| Fewer than 4 of 6 fingerprint dimensions cleared | Change the plan, not the registry |
| Editing the engine | Bespoke JS in the page off `--sc-p` and your own `data-sc-*` |
| Filmic one-shot by habit | Pick from all eight and say why seven lost |
| Full-frame dark overlay for contrast | A scrim only where the text sits |
| Text baked into an image | Real markup |
| Invented statistics | Real numbers or no counter |
| `transition: all`, animating width/height/top/left | `transform`, `opacity`, `clip-path` |
| Gradient text, neon glow, blue-purple AI gradients | Weight and size; offset blurred shadows |
| Uniform 16px radius and identical card heights everywhere | Hierarchy through intentional variation, or no cards |
| Inter or a system font as the display face by default | A display family chosen for this brand |
| Audio on a scrub clip | Strip it. encode.sh does |
| A build that stutters past 200ms INP on the phone | Poster plus CSS motion for that act on mobile |
| Shipping without Step 5 | Run Step 5 |

## Output

The build folder including BRIEF.md, then a short report: grammar and why the
other seven lost, signature move, fingerprint gate result per row, journey,
feeling curve and peak, feel-check diff, score table, copy source, what was
generated and what it cost as a ceiling, what was verified with screenshots,
INP and LCP readings, and anything not verified. Say if the brief was
self-authored. Give the local URL. Then append the row to
`<workspace>/FINGERPRINTS.md`.

To put it on the web, `vercel:deploy` from the build folder works as-is: the
page is static HTML plus assets.

## Share with your tribe

After the report, offer, never auto-post: "Want me to share this build's
grammar, signature move and contact sheet with your Luckiest tribe? Anyone
building a scroll page will see a shape that is already taken and one that
worked." If they accept, share the fingerprint row and `sheet.png` only. Never
share BRIEF.md, brand assets, client names or unpublished copy. If they
decline, stop.

Then offer to seed a follow-up Luckiest plan with the three things a shipped
page needs next: the analytics events wired, a real-phone check, and one A/B
test on the peak or the close via `luckiest-ab-testing`.

## Luckiest skills this composes with

| Step | Skill | What it contributes |
|---|---|---|
| 0 | `luckiest-extract-design-system` | Tokens from an existing site when there is no brand kit |
| 3 | `luckiest-image`, `luckiest-video` | Asset generation on models the user already has, instead of kie.ai |
| 4 | `luckiest-copywriting`, `luckiest-copywriting-humanize` | Act headlines, belief sentence, CTA label, de-slop pass |
| 4 | `luckiest-schema` | JSON-LD and head metadata |
| 4 | `luckiest-analytics` | Event plan: act reached, peak reached, CTA click |
| 5 | `luckiest-cro` | The close act, judged as a conversion surface |
| after | `luckiest-ab-testing` | One test on the peak or the close |

## References, and when to load each

- [references/uniqueness.md](references/uniqueness.md): before choosing a
  grammar, the signature move, or running the gate.
- [references/feel.md](references/feel.md): writing the feeling curve and the
  peak; running the feel check.
- [references/devices.md](references/devices.md): scoring acts and writing
  device markup.
- [references/worldflight.md](references/worldflight.md): only when the answer
  to question 7 is "one unbroken world".
- [references/worlds.md](references/worlds.md): before the first asset prompt.
- [references/taste.md](references/taste.md): before writing markup.
- [references/assets.md](references/assets.md): generating, grading, encoding.
- [references/verify.md](references/verify.md): running and reading the harness.
- [references/template.html](references/template.html): the starting skeleton.
- [references/device-diag.html](references/device-diag.html): real-phone clip diagnosis.
- [references/registry-examples.md](references/registry-examples.md): the
  upstream author's twelve-row registry, illustration only.
- [UPSTREAM-CHANGELOG.md](UPSTREAM-CHANGELOG.md): what broke on each upstream
  build and the rule that came out of it.
