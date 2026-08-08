"use client";

import { useSettingsForm, SettingsShell, Field, Input, TextArea, Toggle } from "@/features/admin/shared/SettingsForm";

export default function StoreSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("store");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-24 rounded bg-muted animate-pulse" /><div className="h-4 w-56 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-32 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Store" description="Contact information and business details" onSave={save} saving={saving} dirty={true}>
      <Field label="Phone" description="Store contact number">
        <Input value={String(form.phone || "")} onChange={(v) => setField("phone", v)} placeholder="+880 1700-000000" />
      </Field>
      <Field label="Email" description="Store contact email">
        <Input value={String(form.email || "")} onChange={(v) => setField("email", v)} placeholder="info@grocery.com" type="email" />
      </Field>
      <Field label="Address" description="Physical store address">
        <Input value={String(form.address || "")} onChange={(v) => setField("address", v)} placeholder="123, Dhaka" />
      </Field>
      <Field label="City" description="Store city">
        <Input value={String(form.city || "")} onChange={(v) => setField("city", v)} placeholder="Dhaka" />
      </Field>
      <Field label="Country" description="Store country">
        <Input value={String(form.country || "")} onChange={(v) => setField("country", v)} placeholder="Bangladesh" />
      </Field>
      <Field label="Website" description="Store website URL">
        <Input value={String(form.website || "")} onChange={(v) => setField("website", v)} placeholder="https://..." />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Social Links</p>
      </div>
      <Field label="Facebook" description="Facebook page URL">
        <Input value={String(form.facebook || "")} onChange={(v) => setField("facebook", v)} placeholder="https://facebook.com/..." />
      </Field>
      <Field label="Instagram" description="Instagram profile URL">
        <Input value={String(form.instagram || "")} onChange={(v) => setField("instagram", v)} placeholder="https://instagram.com/..." />
      </Field>
      <Field label="YouTube" description="YouTube channel URL">
        <Input value={String(form.youtube || "")} onChange={(v) => setField("youtube", v)} placeholder="https://youtube.com/..." />
      </Field>
      <Field label="WhatsApp" description="WhatsApp number">
        <Input value={String(form.whatsapp || "")} onChange={(v) => setField("whatsapp", v)} placeholder="+880 1700-000000" />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Footer</p>
      </div>
      <Field label="Footer Description" description="Text shown in site footer">
        <TextArea value={String(form.footerDescription || "")} onChange={(v) => setField("footerDescription", v)} placeholder="About your store..." />
      </Field>
      <Field label="Copyright Text" description="Copyright notice for footer">
        <Input value={String(form.copyrightText || "")} onChange={(v) => setField("copyrightText", v)} placeholder="© 2024 Grocery Shop" />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
      </div>
      <Field label="Shop Status" description="Toggle store on/off for maintenance">
        <Toggle checked={form.shopStatus !== false} onChange={(v) => setField("shopStatus", v)} label={form.shopStatus !== false ? "Active" : "Maintenance Mode"} />
      </Field>
      {form.shopStatus === false && (
        <Field label="Maintenance Message" description="Message shown when shop is offline">
          <TextArea value={String(form.maintenanceMessage || "")} onChange={(v) => setField("maintenanceMessage", v)} placeholder="We're currently under maintenance..." />
        </Field>
      )}
    </SettingsShell>
  );
}
