(() => {
  "use strict";
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll("[data-language-button]")];
  function setLanguage(language) {
    const selected = language === "en" ? "en" : "zh";
    root.dataset.language = selected;
    root.lang = selected === "en" ? "en" : "zh-CN";
    languageButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.languageButton === selected));
    });
    try { localStorage.setItem("dynolat-visual-language", selected); } catch {}
  }
  languageButtons.forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.languageButton)));
  try { setLanguage(localStorage.getItem("dynolat-visual-language") || "zh"); } catch { setLanguage("zh"); }

  const portrait = document.querySelector("#hero-portrait");
  const lightButtons = [...document.querySelectorAll("[data-light]")];
  lightButtons.forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.light);
    portrait.style.setProperty("--portrait-offset", `${-index * 100 / 3}%`);
    lightButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelectorAll("[data-light-label]").forEach(label => { label.hidden = label.dataset.lightLabel !== String(index); });
  }));

  const video = document.querySelector("#research-video");
  const videoButtons = [...document.querySelectorAll("[data-video]")];
  const errorMessage = document.querySelector("#video-error");
  video.addEventListener("error", () => { errorMessage.hidden = false; });
  video.querySelector("source").addEventListener("error", () => { errorMessage.hidden = false; });
  video.addEventListener("loadedmetadata", () => { errorMessage.hidden = true; });
  videoButtons.forEach(button => button.addEventListener("click", () => {
    if (button.getAttribute("aria-pressed") === "true") return;
    video.pause();
    const name = button.dataset.video;
    const path = `assets/videos/comparisons/${name}`;
    errorMessage.hidden = true;
    video.poster = `${path}.jpg`;
    video.querySelector("source").src = `${path}.mp4`;
    document.querySelector("#video-download").href = `${path}.mp4`;
    video.load();
    videoButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelectorAll("[data-video-description]").forEach(label => { label.hidden = label.dataset.videoDescription !== name; });
  }));
})();
