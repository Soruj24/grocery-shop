"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminCategory } from "@/types/admin";
import { toast, confirmAlert, errorAlert } from "@/utils/swal";
import { useAdminCategoryForm } from "./useAdminCategoryForm";

export function useAdminCategories() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [allCategoriesForSelect, setAllCategoriesForSelect] = useState<
    AdminCategory[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const fetchCategories = useCallback(async () => {
    const res = await fetch(
      `/api/admin/categories?pagination=true&page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`,
    );
    const data = await res.json();
    setCategories(data.categories);
    setTotalPages(data.pages);
    setTotalCategories(data.total);
  }, [currentPage, searchTerm]);

  const form = useAdminCategoryForm(fetchCategories);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [catRes, allCatRes] = await Promise.all([
          fetch(
            `/api/admin/categories?pagination=true&page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`,
          ),
          fetch("/api/admin/categories"),
        ]);
        const catData = await catRes.json();
        const allCatData = await allCatRes.json();
        if (isMounted) {
          setCategories(catData.categories);
          setTotalPages(catData.pages);
          setTotalCategories(catData.total);
          setAllCategoriesForSelect(allCatData);
        }
      } catch (error) {
        console.error("Error loading categories data:", error);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [currentPage, searchTerm]);

  const handleDelete = async (id: string) => {
    const result = await confirmAlert({
      title: "আপনি কি নিশ্চিত?",
      text: "এই ক্যাটাগরিটি ডিলিট করলে এর অধীনে থাকা সাব-ক্যাটাগরিগুলোতে সমস্যা হতে পারে।",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, থাক",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchCategories();
          toast.fire({
            icon: "success",
            title: "ক্যাটাগরিটি ডিলিট করা হয়েছে",
          });
        } else {
          errorAlert("ভুল হয়েছে!", "ক্যাটাগরিটি ডিলিট করা সম্ভব হয়নি।");
        }
      } catch {
        errorAlert("ভুল হয়েছে!", "সার্ভারে সমস্যা হয়েছে।");
      }
    }
  };

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const mainCategories = allCategoriesForSelect.filter((cat) => !cat.parentId);

  return {
    categories,
    allCategoriesForSelect,
    mainCategories,
    currentPage,
    totalPages,
    totalCategories,
    searchTerm,
    itemsPerPage,
    setCurrentPage,
    onSearchChange,
    handleDelete,
    ...form,
  };
}
