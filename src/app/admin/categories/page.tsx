"use client";

import AdminHeader from "@/features/admin/components/AdminHeader";
import Pagination from "@/features/admin/components/Pagination";
import CategoryModal from "@/features/admin/components/CategoryModal";
import AdminTable from "@/features/admin/components/AdminTable";
import CategoryTableRow from "@/features/admin/categories/components/CategoryTableRow";
import { useAdminCategories } from "@/features/admin/categories/hooks/useAdminCategories";

export default function CategoriesPage() {
  const {
    categories,
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
  } = useAdminCategories();

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      <AdminHeader
        title="ক্যাটাগরি ম্যানেজমেন্ট"
        count={totalCategories}
        countLabel="Categories"
        onAddClick={openAddModal}
        addButtonLabel="নতুন ক্যাটাগরি"
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder="ক্যাটাগরির নাম দিয়ে খুঁজুন..."
      />

      <AdminTable
        columns={[
          { header: "ক্যাটাগরি তথ্য" },
          { header: "টাইপ" },
          { header: "স্ট্যাটাস" },
          { header: "অ্যাকশন", className: "text-right" },
        ]}
        emptyMessage="কোন ক্যাটাগরি পাওয়া যায়নি"
      >
        {categories.map((category) => (
          <CategoryTableRow
            key={category._id}
            category={category}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))}
      </AdminTable>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalCategories}
        itemsPerPage={itemsPerPage}
        label="Categories"
      />

      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingCategory={editingCategory}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        mainCategories={mainCategories}
      />
    </div>
  );
}
