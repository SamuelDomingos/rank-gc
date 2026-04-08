export type MetricValue<T = number> = {
  current: T;
  previous: T;
  comparative: number;
};

export type Metrics<T = number> = {
  amountCollected: MetricValue<T>;
  visitors: MetricValue<T>;
  gcAttendance: MetricValue<T>;
  serviceAttendance: MetricValue<T>;
  serving: MetricValue<T>;
};

export type DashboardStats = {
  totalGcs: number;
  totalMembers: number;
  totalamountCollected: number;
  totalVisitors: number;
  membersServing: number;
};

export interface GCBase<T = number> {
  id: string;
  gc: string;
  metrics: Metrics<T>;
}

export type Gender = "masculine" | "feminine";

export type ComparativeData = Record<Gender, GCBase<number>[]>;

export type GCWithMetrics = GCBase<number | string>;
