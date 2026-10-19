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

Project Source

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

SIGGRAPH Asia 2026 Journal Track

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

### h2 · project-source-title

Project Source

### p

How can we render a person under arbitrary lighting while staying consistent over time?

### p

This question led us from rendering and generative models to a choice about data: learn individual light responses, and capture them in motion.

### h3

Realism depends on the transport we can recover.

### p

Physically based rendering gives us a principled way to simulate light. For a moving person, however, recovering accurate geometry and the materials of skin, hair, and clothing is difficult. Path tracing can reproduce complex illumination, subsurface scattering, and self-shadowing; achieving production quality requires detailed assets, computation, and substantial capture and artist effort. Scaling that process across people and performances is the challenge.

### p

The quantity we want to reproduce

### p

It(x; L) = ∫𝕊² Tt(x, ω) L(ω) dω

### p

For a fixed view and scene state at time t, transport T maps incoming environment light L to image pixel x. It includes visibility, reflections, and scattering. We assume distant illumination and linear radiometric values, with any fixed emission removed.

### a

Light transport background ↗

### p

A renderer estimates this response from an explicit scene model. We ask whether a learned model can predict the response directly from real observations. Light transport background ↗

### h3

A convincing image does not yet mean precise light control.

### a

Paul Debevec and colleagues

### a

HumanOLAT from Christian Theobalt’s group at MPI

### a

Shunsuke Saito and colleagues’ Relightable Gaussian Codec Avatars at Meta

### p

Video generation models offer strong priors for realistic appearance and motion. But learning relighting without sufficient real, paired supervision can leave a gap between training data and real human appearance. Real captures provide direct supervision: the Light Stage work of Paul Debevec and colleagues, HumanOLAT from Christian Theobalt’s group at MPI, and Shunsuke Saito and colleagues’ Relightable Gaussian Codec Avatars at Meta demonstrate different ways of measuring and learning real lighting responses.

### p

There is a separate question about the supervision itself. In an environment-lit image, many directions contribute at once. When the entire environment map conditions a generator, each direction’s contribution is not necessarily exposed or constrained separately. The model may reproduce the overall appearance while missing the requested shadow direction or relative intensity—the behavior that motivated our work.

### p

Many active directionsOne mixed observation

### p

One active lightOne isolated response

### p

This is an identification problem: changing a whole environment often changes several variables together. To recover each light’s effect from mixtures, the training illuminations must provide enough independent variation. OLAT makes that intervention explicit.

### p

For a fixed scene and a discretization into N lighting directions, write Y = T E. The columns of E are training environments; the columns of Y are their observed images. If rank(E) < N, those observations cannot uniquely identify an unrestricted transport matrix T. Repeated or highly correlated environments add little independent information; scene and motion variation make the learning problem harder still.

### p

With calibrated OLAT measurements, E is the identity basis up to light scaling, so each observation isolates a column of T. Diverse environment pairs can also identify transport, and priors can reduce the required data. Our point is the directness of the supervision, not that environment-map conditioning is inherently incapable of precise relighting. The capture-based works above use different representations; they are not all holistic environment-conditioned generators.

### h3

Learn the responses.Compose the light.

### p

Under ordinary linear light transport, contributions from separate lights add. An OLAT image contains the full response to one light—including its shadows and indirect scattering. Predict those responses for the same performance, and a new environment becomes a controlled linear combination.

### p

One basis video per light direction

### p

It(x; L) ≈ ∑k wk(L) Bt,k(x)

### p

Bt,k is the OLAT response for direction k. Environment-derived weights wk control its contribution, per color channel, in linear color space. Finite lighting samples and prediction errors make this an approximation.

### p

The data representation changes what we need to sample. Arbitrary environment maps span a large space of lighting combinations. At fixed light normalization, OLAT instead samples directions on the same compact sphere, ω ∈ 𝕊². More samples refine directional coverage; composition supplies the combinations. People, motion, materials, and viewpoints still require broad coverage.

### p

This suggested a learnable, structured family of OLAT responses in image and video space. A compact lighting domain does not by itself prove a smooth manifold or guarantee generalization; it gives us a useful hypothesis for designing supervision.

### a

DifFRelight

### p

Before starting DynOLAT, we were inspired by DifFRelight: its subject-specific diffusion model showed highly realistic facial performance relighting from flat-lit and OLAT captures. We wanted to extend that direction to full bodies, motion, and unseen people, using a pretrained video model’s appearance and temporal priors.

### h3

A few poses cannot represent a performance.

### p

Our initial plan was to collect many conventional static flat-lit / OLAT pairs—the origin of our static subset. In our early experiments, static poses did not provide enough motion coverage, even for a fixed subject. Articulation, clothing deformation, and changing self-occlusion pushed us toward dynamic full-body capture.

### p

For direct image-based relighting, a full OLAT sweep needs the same scene state across lights. A moving person makes that difficult: the captured responses no longer belong to the same instant. Yet a video model can learn from partial directional observations across motion. Our system interleaves flat-lit and OLAT frames and uses optical flow to align them into training pairs. It does not capture every OLAT at each instant; the model learns to predict the missing responses.

### a

Supplement §F ↗

### p

The captures are synchronized across views. Within our compute and training-time budget, we did not explicitly enforce multi-view consistency. Our downstream 4D Gaussian Splatting example nevertheless shows useful implicit coherence in independently relit views; this is a qualitative observation, not a guarantee for all views or performances. Supplement §F ↗

### p

We hope the data and learned OLAT responses support faster inference, distillation, and explicit multi-view training. One possibility is to compose OLAT predictions into environment-lit training pairs, then distill them into a model that takes an environment map directly. This could retain the benefits of structured supervision while reducing the cost of generating many basis videos. These are directions for future work.

### p

The choice of data comes first:isolate the light response, then learn it through motion.

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

### h2

More Results

### figcaption

01 Shanghai

### figcaption

02 Sky

### figcaption

03 Environment 01

### p

Short relighting previews under different environment maps. SDR playback.

### h3 · playback-title

SDR / HDR playback

### p

The same relighting example in two display formats. HDR appearance depends on your browser and screen.

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
| link | href | `styles.css?v=20261019-3` |
| script | src | `script.js` |
| a | href | `#home` |
| a | href | `#home` |
| a | href | `#demo` |
| a | href | `#project-source` |
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
| a | href | `https://www.pbr-book.org/4ed/Light_Transport_I_Surface_Reflection` |
| a | href | `https://www.pauldebevec.com/Research/LS/` |
| a | href | `https://gvv-assets.mpi-inf.mpg.de/` |
| a | href | `https://shunsukesaito.github.io/rgca/` |
| a | href | `https://arxiv.org/abs/2410.08188` |
| a | href | `assets/dynolat.pdf#page=20` |
| a | href | `assets/method-overview-dark.svg` |
| img | src | `assets/method-overview-dark.svg` |
| a | href | `https://huggingface.co/datasets/STLAND/ZJU_OLAT` |
| video | src | `assets/videos/comparisons/lighting-response.mp4` |
| video | poster | `assets/videos/comparisons/lighting-response.jpg` |
| a | href | `assets/videos/comparisons/lighting-response.mp4` |
| a | href | `assets/dynolat.pdf#page=12` |
| source | src | `assets/videos/shanghai-sdr.mp4` |
| source | src | `assets/videos/sky-sdr.mp4` |
| source | src | `assets/videos/environment-01-sdr.mp4` |
| source | src | `assets/videos/shanghai-sdr.mp4` |
| source | src | `assets/videos/shanghai-hdr.mp4` |
| a | href | `assets/dynolat.pdf#page=19` |
