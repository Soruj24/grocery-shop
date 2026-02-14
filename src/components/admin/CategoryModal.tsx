"use client";

import { X } from "lucide-react";
import { AdminCategory, AdminCategoryFormData } from "@/types/admin";

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
    <div className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] max-w-lg w-full p-10 shadow-2xl border dark:border-gray-800 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {editingCategory ? "ক্যাটাগরি এডিট" : "নতুন ক্যাটাগরি"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
              ক্যাটাগরি তথ্য পূরণ করুন
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors group"
          >
            <X className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
                ক্যাটাগরির নাম
              </label>
              <input
                type="text"
                required
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-gray-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 font-bold text-gray-900 dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-600"
                placeholder="যেমন: চাল, ডাল, শাকসবজি..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="group">
              <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
                প্যারেন্ট ক্যাটাগরি (ঐচ্ছিক)
              </label>
              <select
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-gray-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 font-bold text-gray-900 dark:text-white appearance-none"
                value={formData.parentId}
                onChange={(e) =>
                  setFormData({ ...formData, parentId: e.target.value })
                }
              >
                <option value="" className="dark:bg-gray-900">
                  কোনোটিই নয় (মেইন ক্যাটাগরি)
                </option>
                {mainCategories
                  .filter((cat) => cat._id !== editingCategory?._id)
                  .map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                      className="dark:bg-gray-900"
                    >
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
                ইমেজ ইউআরএল (ঐচ্ছিক)
              </label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-gray-900 focus:border-green-500 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-[1.5rem] group hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-300 border dark:border-gray-700">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="peer w-6 h-6 opacity-0 absolute cursor-pointer"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
                <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-lg peer-checked:bg-green-500 peer-checked:border-green-500 transition-all duration-300 flex items-center justify-center bg-white dark:bg-gray-900">
                  <div className="w-2 h-4 border-r-2 border-b-2 border-white rotate-45 mb-1 scale-0 peer-checked:scale-100 transition-transform duration-300" />
                </div>
              </div>
              <label
                htmlFor="isActive"
                className="text-sm font-black text-gray-700 dark:text-gray-300 cursor-pointer select-none"
              >
                শপে প্রদর্শন করুন
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-green-500 to-green-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-green-100 dark:shadow-none hover:shadow-green-200 hover:scale-[1.01] transition-all duration-300"
          >
            {editingCategory ? "পরিবর্তন সেভ করুন" : "ক্যাটাগরি যোগ করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
