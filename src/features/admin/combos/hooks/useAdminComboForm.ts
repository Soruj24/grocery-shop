"use client";

import { useState } from "react";
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

interface UseAdminComboFormResult {
  isModalOpen: boolean;
  editingCombo: AdminCombo | null;
  formData: AdminComboFormData;
  setFormData: React.Dispatch<React.SetStateAction<AdminComboFormData>>;
  isSubmitting: boolean;
  openAddModal: () => void;
  openEditModal: (combo: AdminCombo) => void;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useAdminComboForm(
  onSuccess: () => void,
): UseAdminComboFormResult {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<AdminCombo | null>(null);
  const [formData, setFormData] = useState<AdminComboFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      onSuccess();
    } catch (error) {
      toast.error("সেভ করতে সমস্যা হয়েছে");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isModalOpen,
    editingCombo,
    formData,
    setFormData,
    isSubmitting,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
  };
}
