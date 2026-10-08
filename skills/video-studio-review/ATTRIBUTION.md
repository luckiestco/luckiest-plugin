# Attribution

This skill is adapted from the "motion-os" skill and player in Motion OS
(https://github.com/jasonlee-breadcrumb/motion-os) by Jason Lee, used under the
MIT License. The license text is kept in `LICENSE-motion-os` and repeated below.

The player was copied from upstream commit `15dc59eb` (2026-10-04). That commit is
pinned in `packages/luckiest-skills/upstreams.json`, so the weekly upstream watch
opens an issue when Motion OS changes.

## What this edition uses

- `editor/index.html` and `editor/serve.mjs`: the Motion OS player and its local
  server. One change: the "Do" line of the prompt the player builds names
  `luckiest-video-studio-review` instead of `motion-os`. The player UI and the
  prompt's "Motion OS feedback for" opening keep the Motion OS name.
- The `reel.json` format, written by `scripts/build-reel.mjs` from a
  luckiest-video-studio `storyboard.json`.
- The feedback rules in `references/apply-feedback.md`, rewritten for
  `storyboard.json` and per-scene re-renders.

## Changes in this edition

- Named the review player and made it a sub-skill of luckiest-video-studio and
  the review step of luckiest-video-studio-cuts.
- Dropped the Remotion build and live-render instructions: scenes render with
  HyperFrames, so `reel.json` never sets `live` or `export`.
- Added Claude's own pre-pinned review notes, a check that an edit's "before"
  value still holds, and the no-browser fallback.
- Security review: `luckiest-video-studio/SECURITY.md` S48 to S50.

## License

MIT License

Copyright (c) 2026 Jason Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
