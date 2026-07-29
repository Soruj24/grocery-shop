import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AdminStats } from "@/types/admin";
import type { AdminAnalytics } from "@/types/analytics";
import type {
  AdminProduct, AdminProductFormData,
  AdminCategory, AdminCategoryFormData,
  AdminOrder,
  AdminCustomer,
  AdminCoupon, AdminCouponFormData,
  AdminCombo, AdminComboFormData,
} from "@/types/admin";

interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "Dashboard", "Analytics",
    "Product", "Category", "Brand", "Order", "Customer",
    "Review", "Return", "Coupon", "Combo",
    "Support", "Notification", "ActivityLog",
    "Campaign", "Role", "Inventory", "Settings", "User",
  ],
  endpoints: (builder) => ({
    // ─── Dashboard ───
    getDashboardStats: builder.query<AdminStats, void>({
      query: () => "/admin/stats",
      providesTags: ["Dashboard"],
    }),
    getDashboardAnalytics: builder.query<AdminAnalytics, void>({
      query: () => "/admin/analytics",
      providesTags: ["Analytics"],
    }),

    // ─── Products ───
    getAdminProducts: builder.query<PaginatedResponse<AdminProduct>, Record<string, string | number | undefined>>({
      query: (params) => ({ url: "/admin/products", params }),
      providesTags: ["Product"],
    }),
    getAdminProduct: builder.query<AdminProduct, string>({
      query: (id) => `/admin/products/${id}`,
      providesTags: (_, __, id) => [{ type: "Product", id }],
    }),
    createAdminProduct: builder.mutation<AdminProduct, AdminProductFormData>({
      query: (body) => ({ url: "/admin/products", method: "POST", body }),
      invalidatesTags: ["Product"],
    }),
    updateAdminProduct: builder.mutation<AdminProduct, { id: string; body: Partial<AdminProductFormData> }>({
      query: ({ id, body }) => ({ url: `/admin/products/${id}`, method: "PUT", body }),
      invalidatesTags: (_, __, { id }) => ["Product", { type: "Product", id }],
    }),
    deleteAdminProduct: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),

    // ─── Categories ───
    getAdminCategories: builder.query<AdminCategory[], void>({
      query: () => "/admin/categories",
      providesTags: ["Category"],
    }),
    createAdminCategory: builder.mutation<AdminCategory, AdminCategoryFormData>({
      query: (body) => ({ url: "/admin/categories", method: "POST", body }),
      invalidatesTags: ["Category"],
    }),
    updateAdminCategory: builder.mutation<AdminCategory, { id: string; body: Partial<AdminCategoryFormData> }>({
      query: ({ id, body }) => ({ url: `/admin/categories/${id}`, method: "PUT", body }),
      invalidatesTags: ["Category"],
    }),
    deleteAdminCategory: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Category"],
    }),

    // ─── Brands ───
    getAdminBrands: builder.query<{ data: { _id: string; name: string; slug: string; isActive: boolean; productCount: number }[] }, void>({
      query: () => "/admin/brands",
      providesTags: ["Brand"],
    }),
    createAdminBrand: builder.mutation<unknown, { name: string; slug: string }>({
      query: (body) => ({ url: "/admin/brands", method: "POST", body }),
      invalidatesTags: ["Brand"],
    }),
    updateAdminBrand: builder.mutation<unknown, { id: string; body: Partial<{ name: string; slug: string; isActive: boolean }> }>({
      query: ({ id, body }) => ({ url: `/admin/brands/${id}`, method: "PUT", body }),
      invalidatesTags: ["Brand"],
    }),
    deleteAdminBrand: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/brands/${id}`, method: "DELETE" }),
      invalidatesTags: ["Brand"],
    }),

    // ─── Orders ───
    getAdminOrders: builder.query<PaginatedResponse<AdminOrder>, Record<string, string | number | undefined>>({
      query: (params) => ({ url: "/admin/orders", params }),
      providesTags: ["Order"],
    }),
    updateAdminOrder: builder.mutation<AdminOrder, { id: string; body: Partial<AdminOrder> }>({
      query: ({ id, body }) => ({ url: `/admin/orders/${id}`, method: "PUT", body }),
      invalidatesTags: ["Order"],
    }),

    // ─── Customers ───
    getAdminCustomers: builder.query<PaginatedResponse<AdminCustomer>, Record<string, string | number | undefined>>({
      query: (params) => ({ url: "/admin/customers", params }),
      providesTags: ["Customer"],
    }),

    // ─── Reviews ───
    getAdminReviews: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/reviews",
      providesTags: ["Review"],
    }),
    updateReviewStatus: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: `/admin/reviews/${id}`, method: "PATCH", body: { status } }),
      invalidatesTags: ["Review"],
    }),

    // ─── Returns ───
    getAdminReturns: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/returns",
      providesTags: ["Return"],
    }),
    updateReturnStatus: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: `/admin/returns/${id}`, method: "PATCH", body: { status } }),
      invalidatesTags: ["Return"],
    }),

    // ─── Coupons ───
    getAdminCoupons: builder.query<{ data: AdminCoupon[] }, void>({
      query: () => "/admin/coupons",
      providesTags: ["Coupon"],
    }),
    createAdminCoupon: builder.mutation<AdminCoupon, AdminCouponFormData>({
      query: (body) => ({ url: "/admin/coupons", method: "POST", body }),
      invalidatesTags: ["Coupon"],
    }),
    updateAdminCoupon: builder.mutation<AdminCoupon, { id: string; body: Partial<AdminCouponFormData> }>({
      query: ({ id, body }) => ({ url: `/admin/coupons/${id}`, method: "PUT", body }),
      invalidatesTags: ["Coupon"],
    }),
    deleteAdminCoupon: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/coupons/${id}`, method: "DELETE" }),
      invalidatesTags: ["Coupon"],
    }),

    // ─── Combos ───
    getAdminCombos: builder.query<{ data: AdminCombo[] }, void>({
      query: () => "/admin/combos",
      providesTags: ["Combo"],
    }),
    createAdminCombo: builder.mutation<AdminCombo, AdminComboFormData>({
      query: (body) => ({ url: "/admin/combos", method: "POST", body }),
      invalidatesTags: ["Combo"],
    }),
    updateAdminCombo: builder.mutation<AdminCombo, { id: string; body: Partial<AdminComboFormData> }>({
      query: ({ id, body }) => ({ url: `/admin/combos/${id}`, method: "PUT", body }),
      invalidatesTags: ["Combo"],
    }),
    deleteAdminCombo: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/combos/${id}`, method: "DELETE" }),
      invalidatesTags: ["Combo"],
    }),

    // ─── Support Tickets ───
    getAdminTickets: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/support",
      providesTags: ["Support"],
    }),
    updateTicket: builder.mutation<void, { id: string; body: Record<string, unknown> }>({
      query: ({ id, body }) => ({ url: `/admin/support/${id}`, method: "PUT", body }),
      invalidatesTags: ["Support"],
    }),

    // ─── Notifications ───
    getAdminNotifications: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/notifications",
      providesTags: ["Notification"],
    }),
    markNotificationRead: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["Notification"],
    }),
    markAllNotificationsRead: builder.mutation<void, void>({
      query: () => ({ url: "/admin/notifications/read-all", method: "POST" }),
      invalidatesTags: ["Notification"],
    }),

    // ─── Activity Logs ───
    getActivityLogs: builder.query<{ data: Record<string, unknown>[] }, Record<string, string | number> | void>({
      query: (params) => ({ url: "/admin/activity-logs", params: params || undefined }),
      providesTags: ["ActivityLog"],
    }),

    // ─── Campaigns (Marketing) ───
    getAdminCampaigns: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/campaigns",
      providesTags: ["Campaign"],
    }),

    // ─── Roles (Permissions) ───
    getAdminRoles: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/roles",
      providesTags: ["Role"],
    }),
    updateAdminRole: builder.mutation<void, { id: string; body: Record<string, unknown> }>({
      query: ({ id, body }) => ({ url: `/admin/roles/${id}`, method: "PUT", body }),
      invalidatesTags: ["Role"],
    }),

    // ─── Users (Admin) ───
    getAdminUsers: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    updateAdminUser: builder.mutation<void, { id: string; body: Record<string, unknown> }>({
      query: ({ id, body }) => ({ url: `/admin/users/${id}`, method: "PUT", body }),
      invalidatesTags: ["User"],
    }),

    // ─── Reports ───
    getSalesReport: builder.query<Record<string, unknown>, Record<string, string | number>>({
      query: (params) => ({ url: "/admin/reports", params }),
      providesTags: ["Dashboard"],
    }),

    // ─── Inventory ───
    getInventoryAlerts: builder.query<{ data: Record<string, unknown>[] }, void>({
      query: () => "/admin/inventory",
      providesTags: ["Inventory"],
    }),

    // ─── Settings ───
    getAdminSettings: builder.query<Record<string, unknown>, void>({
      query: () => "/admin/settings",
      providesTags: ["Settings"],
    }),
    updateAdminSettings: builder.mutation<void, Record<string, unknown>>({
      query: (body) => ({ url: "/admin/settings", method: "PUT", body }),
      invalidatesTags: ["Settings"],
    }),

    // ─── Combos (public) ───
    getCombos: builder.query<AdminCombo[], void>({
      query: () => "/combos",
      providesTags: ["Combo"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery, useGetDashboardAnalyticsQuery,
  useGetAdminProductsQuery, useGetAdminProductQuery,
  useCreateAdminProductMutation, useUpdateAdminProductMutation, useDeleteAdminProductMutation,
  useGetAdminCategoriesQuery, useCreateAdminCategoryMutation,
  useUpdateAdminCategoryMutation, useDeleteAdminCategoryMutation,
  useGetAdminBrandsQuery, useCreateAdminBrandMutation,
  useUpdateAdminBrandMutation, useDeleteAdminBrandMutation,
  useGetAdminOrdersQuery, useUpdateAdminOrderMutation,
  useGetAdminCustomersQuery,
  useGetAdminReviewsQuery, useUpdateReviewStatusMutation,
  useGetAdminReturnsQuery, useUpdateReturnStatusMutation,
  useGetAdminCouponsQuery, useCreateAdminCouponMutation,
  useUpdateAdminCouponMutation, useDeleteAdminCouponMutation,
  useGetAdminCombosQuery, useCreateAdminComboMutation,
  useUpdateAdminComboMutation, useDeleteAdminComboMutation,
  useGetAdminTicketsQuery, useUpdateTicketMutation,
  useGetAdminNotificationsQuery, useMarkNotificationReadMutation, useMarkAllNotificationsReadMutation,
  useGetActivityLogsQuery,
  useGetAdminCampaignsQuery,
  useGetAdminRolesQuery, useUpdateAdminRoleMutation,
  useGetAdminUsersQuery, useUpdateAdminUserMutation,
  useGetSalesReportQuery,
  useGetInventoryAlertsQuery,
  useGetAdminSettingsQuery, useUpdateAdminSettingsMutation,
  useGetCombosQuery,
} = apiSlice;
