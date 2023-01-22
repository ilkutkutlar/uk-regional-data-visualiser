/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

function _userPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getPreferredTheme(): string {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;
  return _userPrefersDark() ? "dark" : "light";
}

export function saveTheme(theme: string) {
  localStorage.setItem("theme", theme);
}

export function setTheme(theme: string) {
  if (theme === "auto" && _userPrefersDark()) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }
}

export function setPreferredColourSchemeChangedListener() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme !== "light" || storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });
}
