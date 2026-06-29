"use client";

import { ArrowUp, ArrowDown, GripVertical, Eye, EyeOff, Edit } from "lucide-react";
import { sectionConfigs } from "@/constants/section-config";
import type { Section } from "@/features/admin/sections/hooks/useAdminSections";

interface SectionListItemProps {
  section: Section;
  index: number;
  total: number;
  onToggle: (id: string, status: boolean) => void;
  onMove: (index: number, direction: "up" | "down") => void;
  onEdit: (section: Section) => void;
}

export default function SectionListItem({ section, index, total, onToggle, onMove, onEdit }: SectionListItemProps) {
  return (
    <div className={`flex items-center gap-4 p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${!section.isActive ? "opacity-60 bg-gray-50/50" : ""}`}>
      <div className="flex flex-col items-center gap-1 text-gray-400">
        <button onClick={() => onMove(index, "up")} disabled={index === 0}
          className="p-1 hover:text-green-600 disabled:opacity-30 transition-colors"><ArrowUp size={16} /></button>
        <GripVertical size={16} className="cursor-grab active:cursor-grabbing" />
        <button onClick={() => onMove(index, "down")} disabled={index === total - 1}
          className="p-1 hover:text-green-600 disabled:opacity-30 transition-colors"><ArrowDown size={16} /></button>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">{section.label}</h3>
          {sectionConfigs[section.key] && (
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Editable</span>
          )}
        </div>
        <p className="text-xs text-gray-400 font-mono">Key: {section.key} | Component: {section.component}</p>
      </div>
      <div className="flex items-center gap-3">
        {sectionConfigs[section.key] && (
          <button onClick={() => onEdit(section)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Content">
            <Edit size={18} />
          </button>
        )}
        <button onClick={() => onToggle(section._id, section.isActive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${section.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200"}`}>
          {section.isActive ? <><Eye size={16} /> চালু</> : <><EyeOff size={16} /> বন্ধ</>}
        </button>
      </div>
    </div>
  );
}
