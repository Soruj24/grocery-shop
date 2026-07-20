"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { Session } from "next-auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button, Input, Textarea } from "@/components/ui";

interface ProfileEditFormProps {
  session: Session | null;
}

export default function ProfileEditForm({ session }: ProfileEditFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: (session?.user as { phone?: string })?.phone || "",
    address: (session?.user as { address?: string })?.address || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    alert(t('profile_update_success'));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-foreground">
            {t('profile_edit_title')}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t('profile_edit_desc')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">
              {t('full_name')}
            </label>
            <Input
              type="text"
              size="lg"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              leftIcon={<User size={18} />}
              placeholder={t('enter_name_placeholder')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">
              {t('email_label')}
            </label>
            <Input
              type="email"
              size="lg"
              value={formData.email}
              disabled
              leftIcon={<Mail size={18} />}
              placeholder={t('enter_email_placeholder')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">
              {t('phone_number')}
            </label>
            <Input
              type="tel"
              size="lg"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              leftIcon={<Phone size={18} />}
              placeholder={t('enter_phone_placeholder')}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-foreground ml-1">
              {t('delivery_address')}
            </label>
            <Textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={3}
              placeholder={t('enter_address_placeholder')}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
            leftIcon={<Save size={20} />}
          >
            {t('save_button')}
          </Button>
        </div>
      </form>
    </div>
  );
}
