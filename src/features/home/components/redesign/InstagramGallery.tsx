"use client";

import Link from "next/link";
import { Instagram, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { SectionShell, Reveal } from "./SectionShell";

const tiles = [
  "vegetable",
  "fruit",
  "fish",
  "milk",
  "bread",
  "spice",
  "egg",
  "juice",
];

export default function InstagramGallery() {
  const { t } = useLanguage();
  const { instagram } = useSettings();
  const href = instagram || "https://instagram.com";

  return (
    <SectionShell
      eyebrow={t("instagram")}
      title={
        <>
          {t("follow_us")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            @{t("instagram")}
          </span>
        </>
      }
      subtitle={t("instagram_desc")}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((key, i) => (
          <Reveal
            key={i}
            delay={Math.min(i * 0.05, 0.35)}
          >
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={getProductFallbackImage(key)}
                alt={t("instagram")}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/70 to-accent/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="h-9 w-9 text-white" />
              </div>
              <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.15] text-white ring-1 ring-white/[0.2] backdrop-blur-sm">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
        >
          <Instagram className="h-5 w-5" />
          {t("follow_us")}
        </Link>
      </div>
    </SectionShell>
  );
}
