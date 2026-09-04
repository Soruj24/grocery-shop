"use client";

import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionShell, Reveal } from "./SectionShell";

export default function TestimonialsRail() {
  const { t } = useLanguage();

  const TESTIMONIALS = [
    {
      id: 1,
      content: t("testimonial_1_content"),
      author: t("testimonial_1_author"),
      role: t("testimonial_1_role"),
      rating: 5,
      size: "large",
    },
    {
      id: 2,
      content: t("testimonial_2_content"),
      author: t("testimonial_2_author"),
      role: t("testimonial_2_role"),
      rating: 5,
      size: "small",
    },
    {
      id: 3,
      content: t("testimonial_3_content"),
      author: t("testimonial_3_author"),
      role: t("testimonial_3_role"),
      rating: 4,
      size: "small",
    },
    {
      id: 4,
      content: t("testimonial_4_content"),
      author: t("testimonial_4_author"),
      role: t("testimonial_4_role"),
      rating: 5,
      size: "medium",
    },
    {
      id: 5,
      content: t("testimonial_5_content"),
      author: t("testimonial_5_author"),
      role: t("testimonial_5_role"),
      rating: 5,
      size: "small",
    },
  ];

  return (
    <SectionShell
      eyebrow={t("testimonials_badge")}
      eyebrowTone="danger"
      title={
        <>
          {t("testimonials_title_1")}{" "}
          {t("testimonials_title_2")}
        </>
      }
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 auto-rows-[240px]">
        {TESTIMONIALS.map((item, idx) => (
          <Reveal
            key={item.id}
            delay={idx * 0.07}
            className={
              item.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : item.size === "medium"
                ? "md:row-span-2"
                : ""
            }
          >
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transition-colors ${
                            i < item.rating
                              ? "fill-warning text-warning"
                              : "text-zinc-200 dark:text-white/[0.1]"
                          }`}
                        />
                      )
                    )}
                  </div>
                  <Quote className="h-10 w-10 text-zinc-100 transition-colors duration-300 group-hover:text-primary/20 dark:text-white/[0.06]" />
                </div>
                <p
                  className={`font-medium leading-relaxed text-muted-foreground ${
                    item.size === "large"
                      ? "text-lg"
                      : "text-sm"
                  }`}
                >
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground`}
                >
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">
                    {item.author}
                  </h4>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
