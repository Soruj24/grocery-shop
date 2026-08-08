"use client";

import { AdminCombo, AdminComboFormData } from "@/types/admin";
import ComboModalHeader from "./ComboModalHeader";
import { cn } from "@/utils/utils";

interface ComboModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCombo: AdminCombo | null;
  formData: AdminComboFormData;
  setFormData: (data: AdminComboFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const inputClass =
  "w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring focus:bg-card transition-all text-sm text-foreground placeholder:text-muted-foreground";

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-card w-full max-w-2xl rounded-xl shadow-xl border border-border animate-in fade-in zoom-in duration-300 my-auto">
        <ComboModalHeader editingCombo={editingCombo} onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="কম্বোর নাম">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                placeholder="যেমন: সাপ্তাহিক সবজি বাজার"
                required
              />
            </Field>

            <Field label="ট্যাগ (Tag)">
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className={inputClass}
                placeholder="যেমন: বেস্ট সেলার"
              />
            </Field>

            <Field label="মূল্য (Price)">
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className={inputClass}
                placeholder="0"
                required
              />
            </Field>

            <Field label="সাশ্রয় (Save Amount)">
              <input
                type="number"
                value={formData.saveAmount}
                onChange={(e) => setFormData({ ...formData, saveAmount: Number(e.target.value) })}
                className={inputClass}
                placeholder="0"
                required
              />
            </Field>

            <div className="col-span-1 md:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                পণ্যসমূহ (কমা দিয়ে আলাদা করুন)
              </label>
              <textarea
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                className={`${inputClass} min-h-[100px] resize-none`}
                placeholder="যেমন: আলু ২কেজি, পেঁয়াজ ১কেজি, রসুন ২৫০ গ্রাম"
                required
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
              />
              <span className="text-sm font-medium text-foreground">
                অ্যাক্টিভ আছে
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-muted text-muted-foreground font-medium rounded-lg border border-border hover:bg-muted/80 hover:text-foreground transition-colors active:scale-[0.98]"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className={cn(
                "flex-[2] px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg",
                "hover:bg-primary/90 transition-all active:scale-[0.98]",
              )}
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
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
