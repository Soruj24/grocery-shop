export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
}

export type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

export interface CheckoutCartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
