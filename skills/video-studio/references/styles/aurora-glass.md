# Aurora Liquid Glass

- id: `aurora-glass`
- Source: mg-styles-15 `prompts/12-aurora-glass.md` (MIT, Vincentwei1021)
- Best for: AI product launch, premium software reveal, OS or app feature film, slow luxurious tech brand pieces
- Not for: high energy, comedy, hand-made looks, anything fast
- Triggers: glassmorphism, liquid glass, aurora, mesh gradient, frosted glass, blur gradient, iOS 26, AI launch, translucent, soft glow, premium tech
- Tone cell: calm-soft
- Clock: smooth 30/60 fps

## Look
Deep indigo-black base. 4-5 aurora blobs in adjacent hues only (violet, blue, cyan, magenta), blurred 80-150px, blended into a mesh gradient. 3-5% noise dither across the frame to kill banding. Frosted glass cards: backdrop blur about 30px (range 20-40), 5-10% white fill, 1px inner highlight at 30% white, large corner radius. Micro-UI inside (chat bubble, voice waveform, toggles). Light elegant sans for the title, for example an invented "Aurora, think in light". Dark base with bright blobs works better than a light base.

## Motion
Everything slow. Blobs drift on bezier paths, 20-40 second loops. Cards float in with parallax depth and slight 3D tilt. Micro-UI enters with opacity plus an 8px rise only. Easing is sine or near-linear breathing. The wow moment: a Liquid-Glass lens (true refraction, chromatic dispersion on the rim, specular edge) glides across and magnifies the aurora and cards. Nothing fast.

## Signature features (judged against these)
- Large blurred color blobs drifting slowly, adjacent hues only.
- Glass cards with blur, 5-10% white fill, 1px 30% white edge, big radius.
- Refracting lens with rim dispersion and specular edge.
- 3-5% noise dither, no banding.
- Sine or linear easing, text enters by opacity plus 8px rise.
- Parallax depth and subtle 3D tilt on cards.
- No sudden or fast motion anywhere.

## 10-second beat seed
- 0-1.2s: aurora already breathing, first card eases in.
- 1.2-4s: cards float in with parallax, micro-UI animates.
- 4-7s (hero at 60-75%): glass lens glides across, magnifying cards and aurora.
- 7-8.5s: title fades in with the 8px rise.
- 8.5-10s: hold, blobs still drifting.

## Sound
Ambient cinematic pad, soft shimmer, very subtle UI ticks.

## Build it in HyperFrames
WebGL2 shader for the aurora: sum of soft radial falloffs at Bezier/Lissajous positions, plus blue-noise dither. Glass cards in DOM with CSS backdrop-filter, or draw them in the same shader by sampling a blurred copy. Lens: SDF rounded shape that offsets the sample UV by the SDF gradient and splits RGB with slightly different offsets. Positions are closed-form sines of t, so every frame is deterministic.

## Watch out
backdrop-filter may not render in headless capture: test, and fall back to a shader blur. Banding in the dark gradient. Muddy colors if non-adjacent hues blend. Do not speed it up to fill time.
