"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Package, Image as ImageIcon, DollarSign, Boxes, Tag, Layers,
  Truck, Search, ToggleLeft, ChevronDown, Upload, X, AlertTriangle,
  Loader2, Globe,
} from "lucide-react";
import { cn } from "@/utils/utils";
import type { AdminCategory, AdminProduct, GroupedCategory, AdminProductFormData } from "@/types/admin";

/* ─── Types ─── */
interface ProductFormProps {
  editingProduct: AdminProduct | null;
  formData: AdminProductFormData;
  setFormData: (data: AdminProductFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  groupedCategories: Record<string, GroupedCategory>;
  onClose: () => void;
  loading?: boolean;
}

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  category?: string;
  image?: string;
  description?: string;
  discount?: string;
  discountPrice?: string;
}

/* ─── Constants ─── */
const UNIT_OPTIONS = [
  { value: "pcs", label: "Pcs (পিস)" },
  { value: "kg", label: "Kg (কেজি)" },
  { value: "g", label: "Gram (গ্রাম)" },
  { value: "l", label: "Liter (লিটার)" },
  { value: "ml", label: "ml (মিলি)" },
  { value: "pack", label: "Pack (প্যাক)" },
  { value: "box", label: "Box (বক্স)" },
  { value: "bottle", label: "Bottle (বোতল)" },
  { value: "dozen", label: "Dozen (ডজন)" },
];

const INPUT_CLASSES =
  "w-full px-3.5 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all text-sm text-foreground placeholder:text-muted-foreground";
const LABEL_CLASSES = "text-xs font-semibold text-foreground";
const DESC_CLASSES = "text-[11px] text-muted-foreground mt-0.5";
const ERROR_CLASSES = "text-[11px] text-danger mt-1";

/* ─── Collapsible Section ─── */
function FormSection({
  icon: Icon,
  title,
  description,
  children,
  defaultOpen = true,
  required,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  required?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted shrink-0">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            {title}
            {required && <span className="text-danger">*</span>}
          </p>
          {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
        </div>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-border/50">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Field Wrapper ─── */
function Field({
  label,
  description,
  error,
  required,
  children,
  className,
}: {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className={LABEL_CLASSES}>
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
      {description && !error && <p className={DESC_CLASSES}>{description}</p>}
      {error && <p className={ERROR_CLASSES}>{error}</p>}
    </div>
  );
}

/* ─── Image Drop Zone ─── */
function ImageDropZone({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrlInput(value);
  }, [value]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const text = e.dataTransfer.getData("text/plain");
    if (text && (text.startsWith("http://") || text.startsWith("https://"))) {
      onChange(text);
      setUrlInput(text);
    }
  }, [onChange]);

  const handleUrlSubmit = useCallback(() => {
    const trimmed = urlInput.trim();
    if (trimmed && (trimmed.startsWith("http://") || trimmed.startsWith("https://"))) {
      onChange(trimmed);
    }
  }, [urlInput, onChange]);

  return (
    <div className="space-y-3">
      {/* Preview */}
      <div className="relative group">
        <div className={cn(
          "w-full h-48 rounded-xl border-2 border-dashed transition-all overflow-hidden flex items-center justify-center",
          dragOver ? "border-primary bg-primary/5" : "border-border bg-muted",
          value && "border-solid",
        )}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {value ? (
            <div className="relative w-full h-full">
              <img src={value} alt="Product preview" className="w-full h-full object-contain" />
              <button
                type="button"
                onClick={() => { onChange(""); setUrlInput(""); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-danger text-white hover:bg-danger/90 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted-foreground/10">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Drop image here or paste URL</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Supports JPG, PNG, WebP</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* URL Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onBlur={handleUrlSubmit}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleUrlSubmit(); } }}
            placeholder="https://example.com/image.jpg"
            className={cn(INPUT_CLASSES, "pl-9 text-xs")}
          />
        </div>
        <button
          type="button"
          onClick={handleUrlSubmit}
          className="px-3 rounded-lg bg-muted border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors shrink-0"
        >
          Load
        </button>
      </div>
    </div>
  );
}

/* ─── Main Form ─── */
export default function ProductForm({
  editingProduct,
  formData,
  setFormData,
  handleSubmit,
  groupedCategories,
  onClose,
  loading,
}: ProductFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isDirty, setIsDirty] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  /* ─── Unsaved Changes Warning ─── */
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  /* ─── Update Helper ─── */
  const update = useCallback((field: keyof AdminProductFormData, value: unknown) => {
    setFormData({ ...formData, [field]: value });
    setIsDirty(true);
  }, [formData, setFormData]);

  const touch = useCallback((field: string) => {
    setTouched((prev) => new Set(prev).add(field));
  }, []);

  /* ─── Validation ─── */
  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Product name is required";
    if (!formData.price || formData.price <= 0) errs.price = "Price must be greater than 0";
    if (formData.stock < 0) errs.stock = "Stock cannot be negative";
    if (!formData.category) errs.category = "Category is required";
    if (formData.discount && formData.discount < 0) errs.discount = "Discount cannot be negative";
    if (formData.discount && formData.discount > 100) errs.discount = "Discount cannot exceed 100%";
    if (formData.discountPrice && formData.discountPrice < 0) errs.discountPrice = "Price cannot be negative";
    if (formData.discountPrice && formData.price && formData.discountPrice >= formData.price) {
      errs.discountPrice = "Discount price must be less than original price";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setTouched(new Set(["name", "price", "stock", "category"]));
    if (validate()) {
      setIsDirty(false);
      handleSubmit(e);
    }
  }, [validate, handleSubmit]);

  /* ─── Computed ─── */
  const computedDiscount = useMemo(() => {
    if (!formData.discount || !formData.price) return 0;
    return Math.round(formData.price * (formData.discount / 100));
  }, [formData.discount, formData.price]);

  const computedFinalPrice = useMemo(() => {
    if (formData.discountPrice && formData.discountPrice > 0) return formData.discountPrice;
    if (computedDiscount > 0) return formData.price - computedDiscount;
    return formData.price;
  }, [formData.price, formData.discountPrice, computedDiscount]);

  /* ─── Section Nav ─── */
  const sections = [
    { id: "basic", icon: Package, label: "Basic Info" },
    { id: "images", icon: ImageIcon, label: "Images" },
    { id: "pricing", icon: DollarSign, label: "Pricing" },
    { id: "inventory", icon: Boxes, label: "Inventory" },
    { id: "categories", icon: Tag, label: "Categories" },
    { id: "variants", icon: Layers, label: "Variants" },
    { id: "shipping", icon: Truck, label: "Shipping" },
    { id: "seo", icon: Search, label: "SEO" },
    { id: "status", icon: ToggleLeft, label: "Status" },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-[70vh] max-h-[85vh]">
      {/* ─── Left: Section Nav (desktop) ─── */}
      <nav className="hidden lg:block w-56 shrink-0 border-r border-border bg-muted/30 p-4 overflow-y-auto" aria-label="Form sections">
        <div className="space-y-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ─── Center: Form ─── */}
      <form ref={formRef} onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto">
        <div className="p-5 lg:p-6 space-y-5 max-w-3xl">
          {/* ─── 1. Basic Information ─── */}
          <div id="basic">
            <FormSection icon={Package} title="Basic Information" description="Product name, description, and details" required defaultOpen>
              <div className="space-y-4">
                <Field label="Product Name" required error={touched.has("name") ? errors.name : undefined}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => touch("name")}
                    placeholder="e.g. Sugar (1 kg)"
                    className={cn(INPUT_CLASSES, touched.has("name") && errors.name && "border-danger focus:ring-danger")}
                    required
                  />
                </Field>
                <Field label="Description" description="Detailed product description for customers">
                  <textarea
                    value={formData.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Write a detailed product description..."
                    rows={4}
                    className={cn(INPUT_CLASSES, "resize-none min-h-[100px]")}
                  />
                </Field>
              </div>
            </FormSection>
          </div>

          {/* ─── 2. Product Images ─── */}
          <div id="images">
            <FormSection icon={ImageIcon} title="Product Images" description="Main product image and gallery">
              <ImageDropZone value={formData.image} onChange={(v) => update("image", v)} />
            </FormSection>
          </div>

          {/* ─── 3. Pricing ─── */}
          <div id="pricing">
            <FormSection icon={DollarSign} title="Pricing" description="Set product price and discounts" required>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Price (৳)" required error={touched.has("price") ? errors.price : undefined}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">৳</span>
                      <input
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) => update("price", Number(e.target.value))}
                        onBlur={() => touch("price")}
                        placeholder="0"
                        min={0}
                        className={cn(INPUT_CLASSES, "pl-8 tabular-nums", touched.has("price") && errors.price && "border-danger focus:ring-danger")}
                        required
                      />
                    </div>
                  </Field>
                  <Field label="Discount (%)" error={touched.has("discount") ? errors.discount : undefined}>
                    <input
                      type="number"
                      value={formData.discount || ""}
                      onChange={(e) => update("discount", Number(e.target.value))}
                      onBlur={() => touch("discount")}
                      placeholder="0"
                      min={0}
                      max={100}
                      className={cn(INPUT_CLASSES, "tabular-nums")}
                    />
                  </Field>
                </div>
                <Field label="Discount Price (৳)" description="Override calculated discount with a fixed price" error={touched.has("discountPrice") ? errors.discountPrice : undefined}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">৳</span>
                    <input
                      type="number"
                      value={formData.discountPrice || ""}
                      onChange={(e) => update("discountPrice", Number(e.target.value))}
                      onBlur={() => touch("discountPrice")}
                      placeholder="0"
                      min={0}
                      className={cn(INPUT_CLASSES, "pl-8 tabular-nums")}
                    />
                  </div>
                </Field>
                {/* Price Preview */}
                {(formData.discount || formData.discountPrice) ? (
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Original</p>
                      <p className="text-sm font-bold text-muted-foreground line-through tabular-nums">৳{formData.price.toLocaleString()}</p>
                    </div>
                    <div className="text-muted-foreground/30">→</div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Final</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">৳{computedFinalPrice.toLocaleString()}</p>
                    </div>
                    {computedDiscount > 0 && (
                      <>
                        <div className="text-muted-foreground/30">·</div>
                        <span className="text-[10px] font-bold text-success bg-success-subtle px-2 py-0.5 rounded-full">
                          Save ৳{computedDiscount.toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>
                ) : null}
              </div>
            </FormSection>
          </div>

          {/* ─── 4. Inventory ─── */}
          <div id="inventory">
            <FormSection icon={Boxes} title="Inventory" description="Stock quantity and unit" required>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Stock Quantity" required error={touched.has("stock") ? errors.stock : undefined}>
                  <input
                    type="number"
                    value={formData.stock || ""}
                    onChange={(e) => update("stock", Number(e.target.value))}
                    onBlur={() => touch("stock")}
                    placeholder="0"
                    min={0}
                    className={cn(INPUT_CLASSES, "tabular-nums", touched.has("stock") && errors.stock && "border-danger focus:ring-danger")}
                    required
                  />
                </Field>
                <Field label="Unit">
                  <select
                    value={formData.unit || "pcs"}
                    onChange={(e) => update("unit", e.target.value)}
                    className={cn(INPUT_CLASSES, "appearance-none cursor-pointer")}
                  >
                    {UNIT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </Field>
              </div>
              {/* Stock Status Indicator */}
              <div className={cn(
                "mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border",
                formData.stock <= 0 ? "bg-danger-subtle text-danger border-danger/20" :
                formData.stock <= 10 ? "bg-warning-subtle text-warning border-warning/20" :
                "bg-success-subtle text-success border-success/20",
              )}>
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  formData.stock <= 0 ? "bg-danger" :
                  formData.stock <= 10 ? "bg-warning" :
                  "bg-success",
                )} />
                {formData.stock <= 0 ? "Out of Stock" : formData.stock <= 10 ? `Low Stock (${formData.stock} remaining)` : `In Stock (${formData.stock} units)`}
              </div>
            </FormSection>
          </div>

          {/* ─── 5. Categories ─── */}
          <div id="categories">
            <FormSection icon={Tag} title="Categories" description="Organize your product" required>
              <Field label="Category" required error={touched.has("category") ? errors.category : undefined}>
                <select
                  value={formData.category}
                  onChange={(e) => { update("category", e.target.value); touch("category"); }}
                  className={cn(INPUT_CLASSES, "appearance-none cursor-pointer", touched.has("category") && errors.category && "border-danger focus:ring-danger")}
                  required
                >
                  <option value="">Select a category</option>
                  {Object.values(groupedCategories).map((parent) => (
                    <optgroup key={parent._id} label={parent.name}>
                      <option value={parent._id}>{parent.name} (Main)</option>
                      {parent.subCategories?.map((sub: AdminCategory) => (
                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </Field>
            </FormSection>
          </div>

          {/* ─── 6. Variants ─── */}
          <div id="variants">
            <FormSection icon={Layers} title="Variants" description="Size, color, or other variations" defaultOpen={false}>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
                  <Layers className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Variants coming soon</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Size, color, and other product variations will be supported in a future update.
                </p>
              </div>
            </FormSection>
          </div>

          {/* ─── 7. Shipping ─── */}
          <div id="shipping">
            <FormSection icon={Truck} title="Shipping" description="Shipping weight and dimensions" defaultOpen={false}>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Shipping details coming soon</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Weight, dimensions, and shipping class settings will be available in a future update.
                </p>
              </div>
            </FormSection>
          </div>

          {/* ─── 8. SEO ─── */}
          <div id="seo">
            <FormSection icon={Search} title="SEO" description="Search engine optimization" defaultOpen={false}>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">SEO fields coming soon</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Meta title, description, and slug customization will be supported in a future update.
                </p>
              </div>
            </FormSection>
          </div>

          {/* ─── 9. Product Status ─── */}
          <div id="status">
            <FormSection icon={ToggleLeft} title="Product Status" description="Visibility and tags">
              <div className="space-y-4">
                {/* Active Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-muted/50 border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">Active Status</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Toggle to show or hide this product in the store</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.isActive}
                    onClick={() => update("isActive", !formData.isActive)}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
                      formData.isActive ? "bg-success" : "bg-muted-foreground/30",
                    )}
                  >
                    <span className={cn(
                      "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                      formData.isActive ? "translate-x-5" : "translate-x-0",
                    )} />
                  </button>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-xs font-semibold text-foreground mb-3">Product Tags</p>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      { field: "isDeal" as const, label: "Deals", icon: "🏷️" },
                      { field: "isPopular" as const, label: "Popular", icon: "⭐" },
                      { field: "isNewArrival" as const, label: "New Arrival", icon: "✨" },
                    ]).map(({ field, label, icon }) => (
                      <label
                        key={field}
                        className={cn(
                          "flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all",
                          formData[field]
                            ? "border-primary/30 bg-primary/5"
                            : "border-border bg-muted/50 hover:bg-muted",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={!!formData[field]}
                          onChange={(e) => update(field, e.target.checked)}
                          className="sr-only"
                        />
                        <span className="text-sm">{icon}</span>
                        <span className="text-xs font-medium text-foreground">{label}</span>
                        {formData[field] && (
                          <span className="ml-auto h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </FormSection>
          </div>
        </div>
      </form>

      {/* ─── Sticky Action Bar ─── */}
      <div className="shrink-0 border-t lg:border-t-0 lg:border-l border-border bg-card p-4 lg:w-64 lg:flex lg:flex-col lg:justify-between overflow-y-auto">
        {/* Mobile: horizontal bar */}
        <div className="lg:hidden flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
              formData.isActive ? "bg-success-subtle text-success" : "bg-muted text-muted-foreground",
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", formData.isActive ? "bg-success" : "bg-muted-foreground")} />
              {formData.isActive ? "Active" : "Draft"}
            </span>
            {isDirty && <span className="text-[10px] text-warning font-medium">Unsaved</span>}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              form={undefined}
              disabled={loading}
              onClick={handleFormSubmit}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading && <Loader2 className="h-3 w-3 animate-spin" />}
              {editingProduct ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        {/* Desktop: sidebar */}
        <div className="hidden lg:block space-y-4">
          <div>
            <p className="text-xs font-semibold text-foreground mb-3">Status</p>
            <div className={cn(
              "flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border",
              formData.isActive ? "bg-success-subtle text-success border-success/20" : "bg-muted text-muted-foreground border-border",
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", formData.isActive ? "bg-success" : "bg-muted-foreground")} />
              {formData.isActive ? "Published" : "Draft"}
            </div>
          </div>

          {isDirty && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warning-subtle border border-warning/20">
              <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />
              <p className="text-[11px] font-medium text-warning">Unsaved changes</p>
            </div>
          )}

          {/* Preview Summary */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Price</span>
              <span className="font-medium text-foreground tabular-nums">৳{formData.price.toLocaleString()}</span>
            </div>
            {(formData.discount || formData.discountPrice) ? (
              <div className="flex justify-between text-muted-foreground">
                <span>Final Price</span>
                <span className="font-medium text-success tabular-nums">৳{computedFinalPrice.toLocaleString()}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-muted-foreground">
              <span>Stock</span>
              <span className={cn("font-medium tabular-nums", formData.stock <= 0 ? "text-danger" : formData.stock <= 10 ? "text-warning" : "text-foreground")}>
                {formData.stock}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-border space-y-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleFormSubmit}
              className="w-full px-4 py-2.5 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...</>
              ) : editingProduct ? (
                "Update Product"
              ) : (
                "Publish Product"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
