"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, LogIn, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { type GuestInfo, type SavedAddress } from "@/types/checkout";
import { useLanguage } from "@/contexts/LanguageContext";
import AddressBook from "../AddressBook";

interface ShippingStepProps {
  isGuest: boolean;
  guestInfo: GuestInfo;
  onGuestInfoChange: (info: GuestInfo) => void;
  onToggleGuest: () => void;
  addresses: SavedAddress[];
  selectedAddressId: string | null;
  onSelectAddress: (addr: SavedAddress) => void;
  onAddAddress: (addr: SavedAddress) => void;
  onDeleteAddress: (id: string) => void;
  customAddress: string;
  customName: string;
  customPhone: string;
  onCustomChange: (field: string, value: string) => void;
  useCustomAddress: boolean;
  onToggleCustomAddress: () => void;
  errors: Record<string, string>;
}

export default function ShippingStep({
  isGuest,
  guestInfo,
  onGuestInfoChange,
  onToggleGuest,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  onDeleteAddress,
  customAddress,
  customName,
  customPhone,
  onCustomChange,
  useCustomAddress,
  onToggleCustomAddress,
  errors,
}: ShippingStepProps) {
  const { t } = useLanguage();
  const [showGuestForm, setShowGuestForm] = useState(isGuest);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Guest Login Toggle */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
              <ShoppingBag className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {isGuest ? t("guest_checkout") : t("login_to_checkout")}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isGuest ? t("guest_checkout_desc") : t("or_continue_as_guest")}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleGuest}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {isGuest ? <LogIn className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
            {isGuest ? t("login_to_checkout") : t("guest_checkout")}
          </button>
        </div>

        <AnimatePresence>
          {isGuest && showGuestForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`${t("name_required")} *`}
                    value={guestInfo.name}
                    onChange={(e) => onGuestInfoChange({ ...guestInfo, name: e.target.value })}
                    className={`w-full rounded-xl border ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 py-2.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder={`${t("phone_required")} *`}
                    value={guestInfo.phone}
                    onChange={(e) => onGuestInfoChange({ ...guestInfo, phone: e.target.value })}
                    className={`w-full rounded-xl border ${errors.phone ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 py-2.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder={t("email_optional")}
                    value={guestInfo.email || ""}
                    onChange={(e) => onGuestInfoChange({ ...guestInfo, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-2.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Address Section */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <MapPin className="h-4 w-4 text-emerald-500" />
          {t("delivery_address")}
        </h3>

        {!isGuest && addresses.length > 0 && !useCustomAddress && (
          <AddressBook
            addresses={addresses}
            selectedId={selectedAddressId}
            onSelect={onSelectAddress}
            onAdd={onAddAddress}
            onDelete={onDeleteAddress}
          />
        )}

        <button
          onClick={onToggleCustomAddress}
          className="mt-3 flex w-full items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span>{useCustomAddress ? t("same_as_above") : t("enter_address_manually")}</span>
          {useCustomAddress ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <AnimatePresence>
          {useCustomAddress && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder={`${t("name_required")} *`}
                  value={customName}
                  onChange={(e) => onCustomChange("name", e.target.value)}
                  className={`w-full rounded-xl border ${errors.customName ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
                />
                {errors.customName && <p className="text-xs text-red-500">{errors.customName}</p>}
                <input
                  type="tel"
                  placeholder={`${t("phone_required")} *`}
                  value={customPhone}
                  onChange={(e) => onCustomChange("phone", e.target.value)}
                  className={`w-full rounded-xl border ${errors.customPhone ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
                />
                {errors.customPhone && <p className="text-xs text-red-500">{errors.customPhone}</p>}
                <textarea
                  placeholder={`${t("delivery_address")} *`}
                  value={customAddress}
                  onChange={(e) => onCustomChange("address", e.target.value)}
                  rows={3}
                  className={`w-full rounded-xl border ${errors.customAddress ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none`}
                />
                {errors.customAddress && <p className="text-xs text-red-500">{errors.customAddress}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isGuest && !useCustomAddress && (
          <div className="mt-3">
            <button
              onClick={onToggleCustomAddress}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 py-3 text-sm font-medium text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              {t("enter_address_manually")}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
