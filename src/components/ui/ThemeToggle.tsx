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
      <div className="p-2.5 sm:p-3 bg-muted rounded-2xl w-11 h-11 sm:w-12 sm:h-12" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 sm:p-3 bg-muted hover:bg-primary-subtle text-foreground hover:text-primary transition-all group rounded-2xl"
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
