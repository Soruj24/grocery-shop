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
  Plus,
  Check,
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
      transition={{
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="space-y-4"
    >
      {/* Guest / Login Toggle */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <ShoppingBag className="h-4.5 w-4.5 text-muted-foreground/60" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isGuest
                  ? t("guest_checkout")
                  : t("login_to_checkout")}
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                {isGuest
                  ? t("guest_checkout_desc")
                  : t("or_continue_as_guest")}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleGuest}
            className="flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-[11px] font-medium text-muted-foreground/60 hover:bg-muted hover:text-foreground transition-all"
          >
            {isGuest ? (
              <LogIn className="h-3.5 w-3.5" />
            ) : (
              <User className="h-3.5 w-3.5" />
            )}
            {isGuest
              ? t("login_to_checkout")
              : t("guest_checkout")}
          </button>
        </div>

        <AnimatePresence>
          {isGuest && showGuestForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="guest-name" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("name_required")} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                    <input
                      id="guest-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      value={guestInfo.name}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "guest-name-error" : undefined}
                      onChange={(e) =>
                        onGuestInfoChange({
                          ...guestInfo,
                          name: e.target.value,
                        })
                      }
                      className={`w-full rounded-xl border ${
                        errors.name
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-border focus:border-foreground/20"
                      } bg-subtle py-3 pl-11 pr-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-foreground/10 outline-none transition-all`}
                    />
                  </div>
                  {errors.name && (
                    <p id="guest-name-error" role="alert" className="text-[11px] font-medium text-danger flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-rose-500" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="guest-phone" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("phone_required")} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                    <input
                      id="guest-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="01XXXXXXXXX"
                      value={guestInfo.phone}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "guest-phone-error" : undefined}
                      onChange={(e) =>
                        onGuestInfoChange({
                          ...guestInfo,
                          phone: e.target.value,
                        })
                      }
                      className={`w-full rounded-xl border ${
                        errors.phone
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-border focus:border-foreground/20"
                      } bg-subtle py-3 pl-11 pr-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-foreground/10 outline-none transition-all`}
                    />
                  </div>
                  {errors.phone && (
                    <p id="guest-phone-error" role="alert" className="text-[11px] font-medium text-danger flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-rose-500" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="guest-email" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("email_optional")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                    <input
                      id="guest-email"
                      type="email"
                      autoComplete="email"
                      placeholder="email@example.com"
                      value={guestInfo.email || ""}
                      onChange={(e) =>
                        onGuestInfoChange({
                          ...guestInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-border bg-subtle py-3 pl-11 pr-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delivery Address */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <MapPin className="h-4.5 w-4.5 text-muted-foreground/60" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("delivery_address")}
              </h3>
              <p className="text-[10px] text-muted-foreground/50">
                Where should we deliver?
              </p>
            </div>
          </div>

          {/* Saved Addresses */}
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

          {/* Custom Address Toggle */}
          <button
            onClick={onToggleCustomAddress}
            className={`mt-3 flex w-full items-center justify-between rounded-xl border p-3.5 text-sm transition-all ${
              useCustomAddress
                ? "border-foreground/20 bg-muted/20"
                : "border-border hover:border-border-strong text-muted-foreground/60"
            }`}
          >
            <span className="flex items-center gap-2 font-medium">
              {useCustomAddress ? (
                <Check className="h-4 w-4 text-foreground" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {useCustomAddress
                ? t("same_as_above")
                : t("enter_address_manually")}
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
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
                      {t("name_required")} *
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={customName}
                      onChange={(e) =>
                        onCustomChange("name", e.target.value)
                      }
                      className={`w-full rounded-xl border ${
                        errors.customName
                          ? "border-rose-500"
                          : "border-border"
                      } bg-subtle px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all`}
                    />
                    {errors.customName && (
                      <p className="text-[11px] font-medium text-danger flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-500" />
                        {errors.customName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
                      {t("phone_required")} *
                    </label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={customPhone}
                      onChange={(e) =>
                        onCustomChange("phone", e.target.value)
                      }
                      className={`w-full rounded-xl border ${
                        errors.customPhone
                          ? "border-rose-500"
                          : "border-border"
                      } bg-subtle px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all`}
                    />
                    {errors.customPhone && (
                      <p className="text-[11px] font-medium text-danger flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-500" />
                        {errors.customPhone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
                      {t("delivery_address")} *
                    </label>
                    <textarea
                      placeholder="House #, Road #, Area, City"
                      value={customAddress}
                      onChange={(e) =>
                        onCustomChange("address", e.target.value)
                      }
                      rows={3}
                      className={`w-full rounded-xl border ${
                        errors.customAddress
                          ? "border-rose-500"
                          : "border-border"
                      } bg-subtle px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all resize-none`}
                    />
                    {errors.customAddress && (
                      <p className="text-[11px] font-medium text-danger flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-500" />
                        {errors.customAddress}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guest: Add Address Button */}
          {isGuest && !useCustomAddress && (
            <div className="mt-3">
              <button
                onClick={onToggleCustomAddress}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3.5 text-sm font-medium text-muted-foreground/50 hover:border-border-strong hover:text-foreground transition-all"
              >
                <MapPin className="h-4 w-4" />
                {t("enter_address_manually")}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
