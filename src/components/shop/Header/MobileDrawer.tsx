import Link from "next/link";
import { ShoppingBasket, X, PhoneCall } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  totalWishlistItems: number;
  session: any;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  categories,
  totalWishlistItems,
  session,
}: MobileDrawerProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[300px] bg-white dark:bg-gray-900 z-[70] lg:hidden transition-transform duration-500 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={onClose}
            >
              <div className="bg-green-600 p-1.5 rounded-xl">
                <ShoppingBasket className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black text-gray-800 dark:text-white">
                ইমরান শপ
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                নেভিগেশন
              </p>
              <nav className="space-y-1">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold"
                >
                  হোম পেজ
                </Link>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold"
                >
                  সব প্রোডাক্ট
                </Link>
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold"
                >
                  <span>আমার উইশলিস্ট</span>
                  {totalWishlistItems > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {totalWishlistItems}
                    </span>
                  )}
                </Link>
              </nav>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                ক্যাটাগরি
              </p>
              <div className="space-y-1">
                {categories.map((cat: any) => (
                  <div key={cat._id} className="space-y-1">
                    <Link
                      href={`/category/${cat._id}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-sm transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {cat.name}
                      </span>
                    </Link>
                    {cat.subCategories && cat.subCategories.length > 0 && (
                      <div className="ml-6 flex flex-col space-y-1">
                        {cat.subCategories.map((sub: any) => (
                          <Link
                            key={sub._id}
                            href={`/category/${sub._id}`}
                            onClick={onClose}
                            className="p-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                          >
                            - {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                সহায়তা
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-3xl space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-200">
                  <PhoneCall className="w-4 h-4 text-green-600 dark:text-green-500" />
                  +৮৮০ ১২৩৪-৫৬৭৮৯০
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  যেকোনো প্রয়োজনে আমাদের কল করুন। আমরা সবসময় আপনার পাশে আছি।
                </p>
              </div>
            </div>
          </div>

          {!session && (
            <div className="p-6 border-t border-gray-50 dark:border-gray-800">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-center block shadow-lg shadow-green-900/20"
              >
                লগইন করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
