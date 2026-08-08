"use client";

import { X, Layers } from "lucide-react";
import type { AdminCombo } from "@/types/admin";

interface ComboModalHeaderProps {
  editingCombo: AdminCombo | null;
  onClose: () => void;
}

export default function ComboModalHeader({
  editingCombo,
  onClose,
}: ComboModalHeaderProps) {
  return (
    <div className="p-8 border-b border-border flex justify-between items-center bg-muted/30 rounded-t-xl">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {editingCombo ? "কম্বো এডিট করুন" : "নতুন কম্বো যোগ করুন"}
          </h3>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
