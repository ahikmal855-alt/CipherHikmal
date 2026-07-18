(function () {
  "use strict";

  const STORAGE_KEY = "kriptolab-theme";
  const root = document.documentElement;

  function preferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme, persist) {
    root.dataset.theme = theme;
    if (persist) localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const nextLabel = theme === "dark" ? "Gunakan mode terang" : "Gunakan mode gelap";
      button.setAttribute("aria-label", nextLabel);
      button.setAttribute("title", nextLabel);
    });
  }

  setTheme(preferredTheme(), false);

  document.addEventListener("DOMContentLoaded", function () {
    setTheme(root.dataset.theme || preferredTheme(), false);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", function () {
        setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
      });
    });
  });

  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
      setTheme(event.newValue, false);
    }
  });
})();
