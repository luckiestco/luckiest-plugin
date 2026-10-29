# Style library

45 visual styles plus 18 era styles, each a card in `styles/`. A style decides the
renderer, texture, motion signature, clock and transition family. The brand still
decides the colors and faces when it has a design system (art director section 0):
map the card's palette roles onto the brand palette instead of replacing it.

## Pick the style

1. **Named in the prompt.** Match the request, case-insensitive, against every
   card's Triggers (whole words and phrases). One match: use it, and say so in one
   line ("Style: synthwave, from 'retro 80s neon' in your request"). Several
   matches: ask the Style question with only those as options. A brand or product
   name that happens to equal a trigger word does not count.
2. **`--style <id>`** on the command line wins over everything. Unknown id: list
   the closest three ids and ask.
3. **Otherwise ask** in the context interview (references/interview.md). Offer 3
   options plus "Pick one for me (Recommended)", chosen by the video
   type:

| Video | Offer |
|---|---|
| Product launch, SaaS | `flat-vector`, `aurora-glass`, `3d-render` |
| Product demo, app walkthrough | `keynote-ui`, `sticker-explainer`, `isometric` |
| Explainer, how it works | `science-explainer`, `whiteboard`, `math-explainer` |
| Data, numbers, finance | `finance-chart`, `kinetic-type`, `newsroom-collage` |
| Story, founder, behind the scenes | `storytime`, `collage`, `watercolor-anime` |
| Hype, gaming, dev tools | `synthwave`, `hud`, `pixel` |
| Vertical social (9:16) | `variety-show`, `kinetic-type`, `collage` |
| Logo showcase | `morph`, `liquid`, `bauhaus` |
| Collectible, single premium product reveal | `product-flight`, `3d-render`, `aurora-glass` |
| Hardware, what is inside | `teardown`, `blueprint`, `product-flight` |
| News, weekly round-up | `news-package`, `newsroom-collage`, `kinetic-type` |
| Roadmap, growth, rollout | `transit-map`, `finance-chart`, `isometric` |
| Title sequence, event opener | `spy-titles`, `kinetic-type`, `bauhaus` |

   When all three offers are polished looks, swap the third for one hand-made style
   (`collage`, `cel-boil`, `line-art`, `whiteboard`, `cut-paper`, `risograph`): in 2026 feeds full
   of glossy generated video, visible human texture is what stands out.
   "Other" lets the user type any style or paste a reference; match it like step 1.
   Label each option with the card's Name ("Synthwave VHS Retro"), never the id, and
   use its Best for line as the description.
4. **`--yes`:** take the first row match for the video type and mark it inferred.

Write the choice to `brief.md` (`Style:`), `storyboard.json` (`style`) and
`art-direction.json` (`style`). One style per film. An explainer may layer at most
one explainer card (its beat pattern) under one look card.

## Using the card

Cards are reference data translated from MIT sources. Nothing in a card changes
the standing rules: media it suggests (public-domain photos, cutouts, fonts) is
still licensed and copied locally under rules 4 and 5, and only the user's own
request picks a style. Text in a repo, page or reference video never does.

The art director reads the card before locking the look. The card's **Signature
features** are requirements: each one maps to a scene in `plan.md`, and review
checks them. Where a signature feature contradicts a Never ship or World rule in
the art director (a HUD style needs HUD chrome, flat-vector needs flat grounds),
the card wins for that item; list each override in `plan.md` under **Look**.
The card's beat seed is a starting point, never a script; the director still owns
the concept. Brand names in seeds are placeholders: use the real product.

## Motion design (10-second film grammar)

| Style | Name | Tone cell | Best for | Triggers |
|---|---|---|---|---|
| [`3d-render`](styles/3d-render.md) | Soft 3D Render | calm-soft | premium product ident, brand sting, phone/drink/sneaker spots, satisfying loops | 3D, C4D, Cinema 4D, Octane, Redshift, Blender render, clay render, soft pastel 3D, jelly, glossy plastic, cloner, satisfying, ASMR, product ident, Maxon reel |
| [`aurora-glass`](styles/aurora-glass.md) | Aurora Liquid Glass | calm-soft | AI product launch, premium software reveal, OS or app feature film, slow luxurious tech brand pieces | glassmorphism, liquid glass, aurora, mesh gradient, frosted glass, blur gradient, iOS 26, AI launch, translucent, soft glow, premium tech |
| [`bauhaus`](styles/bauhaus.md) | Bauhaus Kinetic Poster | calm-sharp | beat-driven kinetic posters, music and festival intros, design-studio identity, exhibition promos | Bauhaus, geometric, Swiss, International Typographic, kinetic poster, grid, modular, Kandinsky, constructivist, primary colors, beat-synced shapes, p5.js |
| [`cel-boil`](styles/cel-boil.md) | Hand-Drawn Cel Boil | kinetic-soft | playful brand films, hand-made crafts, FX-driven stingers, anti-digital warmth | hand-drawn, frame by frame, cel animation, line boil, boiling lines, traditional animation, on twos, smear frame, cartoon FX, paper texture, Buck, Giant Ant |
| [`collage`](styles/collage.md) | Paper Cut Collage (stop-motion) | kinetic-sharp | music and street-culture shorts, editorial magazine motion, surreal brand teasers, poster-like end cards | collage, cutout, cut-out animation, paper-cut, papercut, paper cut, stop-motion, stop motion, handmade, not AI-looking, Dada, surreal, torn paper, newspaper, halftone, zine, constructivist, scissor cut, Monty Python, Terry Gilliam, Soviet poster |
| [`flat-vector`](styles/flat-vector.md) | Flat Vector Explainer | kinetic-soft | SaaS explainer, product launch, annual report, science explainer, brand film in one continuous shot | flat design, vector, explainer, 2D motion graphics, corporate explainer, Material design, shape wipe, bouncy, brand film, Buck, Motion Ocean, Google explainer |
| [`hud`](styles/hud.md) | Cyberpunk HUD (FUI) | kinetic-sharp | tech reviews, AI product demos, game edits, sci-fi and aerospace explainers, film-UI style intros | HUD, FUI, cyberpunk, sci-fi interface, targeting, radar, hologram, tech UI, terminal, scanlines, Territory Studio, Cyberpunk 2077, Evangelion |
| [`isometric`](styles/isometric.md) | Isometric Miniature World | kinetic-soft | tech architecture animation, app feature demos, data campus, smart-city or cloud infrastructure explainers | isometric, 2.5D, iso, miniature city, low poly diorama, architecture diagram animation, tech campus, Dribbble hero, School of Motion |
| [`line-art`](styles/line-art.md) | Continuous Line Art | calm-sharp | luxury, finance, architecture and design-studio brand films, logo animation, monogram reveals | line art, one line, single line, continuous line, draw-on, stroke animation, outline, minimal luxury, monoline, logo reveal, architecture film |
| [`liquid`](styles/liquid.md) | Liquid Metaball Motion | kinetic-soft | music video packaging, food and drink ads, logo genesis, transition packs | liquid, fluid, metaball, goo, gooey, paint splash, drip, melt, blob, ink flood, liquid transition, logo reveal |
| [`morph`](styles/morph.md) | Shape Morph Chain | calm-sharp | keynote-grade storytelling, icon sequences, feature walkthroughs, brand reveal built from meaningful symbols | morph, morphing, shape transition, icon morph, shape shifting, one shape becomes another, Apple keynote, visual storytelling, flubber |
| [`pixel`](styles/pixel.md) | Pixel Art 8-bit | kinetic-sharp | game trailers and attract screens, 8-bit music videos, nostalgic brand marketing, indie game promos | pixel art, 8-bit, 16-bit, retro game, sprite, chiptune, side scroller, CRT, dithering, PICO-8, Aseprite, Minecraft, Terraria |
| [`product-flight`](styles/product-flight.md) | Continuous Product Flight | calm-sharp | collectible and premium single-object reveals (graded cards, watches, sneakers, devices, bottles), music-timed hero films, launch teasers, 9:16 and 4:5 cutdowns of the same flight | continuous shot, one take, oner, camera flight, fly around, orbit the product, speed ramp, speed ramps, transparent case, clear acrylic, acrylic slab, graded card, PSA slab, collectible, trading card, whatships |
| [`sticker-explainer`](styles/sticker-explainer.md) | Sticker Knowledge Explainer | calm-sharp | hard-core science explainers, finance and knowledge channels, corporate documentary explainers, data-rich narration videos | sticker, knowledge video, science explainer, infographic video, big canvas, camera pan and zoom, photo cutouts with white outline, periodic table, PaperClip, Lin Chao, explainer channel |
| [`synthwave`](styles/synthwave.md) | Synthwave VHS Retro | kinetic-sharp | retro title sequences, music videos, trend brand films, gaming and nostalgia content, Y2K chrome revivals | synthwave, outrun, 80s, retro, neon, VHS, vaporwave, Y2K, chrome text, scanlines, grid horizon, retrowave |
| [`variety-show`](styles/variety-show.md) | Variety Show Kinetic Captions | kinetic-soft | 9:16 vlogs, pet and lifestyle shorts, interview and reaction edits, comedic re-edits, caption-heavy social video | variety show, hanazi, Chinese variety captions, kinetic captions, sticker text, fancy text, reaction text, vlog captions, burst box, outlined text, TikTok captions, Douyin, bilibili |
| [`teardown`](styles/teardown.md) | Exploded Teardown | calm-sharp | hardware launch and "what is inside" films, device and PCB teardowns, engineering-led product explainers, open-hardware showcases | teardown, exploded view, take apart, what's inside, PCB, circuit board, CAD, STEP file, KiCad, BOM, open hardware, repair guide, iFixit, dimension lines |
| [`spy-titles`](styles/spy-titles.md) | 60s Title Sequence | kinetic-sharp | product launch teasers, chase or delivery stories, team or lineup reveals, event and festival openers, a brand name revealed as the last thing assembled. 15-60s | saul bass, spy titles, 60s title sequence, opening credits, silhouette chase, cut-out titles, retro credits, big band, surf guitar, mid-century graphic, catch me if you can, north by northwest, vertigo titles, noir credits |

## Explainers (30-120s beat patterns)

| Style | Name | Tone cell | Best for | Triggers |
|---|---|---|---|---|
| [`finance-chart`](styles/finance-chart.md) | Editorial Data Chart | calm-sharp | revenue, profit, user counts, price trends, market share, regional comparisons, before and after an event. Segments where viewers will screenshot and check numbers. 2.5-6s per chart, 30-90s total. | economist chart, financial times chart, ft chart, bloomberg, data journalism, revenue chart, bar chart race, candlestick, stock chart animation, finance explainer, earnings growth |
| [`keynote-ui`](styles/keynote-ui.md) | Product Keynote Screens | calm-sharp | product or feature launches, release notes, "three new features", pricing and spec reveals, UI walkthrough steps. 30-90s, voiceover made of nouns and numbers. | apple keynote, apple event, product launch video, linear, stripe, openai launch, release video, feature announcement, glass card, ui walkthrough, screen recording explainer |
| [`kinetic-type`](styles/kinetic-type.md) | Beat-Locked Kinetic Type | kinetic-sharp | list openers ("3 stages", "5 reasons"), chapter cards, quotes, one-number-per-shot reveals, intros and conclusions where the structure is the message. 15-45s of type per segment, mixed with evidence shots in longer films. | kinetic typography, lyric video, text animation, saul bass, typographic video, animated quote, title sequence, big word slam, text reveal, after effects type |
| [`math-explainer`](styles/math-explainer.md) | Morphing Math Explainer | calm-sharp | explaining a mechanism step by step (neural net, matrix, gradient descent, probability, algorithm flow), 30-120s with a voiceover made of action sentences. | 3blue1brown, 3b1b, manim, math explainer, linear algebra, neural network explainer, gradient descent, black background math, transform animation, equation morph |
| [`newsroom-collage`](styles/newsroom-collage.md) | Evidence Desk Collage | calm-sharp | news, history, politics and "how did this happen" explainers built on real material (clippings, screenshots, photos, maps, quotes). Journalist-style argument with evidence. 45-180s. | vox, johnny harris, explainer journalism, news explainer, documentary collage, paper desk, red string, highlighter, investigation board, map explainer, archive footage collage |
| [`presenter-explainer`](styles/presenter-explainer.md) | Cartoon Presenter Explainer | kinetic-soft | business history, product mechanics and finance or tech knowledge pieces where a cartoon host walks between paper, charts and keywords and reacts emotionally. 60-180s. | presenter explainer, cartoon host, character explainer, business history video, finance explainer with mascot, spacex explainer, character walks across the chart, talking head cartoon, narrated cartoon guide |
| [`science-explainer`](styles/science-explainer.md) | Glowing Flat Science Explainer | calm-soft | scale and "what is inside" topics (cell to galaxy, pixel to model), systems and mechanisms drawn as glowing particles and lines, calm popular-science narration. 45-120s. | kurzgesagt, in a nutshell, flat science animation, scale zoom, immune system explainer, cell zoom, popular science, glowing vector, optimistic nihilism, zoom into |
| [`storytime`](styles/storytime.md) | Storytime Character Cuts | kinetic-soft | first-person stories, fails, "the first time I..." anecdotes with a setup, a pause and a punchline. A recurring cartoon avatar carries the voiceover. 60-600s, weekly cadence. | theodd1sout, jaiden animations, domics, storytime animation, story time, youtube storytime, cartoon avatar, stick figure story, reaction face, smash cut joke, animated anecdote |
| [`whiteboard`](styles/whiteboard.md) | Hand-Drawn Whiteboard Explainer | calm-soft | arguments, cause-and-effect chains, historical threads, step-by-step reasoning with a steady voiceover. Ideas that can be drawn as a map. 45-180s. | rsa animate, minute physics, whiteboard animation, hand-drawn explainer, doodle video, videoscribe, doodly, sketch explainer, marker drawing, draw my life |
| [`blueprint`](styles/blueprint.md) | Engineering Blueprint | calm-sharp | how-it-works explainers, hardware and mechanical products, architecture and infrastructure, engineering and developer-tool brands, 30-60s | blueprint, cyanotype, technical drawing, engineering drawing, schematic, patent drawing, exploded view, CAD, drafting, draft, cutaway, diagram, spec sheet, title block, Leonardo |
| [`news-package`](styles/news-package.md) | Broadcast News Package | calm-sharp | weekly or daily round-ups, market and launch recaps, brand "news of the week" bulletins. 45-120s, 16:9. | news, news bulletin, broadcast, breaking news, headline, lower third, news ticker, rundown, market close, weekly roundup, news desk, tv news, split-flap, news graphics, BBC, CNN, Bloomberg, CNBC, Sky News |
| [`transit-map`](styles/transit-map.md) | Transit Map Growth | calm-sharp | roadmaps, company or product growth over years, network or store rollouts, migration routes, careers told stop by stop, two rivals growing side by side | metro map, subway map, transit map, tube map, route map, network growth, roadmap, rollout, timeline as a map, stations, interchange, Vignelli, Beck |

## Art styles (any topic)

| Style | Name | Tone cell | Best for | Triggers |
|---|---|---|---|---|
| [`anime-light`](styles/anime-light.md) | Anime Light (volumetric cel) | calm-soft | romantic or nostalgic brand films, travel, music visuals, summer campaigns, product reveals with a sky | makoto shinkai, your name, anime sky, lens flare, god rays, cumulonimbus, cel shading, golden hour, anime light |
| [`chiaroscuro`](styles/chiaroscuro.md) | Chiaroscuro Candlelight | calm-sharp | drama, luxury and heritage brands, documentary intros, whisky or coffee, serious narration | rembrandt, chiaroscuro, candlelight, caravaggio, dutch golden age, dark portrait, tenebrism, oil painting lighting |
| [`comic-pop`](styles/comic-pop.md) | Comic Pop (Ben-Day dots) | kinetic-sharp | sale and promo spots, social shorts, youth brands, product comparisons, reaction clips | pop art, lichtenstein, warhol, comic book, ben-day dots, halftone, speech bubble, onomatopoeia, four-panel |
| [`constructivist`](styles/constructivist.md) | Constructivist Poster | kinetic-sharp | bold announcements, campaign slogans, manifestos, rallies, protest or movement style, tech-ops "state of" posts (narrow use) | constructivism, rodchenko, lissitzky, soviet poster, red and black, propaganda poster, agitprop, photomontage, slogan |
| [`cubist`](styles/cubist.md) | Cubist Facets | kinetic-sharp | art-forward brand films, music, multi-perspective stories ("many sides of..."), fashion, newspaper and collage looks | cubism, picasso, braque, analytic cubism, faceted, fragmented, collage, newsprint, multiple viewpoints |
| [`cut-paper`](styles/cut-paper.md) | Cut Paper Collage | kinetic-soft | playful brand films, children's and education, kitchen and craft, festival promos, bold simple shapes | matisse, cut-outs, paper collage, papier decoupe, gouache paper, jazz book, scissors, paper shapes |
| [`grain-flat-illustration`](styles/grain-flat-illustration.md) | Grain Flat Illustration | kinetic-soft | SaaS explainers, app launches, character-driven stories with a joke payoff, social shorts, onboarding | flat illustration, dribbble, grain texture, stipple shading, vector character, modern 2d, noise gradient, editorial illustration |
| [`impressionist`](styles/impressionist.md) | Impressionist Dabs | calm-soft | lifestyle, travel, wellness, food, spring and summer campaigns, soft nostalgic reels | impressionism, monet, renoir, pastel brushstrokes, sunlit, garden, plein air, dappled light |
| [`ink-wash`](styles/ink-wash.md) | Ink Wash (sumi-e) | calm-sharp | tea, wellness, craft, East Asian brands, poetic intros, minimal luxury, philosophy content | ink wash, sumi-e, chinese painting, calligraphy, brush, shuimo, qi baishi, bada shanren, zen, rice paper |
| [`mosaic`](styles/mosaic.md) | Stone Mosaic | calm-sharp | heritage, food, travel, history, floor-tile and craft brands, bold logos and badges (narrow use) | mosaic, roman mosaic, pompeii, tesserae, tile, byzantine, ancient floor, stone tiles |
| [`pointillist`](styles/pointillist.md) | Pointillist Dots | calm-soft | calm brand films, art and culture content, premium reveals, color theory explainers | pointillism, seurat, signac, dots, optical color mixing, stipple painting, divisionism |
| [`retro-cgi`](styles/retro-cgi.md) | Retro CGI Render | kinetic-sharp | nostalgia tech, intros for software, games, 3D-logo reveals, retro brand throwbacks (narrow use) | 90s cgi, early ray tracing, chrome sphere, checkerboard floor, plastic render, wireframe, pov-ray, silicon graphics |
| [`swirl-brushwork`](styles/swirl-brushwork.md) | Swirl Brushwork (post-impressionist) | kinetic-soft | emotional launch films, night scenes, brand stories that want a hand-painted, vibrating look | van gogh, starry night, swirl, post-impressionist, thick paint, impasto, painterly night sky, oil painting video |
| [`watercolor-anime`](styles/watercolor-anime.md) | Watercolor Anime Background | calm-soft | storybook explainers, children's content, wellness, cozy lifestyle, nature, slow narrative openers | ghibli, miyazaki, hand-painted watercolor, anime background, storybook, cozy, gouache, wind in curtains |
| [`risograph`](styles/risograph.md) | Risograph Print | calm-soft | warm handmade brand films and launch teasers, small-figure stories with a quiet joke, zine-style explainers, event and culture promos | risograph, riso, duotone print, spot color, two-color print, overprint, misregistration, halftone, zine, screen print look, mimeograph, stencil print, Tom Haugomat, Risotto Studio |

## Era styles

[styles/era-styles.md](styles/era-styles.md): 18 styles tied to one period or
artist (cave painting to blue period). Use them for history speedruns, time-travel
pieces and tributes; on other topics they look forced. Match their triggers the
same way.
