"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { toast } from "@/lib/swal";
import { ArrowUp, ArrowDown, Eye, EyeOff, GripVertical, Edit } from "lucide-react";
import SectionEditor from "@/components/admin/sections/SectionEditor";
import { sectionConfigs } from "@/lib/section-config";

interface Section {
  _id: string;
  key: string;
  label: string;
  component: string;
  order: number;
  isActive: boolean;
  props?: any;
}

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/admin/sections");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSections(data);
      }
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      toast.fire({
        icon: "error",
        title: "সেকশন লোড করতে সমস্যা হয়েছে",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/sections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        setSections((prev) =>
          prev.map((s) =>
            s._id === id ? { ...s, isActive: !currentStatus } : s
          )
        );
        toast.fire({
          icon: "success",
          title: !currentStatus ? "সেকশন চালু করা হয়েছে" : "সেকশন বন্ধ করা হয়েছে",
        });
      }
    } catch (error) {
      toast.fire({
        icon: "error",
        title: "আপডেট করতে সমস্যা হয়েছে",
      });
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    // Swap order values
    const tempOrder = newSections[index].order;
    newSections[index].order = newSections[targetIndex].order;
    newSections[targetIndex].order = tempOrder;

    // Swap positions in array
    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];

    setSections(newSections);

    try {
      // Bulk update API call
      await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          newSections.map((s) => ({ _id: s._id, order: s.order }))
        ),
      });
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.fire({
        icon: "error",
        title: "অর্ডার আপডেট করতে সমস্যা হয়েছে",
      });
      fetchSections(); // Revert on error
    }
  };

  const handleSave = async (id: string, newProps: any) => {
    try {
      const res = await fetch(`/api/admin/sections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ props: newProps }),
      });

      if (res.ok) {
        setSections((prev) =>
          prev.map((s) => (s._id === id ? { ...s, props: newProps } : s))
        );
        toast.fire({
          icon: "success",
          title: "সেকশন আপডেট করা হয়েছে",
        });
        setEditingSection(null);
      }
    } catch (error) {
      toast.fire({
        icon: "error",
        title: "সেভ করতে সমস্যা হয়েছে",
      });
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-8">
      <AdminHeader
        title="হোম পেজ সেকশন ম্যানেজমেন্ট"
        count={sections.length}
        countLabel="Total Sections"
        hideSearch
        hideAddButton
      />

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">লোডিং...</div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {sections.map((section, index) => (
              <div
                key={section._id}
                className={`flex items-center gap-4 p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                  !section.isActive ? "opacity-60 bg-gray-50/50" : ""
                }`}
              >
                <div className="flex flex-col items-center gap-1 text-gray-400">
                  <button
                    onClick={() => handleMove(index, "up")}
                    disabled={index === 0}
                    className="p-1 hover:text-green-600 disabled:opacity-30 transition-colors"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <GripVertical size={16} className="cursor-grab active:cursor-grabbing" />
                  <button
                    onClick={() => handleMove(index, "down")}
                    disabled={index === sections.length - 1}
                    className="p-1 hover:text-green-600 disabled:opacity-30 transition-colors"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {section.label}
                    </h3>
                    {sectionConfigs[section.key] && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Editable
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    Key: {section.key} | Component: {section.component}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {sectionConfigs[section.key] && (
                    <button
                      onClick={() => setEditingSection(section)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Content"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleToggle(section._id, section.isActive)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
                      section.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {section.isActive ? (
                      <>
                        <Eye size={16} /> চালু
                      </>
                    ) : (
                      <>
                        <EyeOff size={16} /> বন্ধ
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingSection && (
        <SectionEditor
          section={editingSection}
          onClose={() => setEditingSection(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
