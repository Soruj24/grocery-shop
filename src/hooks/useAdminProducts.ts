"use client";

import { useState, useEffect, useMemo } from "react";
import { AdminProduct, AdminCategory, AdminProductFormData } from "@/types/admin";
import { groupCategories } from "@/lib/utils/category-utils";
import { toast, confirmAlert, errorAlert } from "@/lib/utils/swal";

interface SortConfig {
  key: keyof AdminProduct | "category";
  direction: "asc" | "desc";
}

export function useAdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/categories"),
        ]);
        const [prodData, catData] = await Promise.all([prodRes.json(), catRes.json()]);
        if (isMounted) {
          setProducts(prodData);
          setCategories(catData);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p._id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory !== "all") {
      result = result.filter((p) => {
        const catId = typeof p.category === "string" ? p.category : p.category?._id;
        return catId === selectedCategory;
      });
    }
    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";
      if (sortConfig.key === "category") {
        aValue = typeof a.category === "string" ? a.category : a.category?.name || "";
        bValue = typeof b.category === "string" ? b.category : b.category?.name || "";
      } else {
        const valA = a[sortConfig.key as keyof AdminProduct];
        const valB = b[sortConfig.key as keyof AdminProduct];
        if (typeof valA === "number") aValue = valA;
        else if (typeof valA === "boolean") aValue = valA ? 1 : 0;
        else if (typeof valA === "string") aValue = valA.toLowerCase();
        else aValue = valA ? JSON.stringify(valA) : "";
        if (typeof valB === "number") bValue = valB;
        else if (typeof valB === "boolean") bValue = valB ? 1 : 0;
        else if (typeof valB === "string") bValue = valB.toLowerCase();
        else bValue = valB ? JSON.stringify(valB) : "";
      }
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [products, searchTerm, selectedCategory, sortConfig]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSubmit = async (formData: AdminProductFormData, editingProduct: AdminProduct | null) => {
    const url = editingProduct ? `/api/admin/products/${editingProduct._id}` : "/api/admin/products";
    const method = editingProduct ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const [prodRes] = await Promise.all([
        fetch("/api/admin/products"),
      ]);
      setProducts(await prodRes.json());
      toast.fire({
        icon: "success",
        title: editingProduct ? "প্রোডাক্ট আপডেট করা হয়েছে" : "নতুন প্রোডাক্ট যোগ করা হয়েছে",
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
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        const [prodRes] = await Promise.all([fetch("/api/admin/products")]);
        setProducts(await prodRes.json());
        toast.fire({ icon: "success", title: "প্রোডাক্টটি ডিলিট করা হয়েছে" });
      } else {
        errorAlert("ভুল হয়েছে!", "প্রোডাক্টটি ডিলিট করা সম্ভব হয়নি।");
      }
    } catch {
      errorAlert("ভুল হয়েছে!", "সার্ভারে সমস্যা হয়েছে।");
    }
  };

  return {
    filteredProducts,
    paginatedProducts,
    groupedCategories: groupCategories(categories),
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    currentPage, setCurrentPage,
    totalPages, itemsPerPage,
    handleSubmit, handleDelete,
  };
}
