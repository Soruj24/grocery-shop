import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function ProductSectionHeader() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>{t('fresh_arrivals')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight relative inline-block">
          {t('product_section_title')}
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-green-500 to-emerald-300">.</span>
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mt-4 max-w-lg leading-relaxed">
          {t('product_section_subtitle')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/products"
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-green-600/20 border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500"
        >
          <span className="text-sm font-bold">{t('see_all')}</span>
          <div className="bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
