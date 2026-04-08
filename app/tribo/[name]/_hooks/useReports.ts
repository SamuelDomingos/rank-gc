import { useDate } from "@/context/DateContext";
import { useFetch } from "@/hooks/useFetch";
import { getComparative, getDashboardStats } from "@/lib/api/reports";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export const useDashboardStats = (
  month: number,
  year: number,
  tribo: string,
) => {
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

export const useComparative = () => {
  const params = useParams();
  const tribo = params.name as string;

  const currentDate = new Date();
  const [previousMonth, setPreviousMonth] = useState(
    currentDate.getMonth() - 1,
  );
  const [previousYear, setPreviousYear] = useState(
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear(),
  );

  const { month: currentMonth, year: currentYear } = useDate();

  const fetchOptions = useMemo(
    () => ({
      auto: true,
      defaultArgs: [
        previousMonth,
        previousYear,
        currentMonth,
        currentYear,
        tribo,
      ],
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
    previousMonth,
    previousYear,
    setPreviousMonth,
    setPreviousYear,
    data,
    isLoading,
    error,
  };
};
