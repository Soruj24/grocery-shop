import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

export default function OrderSuccess() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full">
        <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {t('order_success_title')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          {t('order_success_desc')}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/orders")}
          className="bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-green-700 dark:hover:bg-green-600 transition-all shadow-xl shadow-green-900/20 active:scale-95 flex items-center gap-2"
        >
          {t('view_my_orders')}
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-800 px-8 py-4 rounded-2xl font-black hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
        >
          {t('continue_shopping')}
        </button>
      </div>
    </div>
  );
}
