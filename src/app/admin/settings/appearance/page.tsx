"use client";

import { useSettingsForm, SettingsShell, Field, Input, Toggle, Select, ColorInput, TextArea } from "@/features/admin/shared/SettingsForm";

export default function AppearanceSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("appearance");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-32 rounded bg-muted animate-pulse" /><div className="h-4 w-56 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-32 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Appearance" description="Theme, colors, and visual customization" onSave={save} saving={saving} dirty={true}>
      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Colors</p>
      </div>
      <Field label="Primary Color" description="Main brand color used throughout the store">
        <ColorInput value={String(form.primaryColor || "#18181b")} onChange={(v) => setField("primaryColor", v)} />
      </Field>
      <Field label="Accent Color" description="Secondary color for highlights and buttons">
        <ColorInput value={String(form.accentColor || "#22c55e")} onChange={(v) => setField("accentColor", v)} />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typography & Layout</p>
      </div>
      <Field label="Font Family" description="Primary font used across the store">
        <Select value={String(form.fontFamily || "Geist")} onChange={(v) => setField("fontFamily", v)}
          options={[
            { value: "Geist", label: "Geist" },
            { value: "Inter", label: "Inter" },
            { value: "system", label: "System Default" },
          ]} />
      </Field>
      <Field label="Border Radius" description="Corner roundness for components">
        <Select value={String(form.borderRadius || "lg")} onChange={(v) => setField("borderRadius", v)}
          options={[
            { value: "none", label: "None (Sharp)" },
            { value: "md", label: "Medium" },
            { value: "lg", label: "Large (Default)" },
            { value: "xl", label: "Extra Large" },
          ]} />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Display</p>
      </div>
      <Field label="Dark Mode" description="Enable dark theme for the storefront">
        <Toggle checked={form.darkMode === true} onChange={(v) => setField("darkMode", v)} label={form.darkMode ? "Dark Mode" : "Light Mode"} />
      </Field>
      <Field label="Compact Mode" description="Reduce spacing and padding across the store">
        <Toggle checked={form.compactMode === true} onChange={(v) => setField("compactMode", v)} label={form.compactMode ? "Compact" : "Standard"} />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Announcement Banner</p>
      </div>
      <Field label="Enable Banner" description="Show an announcement bar at the top of the store">
        <Toggle checked={form.bannerEnabled === true} onChange={(v) => setField("bannerEnabled", v)} label={form.bannerEnabled ? "Enabled" : "Disabled"} />
      </Field>
      {form.bannerEnabled === true && (
        <>
          <Field label="Banner Text" description="Message displayed in the announcement bar">
            <Input value={String(form.bannerText || "")} onChange={(v) => setField("bannerText", v)} placeholder="Free delivery on orders over ৳500!" />
          </Field>
          <Field label="Banner Background Color" description="Background color of the banner">
            <ColorInput value={String(form.bannerBgColor || "#18181b")} onChange={(v) => setField("bannerBgColor", v)} />
          </Field>
          <Field label="Banner Text Color" description="Text color of the banner">
            <ColorInput value={String(form.bannerTextColor || "#ffffff")} onChange={(v) => setField("bannerTextColor", v)} />
          </Field>
        </>
      )}
    </SettingsShell>
  );
}
