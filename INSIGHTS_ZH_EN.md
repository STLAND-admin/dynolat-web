# The Insights Behind DynOLAT

## 中英文对照编辑稿

对应网页：[The Insights Behind DynOLAT](project-source.html)

英文基准：`project-source.html`，Git 提交 `0e2ef19`，2026-10-20。

**修改方式：** 直接修改各段的「中文」内容即可；下方英文保留当前网页原文作为对照。段落编号用于将修改对应回网页。公式由中英文共用；图注、折叠说明和图内文字均已收录。

这是一份供人工修改的独立稿件。修改本文件不会自动更新网页；后续可以据此同步英文文案与 HTML。

---

## 00 / 开篇 · Opening

**中文｜页面标题**

DynOLAT 背后的思考

**English**

The Insights Behind DynOLAT

**中文｜核心问题**

如何渲染任意光照下的人体，同时保持时序一致性？

**English**

How can we render a person under arbitrary lighting while staying consistent over time?

**中文｜引言**

这个问题引导我们从渲染与生成模型出发，思考数据应该采用什么形式：学习单个光源的响应，并在运动中采集这些响应。

**English**

This question led us from rendering and generative models to a choice about data: learn individual light responses, and capture them in motion.


---

## 01 / 渲染的挑战 · The rendering challenge

网页位置：`#rendering`

**中文｜01 / 章节标题**

精确的场景资产，严苛的近似要求。

**English**

Accurate assets. Demanding approximations.

**中文｜01.P01**

对于运动中的人体，基于物理的渲染器需要精确的几何，以及皮肤、毛发和衣物的材质信息。从图像恢复这些场景资产是一个约束不足的问题，而达到制作级品质通常需要大量采集、艺术家投入和计算资源。这些实际成本使其难以扩展到大量人物与表演。

**English**

For moving humans, a physical renderer needs accurate geometry and the materials of skin, hair, and clothing. Recovering these assets from images is underconstrained, and production quality often requires substantial capture, artist effort, and computation. These practical costs make scaling across people and performances difficult.


### 01.F01 / 配图

![反射、散射和自遮挡取决于人物的几何与材质，并共同决定最终的渲染外观。](assets/project-source/transport-paths.svg)

**中文｜01.F01 / 图注**

场景资产的保真度与光传输的近似精度都很重要。复杂光路可以被模拟，但其外观取决于场景模型与数值近似。

**English**

Asset fidelity and transport approximation both matter. Complex light paths can be simulated, but their appearance depends on the scene model and the numerical approximation.

**中文｜图片替代文本**

反射、散射和自遮挡取决于人物的几何与材质，并共同决定最终的渲染外观。

**English alt text**

Reflection, scattering, and self-occlusion depend on the person's geometry and materials, and all contribute to the rendered appearance.

**图内文字对照**

| 中文 | English |
| --- | --- |
| 光路塑造外观 | Light paths shape appearance |
| 光源 A | Light A |
| 光源 B | Light B |
| 视角 | View |
| 反射 | Reflection |
| 散射 | Scattering |
| 自遮挡 | Self-occlusion |
| 几何 + 材质 + 可见性 | Geometry + materials + visibility |

**中文｜01.P02**

将一般光传输压缩为有限表示，也存在理论上的限制。在论文 [A Theoretical Analysis of Compactness of the Light Transport Operator](https://homepages.inf.ed.ac.uk/ksubr/Files/Papers/SIG22_Compactness.pdf) 中，Soler、Molazem 和 Subr（2022）指出，一般光传输算子是非紧的。因此，有限秩近似无法在所有单位范数的输入辐亮度场上，一致收敛到该算子。

**English**

There is also a limit to compressing general transport into finite representations. In [A Theoretical Analysis of Compactness of the Light Transport Operator](https://homepages.inf.ed.ac.uk/ksubr/Files/Papers/SIG22_Compactness.pdf), Soler, Molazem, and Subr (2022) show that the general transport operator is non-compact. Finite-rank approximations therefore cannot converge to it uniformly over all unit-norm input radiance fields.


### 01.E01 / 公式

**中文｜01.E01 / 公式标题**

有限秩一致近似的局限

**English**

A limit on uniform finite-rank approximation

**公式（中英文共用）**

$$
\begin{gathered}
\ell = e + \mathcal{K}\ell
\\
\mathcal{K}\text{ non-compact}
\;\Rightarrow\;
\lVert\mathcal{K}-\mathcal{K}_N\rVert_{\mathrm{op}}\not\to 0
\end{gathered}
$$

**中文｜01.E01 / 公式说明**

$\mathcal{K}$ 描述完整的、无限维辐亮度场经过一次反弹后的传输；$\mathcal{K}_N$ 是有限秩算子。算子范数衡量所有单位范数输入上的最坏情况误差。这里的算子不同于下文有限维的“光照到图像”传输矩阵。

**English**

𝒦 transports the full, infinite-dimensional radiance field by one bounce; 𝒦<sub>N</sub> is finite-rank. The operator norm measures worst-case error over unit-norm inputs. This operator differs from the finite light-to-image transport matrices below.

**中文｜01.P03**

这一结果限制了使用不依赖具体光照的有限基进行一致近似的能力；它并不否定蒙特卡洛方法在固定渲染问题上的收敛性。我们的方向是通过结构化的光照监督学习实测的人体外观，同时评估仍然存在的近似误差与泛化误差。

**English**

This result limits uniform approximation with lighting-independent finite bases; it does not rule out Monte Carlo convergence for a fixed rendering problem. Our direction is to learn measured human appearance with structured lighting supervision, while evaluating the remaining approximation and generalization errors.


---

## 02 / 监督的挑战 · The supervision challenge

网页位置：`#supervision`

**中文｜02 / 章节标题**

图像逼真，并不意味着光照控制精确。

**English**

A convincing image does not yet mean precise light control.

**中文｜02.P01**

视频生成模型为逼真的外观与运动提供了强大的先验。但如果缺少足够的真实配对监督，学习重光照仍可能面临训练数据与真实人体外观之间的差距。真实采集提供了直接监督：Paul Debevec 及其同事的 Light Stage 工作、MPI 的 Christian Theobalt 团队的 HumanOLAT，以及 Meta 的 Shunsuke Saito 及其同事的 Relightable Gaussian Codec Avatars，展示了测量和学习真实光照响应的不同方式。

**English**

Video generation models offer strong priors for realistic appearance and motion. But learning relighting without sufficient real, paired supervision can leave a gap between training data and real human appearance. Real captures provide direct supervision: the Light Stage work of Paul Debevec and colleagues, HumanOLAT from Christian Theobalt’s group at MPI, and Shunsuke Saito and colleagues’ Relightable Gaussian Codec Avatars at Meta demonstrate different ways of measuring and learning real lighting responses.


### 02.F01 / 配图

![具有重叠光照方向的环境光照图混合了多个方向的响应。三个非负、正交的 OLAT 光照模式分别照亮一个方向，并揭示对应的基响应。](assets/project-source/mixed-supervision.svg)

**中文｜02.F01 / 图注**

从光照方向相互重叠的环境图，转向正交的光照基。OLAT 将各个输入方向分离开来；得到的图像并不需要正交。图中的三个方向仅用于概念示意。

**English**

From overlapping environments to an orthogonal lighting basis. OLAT isolates each input direction; the resulting images need not be orthogonal. The three-direction example is schematic.

**中文｜图片替代文本**

具有重叠光照方向的环境光照图混合了多个方向的响应。三个非负、正交的 OLAT 光照模式分别照亮一个方向，并揭示对应的基响应。

**English alt text**

Overlapping environment maps mix directional responses. Three nonnegative, orthogonal OLAT patterns each illuminate a separate direction and reveal its basis response.

**图内文字对照**

| 中文 | English |
| --- | --- |
| 方向相互重叠的光照 | Overlapping illumination |
| 正交的方向光照输入 | Orthogonal directional inputs |
| 环境光照 | Environments |
| 光传输 | Transport |
| 混合响应图像 | Mixed images |
| 光源 1 → 基响应 1 | Light 1 → basis 1 |
| 光源 2 → 基响应 2 | Light 2 → basis 2 |
| 光源 3 → 基响应 3 | Light 3 → basis 3 |

**中文｜02.P02**

监督形式本身还存在另一个问题。在环境光照图像中，多个方向同时产生贡献。当整个环境光照图作为生成器的条件时，各方向的贡献不一定被单独显式表示或约束。模型可能复现了整体外观，却没有准确遵循指定的阴影方向或相对强度——这正是促使我们开展本工作的现象。

**English**

There is a separate question about the supervision itself. In an environment-lit image, many directions contribute at once. When the entire environment map conditions a generator, each direction’s contribution is not necessarily exposed or constrained separately. The model may reproduce the overall appearance while missing the requested shadow direction or relative intensity—the behavior that motivated our work.

**中文｜02.P03**

**独立的光照变化使单个方向的响应可被辨识。** 改变整个环境光照，往往会同时改变多个变量。一组完整的正交光照模式提供了特别清晰的设计：归一化后，它构成一个条件良好的基，用于分离各个输入的作用。正交性是有用的设计目标，而不是神经模型能够学习的必要条件。

**English**

**Independent lighting variation makes individual responses identifiable.** Changing a whole environment often changes several variables together. A complete set of orthogonal illumination patterns offers a particularly clean design: after normalization, it forms a well-conditioned basis for separating each input’s effect. Orthogonality is a useful design target, rather than a requirement for a neural model to learn.


### 02.E01 / 公式

**中文｜02.E01 / 公式标题**

独立输入 → 正交光照 → OLAT

**English**

Independent inputs → orthogonal lighting → OLAT

**公式（中英文共用）**

$$
\begin{gathered}
Y = TE
\\
e_i \geq 0,\qquad \langle e_i,e_j\rangle=0 \quad (i\ne j)
\\
\text{OLAT:}\quad E=I_N \;\Rightarrow\; Y=T
\end{gathered}
$$

**中文｜02.E01 / 公式说明**

对于固定场景和单个颜色通道，$E$ 的列向量 $e_i$ 表示光照模式，$Y$ 的各列表示对应的图像。非负且正交的模式具有互不重叠的方向支撑集。在 $N$ 个方向上，由 $N$ 个这样的模式构成的完整集合，经过归一化与重排后，就成为 OLAT 的单位基。

**English**

For one fixed scene and color channel, the columns <i>e</i><sub>i</sub> of <i>E</i> are illumination patterns; the columns of <i>Y</i> are their images. Nonnegative, orthogonal patterns have disjoint directional support. A complete set of <i>N</i> such patterns over <i>N</i> directions becomes the OLAT identity basis after normalization and ordering.

**中文｜02.P04**

**物理光强是非负的。** 两张这样的环境光照图，只有在照亮的方向集合互不重叠时才可能正交。因此，如果要求构造一个完整的正交基，并且光照模式的数量等于采样方向的数量，就会自然导向 OLAT：每个模式恰好照亮一个方向，每次观测直接测量该方向的光传输响应。

**English**

**Physical light intensities are nonnegative.** Two such environment maps can be orthogonal only if they illuminate disjoint sets of directions. Requiring a complete orthogonal basis with one pattern per sampled direction therefore leads naturally to OLAT: each pattern lights exactly one direction, and each observation directly measures its transport response.


### 02.D01 / 网页中的折叠说明

**中文｜02.D01 / 展开标题**

为什么这种设计会导向 OLAT，以及它依赖哪些假设

**English**

Why this design leads to OLAT—and what it assumes

**中文｜02.D01.P01**

将一个固定场景的光照离散为 $N$ 个方向，可以写成 $Y=TE$。如果 $\operatorname{rank}(E)<N$，这些观测就无法唯一确定一个不受额外约束的传输矩阵 $T$。在无噪声条件下，满行秩是充分条件；条件数不佳则会使恢复结果对测量噪声更加敏感。非正交的环境光照也可以构成满秩、条件良好的设计，而学习到的先验可以减少所需的数据量。

**English**

For a fixed scene discretized into <i>N</i> lighting directions, $Y = TE$. If $\operatorname{rank}(E) < N$, the observations cannot uniquely identify an unrestricted transport matrix <i>T</i>. Full row rank is sufficient in the noiseless case; poor conditioning makes recovery sensitive to measurement noise. Non-orthogonal environments can also provide a full-rank, well-conditioned design, and learned priors can reduce the required data.

**中文｜02.D01.P02**

对于两个非负光照模式，$\langle e_i,e_j\rangle=\sum_k e_{ki}e_{kj}=0$ 意味着每一项乘积都为零：没有任何方向在两种模式中同时被点亮。在 $N$ 个方向上构造 $N$ 个非零、两两正交的模式时，这些互不重叠的支撑集就必须各自只包含一个方向。因此，$E$ 归一化后的各列是单位基的一种排列。数量更少的正交模式可以分别照亮互不重叠的方向组；仅有正交性本身，并不能唯一确定 OLAT。

**English**

For two nonnegative patterns, $\langle e_i,e_j\rangle = \sum_k e_{ki}e_{kj} = 0$ means every product is zero: no direction is active in both. With <i>N</i> nonzero, pairwise orthogonal patterns over <i>N</i> directions, these disjoint supports must each contain exactly one direction. Thus the normalized columns of <i>E</i> are a permutation of the identity basis. Fewer orthogonal patterns may illuminate disjoint groups of directions; orthogonality alone does not uniquely specify OLAT.

**中文｜02.D01.P03**

这个推导讨论的是输入光照模式，而不是其渲染图像之间的正交性。它假设使用理想、经过标定的方向光照；实际采集中，光源具有有限的覆盖范围，也存在标定误差与噪声。这种设计的优势在于对各个响应提供显式监督，并不保证模型能够完美学习。前文提到的真实采集工作使用了不同的表示形式，并非全部都是以整张环境光照图为条件的生成器。

**English**

This argument concerns input lighting patterns, not orthogonality of their rendered images. It assumes ideal, calibrated directional illumination; real captures have finite light footprints, calibration error, and noise. The benefit is explicit supervision of individual responses, not a guarantee of perfect learning. The capture-based works above use different representations; they are not all holistic environment-conditioned generators.


---

## 03 / 为什么选择 OLAT · Why OLAT

网页位置：`#olat`

**中文｜03 / 章节标题**

学习响应，组合光照。

**English**

Learn the responses. Compose the light.

**中文｜03.P01**

在通常的线性光传输条件下，不同光源的贡献可以相加。一张 OLAT 图像包含单个光源的完整响应，包括其产生的阴影与间接散射。预测同一段表演在各光源下的响应后，新的环境光照就可以通过可控的线性组合得到。

**English**

Under ordinary linear light transport, contributions from separate lights add. An OLAT image contains the full response to one light—including its shadows and indirect scattering. Predict those responses for the same performance, and a new environment becomes a controlled linear combination.


### 03.F01 / 配图

![三个方向的 OLAT 响应分别乘以对应权重，然后相加，得到一张重光照图像。](assets/project-source/olat-composition.svg)

**中文｜03.F01 / 图注**

每个方向预测一次，然后进行组合。图中的光照瓣用于表示基响应；它们是概念示意图，并非 DynOLAT 的输出结果。

**English**

Predict once per direction, then compose. The illustrated lighting lobes represent basis responses; they are conceptual diagrams, not DynOLAT outputs.

**中文｜图片替代文本**

三个方向的 OLAT 响应分别乘以对应权重，然后相加，得到一张重光照图像。

**English alt text**

Three directional OLAT responses are multiplied by separate weights and added into one relit image.

**图内文字对照**

| 中文 | English |
| --- | --- |
| 方向基 → 新的环境光照 | Directional bases → a new environment |
| 0.6 × B₁ | 0.6 × B₁ |
| + | + |
| 0.3 × B₂ | 0.3 × B₂ |
| 0.1 × B₃ | 0.1 × B₃ |
| 在线性颜色空间中加权求和 | Weighted sum in linear color |


### 03.E01 / 公式

**中文｜03.E01 / 公式标题**

每个光照方向对应一段基视频

**English**

One basis video per light direction

**公式（中英文共用）**

$$
\begin{gathered}
I_t(x;L)\approx\sum_k w_k(L)\,B_{t,k}(x)
\end{gathered}
$$

**中文｜03.E01 / 公式说明**

$B_{t,k}$ 是方向 $k$ 的 OLAT 响应。由环境光照计算出的权重 $w_k$，在线性颜色空间中按颜色通道分别控制该响应的贡献。由于光照采样有限且预测存在误差，这仍然是一个近似。

**English**

<i>B</i><sub>t,k</sub> is the OLAT response for direction <i>k</i>. Environment-derived weights <i>w</i><sub>k</sub> control its contribution, per color channel, in linear color space. Finite lighting samples and prediction errors make this an approximation.

**中文｜03.P02**

**数据表示改变了我们需要采样的对象。** 任意环境光照图构成了庞大的光照组合空间。在固定光源归一化方式后，OLAT 转而在同一个紧致球面 $\omega\in\mathbb{S}^2$ 上采样方向。增加样本能够细化方向覆盖，而不同光照的组合由合成来实现。人物、运动、材质和视角仍然需要广泛覆盖。

**English**

**The data representation changes what we need to sample.** Arbitrary environment maps span a large space of lighting combinations. At fixed light normalization, OLAT instead samples directions on the same compact sphere, $\omega \in \mathbb{S}^2$. More samples refine directional coverage; composition supplies the combinations. People, motion, materials, and viewpoints still require broad coverage.

**中文｜03.P03**

这让我们想到，图像与视频空间中的 OLAT 响应可能构成一个可学习、具有结构的集合。方向域的紧致性与传输算子的紧性是不同的概念：球面上的函数仍然构成无限维空间。OLAT 并没有消除有限采样误差，也没有证明存在一个全局可学习的流形；它在这里的优势是显式的方向监督与线性组合。

**English**

This suggested a learnable, structured family of OLAT responses in image and video space. Compactness of the direction domain is different from compactness of a transport operator: functions on the sphere still form an infinite-dimensional space. OLAT does not remove finite-sampling error or prove a globally learnable manifold; its advantage here is explicit directional supervision and linear composition.

**中文｜03.P04**

在启动 DynOLAT 之前，我们受到 [DifFRelight](https://arxiv.org/abs/2410.08188) 的启发：它针对特定人物训练扩散模型，利用平光与 OLAT 采集实现了高度逼真的面部表演重光照。借助预训练视频模型的外观与时序先验，我们希望将这一方向扩展到**全身、动态以及未见过的人物**。

**English**

Before starting DynOLAT, we were inspired by [DifFRelight](https://arxiv.org/abs/2410.08188): its subject-specific diffusion model showed highly realistic facial performance relighting from flat-lit and OLAT captures. We wanted to extend that direction to **full bodies, motion, and unseen people**, using a pretrained video model’s appearance and temporal priors.


---

## 04 / 为什么需要采集动态 · Why capture motion

网页位置：`#motion`

**中文｜04 / 章节标题**

几个姿态不足以代表一段表演。

**English**

A few poses cannot represent a performance.

**中文｜04.P01**

我们最初计划采集大量传统的静态平光／OLAT 数据对，这也是静态子集的由来。在早期实验中，即使对于同一个人物，静态姿态也无法提供足够的运动覆盖。关节运动、衣物形变和不断变化的自遮挡，促使我们转向动态全身采集。

**English**

Our initial plan was to collect many conventional static flat-lit / OLAT pairs—the origin of our static subset. In our early experiments, static poses did not provide enough motion coverage, even for a fixed subject. Articulation, clothing deformation, and changing self-occlusion pushed us toward dynamic full-body capture.


### 04.F01 / 配图

![静态采集在切换光源时保持同一姿态；动态采集交替记录平光帧与 OLAT 帧，再将它们对齐为配对序列。](assets/project-source/dynamic-pairs.svg)

**中文｜04.F01 / 图注**

从一个姿态走向一段表演。动态采集为变化中的姿态提供配对光照监督，而不必在每个瞬间记录一整轮 OLAT。图中的帧仅用于概念示意。

**English**

From a pose to a performance. Dynamic capture gives changing poses paired lighting supervision without recording a full OLAT sweep at every instant. The illustrated frames are schematic.

**中文｜图片替代文本**

静态采集在切换光源时保持同一姿态；动态采集交替记录平光帧与 OLAT 帧，再将它们对齐为配对序列。

**English alt text**

Static capture holds one pose across lights; dynamic capture interleaves flat-lit and OLAT frames, then aligns them into paired sequences.

**图内文字对照**

| 中文 | English |
| --- | --- |
| 静态逐灯采集：保持姿态 | Static sweep: hold the pose |
| OLAT 1 | OLAT 1 |
| OLAT 2 | OLAT 2 |
| OLAT 3 | OLAT 3 |
| 动态采集：交替采样并对齐 | Dynamic capture: interleave and align |
| 平光 | Flat |
| OLAT | OLAT |
| 对齐后的数据对 | Aligned pairs |

**中文｜04.P02**

对于直接基于图像的重光照，一整轮 OLAT 采集需要在不同光源下保持相同的场景状态。人物一旦运动，这就变得困难：采集到的响应不再属于同一个瞬间。但视频模型可以从运动过程中不完整的方向观测中学习。我们的系统交替采集平光帧与 OLAT 帧，并通过光流将它们对齐为训练数据对。系统并不是在每个瞬间采集所有 OLAT 响应，而是让模型学习预测缺失的响应。

**English**

For direct image-based relighting, a full OLAT sweep needs the same scene state across lights. A moving person makes that difficult: the captured responses no longer belong to the same instant. Yet a video model can learn from partial directional observations across motion. Our system interleaves flat-lit and OLAT frames and uses optical flow to align them into training pairs. It does not capture every OLAT at each instant; the model learns to predict the missing responses.


### 04.E01 / 公式

**中文｜04.E01 / 公式标题**

学习贯穿整个序列的光照响应

**English**

Learn a response across an entire sequence

**公式（中英文共用）**

$$
\begin{gathered}
\widehat{B}_{1:T,k}
=F_\theta\!\left(V^{\mathrm{flat}}_{1:T},\omega_k\right)
\end{gathered}
$$

**中文｜04.E01 / 公式说明**

视频模型 $F_\theta$ 以一段平光视频为条件，预测光照方向 $\omega_k$ 对应的基序列。经过对齐的动态数据对，为运动过程中的光照响应提供监督。这定义了预测任务，并不保证完美的时序一致性。对于一般视频输入，去光照模型首先将输入映射到更接近平光的域。

**English**

The video model <i>F</i><sub>θ</sub> predicts a basis sequence for light direction <i>ω</i><sub>k</sub>, conditioned on a flat-lit sequence. Aligned dynamic pairs supervise lighting response across motion. This is the prediction task, not a guarantee of perfect temporal consistency. For general video inputs, delighting first maps the input toward the flat-lit domain.

**中文｜04.P03**

采集在不同视角之间保持同步。受计算资源与训练时间限制，我们没有显式约束多视角一致性。尽管如此，下游的 4D Gaussian Splatting 示例仍显示，独立重光照后的不同视角之间具有一定的隐式一致性；这是一项定性观察，并不保证对所有视角或表演都成立。[补充材料 §F ↗](assets/dynolat.pdf#page=20)

**English**

The captures are synchronized across views. Within our compute and training-time budget, we did not explicitly enforce multi-view consistency. Our downstream 4D Gaussian Splatting example nevertheless shows useful implicit coherence in independently relit views; this is a qualitative observation, not a guarantee for all views or performances. [Supplement §F ↗](assets/dynolat.pdf#page=20)


### 04.D01 / 网页中的折叠说明

**中文｜04.D01 / 展开标题**

我们希望这项工作推动哪些后续方向

**English**

What we hope this enables next

**中文｜04.D01.P01**

我们希望这些数据与学习到的 OLAT 响应能够支持更快的推理、蒸馏，以及显式的多视角训练。一种可能的路径是，将 OLAT 预测合成为环境光照下的训练数据对，再将其蒸馏为一个直接以环境光照图为输入的模型。这可能在保留结构化监督优势的同时，降低生成多段基视频的成本。这些都是未来可以探索的方向。

**English**

We hope the data and learned OLAT responses support faster inference, distillation, and explicit multi-view training. One possibility is to compose OLAT predictions into environment-lit training pairs, then distill them into a model that takes an environment map directly. This could retain the benefits of structured supervision while reducing the cost of generating many basis videos. These are directions for future work.


---

## 05 / 结语 · Takeaway

**中文｜ending**

先选择好数据的形式：**分离光照响应，再从运动中学习。**

**English**

The choice of data comes first: **isolate the light response, then learn it through motion.**


---

## 附录 / 导航与页面信息

以下为网页中的辅助文字；正文修改通常不需要调整这一部分。

| 位置 | 中文 | English |
| --- | --- | --- |
| 页面标题 / 浏览器标签 | DynOLAT 背后的思考 | The Insights Behind DynOLAT |
| 跳转到正文 | 跳转到正文 | Skip to story |
| 返回主页 | ← DynOLAT | ← DynOLAT |
| 章节导航 01 | 01 · 渲染 | 01 · Rendering |
| 章节导航 02 | 02 · 监督 | 02 · Supervision |
| 章节导航 03 | 03 · OLAT | 03 · OLAT |
| 章节导航 04 | 04 · 动态 | 04 · Motion |
| 页脚链接 | 观看演示 | Watch the demo |
| 页脚链接 | 了解方法 → | Explore the method → |

**中文｜页面描述**

为什么 DynOLAT 从动态人体采集中学习 OLAT 响应：光传输、监督形式，以及从静态姿态走向动态的探索。

**English**

Why DynOLAT learns OLAT responses from dynamic human capture: light transport, supervision, and the path from static poses to motion.
