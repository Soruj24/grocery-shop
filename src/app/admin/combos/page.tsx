"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Layers, RefreshCw } from "lucide-react";
import AdminTable from "@/components/admin/AdminTable";
import ComboTableRow from "@/components/admin/combos/ComboTableRow";
import ComboModal from "@/components/admin/ComboModal";
import { AdminCombo, AdminComboFormData } from "@/types/admin";
import { toast } from "react-hot-toast";

const initialFormData: AdminComboFormData = {
  name: "",
  items: "",
  price: 0,
  saveAmount: 0,
  tag: "নতুন",
  isActive: true,
};

export default function CombosPage() {
  const [combos, setCombos] = useState<AdminCombo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<AdminCombo | null>(null);
  const [formData, setFormData] = useState<AdminComboFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/combos");
      if (!res.ok) throw new Error("Failed to fetch combos");
      const data = await res.json();
      setCombos(data);
    } catch (error) {
      toast.error("কম্বো লিস্ট লোড করতে সমস্যা হয়েছে");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (combo: AdminCombo) => {
    setEditingCombo(combo);
    setFormData({
      name: combo.name,
      items: combo.items.join(", "),
      price: combo.price,
      saveAmount: combo.saveAmount,
      tag: combo.tag,
      isActive: combo.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই কম্বোটি ডিলিট করতে চান?")) return;

    try {
      const res = await fetch(`/api/admin/combos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete combo");

      toast.success("কম্বো ডিলিট করা হয়েছে");
      fetchCombos();
    } catch (error) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        items: formData.items.split(",").map((i) => i.trim()).filter((i) => i !== ""),
      };

      const url = editingCombo
        ? `/api/admin/combos/${editingCombo._id}`
        : "/api/admin/combos";
      
      const method = editingCombo ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save combo");

      toast.success(editingCombo ? "কম্বো আপডেট করা হয়েছে" : "নতুন কম্বো যোগ করা হয়েছে");
      setIsModalOpen(false);
      setEditingCombo(null);
      setFormData(initialFormData);
      fetchCombos();
    } catch (error) {
      toast.error("সেভ করতে সমস্যা হয়েছে");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCombos = combos.filter((combo) =>
    combo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onClick={() => {
            setEditingCombo(null);
            setFormData(initialFormData);
            setIsModalOpen(true);
          }}
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
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </AdminTable>

      <ComboModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingCombo={editingCombo}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
