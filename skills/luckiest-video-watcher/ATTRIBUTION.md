# Attribution

This skill is adapted from the "watch" skill (version 0.3.2) in claude-video
(https://github.com/bradautomates/claude-video) by Bradley Bonanno, used under
the MIT License.

- `scripts/*.py` are copied unchanged from `skills/watch/scripts/`.
- `references/watch-guide.md` is the upstream `skills/watch/SKILL.md` body, from
  "Resolve the skill and interpreter" on, unchanged apart from a short header.
- `SKILL.md` is new: Luckiest modes (quick and study), standing rules, the
  render review and style study outputs, and the Luckiest update and usage calls.
- Not included: the upstream plugin's SessionStart hook (`hooks/`), because
  skills do not ship hooks.

The full upstream license is in `LICENSE-claude-video` and below.

MIT License

Copyright (c) 2026 Bradley Bonanno

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
