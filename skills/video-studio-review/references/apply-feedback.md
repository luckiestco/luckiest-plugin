# Applying a review player prompt

A pasted prompt starts with `Motion OS feedback for "<title>" v<N>` (the player
is Motion OS underneath) and has up to four parts: Edits, Notes, Links, and
Scenes.

## Before anything

- **Version.** Compare `v<N>` with `version` in `<run-dir>/reel.json`. If the
  prompt is older, say so in one line: the user reviewed an earlier render, so
  check every edit's "before" value (below) instead of trusting its timing.
- **Run.** The `Project:` line is the run folder. Work only there.

## Edits

Each line reads:

```
- [00:01.2 · hook · Your invoices, done] Headline (storyboard.json scenes[0] · composition/compositions/hook.html): "Invoices, done" -> "Invoices, handled"
```

| Field label | Change |
|---|---|
| A variable's label (Headline, Value, ...) | `scenes[N].variables.<key>` to the new value exactly. The label is the key with its first letter capitalized and hyphens shown as spaces (`cta-text` shows as `Cta text`). |
| Footage | `scenes[N].source` |
| Timing (`[start, end]`) | the scene's `duration` (end minus start). Only for the scene named; later scenes shift on their own. |
| `Style · <color name>` (`#old -> #new`) | every variable holding `#old`, in every scene that is not approved |

Rules:

- Apply an edit only when the storyboard's current value equals the "before"
  value. If it does not, skip it and list it as changed since that render.
- An edit naming a scene id that is no longer in `storyboard.json` is skipped and
  reported, never guessed onto another scene.
- If the composition hardcodes the text instead of reading `variables`, move the
  text into `variables` first, then edit it.

## Notes

Each note has a timestamp, a scene, an x/y position in percent of the frame, and
the element it sits on. Notes starting with "Claude:" are your own pre-pinned
notes the user kept: treat them as agreed.

1. Grab the frame and look at it before deciding what the note means:
   `ffmpeg -v error -ss <t> -i <run-dir>/final.mp4 -frames:v 1 <run-dir>/qa/note-<i>.jpg`
2. Motion, pacing, and placement notes change the scene's composition or its
   `duration`.
3. A note on a demo scene about the footage itself (a typo in the product, a
   cursor jump) cannot be fixed by re-rendering. Say so, and offer a new
   recording or a trim through `sourceStart` and `duration`. For talking-head
   footage, hand it to `luckiest-video-studio-cuts`.

## Links

Download links into `assets/` only when they are clearly the user's own files.
Ask first otherwise.

## Scenes

The last block lists each scene as `in review`, `needs changes`, or `approved`.
Never touch an approved scene, even when an edit or note seems to point at it;
list those as skipped.

## After the changes

Re-render the touched scenes with `render-scenes.mjs --scene <id>` for each, then
look at a contact sheet before showing anything:
`ffmpeg -v error -y -i <run-dir>/final.mp4 -vf "fps=1,scale=320:-1,tile=6x6" -frames:v 1 <run-dir>/qa/sheet.jpg`.
Then rerun `build-reel.mjs`. The prompt
asks for version `N+1`; `build-reel.mjs` sets it. Reply with what changed, what
was skipped and why, and anything you could not do.

## Storyboard stage

A prompt whose Do line says "This is the storyboard" comes from a reel built with
`build-reel.mjs --storyboard`. Nothing is rendered yet, so:

- `Line` edits set `scenes[N].line`, and `Prompt` edits set `scenes[N].prompt`,
  with the same before-value check. When the run has a `script.md`, write the new
  line there too (the script sub-skill's Step 5).
- `timing (s)` edits set the scene's `duration`.
- Notes are read against the scene's still (`storyboard/<id>.png`), not a frame
  of `final.mp4`. A note about the idea (the hook is weak, a beat is missing)
  goes back to `luckiest-video-studio-director` to fix the shot list.
- A scene marked approved that also carries an edit was approved as edited:
  apply that edit, then leave the scene alone.
- Never render. Redraw only the stills whose scene changed, then rerun
  `build-reel.mjs --storyboard` so the player reloads at the next version.
- When every scene in the Scenes block is approved, apply any edits, then hand
  back to `luckiest-video-studio` for Step 2b. That is the storyboard gate.
