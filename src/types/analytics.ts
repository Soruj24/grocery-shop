export interface DailySale {
  _id: string;
  totalSales: number;
}

export interface UserGrowth {
  _id: string;
  newUsers: number;
}

export interface TopProduct {
  _id: string;
  name: string;
  totalSold: number;
  revenue: number;
}

export interface OrderStatusDistribution {
  _id: string;
  count: number;
}

export interface AdminAnalytics {
  dailySales: DailySale[];
  userGrowth: UserGrowth[];
  topProducts: TopProduct[];
  orderStatus: OrderStatusDistribution[];
}
