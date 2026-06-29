"use client";

import { useState } from "react";
import { AdminCategory, AdminCategoryFormData } from "@/types/admin";
import { toast, errorAlert } from "@/utils/swal";

interface CategoryFormOptions {
  editingCategory: AdminCategory | null;
  isModalOpen: boolean;
  formData: AdminCategoryFormData;
  openAddModal: () => void;
  openEditModal: (cat: AdminCategory) => void;
  closeModal: () => void;
  setFormData: React.Dispatch<React.SetStateAction<AdminCategoryFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useAdminCategoryForm(
  onSuccess: () => void,
): CategoryFormOptions {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [formData, setFormData] = useState<AdminCategoryFormData>({
    name: "",
    isActive: true,
    parentId: "",
    image: "",
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", isActive: true, parentId: "", image: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      isActive: cat.isActive ?? true,
      parentId:
        typeof cat.parentId === "string"
          ? cat.parentId
          : typeof cat.parentId === "object"
            ? cat.parentId?._id || ""
            : "",
      image: cat.image || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingCategory
      ? `/api/admin/categories/${editingCategory._id}`
      : "/api/admin/categories";
    const method = editingCategory ? "PUT" : "POST";
    const submissionData = {
      ...formData,
      parentId: formData.parentId === "" ? null : formData.parentId,
    };
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });
    if (res.ok) {
      setIsModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: "", isActive: true, parentId: "", image: "" });
      onSuccess();
      toast.fire({
        icon: "success",
        title: editingCategory
          ? "ক্যাটাগরি আপডেট করা হয়েছে"
          : "নতুন ক্যাটাগরি যোগ করা হয়েছে",
      });
    } else {
      errorAlert("দুঃখিত!", "ক্যাটাগরি সেভ করতে সমস্যা হয়েছে।");
    }
  };

  return {
    editingCategory,
    isModalOpen,
    formData,
    openAddModal,
    openEditModal,
    closeModal,
    setFormData,
    handleSubmit,
  };
}
