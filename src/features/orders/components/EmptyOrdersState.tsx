"use client";

import { Package } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmptyState, Button } from "@/components/ui";

export default function EmptyOrdersState() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={<Package className="w-8 h-8" />}
        title={t('no_orders_found')}
        description={t('no_orders_desc')}
        action={
          <Link href="/products">
            <Button variant="primary" size="lg">
              {t('shop_now_btn')}
            </Button>
          </Link>
        }
      />
    </div>
  );
}
