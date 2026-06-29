"use client";

import { useState } from "react";
import AdminHeader from "@/features/admin/components/AdminHeader";
import ProductModal from "@/features/admin/components/ProductModal";
import Pagination from "@/features/admin/components/Pagination";
import AdminTable from "@/features/admin/components/AdminTable";
import ProductFilters from "@/features/admin/products/components/ProductFilters";
import ProductTableRow from "@/features/admin/products/components/ProductTableRow";
import { AdminProduct, AdminProductFormData } from "@/types/admin";
import { useAdminProducts } from "@/features/admin/products/hooks/useAdminProducts";
import { EMPTY_PRODUCT_FORM, productToFormData, resetForm } from "@/utils/admin-products-utils";

export default function ProductsPage() {
  const {
    filteredProducts, paginatedProducts, groupedCategories,
    searchTerm, setSearchTerm, selectedCategory, setSelectedCategory,
    currentPage, setCurrentPage, totalPages, itemsPerPage,
    handleSubmit, handleDelete,
  } = useAdminProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<AdminProductFormData>(EMPTY_PRODUCT_FORM);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(resetForm());
    setIsModalOpen(true);
  };

  const openEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData(productToFormData(product));
    setIsModalOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await handleSubmit(formData, editingProduct);
    if (ok) {
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData(resetForm());
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10">
      <AdminHeader title="প্রোডাক্ট ম্যানেজমেন্ট" count={filteredProducts.length} countLabel="Products Found"
        onAddClick={openAddModal} addButtonLabel="নতুন প্রোডাক্ট"
        searchTerm={searchTerm} onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }} />
      <ProductFilters selectedCategory={selectedCategory}
        onCategoryChange={(v) => { setSelectedCategory(v); setCurrentPage(1); }}
        groupedCategories={groupedCategories} />
      <AdminTable columns={[
        { header: "প্রোডাক্ট" }, { header: "ক্যাটাগরি" },
        { header: "মূল্য ও স্টক" }, { header: "স্ট্যাটাস" },
        { header: "অ্যাকশন", className: "text-right" },
      ]} emptyMessage="কোন প্রোডাক্ট পাওয়া যায়নি">
        {paginatedProducts.map((product) => (
          <ProductTableRow key={product._id} product={product} onEdit={openEditModal} onDelete={handleDelete} />
        ))}
      </AdminTable>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
        totalItems={filteredProducts.length} itemsPerPage={itemsPerPage} label="Products" />
      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct} formData={formData} setFormData={setFormData}
        handleSubmit={onSubmit} groupedCategories={groupedCategories} />
    </div>
  );
}
