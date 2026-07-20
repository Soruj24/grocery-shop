"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryMapProps {
  categories: ICategory[];
}

export default function CategoryMap({ categories }: CategoryMapProps) {
  const { t } = useLanguage();

  return (
    <section className="relative bg-card backdrop-blur-xl rounded-2xl p-12 md:p-20 border border-border shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {t('category_map_title')}
          </h2>
          <p className="text-muted-foreground font-bold max-w-2xl mx-auto">
            {t('category_map_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {categories.map((cat: ICategory) => (
            <div key={cat._id} className="space-y-6 group/item">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary group-hover/item:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <Link
                  href={`/category/${cat._id}`}
                  className="text-xl font-black text-foreground hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              </div>

              <div className="space-y-3 pl-16 border-l-2 border-border">
                {cat.subCategories?.map((sub: ICategory) => (
                  <Link
                    key={sub._id}
                    href={`/category/${sub._id}`}
                    className="block text-sm font-bold text-muted-foreground hover:text-primary transition-all hover:translate-x-2"
                  >
                    • {sub.name}
                  </Link>
                ))}
                <Link
                  href={`/category/${cat._id}`}
                  className="block text-xs font-black text-primary uppercase tracking-widest pt-2 hover:opacity-70"
                >
                  {t('view_all_arrow')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
