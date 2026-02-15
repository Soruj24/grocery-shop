export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: {
    _id?: string;
    name: string;
    nameEn?: string;
  };
  image?: string;
  description?: string;
  descriptionEn?: string;
  nameEn?: string;
  unit?: string;
  discount?: number;
  rating?: number;
  reviews?: number;
  discountPrice?: number;
}
