---
name: video-studio-ae
description: >-
  Rebuild the motion and logo scenes of a luckiest-video-studio run as editable
  Adobe After Effects compositions, one precomp per scene, through the
  luckiest-ae-mcp server: import the logo, convert it to shapes, draw it on with
  Trim Paths, mask, keyframe, parent, precompose, and render to MOV. Timing comes
  from the run's storyboard.json, so the After Effects version matches the
  HyperFrames render. Usually driven by luckiest-video-studio with --ae. Trigger on
  "open this in After Effects", "make it editable in AE", "rebuild the logo
  animation in After Effects", "export an AE project of the video", or "AE handoff".
argument-hint: "<run-dir with storyboard.json> [--scene <id>]"
user-invocable: false
license: MIT. See ATTRIBUTION.md
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
metadata:
  version: "1.0.0"
  listing_id: luckiest-video-studio-ae
  author: luckiest
---

# After Effects handoff

Turn a rendered run into After Effects compositions a designer can keep editing.
The HyperFrames render stays the timing reference; this track rebuilds each scene
with real layers, keyframes, and precomps.

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "luckiest-video-studio-ae", installedSemver: "1.0.0" }`. If
`upToDate: false`, surface the `notice` once and continue. Never block on it.

When done, call `report_usage` once with
`{ listing_id: "luckiest-video-studio-ae", skill_version: "1.0.0", matched: true, success: <true|false> }`.
Metadata only. Skip silently if unavailable.

## Standing rules

1. **Ask before any install or elevation.** Name the step and why.
2. **Never run arbitrary ExtendScript.** Use only the tools listed below. The bridge
   accepts strict JSON commands and an allowlist of scripts; do not work around it.
3. **Work on a copy.** Save the After Effects project to the run folder
   (`<run-dir>/ae/<title>.aep`), never over a project the user already had open.
4. **Client marks stay untouched.** Import logos as they are; never redraw or
   recolor a client's mark.

## Step 0: Setup (once per machine)

Check in this order and stop at the first gap, telling the user what to do:

1. **After Effects** 2021 or later is installed.
2. **The MCP server is built.** In the `luckiest-ae-mcp` folder:
   `npm install --ignore-scripts && npm run build` (ask first; it downloads its
   dependencies).
3. **The MCP server is connected** to the agent, for Claude Code:
   `claude mcp add luckiest-ae -- node <luckiest-ae-mcp>/build/index.js`
4. **The bridge panel is installed:** `node install-bridge.js`. If it reports that
   the copy needs administrator rights, show the user the printed command. Only
   rerun with `--yes` after the user agrees to the password prompt.
5. **After Effects allows it:** Settings, Scripting & Expressions, enable "Allow
   Scripts to Write Files and Access Network", restart After Effects.
6. **The panel is open:** Window, `mcp-bridge-auto.jsx`, with Auto-run on.

Confirm with the `run-bridge-test` tool, then `get-results`.

## Tools

Dedicated tools (each waits for the result):

| Tool | Use |
|---|---|
| `importFile` | Import SVG, AI, PDF, PNG, footage, or audio; `compName` adds it as a layer; `convertToShapes: true` runs Create Shapes from Vector Layer |
| `trimPaths` | Add Trim Paths and animate End 0 to 100 for a draw-on |
| `precompose` | Move layers into a new comp, one per scene or logo |
| `setParent` | Parent a layer, or clear it with `parentIndex: null` |
| `render` | Render Queue to `.mov`, `.mp4`, `.avi`, `.png`, `.tif`; `queueOnly` to leave it queued |
| `create-composition` | New comp with size, fps, duration, background |
| `setLayerKeyframe`, `setLayerExpression` | Animate any property |
| `apply-effect`, `apply-effect-template` | Glow, blur, shadow, and templates |

Through `run-script` (queue, then `get-results`): `createTextLayer`,
`createShapeLayer`, `createSolidLayer`, `setLayerProperties`,
`batchSetLayerProperties`, `setLayerMask`, `duplicateLayer`, `deleteLayer`,
`createCamera`, `setCompositionProperties`, `listCompositions`, `getProjectInfo`,
`getLayerInfo`.

## Step 1: Read the run

Read `<run-dir>/storyboard.json`, `brand.json`, and `TIMING.md`. Rebuild `motion`
and `logo` scenes only; `demo` scenes stay as footage. With `--scene <id>`, rebuild
only that scene.

## Step 2: Master comp, then one precomp per scene

There is no tool that places an existing comp inside another, so build every scene
inside one master comp at its start time, then precompose each scene's layers.

1. `create-composition` named `<title> master` at the storyboard's width, height,
   and fps, with the total duration from `TIMING.md` and background `brand.paper`.
2. For each `motion` and `logo` scene, add its layers to the master with
   `startTime` set to the scene's in time from `TIMING.md` and the scene's
   `duration`. Build by recipe (the look is in
   `luckiest-video-studio/references/logo-recipes.md`):

| Recipe | After Effects build |
|---|---|
| `line-draw` | `importFile` the SVG with `compName` = master, `startTime`, `convertToShapes: true`; `trimPaths` with the scene's draw time and `trimMultipleShapes: "individually"` for a stagger; keyframe fill Opacity after the draw |
| `mask-wipe` | Import; `setLayerMask` with a feathered rectangle; keyframe the mask expansion across the reveal |
| `piece-assembly` | Import with `asComposition: true` so each group is a layer; keyframe Position and Opacity per layer; `setParent` to a null for the final settle |
| `sting` | Text or logo layer; Scale keyframes 130 to 100 with ease; one shape ring with Scale and Opacity keyframes |
| `wall` | Import every logo; `setLayerProperties` into a grid; staggered Scale and Opacity keyframes |
| `particle-build`, `ink-bleed`, `facet` | `importFile` the scene's rendered clip from `clips/` and note the effect stays rendered; offer a simpler native reveal |
| Motion scenes | Rebuild text with `createTextLayer` and shapes with `createShapeLayer`; copy timings from the composition's GSAP timeline |

   Keyframe times are absolute in the master: scene in time plus the time inside
   the scene. `power2.out` maps to an ease-out with about 75% influence.
3. `demo` scenes: `importFile` the rendered clip from `clips/` at its start time.
4. `precompose` each scene's layers into a comp named `NN-<id>` so every scene can
   be opened and edited on its own. With `--scene <id>`, rebuild only that scene's
   layers and precompose them.

## Step 3: Render and save

1. Ask whether to render now. If yes, `render` the master to
   `<run-dir>/ae/<title>.mov` with `outputModuleTemplate` "High Quality";
   otherwise pass `queueOnly: true`.
2. Tell the user to save the project (File, Save As) into `<run-dir>/ae/`.

## Done when

Every scene has its own precomp with timing that matches `TIMING.md`, the master comp
plays the run in order, and the user knows where the project and any render are.
