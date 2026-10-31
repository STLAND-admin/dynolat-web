# Media provenance

The full supplementary movie was supplied by the project author. The original MOV and lossless MP4 are preserved outside this web repository in the local preview workspace's `source-media/` folder.

`assets/videos/dynolat-demo.mp4` is a 1280 × 720 H.264 web transcode (target 2 Mb/s, about 68 MiB, duration 288.45 s). It is visually compressed; it is not a lossless master. The source has no audio track. The master is approximately 210 MiB and exceeds GitHub's regular 100 MiB file limit.

## Jcam multi-view sequence

The More Results gallery uses 12 Jcam clips copied from the author's `Demo_assets` folder. Each clip is approximately 1.9 seconds and uses H.264 encoding. They are displayed as a simple three-column by four-row video grid.

## Method figure

`assets/method-overview-dark.svg` reconstructs paper Figure 2 for the dark webpage. People and environment maps retain the original paper pixels with transparent masks. The SVG embeds these PNGs so it remains a self-contained, editable figure; its labels, model blocks, and connections are vector elements. No Delighting stage is added to the pipeline. The accompanying page text explains the separately trained delighting model for general videos.

The short environment previews and SDR/HDR example come from existing project materials. They illustrate relighting and display formats, not additional baseline comparisons.

GitHub file-size guidance: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
