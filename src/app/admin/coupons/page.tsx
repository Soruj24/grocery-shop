"use client";

import { useState } from "react";
import { AdminCoupon } from "@/types/admin";
import { useAdminCoupons } from "@/hooks/useAdminCoupons";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTable from "@/components/admin/AdminTable";
import CouponTableRow from "@/components/admin/coupons/CouponTableRow";
import CouponFormModal from "@/components/admin/coupons/CouponFormModal";

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
