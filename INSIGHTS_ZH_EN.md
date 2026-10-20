# The Insights Behind DynOLAT

## 中英文对照编辑稿

对应网页：[The Insights Behind DynOLAT](project-source.html)

同步基准：本次修订后的 `project-source.html`（2026-10-20）。

**修改方式：** 直接修改各段的「中文」内容即可；下方英文保留当前网页原文作为对照。段落编号用于将修改对应回网页。公式由中英文共用；图注、折叠说明和图内文字均已收录。

这是一份供人工修改的独立稿件。修改本文件不会自动更新网页；后续可以据此同步英文文案与 HTML。

---

## 00 / 开篇 · Opening

**中文｜页面标题**

DynOLAT 背后的思考

**English**

The Insights Behind DynOLAT

**中文｜核心问题**

如何渲染任意光照下的人体，同时保持动态下时序一致性？

**English**

How can we render a person under arbitrary lighting while preserving temporal consistency in motion?


---

## 01 / 渲染的挑战 · The rendering challenge

网页位置：`#rendering`

**中文｜01 / 章节标题**

光传输在计算过程中的理论限制

**English**

Theoretical limits of computing light transport.

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

关于光传输有限表示的理论限制，具体可参阅 Soler、Molazem 和 Subr（2022）的论文 [A Theoretical Analysis of Compactness of the Light Transport Operator](https://homepages.inf.ed.ac.uk/ksubr/Files/Papers/SIG22_Compactness.pdf)，其中有系统的数学讨论。

**English**

For a systematic mathematical discussion of the limits of finite representations of light transport, see [A Theoretical Analysis of Compactness of the Light Transport Operator](https://homepages.inf.ed.ac.uk/ksubr/Files/Papers/SIG22_Compactness.pdf) by Soler, Molazem, and Subr (2022).


---

## 02 / 监督的挑战 · The supervision challenge

网页位置：`#supervision`

**中文｜02 / 章节标题**

如何实现在生成模型中实现精确的控制。

**English**

How can we achieve precise control in a generative model?

**中文｜02.P01**

生成模型为外观与运动提供了强大的先验，生成的结果基本对齐了真实的 domain。以环境光照图作为条件，可以把重光照转化为生成任务：根据指定光照，预测新的图像或视频。但仍有两个问题：训练数据对是否忠实反映真实的光照变化，以及它们是否能独立约束不同光照方向的作用。

**English**

Generative models provide strong priors for appearance and motion, with outputs that can closely match real-world appearance. Environment-map conditioning turns relighting into a generation task: predict a new image or video for a requested illumination. Two questions remain: how faithfully the training pairs represent real lighting changes, and how independently they constrain different lighting directions.

**中文｜02.P02**

**（[IC-Light](https://proceedings.iclr.cc/paper_files/paper/2025/file/1cce374fec7829c24a97ae0e91cd0999-Paper-Conference.pdf)）。** 其自然图像分支通过退化或增强输入外观，并估计目标光照来构造重光照数据对，而不是在经过标定的不同光照下重新拍摄同一场景。完整方法也使用了渲染数据与真实 Light Stage 数据，并施加光传输一致性约束。我们关注的是：即使目标照片是真实的，增强流程和估计光照所提供的监督仍然是近似的。

**English**

**[IC-Light](https://proceedings.iclr.cc/paper_files/paper/2025/file/1cce374fec7829c24a97ae0e91cd0999-Paper-Conference.pdf).** Its in-the-wild branch creates relighting pairs by degrading or augmenting input appearance and estimating target lighting, rather than recapturing the same scene under calibrated lights. The full method also uses rendered and real Light Stage data, and imposes light-transport consistency. Our concern is that augmentation and estimated lighting provide approximate supervision, even when the target photograph is real.

**中文｜02.P03**

**（[DiffusionRenderer](https://arxiv.org/abs/2501.18590)）。** 其正向渲染器以 G-buffers 和环境光照图为条件生成视频。合成数据提供精确标签，但论文指出，仅用合成数据训练会产生域差距。因此，方法进一步加入自动标注的真实视频，以及用于真实数据的 LoRA；估计出的几何、材质和光照仍可能含有误差。这促使我们重视实测数据对，但并不意味着上述方法只使用合成监督。

**English**

**[DiffusionRenderer](https://arxiv.org/abs/2501.18590).** Its forward renderer conditions video generation on G-buffers and an environment map. Synthetic data provides exact labels, but the paper reports a domain gap when training on synthetic data alone. It therefore adds auto-labeled real videos and a LoRA for real data; the estimated geometry, materials, and lighting can still contain errors. This motivates measured pairs without implying that either method uses only synthetic supervision.


### 02.F01 / 配图

![同一个平光输入连接到生成模型。三张具有空间分布的环境图包含背景光照和不同位置的彩色亮区；输出人体以平滑渐变综合呈现这些光照的方向、颜色和强弱。](assets/project-source/mixed-supervision.svg)

**中文｜02.F01 / 图注**

同一个平光输入，三种不同的环境光照。每个概念输出综合整张环境图的光照：分别为暖色左上光与冷色右下光、青色右上光与暖色左下光、蓝色顶光与青色左下光。人体渐变同时包含分布式背景光照和彩色亮区的贡献。

**English**

One flat-lit input under three different environments. Each conceptual output combines illumination across its entire map: warm upper-left with cool lower-right light, teal upper-right with warm lower-left light, and blue overhead with teal lower-left light. The body gradients reflect both the broad background illumination and the colored bright regions.

**中文｜图片替代文本**

同一个平光输入连接到生成模型。三张具有空间分布的环境图包含背景光照和不同位置的彩色亮区；输出人体以平滑渐变综合呈现这些光照的方向、颜色和强弱。

**English alt text**

A shared flat-lit input feeds Generation. Three spatial environment maps retain distributed background illumination and colored bright regions in different positions. Each output combines their directions, colors, and strengths in a smooth body gradient.

**图内文字对照**

| 中文 | English |
| --- | --- |
| 环境光照条件下的生成 | Environment-conditioned generation |
| 平光输入 | Flat-lit input |
| 环境光照图 | Environment map |
| 生成图像 | Generated image |
| 生成 | Generation |

**中文｜02.P04**

**问题是：每盏灯究竟贡献了多少？** 即使数据对完全来自真实测量，一张环境光照图像也只给出了多个光源共同作用的结果。固定人物、姿态和相机，只看一个图像像素的一个颜色通道。如果有两盏灯，它们各自的贡献就是两个未知数。这其实就是熟悉的“解联立线性方程组”问题：**两个未知数，至少需要两个独立方程。**

**English**

**The question is: how much does each light contribute?** Even with perfectly measured pairs, an environment-lit image only shows their combined effect. For a fixed person, pose, and camera, consider the brightness at one image pixel in one color channel. If two lights illuminate the person, their separate contributions are two unknowns. This is the familiar problem of solving simultaneous linear equations: **two unknowns need at least two independent equations.**


### 02.X01 / 直观例子

**中文｜02.X01 / 例子标题**

两个未知数 → 两次独立观测

**English**

Two unknowns → two independent observations

**中文｜02.X01.P01**

照片 1：80% 左光 + 20% 右光 → 测得亮度为 12。

**English**

Photo 1: 80% left light + 20% right light → measured brightness 12.

**中文｜02.X01.P02**

照片 2：20% 左光 + 80% 右光 → 测得亮度为 18。

**English**

Photo 2: 20% left light + 80% right light → measured brightness 18.

**中文｜02.X01.P03**

结合这两次观测，就能解出：左光单独的贡献为 10，右光单独的贡献为 20。代回去很容易检查：10 的 80% 加上 20 的 20% 等于 12，交换权重后就得到 18。这里的数值仅作示例，使用线性亮度单位。

**English**

Together, these observations tell us that the left light alone contributes 10 and the right light alone contributes 20. Check: 80% of 10 plus 20% of 20 is 12; reversing the weights gives 18. These are illustrative values in linear brightness units.

**中文｜02.X01.P04**

如果只是把第一种光照整体调亮一倍，总亮度也会翻倍，却没有提供区分两盏灯贡献的新线索。我们需要改变混合比例，而不只是再拍一张照片。

**English**

Simply making the first lighting setup twice as bright gives twice the total, but no new clue about the two separate contributions. We need a different mixing ratio, not just another photograph.

**中文｜02.P05**

**把这个问题扩展到环境光照图。** 一张 $h\times w$ 的环境图包含 $h\times w$ 个方向格。对每个图像像素而言，每个方向都对应一个未知贡献。若不引入额外假设，要把它们全部求出来，就至少需要同样数量的独立光照观测。更多照片只有在提供了新的独立方程时，才增加有效信息。

**English**

**Now extend this to an environment map.** An <i>h</i> × <i>w</i> map has <i>h</i> × <i>w</i> directional bins. At each image pixel, there is one unknown contribution per direction. Recovering them all, without additional assumptions, therefore needs at least that many independent lighting observations. More photographs help only if they add independent equations.

**中文｜02.P06**

**OLAT 让每个未知数可以被直接观测。** 只开左灯，就测到左灯的贡献；只开右灯，就测到右灯的贡献，不再需要从混合结果中拆解。对每个方向重复一次，就得到一套完整、独立的观测。这些单方向光照模式是正交的：它们照亮的方向互不重叠。物理光强非负，重叠方向上的贡献无法通过正负抵消来实现正交。因此，寻找一套完整、正交的光照设计，就自然导向了一次只开一盏灯。

**English**

**OLAT makes the unknowns directly observable.** Turn on only the left light, and measure its contribution; then turn on only the right light. There is no mixture to disentangle. Repeating this for each direction gives a complete set of independent observations. These single-direction lighting patterns are orthogonal: they have no illuminated directions in common. Since physical light intensities are nonnegative, overlapping directions cannot cancel to make two patterns orthogonal. Seeking a complete, orthogonal lighting design therefore naturally leads to one light at a time.

**中文｜02.P07**

上述计数针对固定场景中的线性响应，用来解释监督形式的设计，并不是生成模型训练集规模的普遍要求。学习到的先验可以降低观测需求；不正交但相互独立的光照模式，也可以提供足够的方程。

**English**

This counting argument applies to a fixed scene with a linear response. It explains the supervision design, not a universal training-set size for a generative model. Learned priors can reduce the observations needed; non-orthogonal but independent lighting patterns can also provide enough equations.


---

## 03 / 为什么选择 OLAT · Why OLAT

网页位置：`#olat`

**中文｜03 / 章节标题**

用正交监督适配生成先验。

**English**

Adapting the generative prior with orthogonal supervision.

**中文｜03.P01**

真实采集让这种监督具有物理依据。**Paul Debevec 团队（[Light Stage](https://www.pauldebevec.com/Research/LS/debevec-siggraph2000-high.pdf)）**测量方向性的面部反射；**MPI Informatics / NVIDIA（[HumanOLAT](https://arxiv.org/abs/2508.09137)）**提供多视角全身 OLAT 采集；**Meta Codec Avatars Lab（[Relightable Gaussian Codec Avatars](https://arxiv.org/abs/2312.03704)）**利用可控光照采集学习可重光照的虚拟人。这些工作采用不同的采集模式与模型表示，共同说明了跨光照条件实测外观的价值。

**English**

Real capture makes this supervision physically grounded. **Paul Debevec’s team ([Light Stage](https://www.pauldebevec.com/Research/LS/debevec-siggraph2000-high.pdf))** measured directional facial reflectance; **MPI Informatics / NVIDIA ([HumanOLAT](https://arxiv.org/abs/2508.09137))** provide multi-view full-body OLAT captures; and **Meta’s Codec Avatars Lab ([Relightable Gaussian Codec Avatars](https://arxiv.org/abs/2312.03704))** learns relightable avatars from controlled lighting capture. These works establish the value of measured appearance across lighting conditions, using different capture patterns and model representations.

**中文｜03.P02**

**用分离变量的数据对适配预训练生成先验。** 平光／OLAT 数据对保持外观与姿态对齐，同时指定一个光照方向，相比多个方向的无约束混合，为条件生成器提供了更明确的学习目标。在 latent diffusion 模型中，适配是用这些数据对训练条件去噪过程，并不意味着 latent space 本身变得正交。这里希望提高的是监督设计的信息效率，而不是宣称所有优化过程都会普遍加速。

**English**

**Use isolated pairs to adapt a pretrained generative prior.** A flat-lit / OLAT pair holds appearance and pose aligned while specifying one illumination direction. This gives the conditional generator a more explicit target than an unconstrained mixture of directions. In a latent diffusion model, adaptation trains the conditional denoising process on these pairs; it does not make the latent space itself orthogonal. The intended efficiency is in the supervision design, not a claimed universal speedup in optimization.

**中文｜03.P03**

在通常的线性光传输条件下，不同光源的贡献可以相加。一张 OLAT 图像包含单个光源的完整响应，包括其产生的阴影与间接散射。预测同一段表演在各光源下的响应后，新的环境光照就可以通过可控的线性组合得到。

**English**

Under ordinary linear light transport, contributions from separate lights add. An OLAT image contains the full response to one light—including its shadows and indirect scattering. Predict those responses for the same performance, and a new environment becomes a controlled linear combination.


### 03.F01 / 配图

![三个人体仅通过自身渐变，分别呈现暖色左光、青色右光和蓝色顶光；光源颜色与方向均和人体渐变一致。](assets/project-source/olat-composition.svg)

**中文｜03.F01 / 图注**

用于组合的一致方向基。三个示例使用相同姿态，颜色和明暗变化与光照方向对应。这些人物是概念示意；加权求和在线性图像空间中进行。

**English**

A consistent basis for composition. Each example uses the same pose, with color and shading matched to its light direction. The figures are conceptual illustrations; the weighted sum is performed in linear image space.

**中文｜图片替代文本**

三个人体仅通过自身渐变，分别呈现暖色左光、青色右光和蓝色顶光；光源颜色与方向均和人体渐变一致。

**English alt text**

Three human figures show warm left lighting, teal right lighting, and blue top lighting through body gradients. The light colors and directions match the gradients.

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

在潜空间中适配，在线性图像空间中组合

**English**

Adapt in latent space; compose in linear image space

**公式（中英文共用）**

$$
\begin{gathered}
p_\theta\!\left(Z^{\mathrm{OLAT}}\mid Z^{\mathrm{flat}},\omega_k\right)
\\ I_t(x;L)\approx\sum_k w_k(L)\,B_{t,k}(x)
\end{gathered}
$$

**中文｜03.E01 / 公式说明**

$Z^{\mathrm{flat}}$ 与 $Z^{\mathrm{OLAT}}$ 表示配对序列编码后的 latent；$p_\theta$ 表示模型针对方向 $\omega_k$ 学习到的条件生成分布。第二行用环境光照确定的权重 $w_k$，在线性颜色空间中按通道组合解码后的 OLAT 响应 $B_{t,k}$。这不假设 latent 或生成器本身是线性的；有限方向采样与预测误差仍然存在。

**English**

<i>Z</i><sup>flat</sup> and <i>Z</i><sup>OLAT</sup> denote encoded paired sequences; <i>p</i><sub>θ</sub> denotes the learned conditional generation distribution for direction <i>ω</i><sub>k</sub>. The second line composes decoded OLAT responses <i>B</i><sub>t,k</sub> using environment-derived weights <i>w</i><sub>k</sub>, per color channel in linear color space. It does not assume that latents or the generator are linear. Finite directional sampling and prediction errors remain.

**中文｜03.P04**

**数据表示改变了我们需要采样的对象。** 任意环境光照图构成了庞大的光照组合空间。在固定光源归一化方式后，OLAT 转而在同一个紧致球面 $\omega\in\mathbb{S}^2$ 上采样方向。增加样本能够细化方向覆盖，而不同光照的组合由合成来实现。人物、运动、材质和视角仍然需要广泛覆盖。

**English**

**The data representation changes what we need to sample.** Arbitrary environment maps span a large space of lighting combinations. At fixed light normalization, OLAT instead samples directions on the same compact sphere, $\omega \in \mathbb{S}^2$. More samples refine directional coverage; composition supplies the combinations. People, motion, materials, and viewpoints still require broad coverage.

**中文｜03.P05**

这让我们想到，图像与视频空间中的 OLAT 响应可能构成一个可学习、具有结构的集合。方向域的紧致性与传输算子的紧性是不同的概念：球面上的函数仍然构成无限维空间。OLAT 并没有消除有限采样误差，也没有证明存在一个全局可学习的流形；它在这里的优势是显式的方向监督与线性组合。

**English**

This suggested a learnable, structured family of OLAT responses in image and video space. Compactness of the direction domain is different from compactness of a transport operator: functions on the sphere still form an infinite-dimensional space. OLAT does not remove finite-sampling error or prove a globally learnable manifold; its advantage here is explicit directional supervision and linear composition.

**中文｜03.P06**

在启动 DynOLAT 之前，我们受到 [DifFRelight](https://arxiv.org/abs/2410.08188) 的启发：它针对特定人物训练扩散模型，利用平光与 OLAT 采集实现了高度逼真的面部表演重光照。借助预训练视频模型的外观与时序先验，我们希望将这一方向扩展到**全身、动态以及未见过的人物**。

**English**

Before starting DynOLAT, we were inspired by [DifFRelight](https://arxiv.org/abs/2410.08188): its subject-specific diffusion model showed highly realistic facial performance relighting from flat-lit and OLAT captures. We wanted to extend that direction to **full bodies, motion, and unseen people**, using a pretrained video model’s appearance and temporal priors.


---

## 04 / 为什么需要采集动态 · The Data challenge

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

![上方为三个不同的静态姿态，下方为三组对齐后的动态数据对。每对包含相同姿态的平光图像与带方向性明暗渐变的 OLAT 图像，不同数据对之间的姿态发生变化。](assets/project-source/dynamic-pairs.svg)

**中文｜04.F01 / 图注**

静态姿态覆盖与对齐后的动态监督。上方展示分别保持的三个静态姿态中具有代表性的 OLAT 图像，并非同一轮逐灯采集中的连续光源。下方展示对齐后的三组训练数据：每对内部姿态一致，不同数据对之间动作变化。

**English**

Static pose coverage versus aligned dynamic supervision. The top row shows representative OLAT images from three separately held poses, not successive lights in one sweep. The bottom row shows three training pairs after alignment: pose is matched within each pair and changes across pairs.

**中文｜图片替代文本**

上方为三个不同的静态姿态，下方为三组对齐后的动态数据对。每对包含相同姿态的平光图像与带方向性明暗渐变的 OLAT 图像，不同数据对之间的姿态发生变化。

**English alt text**

Three different static poses above three aligned dynamic pairs. Each pair contains a flat-lit and a directionally shaded OLAT image in the same pose, with the pose changing between pairs.

**图内文字对照**

| 中文 | English |
| --- | --- |
| 静态子集：分别保持的不同姿态 | Static subset: distinct held poses |
| 姿态 1 · OLAT 1 | Pose 1 · OLAT 1 |
| 姿态 2 · OLAT 2 | Pose 2 · OLAT 2 |
| 姿态 3 · OLAT 3 | Pose 3 · OLAT 3 |
| 动态数据对：对齐后姿态一致 | Dynamic pairs: matched after alignment |
| 平光 | Flat |
| OLAT | OLAT |
| 数据对 1 | Pair 1 |
| 数据对 2 | Pair 2 |
| 数据对 3 | Pair 3 |

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
