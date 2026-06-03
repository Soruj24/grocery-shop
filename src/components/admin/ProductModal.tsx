"use client";

import { AdminProduct, AdminCategory, GroupedCategory, AdminProductFormData } from "@/types/admin";
import ProductFormField, { ADMIN_INPUT_CLASSES } from "./ProductFormField";
import ProductImageField from "./ProductImageField";
import ProductTagsField from "./ProductTagsField";
import ProductModalHeader from "./ProductModalHeader";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: AdminProduct | null;
  formData: AdminProductFormData;
  setFormData: (data: AdminProductFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  groupedCategories: Record<string, GroupedCategory>;
}

const unitOptions = [
  { value: "pcs", label: "Pcs (পিস)" }, { value: "kg", label: "Kg (কেজি)" },
  { value: "g", label: "Gram (গ্রাম)" }, { value: "l", label: "Liter (লিটার)" },
  { value: "ml", label: "ml (মিলি)" }, { value: "pack", label: "Pack (প্যাক)" },
  { value: "box", label: "Box (বক্স)" }, { value: "bottle", label: "Bottle (বোতল)" },
  { value: "dozen", label: "Dozen (ডজন)" },
];

export default function ProductModal({ isOpen, onClose, editingProduct, formData, setFormData, handleSubmit, groupedCategories }: ProductModalProps) {
  if (!isOpen) return null;
  const update = (field: keyof AdminProductFormData, value: unknown) => setFormData({ ...formData, [field]: value });

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 dark:border-gray-800 animate-in fade-in zoom-in duration-300 my-auto">
        <ProductModalHeader editingProduct={editingProduct} onClose={onClose} />
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductFormField label="প্রোডাক্টের নাম" value={formData.name} onChange={(v) => update("name", v)} placeholder="যেমন: চিনি (১ কেজি)" required />
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">ক্যাটাগরি</label>
              <select value={formData.category} onChange={(e) => update("category", e.target.value)} className={`${ADMIN_INPUT_CLASSES} appearance-none cursor-pointer`} required>
                <option value="">ক্যাটাগরি সিলেক্ট করুন</option>
                {Object.values(groupedCategories).map((parent) => (
                  <optgroup key={parent._id} label={parent.name} className="font-black text-gray-500 dark:text-gray-400">
                    <option value={parent._id} className="dark:bg-gray-900">{parent.name} (Main)</option>
                    {parent.subCategories?.map((sub: AdminCategory) => (
                      <option key={sub._id} value={sub._id} className="text-gray-900 dark:text-white font-bold dark:bg-gray-900">{sub.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProductFormField label="মূল্য (৳)" value={formData.price} onChange={(v) => update("price", Number(v))} type="number" placeholder="যেমন: ১০০" required />
              <ProductFormField label="স্টক (পরিমাণ)" value={formData.stock} onChange={(v) => update("stock", Number(v))} type="number" placeholder="যেমন: ৫০" required />
              <ProductFormField label="ইউনিট" value={formData.unit || "pcs"} onChange={(v) => update("unit", v)} type="select" options={unitOptions} />
            </div>
            <ProductImageField value={formData.image} onChange={(v) => update("image", v)} />
            <ProductFormField label="প্রোডাক্টের বিবরণ" value={formData.description} onChange={(v) => update("description", v)} type="textarea" placeholder="প্রোডাক্ট সম্পর্কে বিস্তারিত লিখুন..." />
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700">
            <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => update("isActive", e.target.checked)} className="w-6 h-6 rounded-lg border-gray-300 dark:border-gray-700 text-green-600 focus:ring-green-500/20 cursor-pointer bg-white dark:bg-gray-900" />
            <label htmlFor="isActive" className="text-sm font-black text-gray-700 dark:text-gray-300 cursor-pointer select-none">প্রোডাক্টটি শপে সক্রিয় দেখাতে চান?</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductFormField label="ডিসকাউন্ট (%)" value={formData.discount || 0} onChange={(v) => update("discount", Number(v))} type="number" min={0} max={100} placeholder="যেমন: 10" />
            <ProductFormField label="ডিসকাউন্ট প্রাইস (৳)" value={formData.discountPrice || 0} onChange={(v) => update("discountPrice", Number(v))} type="number" min={0} placeholder="যেমন: ৮৯" />
            <ProductTagsField isDeal={!!formData.isDeal} isPopular={!!formData.isPopular} isNewArrival={!!formData.isNewArrival} onChange={(field, checked) => update(field as keyof AdminProductFormData, checked)} />
          </div>
          <div className="pt-6">
            <button type="submit" className="w-full bg-gradient-to-br from-green-500 to-green-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-green-100 dark:shadow-none hover:shadow-green-200 hover:scale-[1.01] transition-all duration-300">{editingProduct ? "পরিবর্তন সেভ করুন" : "প্রোডাক্ট যোগ করুন"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
