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

### a

Visual story Same person. New light. Every frame. ↗

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

## project-source-visual.html

### title

The Insights Behind DynOLAT — Visual Story

### a

跳到正文Skip to the story

### a

DynOLAT

### a

原版 · 技术解读Technical edition ↗

### p

THE INSIGHTS BEHIND DYNOLAT

### h1 · hero-title

换一束光，还是那个人。Same person.New light.Every frame.

### p

想象把视频里的人，从午后的窗边搬到霓虹灯下。我们想改变的只有光：他的长相、衣服和动作，都应该接得上。Imagine moving a person in a video from a sunlit window to a neon-lit street. We want to change the light while preserving their identity, clothing, and performance.

### a

从一个熟悉的问题开始Start with a familiar question ↓

### figcaption

AI 概念配图AI concept illustration点击切换预先生成的示意画面；这不是在线运行的 DynOLAT。Switch between pre-generated illustrations; this is not a live DynOLAT demo.

### a

00 为什么Why

### a

01 真实感Realism

### a

02 控制光Control

### a

03 一束光One light

### a

04 动起来Motion

### a

05 真实结果Results

### h2

人物已经很清晰了。为什么还要研究光？The pixels are sharp.Why keep studying light?

### p

在游戏里，你可能会停下来，看角色走进阳光、经过路灯，或转身面向一扇窗。让人觉得“真”的，不只是贴图有多清楚，而是光落在皮肤、头发和衣服上时，是否都恰到好处。In a game, you might stop to watch a character step into sunlight, pass a streetlamp, or turn toward a window. Believability depends on more than sharp textures: light has to behave convincingly on skin, hair, and clothing.

### h3

同样追求真实，不同的制作预算。The same pursuit of realism.Different production budgets.

### p

影视与游戏都能做出逼真的人物。影视制作往往可以投入更多资产打磨与逐帧计算；实时游戏则必须在玩家转动镜头、角色移动时，立即给出下一帧。60 帧游戏中，每一帧留给所有计算的时间约为 16.7 毫秒。Both films and games can depict convincing humans. Film production can often spend more time refining assets and computing each frame. A real-time game must respond immediately as the camera and character move. At 60 frames per second, the entire frame has about 16.7 milliseconds.

### p

DLSS 5 已将生成式模型引入游戏渲染，用真实外观先验增强光照与材质。它处理的是引擎渲染的画面；DynOLAT 则研究如何给真人视频换光。两者关注的问题有关联，但输入、目标和运行约束不同。DLSS 5 brings generative models into game rendering to enhance lighting and materials using real-world appearance priors. It works with engine-rendered frames; DynOLAT studies relighting real human videos. The questions are related, but the inputs, goals, and runtime constraints differ.

### a

NVIDIA 技术说明NVIDIA technical overview ↗

### a

来源：NVIDIA / CAPCOMSource: NVIDIA / CAPCOM ↗

### figcaption

官方游戏画面Official game imageResident Evil Requiem · DLSS 5 On。用于说明技术背景，不是 DynOLAT 的效果或性能对比。Resident Evil Requiem · DLSS 5 On. Context for the discussion, not a DynOLAT result or benchmark. 来源：NVIDIA / CAPCOMSource: NVIDIA / CAPCOM ↗

### p

我们的问题是：给一段真人视频，能否自由换光，还让这个人从头到尾保持连贯？Our question:Can we relight a human video freelywhile keeping the performance coherent?

### h2

光碰到人的地方，藏着大量细节。Light meets a person.A thousand details appear.

### p

耳廓会微微透光，发丝会接住一道亮边，衣服褶皱里会有明暗变化。传统物理渲染可以模拟这些现象，但要算得像，首先要知道这个人是什么形状、皮肤怎样散射光、头发和布料是什么材质。An ear glows softly, strands of hair catch a rim light, and folds of fabric fall into shade. Physical rendering can simulate these effects. But convincing simulation needs accurate shape, skin scattering, hair, and fabric properties.

### p

难点不是“物理方法不会算阴影”，而是这些信息很难从普通视频中完整获得。资产越精细、光的路径越复杂，采集、制作和计算通常就越昂贵。The problem is not that physical methods cannot render shadows. It is that ordinary video does not reveal all the required information. More detailed assets and more complex light paths generally demand more capture, production work, and computation.

### figcaption

AI 概念配图AI concept illustration同一张脸、同一件衣服：皮肤、发丝和织物会以不同方式响应光。One face, one jacket: skin, hair, and fabric respond to light in different ways.

### summary

再深入一点：为什么“增加计算”也有理论边界？A little deeper: what are the limits of numerical approximation?

### p

除了获取准确材质，数值近似本身也有边界：某种表示在一些光照下很准确，不代表增加有限个基函数，就能让它在所有可能的入射光场下同时达到任意精度。这里讨论的是对所有输入的统一保证，不是否定特定场景能渲染得准确。具体条件与证明可参考下方论文。Beyond recovering materials, numerical approximation has limits. Accuracy under some lighting does not mean that enlarging a finite basis gives arbitrarily small error uniformly over every possible incident light field. This concerns a guarantee across all inputs; it does not rule out accurate rendering for a particular scene. See the paper for assumptions and proof.

### a

A Theoretical Analysis of Compactness of the Light Transport Operator ↗

### h2

“把光换成这个场景。”模型真的学会了吗？“Light them like this scene.”What did the model learn?

### p

生成式模型带来了另一条路：从大量画面中学习真实的外观，而不必逐一重建全部材质。常见做法是给模型一张环境光贴图——你可以把它理解为，将四面八方的光展开成一张全景图——让它生成新光照下的人。Generative models offer another route: learn realistic appearance from images instead of explicitly reconstructing every material. A common approach provides an environment map—think of the light arriving from all around you, unfolded into a panorama—and asks the model to generate a relit person.

### figcaption

AI 概念配图AI concept illustration上方是光照环境的直观示意，下方是生成的人物画面；不是实测 HDR 环境贴图或研究结果。每个环境都混合了多个位置、颜色与强度的光。Environment illustrations above, generated portraits below—not measured HDR maps or research outputs. Each environment mixes light from different positions, colors, and intensities.

### h3

第一个问题：训练答案准不准？First:is the training target accurate?

### p

如果“换光前后”的训练配对来自合成、图像退化，或对光照的估计，就可能与真实拍摄有差异。模型不仅要学会换光，还要跨过数据与现实之间的距离。If training pairs come from rendering, image degradation, or estimated lighting, they can differ from measured real-world changes. The model has to learn relighting while also bridging the gap between its supervision and reality.

### h3

第二个问题：到底是哪束光的作用？Second:which light caused what?

### p

即使配对完全真实，窗户、天空和室内灯一起照亮一个人，照片里也只看得到总效果。只凭总效果，模型不容易分清每个方向各贡献了多少。逼真，并不自动等于精确可控。Even with perfectly measured pairs, a window, the sky, and a lamp illuminate the person together. The photograph shows only their combined effect. Separating each direction's contribution is harder than producing a plausible-looking image.

### summary

一个初中代数就能理解的例子An example using simple algebra

### p

左灯和右灯各贡献多少，是两个未知数。两张独立的照片就像两条独立的方程：一张左灯强、右灯弱，另一张左灯弱、右灯强。如果只是把第一组灯整体调亮，再拍一张，其实没有增加区分左右的线索。The left and right light contributions are two unknowns. Two independent photos act like two independent equations: strong left and weak right, then weak left and strong right. Simply making the first setup brighter adds no clue about their separate contributions.

### p

同样，对一个固定的人、姿势和视角，如果有 N 个待分离的光照方向，在不引入额外假设时，至少需要 N 个独立观测。这是固定场景下的线性方程计数，不是说神经网络一律要 N 张训练图。数值是线性亮度的示例，真实图像还要分别考虑颜色通道。Likewise, for a fixed person, pose, and camera, N unknown directional contributions require at least N independent observations without additional assumptions. This counts linear equations for a fixed scene; it is not a universal neural-network training-set requirement. The illustrative values are linear brightness units; real images also have separate color channels.

### summary

相关工作：IC-Light 与 DiffusionRendererRelated work: IC-Light and DiffusionRenderer

### p

IC-Light 的野外图像分支通过退化或增强构造配对，并估计光照；完整方法也使用合成与真实 Light Stage 数据。DiffusionRenderer 使用合成数据，同时加入自动标注的真实视频以缩小域差异。这里关注的是监督信号有多准确，不是说这些方法只使用合成数据。IC-Light's in-the-wild branch constructs pairs through degradation or augmentation and estimates lighting; the full method also uses rendered and real Light Stage data. DiffusionRenderer combines synthetic data with auto-labeled real videos to reduce the domain gap. The question is supervision accuracy, not a claim that these methods use only synthetic data.

### a

IC-Light ↗

### a

DiffusionRenderer ↗

### h2

那就一次，只开一盏灯。Then switch onone light at a time.

### p

这就是 OLAT：One Light At a Time。只开左边的灯，就能看清左边这束光的作用；只开上面的灯，就能看清顶光的作用。训练时，答案里不再混着一整套复杂环境。That is OLAT: One Light At a Time. Turn on the left light to observe its contribution. Turn on the overhead light to observe that one. Each training target isolates a direction instead of mixing an entire environment.

### figcaption

AI 概念配图AI concept illustration方向与颜色用于解释单灯和组合的关系。四幅画面由 AI 生成，不是实测 OLAT，也不是前三幅的数值求和。Directions and colors explain isolated and combined lighting. These AI-generated views are not measured OLAT responses or a numerical sum of the first three panels.

### p

在通常的线性光传输条件下，不同光源的贡献可以相加。一束光本身产生的阴影、反射与皮肤散射，已经包含在它的 OLAT 画面里。我们希望模型学会这些画面，再按环境中各方向的光强进行组合。Under ordinary linear light transport, contributions from separate lights add. The shadows, reflections, and skin scattering caused by one light are already present in its OLAT image. We aim to predict these images, then combine them using the environment's directional light intensities.

### p

这样，采数据就从“不断增加复杂光照的组合”，变成“更细致地覆盖光的方向”。生成模型负责预测单灯下的样子，组合步骤负责控制各束光的权重。实际组合在图像的线性颜色空间里完成，预测误差和有限方向采样仍然存在。Data collection shifts from adding complex lighting mixtures to covering light directions more carefully. The generator predicts each single-light appearance; composition controls the light weights. Actual composition happens in linear image color space, with prediction and directional-sampling errors still remaining.

### summary

为什么这与“正交监督”有关？How does this relate to orthogonal supervision?

### p

可以把每个方向看作一个开关。OLAT 每次只打开一个，因此两张不同方向的照明模式没有共同亮起的方向——这就是这里的“正交”。这种设计让每个方向的贡献直接可见。其他线性独立的混合照明也可能解出答案，但完整、非负且正交的方向基，自然就是逐个方向单独点亮。Think of each direction as a switch. OLAT activates only one at a time, so two different patterns share no active direction: this is the orthogonality meant here. Other independent mixtures can also recover the contributions, but a complete nonnegative orthogonal directional basis naturally isolates directions one by one.

### p

它不意味着视频模型的 latent space 也变得正交，更不是“只要有 OLAT 就一定能泛化”。我们用更明确的配对目标，去调整已经学过大量视频的生成模型。人物、材质和动作仍然需要足够多样的数据。This does not make the video model's latent space orthogonal, or guarantee generalization. Clearer paired targets adapt a model that already has video priors. People, materials, and motion still require diverse data.

### summary

这条路线从哪里获得启发？Where did this direction come from?

### p

Paul Debevec 团队的 Light Stage、MPI Informatics / NVIDIA 的 HumanOLAT，以及 Meta Codec Avatars Lab 的相关工作，展示了真实受控光照采集的价值。DifFRelight 在特定人物的人脸重光照上呈现了很好的真实感，启发我们进一步探索：全身、动态，以及没见过的人。Paul Debevec's Light Stage, HumanOLAT from MPI Informatics / NVIDIA, and work from Meta's Codec Avatars Lab demonstrate the value of real controlled-light capture. DifFRelight's realistic subject-specific facial relighting inspired us to explore full bodies, motion, and unseen people.

### a

Light Stage ↗

### a

HumanOLAT ↗

### a

Relightable Gaussian Codec Avatars ↗

### a

DifFRelight ↗

### h2

一张照片像真的，还不够。One convincing frameis only the beginning.

### p

我们最初想采集大量静止姿势下的平光 / 单灯配对。但实验提醒我们：即使是同一个人，学过几个姿势，也不意味着能应对转身、抬手和衣服的连续变形。We initially planned to collect many static flat-lit / single-light pairs. Our experiments showed that even for the same person, a few poses did not cover turning, raising an arm, or continuously deforming clothing.

### p

因此，我们开始采集动态的全身配对。在真实动作中交替拍摄平光和单灯画面，再对齐成训练对。视频模型由此同时学习“光怎么变”与“人怎么动”，并预测每一束光下的整段视频。We therefore captured dynamic full-body pairs: alternating flat-lit and single-light frames during real performances, then aligning them for training. The video model learns lighting response through motion and predicts an entire sequence for each light direction.

### figcaption

AI 概念配图AI concept illustration每一列是一对：动作相同，光照不同。示意的是对齐后的训练配对，并不表示采集时能在同一瞬间拍到所有光照。Each column is a pair: matching motion, different light. This illustrates aligned training pairs, not simultaneous capture of all lighting directions.

### h3

普通视频，也应该能成为起点。An ordinary videoshould be a starting point too.

### p

输入不必已经是理想的平光。DynOLAT 先通过 delighting 减弱原有光照的影响，尽量映射到训练时的平光域，再预测单灯视频并合成新光照。The input need not already have ideal flat lighting. DynOLAT first uses delighting to reduce the original illumination and move the input toward the flat-lit training domain, then predicts single-light videos and composes new lighting.

### h2

看它，动起来。Now watch it move.

### p

上面的写实画面用于解释概念。下面是项目补充视频中的真实演示片段，保留了原始方法标签。可以分别观察光照变化、时间连贯性和普通视频输入。The photorealistic illustrations above explain the ideas. Below are actual excerpts from the project's supplementary video, with the original method labels retained. Explore lighting changes, temporal consistency, and ordinary video inputs.

### figcaption

项目真实演示Actual research demo补充视频 02:09–02:27 · 观察方向与强度变化。Supplementary video 02:09–02:27 · Observe changes in direction and intensity.补充视频 03:47–03:53 · 与逐帧推理的时间连贯性对比。Supplementary video 03:47–03:53 · Temporal consistency compared with per-frame inference.补充视频 03:30–03:45 · 普通输入演示，不是 delighting 的单独消融实验。Supplementary video 03:30–03:45 · General-input examples, not an isolated delighting ablation.

### a · video-download

打开 MP4Open the MP4 ↗

### p · video-error

浏览器无法播放这段视频。The browser could not play this clip. 打开 MP4Open the MP4 ↗

### h3

这项研究，走到了哪一步？Where does the research stand?

### p

DynOLAT 研究的是可控、连贯的真人视频重光照，目前不是可直接接入游戏的实时功能。强阴影与复杂彩光可能残留，细节和跨视角一致性也并不完美；生成多束单灯视频仍有计算与存储成本。我们希望后续的加速、蒸馏和多视角研究继续缩短这段距离。DynOLAT studies controllable, coherent human video relighting; it is not currently a real-time game feature. Strong shadows or colored light can leave residuals, and details and cross-view consistency are imperfect. Generating many single-light videos also costs compute and storage. Acceleration, distillation, and multi-view research are directions for future work.

### p

THE INSIGHT

### h2

先学会一束光。再让它，跟着人一起动。Learn one light.Then follow the person through motion.

### p

我们的目标，是让光照变得可控，让真实感在动作里延续。Our goal: controllable lighting, with realism that holds through motion.

### a

阅读论文 + 补充材料Read the paper + supplement ↗

### a

继续阅读技术版Explore the technical edition ↗

### a

项目主页Project homepage ↗

### a

图像来源与生成记录Image sources & generation notes

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

### a

Explore the visual story · 写实图文版 ↗

### p

Explore the visual story · 写实图文版 ↗

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
| index.html | a | href | `project-source-visual.html` |
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
| project-source-visual.html | link | href | `project-source-visual.css?v=20261021-1` |
| project-source-visual.html | script | src | `project-source-visual.js?v=20261021-1` |
| project-source-visual.html | a | href | `#story` |
| project-source-visual.html | a | href | `index.html` |
| project-source-visual.html | a | href | `project-source.html` |
| project-source-visual.html | a | href | `#why` |
| project-source-visual.html | img | src | `assets/insights-visual/hero-lighting.png` |
| project-source-visual.html | a | href | `#why` |
| project-source-visual.html | a | href | `#detail` |
| project-source-visual.html | a | href | `#control` |
| project-source-visual.html | a | href | `#one-light` |
| project-source-visual.html | a | href | `#motion` |
| project-source-visual.html | a | href | `#results` |
| project-source-visual.html | a | href | `https://research.nvidia.com/labs/adlr/DLSS5/` |
| project-source-visual.html | img | src | `assets/insights-visual/dlss5-official.jpg` |
| project-source-visual.html | a | href | `https://www.nvidia.com/en-us/geforce/news/dlss5-breakthrough-in-visual-fidelity-for-games/` |
| project-source-visual.html | img | src | `assets/insights-visual/materials.png` |
| project-source-visual.html | a | href | `https://homepages.inf.ed.ac.uk/ksubr/Files/Papers/SIG22_Compactness.pdf` |
| project-source-visual.html | img | src | `assets/insights-visual/hero-lighting.png` |
| project-source-visual.html | img | src | `assets/insights-visual/environments.png` |
| project-source-visual.html | a | href | `https://proceedings.iclr.cc/paper_files/paper/2025/file/1cce374fec7829c24a97ae0e91cd0999-Paper-Conference.pdf` |
| project-source-visual.html | a | href | `https://arxiv.org/abs/2501.18590` |
| project-source-visual.html | img | src | `assets/insights-visual/olat-bases.png` |
| project-source-visual.html | a | href | `https://www.pauldebevec.com/Research/LS/debevec-siggraph2000-high.pdf` |
| project-source-visual.html | a | href | `https://arxiv.org/abs/2508.09137` |
| project-source-visual.html | a | href | `https://arxiv.org/abs/2312.03704` |
| project-source-visual.html | a | href | `https://arxiv.org/abs/2410.08188` |
| project-source-visual.html | img | src | `assets/insights-visual/motion-pairs.png` |
| project-source-visual.html | video | poster | `assets/videos/comparisons/lighting-response.jpg` |
| project-source-visual.html | source | src | `assets/videos/comparisons/lighting-response.mp4` |
| project-source-visual.html | a | href | `assets/videos/comparisons/lighting-response.mp4` |
| project-source-visual.html | a | href | `assets/dynolat.pdf` |
| project-source-visual.html | a | href | `project-source.html` |
| project-source-visual.html | a | href | `index.html` |
| project-source-visual.html | a | href | `VISUAL_ASSETS.md` |
| project-source.html | link | href | `styles.css?v=20261019-4` |
| project-source.html | link | href | `project-source.css?v=20261020-3` |
| project-source.html | a | href | `#project-source` |
| project-source.html | a | href | `index.html` |
| project-source.html | a | href | `#rendering` |
| project-source.html | a | href | `#supervision` |
| project-source.html | a | href | `#olat` |
| project-source.html | a | href | `#motion` |
| project-source.html | a | href | `project-source-visual.html` |
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
