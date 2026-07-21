"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { cn, type Tone } from "./types";
import { slideUpVariants, springSnappy } from "@/lib/motion";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: Tone;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const toneStyle: Record<Tone, { ring: string; icon: React.ElementType; color: string }> = {
  primary: { ring: "border-primary-border", icon: Info, color: "text-primary" },
  neutral: { ring: "border-border", icon: Info, color: "text-muted-foreground" },
  success: { ring: "border-success/40", icon: CheckCircle2, color: "text-success" },
  warning: { ring: "border-warning/40", icon: AlertTriangle, color: "text-warning" },
  danger: { ring: "border-danger/40", icon: XCircle, color: "text-danger" },
  info: { ring: "border-info/40", icon: Info, color: "text-info" },
  accent: { ring: "border-accent/40", icon: Info, color: "text-accent" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = React.useCallback(
    (opts: ToastOptions) => {
      const id = Math.random().toString(36).slice(2);
      setItems((prev) => [...prev, { ...opts, id }]);
      const duration = opts.duration ?? 3800;
      window.setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  const value = React.useMemo<ToastContextValue>(
    () => ({
      toast: push,
      success: (title, description) => push({ title, description, tone: "success" }),
      error: (title, description) => push({ title, description, tone: "danger" }),
      warning: (title, description) => push({ title, description, tone: "warning" }),
      info: (title, description) => push({ title, description, tone: "info" }),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-[300] flex w-full max-w-sm flex-col gap-2.5">
            <AnimatePresence mode="popLayout">
              {items.map((t) => {
                const { ring, icon: Icon, color } = toneStyle[t.tone ?? "info"];
                return (
                  <motion.div
                    key={t.id}
                    layout
                    role="status"
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={springSnappy}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border bg-card p-4 shadow-lg",
                      ring,
                    )}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", color)} aria-hidden />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">{t.title}</p>
                      {t.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(t.id)}
                      aria-label="Dismiss"
                      className="rounded-xs p-1 text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
