"use client";

import { Plus, Search, Layers, RefreshCw } from "lucide-react";
import AdminTable from "@/features/admin/components/AdminTable";
import ComboTableRow from "@/features/admin/combos/components/ComboTableRow";
import ComboModal from "@/features/admin/components/ComboModal";
import { useAdminCombos } from "@/features/admin/combos/hooks/useAdminCombos";

export default function CombosPage() {
  const {
    filteredCombos,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingCombo,
    formData,
    setFormData,
    isSubmitting,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
    fetchCombos,
  } = useAdminCombos();

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-600/20">
              <Layers className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              কম্বো ম্যানেজমেন্ট
            </h1>
          </div>
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-15">
            সবগুলো কম্বো প্যাক এখানে নিয়ন্ত্রণ করুন
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-[2rem] font-black transition-all duration-300 shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-95 group"
        >
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <Plus className="w-5 h-5" />
          </div>
          নতুন কম্বো যোগ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="কম্বোর নাম দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-300 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
          />
        </div>
        <button
          onClick={fetchCombos}
          disabled={loading}
          className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 py-5 rounded-[2rem] font-black text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          রিফ্রেশ করুন
        </button>
      </div>

      <AdminTable
        columns={[
          { header: "কম্বোর নাম ও ট্যাগ" },
          { header: "পণ্যসমূহ" },
          { header: "মূল্য ও সাশ্রয়" },
          { header: "স্ট্যাটাস" },
          { header: "অ্যাকশন", className: "text-right" },
        ]}
        loading={loading}
      >
        {filteredCombos.map((combo) => (
          <ComboTableRow
            key={combo._id}
            combo={combo}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))}
      </AdminTable>

      <ComboModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingCombo={editingCombo}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
