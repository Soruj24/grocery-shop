"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  LogIn,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  type GuestInfo,
  type SavedAddress,
} from "@/types/checkout";
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
  onCustomChange: (
    field: string,
    value: string
  ) => void;
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
  const [showGuestForm, setShowGuestForm] =
    useState(isGuest);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
              <ShoppingBag className="h-4 w-4 text-muted-foreground/60" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isGuest
                  ? t("guest_checkout")
                  : t("login_to_checkout")}
              </p>
              <p className="text-[10px] text-muted-foreground/50">
                {isGuest
                  ? t("guest_checkout_desc")
                  : t(
                      "or_continue_as_guest"
                    )}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleGuest}
            className="flex items-center gap-1.5 rounded-lg border border-black/[0.04] dark:border-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-muted-foreground/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          >
            {isGuest ? (
              <LogIn className="h-3 w-3" />
            ) : (
              <User className="h-3 w-3" />
            )}
            {isGuest
              ? t("login_to_checkout")
              : t("guest_checkout")}
          </button>
        </div>

        <AnimatePresence>
          {isGuest && showGuestForm && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 border-t border-black/[0.04] dark:border-white/[0.04] pt-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                  <input
                    type="text"
                    placeholder={`${t("name_required")} *`}
                    value={guestInfo.name}
                    onChange={(e) =>
                      onGuestInfoChange({
                        ...guestInfo,
                        name: e.target.value,
                      })
                    }
                    className={`w-full rounded-lg border ${
                      errors.name
                        ? "border-rose-500"
                        : "border-black/[0.04] dark:border-white/[0.04]"
                    } bg-black/[0.02] dark:bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-500">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                  <input
                    type="tel"
                    placeholder={`${t("phone_required")} *`}
                    value={guestInfo.phone}
                    onChange={(e) =>
                      onGuestInfoChange({
                        ...guestInfo,
                        phone: e.target.value,
                      })
                    }
                    className={`w-full rounded-lg border ${
                      errors.phone
                        ? "border-rose-500"
                        : "border-black/[0.04] dark:border-white/[0.04]"
                    } bg-black/[0.02] dark:bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 outline-none transition-colors`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                  <input
                    type="email"
                    placeholder={t(
                      "email_optional"
                    )}
                    value={
                      guestInfo.email || ""
                    }
                    onChange={(e) =>
                      onGuestInfoChange({
                        ...guestInfo,
                        email:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-black/[0.04] dark:border-white/[0.04] bg-black/[0.02] dark:bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <MapPin className="h-4 w-4 text-muted-foreground/60" />
          {t("delivery_address")}
        </h3>

        {!isGuest &&
          addresses.length > 0 &&
          !useCustomAddress && (
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
          className="mt-3 flex w-full items-center justify-between rounded-lg border border-black/[0.04] dark:border-white/[0.04] p-3 text-sm text-muted-foreground/60 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
        >
          <span>
            {useCustomAddress
              ? t("same_as_above")
              : t(
                  "enter_address_manually"
                )}
          </span>
          {useCustomAddress ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        <AnimatePresence>
          {useCustomAddress && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder={`${t("name_required")} *`}
                  value={customName}
                  onChange={(e) =>
                    onCustomChange(
                      "name",
                      e.target.value
                    )
                  }
                  className={`w-full rounded-lg border ${
                    errors.customName
                      ? "border-rose-500"
                      : "border-black/[0.04] dark:border-white/[0.04]"
                  } bg-black/[0.02] dark:bg-white/[0.03] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 outline-none transition-colors`}
                />
                {errors.customName && (
                  <p className="text-xs text-rose-500">
                    {errors.customName}
                  </p>
                )}
                <input
                  type="tel"
                  placeholder={`${t("phone_required")} *`}
                  value={customPhone}
                  onChange={(e) =>
                    onCustomChange(
                      "phone",
                      e.target.value
                    )
                  }
                  className={`w-full rounded-lg border ${
                    errors.customPhone
                      ? "border-rose-500"
                      : "border-black/[0.04] dark:border-white/[0.04]"
                  } bg-black/[0.02] dark:bg-white/[0.03] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 outline-none transition-colors`}
                />
                {errors.customPhone && (
                  <p className="text-xs text-rose-500">
                    {errors.customPhone}
                  </p>
                )}
                <textarea
                  placeholder={`${t("delivery_address")} *`}
                  value={customAddress}
                  onChange={(e) =>
                    onCustomChange(
                      "address",
                      e.target.value
                    )
                  }
                  rows={3}
                  className={`w-full rounded-lg border ${
                    errors.customAddress
                      ? "border-rose-500"
                      : "border-black/[0.04] dark:border-white/[0.04]"
                  } bg-black/[0.02] dark:bg-white/[0.03] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 outline-none transition-colors resize-none`}
                />
                {errors.customAddress && (
                  <p className="text-xs text-rose-500">
                    {errors.customAddress}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isGuest && !useCustomAddress && (
          <div className="mt-3">
            <button
              onClick={onToggleCustomAddress}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-black/[0.1] dark:border-white/[0.1] py-3 text-sm font-medium text-muted-foreground/50 hover:border-foreground/20 hover:text-foreground transition-colors"
            >
              <MapPin className="h-4 w-4" />
              {t(
                "enter_address_manually"
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
