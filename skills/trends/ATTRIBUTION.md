# Attribution

This skill is adapted from the **"last30days"** skill in the last30days-skill
project (https://github.com/mvanhorn/last30days-skill) by Matt Van Horn
(mvanhorn), used under the MIT License.

The multi-source research engine (`scripts/`), its source adapters, ranking,
and rendering are carried over from the original. The Luckiest edition
rebrands the command and output to `luckiest-trends`, distills the operating
contract into a lean `SKILL.md` (the full original contract is preserved at
`references/engine-contract.md`), surfaces the `--days N` time window as a
first-class feature, and adds the Luckiest update-check and share-with-tribe
hooks. See `CHANGELOG.md` for the full record.

The original engine's technical identifiers (`scripts/last30days.py`,
`LAST30DAYS_*` environment variables, `~/.config/last30days/`) are kept
unchanged so the mature engine runs as-is.

## Original license

```
MIT License

Copyright (c) 2026 Matt Van Horn

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
```
