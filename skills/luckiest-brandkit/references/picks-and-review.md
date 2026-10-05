# Picks, notes, and set review

Load this at the test batch, at every A/B pick, when the user gives a note, and before delivery. These are the stills-specific art-direction calls. The look itself (palette, accent budget, faces, rules with reasons) comes from `luckiest-video-studio-art-director` sections 0, 0b, and 3.

## Test batch and picks

Ask for 3 shots that stress the direction differently (one object, one print
piece with text, one device or scene), 2 variants each.

For each shot, pick one and say why in one line. Reject a variant, however
striking, when it:

- adds a second accent color or a second accent dot
- adds a frame, a colored wall, props, or more set planes than the block allows
- changes the light side or softens the shadows
- prints text that is not on the shot's text list

Then judge the three picks together. They should read as one shoot: same light,
same palette, same grain. If one is the odd one out, reshoot it before locking.

## Turn user notes into direction

The user's notes are about the set, even when they name one shot. Translate
each note into a lever change and apply it to every shot:

| Note heard | Lever change |
|---|---|
| "Too many platforms" | Set: max two planes, used as leading lines |
| "Make the poster more creative" | Camera and light for the poster series. Use the poster series recipe in prompt-recipes.md |
| "Shrink the text 20%" | Type: headline share of the object width, written as a percent |
| "Add the logo somewhere" | Type: name the placement and attach the wordmark reference |

Rerun the test batch after any lever change. Lock only after a clear approval.
Write the locked model, picks, and recipe under "Locked" in `prompts.md`, so the
remaining shots use it word for word.

## Contact sheet review

Open `final/contact-sheet.png` and review the set as a whole before any single frame:

1. **Squint.** The accent color appears once per frame, in the same role.
2. **Light.** Every shadow falls the same way. Flag any shot lit from another side.
3. **Rhythm.** Neighboring shots vary angle and scale (rule 13 in luckiest-video-studio-composition). Three identical angles in a row read as a template.
4. **Exceptions.** Any shot that breaks the direction on purpose (exact
   artwork on a billboard, for example) is named in `qa.md` with the reason.

Append one line per shot to `qa.md`: keep, or reshoot with the lever to change.

