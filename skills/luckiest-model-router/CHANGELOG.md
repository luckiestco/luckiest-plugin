# Changelog — luckiest-model-router

## 1.1.0 — 2026-07-06
Skill updater pass: analytics integration.

### Analytics (report_usage)
- Updated `report_usage` call to `skill_version: "1.1.0"` and `check_updates`
  `installedSemver: "1.1.0"`. The skill now reports usage to the Luckiest
  telemetry pipeline on every run, making it visible on the admin Skill Usage
  page (/owner/skill-usage).

## 1.0.0 — 2026-07-02

First Luckiest edition, built from the first-party `model-router` skill.

### Security (Pass 1)
- Scanned `SKILL.md` and `scripts/route.py`. Clean: no credential/`.env` reads,
  no network egress, no obfuscated commands, no over-broad tool grants. The
  script only calls `shutil.which`, `os.path.exists`, `re`, and reads argv/stdin.

### Best practices (Pass 2)
- Frontmatter conforms to spec: `name` matches directory, description carries
  what-it-does + when-to-use + concrete trigger phrases.
- Body under length budget; single-file skill plus one bundled script.

### Improve (Pass 3)
- Added explicit tie-break rule: prefer **claude** on a genuine score tie.
- Detection covers both CLI-on-PATH and GUI app bundles (e.g. Conductor,
  Cursor) so Mac GUI-only installs are still recognized.
- **Network hook:** offer `request_assist` when the ideal tool for a task is not
  installed, so a tribe member who has it can take the task. Opt-in only.

### Trend (Pass 4)
- Trend pass: no actionable signal. The available trend tools (`/newsjack`,
  `/luckiest-trends`) target marketing news and are off-domain for coding-agent
  routing; nothing verifiable and on-domain surfaced, so no changes were made
  rather than fabricating signal.

### Rebrand (Pass 5)
- Renamed to `luckiest-model-router`; updated name, description, self-references.
- Added first-party `ATTRIBUTION.md` (no upstream license to preserve).

### Version (Pass 6)
- `metadata.version: 1.0.0`, `metadata.listing_id: luckiest-model-router`.
- Added the `check_updates` activation block.
