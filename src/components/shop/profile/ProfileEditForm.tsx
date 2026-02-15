"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Session } from "next-auth";

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
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
            {t('profile_edit_title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t('profile_edit_desc')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              {t('full_name')}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-500/50 focus:bg-white dark:focus:bg-black/20 rounded-2xl outline-none transition-all font-medium"
                placeholder={t('enter_name_placeholder')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              {t('email_label')}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl outline-none transition-all font-medium opacity-60 cursor-not-allowed"
                placeholder={t('enter_email_placeholder')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              {t('phone_number')}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-500/50 focus:bg-white dark:focus:bg-black/20 rounded-2xl outline-none transition-all font-medium"
                placeholder={t('enter_phone_placeholder')}
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              {t('delivery_address')}
            </label>
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                <MapPin size={18} />
              </div>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={3}
                className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-500/50 focus:bg-white dark:focus:bg-black/20 rounded-2xl outline-none transition-all font-medium resize-none"
                placeholder={t('enter_address_placeholder')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {t('save_button')}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
