# Visual edition — image provenance and final prompts

Created 2026-10-21 for `project-source-visual.html`, separately from the original SVG-based technical essay.
Generation mode: **built-in image_gen**. Five PNGs copied unchanged into `assets/insights-visual/`.
The subject is a fictional adult. The hero was generated from text; the other four images used the hero as an identity/style reference.
All five images are conceptual illustrations, not DynOLAT outputs, measured OLAT data, HDR maps, film stills, or game screenshots.
Hero buttons crop to one of three pre-generated panels. They do not run inference. The OLAT contact sheet is not a numerical linear sum.
Natural facial and fabric shading is present; there are no added diagrammatic cast-shadow overlays.

## Official game screenshot

- Local file: `assets/insights-visual/dlss5-official.jpg` (3840 × 2160; original download unchanged).
- Content: Resident Evil Requiem, labeled DLSS 5 On.
- Attribution: NVIDIA / CAPCOM. Used for context, not as a comparison with DynOLAT.
- [Official article and screenshot source](https://www.nvidia.com/en-us/geforce/news/dlss5-breakthrough-in-visual-fidelity-for-games/)
- [Technical context](https://research.nvidia.com/labs/adlr/DLSS5/) (September 2026).
- No ownership or redistribution license is asserted for the official screenshot.

## Actual project footage

Existing files under `assets/videos/comparisons/` are excerpts from the supplementary video. Their original labels remain visible.
- `lighting-response.mp4`: 02:09–02:27.
- `temporal-consistency.mp4`: 03:47–03:53.
- `in-the-wild.mp4`: 03:30–03:45; not a delighting-only ablation.
See `MEDIA.md` for the source and encoding history.

## Final prompts

### assets/insights-visual/hero-lighting.png

```text
Use case: scientific-educational. Asset type: photorealistic cinematic triptych for an accessible research blog on human video relighting. Create one wide 3:2 image divided into THREE EXACTLY EQUAL vertical panels with no gutters, no borders, no text. The SAME fictional adult East Asian woman, about 28, short straight black bob tucked behind the ears, subtle freckles, plain off-white crewneck T-shirt beneath an unzipped charcoal woven jacket, is photographed waist-up in each panel. Face and pose are IDENTICAL: looking directly at camera, neutral calm expression, arms relaxed, all face/head/hair/clothing contours exactly aligned between panels. Natural pores, individual fine hair strands, realistic cloth weave, very high photographic detail, cinematic rather than waxy/beautified. All three panels have the same plain nearly black studio background, no objects.
Panel 1: soft neutral flat frontal illumination, informative and even.
Panel 2: strong warm amber light from upper camera-left plus softer teal fill from camera-right; preserve skin tone, physically plausible light on face and fabric.
Panel 3: cool soft blue overhead illumination plus a subtle warm low side fill, visibly different light distribution, same identity and geometry.
Compose face at 32% of height in all panels, waist visible at bottom, centered within each third. No text, no labels, no logos, no arrows, no watermark, no floating graphic shapes, no visible floor or cast ground shadows. This is a conceptual illustration, not a claimed scientific output or a screenshot of a game.
```

### assets/insights-visual/materials.png

```text
Use case: scientific-educational. Photorealistic editorial imagery for a nontechnical research blog about human relighting. Use the supplied image ONLY as the identity, clothing and photographic-style reference: the same fictional adult East Asian woman, black bob, freckles, white T-shirt, charcoal woven jacket. Natural skin, fine hair, cloth texture. No written text, letters, numbers, logos, watermarks, arrows or graphic icons. Plain dark studio background behind people, no visible cast ground shadows. This is an explanatory concept image, not a measured research result. Create one wide 3:2 photographic editorial composition. On the left two thirds, an intimate close-up portrait of her face and jacket collar in warm soft side light, with skin pores, tiny facial hairs, translucent warm ear edge, individual black hair strands, and subtle jacket texture sharply visible. On the right one third, THREE neatly stacked macro photographs aligned vertically: upper skin cheek detail, middle individual strands of hair catching a rim light, bottom charcoal woven jacket fibers. These are close-up details of that same portrait, not unrelated materials. Clean straight panel boundaries with thin near-black gutters. Make it feel like a polished cinematography magazine feature. No outlines, circles or text.
```

### assets/insights-visual/environments.png

```text
Use case: scientific-educational. Photorealistic editorial imagery for a nontechnical research blog about human relighting. Use the supplied image ONLY as the identity, clothing and photographic-style reference: the same fictional adult East Asian woman, black bob, freckles, white T-shirt, charcoal woven jacket. Natural skin, fine hair, cloth texture. No written text, letters, numbers, logos, watermarks, arrows or graphic icons. Plain dark studio background behind people, no visible cast ground shadows. This is an explanatory concept image, not a measured research result. Create one wide 3:2 image with THREE exactly equal vertical columns, clean no-gutter boundaries. Each column has a short panoramic environmental photograph across its top 22%, and an aligned waist-up portrait of the SAME woman across its bottom 78%. The pose, camera, face shape, expression and jacket folds MUST match across all three portraits. Left upper panorama: interior with a large bright warm sunlit window on the LEFT and cooler blue ambient light on the right; corresponding lower portrait strongly warm-lit from upper left, with cool gentle right-side fill. Middle upper panorama: rainy city alley at night with vivid teal neon to the RIGHT and a small amber shop opening at the lower left; lower portrait teal-lit from right with weak amber left fill. Right upper panorama: overcast blue skylight overhead, darker surroundings and a little green reflected foliage light low on the left; lower portrait blue soft top-lit with subtle low green fill. The environment pictures must show spatially distributed light across a real scene, not two dots or two lamps on black. Portrait backgrounds stay dark, so the illumination itself is easy to read. No diagram arrows or labels.
```

### assets/insights-visual/olat-bases.png

```text
Use case: scientific-educational. Photorealistic editorial imagery for a nontechnical research blog about human relighting. Use the supplied image ONLY as the identity, clothing and photographic-style reference: the same fictional adult East Asian woman, black bob, freckles, white T-shirt, charcoal woven jacket. Natural skin, fine hair, cloth texture. No written text, letters, numbers, logos, watermarks, arrows or graphic icons. Plain dark studio background behind people, no visible cast ground shadows. This is an explanatory concept image, not a measured research result. Create one landscape 3:2 photographic contact sheet with FOUR precisely equal vertical panels, no gutters. Exactly the same woman in the same waist-up frontal pose, same facial identity, identical clothing folds, lens, framing, head position and expression across all four panels. Panel 1: only a warm amber light from upper camera-left; bright warm left side, naturally darker right side. Panel 2: only a teal light from camera-right; bright teal right side, naturally dark left side. Panel 3: only a soft blue overhead light; top of head and shoulders lit blue, light falling off toward lower torso. Panel 4: combine the warm-left, teal-right and blue-overhead illumination, so all three contributions are visibly present at their respective locations, with warm left key strongest and cool fills weaker. It must read as ONE person under different isolated lights and then their combination, never as a different person or pose. No flat fill that erases the directional lighting. No dividers, no labels, no printed plus or equals signs; the website will provide them.
```

### assets/insights-visual/motion-pairs.png

```text
Use case: scientific-educational. Photorealistic editorial imagery for a nontechnical research blog about human relighting. Use the supplied image ONLY as the identity, clothing and photographic-style reference: the same fictional adult East Asian woman, black bob, freckles, white T-shirt, charcoal woven jacket. Natural skin, fine hair, cloth texture. No written text, letters, numbers, logos, watermarks, arrows or graphic icons. Plain dark studio background behind people, no visible cast ground shadows. This is an explanatory concept image, not a measured research result. Create one wide 3:2 contact sheet with EXACTLY SIX photographic panels arranged in TWO ROWS and THREE COLUMNS, equal panels with thin near-black gutters. Each panel shows a complete full-body view including shoes, extra space above head and below feet. Same woman, same charcoal jacket and white T-shirt, black straight trousers and plain dark sneakers. THREE different moments from an ordinary body movement: column 1 standing with both arms relaxed; column 2 one step forward with left arm bent and right arm back; column 3 both arms lifted above shoulder height. In each column, the upper and lower photograph MUST have the EXACT SAME body pose, head orientation, face, clothing folds and camera viewpoint; only illumination changes. Upper row: all three evenly lit neutral soft flat-light photographs. Lower row: first pose warm directional light from left; second pose teal light from right; third pose blue overhead light. Real photographic humans and realistic fabric shading, no silhouettes or mannequins. No floor shadows, no scientific labels, no arrows. Six panels only.
```
