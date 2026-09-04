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
  discount?: number;
  discountPrice?: number;
  isDeal?: boolean;
  isPopular?: boolean;
  isNewArrival?: boolean;
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
  discount?: number;
  discountPrice?: number;
  isDeal?: boolean;
  isPopular?: boolean;
  isNewArrival?: boolean;
  variants?: Array<{
    name: string;
    options: Array<{
      label: string;
      price?: number;
      stock?: number;
      image?: string;
    }>;
  }>;
  shipping?: {
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    shippingClass?: string;
    freeShipping?: boolean;
    estimatedDays?: number;
  };
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
  name?: string;
  createdAt: string;
  paymentMethod?: string;
  paymentStatus?: "unpaid" | "paid" | "partially_paid";
  transactionId?: string;
  deliveryMethod?: string;
  deliverySlot?: string;
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
  guestInfo?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  user?: string;
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
  totalOrders: number;
  totalRevenue: number;
  recentOrders: AdminOrder[];
}

export interface AdminCustomer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  loyaltyPoints?: number;
  orderCount?: number;
  totalSpent?: number;
  lastOrderDate?: string | null;
  subscription?: {
    plan: string;
    nextDelivery?: string;
    isActive: boolean;
  };
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
