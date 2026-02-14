import Link from "next/link";
import { ShoppingBasket, X, PhoneCall, Heart, LayoutGrid, ShoppingBag, User, LogOut, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { Category } from "@/types/category";
import { Session } from "next-auth";

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
  const displayCategories = categories.length > 0 ? categories : [
    { _id: 'fruits', name: 'Fruits' },
    { _id: 'vegetables', name: 'Vegetables' },
    { _id: 'fish', name: 'Fish' },
    { _id: 'meat', name: 'Meat' },
    { _id: 'dairy', name: 'Dairy' },
    { _id: 'frozen', name: 'Frozen' },
    { _id: 'bakery', name: 'Bakery' },
    { _id: 'beauty', name: 'Beauty' },
    { _id: 'baby-care', name: 'Baby Care' },
    { _id: 'cleaning', name: 'Cleaning' },
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
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-[#0B1120] z-[201] lg:hidden flex flex-col shadow-2xl"
          >
            {/* Header / User Profile */}
            <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-3" onClick={onClose}>
                  <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-600/20">
                    <ShoppingBasket className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-black text-gray-900 dark:text-white">ইমরান শপ</span>
                </Link>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-all border border-gray-100 dark:border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {session ? (
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-green-500/20">
                    {session.user?.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">স্বাগতম</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white truncate">{session.user?.name}</p>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl font-black text-sm justify-center shadow-xl hover:bg-green-600 hover:text-white transition-all"
                >
                  <User size={18} />
                  লগইন / সাইনআপ
                </Link>
              )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">নেভিগেশন</p>
                <div className="space-y-2">
                  {[
                    { label: "হোম পেজ", href: "/", icon: ShoppingBasket },
                    { label: "সব প্রোডাক্ট", href: "/products", icon: ShoppingBag },
                    { label: "উইশলিস্ট", href: "/wishlist", icon: Heart, badge: totalWishlistItems },
                    { label: "অফারসমূহ", href: "/products?filter=deals", icon: LayoutGrid },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between p-4 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="font-bold">{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{item.badge}</span>
                      ) : (
                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">টপ ক্যাটাগরি</p>
                <div className="grid grid-cols-2 gap-3">
                  {displayCategories.slice(0, 10).map((cat: Category) => (
                    <Link
                      key={cat._id}
                      href={`/products?category=${cat._id}`}
                      onClick={onClose}
                      className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-8 h-8 object-contain" />
                        ) : (
                          <span className="text-lg font-black text-green-600">{cat.name.charAt(0)}</span>
                        )}
                      </div>
                      <span className="text-[11px] font-black text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors line-clamp-1">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-100 dark:border-white/5 space-y-4">
              <Link
                href="/support"
                onClick={onClose}
                className="flex items-center gap-4 p-4 text-gray-500 font-bold hover:text-green-600 transition-colors"
              >
                <PhoneCall size={20} />
                সহায়তা কেন্দ্র
              </Link>
              {session && (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-4 w-full p-4 text-rose-500 font-black hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                    <LogOut size={20} />
                  </div>
                  লগ আউট
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
