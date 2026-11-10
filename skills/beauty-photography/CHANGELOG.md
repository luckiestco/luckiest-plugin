# Changelog — luckiest-beauty-photography

## 1.0.0 — 2026-11-10
Rebranded from beauty-photography-master (FancyAI skills, Apache-2.0), commit
d3b0f022, recovered from fork DYAI2025/industry-skills after the original repo
was deleted.

### Security pass
- PASS, 5 files. No network calls, credential reads, obfuscation, or hidden
  Unicode. The bundled script reads local files only.
- Removed the "Keep Technical Details Private" rule, which made the agent
  refuse the user's own questions about prompts, models, and settings with a
  fixed sales line. The skill now answers plainly when asked. Same change in
  `references/video-generation.md`.

### Best-practices pass
- Rewrote the description: the source had empty trigger slots (", , , , ,")
  left by stripped non-English triggers. New description covers skincare,
  makeup, and sets, not only perfume.
- Moved `photography-styles.md` into `references/`. The body says which
  section to load at which step.
- `scripts/compress_product_img.py` rewritten: docstring now matches the code
  (JPEG 85, 145 KB cap, not "quality 100" and "1 MB"), clear error if Pillow
  is missing, `--out-dir` (default system temp) instead of hardcoded `/tmp`.
- Eval prompts no longer name real brands. `evals/` is dev-only via
  `.skillignore`.

### Improve pass (/luckiest-thinker + /luckiest-research)
- Covers skincare tubes, jars, droppers, compacts, lipsticks, and multi-product
  sets (one ID card per product, a hero product chosen).
- Channel aspect ratios up front (4:5, 9:16, 1:1, 16:9 or 3:2); generate at
  the ratio rather than cropping.
- Named geometry QA checks: cap height, pump tiers, extra dip tube, fill line,
  label scale, body width. After 2 failed tries, show the best one and name
  the defect.
- Composite the real label or packshot over finals instead of shipping AI
  label text.
- Model pick by risk (least-drift model by default, text and hands model only
  when needed).
- Rights rule: only the user's own or client products. Real-brand campaigns in
  the references are style study only.
- Texture shot option for skincare and makeup.
- Tool routing: generation uses the session's reference-image tool or
  `luckiest-image` models. Multi-shot video hands off to
  `luckiest-video-studio`. Art director section 3b applies to every prompt.

### Network hook
- Share-with-tribe: offer to share the concept and prompt recipe (not the
  user's unreleased product images) after delivery.

### Sub-skill fit
- luckiest-ad-creative: owns the Generating Ad Visuals step for physical
  beauty products. Parent bumped to 1.6.0, added to its `BUNDLES` entry.
- Checked and not a fit: luckiest-image (its product step is UI screenshots),
  luckiest-brandkit (logo-on-merch mockups, not product campaigns).
- Listing `details.docs.complements` for both listings is still owed. It is set
  when the listing is published.

### Trend pass (/luckiest-trends + /luckiest-research + /newsjack-detector)
- Same-product fidelity test of image models: Nano Banana 2 drifted least,
  GPT Image 2 grew the cap and widened the bottle, label words held better
  than shape. Small sample. masonry.so/blog/ai-product-photo-fidelity-test,
  updated 2026-10-27.
- Pennsylvania Act 99 of 2026 requires prominent disclosure on deceptive
  AI-generated ad content, effective 2026-12-21. consumerfinancemonitor.com,
  2026-11-02, and whyy.org, 2026-11-09. Added a disclosure note at delivery.
- NAD warns beauty marketers about AI ads that overpromise. Citeline HBW
  Insight, 2026-10-27. Added "no before/after or efficacy visuals".
- Product photographers report client "AI fatigue". r/productphotography,
  2026-10-30. Supports the art-director 3b realism default.
- Discarded: Dior holiday AI backlash (WWD, 2026-11-09), context only; other
  newsjack candidates were off-domain.
- Ran: luckiest-research, luckiest-thinker, luckiest-trends (--days 30;
  Reddit, HN, YouTube; X not enabled), newsjack-detector (quick ad-hoc
  profile).

### Thumbnail
- Routes to the `video` micrographic scene via "video" in the description.
  There is no photo or image scene, so the card reads as video. A
  /luckiest-micrographic task can add one later.
