import {
  ComparativeData,
  DashboardStats,
} from "@/app/api/report/services/index.service";

export const getDashboardStats = async (
  month: number,
  year: number,
): Promise<DashboardStats> => {
  const response = await fetch(
    `/api/report/generalReports?month=${month}&year=${year}`,
    {
      method: "GET",
    },
  );
  return response.json();
};

export const getComparative = async (
  previousMonth: number,
  previousYear: number,
  currentMonth: number,
  currentYear: number,
): Promise<ComparativeData> => {
  const response = await fetch(
    `/api/report/comparative?previousMonth=${previousMonth}&previousYear=${previousYear}&currentMonth=${currentMonth}&currentYear=${currentYear}`,
    {
      method: "GET",
    },
  );
  return response.json();
};
