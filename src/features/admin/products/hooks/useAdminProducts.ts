"use client";

import { useState, useEffect } from "react";
import { AdminProduct, AdminCategory, AdminProductFormData } from "@/types/admin";
import { groupCategories } from "@/utils/group-categories";
import { toast, confirmAlert, errorAlert } from "@/utils/swal";
import { useAdminProductFilters } from "./useAdminProductFilters";

export function useAdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  const filters = useAdminProductFilters(products);

  const refreshProducts = async () => {
    const [prodRes, catRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
    ]);
    const [prodData, catData] = await Promise.all([
      prodRes.json(),
      catRes.json(),
    ]);
    setProducts(prodData);
    setCategories(catData);
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/categories"),
        ]);
        const [prodData, catData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
        ]);
        if (isMounted) {
          setProducts(prodData);
          setCategories(catData);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (
    formData: AdminProductFormData,
    editingProduct: AdminProduct | null,
  ) => {
    const url = editingProduct
      ? `/api/admin/products/${editingProduct._id}`
      : "/api/admin/products";
    const method = editingProduct ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      await refreshProducts();
      toast.fire({
        icon: "success",
        title: editingProduct
          ? "প্রোডাক্ট আপডেট করা হয়েছে"
          : "নতুন প্রোডাক্ট যোগ করা হয়েছে",
      });
      return true;
    }
    errorAlert("দুঃখিত!", "প্রোডাক্ট সেভ করতে সমস্যা হয়েছে।");
    return false;
  };

  const handleDelete = async (id: string) => {
    const result = await confirmAlert({
      title: "আপনি কি নিশ্চিত?",
      text: "এই প্রোডাক্টটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, থাক",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await refreshProducts();
        toast.fire({
          icon: "success",
          title: "প্রোডাক্টটি ডিলিট করা হয়েছে",
        });
      } else {
        errorAlert("ভুল হয়েছে!", "প্রোডাক্টটি ডিলিট করা সম্ভব হয়নি।");
      }
    } catch {
      errorAlert("ভুল হয়েছে!", "সার্ভারে সমস্যা হয়েছে۔");
    }
  };

  return {
    ...filters,
    groupedCategories: groupCategories(categories),
    handleSubmit,
    handleDelete,
  };
}
