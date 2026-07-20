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
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
    },
    {
      id: 2,
      content: t("testimonial_2_content"),
      author: t("testimonial_2_author"),
      role: t("testimonial_2_role"),
      rating: 5,
      size: "small",
      color: "bg-gradient-to-br from-orange-500 to-amber-600",
    },
    {
      id: 3,
      content: t("testimonial_3_content"),
      author: t("testimonial_3_author"),
      role: t("testimonial_3_role"),
      rating: 4,
      size: "small",
      color: "bg-gradient-to-br from-sky-500 to-blue-600",
    },
    {
      id: 4,
      content: t("testimonial_4_content"),
      author: t("testimonial_4_author"),
      role: t("testimonial_4_role"),
      rating: 5,
      size: "medium",
      color: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    },
    {
      id: 5,
      content: t("testimonial_5_content"),
      author: t("testimonial_5_author"),
      role: t("testimonial_5_role"),
      rating: 5,
      size: "small",
      color: "bg-gradient-to-br from-teal-500 to-cyan-600",
    },
  ];

  return (
    <SectionShell
      eyebrow={t("testimonials_badge")}
      eyebrowTone="danger"
      title={
        <>
          {t("testimonials_title_1")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-danger to-warning">
            {t("testimonials_title_2")}
          </span>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 auto-rows-[230px]">
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
            <div className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating
                            ? "fill-warning text-warning"
                            : "text-border-strong"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="h-9 w-9 text-border transition-colors group-hover:text-primary/40" />
                </div>
                <p
                  className={`font-medium leading-relaxed text-muted-foreground ${
                    item.size === "large" ? "text-lg" : "text-sm"
                  }`}
                >
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm ${item.color}`}
                >
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-black text-foreground">{item.author}</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
