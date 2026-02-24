"use client";

import { useState, useEffect } from "react";
import { X, Save, Plus, Trash, Image as ImageIcon } from "lucide-react";
import { sectionConfigs } from "@/lib/section-config";

interface SectionEditorProps {
  section: any;
  onClose: () => void;
  onSave: (id: string, newProps: any) => Promise<void>;
}

export default function SectionEditor({ section, onClose, onSave }: SectionEditorProps) {
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const config = sectionConfigs[section.key];

  useEffect(() => {
    if (section.props) {
      setFormData(section.props);
    }
  }, [section]);

  if (!config) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="text-center py-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Configuration Found</h3>
            <p className="text-gray-500">
              This section ({section.key}) does not have an editable configuration yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayItemChange = (arrayName: string, index: number, fieldName: string, value: any) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[arrayName] || [])];
      if (!newArray[index]) newArray[index] = {};
      newArray[index] = { ...newArray[index], [fieldName]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), {}],
    }));
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(section._id, formData);
    setIsSaving(false);
    onClose();
  };

  const renderField = (field: any, value: any, onChange: (val: any) => void) => {
    if (field.type === "text") {
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          placeholder={`Enter ${field.label}`}
        />
      );
    }
    
    if (field.type === "textarea") {
      return (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
          placeholder={`Enter ${field.label}`}
        />
      );
    }

    if (field.type === "image") {
      return (
        <div className="flex gap-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            placeholder="Image URL (https://...)"
          />
          {value && (
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((opt: any) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "datetime") {
      const toInputValue = (v?: string) => {
        try {
          return v ? new Date(v).toISOString().slice(0, 16) : "";
        } catch {
          return "";
        }
      };
      return (
        <input
          type="datetime-local"
          value={toInputValue(value)}
          onChange={(e) => {
            const iso = e.target.value ? new Date(e.target.value).toISOString() : "";
            onChange(iso);
          }}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
        />
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10 rounded-t-3xl">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              Edit {config.label}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Update the content for this section
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {config.fields.map((field: any) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              
              {field.type === "array" ? (
                <div className="space-y-4">
                  {(formData[field.name] || []).map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 relative group">
                      <button
                        onClick={() => removeArrayItem(field.name, index)}
                        className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-700 text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                        title="Remove Item"
                      >
                        <Trash size={14} />
                      </button>
                      <div className="grid grid-cols-1 gap-4">
                        {field.itemFields.map((itemField: any) => (
                          <div key={itemField.name} className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              {itemField.label}
                            </label>
                            {renderField(
                              itemField,
                              item[itemField.name],
                              (val) => handleArrayItemChange(field.name, index, itemField.name, val)
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem(field.name)}
                    className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 font-bold text-sm hover:border-green-500 hover:text-green-600 hover:bg-green-50/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add {field.label.slice(0, -1)}
                  </button>
                </div>
              ) : (
                renderField(field, formData[field.name], (val) => handleFieldChange(field.name, val))
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900 rounded-b-3xl">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200 dark:shadow-green-900/20 disabled:opacity-70"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
