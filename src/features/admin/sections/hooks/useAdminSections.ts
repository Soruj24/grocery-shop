"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "@/utils/swal";

export interface Section {
  _id: string;
  key: string;
  label: string;
  component: string;
  order: number;
  isActive: boolean;
  props?: Record<string, unknown>;
}

export function useAdminSections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const fetchSections = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/sections");
      const data = await res.json();
      if (Array.isArray(data)) setSections(data);
    } catch {
      toast.fire({ icon: "error", title: "সেকশন লোড করতে সমস্যা হয়েছে" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchSections(); }, [fetchSections]);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/sections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        setSections((prev) => prev.map((s) => (s._id === id ? { ...s, isActive: !currentStatus } : s)));
        toast.fire({ icon: "success", title: !currentStatus ? "সেকশন চালু করা হয়েছে" : "সেকশন বন্ধ করা হয়েছে" });
      }
    } catch {
      toast.fire({ icon: "error", title: "আপডেট করতে সমস্যা হয়েছে" });
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === sections.length - 1)) return;
    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const tempOrder = newSections[index].order;
    newSections[index].order = newSections[targetIndex].order;
    newSections[targetIndex].order = tempOrder;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setSections(newSections);
    try {
      await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSections.map((s) => ({ _id: s._id, order: s.order }))),
      });
    } catch {
      toast.fire({ icon: "error", title: "অর্ডার আপডেট করতে সমস্যা হয়েছে" });
      fetchSections();
    }
  };

  const handleSave = async (id: string, newProps: Record<string, unknown>) => {
    try {
      const res = await fetch(`/api/admin/sections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ props: newProps }),
      });
      if (res.ok) {
        setSections((prev) => prev.map((s) => (s._id === id ? { ...s, props: newProps } : s)));
        toast.fire({ icon: "success", title: "সেকশন আপডেট করা হয়েছে" });
        setEditingSection(null);
      }
    } catch {
      toast.fire({ icon: "error", title: "সেভ করতে সমস্যা হয়েছে" });
    }
  };

  return { sections, isLoading, editingSection, setEditingSection, handleToggle, handleMove, handleSave };
}
