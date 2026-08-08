import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

interface AuthLogoProps {
  subtitle: string;
}

export default function AuthLogo({ subtitle }: AuthLogoProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <Link href="/" className="group flex flex-col items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <ShoppingBasket className="w-6 h-6 text-background" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            EMRAN<span className="text-muted-foreground">SHOP</span>
          </h1>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
            {subtitle}
          </p>
        </div>
      </Link>
    </div>
  );
}
