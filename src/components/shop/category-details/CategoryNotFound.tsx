import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function CategoryNotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full">
        <ShoppingBag className="w-12 h-12 text-red-500 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {t('category_not_found')}
      </h2>
      <Link
        href="/products"
        className="text-green-600 dark:text-green-400 font-bold hover:underline flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> {t('see_all_products')}
      </Link>
    </div>
  );
}
