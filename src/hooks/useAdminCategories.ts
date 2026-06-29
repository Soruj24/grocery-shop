"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AdminCategory,
  AdminCategoryFormData,
} from "@/types/admin";
import { toast, confirmAlert, errorAlert } from "@/lib/utils/swal";

export function useAdminCategories() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [allCategoriesForSelect, setAllCategoriesForSelect] = useState<
    AdminCategory[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<AdminCategory | null>(null);
  const [formData, setFormData] = useState<AdminCategoryFormData>({
    name: "",
    isActive: true,
    parentId: "",
    image: "",
  });
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
      fetchCategories();
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
    isModalOpen,
    editingCategory,
    formData,
    setFormData,
    currentPage,
    totalPages,
    totalCategories,
    searchTerm,
    itemsPerPage,
    setCurrentPage,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
    onSearchChange,
  };
}
