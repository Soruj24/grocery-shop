"use client";

import { useState } from "react";
import { AdminCoupon } from "@/types/admin";
import { useAdminCoupons } from "@/features/admin/coupons/hooks/useAdminCoupons";
import AdminHeader from "@/features/admin/components/AdminHeader";
import AdminTable from "@/features/admin/components/AdminTable";
import CouponTableRow from "@/features/admin/coupons/components/CouponTableRow";
import CouponFormModal from "@/features/admin/coupons/components/CouponFormModal";

export default function CouponsPage() {
  const { coupons, loading, handleSubmit, handleDelete } = useAdminCoupons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <AdminHeader title="কুপন ম্যানেজমেন্ট" count={coupons.length} countLabel="Coupons"
        onAddClick={() => { setEditingCoupon(null); setIsModalOpen(true); }} addLabel="নতুন কুপন" />

      <AdminTable columns={[
        { header: "কোড" }, { header: "ডিসকাউন্ট" }, { header: "মিনিমাম অর্ডার" },
        { header: "মেয়াদ শেষ" }, { header: "স্ট্যাটাস" }, { header: "অ্যাকশন", className: "text-right" },
      ]} loading={loading}>
        {coupons.map((coupon) => (
          <CouponTableRow key={coupon._id} coupon={coupon}
            onEdit={(c) => { setEditingCoupon(c); setIsModalOpen(true); }}
            onDelete={handleDelete} />
        ))}
      </AdminTable>

      <CouponFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        editingCoupon={editingCoupon} onSave={handleSubmit} />
    </div>
  );
}
