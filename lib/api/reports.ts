type DashboardStats = {
  totalGcs: number;
  totalMembers: number;
  totalamountCollected: number;
  totalVisitors: number;
  membersServing: number;
};

type ComparativeData = {
  masculine: {
    id: string;
    gc: string;
    metrics: {
      amountCollected: {
        current: number;
        previous: number;
        comparative: number;
      };
      visitors: { current: number; previous: number; comparative: number };
      gcAttendance: { current: string; previous: string; comparative: number };
      serviceAttendance: {
        current: string;
        previous: string;
        comparative: number;
      };
      serving: { current: string; previous: string; comparative: number };
    };
  }[];
  feminine: {
    id: string;
    gc: string;
    metrics: {
      amountCollected: {
        current: number;
        previous: number;
        comparative: number;
      };
      visitors: { current: number; previous: number; comparative: number };
      gcAttendance: { current: string; previous: string; comparative: number };
      serviceAttendance: {
        current: string;
        previous: string;
        comparative: number;
      };
      serving: { current: string; previous: string; comparative: number };
    };
  }[];
};

export const getDashboardStats = async (
  month: number,
  year: number,
  tribo: string,
): Promise<DashboardStats> => {
  const response = await fetch(
    `/api/report/generalReports?month=${month}&year=${year}&tribo=${tribo}`,
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
  tribo: string,
): Promise<ComparativeData> => {
  const response = await fetch(
    `/api/report/comparative?previousMonth=${previousMonth}&previousYear=${previousYear}&currentMonth=${currentMonth}&currentYear=${currentYear}&tribo=${tribo}`,
    {
      method: "GET",
    },
  );
  return response.json();
};
