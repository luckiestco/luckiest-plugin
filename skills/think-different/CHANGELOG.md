# Changelog

## 1.0.1 - 2026-10-31

- Structural unavailability is graded (source Jaccard distance, field spread, field rarity) so it no longer maxes out with few sources. On a 6-source test run, the largest tie fell from 24 of 60 to 12 of 60.
- Step 1 asks for 12 to 20 sources, up from 6.

## 1.0.0 - 2026-10-30

First Luckiest edition, adapted from alejandrohdez00/alien-space-of-science
(sha 39cbccc, MIT). Sub-skill of luckiest-thinker.

- Prompt-only pipeline: sources, atoms, super-atoms, random combos, scores, proposals.
- `scripts/think_different.py` samples combos and ranks them with the paper's beta formula.
- Opt-in recipe for the upstream trained models (ML papers only).
