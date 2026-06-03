import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

export type ProductsSearchParams = {
  [key: string]: string | string[] | undefined;
};

export interface ProductsPageData {
  products: Product[];
  categories: Category[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}
