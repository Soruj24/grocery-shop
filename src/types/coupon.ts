export interface Coupon {
  code: string;
  discount: number;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  message?: string;
}
