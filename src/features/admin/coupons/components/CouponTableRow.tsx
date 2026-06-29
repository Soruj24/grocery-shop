"use client";

import { Tag, CheckCircle, XCircle, Edit2, Trash2 } from "lucide-react";
import { AdminCoupon } from "@/types/admin";

interface CouponTableRowProps {
  coupon: AdminCoupon;
  onEdit: (coupon: AdminCoupon) => void;
  onDelete: (id: string) => void;
}

export default function CouponTableRow({ coupon, onEdit, onDelete }: CouponTableRowProps) {
  return (
    <tr className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all">
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600"><Tag size={16} /></div>
          <span className="font-black text-gray-900 dark:text-white uppercase tracking-widest">{coupon.code}</span>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="font-bold text-gray-900 dark:text-white">{coupon.discountValue}{coupon.discountType === "percentage" ? "%" : " ৳"}</span>
      </td>
      <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-bold">৳ {coupon.minOrderAmount}</td>
      <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-bold">{new Date(coupon.expiryDate).toLocaleDateString("bn-BD")}</td>
      <td className="px-8 py-6">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-wider ${coupon.isActive ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
          {coupon.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {coupon.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
        </div>
      </td>
      <td className="px-8 py-6 text-right">
        <div className="flex justify-end gap-2">
          <button onClick={() => onEdit(coupon)} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-xl transition-all"><Edit2 size={18} /></button>
          <button onClick={() => onDelete(coupon._id)} className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 rounded-xl transition-all"><Trash2 size={18} /></button>
        </div>
      </td>
    </tr>
  );
}
