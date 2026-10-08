# Attribution

This skill is adapted from the internal **"fortuna"** AEO-grader skill
(`~/.claude/skills/fortuna`), an original Luckiest-authored skill. The source
ships no separate LICENSE file and carries no third-party copyright; it is
Luckiest-internal work, rebranded here as `luckiest-aeo-grader`.

The scanner (`scripts/scan.py`), the five-category weighted rubric
(`references/rubric.md`), and the two-axis (Readiness vs Citation) grading model
are carried over from `fortuna`. The Luckiest edition renames the skill and its
scanner user-agent, adds the Luckiest update-check and share-with-tribe hooks,
and folds in dated 2026-07 AEO signal (entity-graph reinforcement, statistical
density, per-engine citation latency). See `CHANGELOG.md` for the full record.

The rubric credits the Framer AEO scanner as conceptual prior art ("one scan,
AI-assisted, a guide not a verdict"); that framing is preserved unchanged.

No external open-source license applies. If `fortuna` is later published under a
license, copy its text here verbatim.
