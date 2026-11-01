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

function setupJcamAutoplay() {  const videos = [...document.querySelectorAll(".jcam-card video")];  if (videos.length === 0 || !("IntersectionObserver" in window)) return;  const observer = new IntersectionObserver((entries) => {    for (const entry of entries) {      const video = entry.target;      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {        video.muted = true;        video.autoplay = true;        video.play().catch(() => {});      } else {        video.autoplay = false;        video.pause();      }    }  }, { threshold: [0, 0.35] });  for (const video of videos) {    video.muted = true;    observer.observe(video);  }}window.addEventListener("scroll", requestChromeUpdate, { passive: true });
window.addEventListener("resize", requestChromeUpdate);

updateHdrSupportNote();
syncExperimentVideos();setupJcamAutoplay();
updatePageChrome();

const hdrVideo = document.querySelector(".hdr-video");
hdrVideo?.addEventListener("loadedmetadata", updateHdrSupportNote);
hdrVideo?.addEventListener("error", updateHdrSupportNote);

const demoVideo = document.querySelector("#demo-video");
const demoToggle = document.querySelector("[data-demo-toggle]");
function updateDemoPlayback() {
  if (demoToggle && demoVideo) demoToggle.textContent = demoVideo.paused ? "Play demo" : "Pause demo";
}
demoToggle?.addEventListener("click", () => {
  if (!demoVideo) return;
  if (demoVideo.paused) demoVideo.play().catch(updateDemoPlayback);
  else demoVideo.pause();
});
for (const event of ["play", "pause", "ended"]) demoVideo?.addEventListener(event, updateDemoPlayback);
