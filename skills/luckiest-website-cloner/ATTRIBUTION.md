# Attribution

`luckiest-website-cloner` and its three companion skills
(`luckiest-website-cloner-dom`, `luckiest-website-cloner-shaders`,
`luckiest-website-cloner-remix`) are the Luckiest edition of the open-source
**site-clone** skill collection, originally published as `clone-site`,
`dom-clone`, `shader-extract`, and `remix-site`. Licensed **MIT**; the upstream
license text is kept in `LICENSE`.

Changes in this edition:

- Renamed to the `luckiest-website-cloner*` family, with every cross-reference
  between the skills updated.
- Guardrails added to every skill entry point, not just the coordinator, since
  each one can be invoked directly. They now cover login walls, paywalls, bot
  walls, credential and cookie handling, and pages holding personal data.
- Added `references/builtin-browser-recipes.md` for running the probes from an
  in-app browser pane with no preload support.
- Frontmatter normalized to the Luckiest package format (tool allowlist,
  version, listing id).

`luckiest-website-cloner-shaders/vendor/web-shader-extractor/` is vendored
unmodified from the **web-shader-extractor** skill in the
[lixiaolin94/skills](https://github.com/lixiaolin94/skills) repository by
**lixiaolin94**, with a 2D-Canvas extraction contribution by
[Huazi](https://github.com/HeyHuazi). Licensed **MIT**. Update that folder by
re-pulling upstream rather than hand-editing it.

Retain this attribution and the MIT license text if you redistribute.
