"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import ProductCard from "@/features/products/components/ProductCard";
import { Skeleton } from "@/components/ui";
import { Reveal } from "./SectionShell";

interface ProductRowProps {
  sort?: string;
  tag?: "deals" | "popular" | "new";
  category?: string;
  limit?: number;
  columns?: 2 | 3 | 4 | 5;
  skeletonCount?: number;
}

const colClass: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

export default function ProductRow({
  sort = "newest",
  tag,
  category,
  limit = 8,
  columns = 4,
  skeletonCount,
}: ProductRowProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["home-product-row", sort, tag, category, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("sort", sort);
      params.set("limit", String(limit));
      if (tag) params.set("tag", tag);
      if (category) params.set("category", category);
      const res = await fetch(`/api/products/list?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load products");
      const json = await res.json();
      return (json.products ?? []) as Product[];
    },
  });

  const count = skeletonCount ?? limit;

  if (isLoading) {
    return (
      <div className={`grid gap-6 lg:gap-8 ${colClass[columns]}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-xl border border-border bg-card"
          >
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className={`grid gap-6 lg:gap-8 ${colClass[columns]}`}>
      {data.map((product, idx) => (
        <Reveal key={product._id} delay={Math.min(idx * 0.05, 0.4)}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
