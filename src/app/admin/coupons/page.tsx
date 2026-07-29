"use client";

import { useState } from "react";
import { useGetAdminCouponsQuery, useCreateAdminCouponMutation, useUpdateAdminCouponMutation, useDeleteAdminCouponMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import CouponFormModal from "@/features/admin/coupons/components/CouponFormModal";
import { Plus, Tag, Trash2 } from "lucide-react";

export default function AdminCouponsPage() {
  const { data, isLoading } = useGetAdminCouponsQuery();
  const [create] = useCreateAdminCouponMutation();
  const [update] = useUpdateAdminCouponMutation();
  const [del] = useDeleteAdminCouponMutation();
  const [modal, setModal] = useState<{ open: boolean; data?: any }>({ open: false });
  const coupons = data?.data || [];

  const columns = [
    { key: "code", label: "Code", render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center"><Tag className="h-4 w-4 text-emerald-500" /></div>
        <span className="text-sm font-mono font-bold text-gray-900">{item.code}</span>
      </div>
    )},
    { key: "discountValue", label: "Discount", render: (item: any) => (
      <span className="text-sm font-semibold">{item.discountType === "percentage" ? `${item.discountValue}%` : `৳${item.discountValue}`}</span>
    )},
    { key: "minOrderAmount", label: "Min Order", render: (item: any) => <span className="text-xs text-gray-500">৳{Number(item.minOrderAmount).toLocaleString()}</span> },
    { key: "expiryDate", label: "Expires", render: (item: any) => <span className="text-xs text-gray-500">{new Date(item.expiryDate).toLocaleDateString()}</span> },
    { key: "usedCount", label: "Used", render: (item: any) => <span className="text-sm font-semibold">{String(item.usedCount || 0)}/{item.usageLimit || "∞"}</span> },
    { key: "isActive", label: "Status", render: (item: any) => (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</span>
    )},
    { key: "actions", label: "", render: (_: any, i: number) => (
      <div className="flex items-center gap-1">
        <button onClick={() => setModal({ open: true, data: coupons[i] })} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
        <button onClick={() => { if (confirm("Delete coupon?")) del(coupons[i]._id); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Coupons" description="Manage discount coupons"
        actions={<button onClick={() => setModal({ open: true })} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"><Plus className="h-4 w-4" /> Add Coupon</button>}
      />
      <DataTable columns={columns} data={coupons} searchable searchKeys={["code"]} searchPlaceholder="Search coupons..." loading={isLoading} />
      {modal.open && (
        <CouponFormModal
          isOpen={true}
          onClose={() => setModal({ open: false })}
          editingCoupon={modal.data || null}
          onSave={async (formData, editing) => {
            try {
              if (editing?._id) await update({ id: editing._id, body: formData }).unwrap();
              else await create(formData).unwrap();
              setModal({ open: false });
              return true;
            } catch { return false; }
          }}
        />
      )}
    </div>
  );
}
