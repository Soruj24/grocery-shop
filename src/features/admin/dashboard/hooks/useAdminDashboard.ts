"use client";

import { useGetDashboardStatsQuery, useGetDashboardAnalyticsQuery } from "@/redux/apiSlice";

export function useAdminDashboard() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetDashboardStatsQuery();

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useGetDashboardAnalyticsQuery();

  return {
    stats,
    analytics,
    loading: statsLoading || analyticsLoading,
    error: statsError || analyticsError,
  };
}
