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
  primary:
    "bg-primary/[0.08] text-primary ring-1 ring-primary/[0.12]",
  accent:
    "bg-accent/[0.08] text-accent ring-1 ring-accent/[0.12]",
  warning:
    "bg-warning/[0.08] text-warning ring-1 ring-warning/[0.12]",
  danger:
    "bg-danger/[0.08] text-danger ring-1 ring-danger/[0.12]",
  info:
    "bg-info/[0.08] text-info ring-1 ring-info/[0.12]",
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
      className={`relative py-20 lg:py-28 overflow-hidden ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {(eyebrow || title || subtitle || viewAllHref) && (
          <div className="mb-12 lg:mb-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              {eyebrow && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] ${eyebrowMap[eyebrowTone]}`}
                >
                  {eyebrow}
                </motion.span>
              )}
              {title && (
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 }}
                  className="text-4xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.25rem]"
                >
                  {title}
                </motion.h2>
              )}
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="max-w-2xl text-base font-medium leading-relaxed text-muted-foreground lg:text-lg"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
            {viewAllHref && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="shrink-0"
              >
                <Link
                  href={viewAllHref}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-primary/[0.2] hover:bg-primary/[0.04] hover:text-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-[0.98] dark:border-white/[0.08] dark:bg-white/[0.03]"
                >
                  {viewAllLabel ?? t("view_all")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
