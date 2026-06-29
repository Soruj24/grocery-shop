"use client";

import { useState, useEffect } from "react";
import { AdminCoupon, AdminCouponFormData } from "@/types/admin";
import Modal from "@/components/ui/Modal";

interface CouponFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCoupon: AdminCoupon | null;
  onSave: (formData: AdminCouponFormData, editingCoupon: AdminCoupon | null) => Promise<boolean>;
}

const emptyForm: AdminCouponFormData = {
  code: "", discountType: "percentage", discountValue: 0, minOrderAmount: 0,
  maxDiscountAmount: 0, expiryDate: "", usageLimit: 0, isActive: true,
};

const inputClass = "w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold";

export default function CouponFormModal({ isOpen, onClose, editingCoupon, onSave }: CouponFormModalProps) {
  const [formData, setFormData] = useState<AdminCouponFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingCoupon) {
      setFormData({
        code: editingCoupon.code, discountType: editingCoupon.discountType,
        discountValue: editingCoupon.discountValue, minOrderAmount: editingCoupon.minOrderAmount,
        maxDiscountAmount: editingCoupon.maxDiscountAmount || 0,
        expiryDate: editingCoupon.expiryDate.split("T")[0],
        usageLimit: editingCoupon.usageLimit || 0, isActive: editingCoupon.isActive,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingCoupon, isOpen]);

  const update = (field: keyof AdminCouponFormData, value: unknown) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const ok = await onSave(formData, editingCoupon);
    setSaving(false);
    if (ok) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingCoupon ? "কুপন এডিট করুন" : "নতুন কুপন যোগ করুন"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">কুপন কোড</label>
            <input type="text" required className={inputClass} value={formData.code} onChange={(e) => update("code", e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডিসকাউন্ট টাইপ</label>
            <select className={inputClass} value={formData.discountType} onChange={(e) => update("discountType", e.target.value)}>
              <option value="percentage">শতাংশ (%)</option>
              <option value="fixed">স্থায়ী (৳)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডিসকাউন্ট পরিমাণ</label>
            <input type="number" required className={inputClass} value={formData.discountValue} onChange={(e) => update("discountValue", Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">মিনিমাম অর্ডার</label>
            <input type="number" className={inputClass} value={formData.minOrderAmount} onChange={(e) => update("minOrderAmount", Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">মেয়াদ শেষ</label>
            <input type="date" required className={inputClass} value={formData.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">ব্যবহারের সীমা</label>
            <input type="number" className={inputClass} value={formData.usageLimit} onChange={(e) => update("usageLimit", Number(e.target.value))} />
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-70">
          {saving ? "সেভ হচ্ছে..." : editingCoupon ? "আপডেট করুন" : "কুপন তৈরি করুন"}
        </button>
      </form>
    </Modal>
  );
}
