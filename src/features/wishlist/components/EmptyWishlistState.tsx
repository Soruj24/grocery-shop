"use client";

import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmptyState, Button } from "@/components/ui";

export default function EmptyWishlistState() {
  const { t } = useLanguage();

  return (
    <EmptyState
      icon={<Heart className="w-8 h-8" />}
      title={t('empty_wishlist_title')}
      description={t('empty_wishlist_desc')}
      size="lg"
      action={
        <Link href="/products">
          <Button variant="primary" size="lg" rightIcon={<ChevronRight className="w-6 h-6" />}>
            {t('browse_products')}
          </Button>
        </Link>
      }
    />
  );
}
