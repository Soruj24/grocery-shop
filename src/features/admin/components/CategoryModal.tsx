"use client";

import { X } from "lucide-react";
import { AdminCategory, AdminCategoryFormData } from "@/types/admin";
import { cn } from "@/utils/utils";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: AdminCategory | null;
  formData: AdminCategoryFormData;
  setFormData: (data: AdminCategoryFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  mainCategories: AdminCategory[];
}

export default function CategoryModal({
  isOpen,
  onClose,
  editingCategory,
  formData,
  setFormData,
  handleSubmit,
  mainCategories,
}: CategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-card rounded-xl max-w-lg w-full p-8 shadow-xl border border-border animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {editingCategory ? "ক্যাটাগরি এডিট" : "নতুন ক্যাটাগরি"}
            </h3>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-1">
              ক্যাটাগরি তথ্য পূরণ করুন
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                ক্যাটাগরির নাম
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:bg-card focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="যেমন: চাল, ডাল, শাকসবজি..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                প্যারেন্ট ক্যাটাগরি (ঐচ্ছিক)
              </label>
              <select
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:bg-card focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all text-sm text-foreground appearance-none"
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              >
                <option value="">কোনোটিই নয় (মেইন ক্যাটাগরি)</option>
                {mainCategories
                  .filter((cat: AdminCategory) => cat._id !== editingCategory?._id)
                  .map((cat: AdminCategory) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                ইমেজ ইউআরএল (ঐচ্ছিক)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:bg-card focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-3 bg-muted p-4 rounded-lg">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-foreground cursor-pointer select-none">
                শপে প্রদর্শন করুন
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={cn(
              "w-full bg-primary text-primary-foreground py-3 rounded-lg",
              "font-medium text-sm transition-all active:scale-[0.98]",
              "hover:bg-primary/90",
            )}
          >
            {editingCategory ? "পরিবর্তন সেভ করুন" : "ক্যাটাগরি যোগ করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
