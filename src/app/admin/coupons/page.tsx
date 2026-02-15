"use client";

import { useState, useEffect } from "react";
import { Plus, Tag, Calendar, CheckCircle, XCircle, Edit2, Trash2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTable from "@/components/admin/AdminTable";
import { AdminCoupon, AdminCouponFormData } from "@/types/admin";
import { toast } from "@/lib/swal";
import Modal from "@/components/ui/Modal";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);
  const [formData, setFormData] = useState<AdminCouponFormData>({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    expiryDate: "",
    usageLimit: 0,
    isActive: true,
  });

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCoupon ? `/api/admin/coupons/${editingCoupon._id}` : "/api/admin/coupons";
      const method = editingCoupon ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingCoupon ? "কুপন আপডেট করা হয়েছে" : "নতুন কুপন তৈরি করা হয়েছে");
        setIsModalOpen(false);
        setEditingCoupon(null);
        setFormData({
          code: "",
          discountType: "percentage",
          discountValue: 0,
          minOrderAmount: 0,
          maxDiscountAmount: 0,
          expiryDate: "",
          usageLimit: 0,
          isActive: true,
        });
        fetchCoupons();
      } else {
        const error = await res.json();
        toast.error(error.message || "কিছু ভুল হয়েছে");
      }
    } catch (error) {
      toast.error("সার্ভারে সমস্যা হয়েছে");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই কুপনটি ডিলিট করতে চান?")) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("কুপন ডিলিট করা হয়েছে");
        fetchCoupons();
      }
    } catch (error) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <AdminHeader
        title="কুপন ম্যানেজমেন্ট"
        count={coupons.length}
        countLabel="Coupons"
        onAddClick={() => {
          setEditingCoupon(null);
          setIsModalOpen(true);
        }}
        addLabel="নতুন কুপন"
      />

      <AdminTable
        columns={[
          { header: "কোড" },
          { header: "ডিসকাউন্ট" },
          { header: "মিনিমাম অর্ডার" },
          { header: "মেয়াদ শেষ" },
          { header: "স্ট্যাটাস" },
          { header: "অ্যাকশন", className: "text-right" },
        ]}
        loading={loading}
      >
        {coupons.map((coupon) => (
          <tr key={coupon._id} className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all">
            <td className="px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
                  <Tag size={16} />
                </div>
                <span className="font-black text-gray-900 dark:text-white uppercase tracking-widest">{coupon.code}</span>
              </div>
            </td>
            <td className="px-8 py-6">
              <span className="font-bold text-gray-900 dark:text-white">
                {coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : ' ৳'}
              </span>
            </td>
            <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-bold">
              ৳ {coupon.minOrderAmount}
            </td>
            <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-bold">
              {new Date(coupon.expiryDate).toLocaleDateString('bn-BD')}
            </td>
            <td className="px-8 py-6">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-wider ${
                coupon.isActive ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
              }`}>
                {coupon.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {coupon.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
              </div>
            </td>
            <td className="px-8 py-6 text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingCoupon(coupon);
                    setFormData({
                      code: coupon.code,
                      discountType: coupon.discountType,
                      discountValue: coupon.discountValue,
                      minOrderAmount: coupon.minOrderAmount,
                      maxDiscountAmount: coupon.maxDiscountAmount || 0,
                      expiryDate: coupon.expiryDate.split('T')[0],
                      usageLimit: coupon.usageLimit || 0,
                      isActive: coupon.isActive,
                    });
                    setIsModalOpen(true);
                  }}
                  className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-xl transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCoupon ? "কুপন এডিট করুন" : "নতুন কুপন যোগ করুন"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">কুপন কোড</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold uppercase"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডিসকাউন্ট টাইপ</label>
              <select
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
              >
                <option value="percentage">শতাংশ (%)</option>
                <option value="fixed">স্থায়ী (৳)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডিসকাউন্ট পরিমাণ</label>
              <input
                type="number"
                required
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">মিনিমাম অর্ডার</label>
              <input
                type="number"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">মেয়াদ শেষ</label>
              <input
                type="date"
                required
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">ব্যবহারের সীমা</label>
              <input
                type="number"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
          >
            {editingCoupon ? "আপডেট করুন" : "কুপন তৈরি করুন"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
