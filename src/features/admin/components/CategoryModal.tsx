"use client";

import { AdminCategory, AdminCategoryFormData } from "@/types/admin";
import { Modal } from "@/components/ui/system/Modal";
import { ADMIN_INPUT_CLASSES } from "./ProductFormField";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: AdminCategory | null;
  formData: AdminCategoryFormData;
  setFormData: (data: AdminCategoryFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  mainCategories: AdminCategory[];
  loading?: boolean;
}

export default function CategoryModal({
  isOpen,
  onClose,
  editingCategory,
  formData,
  setFormData,
  handleSubmit,
  mainCategories,
  loading,
}: CategoryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCategory ? "ক্যাটাগরি এডিট" : "নতুন ক্যাটাগরি"}
      description="ক্যাটাগরি তথ্য পূরণ করুন"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="space-y-4">
          <div>
            <label htmlFor="cat-name" className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">ক্যাটাগরির নাম</label>
            <input id="cat-name" type="text" required className={ADMIN_INPUT_CLASSES} placeholder="যেমন: চাল, ডাল, শাকসবজি..." value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="cat-parent" className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">প্যারেন্ট ক্যাটাগরি (ঐচ্ছিক)</label>
            <select id="cat-parent" className={`${ADMIN_INPUT_CLASSES} appearance-none`} value={formData.parentId} onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}>
              <option value="">কোনোটিই নয় (মেইন ক্যাটাগরি)</option>
              {mainCategories.filter((cat: AdminCategory) => cat._id !== editingCategory?._id).map((cat: AdminCategory) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cat-image" className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">ইমেজ ইউআরএল (ঐচ্ছিক)</label>
            <input id="cat-image" type="text" className={ADMIN_INPUT_CLASSES} placeholder="https://example.com/image.jpg" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
            <input type="checkbox" id="cat-active" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 rounded border-border text-primary focus:ring-ring" />
            <label htmlFor="cat-active" className="text-sm font-medium text-foreground cursor-pointer select-none">শপে প্রদর্শন করুন</label>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 hover:text-foreground transition-colors">বাতিল</button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
            {loading ? <span className="flex items-center gap-2"><span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> সেভ হচ্ছে...</span> : editingCategory ? "পরিবর্তন সেভ করুন" : "ক্যাটাগরি যোগ করুন"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
