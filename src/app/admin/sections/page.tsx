"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import SectionEditor from "@/components/admin/sections/SectionEditor";
import SectionListItem from "@/components/admin/sections/SectionListItem";
import { useAdminSections } from "@/hooks/useAdminSections";

export default function SectionsPage() {
  const { sections, isLoading, editingSection, setEditingSection, handleToggle, handleMove, handleSave } = useAdminSections();

  return (
    <div className="max-w-[1000px] mx-auto space-y-8">
      <AdminHeader title="হোম পেজ সেকশন ম্যানেজমেন্ট" count={sections.length} countLabel="Total Sections" />

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">লোডিং...</div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {sections.map((section, index) => (
              <SectionListItem key={section._id} section={section} index={index} total={sections.length}
                onToggle={handleToggle} onMove={handleMove} onEdit={setEditingSection} />
            ))}
          </div>
        )}
      </div>

      {editingSection && (
        <SectionEditor section={editingSection} onClose={() => setEditingSection(null)} onSave={handleSave} />
      )}
    </div>
  );
}
