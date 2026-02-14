export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: string;
  phone: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  paymentStatus: 'unpaid' | 'paid' | 'partially_paid';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}
