export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  isActive?: boolean;
  products?: any[];
  subCategories?: Category[];
}
