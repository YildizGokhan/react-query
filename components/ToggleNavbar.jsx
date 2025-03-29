"use client";

import { useThemeStore } from "../store/themeStore";

export default function ToggleNavbar() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}
