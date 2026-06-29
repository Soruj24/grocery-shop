"use client";

import { useState, useEffect } from "react";

export interface Combo {
  _id: string;
  name: string;
  items: string[];
  price: number;
  saveAmount: number;
  tag: string;
  isActive: boolean;
}

export function useCombos() {
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

  return { combos, loading };
}
