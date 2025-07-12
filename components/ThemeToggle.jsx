"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // initialise theme from storage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    setDark(initialDark);
    if (initialDark) document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  // update html class & storage on toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <motion.button
      whileHover={{ rotate: 20 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark((d) => !d)}
      className="p-2 rounded-full bg-background/70 backdrop-blur border border-border shadow-md hover:shadow-lg transition-all duration-200"
      aria-label="Toggle dark mode"
    >
      {dark ? "☀️" : "🌙"}
    </motion.button>
  );
}
