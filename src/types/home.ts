import { Category } from "./category";
import { Product } from "./product";

export interface HomeSection {
  _id: string;
  key: string;
  label: string;
  component: string;
  order: number;
  isActive: boolean;
  props?: Record<string, unknown>;
}

export interface HomeData {
  categories: Category[];
  products: Product[];
  sections: HomeSection[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
  error?: boolean;
}

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};
