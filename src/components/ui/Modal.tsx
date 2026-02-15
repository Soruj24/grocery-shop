"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
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
    <div className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] max-w-lg w-full p-10 shadow-2xl border dark:border-gray-800 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors group"
          >
            <X className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
