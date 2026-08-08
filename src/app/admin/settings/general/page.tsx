"use client";

import { useSettingsForm, SettingsShell, Field, Input, TextArea, Select } from "@/features/admin/shared/SettingsForm";

export default function GeneralSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("general");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-32 rounded bg-muted animate-pulse" /><div className="h-4 w-64 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-32 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1 space-y-2"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="General" description="Basic store information and branding" onSave={save} saving={saving} dirty={true}>
      <Field label="Shop Name" description="Your store's display name">
        <Input value={String(form.shopName || "")} onChange={(v) => setField("shopName", v)} placeholder="Grocery Shop" />
      </Field>
      <Field label="Logo URL" description="URL to your store logo">
        <Input value={String(form.logo || "")} onChange={(v) => setField("logo", v)} placeholder="https://..." />
      </Field>
      <Field label="Favicon URL" description="Small icon for browser tabs">
        <Input value={String(form.favicon || "")} onChange={(v) => setField("favicon", v)} placeholder="https://..." />
      </Field>
      <Field label="Tagline" description="Short slogan for your store">
        <Input value={String(form.tagline || "")} onChange={(v) => setField("tagline", v)} placeholder="Fresh groceries, delivered fast" />
      </Field>
      <Field label="Description" description="Brief description of your store">
        <TextArea value={String(form.description || "")} onChange={(v) => setField("description", v)} placeholder="We deliver fresh groceries..." />
      </Field>
      <Field label="Currency" description="Store currency code">
        <Input value={String(form.currency || "")} onChange={(v) => setField("currency", v)} placeholder="BDT" />
      </Field>
      <Field label="Currency Symbol" description="Symbol shown next to prices">
        <Input value={String(form.currencySymbol || "")} onChange={(v) => setField("currencySymbol", v)} placeholder="৳" />
      </Field>
      <Field label="Timezone" description="Store timezone for orders and reports">
        <Select value={String(form.timezone || "Asia/Dhaka")} onChange={(v) => setField("timezone", v)}
          options={[
            { value: "Asia/Dhaka", label: "Asia/Dhaka (GMT+6)" },
            { value: "UTC", label: "UTC" },
            { value: "Asia/Kolkata", label: "Asia/Kolkata (GMT+5:30)" },
          ]} />
      </Field>
      <Field label="Locale" description="Language and region format">
        <Select value={String(form.locale || "bn-BD")} onChange={(v) => setField("locale", v)}
          options={[
            { value: "bn-BD", label: "Bengali (Bangladesh)" },
            { value: "en-BD", label: "English (Bangladesh)" },
            { value: "en-US", label: "English (US)" },
          ]} />
      </Field>
    </SettingsShell>
  );
}
