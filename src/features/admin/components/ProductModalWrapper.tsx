"use client";

import { useState, useMemo } from "react";
import ProductForm from "@/features/admin/components/ProductForm";
import { Modal } from "@/components/ui/system/Modal";
import type { AdminCategory, AdminProduct, GroupedCategory, AdminProductFormData } from "@/types/admin";

interface Props {
  data: Record<string, unknown> | AdminProduct | null;
  categories: AdminCategory[];
  onClose: () => void;
  onSave: (data: AdminProductFormData) => Promise<void>;
}

export default function ProductModalWrapper({ data, categories, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<AdminProductFormData>({
    name: (data?.name as string) || "",
    price: (data?.price as number) || 0,
    stock: (data?.stock as number) || 0,
    unit: (data?.unit as string) || "pcs",
    category: typeof data?.category === "object" ? (data?.category as Record<string, string>)?._id || "" : (data?.category as string) || "",
    image: (data?.image as string) || "",
    description: (data?.description as string) || "",
    isActive: data?.isActive !== false,
    discount: (data?.discount as number) || 0,
    discountPrice: (data?.discountPrice as number) || 0,
    isDeal: !!data?.isDeal,
    isPopular: !!data?.isPopular,
    isNewArrival: !!data?.isNewArrival,
  });

  const groupedCategories = useMemo(() => {
    const grouped: Record<string, GroupedCategory> = {};
    for (const cat of categories) {
      if (!cat.parentId || typeof cat.parentId === "string") {
        if (!grouped[cat._id]) grouped[cat._id] = { _id: cat._id, name: cat.name, subCategories: [] };
      } else {
        const parent = cat.parentId as { _id: string; name: string };
        if (!grouped[parent._id]) grouped[parent._id] = { _id: parent._id, name: parent.name, subCategories: [] };
        grouped[parent._id].subCategories?.push(cat);
      }
    }
    return grouped;
  }, [categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={data ? "Edit Product" : "Add New Product"}
      description="Fill in the details below to manage your product"
      size="xl"
      showClose={false}
    >
      <ProductForm
        editingProduct={data as AdminProduct | null}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        groupedCategories={groupedCategories}
        onClose={onClose}
      />
    </Modal>
  );
}
