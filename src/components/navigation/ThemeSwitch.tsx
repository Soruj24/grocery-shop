"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ThemeSwitch() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark">(
    "light"
  );

  useEffect(() => {
    const stored = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle(
        "dark",
        stored === "dark"
      );
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle(
        "dark",
        prefersDark
      );
    }
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle(
      "dark",
      next === "dark"
    );
  };

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === "light" ? "ডার্ক মোড" : "লাইট মোড"
      }
      title={
        theme === "light" ? "ডার্ক মোড" : "লাইট মোড"
      }
      className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06] active:scale-[0.95]"
    >
      <Sun
        className={`h-[18px] w-[18px] transition-all duration-300 ${
          theme === "dark"
            ? "rotate-90 scale-0"
            : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100"
            : "-rotate-90 scale-0"
        }`}
      />
    </button>
  );
}
