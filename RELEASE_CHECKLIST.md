# Release checklist

Updated 2026-10-30. This is a collaboration draft; it does not authorize public deployment.

## Ready in this draft

- [x] DynOLAT name throughout visible website text.
- [x] Centered title; Zhejiang University · 4DV.ai Relighting Project affiliation line requested by the authors.
- [x] Complete supplementary demo near the top of the page.
- [x] Jcam multi-view results gallery with synchronized playback across 12 camera views.
- [x] General-input Delighting described in the overview, Method introduction, and limitations; the OLAT pipeline itself omits Delighting.
- [x] Dark editable SVG system schematic with masked people and environment maps.
- [x] Paper + supplement bundled; dataset points to the supplied Hugging Face page.
- [x] Code button indicates that the model code is not released.
- [x] Paper-backed dataset statistics and quantitative tables.

## Required decisions before public release

- [ ] Replace the draft PDF: its DOI (`10.1145/nnnnnnn.nnnnnnn`) and publication metadata are placeholders. Confirm final venue/year/version before adding BibTeX.
- [ ] Add the final paper/arXiv/DOI link when available. The current link downloads the locally bundled PDF.
- [ ] Confirm author order, spelling, contributions, and the simplified affiliation line with coauthors. Add author homepages if desired.
- [ ] Release the model code and replace the disabled Code button with the actual model repository URL. Do not link it to this webpage repository.
- [ ] Decide whether checkpoints, Delighting weights, configs, and example inputs are available; add their links and usage instructions to the model repository.
- [ ] Review code, model, dataset, video/image, and font licensing separately; add applicable license/attribution files. This web repository does not automatically adopt the dataset's intended license.
- [ ] Finish the Hugging Face dataset card: missing/empty YAML metadata warning, incomplete static subset text, and `license: apache-2.0` rendered as a heading were observed on the landing page. Confirm the intended license and fix metadata. Document splits, file layout, calibration, access conditions, and download instructions.
- [ ] Check gated dataset access with an intended recipient account. Landing-page visibility does not establish access to all files.
- [x] Reconstruct a dark editable Method schematic from Fig. 2, retaining the encoder, spherical-harmonic direction inputs, Bridge Matching video model, decoder, OLAT outputs, and linear recomposition.
- [ ] Add a Delighting before/after or ablation clip if available.
- [ ] Replace or transcode the Camera D forward/reverse source to web-compatible H.264; its current MPEG-4 Part 2 encoding is download-only in the tested browser.
- [ ] Confirm that the supplied supplementary video corresponds to the final model and paper revision.
- [ ] Choose the public web domain/hosting, then add canonical URL and social preview metadata. Repository creation alone is not webpage deployment.
- [ ] Verify public-hosted video seeking, MIME types, loading time, mobile playback, paper download, and all external links after deployment.

## Collaboration handoff

- [x] Create the private personal `STLAND-admin/dynolat-web` repository.
- [x] Push the prepared webpage, paper, and video assets to the private repository.
- [x] Send a write-access invitation to Taoming Liu (`xiaotao1340`), verified via an existing shared relighting repository and his personal homepage.
- [ ] Taoming accepts the GitHub collaborator invitation.
- [ ] Decide the public release date and whether to make this repository public or publish a separate website build.
