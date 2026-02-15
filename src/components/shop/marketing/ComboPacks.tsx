"use client";

import { CheckCircle2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";

interface Combo {
  _id: string;
  name: string;
  items: string[];
  price: number;
  saveAmount: number;
  tag: string;
  isActive: boolean;
}

export default function ComboPacks() {
  const { t } = useLanguage();
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await fetch("/api/admin/combos");
        if (res.ok) {
          const data = await res.json();
          setCombos(data.filter((c: Combo) => c.isActive));
        }
      } catch (error) {
        console.error("Failed to fetch combos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCombos();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="w-8 h-8 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (combos.length === 0) return null;

  return (
    <section className="py-16">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
            {t('combo_packs_title')}<span className="text-green-600">{t('combo_packs_title_accent')}</span>
          </h2>
          <p className="text-gray-500 font-bold">
            {t('combo_packs_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((combo) => (
            <div
              key={combo._id}
              className="relative bg-white dark:bg-white/5 rounded-32px p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {combo.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                      {combo.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-green-600">
                      {t('currency_symbol')}{combo.price}
                    </div>
                    <div className="text-xs font-bold text-orange-500">
                      {t('currency_symbol')}{combo.saveAmount} {t('combo_packs_save')}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {combo.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-bold"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/products"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-600/20 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('combo_packs_buy_now')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
