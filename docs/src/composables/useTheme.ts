import { ref } from "vue";

type Theme = "light" | "dark";

const theme = ref<Theme>("light");
const STORAGE_KEY = "blue-note-theme";
let initialized = false;

function setTheme(newTheme: Theme) {
  theme.value = newTheme;
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function initTheme() {
  if (initialized) return;
  initialized = true;

  // Priority: localStorage > system preference > default (light)
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

  if (stored && (stored === "light" || stored === "dark")) {
    setTheme(stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

// Initialize immediately when this module is imported
if (typeof window !== "undefined") {
  initTheme();
}

export function useTheme() {
  function toggleTheme() {
    setTheme(theme.value === "light" ? "dark" : "light");
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  };
}
