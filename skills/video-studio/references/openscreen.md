# Editing on the OpenScreen timeline

OpenScreen (MIT, `getopenscreen/openscreen`) is the timeline for editing after the
render: trim, reorder, re-zoom, speed ramps, captions, annotations, and export. This
skill writes its project file; the user opens it and clicks **Export**.

## Requirements

- OpenScreen **1.13.0** at `/Applications/Openscreen.app`. Install from the GitHub
  releases page only when the user agrees; the macOS build is signed and notarized.
- On first launch macOS asks for Screen Recording and Accessibility. Recording
  needs both; opening and exporting a project does not.

## Write the project

```bash
node <skill-dir>/scripts/assemble-openscreen.mjs <run-dir>            # into ~/Movies/Openscreen/<slug>/
node <skill-dir>/scripts/assemble-openscreen.mjs <run-dir> --name acme-launch
```

It copies media into `~/Movies/Openscreen/<slug>/`, writes
`<slug>.openscreen` beside it, and leaves the project path in
`<run-dir>/project.openscreen.txt`.

- Motion and logo scenes go in as their rendered clips.
- Demo scenes go in as the **raw footage** with in and out points from
  `sourceStart` and `duration`, so a trim can be widened in the editor. A recorded
  `<video>.cursor.json` is copied too, so OpenScreen's editable cursor and
  auto-zoom work.
- The music bed is not placed on the timeline; it is in `final.mp4`. Add music in
  OpenScreen from the timeline toolbar if the edit needs it.

## Hand it to the user

Tell them, in this order:

1. Open OpenScreen, **File → Open Project**, choose the path in
   `project.openscreen.txt`.
2. Edit on the timeline.
3. Click **Export** in the top bar, pick MP4 and a resolution.

## Record demo footage

```bash
/Applications/Openscreen.app/Contents/MacOS/Openscreen record --window "<App name>" --duration 20 --json
```

Recordings land in OpenScreen's recordings folder with a `.cursor.json` beside
them. Copy the video (and its cursor file) into `<run-dir>/demo/` and point the demo
scene's `source` at it. Recording needs a real desktop session; ask before starting
it, since it captures the screen.

## Known limits of 1.13.0

| Limit | Handling |
|---|---|
| Rejects `schemaVersion: 8` | The script writes 7. Version 8 only adds an Auto aspect default. |
| CLI `export` reads only the legacy single-recording format | Export from the editor's **Export** button. |
| Approves media only in its recordings folder or the project's own folder | The script copies all media next to the project file. |
| The project format may change between releases | Test a newer release before raising `SCHEMA_VERSION` in the script. |
