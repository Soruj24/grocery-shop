import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

interface AuthLogoProps {
  subtitle: string;
}

export default function AuthLogo({ subtitle }: AuthLogoProps) {
  return (
    <div className="flex flex-col items-center mb-10">
      <Link href="/" className="group flex flex-col items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-[360deg] shadow-primary">
          <ShoppingBasket className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-black tracking-tighter text-foreground">
            EMRAN<span className="text-primary">SHOP</span>
          </h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-1">
            {subtitle}
          </p>
        </div>
      </Link>
    </div>
  );
}
