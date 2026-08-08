export interface DailySale {
  _id: string;
  totalSales: number;
  revenue: number;
  orderCount: number;
  orders: number;
  count: number;
}

export interface UserGrowth {
  _id: string;
  newUsers: number;
  count: number;
}

export interface TopProduct {
  _id: string;
  name: string;
  totalSold: number;
  revenue: number;
}

export interface TopCategory {
  _id: string;
  name: string;
  revenue: number;
  totalSold: number;
}

export interface OrderStatusDistribution {
  _id: string;
  count: number;
}

export interface PaymentMethodDistribution {
  _id: string;
  count: number;
  revenue: number;
}

export interface AnalyticsKPI {
  revenue: { total: number; change: number };
  orders: { total: number; change: number };
  aov: { total: number; change: number };
  customers: { total: number; change: number };
  uniqueBuyers: number;
  conversionRate: number;
  retentionRate: number;
  activeProducts: number;
}

export interface AdminAnalytics {
  range: string;
  period: { from: string; to: string };
  kpi: AnalyticsKPI;
  revenueTrend: DailySale[];
  orderTrend: DailySale[];
  customerGrowth: UserGrowth[];
  topProducts: TopProduct[];
  topCategories: TopCategory[];
  orderStatus: OrderStatusDistribution[];
  paymentMethods: PaymentMethodDistribution[];
  dailySales: DailySale[];
}
