"use client";

import { MessageCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function WhatsAppButton() {
  const settings = useSettings();

  if (!settings.whatsapp) return null;

  // Clean the number: remove spaces, dashes, parentheses
  const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, "");

  return (
    <a
      href={`https://wa.me/${cleanNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-in slide-in-from-bottom-4"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0 border-2 border-white animate-pulse" />
    </a>
  );
}
