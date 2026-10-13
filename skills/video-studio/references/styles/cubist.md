# Cubist Facets

- id: `cubist`
- Source: huashu-art-motion `11_cubism.md` (MIT)
- Best for: art-forward brand films, music, multi-perspective stories ("many sides of..."), fashion, newspaper and collage looks
- Not for: friendly softness, children's content, clean UI
- Triggers: cubism, picasso, braque, analytic cubism, faceted, fragmented, collage, newsprint, multiple viewpoints
- Tone cell: kinetic-sharp
- Clock: on twos (stencil text steps at 12 fps, facet boil 8 fps)

## Look
Transparent overlapping planes in a brown, ochre and gray-blue range: paper `#d6c8ac`, cream `#ece3cf`, ochre `#b8975f`, brown `#6e5538`, dark brown `#3a2c1e`, gray `#a8a395`, blue-gray `#8e9eab`, deep gray `#5a5852`. Window views `#c9d3da #8fa3b3 #e4e6e2 #6f8597`. Planes are polygons with a three-stop linear gradient (cream-mixed 25%, base, dark-mixed 40%), alpha 0.18-0.7, with 46 thin straight passage lines (1.3 px) running through all of them. A fine short-dash sand texture (9,000 dashes, 3-8 x 1.5 px) gives a gritty surface. Faux wood grain and woven chair patterns appear as textures. Compose for the subject but overlap shapes the same way.

## Motion
- The same background view is shown in several panes, each offset by `dx = sin(9t+1.7i)*18` (plus 10 fps jitter +/-3) so it reads as multiple viewpoints.
- Stencil lettering swaps order at 12 fps, each letter jumps +/-13 px and tilts +/-0.11 rad.
- Newspaper block trembles at 8 fps (+/-0.0125 rad), corner flips on `sin(20t)`.
- Subject facets re-jitter at 8 fps (vertices +/-8% of cell, 16-35% of triangles flicker +/-12% light).
- Transition family: geometric shards slide and reassemble into the next picture.

## Signature features (judged against these)
- Triangles are not clipped to the silhouette, so planes overflow the outline.
- Large facet cells (about 58 px) for the body, finer cells (26 px) for hair or small things. 34 px reads as low-poly 3D.
- Straight-line outlines with ends sticking out 10-16 px.
- Face with a profile plus a front-view eye (two viewpoints at once).
- Stencil text with cut gaps that show the planes below.
- 5 translucent planes (alpha 0.2) overlap the subject so it sits inside the space.
- Dark brown masses balance the light planes.

## 10-second beat seed
- 0-1.2s: planes slide in, stencil word lands.
- 1.2-6s: panes show shifting viewpoints, subject facets boil.
- 6-7.5s (hero): planes lock into a clean facing view with the title.
- 8.8-10s: hold with small boil.

## Sound
Muted jazz piano and upright bass, 90-110 BPM, paper-rustle hits on shard moves.

## Build it in HyperFrames
Canvas 2D.
- Facetize: fill the subject flat offscreen, read pixels back, jitter a triangle grid (random diagonal per cell), color each triangle from the centroid with brightness `*(0.8+0.38*rand)` and a light-to-dark gradient, draw without clipping, skip triangles whose centroid alpha is below 120.
- Cache the plane background; animate only the panes, text, newspaper and subject.
- Use `getContext('2d',{willReadFrequently:true})` and call `g.reset()` at the start of every frame.

## Watch out
- Current weak spot: image runs bright; the style wants more large deep-brown masses and stronger light-dark contrast.
- Frame 0 can differ from later frames: offscreen GPU readback and leftover context state (lineJoin, lineCap) change antialiasing and colors. Fix with `g.reset()`, not `clearRect`.
- A hair-only second pass with a circular clip colors half the face gold. Filter by color instead.
- Sleeves need to be darker than the body color or they vanish into the facets.
