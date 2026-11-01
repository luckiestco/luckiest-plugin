# Changelog

## 1.1.0 (2026-11-01)
- Optional Laya first pass (step 2b): `scripts/laya_tag.py --preset guard` flags passages aimed at the AI so the source review reads them first. Only adds things to read; never clears a finding or changes a verdict. Skipped when Laya is off (exit 2).

## 1.0.1 (2026-10-10)
- Requires SkillSpector 2.12.0+: older SC4 matched CVEs by package name and ignored version floors.
- AE1 from `reference_missing` (files the skill writes at runtime) is a caveat, not a risk.
- Clean `__pycache__`/`*.pyc` before scanning; shipped bytecode is SC8/SC9.

## 1.0.0 (2026-10-10)
- Initial release, adapted from NVIDIA SkillSpector's skill-inspector (Apache-2.0).
- Two evidence lines: SkillSpector static scan (`--no-llm`) plus a 10-question source review.
- APPROVE / CAUTION / REJECT rubric with score posture table.
- Findings classed as real risk, needed and disclosed, or false positive. False positives go to a reasoned baseline, never to rewording.
- Manual source-review fallback when the CLI is not installed.
- Security pass: no scripts, no network beyond Luckiest MCP metadata, never executes the target.
