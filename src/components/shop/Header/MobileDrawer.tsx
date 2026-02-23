import Link from "next/link";
import { ShoppingBasket, X, PhoneCall, Heart, LayoutGrid, ShoppingBag, User, LogOut, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { Category } from "@/types/category";
import { Session } from "next-auth";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";
import { getCategoryFallbackImage } from "@/lib/category-utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  totalWishlistItems: number;
  session: Session | null;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  categories,
  totalWishlistItems,
  session,
}: MobileDrawerProps) {
  const { t, language } = useLanguage();
  const displayCategories = categories.length > 0 ? categories : [
    { _id: 'fruits', name: t('cat_fruits'), nameEn: t('cat_fruits_desc') },
    { _id: 'vegetables', name: t('cat_vegetables'), nameEn: t('cat_vegetables_desc') },
    { _id: 'fish', name: t('cat_fish'), nameEn: t('cat_fish_desc') },
    { _id: 'meat', name: t('cat_meat'), nameEn: t('cat_meat_desc') },
    { _id: 'dairy', name: t('cat_dairy'), nameEn: t('cat_dairy_desc') },
    { _id: 'frozen', name: t('cat_frozen'), nameEn: t('cat_frozen_desc') },
    { _id: 'bakery', name: t('cat_bakery'), nameEn: t('cat_bakery_desc') },
    { _id: 'beauty', name: t('cat_beauty'), nameEn: t('cat_beauty_desc') },
    { _id: 'baby-care', name: t('cat_baby_care'), nameEn: t('cat_baby_care_desc') },
    { _id: 'cleaning', name: t('cat_cleaning'), nameEn: t('cat_cleaning_desc') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-[#0B1120] z-[201] lg:hidden flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Header / User Profile */}
            <div className="relative p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-3" onClick={onClose}>
                  <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-600/20">
                    <ShoppingBasket className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    {t('brand_name_first')} <span className="text-green-600">{t('brand_name_second')}</span>
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-all border border-gray-100 dark:border-white/10 hover:rotate-90 duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {session ? (
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-green-500/20 relative z-10">
                    {session.user?.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{t('welcome_back')}</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white truncate">{session.user?.name}</p>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl font-black text-sm justify-center shadow-xl hover:bg-green-600 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <User size={18} />
                  {t('login_signup')}
                </Link>
              )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar relative z-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{t('navigation')}</p>
                <div className="space-y-2">
                  {[
                    { label: t('home_page'), href: "/", icon: ShoppingBasket },
                    { label: t('all_products'), href: "/products", icon: ShoppingBag },
                    { label: t('wishlist'), href: "/wishlist", icon: Heart, badge: totalWishlistItems },
                    { label: t('offers'), href: "/products?filter=deals", icon: LayoutGrid },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-4 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 transition-all group border border-transparent hover:border-green-500/20"
                      >
                        <div className="flex items-center gap-4">
                          <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                          <span className="font-bold">{item.label}</span>
                        </div>
                        {item.badge ? (
                          <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/30">{item.badge}</span>
                        ) : (
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{t('top_categories')}</p>
                <div className="grid grid-cols-2 gap-3">
                  {displayCategories.slice(0, 10).map((cat: Category, idx: number) => (
                    <motion.div
                      key={cat._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + idx * 0.03 }}
                    >
                      <Link
                        href={`/products?category=${cat._id}`}
                        onClick={onClose}
                        className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all group hover:shadow-lg hover:shadow-green-500/5 relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform relative z-10">
                          <div className="relative w-8 h-8">
                            <Image
                              src={cat.image || getCategoryFallbackImage(cat.nameEn || cat.name)}
                              alt={language === 'en' ? (cat.nameEn || cat.name) : cat.name}
                              fill
                              sizes="32px"
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <span className="text-[11px] font-black text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors line-clamp-1 relative z-10">
                          {language === 'en' ? (cat.nameEn || cat.name) : cat.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-100 dark:border-white/5 space-y-4 bg-gray-50/50 dark:bg-white/[0.02]">
              <Link
                href="/support"
                onClick={onClose}
                className="flex items-center gap-4 p-4 text-gray-500 font-bold hover:text-green-600 transition-colors bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <PhoneCall size={16} />
                </div>
                {t('support_center')}
              </Link>
              {session && (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-4 w-full p-4 text-rose-500 font-black hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all group border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                    <LogOut size={20} />
                  </div>
                  {t('logout')}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
