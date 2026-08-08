"use client";

import { X, Package } from "lucide-react";
import type { AdminProduct } from "@/types/admin";

interface ProductModalHeaderProps {
  editingProduct: AdminProduct | null;
  onClose: () => void;
}

export default function ProductModalHeader({
  editingProduct,
  onClose,
}: ProductModalHeaderProps) {
  return (
    <div className="p-8 border-b border-border flex justify-between items-center bg-muted/30 rounded-t-xl">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {editingProduct ? "প্রোডাক্ট এডিট করুন" : "নতুন প্রোডাক্ট যোগ করুন"}
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
