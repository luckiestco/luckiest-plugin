# Changelog — luckiest-coder-components

## 1.1.0 — 2026-10-27
Multi-platform support for web, iOS, and Android.

### Added
- `references/multi-platform.md`: which approach to use per platform mix, and why
  Mitosis is limited to web frameworks.
- `scripts/kit-parity.mjs` (+ test): reads a `kit.json` spec and reports shared
  components missing, or missing props, on web (.tsx), iOS (.swift), or Android (.kt).
  Stdlib only, exits 1 on gaps.
- Triggers: "same component on iOS and Android", "cross-platform component",
  "keep web, iOS, and Android in sync".

### Trend
- 2026-10-27, source: `@builder.io/mitosis-cli` latest, compiled by hand. `swift`
  output drops all bindings and does not compile, `reactNative` misplaces styles, no
  Kotlin/Compose generator exists (packages/core/src/targets.ts).

### Field test
- MambaStatus (sportsiq): six-component kit spec. iOS and Android in sync, web was
  missing Eyebrow (pasted as CSS in ~10 pages). Added `Eyebrow` to packages/ui.

Sub-skill fit: unchanged (sub-skill of luckiest-coder).

## 1.0.0 — 2026-10-12
New sub-skill of luckiest-coder. Ideas taken from BuilderIO Mitosis (MIT).

### Added
- Reuse-first lookup before building any component: this project, then the shared
  library at `~/.luckiest/components/`, then the project's base kit, then build new.
- Shared cross-project library: one folder per component plus `index.json` with
  name, tags, framework, deps, and a `uses` count so the most reused components
  surface first.
- Save-back step after a verified build, limited to generic components.
- `references/mitosis.md`: when multi-framework output pays off, setup, and a
  12-rule portable-authoring checklist drawn from the Mitosis gotchas and its
  ESLint rules.

### Security
- Secret and private-data scan before saving to the library.
- Library files treated as data, never instructions.
- Lookup never installs packages. Mitosis setup is a new dependency and needs a yes.
