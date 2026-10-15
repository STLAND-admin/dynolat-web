const topbar = document.querySelector("[data-topbar]");
const hero = document.querySelector("[data-topbar-trigger]");
const sections = [...document.querySelectorAll("main section[id], main .hero-demo[id]")];
const navLinks = [...document.querySelectorAll(".topbar__link")];
const hdrSupportNote = document.querySelector("#hdrSupportNote");
const experimentVideos = [...document.querySelectorAll(".experiment-video")];

let frameRequested = false;

function updateTopbar() {
  if (!topbar || !hero) return;
  const pinAt = Math.min(180, window.innerHeight * 0.2);
  topbar.classList.toggle("is-pinned", hero.getBoundingClientRect().bottom <= pinAt);
}

function updateActiveSection() {
  if (sections.length === 0) return;

  const anchor = Math.min(window.innerHeight * 0.38, 320);
  let active = sections[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= anchor) active = section;
  }

  for (const link of navLinks) {
    const isActive = link.getAttribute("href") === `#${active.id}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

function updatePageChrome() {
  frameRequested = false;
  updateTopbar();
  updateActiveSection();
}

function requestChromeUpdate() {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(updatePageChrome);
}

function updateHdrSupportNote() {
  if (!hdrSupportNote) return;
  const hdrVideo = document.querySelector(".hdr-video");
  const hdrDisplay = window.matchMedia?.("(dynamic-range: high)").matches;
  if (hdrVideo?.error) {
    hdrSupportNote.textContent = "This browser could not decode the HDR clip. Use the SDR preview or try an HDR-capable browser and display.";
  } else if (hdrVideo?.readyState >= 1) {
    hdrSupportNote.textContent = hdrDisplay
      ? "HDR clip loaded; the browser reports a high-dynamic-range display. Actual HDR output depends on the browser and display settings."
      : "HDR clip loaded. A high-dynamic-range display was not detected; brightness may be tone-mapped.";
  } else {
    hdrSupportNote.textContent = "HDR playback depends on your browser, video decoder, and display.";
  }
}

function syncExperimentVideos() {
  if (experimentVideos.length !== 2) return;

  const [left, right] = experimentVideos;
  let syncing = false;

  const mirror = (source, target, action) => {
    if (syncing) return;
    syncing = true;
    try {
      if (Math.abs(target.currentTime - source.currentTime) > 0.08) {
        target.currentTime = source.currentTime;
      }
      target.playbackRate = source.playbackRate;
      action?.(target);
    } finally {
      window.setTimeout(() => { syncing = false; }, 0);
    }
  };

  for (const [source, target] of [[left, right], [right, left]]) {
    source.addEventListener("play", () => mirror(source, target, (video) => video.play().catch(() => {})));
    source.addEventListener("pause", () => mirror(source, target, (video) => video.pause()));
    source.addEventListener("seeking", () => mirror(source, target));
    source.addEventListener("ratechange", () => mirror(source, target));
  }
}

window.addEventListener("scroll", requestChromeUpdate, { passive: true });
window.addEventListener("resize", requestChromeUpdate);

updateHdrSupportNote();
syncExperimentVideos();
updatePageChrome();

const hdrVideo = document.querySelector(".hdr-video");
hdrVideo?.addEventListener("loadedmetadata", updateHdrSupportNote);
hdrVideo?.addEventListener("error", updateHdrSupportNote);

const demoVideo = document.querySelector("#demo-video");
const previews = [...document.querySelectorAll("video[data-preview]")];
const previewToggle = document.querySelector("[data-preview-toggle]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let previewsEnabled = !reducedMotion.matches && !navigator.connection?.saveData;
let previewsVisible = true;

function updatePreviewButton() {
  if (!previewToggle) return;
  previewToggle.textContent = previews.some(video => !video.paused) ? "Pause previews" : "Play previews";
}

function applyPreviewPlayback() {
  const shouldPlay = previewsEnabled && previewsVisible && !document.hidden && (!demoVideo || demoVideo.paused);
  for (const video of previews) {
    if (shouldPlay) video.play().catch(updatePreviewButton);
    else video.pause();
  }
  updatePreviewButton();
}

for (const video of previews) {
  video.addEventListener("play", updatePreviewButton);
  video.addEventListener("pause", updatePreviewButton);
}
previewToggle?.addEventListener("click", () => {
  previewsEnabled = !previews.some(video => !video.paused);
  applyPreviewPlayback();
});
document.addEventListener("visibilitychange", applyPreviewPlayback);
reducedMotion.addEventListener("change", event => {
  if (event.matches) { previewsEnabled = false; applyPreviewPlayback(); }
});
const previewGrid = document.querySelector(".preview-grid");
if (previewGrid && "IntersectionObserver" in window) {
  new IntersectionObserver(entries => {
    previewsVisible = entries[0].isIntersecting;
    applyPreviewPlayback();
  }, { threshold: 0.1 }).observe(previewGrid);
} else {
  applyPreviewPlayback();
}

// Keep the short environment previews on a shared timeline once decoded.
const previewLead = previews[0];
previewLead?.addEventListener("timeupdate", () => {
  if (previewLead.paused) return;
  for (const video of previews.slice(1)) {
    if (video.readyState >= 2 && Math.abs(video.currentTime - previewLead.currentTime) > 0.12) {
      video.currentTime = Math.min(previewLead.currentTime, Math.max(0, video.duration - 0.01));
    }
  }
});

const demoToggle = document.querySelector("[data-demo-toggle]");
function updateDemoPlayback() {
  if (demoToggle && demoVideo) demoToggle.textContent = demoVideo.paused ? "Play demo" : "Pause demo";
  applyPreviewPlayback();
}
demoToggle?.addEventListener("click", () => {
  if (!demoVideo) return;
  if (demoVideo.paused) demoVideo.play().catch(updateDemoPlayback);
  else demoVideo.pause();
});
for (const event of ["play", "pause", "ended"]) demoVideo?.addEventListener(event, updateDemoPlayback);

const comparisonVideo = document.querySelector("#comparison-video");
const comparisonToggle = document.querySelector("[data-comparison-toggle]");
const comparisonButtons = [...document.querySelectorAll("[data-comparison]")];
const comparisonDescriptions = {
  "lighting-response": "Light direction and relative intensity: DynOLAT, UniRelight, and DiffusionRenderer. Supplementary video 2:09–2:27.",
  "captured-scenes": "Captured test scenes: input, DynOLAT, UniRelight, DiffusionRenderer, and RelightVid. Supplementary video 2:30–2:54.",
  "in-the-wild": "General video inputs: input, DynOLAT, UniRelight, DiffusionRenderer, and RelightVid. Supplementary video 3:30–3:45. This is a method comparison, not a delighting ablation.",
  "temporal-consistency": "Temporal consistency: DynOLAT versus per-frame inference. Supplementary video 3:47–3:53. This compares inference strategies, not different baseline models."
};
function updateComparisonPlayback() {
  if (comparisonToggle) comparisonToggle.textContent = comparisonVideo.paused ? "Play comparison" : "Pause comparison";
}
comparisonToggle?.addEventListener("click", () => {
  if (comparisonVideo.paused) comparisonVideo.play().catch(updateComparisonPlayback);
  else comparisonVideo.pause();
});
for (const button of comparisonButtons) button.addEventListener("click", () => {
  if (button.getAttribute("aria-pressed") === "true") return;
  comparisonVideo.pause();
  const key = button.dataset.comparison;
  const path = `assets/videos/comparisons/${key}`;
  comparisonVideo.src = `${path}.mp4`;
  comparisonVideo.poster = `${path}.jpg`;
  comparisonVideo.setAttribute("aria-label", `${button.textContent} comparison`);
  comparisonVideo.load();
  document.querySelector("#comparison-caption").textContent = comparisonDescriptions[key];
  document.querySelector("#comparison-download").href = `${path}.mp4`;
  for (const other of comparisonButtons) other.setAttribute("aria-pressed", String(other === button));
  updateComparisonPlayback();
});
comparisonVideo?.addEventListener("play", () => {
  demoVideo?.pause();
  previewsEnabled = false;
  applyPreviewPlayback();
  updateComparisonPlayback();
});
comparisonVideo?.addEventListener("pause", updateComparisonPlayback);
demoVideo?.addEventListener("play", () => comparisonVideo?.pause());
