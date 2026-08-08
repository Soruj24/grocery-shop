"use client";

import Link from "next/link";
import { PhoneCall, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TopBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-foreground text-background/60 py-1.5 px-4 hidden md:fixed md:top-0 md:left-0 md:right-0 md:block relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
            </span>
            <span>{t("fresh_organic")}</span>
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-3 h-3" />
            <span>
              {t("helpline")}:{" "}
              <span className="text-white font-semibold">
                {t("helpline_number")}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/track-order"
            className="hover:text-white transition-colors duration-200"
          >
            {t("track_order")}
          </Link>
          <div className="w-px h-3 bg-white/15" />
          <Link
            href="/products?filter=offers"
            className="flex items-center gap-1.5 text-warning hover:text-warning/80 transition-colors duration-200"
          >
            <Star className="w-3 h-3 fill-current" />
            {t("special_offers")}
          </Link>
        </div>
      </div>
    </div>
  );
}
