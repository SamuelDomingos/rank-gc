import { useFetch } from "@/hooks/useFetch";
import { getComparative, getDashboardStats } from "@/lib/api/reports";
import { useMemo } from "react";

export const useDashboardStats = (month: number, year: number, tribo: string) => {
  const fetchOptions = useMemo(
    () => ({
      auto: true,
      defaultArgs: [month, year, tribo],
    }),
    [month, year, tribo],
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
  tribo: string,
) => {
  const fetchOptions = useMemo(
    () => ({
      auto: true,
      defaultArgs: [previousMonth, previousYear, currentMonth, currentYear, tribo],
    }),
    [previousMonth, previousYear, currentMonth, currentYear, tribo],
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
