"use client";

import AdminHeader from "@/features/admin/components/AdminHeader";
import SectionEditor from "@/features/admin/sections/components/SectionEditor";
import SectionListItem from "@/features/admin/sections/components/SectionListItem";
import { useAdminSections } from "@/features/admin/sections/hooks/useAdminSections";

export default function SectionsPage() {
  const { sections, isLoading, editingSection, setEditingSection, handleToggle, handleMove, handleSave } = useAdminSections();

  return (
    <div className="max-w-[1000px] mx-auto space-y-8">
      <AdminHeader title="হোম পেজ সেকশন ম্যানেজমেন্ট" count={sections.length} countLabel="Total Sections" />

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground">লোডিং...</div>
        ) : (
          <div className="divide-y divide-border/50">
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
