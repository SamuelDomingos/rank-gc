import { useFetch } from "@/hooks/useFetch";
import { getComparative, getDashboardStats } from "@/lib/api/reports";
import { useMemo } from "react";

export const useDashboardStats = (month: number, year: number) => {
  const fetchOptions = useMemo(
    () => ({
      auto: true,
      defaultArgs: [month, year],
    }),
    [month, year],
  );

  const {
    execute: getData,
    data,
    isLoading,
    error,
  } = useFetch(getDashboardStats, fetchOptions);

  return {
    getData,
    data,
    isLoading,
    error,
  };
};

export const useComparative = (
  previousMonth: number,
  previousYear: number,
  currentMonth: number,
  currentYear: number,
) => {
  const fetchOptions = useMemo(
    () => ({
      auto: true,
      defaultArgs: [previousMonth, previousYear, currentMonth, currentYear],
    }),
    [previousMonth, previousYear, currentMonth, currentYear],
  );

  const {
    execute: getData,
    data,
    isLoading,
    error,
  } = useFetch(getComparative, fetchOptions);

  return {
    getData,
    data,
    isLoading,
    error,
  };
};
