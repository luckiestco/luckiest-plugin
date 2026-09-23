# Built-in browser recipes (no playwright-cli)

Use these when the only browser you can drive is the in-app browser pane
(`navigate`, `javascript_tool`, `computer`, `get_page_text`, `read_page`). This
path has **no preload**, so `instrumentGetContext()` and `instrumentMotion()`
cannot run before the page's own scripts. Everything here is post-hoc. That is
still reliable for the common case; it is weaker for canvases that request their
context once at startup and for motion that only fires on first paint.

## Inject the probe bundle

Build it once, then paste it in. `javascript_tool` cannot read local files, so
inline the bundle's text rather than pointing at a path.

```bash
node scripts/build-bundle.cjs /tmp/probes.bundle.js
```

Then evaluate the file's contents in the page, followed by the probe call. Do it
in two steps so a syntax error in the bundle is easy to tell apart from a probe
error.

## Settle the page before probing

```js
(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 800));
  return h;
})()
```

## Probe and write out

`javascript_tool` returns its last expression as JSON, and large probe output
will blow up the conversation. Take `motionSummary()` inline for a first look,
and for the full `motionProbe()` / `tokensProbe()` output return it in chunks
and write each chunk to the output directory from the shell, or keep only the
fields you need:

```js
JSON.stringify(surfaceMap())          // small, safe inline
JSON.stringify(motionSummary())       // small, safe inline
JSON.stringify(tokensProbe()).length  // check size BEFORE returning the body
```

## Expect `instrumented: false`

`motionProbe().instrumented` will be false on this path. That is expected, not a
failure. Record it in the surface map so the teardown does not claim ground
truth it does not have, and treat canvas routing as a hypothesis to confirm with
a screenshot.

## Screenshots and viewports

Use `resize_window` for the 1440 / 768 / 390 passes and `computer` with
`action: "screenshot"` for section references. Reload after a viewport change so
load-time breakpoints re-run.

## Assets

```js
JSON.stringify(performance.getEntriesByType('resource').map(e => e.name))
```

## Viewport reads can come back zero

In a hidden or background pane, `window.innerWidth` / `innerHeight` can report
`0` even though the page laid out correctly and every `getBoundingClientRect()`
is real. Do not treat a zero viewport as a failed probe, and do not record it as
the breakpoint you measured at. Front the tab, or take the width you asked
`resize_window` for as the truth.
