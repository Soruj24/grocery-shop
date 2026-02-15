import { ShoppingBag, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function EmptyCartState() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative space-y-8 text-center px-4">
        <div className="relative inline-block">
          <div className="bg-white dark:bg-gray-900 p-12 rounded-[56px] shadow-2xl border border-gray-100 dark:border-gray-800 animate-bounce-slow">
            <ShoppingBag className="w-20 h-20 text-gray-200 dark:text-gray-700" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-5 rounded-[24px] shadow-xl rotate-12">
            <Plus className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {t('cart_empty_title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold max-w-sm mx-auto text-lg">
            {t('cart_empty_desc')}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-4 bg-gray-900 dark:bg-white text-white dark:text-black px-12 py-6 rounded-[32px] font-black text-xl hover:shadow-2xl hover:shadow-green-600/20 transition-all active:scale-95 group"
        >
          {t('cart_start_shopping')}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
