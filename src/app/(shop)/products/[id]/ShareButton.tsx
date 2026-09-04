"use client";

import { Share2 } from "lucide-react";
import { Toast } from "@/utils/toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

export default function ShareButton({
  product,
}: {
  product: Product;
}) {
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
        await navigator.clipboard.writeText(
          window.location.href
        );
        Toast.fire({
          icon: "success",
          title: t("share_success"),
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
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
    >
      <div className="p-2 rounded-lg bg-muted hover:bg-muted transition-colors">
        <Share2 className="w-4 h-4" />
      </div>
      <span>{t("share")}</span>
    </motion.button>
  );
}
