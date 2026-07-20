"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  eyebrowTone?: "primary" | "accent" | "warning" | "danger" | "info";
  title?: ReactNode;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

const eyebrowMap: Record<string, string> = {
  primary: "bg-primary-subtle text-primary-subtle-foreground",
  accent: "bg-accent-subtle text-accent-subtle-foreground",
  warning: "bg-warning-subtle text-warning-subtle-foreground",
  danger: "bg-danger-subtle text-danger-subtle-foreground",
  info: "bg-info-subtle text-info-subtle-foreground",
};

export function SectionShell({
  id,
  eyebrow,
  eyebrowTone = "primary",
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  children,
  className = "",
  containerClassName = "",
}: SectionShellProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={`relative py-16 lg:py-24 overflow-hidden ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {(eyebrow || title || subtitle || viewAllHref) && (
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              {eyebrow && (
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] ${eyebrowMap[eyebrowTone]}`}
                >
                  {eyebrow}
                </motion.span>
              )}
              {title && (
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                  className="text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl"
                >
                  {title}
                </motion.h2>
              )}
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="max-w-2xl text-base font-medium leading-relaxed text-muted-foreground"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
            {viewAllHref && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="shrink-0"
              >
                <Link
                  href={viewAllHref}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-black text-foreground transition-all hover:border-primary/40 hover:bg-primary-subtle hover:text-primary hover:shadow-md active:scale-95"
                >
                  {viewAllLabel ?? t("view_all")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </div>
        )}
        <div className={containerClassName}>{children}</div>
      </div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
