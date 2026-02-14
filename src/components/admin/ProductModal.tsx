"use client";

import { X, Package, Image as ImageIcon } from "lucide-react";
import {
  AdminProduct,
  AdminCategory,
  GroupedCategory,
  AdminProductFormData,
} from "@/types/admin";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: AdminProduct | null;
  formData: AdminProductFormData;
  setFormData: (data: AdminProductFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  groupedCategories: Record<string, GroupedCategory>;
}

export default function ProductModal({
  isOpen,
  onClose,
  editingProduct,
  formData,
  setFormData,
  handleSubmit,
  groupedCategories,
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 dark:border-gray-800 animate-in fade-in zoom-in duration-300 my-auto">
        <div className="p-10 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/30 rounded-t-[3rem]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-500 shadow-sm border border-gray-100 dark:border-gray-700">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {editingProduct
                  ? "প্রোডাক্ট এডিট করুন"
                  : "নতুন প্রোডাক্ট যোগ করুন"}
              </h3>
              <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-500 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                প্রোডাক্টের নাম
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600"
                placeholder="যেমন: চিনি (১ কেজি)"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                ক্যাটাগরি
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-base font-bold appearance-none cursor-pointer text-gray-900 dark:text-white"
                required
              >
                <option value="" className="text-gray-400 dark:text-gray-600">
                  ক্যাটাগরি সিলেক্ট করুন
                </option>
                {Object.values(groupedCategories).map((parent) => (
                  <optgroup
                    key={parent._id}
                    label={parent.name}
                    className="font-black text-gray-500 dark:text-gray-400"
                  >
                    <option value={parent._id} className="dark:bg-gray-900">
                      {parent.name} (Main)
                    </option>
                    {parent.subCategories?.map((sub: AdminCategory) => (
                      <option
                        key={sub._id}
                        value={sub._id}
                        className="text-gray-900 dark:text-white font-bold dark:bg-gray-900"
                      >
                        {sub.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                মূল্য (৳)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number(e.target.value),
                  })
                }
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600"
                placeholder="যেমন: ১০০"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                স্টক (পরিমাণ)
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: Number(e.target.value),
                  })
                }
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600"
                placeholder="যেমন: ৫০"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                প্রোডাক্ট ইমেজ প্রিভিউ
              </label>
              <div className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 group">
                <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center relative shadow-sm">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-200 dark:text-gray-700" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 transition-all duration-300 text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600"
                    placeholder="ইমেজ URL দিন (যেমন: https://...)"
                  />
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-600 uppercase tracking-widest px-1">
                    সরাসরি ইমেজের লিংক এখানে পেস্ট করুন
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                প্রোডাক্টের বিবরণ
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 min-h-[120px] resize-none"
                placeholder="প্রোডাক্ট সম্পর্কে বিস্তারিত লিখুন..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-6 h-6 rounded-lg border-gray-300 dark:border-gray-700 text-green-600 focus:ring-green-500/20 cursor-pointer bg-white dark:bg-gray-900"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-black text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              প্রোডাক্টটি শপে সক্রিয় দেখাতে চান?
            </label>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-green-500 to-green-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-green-100 dark:shadow-none hover:shadow-green-200 hover:scale-[1.01] transition-all duration-300"
            >
              {editingProduct ? "পরিবর্তন সেভ করুন" : "প্রোডাক্ট যোগ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
