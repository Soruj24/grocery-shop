export interface Category {
  _id: string;
  name: string;
  nameEn?: string;
  image?: string;
  parentId?: string | null;
  isActive?: boolean;
  products?: any[];
  subCategories?: Category[];
}
