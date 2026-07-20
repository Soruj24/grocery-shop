"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCw,
  Tag,
  Timer,
  LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionShell, Reveal } from "./SectionShell";

interface Guarantee {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: string;
}

export default function TrustSection() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const guarantees: Guarantee[] = [
    {
      icon: Truck,
      title: t("feature_title_1"),
      desc: t("feature_desc_1"),
      tone: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShieldCheck,
      title: t("feature_title_2"),
      desc: t("feature_desc_2"),
      tone: "from-emerald-500 to-green-600",
    },
    {
      icon: Headphones,
      title: t("feature_title_3"),
      desc: t("feature_desc_3"),
      tone: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: RefreshCw,
      title: t("feature_title_6"),
      desc: t("feature_desc_6"),
      tone: "from-orange-500 to-amber-500",
    },
    {
      icon: Tag,
      title: t("daily_deals_title") ?? "দৈনিক অফার",
      desc: t("daily_deals_desc") ?? "প্রতিদিন নতুন ছাড়",
      tone: "from-rose-500 to-pink-500",
    },
    {
      icon: Timer,
      title: t("flash_sale") ?? "ফ্ল্যাশ সেল",
      desc: t("flash_sale_desc") ?? "সীমিত সময়ের ছাড়",
      tone: "from-amber-500 to-yellow-500",
    },
  ];

  const stats = [
    { value: "৫০K+", label: t("total_customers") ?? "গ্রাহক" },
    { value: "১০K+", label: t("total_products") ?? "পণ্য" },
    { value: "৯৯%", label: t("happy_rate") ?? "সন্তুষ্টি" },
    { value: "৩০মিন", label: t("delivery_time") ?? "ডেলিভারি" },
  ];

  return (
    <SectionShell eyebrow={t("trust")} title={t("trust")} subtitle={t("trust_desc")}>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Stat panel */}
        <Reveal className="lg:row-span-2">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-foreground p-8 text-background">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black leading-tight">
                {t("trust_desc") ?? "কেন হাজারো গ্রাহক আমাদের বেছে নেন"}
              </h3>
              <p className="mt-3 text-sm font-medium text-background/70">
                {t("brand_tagline")}
              </p>
            </div>
            <div className="relative z-10 mt-8 grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-primary">{s.value}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-background/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Guarantee cards */}
        {guarantees.map((g, i) => (
          <Reveal key={i} delay={i * 0.06} className={i >= 4 ? "lg:col-span-2" : ""}>
            <div className="group flex h-full items-center gap-4 rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${g.tone} text-white shadow-sm transition-transform duration-500 group-hover:scale-110`}
              >
                <g.icon className="h-7 w-7" />
              </div>
              <div>
                <h4 className="text-base font-black text-foreground">{g.title}</h4>
                <p className="mt-1 text-sm font-medium leading-snug text-muted-foreground">
                  {g.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
