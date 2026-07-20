"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "./types";

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm ds-animate-fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          "absolute top-0 h-full bg-card text-card-foreground border-border shadow-2xl flex flex-col",
          "ds-animate-fade-in max-w-[92vw]",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
        )}
        style={{ width }}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-border">
          <div>
            {title && <h2 className="text-h4 font-extrabold tracking-tight">{title}</h2>}
            {description && (
              <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto ds-custom-scrollbar p-5">{children}</div>
        {footer && (
          <div className="border-t border-border p-5 bg-subtle">{footer}</div>
        )}
      </div>
    </div>
  );
}
Drawer.displayName = "Drawer";
