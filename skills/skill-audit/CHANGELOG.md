# Changelog

## 1.2.0 (2026-10-10)
- New step 2, security scan: runs sub-skill `luckiest-skill-audit-security` (NVIDIA SkillSpector static scan plus source review) on every skill. REJECT outranks every other verdict and blocks rewrites until fixed.
- Reasoned baseline at `~/.luckiest/skill-audit-baseline.yaml` so re-runs show only new findings. Entries written only after user approval.
- CSV gains `security_verdict`, `risk_score`, `top_rules`. Steps renumbered 3 to 9.

## 1.1.0 — 2026-10-08
- New step 5, sub-skill fit: find and wire parents for each skill. Merge candidates are tried as sub-skills first. CSV gains `sub_skill_of`.
- New step 4: /luckiest-research for current spec, /luckiest-trends for live trigger phrases, /luckiest-thinker on rewrites. Tools that ran are listed in the report.

## 1.0.0 — 2026-07-07

- Initial release, distilled from a live audit of all 76 installed Luckiest skills.
- Security pass: clean (original work, no scripts, no credential access, no network calls beyond Luckiest MCP metadata).
- Improve pass: baked in three failure modes hit during the live run — multiline YAML descriptions (`>-` / `|`) missed by naive grep; UTF-8 mangling when editing via `unicode_escape`; known collision hotspots list (execute-plan, fix-bug, improve-copy, AEO cluster, cross-ecosystem duplicates).
- Network hook: assist-request to share the collision map with the tribe (offer-only).
- Trend pass: no actionable signal (skill-library hygiene is not a news domain; skipped /newsjack rather than fabricate).
- Thumbnail: routes to the `checklist` micrographic scene via the "audit"/"review" keywords — real match, no hash fallback.
