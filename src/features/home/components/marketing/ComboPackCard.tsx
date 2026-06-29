"use client";

import { CheckCircle2, Zap, ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Combo } from "@/features/home/hooks/useCombos";

interface ComboPackCardProps {
  combo: Combo;
  index: number;
}

export default function ComboPackCard({ combo, index }: ComboPackCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      key={combo._id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] opacity-20 group-hover:opacity-100 blur transition duration-500" />
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 overflow-hidden flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 relative">
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 grid grid-cols-2 gap-2 group-hover:rotate-3 transition-transform duration-500 ease-in-out">
              {combo.items.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm overflow-hidden border border-gray-100 dark:border-white/5 group-hover:scale-105 transition-transform duration-500 delay-50"
                >
                  <Image
                    src={getProductFallbackImage(item)}
                    alt={item}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30 rotate-12 z-10 uppercase tracking-wider">
              Save {t("currency_symbol")}
              {combo.saveAmount.toLocaleString("bn-BD")}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col h-full text-center md:text-left">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest mb-3">
              <Zap size={12} className="fill-current" />
              {combo.tag}
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
              {combo.name}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {combo.items.length} items included
            </p>
          </div>

          <div className="flex-1 space-y-3 mb-8">
            {combo.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span className="line-clamp-1 text-left">{item}</span>
              </div>
            ))}
            {combo.items.length > 3 && (
              <div className="text-xs font-bold text-gray-400 pl-6 text-left">
                + {(combo.items.length - 3).toLocaleString("bn-BD")} more
                items...
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
            <div className="flex items-end justify-between md:justify-start gap-4 mb-4">
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold text-gray-400 line-through">
                  {t("currency_symbol")}
                  {(combo.price + combo.saveAmount).toLocaleString("bn-BD")}
                </span>
                <span className="text-3xl font-black text-purple-600 dark:text-purple-400">
                  {t("currency_symbol")}
                  {combo.price.toLocaleString("bn-BD")}
                </span>
              </div>
            </div>

            <Link
              href="/products"
              className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs hover:bg-purple-600 dark:hover:bg-purple-400 hover:text-white transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                {t("view_deal")}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
