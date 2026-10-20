# The Insights Behind DynOLAT — 视觉叙事版 / Visual Story

对应网页：`project-source-visual.html`。这是与原技术版平行的新稿，不替代 `INSIGHTS_ZH_EN.md`。
可以直接修改下方中文；之后有意同步英文和 HTML。本文件没有自动覆盖原稿的流程。
页面默认中文，可切换英文。以下按网页阅读顺序记录标题、正文与图注；导航和按钮属于 UI 文案。

## 01

### 中文

换一束光，

还是那个人。

### English

Same person.

New light.

Every frame.

## 02

### 中文

想象把视频里的人，从午后的窗边搬到霓虹灯下。我们想改变的只有光：他的长相、衣服和动作，都应该接得上。

### English

Imagine moving a person in a video from a sunlit window to a neon-lit street. We want to change the light while preserving their identity, clothing, and performance.

## 03

### 中文

点击切换预先生成的示意画面；这不是在线运行的 DynOLAT。

### English

Switch between pre-generated illustrations; this is not a live DynOLAT demo.

## 04

### 中文

人物已经很清晰了。

为什么还要研究光？

### English

The pixels are sharp.

Why keep studying light?

## 05

### 中文

在游戏里，你可能会停下来，看角色走进阳光、经过路灯，或转身面向一扇窗。让人觉得“真”的，不只是贴图有多清楚，而是光落在皮肤、头发和衣服上时，是否都恰到好处。

### English

In a game, you might stop to watch a character step into sunlight, pass a streetlamp, or turn toward a window. Believability depends on more than sharp textures: light has to behave convincingly on skin, hair, and clothing.

## 06

### 中文

同样追求真实，

不同的制作预算。

### English

The same pursuit of realism.

Different production budgets.

## 07

### 中文

影视与游戏都能做出逼真的人物。影视制作往往可以投入更多资产打磨与逐帧计算；实时游戏则必须在玩家转动镜头、角色移动时，立即给出下一帧。60 帧游戏中，每一帧留给所有计算的时间约为 16.7 毫秒。

### English

Both films and games can depict convincing humans. Film production can often spend more time refining assets and computing each frame. A real-time game must respond immediately as the camera and character move. At 60 frames per second, the entire frame has about 16.7 milliseconds.

## 08

### 中文

DLSS 5 已将生成式模型引入游戏渲染，用真实外观先验增强光照与材质。它处理的是引擎渲染的画面；DynOLAT 则研究如何给真人视频换光。两者关注的问题有关联，但输入、目标和运行约束不同。

### English

DLSS 5 brings generative models into game rendering to enhance lighting and materials using real-world appearance priors. It works with engine-rendered frames; DynOLAT studies relighting real human videos. The questions are related, but the inputs, goals, and runtime constraints differ.

## 09

### 中文

我们的问题是：

<strong>给一段真人视频，能否自由换光，

还让这个人从头到尾保持连贯？</strong>

### English

Our question:

<strong>Can we relight a human video freely

while keeping the performance coherent?</strong>

## 10

### 中文

光碰到人的地方，

藏着大量细节。

### English

Light meets a person.

A thousand details appear.

## 11

### 中文

耳廓会微微透光，发丝会接住一道亮边，衣服褶皱里会有明暗变化。传统物理渲染可以模拟这些现象，但要算得像，首先要知道这个人是什么形状、皮肤怎样散射光、头发和布料是什么材质。

### English

An ear glows softly, strands of hair catch a rim light, and folds of fabric fall into shade. Physical rendering can simulate these effects. But convincing simulation needs accurate shape, skin scattering, hair, and fabric properties.

## 12

### 中文

难点不是“物理方法不会算阴影”，而是这些信息很难从普通视频中完整获得。资产越精细、光的路径越复杂，采集、制作和计算通常就越昂贵。

### English

The problem is not that physical methods cannot render shadows. It is that ordinary video does not reveal all the required information. More detailed assets and more complex light paths generally demand more capture, production work, and computation.

## 13

### 中文

同一张脸、同一件衣服：皮肤、发丝和织物会以不同方式响应光。

### English

One face, one jacket: skin, hair, and fabric respond to light in different ways.

## 14

### 中文

除了获取准确材质，数值近似本身也有边界：某种表示在一些光照下很准确，不代表增加有限个基函数，就能让它在所有可能的入射光场下同时达到任意精度。这里讨论的是对所有输入的统一保证，不是否定特定场景能渲染得准确。具体条件与证明可参考下方论文。

### English

Beyond recovering materials, numerical approximation has limits. Accuracy under some lighting does not mean that enlarging a finite basis gives arbitrarily small error uniformly over every possible incident light field. This concerns a guarantee across all inputs; it does not rule out accurate rendering for a particular scene. See the paper for assumptions and proof.

## 15

### 中文

“把光换成这个场景。”

模型真的学会了吗？

### English

“Light them like this scene.”

What did the model learn?

## 16

### 中文

生成式模型带来了另一条路：从大量画面中学习真实的外观，而不必逐一重建全部材质。常见做法是给模型一张环境光贴图——你可以把它理解为，将四面八方的光展开成一张全景图——让它生成新光照下的人。

### English

Generative models offer another route: learn realistic appearance from images instead of explicitly reconstructing every material. A common approach provides an environment map—think of the light arriving from all around you, unfolded into a panorama—and asks the model to generate a relit person.

## 17

### 中文

上方是光照环境的直观示意，下方是生成的人物画面；不是实测 HDR 环境贴图或研究结果。每个环境都混合了多个位置、颜色与强度的光。

### English

Environment illustrations above, generated portraits below—not measured HDR maps or research outputs. Each environment mixes light from different positions, colors, and intensities.

## 18

### 中文

第一个问题：

训练答案准不准？

### English

First:

is the training target accurate?

## 19

### 中文

如果“换光前后”的训练配对来自合成、图像退化，或对光照的估计，就可能与真实拍摄有差异。模型不仅要学会换光，还要跨过数据与现实之间的距离。

### English

If training pairs come from rendering, image degradation, or estimated lighting, they can differ from measured real-world changes. The model has to learn relighting while also bridging the gap between its supervision and reality.

## 20

### 中文

第二个问题：

到底是哪束光的作用？

### English

Second:

which light caused what?

## 21

### 中文

即使配对完全真实，窗户、天空和室内灯一起照亮一个人，照片里也只看得到总效果。只凭总效果，模型不容易分清每个方向各贡献了多少。逼真，并不自动等于精确可控。

### English

Even with perfectly measured pairs, a window, the sky, and a lamp illuminate the person together. The photograph shows only their combined effect. Separating each direction's contribution is harder than producing a plausible-looking image.

## 22

### 中文

左灯和右灯各贡献多少，是两个未知数。两张独立的照片就像两条独立的方程：一张左灯强、右灯弱，另一张左灯弱、右灯强。如果只是把第一组灯整体调亮，再拍一张，其实没有增加区分左右的线索。

### English

The left and right light contributions are two unknowns. Two independent photos act like two independent equations: strong left and weak right, then weak left and strong right. Simply making the first setup brighter adds no clue about their separate contributions.

## 23

### 中文

同样，对一个固定的人、姿势和视角，如果有 N 个待分离的光照方向，在不引入额外假设时，至少需要 N 个独立观测。这是固定场景下的线性方程计数，不是说神经网络一律要 N 张训练图。数值是线性亮度的示例，真实图像还要分别考虑颜色通道。

### English

Likewise, for a fixed person, pose, and camera, N unknown directional contributions require at least N independent observations without additional assumptions. This counts linear equations for a fixed scene; it is not a universal neural-network training-set requirement. The illustrative values are linear brightness units; real images also have separate color channels.

## 24

### 中文

IC-Light 的野外图像分支通过退化或增强构造配对，并估计光照；完整方法也使用合成与真实 Light Stage 数据。DiffusionRenderer 使用合成数据，同时加入自动标注的真实视频以缩小域差异。这里关注的是监督信号有多准确，不是说这些方法只使用合成数据。

### English

IC-Light's in-the-wild branch constructs pairs through degradation or augmentation and estimates lighting; the full method also uses rendered and real Light Stage data. DiffusionRenderer combines synthetic data with auto-labeled real videos to reduce the domain gap. The question is supervision accuracy, not a claim that these methods use only synthetic data.

## 25

### 中文

那就一次，

只开一盏灯。

### English

Then switch on

one light at a time.

## 26

### 中文

这就是 OLAT：One Light At a Time。只开左边的灯，就能看清左边这束光的作用；只开上面的灯，就能看清顶光的作用。训练时，答案里不再混着一整套复杂环境。

### English

That is OLAT: One Light At a Time. Turn on the left light to observe its contribution. Turn on the overhead light to observe that one. Each training target isolates a direction instead of mixing an entire environment.

## 27

### 中文

方向与颜色用于解释单灯和组合的关系。四幅画面由 AI 生成，不是实测 OLAT，也不是前三幅的数值求和。

### English

Directions and colors explain isolated and combined lighting. These AI-generated views are not measured OLAT responses or a numerical sum of the first three panels.

## 28

### 中文

在通常的线性光传输条件下，不同光源的贡献可以相加。一束光本身产生的阴影、反射与皮肤散射，已经包含在它的 OLAT 画面里。我们希望模型学会这些画面，再按环境中各方向的光强进行组合。

### English

Under ordinary linear light transport, contributions from separate lights add. The shadows, reflections, and skin scattering caused by one light are already present in its OLAT image. We aim to predict these images, then combine them using the environment's directional light intensities.

## 29

### 中文

这样，采数据就从“不断增加复杂光照的组合”，变成“更细致地覆盖光的方向”。生成模型负责预测单灯下的样子，组合步骤负责控制各束光的权重。实际组合在图像的线性颜色空间里完成，预测误差和有限方向采样仍然存在。

### English

Data collection shifts from adding complex lighting mixtures to covering light directions more carefully. The generator predicts each single-light appearance; composition controls the light weights. Actual composition happens in linear image color space, with prediction and directional-sampling errors still remaining.

## 30

### 中文

可以把每个方向看作一个开关。OLAT 每次只打开一个，因此两张不同方向的照明模式没有共同亮起的方向——这就是这里的“正交”。这种设计让每个方向的贡献直接可见。其他线性独立的混合照明也可能解出答案，但完整、非负且正交的方向基，自然就是逐个方向单独点亮。

### English

Think of each direction as a switch. OLAT activates only one at a time, so two different patterns share no active direction: this is the orthogonality meant here. Other independent mixtures can also recover the contributions, but a complete nonnegative orthogonal directional basis naturally isolates directions one by one.

## 31

### 中文

它不意味着视频模型的 latent space 也变得正交，更不是“只要有 OLAT 就一定能泛化”。我们用更明确的配对目标，去调整已经学过大量视频的生成模型。人物、材质和动作仍然需要足够多样的数据。

### English

This does not make the video model's latent space orthogonal, or guarantee generalization. Clearer paired targets adapt a model that already has video priors. People, materials, and motion still require diverse data.

## 32

### 中文

Paul Debevec 团队的 Light Stage、MPI Informatics / NVIDIA 的 HumanOLAT，以及 Meta Codec Avatars Lab 的相关工作，展示了真实受控光照采集的价值。DifFRelight 在特定人物的人脸重光照上呈现了很好的真实感，启发我们进一步探索：全身、动态，以及没见过的人。

### English

Paul Debevec's Light Stage, HumanOLAT from MPI Informatics / NVIDIA, and work from Meta's Codec Avatars Lab demonstrate the value of real controlled-light capture. DifFRelight's realistic subject-specific facial relighting inspired us to explore full bodies, motion, and unseen people.

## 33

### 中文

一张照片像真的，

还不够。

### English

One convincing frame

is only the beginning.

## 34

### 中文

我们最初想采集大量静止姿势下的平光 / 单灯配对。但实验提醒我们：即使是同一个人，学过几个姿势，也不意味着能应对转身、抬手和衣服的连续变形。

### English

We initially planned to collect many static flat-lit / single-light pairs. Our experiments showed that even for the same person, a few poses did not cover turning, raising an arm, or continuously deforming clothing.

## 35

### 中文

因此，我们开始采集动态的全身配对。在真实动作中交替拍摄平光和单灯画面，再对齐成训练对。视频模型由此同时学习“光怎么变”与“人怎么动”，并预测每一束光下的整段视频。

### English

We therefore captured dynamic full-body pairs: alternating flat-lit and single-light frames during real performances, then aligning them for training. The video model learns lighting response through motion and predicts an entire sequence for each light direction.

## 36

### 中文

每一列是一对：动作相同，光照不同。示意的是对齐后的训练配对，并不表示采集时能在同一瞬间拍到所有光照。

### English

Each column is a pair: matching motion, different light. This illustrates aligned training pairs, not simultaneous capture of all lighting directions.

## 37

### 中文

普通视频，

也应该能成为起点。

### English

An ordinary video

should be a starting point too.

## 38

### 中文

输入不必已经是理想的平光。DynOLAT 先通过 delighting 减弱原有光照的影响，尽量映射到训练时的平光域，再预测单灯视频并合成新光照。

### English

The input need not already have ideal flat lighting. DynOLAT first uses delighting to reduce the original illumination and move the input toward the flat-lit training domain, then predicts single-light videos and composes new lighting.

## 39

### 中文

看它，动起来。

### English

Now watch it move.

## 40

### 中文

上面的写实画面用于解释概念。下面是项目补充视频中的真实演示片段，保留了原始方法标签。可以分别观察光照变化、时间连贯性和普通视频输入。

### English

The photorealistic illustrations above explain the ideas. Below are actual excerpts from the project's supplementary video, with the original method labels retained. Explore lighting changes, temporal consistency, and ordinary video inputs.

## 41

### 中文

这项研究，走到了哪一步？

### English

Where does the research stand?

## 42

### 中文

DynOLAT 研究的是可控、连贯的真人视频重光照，目前不是可直接接入游戏的实时功能。强阴影与复杂彩光可能残留，细节和跨视角一致性也并不完美；生成多束单灯视频仍有计算与存储成本。我们希望后续的加速、蒸馏和多视角研究继续缩短这段距离。

### English

DynOLAT studies controllable, coherent human video relighting; it is not currently a real-time game feature. Strong shadows or colored light can leave residuals, and details and cross-view consistency are imperfect. Generating many single-light videos also costs compute and storage. Acceleration, distillation, and multi-view research are directions for future work.

## 43

### 中文

先学会一束光。

再让它，跟着人一起动。

### English

Learn one light.

Then follow the person through motion.

## 44

### 中文

我们的目标，是让光照变得可控，让真实感在动作里延续。

### English

Our goal: controllable lighting, with realism that holds through motion.

## 图像与论文来源

完整来源、用途与生成提示词见 [VISUAL_ASSETS.md](VISUAL_ASSETS.md)。
网页中的可折叠段落保留了原论文链接。图像是概念说明，实际模型结果由补充视频片段单独呈现。
