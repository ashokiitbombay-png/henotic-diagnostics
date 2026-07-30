"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800" />;
  }

  // Determine if it's dark based on theme state or system preference
  const isDark = 
    theme === "dark" || 
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-slate-100 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Sun className="w-5 h-5 text-slate-800 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
