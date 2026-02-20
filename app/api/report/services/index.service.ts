import prisma from "@/lib/prisma";
import {
  calculatePresencePercentage,
  calculateServingPercentage,
  calculateTotalVisitors,
} from "../../gc/services/calcRank.service";

export type DashboardStats = {
  totalGcs: number;
  totalMembers: number;
  totalamountCollected: number;
  totalVisitors: number;
  membersServing: number;
};

export type ComparativeData = {
  masculine: {
    id: string;
    gc: string;
    metrics: {
      amountCollected: { current: number; previous: number; comparative: number };
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
      amountCollected: { current: number; previous: number; comparative: number };
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
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const [totalGcs, dailyStats, fixedStats, totalMembers] = await Promise.all([
    prisma.gC.count({
      where: {
        tribo: tribo,
      },
    }),
    prisma.applicationsDailys.aggregate({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        gc: {
          tribo: tribo,
        },
      },
      _sum: {
        members: true,
        visitors: true,
        membersServing: true,
      },
    }),
    prisma.applicationsFixed.aggregate({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        gc: {
          tribo: tribo,
        },
      },
      _sum: {
        amountCollected: true,
      },
    }),
    prisma.gC.aggregate({
      where: {
        tribo: tribo,
      },
      _sum: {
        quantity: true,
      },
    }),
  ]);

  return {
    totalGcs,
    totalMembers: totalMembers._sum.quantity ?? 0,
    totalVisitors: dailyStats._sum.visitors ?? 0,
    membersServing: dailyStats._sum.membersServing ?? 0,
    totalamountCollected: fixedStats._sum.amountCollected ?? 0,
  };
};

export const getComparative = async (
  currentMonth: number,
  currentYear: number,
  previousMonth: number,
  previousYear: number,
  tribo: string,
): Promise<ComparativeData> => {
  const currentStart = new Date(currentYear, currentMonth - 1, 1);
  const currentEnd = new Date(currentYear, currentMonth, 0);

  const previousStart = new Date(previousYear, previousMonth - 1, 1);
  const previousEnd = new Date(previousYear, previousMonth, 0);

  const [currentGcs, previousGcs] = await Promise.all([
    prisma.gC.findMany({
      where: { tribo },
      select: {
        id: true,
        name: true,
        type: true,
        quantity: true,
        applicationsDailys: {
          where: { date: { gte: currentStart, lte: currentEnd } },
          select: {
            type: true,
            members: true,
            visitors: true,
            membersServing: true,
          },
        },
        applicationsFixeds: {
          where: { date: { gte: currentStart, lte: currentEnd } },
          select: { amountCollected: true },
        },
      },
    }),
    prisma.gC.findMany({
      where: { tribo },
      select: {
        id: true,
        quantity: true,
        applicationsDailys: {
          where: { date: { gte: previousStart, lte: previousEnd } },
          select: {
            type: true,
            members: true,
            visitors: true,
            membersServing: true,
          },
        },
        applicationsFixeds: {
          where: { date: { gte: previousStart, lte: previousEnd } },
          select: { amountCollected: true },
        },
      },
    }),
  ]);

  const buildList = (type: string) => {
    return currentGcs
      .filter((gc) => gc.type === type)
      .map((gc) => {
        const normalizeDailyApps = (
          apps: {
            type: string;
            members: number;
            visitors: number;
            membersServing: number | null;
          }[],
        ): any[] =>
          apps.map((a) => ({ ...a, membersServing: a.membersServing ?? 0 }));

        const prev = previousGcs.find((p) => p.id === gc.id);
        const prevFixedApps = prev?.applicationsFixeds ?? [];
        const currentDailyApps = normalizeDailyApps(gc.applicationsDailys);
        const prevDailyApps = normalizeDailyApps(
          prev?.applicationsDailys ?? [],
        );
        const prevQuantity = prev?.quantity ?? gc.quantity;

        const currentVisitors = calculateTotalVisitors(currentDailyApps);
        const prevVisitors = calculateTotalVisitors(prevDailyApps);

        const currentPresenceGC = calculatePresencePercentage(
          currentDailyApps,
          "presenceGC",
          gc.quantity,
        );
        const prevPresenceGC = calculatePresencePercentage(
          prevDailyApps,
          "presenceGC",
          prevQuantity,
        );

        const currentPresenceCults = calculatePresencePercentage(
          currentDailyApps,
          "presenceCults",
          gc.quantity,
        );
        const prevPresenceCults = calculatePresencePercentage(
          prevDailyApps,
          "presenceCults",
          prevQuantity,
        );

        const currentServing = calculateServingPercentage(
          currentDailyApps,
          gc.quantity,
        );
        const prevServing = calculateServingPercentage(
          prevDailyApps,
          prevQuantity,
        );

        const currentamountCollected = gc.applicationsFixeds.reduce(
          (s, a) => s + (a?.amountCollected ?? 0),
          0,
        );
        const prevamountCollected = prevFixedApps.reduce(
          (s, a) => s + (a?.amountCollected ?? 0),
          0,
        );

        return {
          id: gc.id,
          gc: gc.name,
          metrics: {
            amountCollected: {
              current: currentamountCollected,
              previous: prevamountCollected,
              comparative: currentamountCollected - prevamountCollected,
            },
            visitors: {
              current: currentVisitors,
              previous: prevVisitors,
              comparative: currentVisitors - prevVisitors,
            },
            gcAttendance: {
              current: `${Math.round(currentPresenceGC * 100) / 100}`,
              previous: `${Math.round(prevPresenceGC * 100) / 100}`,
              comparative:
                Math.round((currentPresenceGC - prevPresenceGC) * 100) / 100,
            },
            serviceAttendance: {
              current: `${Math.round(currentPresenceCults * 100) / 100}`,
              previous: `${Math.round(prevPresenceCults * 100) / 100}`,
              comparative:
                Math.round((currentPresenceCults - prevPresenceCults) * 100) /
                100,
            },
            serving: {
              current: `${Math.round(currentServing * 100) / 100}`,
              previous: `${Math.round(prevServing * 100) / 100}`,
              comparative:
                Math.round((currentServing - prevServing) * 100) / 100,
            },
          },
        };
      });
  };

  return {
    masculine: buildList("masculine"),
    feminine: buildList("feminine"),
  };
};
