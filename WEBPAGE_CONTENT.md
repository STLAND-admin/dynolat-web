# DynOLAT webpage content snapshot

Generated from the HTML pages; regenerate after content edits.

## index.html

### title

DynOLAT: OLAT Video Prediction for Controllable Dynamic Full-Body Relighting

### a

DynOLAT

### a

Home

### a

Demo

### a

Insights

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

### a

Insights The ideas behind DynOLAT ↗

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

## project-source.html

### title

The Insights Behind DynOLAT

### a

Skip to story

### a

← DynOLAT

### a

01 · Rendering

### a

02 · Supervision

### a

03 · OLAT

### a

04 · Motion

### h1 · project-source-title

The Insights Behind DynOLAT

### p

How can we render a person under arbitrary lighting while preserving temporal consistency in motion?

### h2

Theoretical limits of computing light transport.

### p

For moving humans, a physical renderer needs accurate geometry and the materials of skin, hair, and clothing. Recovering these assets from images is underconstrained, and production quality often requires substantial capture, artist effort, and computation. These practical costs make scaling across people and performances difficult.

### figcaption

Asset fidelity and transport approximation both matter. Complex light paths can be simulated, but their appearance depends on the scene model and the numerical approximation.

### a

A Theoretical Analysis of Compactness of the Light Transport Operator

### p

There is also a limit to compressing general transport into finite representations. In A Theoretical Analysis of Compactness of the Light Transport Operator, Soler, Molazem, and Subr (2022) show that the general transport operator is non-compact. Finite-rank approximations therefore cannot converge to it uniformly over all unit-norm input radiance fields.

### p

A limit on uniform finite-rank approximation

### p

ℓ = e + 𝒦ℓ𝒦 non-compact ⇒ ∥𝒦 − 𝒦N∥op ↛ 0

### p

ℓ is the total radiance field; e is emitted radiance from the light sources; 𝒦ℓ is radiance arriving after propagation and one reflection. In plain terms: total light = emitted light + bounced light. 𝒦N is a finite-rank approximation; the operator norm measures worst-case error over unit-norm inputs.

### p

Why can a finite representation miss something? Think of a finite basis as a limited vocabulary of light patterns. General transport can preserve variations that lie outside any such finite vocabulary. Enlarging it helps for particular inputs, but cannot make the worst-case error vanish over every possible unit-norm radiance field. Mathematically, finite-rank operators are compact, and their operator-norm limits remain compact; a non-compact operator cannot be such a limit.

### p

This concerns uniform finite-rank approximation of the full radiance field; it does not rule out scene-specific rendering methods or Monte Carlo convergence. Next we turn to a different question: at finite resolution, how can we design informative supervision for a generative model?

### h2

A convincing image does not yet mean precise light control.

### p

Generative models provide strong priors for appearance and motion. Environment-map conditioning turns relighting into a generation task: predict a new image or video for a requested illumination. Two questions remain: how faithfully the training pairs represent real lighting changes, and how independently they constrain different lighting directions.

### a

IC-Light

### p

Stanford / HKUST (IC-Light). Its in-the-wild branch creates relighting pairs by degrading or augmenting input appearance and estimating target lighting, rather than recapturing the same scene under calibrated lights. The full method also uses rendered and real Light Stage data, and imposes light-transport consistency. Our concern is that augmentation and estimated lighting provide approximate supervision, even when the target photograph is real.

### a

DiffusionRenderer

### p

NVIDIA / University of Toronto (DiffusionRenderer). Its forward renderer conditions video generation on G-buffers and an environment map. Synthetic data provides exact labels, but the paper reports a domain gap when training on synthetic data alone. It therefore adds auto-labeled real videos and a LoRA for real data; the estimated geometry, materials, and lighting can still contain errors. This motivates measured pairs without implying that either method uses only synthetic supervision.

### figcaption

One environment map, one generated result. The three maps mix multiple lighting directions; changing a map changes several variables together. The shared subject and pose are held fixed in this conceptual example.

### p

Even with perfect pairs, mixed illumination leaves an identification question. Flatten an h × w environment map into N = hw directional values for one color channel. For a fixed scene, each image pixel has N unknown directional coefficients. One environment-lit observation supplies one equation for those coefficients. To identify an unrestricted response, we need at least N independent illumination configurations.

### p

How many independent environments are enough?

### p

N = hwE = [e1, …, eM] ∈ ℝN×MY = T Erank(E) = N ⇒ M ≥ N = hwOLAT: M = N, E = IN

### p

h and w are the environment-map dimensions; M is the number of illumination configurations. Each column ej of E is one map. For an image with P pixels, T ∈ ℝP×N maps directional illumination to linear image intensity, and Y ∈ ℝP×M contains the observed images. The rank condition identifies an arbitrary T in the noiseless, fixed-scene setting, per color channel. It is not a universal dataset-size requirement for a generative model.

### p

OLAT is the most direct complete design. A normalized orthogonal basis avoids redundant lighting directions and has condition number one. Physical light is nonnegative, so orthogonal patterns cannot overlap in directional support. A complete set of N such patterns over N directions must light one direction at a time: after ordering, E = IN and Y = T. OLAT reaches the N-measurement lower bound for this ideal identification problem and removes the need to unmix measured responses.

### summary

The rank argument, in plain language

### p

More images do not automatically mean more independent information. If every environment is just a brighter or darker copy of one map, the columns of E are proportional and its rank is only one. With fewer than N independent directions in their span, some changes in T remain invisible in all the training observations. Full row rank removes that linear ambiguity; good conditioning reduces sensitivity to noise.

### p

For nonnegative patterns, ⟨eᵢ, eⱼ⟩ = ∑ₖ eₖᵢ eₖⱼ = 0 means every product is zero. Hence the patterns illuminate disjoint direction sets. With N nonzero, pairwise orthogonal patterns over N bins, each set contains one bin. Non-orthogonal full-rank designs also work; orthogonality is a well-conditioned choice, not a requirement for learning.

### p

This count assumes a fixed subject, pose, viewpoint, and linear response; varying the pose also changes T. Priors, reduced angular bandwidth, or a restricted response family can lower the data requirement. Orthogonality concerns the lighting inputs, not their images or learned latents. OLAT does not universally minimize capture time or noise: multiplexed lighting can have advantages under different sensor and illumination budgets.

### h2

Adapting the generative prior with orthogonal supervision.

### a

Light Stage

### a

HumanOLAT

### a

Relightable Gaussian Codec Avatars

### p

Real capture makes this supervision physically grounded. Paul Debevec’s team (Light Stage) measured directional facial reflectance; MPI Informatics / NVIDIA (HumanOLAT) provide multi-view full-body OLAT captures; and Meta’s Codec Avatars Lab (Relightable Gaussian Codec Avatars) learns relightable avatars from controlled lighting capture. These works establish the value of measured appearance across lighting conditions, using different capture patterns and model representations.

### p

Use isolated pairs to adapt a pretrained generative prior. A flat-lit / OLAT pair holds appearance and pose aligned while specifying one illumination direction. This gives the conditional generator a more explicit target than an unconstrained mixture of directions. In a latent diffusion model, adaptation trains the conditional denoising process on these pairs; it does not make the latent space itself orthogonal. The intended efficiency is in the supervision design, not a claimed universal speedup in optimization.

### p

Under ordinary linear light transport, contributions from separate lights add. An OLAT image contains the full response to one light—including its shadows and indirect scattering. Predict those responses for the same performance, and a new environment becomes a controlled linear combination.

### figcaption

A consistent basis for composition. Each example uses the same pose, with color and shading matched to its light direction. The figures are conceptual illustrations; the weighted sum is performed in linear image space.

### p

Adapt in latent space; compose in linear image space

### p

pθ(ZOLAT | Zflat, ωk)It(x; L) ≈ ∑k wk(L) Bt,k(x)

### p

Zflat and ZOLAT denote encoded paired sequences; pθ denotes the learned conditional generation distribution for direction ωk. The second line composes decoded OLAT responses Bt,k using environment-derived weights wk, per color channel in linear color space. It does not assume that latents or the generator are linear. Finite directional sampling and prediction errors remain.

### p

The data representation changes what we need to sample. Arbitrary environment maps span a large space of lighting combinations. At fixed light normalization, OLAT instead samples directions on the same compact sphere, ω ∈ 𝕊². More samples refine directional coverage; composition supplies the combinations. People, motion, materials, and viewpoints still require broad coverage.

### p

This suggested a learnable, structured family of OLAT responses in image and video space. Compactness of the direction domain is different from compactness of a transport operator: functions on the sphere still form an infinite-dimensional space. OLAT does not remove finite-sampling error or prove a globally learnable manifold; its advantage here is explicit directional supervision and linear composition.

### a

DifFRelight

### p

Before starting DynOLAT, we were inspired by DifFRelight: its subject-specific diffusion model showed highly realistic facial performance relighting from flat-lit and OLAT captures. We wanted to extend that direction to full bodies, motion, and unseen people, using a pretrained video model’s appearance and temporal priors.

### h2

A few poses cannot represent a performance.

### p

Our initial plan was to collect many conventional static flat-lit / OLAT pairs—the origin of our static subset. In our early experiments, static poses did not provide enough motion coverage, even for a fixed subject. Articulation, clothing deformation, and changing self-occlusion pushed us toward dynamic full-body capture.

### figcaption

Static pose coverage versus aligned dynamic supervision. The top row shows representative OLAT images from three separately held poses, not successive lights in one sweep. The bottom row shows three training pairs after alignment: pose is matched within each pair and changes across pairs.

### p

For direct image-based relighting, a full OLAT sweep needs the same scene state across lights. A moving person makes that difficult: the captured responses no longer belong to the same instant. Yet a video model can learn from partial directional observations across motion. Our system interleaves flat-lit and OLAT frames and uses optical flow to align them into training pairs. It does not capture every OLAT at each instant; the model learns to predict the missing responses.

### p

Learn a response across an entire sequence

### p

B̂1:T,k = Fθ(Vflat1:T, ωk)

### p

The video model Fθ predicts a basis sequence for light direction ωk, conditioned on a flat-lit sequence. Aligned dynamic pairs supervise lighting response across motion. This is the prediction task, not a guarantee of perfect temporal consistency. For general video inputs, delighting first maps the input toward the flat-lit domain.

### a

Supplement §F ↗

### p

The captures are synchronized across views. Within our compute and training-time budget, we did not explicitly enforce multi-view consistency. Our downstream 4D Gaussian Splatting example nevertheless shows useful implicit coherence in independently relit views; this is a qualitative observation, not a guarantee for all views or performances. Supplement §F ↗

### summary

What we hope this enables next

### p

We hope the data and learned OLAT responses support faster inference, distillation, and explicit multi-view training. One possibility is to compose OLAT predictions into environment-lit training pairs, then distill them into a model that takes an environment map directly. This could retain the benefits of structured supervision while reducing the cost of generating many basis videos. These are directions for future work.

### p

The choice of data comes first:isolate the light response, then learn it through motion.

### a

Watch the demo

### a

Explore the method →

## Assets and links

| Page | Element | Attribute | Target |
|---|---|---|---|
| index.html | link | href | `assets/fonts/lato-latin-400-normal.woff2` |
| index.html | link | href | `styles.css?v=20261019-4` |
| index.html | script | src | `script.js` |
| index.html | a | href | `#home` |
| index.html | a | href | `#home` |
| index.html | a | href | `#demo` |
| index.html | a | href | `project-source.html` |
| index.html | a | href | `#abstract` |
| index.html | a | href | `#method` |
| index.html | a | href | `#dataset` |
| index.html | a | href | `#experiment` |
| index.html | a | href | `assets/dynolat.pdf` |
| index.html | a | href | `https://huggingface.co/datasets/STLAND/ZJU_OLAT` |
| index.html | a | href | `#demo` |
| index.html | a | href | `assets/dynolat.pdf#page=18` |
| index.html | a | href | `assets/videos/dynolat-demo.mp4` |
| index.html | video | poster | `assets/videos/dynolat-demo-poster.jpg` |
| index.html | source | src | `assets/videos/dynolat-demo.mp4` |
| index.html | a | href | `assets/videos/dynolat-demo.mp4` |
| index.html | a | href | `project-source.html` |
| index.html | a | href | `assets/method-overview-dark.svg` |
| index.html | img | src | `assets/method-overview-dark.svg` |
| index.html | a | href | `https://huggingface.co/datasets/STLAND/ZJU_OLAT` |
| index.html | video | src | `assets/videos/comparisons/lighting-response.mp4` |
| index.html | video | poster | `assets/videos/comparisons/lighting-response.jpg` |
| index.html | a | href | `assets/videos/comparisons/lighting-response.mp4` |
| index.html | a | href | `assets/dynolat.pdf#page=12` |
| index.html | source | src | `assets/videos/shanghai-sdr.mp4` |
| index.html | source | src | `assets/videos/sky-sdr.mp4` |
| index.html | source | src | `assets/videos/environment-01-sdr.mp4` |
| index.html | source | src | `assets/videos/shanghai-sdr.mp4` |
| index.html | source | src | `assets/videos/shanghai-hdr.mp4` |
| index.html | a | href | `assets/dynolat.pdf#page=19` |
| project-source.html | link | href | `styles.css?v=20261019-4` |
| project-source.html | link | href | `project-source.css?v=20261020-2` |
| project-source.html | a | href | `#project-source` |
| project-source.html | a | href | `index.html` |
| project-source.html | a | href | `#rendering` |
| project-source.html | a | href | `#supervision` |
| project-source.html | a | href | `#olat` |
| project-source.html | a | href | `#motion` |
| project-source.html | img | src | `assets/project-source/transport-paths.svg` |
| project-source.html | a | href | `https://homepages.inf.ed.ac.uk/ksubr/Files/Papers/SIG22_Compactness.pdf` |
| project-source.html | a | href | `https://proceedings.iclr.cc/paper_files/paper/2025/file/1cce374fec7829c24a97ae0e91cd0999-Paper-Conference.pdf` |
| project-source.html | a | href | `https://arxiv.org/abs/2501.18590` |
| project-source.html | img | src | `assets/project-source/mixed-supervision.svg` |
| project-source.html | a | href | `https://www.pauldebevec.com/Research/LS/debevec-siggraph2000-high.pdf` |
| project-source.html | a | href | `https://arxiv.org/abs/2508.09137` |
| project-source.html | a | href | `https://arxiv.org/abs/2312.03704` |
| project-source.html | img | src | `assets/project-source/olat-composition.svg` |
| project-source.html | a | href | `https://arxiv.org/abs/2410.08188` |
| project-source.html | img | src | `assets/project-source/dynamic-pairs.svg` |
| project-source.html | a | href | `assets/dynolat.pdf#page=20` |
| project-source.html | a | href | `index.html#demo` |
| project-source.html | a | href | `index.html#method` |
