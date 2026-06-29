"use client";

import { useState, useEffect } from "react";
import { AdminCombo } from "@/types/admin";
import { toast, confirmAlert, errorAlert } from "@/utils/swal";
import { useAdminComboForm } from "./useAdminComboForm";

export function useAdminCombos() {
  const [combos, setCombos] = useState<AdminCombo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCombos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/combos");
      if (!res.ok) throw new Error("Failed to fetch combos");
      const data = await res.json();
      setCombos(data);
    } catch (error) {
      toast.error("কম্বো লিস্ট লোড করতে সমস্যা হয়েছে");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const form = useAdminComboForm(fetchCombos);

  const handleDelete = async (id: string) => {
    const result = await confirmAlert({
      title: "আপনি কি নিশ্চিত?",
      text: "এই কম্বোটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, থাক",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await fetch(`/api/admin/combos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete combo");
      toast.fire({ icon: "success", title: "কম্বো ডিলিট করা হয়েছে" });
      fetchCombos();
    } catch (error) {
      errorAlert("ভুল হয়েছে!", "কম্বো ডিলিট করা সম্ভব হয়নি।");
      console.error(error);
    }
  };

  const filteredCombos = combos.filter((combo) =>
    combo.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    combos,
    filteredCombos,
    loading,
    searchTerm,
    setSearchTerm,
    fetchCombos,
    handleDelete,
    ...form,
  };
}
