# Changelog — luckiest-copywriting-humanize

## 1.1.0 - 2026-11-09
- New plain technical mode for tool descriptions, error messages, procedures, agent instructions, READMEs, and PR descriptions. It has two levels, strict and light, with rules adapted from ASD-STE100 via danyuchn/asd-ste100-skill (MIT, sha d48bfca) in references/ste100.md.
- The mode turns off the voice section, swaps the "vary sentence length" check for length caps, and keeps a single hedge that states real uncertainty.
- Added scripts/ste-lint.py, a stdlib-only linter copied unchanged. It is an optional final-scan check when python3 exists.
- New trigger phrases: disambiguate, plain English, Simplified Technical English, STE100.

### Security pass
The linter imports only the stdlib. It makes no network calls, subprocess calls, eval, or exec, and it writes files only inside its own --selftest temp dir. The self-test passes.

## 1.0.1 — 2026-10-04
- Source added to the repo. The update check uses the listing id.

## 1.0.0 — 2026-09-01
Rebranded from humanizer 2.9.1 (blader/humanizer, MIT).

### Security pass
Clean. Source is Markdown plus one dependency-free local validation script. No credential reads, no network calls, no obfuscated commands, no allowed-tools grant.

### Best-practices pass
- Split the 412-line monolith: SKILL.md is now 82 lines, with the 34-pattern catalog in references/patterns.md and the false-positive guidance in references/detection.md, each with a stated load trigger.
- Rewrote the description for trigger matching, with concrete user phrases and pointers to neighboring Luckiest skills.
- Dropped the repo-maintenance surfaces that do not belong in a skill (README, AGENTS.md, plugin manifests, marketplace entry, validate-package.py, agents/openai.yaml).

### Improve pass (/refract)
- Added an "Audit only" invocation mode. The original assumed every invocation wanted a rewrite, so asking "does this sound like AI?" produced an unrequested edit.
- Added a "Never touch" section naming code blocks, frontmatter, link targets, command names, and quoted passages. File mode mentioned this in passing; it is now a rule that applies in every mode.
- Turned the closing check into a concrete five-item scan gate (dashes, curly quotes, sentence-length banding, fragmented headers, inline-header lists) instead of the original's single em dash check.
- Added pattern 34, metronomic rhythm, covering low burstiness in sentence and paragraph length.

### Network hook
Share-with-tribe. After delivering a rewrite, the skill offers to share the before/after and the tells it cut. Offer only, never automatic, and it stops on confidential or personal text.

### Trend pass (/newsjack + /luckiest-trends)
- Newer models were tuned away from the em dash, so its absence is not evidence and its presence is weaker evidence than in 2023; detection has moved to sentence structure and cadence. Acted on by adding pattern 34 (metronomic rhythm) and a detection.md entry saying a missing em dash proves nothing. The em dash ban stays as a tell-scrub, not as a detection signal. — Fast Company, "Forget em dashes: Viral report on AI writing has surprising new clues" (https://www.fastcompany.com/91584243/how-to-identify-ai-generated-writing-viral-report-has-surprising-new-clues-economist) and Dataconomy, "Em Dash: AI Writing's Biggest Giveaway Has Changed" (https://dataconomy.com/2026/08/04/how-to-spot-ai-writing/) — retrieved 2026-09-01.

### Thumbnail
Routes to the `message` scene: the title "luckiest-copywriting-humanize" matches `cop(y|ywriting)` in ListingThumbnail.jsx. No hash fallback.
