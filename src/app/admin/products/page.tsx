"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Edit2,
  Trash2,
  Package,
  ArrowUpDown,
} from "lucide-react";
import { toast, confirmAlert, errorAlert } from "@/lib/swal";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductModal from "@/components/admin/ProductModal";
import Pagination from "@/components/admin/Pagination";
import AdminTable from "@/components/admin/AdminTable";
import ProductFilters from "@/components/admin/products/ProductFilters";
import ProductTableRow from "@/components/admin/products/ProductTableRow";
import { groupCategories } from "@/lib/category-utils";
import { AdminProduct, AdminCategory, GroupedCategory, AdminProductFormData } from "@/types/admin";

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<AdminProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
    description: "",
    isActive: true,
  });

  // Search, Filter, Sort, Pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AdminProduct | "category";
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  }, []);

  const fetchCategories = useCallback(async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/categories"),
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        if (isMounted) {
          setProducts(prodData);
          setCategories(catData);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p._id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => {
        const catId =
          typeof p.category === "string" ? p.category : p.category?._id;
        return catId === selectedCategory;
      });
    }

    // Sort
    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      if (sortConfig.key === "category") {
        aValue =
          typeof a.category === "string" ? a.category : a.category?.name || "";
        bValue =
          typeof b.category === "string" ? b.category : b.category?.name || "";
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (key: keyof AdminProduct | "category") => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        category: "",
        image: "",
        description: "",
        isActive: true,
      });
      fetchProducts();
      toast.fire({
        icon: "success",
        title: editingProduct
          ? "প্রোডাক্ট আপডেট করা হয়েছে"
          : "নতুন প্রোডাক্ট যোগ করা হয়েছে",
      });
    } else {
      errorAlert("দুঃখিত!", "প্রোডাক্ট সেভ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await confirmAlert({
      title: "আপনি কি নিশ্চিত?",
      text: "এই প্রোডাক্টটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না, থাক",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/admin/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchProducts();
          toast.fire({
            icon: "success",
            title: "প্রোডাক্টটি ডিলিট করা হয়েছে",
          });
        } else {
          errorAlert("ভুল হয়েছে!", "প্রোডাক্টটি ডিলিট করা সম্ভব হয়নি।");
        }
      } catch (error) {
        errorAlert("ভুল হয়েছে!", "সার্ভারে সমস্যা হয়েছে।");
      }
    }
  };

  // Group categories by parent
  const groupedCategories = groupCategories(categories);

  return (
    <div className="max-w-[1600px] mx-auto space-y-10">
      <AdminHeader
        title="প্রোডাক্ট ম্যানেজমেন্ট"
        count={filteredProducts.length}
        countLabel="Products Found"
        onAddClick={() => {
          setEditingProduct(null);
          setFormData({
            name: "",
            price: 0,
            stock: 0,
            category: "",
            image: "",
            description: "",
            isActive: true,
          });
          setIsModalOpen(true);
        }}
        addButtonLabel="নতুন প্রোডাক্ট"
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
      />

      <ProductFilters
        selectedCategory={selectedCategory}
        onCategoryChange={(value) => {
          setSelectedCategory(value);
          setCurrentPage(1);
        }}
        groupedCategories={groupedCategories}
      />

      <AdminTable
        columns={[
          { header: "প্রোডাক্ট" },
          { header: "ক্যাটাগরি" },
          { header: "মূল্য ও স্টক" },
          { header: "স্ট্যাটাস" },
          { header: "অ্যাকশন", className: "text-right" },
        ]}
        emptyMessage="কোন প্রোডাক্ট পাওয়া যায়নি"
      >
        {paginatedProducts.map((product) => (
          <ProductTableRow
            key={product._id}
            product={product}
            onEdit={(p) => {
              setEditingProduct(p);
              setFormData({
                name: p.name,
                price: p.price,
                stock: p.stock,
                category:
                  typeof p.category === "string"
                    ? p.category
                    : p.category?._id || "",
                image: p.image || "",
                description: p.description || "",
                isActive: p.isActive,
              });
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </AdminTable>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        label="Products"
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        groupedCategories={groupedCategories}
      />
    </div>
  );
}
