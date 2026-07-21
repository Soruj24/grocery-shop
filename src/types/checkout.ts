export interface GuestInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city?: string;
  area?: string;
  isDefault?: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: string;
}

export interface DeliverySlot {
  id: string;
  label: string;
  time: string;
  icon: string;
  available: boolean;
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requiresTransactionId: boolean;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  email?: string;
  address: string;
}

export type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

export interface CheckoutCartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  stock?: number;
}

export interface AppliedCoupon {
  code: string;
  discount: number;
  discountType?: string;
  discountValue?: number;
}

export interface CheckoutState {
  currentStep: number;
  isGuest: boolean;
  guestInfo: GuestInfo;
  selectedAddress: SavedAddress | null;
  customAddress: string;
  customName: string;
  customPhone: string;
  shippingMethod: ShippingMethod;
  deliverySlot: DeliverySlot;
  paymentMethod: PaymentMethod;
  transactionId: string;
  appliedCoupon: AppliedCoupon | null;
  isSubmitting: boolean;
  isComplete: boolean;
  error: string | null;
  orderId: string | null;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Delivered within 2-3 days",
    price: 50,
    estimatedDays: "2-3 days",
    icon: "truck",
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "Delivered within 1 day",
    price: 100,
    estimatedDays: "1 day",
    icon: "zap",
  },
  {
    id: "sameday",
    name: "Same Day Delivery",
    description: "Delivered today within 4 hours",
    price: 150,
    estimatedDays: "Today",
    icon: "clock",
  },
];

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive",
    icon: "banknote",
    color: "text-success",
    requiresTransactionId: false,
  },
  {
    id: "bkash",
    name: "bKash",
    description: "Mobile financial service",
    icon: "smartphone",
    color: "text-pink-500",
    requiresTransactionId: true,
  },
  {
    id: "nagad",
    name: "Nagad",
    description: "Mobile financial service",
    icon: "smartphone",
    color: "text-orange-500",
    requiresTransactionId: true,
  },
  {
    id: "card",
    name: "Card Payment",
    description: "Visa, Mastercard, Amex",
    icon: "credit-card",
    color: "text-blue-500",
    requiresTransactionId: true,
  },
];

export const DELIVERY_SLOTS: DeliverySlot[] = [
  { id: "morning", label: "Morning", time: "9:00 AM - 12:00 PM", icon: "sun", available: true },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM - 3:00 PM", icon: "sun-dim", available: true },
  { id: "evening", label: "Evening", time: "3:00 PM - 6:00 PM", icon: "sunset", available: true },
  { id: "night", label: "Night", time: "6:00 PM - 9:00 PM", icon: "moon", available: true },
];
