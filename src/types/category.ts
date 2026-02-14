export interface Category {
  _id: string;
  name: string;
  nameEn?: string;
  image?: string;
  products?: any[];
  subCategories?: any[];
}
