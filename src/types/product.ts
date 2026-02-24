export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: {
    _id?: string;
    name: string;
  };
  image?: string;
  description?: string;
  unit?: string;
  discount?: number;
  rating?: number;
  reviews?: number;
  discountPrice?: number;
  createdAt?: string;
  updatedAt?: string;
}
