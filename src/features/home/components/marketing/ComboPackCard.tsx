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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-info rounded-2xl opacity-20 group-hover:opacity-100 blur transition duration-500" />
      <div className="relative h-full bg-card rounded-2xl p-8 md:p-10 overflow-hidden flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 relative">
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-info/10 rounded-full animate-pulse" />
            <div className="absolute inset-4 grid grid-cols-2 gap-2 group-hover:rotate-3 transition-transform duration-500 ease-in-out">
              {combo.items.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="relative bg-card rounded-2xl p-2 shadow-sm overflow-hidden border border-border group-hover:scale-105 transition-transform duration-500 delay-50"
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
            <div className="absolute -top-2 -right-2 bg-danger text-danger-foreground text-xs font-black px-3 py-1.5 rounded-full shadow-sm rotate-12 z-10 uppercase tracking-wider">
              Save {t("currency_symbol")}
              {combo.saveAmount.toLocaleString("bn-BD")}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col h-full text-center md:text-left">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle text-accent-subtle-foreground text-[10px] font-black uppercase tracking-widest mb-3">
              <Zap size={12} className="fill-current" />
              {combo.tag}
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2 leading-tight">
              {combo.name}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              {combo.items.length} items included
            </p>
          </div>

          <div className="flex-1 space-y-3 mb-8">
            {combo.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-bold text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="line-clamp-1 text-left">{item}</span>
              </div>
            ))}
            {combo.items.length > 3 && (
              <div className="text-xs font-bold text-muted-foreground pl-6 text-left">
                + {(combo.items.length - 3).toLocaleString("bn-BD")} more
                items...
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            <div className="flex items-end justify-between md:justify-start gap-4 mb-4">
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold text-muted-foreground line-through">
                  {t("currency_symbol")}
                  {(combo.price + combo.saveAmount).toLocaleString("bn-BD")}
                </span>
                <span className="text-3xl font-black text-accent">
                  {t("currency_symbol")}
                  {combo.price.toLocaleString("bn-BD")}
                </span>
              </div>
            </div>

            <Link
              href="/products"
              className="w-full py-4 rounded-md bg-foreground text-background font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-accent-foreground transition-all shadow-sm hover:shadow-lg flex items-center justify-center gap-2 group/btn relative overflow-hidden"
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
