# Method figure image sources

The subject and environment-map images in `../method-overview-dark.svg` come from Fig. 2 on page 4 of `../dynolat.pdf`.

- `input-paper.png` and `output-warm-paper.png` are original-page crops retained as source references.
- `input-cutout.png`, `output-warm-cutout.png`, and `output-cool-cutout.png` preserve the source RGB pixels with a transparent background mask.
- `envmap-warm.png` and `envmap-cool.png` preserve the original environment-map pixels with a circular alpha mask.

The network blocks, connections, labels, and dark styling are reconstructed as editable SVG elements. No Delighting stage was present in the paper figure or added to this OLAT pipeline illustration. The surrounding Method text separately notes the trained delighting model for general video.

- `paper-fig2-crop.png` is the full Fig. 2 crop rendered from page 4 of `dynolat.pdf` at 300 dpi. `../method-overview-paper-dark.svg` embeds that original crop, keys the paper-white page background to transparency, and restyles the three captions below the input, OLAT bases, and relit outputs for contrast on the dark page. The output caption has no background fill and is centered between the two relit subjects. The right-side relit people are masked out of the base layer and redrawn above the pipeline. The two ChromeBalls are separately clipped to their complete circular bounds and redrawn without white-key filtering, preserving the bright sky in the second environment map.
