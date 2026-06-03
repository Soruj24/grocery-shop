import { AdminProduct, AdminProductFormData } from "@/types/admin";

export const EMPTY_PRODUCT_FORM: AdminProductFormData = {
  name: "",
  price: 0,
  stock: 0,
  unit: "pcs",
  category: "",
  image: "",
  description: "",
  isActive: true,
  discount: 0,
  discountPrice: 0,
  isDeal: false,
  isPopular: false,
  isNewArrival: false,
};

export function productToFormData(product: AdminProduct): AdminProductFormData {
  return {
    name: product.name,
    price: product.price,
    stock: product.stock,
    unit: product.unit || "pcs",
    category: typeof product.category === "string" ? product.category : product.category?._id || "",
    image: product.image || "",
    description: product.description || "",
    isActive: product.isActive,
    discount: product.discount || 0,
    discountPrice: product.discountPrice || 0,
    isDeal: product.isDeal || false,
    isPopular: product.isPopular || false,
    isNewArrival: product.isNewArrival || false,
  };
}

export function resetForm(): AdminProductFormData {
  return { ...EMPTY_PRODUCT_FORM };
}
