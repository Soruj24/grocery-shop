"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl w-11 h-11 sm:w-12 sm:h-12" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-2xl transition-all group"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
      ) : (
        <Moon className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
}
