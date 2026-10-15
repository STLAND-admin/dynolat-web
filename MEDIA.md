# Media provenance

The full supplementary movie was supplied by the project author. The original MOV and lossless MP4 are preserved outside this web repository in the local preview workspace's `source-media/` folder.

`assets/videos/dynolat-demo.mp4` is a 1280 × 720 H.264 web transcode (target 2 Mb/s, about 68 MiB, duration 288.45 s). It is visually compressed; it is not a lossless master. The source has no audio track. The master is approximately 210 MiB and exceeds GitHub's regular 100 MiB file limit.

Comparison excerpts are lossless passthrough trims from the supplied master, preserving all baked-in method labels. They are not cropped to remove other methods. Their posters are actual frames from the same source.

| Clip | Source interval | Content |
|---|---|---|
| `lighting-response.mp4` | 02:09–02:27 | Light direction / relative intensity; DynOLAT, UniRelight, DiffusionRenderer |
| `captured-scenes.mp4` | 02:30–02:54 | Captured test data; input, DynOLAT, UniRelight, DiffusionRenderer, RelightVid |
| `in-the-wild.mp4` | 03:30–03:45 | General input videos; the same method comparison |
| `temporal-consistency.mp4` | 03:47–03:53 | DynOLAT versus per-frame inference |

The last clip is an inference-strategy comparison. The in-the-wild clip is not an explicit Delighting ablation. Do not imply a causal Delighting improvement from this clip alone.

The three short environment previews and SDR/HDR example come from the existing project materials. These illustrate relighting and display formats, not additional baseline comparisons.

GitHub file-size guidance: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
