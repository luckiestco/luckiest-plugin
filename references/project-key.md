# Project key

The Luckiest plan tools (`status`, `plan`, `apply`, `verify`, `finish`, `pause`)
take an optional `project` value so each project keeps its own separate plan.
The MCP server is hosted and cannot see your folder, so you must compute this
key locally and pass it.

## How to derive it (do this once per session, before the first plan tool call)

1. Run: `git config --get remote.origin.url`
2. If it returns a URL, normalize it to `host/owner/repo`, lowercased, with any
   `.git` suffix removed. Examples:
   - `git@github.com:acme/app.git` becomes `github.com/acme/app`
   - `https://github.com/acme/app.git` becomes `github.com/acme/app`
3. If step 1 returns nothing (not a git repo), run `pwd` and use that absolute
   path as the key.
4. If there is no local shell at all (web chat, Cowork), omit `project` entirely.
   Those surfaces share one plan, which is correct for them.

## How to use it

Pass the SAME `project` value on every plan tool call for the rest of the
session: `status`, `plan`, `apply`, `verify`, `finish`, `pause`. Do not change it
mid-session and do not recompute it per call. One project, one key, all session.
