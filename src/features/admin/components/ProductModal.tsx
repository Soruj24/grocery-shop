"use client";

import { AdminProduct, AdminCategory, GroupedCategory, AdminProductFormData } from "@/types/admin";
import ProductFormField, { ADMIN_INPUT_CLASSES } from "./ProductFormField";
import ProductImageField from "./ProductImageField";
import ProductTagsField from "./ProductTagsField";
import { Modal } from "@/components/ui/system/Modal";
import { cn } from "@/utils/utils";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: AdminProduct | null;
  formData: AdminProductFormData;
  setFormData: (data: AdminProductFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  groupedCategories: Record<string, GroupedCategory>;
  loading?: boolean;
}

const unitOptions = [
  { value: "pcs", label: "Pcs (পিস)" }, { value: "kg", label: "Kg (কেজি)" },
  { value: "g", label: "Gram (গ্রাম)" }, { value: "l", label: "Liter (লিটার)" },
  { value: "ml", label: "ml (মিলি)" }, { value: "pack", label: "Pack (প্যাক)" },
  { value: "box", label: "Box (বক্স)" }, { value: "bottle", label: "Bottle (বোতল)" },
  { value: "dozen", label: "Dozen (ডজন)" },
];

export default function ProductModal({ isOpen, onClose, editingProduct, formData, setFormData, handleSubmit, groupedCategories, loading }: ProductModalProps) {
  const update = (field: keyof AdminProductFormData, value: unknown) => setFormData({ ...formData, [field]: value });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingProduct ? "প্রোডাক্ট এডিট করুন" : "নতুন প্রোডাক্ট যোগ করুন"}
      description="সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProductFormField label="প্রোডাক্টের নাম" value={formData.name} onChange={(v) => update("name", v)} placeholder="যেমন: চিনি (১ কেজি)" required />
          <div className="space-y-1.5">
            <label htmlFor="product-category" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ক্যাটাগরি</label>
            <select id="product-category" value={formData.category} onChange={(e) => update("category", e.target.value)} className={cn(ADMIN_INPUT_CLASSES, "appearance-none cursor-pointer")} required>
              <option value="">ক্যাটাগরি সিলেক্ট করুন</option>
              {Object.values(groupedCategories).map((parent) => (
                <optgroup key={parent._id} label={parent.name}>
                  <option value={parent._id}>{parent.name} (Main)</option>
                  {parent.subCategories?.map((sub: AdminCategory) => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
            <ProductFormField label="মূল্য (৳)" value={formData.price} onChange={(v) => update("price", Number(v))} type="number" placeholder="যেমন: ১০০" required />
            <ProductFormField label="স্টক (পরিমাণ)" value={formData.stock} onChange={(v) => update("stock", Number(v))} type="number" placeholder="যেমন: ৫০" required />
            <ProductFormField label="ইউনিট" value={formData.unit || "pcs"} onChange={(v) => update("unit", v)} type="select" options={unitOptions} />
          </div>
          <ProductImageField value={formData.image} onChange={(v) => update("image", v)} />
          <ProductFormField label="প্রোডাক্টের বিবরণ" value={formData.description} onChange={(v) => update("description", v)} type="textarea" placeholder="প্রোডাক্ট সম্পর্কে বিস্তারিত লিখুন..." />
        </div>
        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
          <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => update("isActive", e.target.checked)} className="w-4 h-4 rounded border-border text-primary focus:ring-ring" />
          <label htmlFor="isActive" className="text-sm font-medium text-foreground cursor-pointer select-none">প্রোডাক্টটি শপে সক্রিয় দেখাতে চান?</label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProductFormField label="ডিসকাউন্ট (%)" value={formData.discount || 0} onChange={(v) => update("discount", Number(v))} type="number" min={0} max={100} placeholder="যেমন: 10" />
          <ProductFormField label="ডিসকাউন্ট প্রাইস (৳)" value={formData.discountPrice || 0} onChange={(v) => update("discountPrice", Number(v))} type="number" min={0} placeholder="যেমন: ৮৯" />
          <ProductTagsField isDeal={!!formData.isDeal} isPopular={!!formData.isPopular} isNewArrival={!!formData.isNewArrival} onChange={(field, checked) => update(field as keyof AdminProductFormData, checked)} />
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 hover:text-foreground transition-colors">বাতিল</button>
          <button type="submit" disabled={loading} className={cn(
            "px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground",
            "hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50",
          )}>
            {loading ? <span className="flex items-center gap-2"><span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> সেভ হচ্ছে...</span> : editingProduct ? "পরিবর্তন সেভ করুন" : "প্রোডাক্ট যোগ করুন"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
