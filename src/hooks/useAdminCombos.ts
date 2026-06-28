"use client";

import { useState, useEffect } from "react";
import { AdminCombo, AdminComboFormData } from "@/types/admin";
import { toast } from "react-hot-toast";

const initialFormData: AdminComboFormData = {
  name: "",
  items: "",
  price: 0,
  saveAmount: 0,
  tag: "নতুন",
  isActive: true,
};

export function useAdminCombos() {
  const [combos, setCombos] = useState<AdminCombo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<AdminCombo | null>(null);
  const [formData, setFormData] = useState<AdminComboFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCombos();
  }, []);

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

  const openAddModal = () => {
    setEditingCombo(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (combo: AdminCombo) => {
    setEditingCombo(combo);
    setFormData({
      name: combo.name,
      items: combo.items.join(", "),
      price: combo.price,
      saveAmount: combo.saveAmount,
      tag: combo.tag,
      isActive: combo.isActive,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        items: formData.items
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i !== ""),
      };
      const url = editingCombo
        ? `/api/admin/combos/${editingCombo._id}`
        : "/api/admin/combos";
      const method = editingCombo ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save combo");
      toast.success(
        editingCombo ? "কম্বো আপডেট করা হয়েছে" : "নতুন কম্বো যোগ করা হয়েছে",
      );
      setIsModalOpen(false);
      setEditingCombo(null);
      setFormData(initialFormData);
      fetchCombos();
    } catch (error) {
      toast.error("সেভ করতে সমস্যা হয়েছে");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই কম্বোটি ডিলিট করতে চান?")) return;
    try {
      const res = await fetch(`/api/admin/combos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete combo");
      toast.success("কম্বো ডিলিট করা হয়েছে");
      fetchCombos();
    } catch (error) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে");
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
    isModalOpen,
    editingCombo,
    formData,
    setFormData,
    isSubmitting,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
    fetchCombos,
  };
}
