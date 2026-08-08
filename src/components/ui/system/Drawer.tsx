"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "./types";
import { slideUpVariants, springSnappy, springGentle } from "@/lib/motion";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  description,
  children,
  footer,
  width = "420px",
}: DrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            variants={side === "right" ? {
              hidden: { x: "100%" },
              visible: { x: 0 },
              exit: { x: "100%" },
            } : {
              hidden: { x: "-100%" },
              visible: { x: 0 },
              exit: { x: "-100%" },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springGentle}
            className={cn(
              "absolute top-0 h-full bg-card text-card-foreground border-border shadow-2xl flex flex-col",
              "max-w-[92vw]",
              side === "right" ? "right-0 border-l" : "left-0 border-r",
            )}
            style={{ width }}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-border">
              <div>
                {title && <h2 className="text-h4 font-semibold tracking-tight">{title}</h2>}
                {description && (
                  <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto ds-custom-scrollbar p-6">{children}</div>
            {footer && (
              <div className="border-t border-border px-6 py-5 bg-subtle/50">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
Drawer.displayName = "Drawer";
