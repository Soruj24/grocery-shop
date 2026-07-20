"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/utils/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      <div
        className={cn(
          "bg-card dark:bg-card border border-border rounded-2xl max-w-lg w-full p-8 shadow-xl dark:shadow-2xl animate-in zoom-in-95 duration-300",
          sizeMap[size],
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-foreground tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted dark:hover:bg-muted rounded-md transition-colors group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
