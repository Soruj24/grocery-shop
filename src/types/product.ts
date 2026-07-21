export interface ProductVariantOption {
  label: string;
  price?: number;
  stock?: number;
  image?: string;
}

export interface ProductVariant {
  name: string;
  options: ProductVariantOption[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductQuestion {
  question: string;
  answer?: string;
  user?: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  brand?: string;
  price: number;
  stock: number;
  category?: {
    _id?: string;
    name: string;
  };
  image?: string;
  images?: string[];
  video?: string;
  view360?: string[];
  description?: string;
  unit?: string;
  discount?: number;
  rating?: number;
  reviews?: number;
  discountPrice?: number;
  isDeal?: boolean;
  isPopular?: boolean;
  isNewArrival?: boolean;
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
  questions?: ProductQuestion[];
  aiSummary?: string;
  createdAt?: string;
  updatedAt?: string;
}
