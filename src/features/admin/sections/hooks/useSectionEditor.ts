"use client";

import { useState, useEffect } from "react";

interface Section {
  _id: string;
  key: string;
  props?: Record<string, unknown>;
}

interface UseSectionEditorOptions {
  section: Section;
  onSave: (id: string, props: Record<string, unknown>) => Promise<void>;
  onClose: () => void;
}

export function useSectionEditor({ section, onSave, onClose }: UseSectionEditorOptions) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (section.props) setFormData(section.props);
  }, [section]);

  const handleFieldChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayItemChange = (arrayName: string, index: number, fieldName: string, value: unknown) => {
    setFormData((prev) => {
      const arr = [...((prev[arrayName] as unknown[]) || [])];
      if (!arr[index]) arr[index] = {};
      arr[index] = { ...(arr[index] as Record<string, unknown>), [fieldName]: value };
      return { ...prev, [arrayName]: arr };
    });
  };

  const addArrayItem = (arrayName: string) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...((prev[arrayName] as unknown[]) || []), {}],
    }));
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    setFormData((prev) => {
      const arr = [...((prev[arrayName] as unknown[]) || [])];
      arr.splice(index, 1);
      return { ...prev, [arrayName]: arr };
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(section._id, formData);
    setIsSaving(false);
    onClose();
  };

  return { formData, isSaving, handleFieldChange, handleArrayItemChange, addArrayItem, removeArrayItem, handleSubmit };
}
