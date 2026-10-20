# DynOLAT project webpage

Private collaboration repository: https://github.com/STLAND-admin/dynolat-web

Private working repository for the DynOLAT release page, maintained separately from the model/training repository (`ZJUOLAT/DynOLAT`). This repository contains the static website, paper, and web-ready media. The model Code button intentionally remains disabled until that repository is released.

## Preview locally

Python 3 is the only requirement:

```sh
python3 preview.py --open
```

Open http://127.0.0.1:8766/. Set `PORT=8767` if the port is occupied. The preview server supports byte-range requests for video seeking. No npm install or build step is needed.

## Edit together

- `index.html`: visible text, links, tables, and page sections.
- `styles.css`: shared styles and main-page layout.
- `project-source.html` / `project-source.css`: original technical Insights essay with editable 2D diagrams and optional mathematical explanations.
- `project-source-visual.html` / `.css` / `.js`: parallel visual story for a general audience, with Chinese/English switching, photorealistic conceptual illustrations, and actual supplementary video excerpts.
- `INSIGHTS_VISUAL_ZH_EN.md`: editable bilingual draft for the visual story; sync edits with the HTML deliberately.
- `VISUAL_ASSETS.md`: image provenance and final generation prompts; new images live in `assets/insights-visual/`.
- `INSIGHTS_ZH_EN.md`: editable Chinese–English counterpart of the Insights page. Edit the Chinese paragraphs, then sync the English and HTML deliberately; do not overwrite this draft with an automatic export.
- `assets/project-source/`: four editable SVG concept diagrams; these are illustrations, not model outputs.
- `script.js`: video controls, comparison selector, navigation, and HDR status.
- `assets/method-overview-dark.svg`: editable dark method schematic, including Delighting. This is a web schematic based on Fig. 2 and Supplement §C, not a reproduction of the original paper figure.
- `assets/videos/comparisons/`: four short comparison clips and their posters.
- `RELEASE_CHECKLIST.md`: remaining release decisions and missing links.
- `MEDIA.md`: video provenance, source timestamps, and compression notes.

Work on separate branches and review each other's pull requests before merging. Avoid concurrent edits to the same HTML/CSS block. Keep any public deployment disabled until the release checklist is agreed. A private repository requires collaborator access; a URL alone does not grant access.

## Current public resource

Dataset: https://huggingface.co/datasets/STLAND/ZJU_OLAT (gated access).

The bundled PDF contains the main paper and supplementary material. Replace it with the finalized release PDF before publication. No code, dataset, or media license is inferred from the other repository or Hugging Face metadata.
