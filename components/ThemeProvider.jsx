"use client";

import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export default function ThemeProvider({ children }) {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}
