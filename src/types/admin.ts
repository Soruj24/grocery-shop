export interface AdminCategory {
  _id: string;
  name: string;
  slug: string;
  parentId?: string | { _id: string; name: string };
  isActive?: boolean;
  image?: string;
}

export interface AdminCategoryFormData {
  name: string;
  isActive: boolean;
  parentId: string;
  image: string;
}

export interface AdminProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  category: string | AdminCategory;
  image: string;
  description: string;
  isActive: boolean;
}

export interface AdminProductFormData {
  name: string;
  price: number;
  stock: number;
  unit: string;
  category: string;
  image: string;
  description: string;
  isActive: boolean;
}

export interface AdminOrder {
  _id: string;
  items: Array<{
    _id: string;
    name: string;
    price: number;
    quantity: number;
    product: {
      image?: string;
    };
  }>;
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled" | "processing" | "shipped";
  address: string;
  phone: string;
  createdAt: string;
  paymentMethod?: string;
  transactionId?: string;
  deliveryStatus?: string;
  trackingId?: string;
  deliveryBoy?: {
    name: string;
    phone: string;
  };
  coupon?: {
    code: string;
    discount: number;
  };
  customer?: {
    name: string;
    email: string;
  } | string;
}

export interface AdminCoupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  expiryDate: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface AdminCouponFormData {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  expiryDate: string;
  usageLimit?: number;
  isActive: boolean;
}

export interface AdminStats {
  customerCount: number;
  productCount: number;
  todayOrderCount: number;
  todayRevenue: number;
  recentOrders: AdminOrder[];
}

export interface AdminCustomer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  orderCount?: number;
  totalSpent?: number;
}

export interface AdminCombo {
  _id: string;
  name: string;
  items: string[];
  price: number;
  saveAmount: number;
  tag: string;
  isActive: boolean;
}

export interface AdminComboFormData {
  name: string;
  items: string;
  price: number;
  saveAmount: number;
  tag: string;
  isActive: boolean;
}

export interface GroupedCategory {
  _id: string;
  name: string;
  subCategories?: AdminCategory[];
}
