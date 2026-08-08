"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/utils/utils";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info" | "success";
  loading?: boolean;
}

const variantConfig = {
  danger: {
    icon: XCircle,
    iconBg: "bg-danger-subtle",
    iconColor: "text-danger",
    confirmBg: "bg-danger text-white hover:bg-danger/90",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-warning-subtle",
    iconColor: "text-warning",
    confirmBg: "bg-warning text-white hover:bg-warning/90",
  },
  info: {
    icon: Info,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    confirmBg: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  success: {
    icon: CheckCircle,
    iconBg: "bg-success-subtle",
    iconColor: "text-success",
    confirmBg: "bg-success text-white hover:bg-success/90",
  },
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    },
    [onClose, loading],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => cancelRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={!loading ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            className="relative w-full max-w-md bg-card rounded-xl shadow-xl border border-border overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", config.iconBg)}>
                  <Icon className={cn("h-5 w-5", config.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 id="confirm-dialog-title" className="text-base font-semibold text-foreground">
                    {title}
                  </h3>
                  <p id="confirm-dialog-message" className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {message}
                  </p>
                </div>
                {!loading && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-muted/30 border-t border-border">
              <button
                ref={cancelRef}
                onClick={onClose}
                disabled={loading}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  "bg-muted text-muted-foreground border border-border",
                  "hover:bg-muted/80 hover:text-foreground transition-colors",
                  "disabled:opacity-50",
                )}
              >
                {cancelLabel}
              </button>
              <button
                ref={confirmRef}
                onClick={onConfirm}
                disabled={loading}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  "disabled:opacity-50",
                  config.confirmBg,
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
