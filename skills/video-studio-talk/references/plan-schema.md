# Talk plan schema

`validate-plan.mjs <run-dir>/talk` reads three files from `talk/assets/`. Times are
seconds on the cleaned clip. Fields starting with `source` are on the input of the
last cut pass.

## plan.json

```json
{
  "duration": 10,
  "fps": 30,
  "scenes": [{ "id": "s00", "start": 0, "end": 10, "layout": "face", "kind": "hook",
               "anchor": "First three words", "anchorTime": 0.1 }],
  "events": [{ "time": 0, "type": "card-in", "visual": "s00", "anchor": "First three words" }],
  "captions": [{ "start": 0.1, "end": 0.8,
                 "words": [{ "text": "First", "start": 0.1, "end": 0.3 }] }]
}
```

- Scenes cover the whole duration with no gap or overlap, start on a frame, and
  have an `anchor` phrase whose `anchorTime` sits within 0.15 s before to 0.2 s
  after the scene start.
- `layout` is `face`, `split`, `paper`, `broll`, or `broll-split`. For B-roll
  layouts, `kind` names `assets/<kind>.mp4`.
- `events` are real visual actions. A gap over 2.2 s needs a `holdReason` on its
  scene.
- `captions` hold every spoken word, in order, with the transcript's exact timing.
  Groups do not overlap or cut a word short.

Plan scene ids match `storyboard.json` scene ids wherever they are the same stretch.

## transcript.json and edit-decisions.json

Copy `footage/clean.json` to `transcript.json`, and the EDL of the last cut pass
that changed the video (`raw.mistakes-edl.json`, or `raw.silence-edl.json` when no
mistakes were cut) to `edit-decisions.json`. The validator converts the cuts
format (bare word array, `source_start`, `keep_ranges`) itself. Every kept word
must map back into one kept range without crossing a cut.

## footage-ledger.json (only with B-roll)

```json
[{ "scene": "s02", "sourceSceneId": "wallet-opening", "asset": "assets/wallet.mp4",
   "sha256": "<64 hex characters>", "sourceStart": 0.5, "sourceEnd": 1.5 }]
```

`validate-footage.mjs` checks one row per B-roll scene, the file hash, no repeated
scene identity, and no overlapping intervals of the same file.

## Negative controls

A validator that never fails is not a check. Before trusting it on a new project,
shift one caption by 0.3 s or drop one word and confirm it fails.
