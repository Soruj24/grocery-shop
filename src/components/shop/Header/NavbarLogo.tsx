import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

export default function NavbarLogo() {
  return (
    <Link href="/" className="group flex items-center gap-4 shrink-0">
      <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-700 rounded-[22px] flex items-center justify-center transform transition-all duration-700 group-hover:rotate-[360deg] shadow-[0_15px_30px_-5px_rgba(34,197,94,0.3)]">
        <ShoppingBasket className="w-8 h-8 text-white" />
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 rounded-full border-[3px] border-white dark:border-black animate-bounce shadow-lg"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.8]">
          EMRAN
          <span className="text-green-600 dark:text-green-500"> SHOP</span>
        </span>
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-2">
          Premium Grocery
        </span>
      </div>
    </Link>
  );
}
