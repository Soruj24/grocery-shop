"use client";

import { AdminCombo, AdminComboFormData } from "@/types/admin";
import ComboModalHeader from "./ComboModalHeader";

interface ComboModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCombo: AdminCombo | null;
  formData: AdminComboFormData;
  setFormData: (data: AdminComboFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const inputClass =
  "w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-base font-bold text-gray-900 dark:text-white";

export default function ComboModal({
  isOpen,
  onClose,
  editingCombo,
  formData,
  setFormData,
  handleSubmit,
}: ComboModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 dark:border-gray-800 animate-in fade-in zoom-in duration-300 my-auto">
        <ComboModalHeader editingCombo={editingCombo} onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="কম্বোর নাম">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputClass}
                placeholder="যেমন: সাপ্তাহিক সবজি বাজার"
                required
              />
            </Field>

            <Field label="ট্যাগ (Tag)">
              <input
                type="text"
                value={formData.tag}
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
                className={inputClass}
                placeholder="যেমন: বেস্ট সেলার"
              />
            </Field>

            <Field label="মূল্য (Price)">
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className={inputClass}
                placeholder="0"
                required
              />
            </Field>

            <Field label="সাশ্রয় (Save Amount)">
              <input
                type="number"
                value={formData.saveAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    saveAmount: Number(e.target.value),
                  })
                }
                className={inputClass}
                placeholder="0"
                required
              />
            </Field>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                পণ্যসমূহ (কমা দিয়ে আলাদা করুন)
              </label>
              <textarea
                value={formData.items}
                onChange={(e) =>
                  setFormData({ ...formData, items: e.target.value })
                }
                className={`${inputClass} min-h-[120px]`}
                placeholder="যেমন: আলু ২কেজি, পেঁয়াজ ১কেজি, রসুন ২৫০ গ্রাম"
                required
              />
            </div>

            <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isActive: e.target.checked,
                      })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-7 rounded-full transition-colors duration-300 ${formData.isActive ? "bg-green-600" : "bg-gray-300 dark:bg-gray-700"}`}
                  />
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${formData.isActive ? "translate-x-7" : "translate-x-0"}`}
                  />
                </div>
                <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  অ্যাক্টিভ আছে
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-black rounded-3xl border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300 active:scale-95"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-[2] px-8 py-5 bg-green-600 text-white font-black rounded-3xl hover:bg-green-700 shadow-xl shadow-green-600/20 transition-all duration-300 active:scale-95"
            >
              {editingCombo ? "আপডেট করুন" : "সেভ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
        {label}
      </label>
      {children}
    </div>
  );
}
