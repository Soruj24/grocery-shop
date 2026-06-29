"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminCoupon, AdminCouponFormData } from "@/types/admin";
import { toast, confirmAlert, errorAlert } from "@/utils/swal";

export function useAdminCoupons() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      setCoupons(await res.json());
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const handleSubmit = async (formData: AdminCouponFormData, editingCoupon: AdminCoupon | null): Promise<boolean> => {
    try {
      const url = editingCoupon ? `/api/admin/coupons/${editingCoupon._id}` : "/api/admin/coupons";
      const res = await fetch(url, {
        method: editingCoupon ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(editingCoupon ? "কুপন আপডেট করা হয়েছে" : "নতুন কুপন তৈরি করা হয়েছে");
        fetchCoupons();
        return true;
      }
      const error = await res.json();
      toast.error(error.message || "কিছু ভুল হয়েছে");
    } catch {
      toast.error("সার্ভারে সমস্যা হয়েছে");
    }
    return false;
  };

  const handleDelete = async (id: string) => {
    const result = await confirmAlert({
      title: "আপনি কি নিশ্চিত?",
      text: "এই কুপনটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, থাক",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("কুপন ডিলিট করা হয়েছে");
        fetchCoupons();
      }
    } catch {
      toast.error("ডিলিট করতে সমস্যা হয়েছে");
    }
  };

  return { coupons, loading, fetchCoupons, handleSubmit, handleDelete };
}
