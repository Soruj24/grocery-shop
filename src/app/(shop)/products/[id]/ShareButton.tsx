"use client";

import { Share2 } from "lucide-react";
import { Toast } from "@/utils/toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

export default function ShareButton({ product }: { product: Product }) {
  const { t } = useLanguage();
  const productName = product.name;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on Emran Shop!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        Toast.fire({
          icon: 'success',
          title: t('share_success'),
        });
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-info transition-colors group"
    >
      <div className="p-2 bg-muted rounded-xl group-hover:bg-info-subtle transition-colors">
        <Share2 className="w-5 h-5" />
      </div>
      <span>{t('share')}</span>
    </motion.button>
  );
}
