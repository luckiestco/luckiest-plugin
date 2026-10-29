# 60s Title Sequence

- id: `spy-titles`
- Source: Lemo-Opuscar `styles/spy-titles/STYLE.md` (MIT, lemomo-ai)
- Best for: product launch teasers, chase or delivery stories, team or lineup reveals, event and festival openers, a brand name revealed as the last thing assembled. 15-60s
- Not for: calm explainers, fine data, long voiceover, realism. Not `kinetic-type` (that is type slams on flat color fields with spring overshoot, no physical paper, no figures). Not `cut-paper` (that is soft, rounded, organic shapes with a wall-pinned playful feel, no chase, no brass edit points).
- Triggers: saul bass, spy titles, 60s title sequence, opening credits, silhouette chase, cut-out titles, retro credits, big band, surf guitar, mid-century graphic, catch me if you can, north by northwest, vertigo titles, noir credits
- Tone cell: kinetic-sharp
- Clock: stepped 12 fps for figures, letters and vehicles (on twos), 24 fps for camera, credit slides and grid growth (on ones)

## Look
Four flat opaque inks on paper, no gradients. Every shape has a hand-cut edge, and stacked pieces are separated by a thin cut gap in the ground color plus a small paper shadow. Figures are profile silhouettes in outline and timing only: tall, hat or coat as identity, one accent color that streams behind them as a motion cue, no faces. Credits are the set itself: letters become pillars, words become carriages, a letter becomes a door. Diagonals near 30 degrees, big flat grounds, figures small against type. The hero object of the chase sits on a black backing and is the brightest thing in frame. One paper-texture pass over everything, light grain.

## Motion
Figures, hands, landing letters and vehicles move on twos. Run cycle about 8 drawings, one step per beat, strong lean, accent flying back. Camera and credit slides move on ones, because a stepped camera judders. Credits slide along grid lines and stop dead on the beat with a short ease-out, letters land with a paper slap. Brass stabs are the edit points, and every location change is a hard cut on a stab, never a dissolve. At a big stab the whole picture, background included, freezes for a couple of beats of true silence, then resumes. Match cuts keep shape, center and size identical. A diagonal cut can multiply into a grid whose pieces later fly back to assemble the title.

## Signature features (judged against these)
- Exactly four inks (black, cream, one hot color, one warm secondary), flat, no gradients.
- Cut edges that stay attached to the piece as it moves, not crawling in screen space.
- Cut gap and small paper shadow between layered pieces.
- Silhouette figures with one accent color and no faces.
- Credits that are architecture or props, each line fully readable once.
- Picture cut on brass stabs, with one stop-time freeze in silence.
- Graphic match cuts and lateral tracking in one direction.
- The final title assembled from pieces, resolving to the real logo.

## 10-second beat seed
- 0-1s: wide on a full credit line on the first ground color, hero already in frame as a small silhouette.
- 1-3.5s: lateral chase along the line, twos figure, ones camera, a stab at 2.5s hard-cuts to the second ground color.
- 3.5-6s: match cut on a circle (wheel to coin to moon), the object of the chase lands on its black backing, diagonal split begins.
- 6-7s: stop-time freeze on a stab, true silence, then resume.
- 7-8.5s: diagonal pieces fly back along the grid toward center.
- 8.5-10s: the pieces assemble the real logo with paper slaps, then resolve to the logo SVG (see Logo construction).

## Sound
Mid-century big band: staccato brass stabs in octaves with a crash, spring-reverb surf guitar, walking upright bass, brushes, bongos, vibraphone, minor key and dotted rhythm. Original motif only, never a famous theme. Place each stab about 8 ms early so its peak lands on the frame. Foley: paper cuts, slides and slaps, key clicks. Silence during stop-time is true zero. Duck music about 7 dB under voice, mix to -14 LUFS.

## Build it in HyperFrames
Canvas 2D or SVG with every frame a pure function of time t, no timers, no Math.random. Build each shape from a polygon resampled every 9-10 px, displaced along its normal by seeded low-frequency noise, computed once in local space and cached per piece. Figure pose index = floor(t * 12) mod N, camera and slide positions use continuous t sampled at 24 fps. Cut gap via a ground-color stroke, paper shadow via offset and blur. Merge a figure's parts on an offscreen layer and cut only joint slits (destination-out). Texture and grain as one multiplied overlay. Stab times from a beat grid, stop-time by clamping t for all layers over the freeze window. Fonts: League Gothic for credits and League Spartan for subtitles (both OFL), or brand faces; re-cut each glyph with small edge noise, tiny rotation and baseline jitter.

## Logo construction
Rule from logo-design (MIT, kaankiziltug): the entrance is built from the mark's own construction, and the resolve frame equals the master logo. Before animating, write the mark's construction in one line in `plan.md` (its primitives, strokes or modules, and the order they would be drawn). The resolve frame is the real logo file (`brand/logo.svg` or the SVG the user supplied), never a styled stand-in or an invented wordmark: render the last frame and the logo SVG at the same size and position, and any visible difference is a Block. Sting length 1 to 3 seconds, easing from this card.
- Construction: the mark is cut from the four inks and assembled from its own parts. Pieces fly in along the diagonal grid in the mark's construction order (largest shape first, then cuts and counters), each landing on a stab with a paper slap and a cut gap, on twos.
- Resolve: on the final stab the cut gaps close, edge noise and paper shadow fade out over 2 to 4 frames, and the frame settles on the crisp logo SVG in brand colors. A rough cut-letter wordmark is never the resolve.

## Watch out
Outlining every internal piece makes figures look like mannequin diagrams, so merge first. Black props on a black ground read as letters, so use a darker ground color. An object in its ground's ink vanishes, so give it the black backing. A credit shown only in part is hard to read, so open wide on the full line. Never copy a real title's lettering, characters or shots, and credits use fictional roles only. Colors map onto the brand palette by role (ground, figure, hot accent, chase object). Example only: black `#1b1714`, cream `#efe4c9`, red `#d23a22`, mustard `#e2a52a`.
