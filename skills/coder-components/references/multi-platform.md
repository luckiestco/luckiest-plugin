# Multi-platform components: web, iOS, Android

Read this when one component must exist on more than one platform: a web app plus a
native iOS (SwiftUI) or Android (Jetpack Compose) app, or React Native.

## Pick the approach

| Platforms | Approach |
|-----------|----------|
| Two or more web frameworks (React + Vue, Svelte, ...) | Mitosis, see `mitosis.md` |
| Web + React Native | Shared logic in plain TS, one view per platform. Mitosis RN output is not usable as-is |
| Web + SwiftUI and/or Compose | Kit spec + native view per platform + parity check (below) |
| One platform | Native code. Nothing to share |

Why not Mitosis for native: tested 2026-10-27 with the latest `@builder.io/mitosis-cli`.

- `swift` drops every `{expression}` binding (`Text("")`), types props as `Any`, ignores
  styles, and emits unbalanced braces, so the output does not compile.
- `reactNative` puts text styles on `<View>` instead of `<Text>` and passes the `css`
  prop through raw, so CSS vars and `"10px"` strings reach RN.
- There is no Kotlin or Compose generator.

Re-test before trusting a newer release: compile one small component with
`npx @builder.io/mitosis-cli compile --to=swift <file>.lite.tsx` (ask first, it
downloads a package) and read the output.

## What to share instead

Native views stay hand-written. Everything under them is written once:

1. **Logic.** Pure TS with no UI deps (rules, state machines, formatting). Native apps
   get it as generated JSON data, never a copy of the code.
2. **Tokens.** One token source emitting CSS variables for web and a JSON file for
   native. Views read tokens, never raw hex.
3. **Kit spec.** `kit.json` names every shared component and its props. It is the
   contract the three views must match.

## Kit spec and parity check

```json
{
  "roots": {
    "web": "packages/ui/src",
    "ios": "apps/ios/MyApp",
    "android": "apps/android/app/src/main/java"
  },
  "components": [
    { "name": "Eyebrow", "props": ["text"] },
    { "name": "Card", "props": ["title", "badge"] },
    { "name": "WideButton", "props": ["label", { "name": "action", "android": "onClick" }] },
    { "name": "OverflowMenu", "props": ["label"], "skip": ["web"] }
  ]
}
```

A prop is a name, or `{ "name", "web"?, "ios"?, "android"? }` when a platform uses its
own idiom (`onClick` in Compose for Swift's `action`). `skip` lists platforms that
deliberately do without the component.

Run from the project root:

```bash
node <this skill>/scripts/kit-parity.mjs kit.json
```

It finds `struct <Name>` in `.swift`, `fun <Name>(` in `.kt`, and
`export const|function <Name>` in `.tsx`/`.ts`. Names match case-insensitively with an
`MS`/`Ms` style prefix allowed (`MSCard`, `MsCard`, `Card`). For each hit it checks
that every spec prop name appears in the declaration. It prints one line per gap and
exits 1 when there are any, so it can run in CI.

## Adding or changing a shared component

1. Update `kit.json` first.
2. Build it on the platform that needs it now, following that app's rules.
3. Run the parity check. Each gap is a task for the other platforms: build it there or
   note in `kit.json` why that platform skips it (`"skip": ["android"]`).
4. Never let the same component live as copy-pasted CSS classes on web. Make it a
   component so parity can see it.
