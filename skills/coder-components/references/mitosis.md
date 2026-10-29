# Multi-framework components with Mitosis

Read this only when one component must ship to two or more frameworks (for example a
design system used by a React app and a Svelte app). For a single framework, keep the
component in that framework's native code.

Mitosis compiles one `.lite.tsx` source to native React, Vue 3, Svelte, Angular, Solid,
Qwik, Preact, Lit, Stencil, Alpine, web components, and more. The `.lite.tsx` file is
the canonical source in the library; generated outputs are build artifacts, never
edited by hand.

## When it pays off

- Same component needed in 2+ frameworks: yes.
- One framework now, maybe another later: no. Port when the second framework is real.
- Heavy framework-specific behavior (React Server Components, Svelte stores, complex
  animation libs): no. Write it natively per framework.

## Setup (ask first, it adds dependencies)

```bash
npm create @builder.io/mitosis@latest
```

Or in an existing library folder, add `mitosis.config.js`:

```js
module.exports = { files: 'src/**', targets: ['react', 'vue', 'svelte'], dest: 'output' };
```

- `mitosis compile --to=<target> <file>.lite.tsx` compiles one file to one target.
- `mitosis build` compiles the whole `files` glob to every target. `--targets` adds,
  `--exclude-targets` removes.

## Authoring checklist

Each line is a rule the compiler or `@builder.io/eslint-plugin-mitosis` enforces.
Breaking one fails the parse or produces wrong code in some targets.

1. One component per file, as the single default export. Only imports and the default
   function at top level.
2. State lives in `useStore({ ... })`, assigned to `const state`. Mutate it directly
   (`state.list = [...state.list, x]`).
3. No `async` methods on state. Use a promise chain or `void (async () => { ... })()`.
4. Never initialize state from props. Start with a literal and set it in `onMount`.
5. Never initialize state from a function call. Set it in `onMount`.
6. No destructuring of state, no destructured props with defaults, no `...rest` props.
   Read `props.x` and `state.x` directly.
7. No local variable named the same as a state property or a prop. It shadows the
   value in compiled output.
8. No variable declarations or `if` logic inside the returned JSX. Use `<Show when>`
   instead of ternaries and `<For each>` instead of `.map`.
9. Event handlers in JSX are arrow functions with the event argument named `event`.
10. Refs: use `useRef`, and never read `.current`. Mitosis handles that per target.
11. Styling: `css={{ ... }}` with literal values only (no JS variables in `css`), an imported
    `.css` file, or a headless component that takes `class` from the parent. Use
    `class`, not `className`.
12. Lifecycle: `onMount`, `onUnMount`, `onUpdate`. Context: `createContext` and
    `useContext` from `@builder.io/mitosis`.

## Verify

Lint with the Mitosis ESLint plugin, then build, then render each target in a small
test app. A component is library-ready only when every configured target renders it.

Docs: https://mitosis.builder.io/docs/ (gotchas, components, configuration, CLI).
