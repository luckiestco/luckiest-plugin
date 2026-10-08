# Shot prompting

How to write the prompt for a generated still, video frame, or clip so it reads
as a photographed shot, not a generated one. Pair every prompt with section 3b
("Real, not generated") in SKILL.md. Adapted from Replicate `prompt-images`
(Apache-2.0). See ATTRIBUTION.md.

## Write the shot as sentences, in this order

1. **Subject.** Name it with a description, not a pronoun: "the woman with short
   black hair in a navy blazer", "the matte black phone".
2. **Action.** What the subject is doing, mid-motion if possible.
3. **Place.** One specific location with two or three concrete details.
4. **Shot size and angle.** Wide, medium, close-up, or macro. Eye level, low,
   high, or overhead.
5. **Lens and film.** Focal length and aperture ("35mm at f/2"), a film stock or
   camera look ("Portra 400"), and depth of field.
6. **Light.** The source, its direction, its quality, and where the shadows fall.
7. **Texture.** Grain, surface wear, skin detail, materials by name ("brushed
   steel", "kraft paper", "frosted glass").

Full sentences beat comma-separated keyword lists. Long prompts are fine, but
every added requirement is one more thing the model can miss, so state each one
once and plainly.

## Vocabulary

| Need | Words that work |
|---|---|
| Lens | 24mm wide, 35mm, 50mm wide open, 85mm f/1.4, macro, tilt-shift |
| Film | Kodak Portra 400 or 800, Fuji Velvia 50, Ilford HP5, Cinestill 800T |
| Light | Window light from the left, Rembrandt, rim or backlight, overcast flat light, golden hour, blue hour, practical lamps, haze |
| Shot | Wide, medium, close-up, macro, over the shoulder |
| Angle | Eye level, low angle, high angle, overhead |
| Framing | Subject on the left third, negative space on the right, foreground object partly blocking the frame |

## Text in the image

- Put the exact words in double quotes: a poster titled "BLUE NOTE SESSIONS" in
  bold condensed sans-serif.
- Prefer plain, readable faces. For brand type, render the text in the
  composition afterward instead of asking the model for it.
- When changing text, write: change "old text" to "new text". Keep the length
  close, or the layout shifts.

## Editing a generated frame

- Say what stays the same: "keep her face, pose, and the camera angle unchanged".
- Use a precise verb. "Change the jacket to blue denim", not "transform her".
- When removing something, describe what fills the space.
- When replacing a background, describe the new place and its light, and say the
  subject keeps the same position and lighting.
- Fix hands, faces, and text by masking and inpainting that region, not by
  regenerating the whole frame.

## Consistency across a set or a video

- Write the subject description once and repeat it word for word in every
  prompt.
- Use reference images when the model accepts them.
- Change one thing per step: outfit first, then place.

## Model settings

- Choose the model from the provider's current list, not from memory.
- Keep guidance (CFG) near 3.5 to 4. High guidance gives the burnt, overly
  contrasty look.
- Use negative prompts only on models trained for them. Elsewhere they add noise.
- Generate at the model's recommended resolution and aspect ratio, then upscale.

## Before and after

Before (reads as generated):

> A perfect, ultra detailed, 8k photo of a happy founder at a laptop in a modern
> office, cinematic lighting, masterpiece.

After (reads as photographed):

> The founder with cropped grey hair and a worn olive overshirt leans toward an
> open laptop, mid-sentence, one hand raised. She sits on the left third of the
> frame at a scratched oak table in a narrow converted garage, a bike hanging on
> the back wall and a coffee ring on a printed spreadsheet. Medium shot at eye
> level, 35mm at f/2, Kodak Portra 400, fine grain, slight softness at the edges.
> Late afternoon window light comes from the right and throws hard shadows of
> the window frame across the table. Visible skin texture, no retouching.
