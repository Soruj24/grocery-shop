import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

interface AuthLogoProps {
  subtitle: string;
}

export default function AuthLogo({ subtitle }: AuthLogoProps) {
  return (
    <div className="flex flex-col items-center mb-10">
      <Link href="/" className="group flex flex-col items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-[2rem] flex items-center justify-center transform transition-all duration-500 group-hover:rotate-[360deg] shadow-lg shadow-green-200 dark:shadow-green-900/20">
          <ShoppingBasket className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">
            EMRAN<span className="text-green-600 dark:text-green-500">SHOP</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-1">
            {subtitle}
          </p>
        </div>
      </Link>
    </div>
  );
}
