"use client";

import { useState } from "react";
import CategoryModal from "@/features/admin/components/CategoryModal";
import type { AdminCategory, AdminCategoryFormData } from "@/types/admin";

interface Props {
  data: Record<string, unknown> | null;
  categories: AdminCategory[];
  onClose: () => void;
  onSave: (data: AdminCategoryFormData) => Promise<void>;
}

export default function CategoryModalWrapper({ data, categories, onClose, onSave }: Props) {
  const mainCategories = categories.filter((c) => !c.parentId);
  const [formData, setFormData] = useState<AdminCategoryFormData>({
    name: (data?.name as string) || "",
    parentId: typeof data?.parentId === "object" ? (data?.parentId as Record<string, string>)?._id || "" : (data?.parentId as string) || "",
    image: (data?.image as string) || "",
    isActive: data?.isActive !== false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <CategoryModal
      isOpen={true}
      onClose={onClose}
      editingCategory={data as AdminCategory | null}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      mainCategories={mainCategories}
    />
  );
}
