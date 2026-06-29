"use client";

import { useGetAdminStatsQuery, useGetAdminAnalyticsQuery } from "@/redux/apiSlice";

export function useAdminDashboard() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetAdminStatsQuery();

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useGetAdminAnalyticsQuery();

  return {
    stats,
    analytics,
    loading: statsLoading || analyticsLoading,
    error: statsError || analyticsError,
  };
}
