"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OrderSuccess() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="bg-success-subtle p-6 rounded-full">
        <CheckCircle2 className="w-16 h-16 text-success" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          {t('order_success_title')}
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          {t('order_success_desc')}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/orders")}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-black hover:bg-primary-hover transition-all shadow-primary active:scale-95 flex items-center gap-2"
        >
          {t('view_my_orders')}
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-card text-foreground border border-border px-8 py-4 rounded-lg font-black hover:bg-muted transition-all active:scale-95"
        >
          {t('continue_shopping')}
        </button>
      </div>
    </div>
  );
}
