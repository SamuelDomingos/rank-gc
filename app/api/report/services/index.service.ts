import prisma from "@/lib/prisma";

export type DashboardStats = {
  totalGcs: number;
  totalMembers: number;
  totalBaskets: number;
  totalVisitors: number;
  membersServing: number;
};

export type ComparativeData = {
  masculine: {
    id: string;
    gc: string;
    metrics: {
      totalPoints: { current: number; previous: number; comparative: number };
      baskets: { current: number; previous: number; comparative: number };
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
      totalPoints: { current: number; previous: number; comparative: number };
      baskets: { current: number; previous: number; comparative: number };
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
        baskets: true,
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
    totalBaskets: fixedStats._sum.baskets ?? 0,
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
      where: {
        tribo: tribo,
      },
      select: {
        id: true,
        name: true,
        type: true,
        applicationsDailys: {
          where: { date: { gte: currentStart, lte: currentEnd } },
          select: { members: true, visitors: true, membersServing: true },
        },
        applicationsFixeds: {
          where: { date: { gte: currentStart, lte: currentEnd } },
          select: { baskets: true },
        },
      },
    }),
    prisma.gC.findMany({
      where: {
        tribo: tribo,
      },
      select: {
        id: true,
        applicationsDailys: {
          where: { date: { gte: previousStart, lte: previousEnd } },
          select: { members: true, visitors: true, membersServing: true },
        },
        applicationsFixeds: {
          where: { date: { gte: previousStart, lte: previousEnd } },
          select: { baskets: true },
        },
      },
    }),
  ]);

  const buildList = (type: string) => {
    return currentGcs
      .filter((gc) => gc.type === type)
      .map((gc) => {
        const prev = previousGcs.find((p) => p.id === gc.id);

        const sum = <T>(arr: T[], fn: (item: T) => number) =>
          arr.reduce((s, i) => s + fn(i), 0);

        const currentMembers = sum(gc.applicationsDailys, (a) => a.members);
        const currentVisitors = sum(gc.applicationsDailys, (a) => a.visitors);
        const currentServing = sum(
          gc.applicationsDailys,
          (a) => a.membersServing ?? 0,
        );
        const currentBaskets = sum(gc.applicationsFixeds, (a) => a.baskets);

        const prevMembers = sum(
          prev?.applicationsDailys ?? [],
          (a) => a.members,
        );
        const prevVisitors = sum(
          prev?.applicationsDailys ?? [],
          (a) => a.visitors,
        );
        const prevServing = sum(
          prev?.applicationsDailys ?? [],
          (a) => a.membersServing ?? 0,
        );
        const prevBaskets = sum(
          prev?.applicationsFixeds ?? [],
          (a) => a.baskets,
        );

        const currentServingPct =
          currentMembers > 0 ? (currentServing / currentMembers) * 100 : 0;

        const prevServingPct =
          prevMembers > 0 ? (prevServing / prevMembers) * 100 : 0;

        return {
          id: gc.id,
          gc: gc.name,
          metrics: {
            totalPoints: {
              current: currentMembers + currentVisitors + currentBaskets,
              previous: prevMembers + prevVisitors + prevBaskets,
              comparative:
                currentMembers +
                currentVisitors +
                currentBaskets -
                (prevMembers + prevVisitors + prevBaskets),
            },

            baskets: {
              current: currentBaskets,
              previous: prevBaskets,
              comparative: currentBaskets - prevBaskets,
            },

            visitors: {
              current: currentVisitors,
              previous: prevVisitors,
              comparative: currentVisitors - prevVisitors,
            },

            gcAttendance: {
              current: `${currentMembers}`,
              previous: `${prevMembers}`,
              comparative: currentMembers - prevMembers,
            },

            serviceAttendance: {
              current: `${currentServing}`,
              previous: `${prevServing}`,
              comparative: currentServing - prevServing,
            },

            serving: {
              current: `${Math.round(currentServingPct)}`,
              previous: `${Math.round(prevServingPct)}`,
              comparative: Math.round(currentServingPct - prevServingPct),
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
