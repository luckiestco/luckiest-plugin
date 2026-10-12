# Paper-cut motion design pack: what showreel takes

Source: an open-source "Motion Design, Paper-Cut (Prompt Mode)" prompt pack
(10 files, no license file), studied 2026-10-10. It writes three prompts in a
row (paper-cut still, 9-panel assembly sheet, image-to-video animation) for the
user to run in their own image and video models. Showreel builds HTML, so it
takes the method, not the prompts. Nothing here is copied word for word.

| # | Pack item | Verdict | Lands in showreel | Why |
|---|---|---|---|---|
| 1 | Depth-sorted assembly: sort every element back to front, enter in that order (backdrop, ground, set pieces, crowd, props, hero last) | Adopt | Grammar rule 11, Mark born and Exploded UI | Gives every build a readable order; the hero arriving last is the payoff |
| 2 | Hero built part by part, base up, each part with a named entry direction | Adopt | Grammar rule 11, slab and wordmark builds | Turns "it appears" into a sequence the eye can follow; direction per part avoids everything flying from one side |
| 3 | Details, numbers, and logos enter as their own small pieces after their parent | Adopt | Exploded UI (counters, chips) | Matches our slab rule; the number lands after the card, not with it |
| 4 | Material verb list: only verbs the material can do (slide, drop, tumble, tip, swing, snap); banned verbs (morph, fold, bend, smooth glide) | Adopt | Grammar rule 12, STORYBOARD.md | One shared list stops mixed physics; for the default look the verbs are camera and slab moves |
| 5 | One cause and effect final beat, ending in a small scatter payoff (kick, ball, net, flecks) | Adopt | Bookend | Our bookend lands the motif; a short chain into it gives the last hit a reason |
| 6 | No-action default: everything settles and locks in with tiny staggered adjustments | Adopt | Bookend fallback | Safe ending when there is no product action worth showing |
| 7 | Locked style, negative, and sound blocks repeated unchanged in every prompt | Adopt | Step 2, STORYBOARD.md header | One locked look line and one "never" line keep chapters consistent across edits and sessions |
| 8 | Paper-only foley: a sound per arrival (slide, tap, drop, shuffle), no extra sound | Adopt (adapted) | Step 2 beat sheet, SFX anchors | Our reels have music; take the rule "every arrival owns a short foley hit" on top of the bed |
| 9 | 9-panel assembly sheet before animating: panel 1 near empty, last panel the finished frame, no text in panels | Adopt | Step 2, as a still contact sheet from the build | Cheap check of the order before a full render; we render 9 stills from the composition instead of generating them |
| 10 | Paper-cut material: torn edges, fibre grain, hard shadow under each piece, thin white slivers between pieces, muted color | Adopt as optional look | Template `data-look="papercut"` | A second look for brands that want handmade over glossy; reuses the cards paper-collage pack |
| 11 | Stop-motion timing: tiny misalignments, staggered starts | Adopt as optional look | Template: time stepped at 12 fps, seeded jitter | Reads handmade; stepping time keeps every frame a pure function of time |
| 12 | Never name real public figures or famous artworks; describe them generically | Adopt | Guards | Same rule we need for any prompt sent to an image model |
| 13 | Start silent, one question at a time, each prompt in its own copyable code block | Adopt (light) | Step 1 brief | Fits our coordinator flow; only for the image prompts we hand the user |
| 14 | Source quality: finished, poster-like source images animate cleanest | Adopt | Step 1 brief | Same holds for UI captures: clean, uncluttered hero screens |
| 15 | Fixed model picks per step (GPT Image 2.0, Seedance 2.0), 10 s at 720p | Skip | none | Showreel renders HTML locally; no generation step |
| 16 | Drop-folder flow (`reference/` dir, `ls -t` to find the newest file) | Skip | none | The coordinator already owns run-dir assets |
| 17 | Bundled style reference image | Skip | none | We use the brand's own tokens, not a fixed style image |
| 18 | Emoji-labelled hand-off briefs | Skip | none | Against our copy rules |
