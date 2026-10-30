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

Given a flat-lit video, our model predicts temporally coherent OLAT basis videos for requested light directions and combines them in linear color space under a new environment map. For general videos with uncontrolled lighting, we also trained a lightweight delighting model to map the input toward the flat-lit domain.

### figcaption

Dark web reconstruction of Fig. 2. The original paper pixels are retained, with the people and environment maps separated by transparent masks; network blocks and connections are redrawn as editable SVG. Swipe horizontally to inspect details on small screens.

### h3

Light-conditioned video prediction

### p

Spherical harmonic embeddings encode target light directions. The video model predicts a corresponding sequence of OLAT basis frames for each direction.

### h3

Bridge Latent Matching

### p

Bridge matching transports flat-lit source latents toward OLAT target latents, reducing distribution mismatch while preserving temporal structure and identity details.

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

### p

DynOLAT improves lighting-response fidelity across most reported image metrics and achieves the lowest errors in the reported temporal comparison. These tables reproduce Tables 2 and 3 of the paper.

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

### p

Twelve synchronized camera views from one dynamic capture. Play any view to compare the full performance across cameras.

### figcaption

Camera ASynchronized multi-view capture

### figcaption

Camera BSynchronized multi-view capture

### figcaption

Camera CSynchronized multi-view capture

### figcaption

Camera DSynchronized multi-view capture

### figcaption

Camera ESynchronized multi-view capture

### figcaption

Camera FSynchronized multi-view capture

### figcaption

Camera HSynchronized multi-view capture

### figcaption

Camera ISynchronized multi-view capture

### figcaption

Camera JSynchronized multi-view capture

### figcaption

Camera KSynchronized multi-view capture

### figcaption

Camera LSynchronized multi-view capture

### figcaption

Camera MSynchronized multi-view capture

### a

↓Download clip

### figcaption

Camera D · Forward / reverseOriginal source is MPEG‑4 Part 2; this browser cannot decode it. Download for a compatible player.

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

### p

Beyond asset acquisition, numerical approximation has a theoretical limitation. Soler, Molazem, and Subr (2022) show that the general light transport operator is non-compact: enlarging a finite basis cannot drive the worst-case error to zero uniformly across all normalized input light fields. In practical terms, accuracy under selected lighting conditions does not guarantee accuracy under arbitrary illumination.

### a

A Theoretical Analysis of Compactness of the Light Transport Operator

### p

This limits uniform approximation across all inputs; it does not rule out accurate rendering or convergence for a fixed input. For the precise assumptions and proof, see A Theoretical Analysis of Compactness of the Light Transport Operator.

### h2

How can we achieve precise control in a generative model?

### p

Generative models provide strong priors for appearance and motion, with outputs that can closely match real-world appearance. Environment-map conditioning turns relighting into a generation task: predict a new image or video for a requested illumination. Two questions remain: how faithfully the training pairs represent real lighting changes, and how independently they constrain different lighting directions.

### a

IC-Light

### p

IC-Light. Its in-the-wild branch creates relighting pairs by degrading or augmenting input appearance and estimating target lighting, rather than recapturing the same scene under calibrated lights. The full method also uses rendered and real Light Stage data, and imposes light-transport consistency. Our concern is that augmentation and estimated lighting provide approximate supervision, even when the target photograph is real.

### a

DiffusionRenderer

### p

DiffusionRenderer. Its forward renderer conditions video generation on G-buffers and an environment map. Synthetic data provides exact labels, but the paper reports a domain gap when training on synthetic data alone. It therefore adds auto-labeled real videos and a LoRA for real data; the estimated geometry, materials, and lighting can still contain errors. This motivates measured pairs without implying that either method uses only synthetic supervision.

### figcaption

One flat-lit input under three different environments. Each conceptual output combines illumination across its entire map: warm upper-left with cool lower-right light, teal upper-right with warm lower-left light, and blue overhead with teal lower-left light. The body gradients reflect both the broad background illumination and the colored bright regions.

### p

The question is: how much does each light contribute? Even with perfectly measured pairs, an environment-lit image only shows their combined effect. For a fixed person, pose, and camera, consider the brightness at one image pixel in one color channel. If two lights illuminate the person, their separate contributions are two unknowns. This is the familiar problem of solving simultaneous linear equations: two unknowns need at least two independent equations.

### p

Two unknowns → two independent observations

### p

Photo 1: 80% left light + 20% right light → measured brightness 12.

### p

Photo 2: 20% left light + 80% right light → measured brightness 18.

### p

Together, these observations tell us that the left light alone contributes 10 and the right light alone contributes 20. Check: 80% of 10 plus 20% of 20 is 12; reversing the weights gives 18. These are illustrative values in linear brightness units.

### p

Simply making the first lighting setup twice as bright gives twice the total, but no new clue about the two separate contributions. We need a different mixing ratio, not just another photograph.

### p

Now extend this to an environment map. An h × w map has h × w directional bins. At each image pixel, there is one unknown contribution per direction. Recovering them all, without additional assumptions, therefore needs at least that many independent lighting observations. More photographs help only if they add independent equations.

### p

OLAT makes the unknowns directly observable. Turn on only the left light, and measure its contribution; then turn on only the right light. There is no mixture to disentangle. Repeating this for each direction gives a complete set of independent observations. These single-direction lighting patterns are orthogonal: they have no illuminated directions in common. Since physical light intensities are nonnegative, overlapping directions cannot cancel to make two patterns orthogonal. Seeking a complete, orthogonal lighting design therefore naturally leads to one light at a time.

### p

This counting argument applies to a fixed scene with a linear response. It explains the supervision design, not a universal training-set size for a generative model. Learned priors can reduce the observations needed; non-orthogonal but independent lighting patterns can also provide enough equations.

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
| index.html | a | href | `assets/method-overview-dark.svg?v=20261030-5` |
| index.html | img | src | `assets/method-overview-dark.svg?v=20261030-5` |
| index.html | a | href | `https://huggingface.co/datasets/STLAND/ZJU_OLAT` |
| index.html | a | href | `assets/dynolat.pdf#page=12` |
| index.html | source | src | `assets/videos/jcam/JcamA.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamB.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamC.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamD.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamE.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamF.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamH.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamI.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamJ.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamK.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamL.mp4` |
| index.html | source | src | `assets/videos/jcam/JcamM.mp4` |
| index.html | a | href | `assets/videos/jcam/JcamD_forward_reverse_x1.mp4` |
| index.html | source | src | `assets/videos/shanghai-sdr.mp4` |
| index.html | source | src | `assets/videos/shanghai-hdr.mp4` |
| index.html | a | href | `assets/dynolat.pdf#page=19` |
| project-source.html | link | href | `styles.css?v=20261019-4` |
| project-source.html | link | href | `project-source.css?v=20261020-3` |
| project-source.html | a | href | `#project-source` |
| project-source.html | a | href | `index.html` |
| project-source.html | a | href | `#rendering` |
| project-source.html | a | href | `#supervision` |
| project-source.html | a | href | `#olat` |
| project-source.html | a | href | `#motion` |
| project-source.html | img | src | `assets/project-source/transport-paths.svg?v=20261020-3` |
| project-source.html | a | href | `https://homepages.inf.ed.ac.uk/ksubr/Files/Papers/SIG22_Compactness.pdf` |
| project-source.html | a | href | `https://proceedings.iclr.cc/paper_files/paper/2025/file/1cce374fec7829c24a97ae0e91cd0999-Paper-Conference.pdf` |
| project-source.html | a | href | `https://arxiv.org/abs/2501.18590` |
| project-source.html | img | src | `assets/project-source/mixed-supervision.svg?v=20261020-4` |
| project-source.html | a | href | `https://www.pauldebevec.com/Research/LS/debevec-siggraph2000-high.pdf` |
| project-source.html | a | href | `https://arxiv.org/abs/2508.09137` |
| project-source.html | a | href | `https://arxiv.org/abs/2312.03704` |
| project-source.html | img | src | `assets/project-source/olat-composition.svg?v=20261020-3` |
| project-source.html | a | href | `https://arxiv.org/abs/2410.08188` |
| project-source.html | img | src | `assets/project-source/dynamic-pairs.svg?v=20261020-3` |
| project-source.html | a | href | `assets/dynolat.pdf#page=20` |
| project-source.html | a | href | `index.html#demo` |
| project-source.html | a | href | `index.html#method` |
