# DynOLAT webpage content snapshot

Generated from `index.html`. The HTML is the source of truth; regenerate this snapshot after content edits.

## Visible text

### title

DynOLAT: OLAT Video Prediction for Controllable Dynamic Full-Body Relighting

### a

DynOLAT

### a

Home

### a

Demo

### a

Overview

### a

Method

### a

Dataset

### a

Results

### h1

DynOLAT: OLAT Video Prediction for Controllable Dynamic Full-Body Relighting

### p

Taoming Liu*, Yinji ShenTu*, Guangzhao He, Yudong Jin, Yukang Ye, Siyu Zhang, Fan Jia, Wei Hua, Hujun Bao, Xiaowei Zhou†

### p

Zhejiang University · 4DV.ai Relighting Project

### p

* Equal contribution. † Corresponding author.

### a

Paper + Supp

### a

Dataset

### a

Video

### a

Supplement

### p

One video. Explicit light directions. Controllable relighting.

### h2

Demo video

### a

Download video

### a

Download the MP4

### figcaption

Full supplementary video · 4:48 · 720p

### h2

Relighting in motion

### figcaption

01 Shanghai

### figcaption

02 Sky

### figcaption

03 Environment 01

### p

Short relighting previews under different environment maps. SDR playback.

### h2

Controlling light, preserving motion

### p

DynOLAT relights full-body human performances from monocular video. For general videos captured under uncontrolled illumination, a lightweight delighting model first reduces the existing lighting and maps the input toward the flat-lit training domain. The OLAT predictor then generates temporally consistent One-Light-At-a-Time basis videos. Instead of directly generating a single relit appearance, it makes light direction explicit in the predicted bases and controls relative lighting intensity through linear combinations derived from an environment map. A dynamic capture pipeline provides over 24 million frames from 224 identity-outfit combinations. Experiments evaluate lighting response, fine appearance detail, and temporal coherence under novel illumination.

### h3

TLDR

### p

Normalize the input lighting, predict the response to each light direction, then combine those responses to relight the same performance.

### h2

Method

### p

From general video to controllable light: a delighting stage bridges uncontrolled input illumination to the flat-lit domain. Our light-conditioned video model predicts a reusable set of OLAT basis videos, which can be recombined under new environment maps.

### figcaption

System overview, redrawn for the web: the OLAT pipeline (Fig. 2) with the delighting stage described in Supplement §C. Click to enlarge.

### h3

Delighting for General Video

### p

A lightweight LoRA adaptation of Wan2.1 1.3B reduces uncontrolled illumination before OLAT prediction. This extends the system beyond directly captured flat-lit inputs; the internal OLAT predictor still uses the flat-lit domain.

### h3

Bridge Latent Matching

### p

Bridge matching transports flat-lit source latents toward OLAT target latents, reducing distribution mismatch while preserving temporal structure and identity details.

### h3

Light-Conditioned Video Prediction

### p

Lighting directions modulate the video model via AdaLN, producing temporally coherent OLAT basis videos that remain stable under dynamic body motion.

### h3

Linear OLAT Recomposition

### p

Predicted OLAT basis frames are accumulated in linear color space with illumination weights, yielding controllable full-body relighting under arbitrary environment maps.

### h2

Dataset

### a

Access dataset on Hugging Face ↗

### p

Gated access: sign in to Hugging Face and accept the dataset’s conditions, including sharing your contact information.

### p

24M+captured frames

### p

224identity-outfit combinations

### p

4Kmulti-view capture

### h3

Capture Setup

### p

A LightStage with 101 addressable light units. The dynamic and static subsets use 68 and 70 synchronized cameras, respectively.

### h3

Coverage

### p

189 dynamic and 35 static identity-outfit combinations, spanning varied clothing, motion, and viewpoints. Different outfits of one person count separately.

### h3

Paired supervision

### p

Time-multiplexed flat-lit and OLAT frames are aligned using optical flow to form paired supervision for learning light responses.

### h2

Results

### h3

See the comparisons in motion

### p

Explore lighting response, captured test scenes, in-the-wild inputs, and temporal consistency. All clips are excerpts from the supplementary video, with the original method labels preserved.

### figcaption · comparison-caption

Light direction and relative intensity: DynOLAT, UniRelight, and DiffusionRenderer. Supplementary video 2:09–2:27.

### a · comparison-download

Download this clip ↗

### p

DynOLAT improves lighting-response fidelity across most reported image metrics and achieves the lowest errors in the reported temporal comparison. Results below reproduce Tables 2 and 3 of the paper.

### caption

Image relighting · channel-aligned evaluation

### caption

Temporal consistency

### a

§5.3 and Tables 2–3

### p

Bold marks the best value in each column. ↑ Higher is better; ↓ lower is better. See §5.3 and Tables 2–3 for evaluation settings.

### h3

SDR / HDR playback

### p

Two encodings of a relighting example. This illustrates display formats, rather than a comparison between methods.

### figcaption

SDR (LDR)

### figcaption

HDR

### p · hdrSupportNote

HDR Playback: Detecting support...

### h2

Scope & limitations

### a

supplementary analysis

### p

The full system supports general video through delighting, while the OLAT predictor is trained in the flat-lit domain. Strong cast shadows and colored illumination can still leave residual lighting after delighting. Fine details are limited by the pretrained video VAE, and generating and storing many OLAT bases adds cost. Cross-OLAT and cross-view consistency is not explicitly guaranteed. See the supplementary analysis for failure cases.

### p

DynOLAT · Zhejiang University · 4DV.ai Relighting Project

## Assets and links

| Element | Attribute | Target |
|---|---|---|
| link | href | `assets/fonts/lato-latin-400-normal.woff2` |
| link | href | `styles.css` |
| script | src | `script.js` |
| a | href | `#home` |
| a | href | `#home` |
| a | href | `#demo` |
| a | href | `#abstract` |
| a | href | `#method` |
| a | href | `#dataset` |
| a | href | `#experiment` |
| a | href | `assets/dynolat.pdf` |
| a | href | `https://huggingface.co/datasets/STLAND/ZJU_OLAT` |
| a | href | `#demo` |
| a | href | `assets/dynolat.pdf#page=18` |
| a | href | `assets/videos/dynolat-demo.mp4` |
| video | poster | `assets/videos/dynolat-demo-poster.jpg` |
| source | src | `assets/videos/dynolat-demo.mp4` |
| a | href | `assets/videos/dynolat-demo.mp4` |
| source | src | `assets/videos/shanghai-sdr.mp4` |
| source | src | `assets/videos/sky-sdr.mp4` |
| source | src | `assets/videos/environment-01-sdr.mp4` |
| a | href | `assets/method-overview-dark.svg` |
| img | src | `assets/method-overview-dark.svg` |
| a | href | `https://huggingface.co/datasets/STLAND/ZJU_OLAT` |
| video | src | `assets/videos/comparisons/lighting-response.mp4` |
| video | poster | `assets/videos/comparisons/lighting-response.jpg` |
| a | href | `assets/videos/comparisons/lighting-response.mp4` |
| a | href | `assets/dynolat.pdf#page=12` |
| source | src | `assets/videos/shanghai-sdr.mp4` |
| source | src | `assets/videos/shanghai-hdr.mp4` |
| a | href | `assets/dynolat.pdf#page=19` |
