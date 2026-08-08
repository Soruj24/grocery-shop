"use client";

import { AdminCombo, AdminComboFormData } from "@/types/admin";
import { Modal } from "@/components/ui/system/Modal";
import { ADMIN_INPUT_CLASSES } from "./ProductFormField";

interface ComboModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCombo: AdminCombo | null;
  formData: AdminComboFormData;
  setFormData: (data: AdminComboFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
}

function Field({ label, id, children }: { label: string; id?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

export default function ComboModal({ isOpen, onClose, editingCombo, formData, setFormData, handleSubmit, loading }: ComboModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCombo ? "কম্বো এডিট করুন" : "নতুন কম্বো যোগ করুন"}
      description="সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="কম্বোর নাম" id="combo-name">
            <input id="combo-name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={ADMIN_INPUT_CLASSES} placeholder="যেমন: সাপ্তাহিক সবজি বাজার" required />
          </Field>
          <Field label="ট্যাগ (Tag)" id="combo-tag">
            <input id="combo-tag" type="text" value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} className={ADMIN_INPUT_CLASSES} placeholder="যেমন: বেস্ট সেলার" />
          </Field>
          <Field label="মূল্য (Price)" id="combo-price">
            <input id="combo-price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className={ADMIN_INPUT_CLASSES} placeholder="0" required />
          </Field>
          <Field label="সাশ্রয় (Save Amount)" id="combo-save">
            <input id="combo-save" type="number" value={formData.saveAmount} onChange={(e) => setFormData({ ...formData, saveAmount: Number(e.target.value) })} className={ADMIN_INPUT_CLASSES} placeholder="0" required />
          </Field>
          <div className="col-span-1 md:col-span-2 space-y-1.5">
            <label htmlFor="combo-items" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">পণ্যসমূহ (কমা দিয়ে আলাদা করুন)</label>
            <textarea id="combo-items" value={formData.items} onChange={(e) => setFormData({ ...formData, items: e.target.value })} className={`${ADMIN_INPUT_CLASSES} min-h-[100px] resize-none`} placeholder="যেমন: আলু ২কেজি, পেঁয়াজ ১কেজি, রসুন ২৫০ গ্রাম" required />
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
            <input type="checkbox" id="combo-active" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 rounded border-border text-primary focus:ring-ring" />
            <label htmlFor="combo-active" className="text-sm font-medium text-foreground cursor-pointer select-none">অ্যাক্টিভ আছে</label>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 hover:text-foreground transition-colors">বাতিল</button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
            {loading ? <span className="flex items-center gap-2"><span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> সেভ হচ্ছে...</span> : editingCombo ? "আপডেট করুন" : "সেভ করুন"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
