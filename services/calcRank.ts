import {
  ApplicationsDailys,
  ApplicationsFixed,
  GC,
} from "@/app/generated/prisma/client";

export type CategoryRank = {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
  points: number;
};

export type RankingByCategory = {
  category:
    | "FoodBaskets"
    | "Visitors"
    | "GCPresence"
    | "WorshipPresence"
    | "Serving";
  ranks: CategoryRank[];
};

export const calculateTotalVisitors = (
  dailyApps: ApplicationsDailys[],
): number => {
  return dailyApps.reduce((sum, app) => sum + app.visitors, 0);
};

export const calculatePresencePercentage = (
  dailyApps: ApplicationsDailys[],
  typeFilter: string | number,
  totalMembers: number,
): number => {
  const filteredDays = dailyApps.filter((app) => {
    return app.type === String(typeFilter);
  });

  if (filteredDays.length === 0) return 0;

  const totalPercentage = filteredDays.reduce((sum, app) => {
    const percentage = (app.members / totalMembers) * 100;
    return sum + percentage;
  }, 0);

  return totalPercentage / filteredDays.length;
};

export const calculateServingPercentage = (
  dailyApps: ApplicationsDailys[],
  totalMembers: number,
): number => {
  const servingDays = dailyApps.filter((app) => (app.membersServing ?? 0) > 0);

  if (servingDays.length === 0) return 0;

  const totalPercentage = servingDays.reduce((sum, app) => {
    const percentage = ((app.membersServing ?? 0) / totalMembers) * 100;
    return sum + percentage;
  }, 0);

  return totalPercentage / servingDays.length;
};

export const calculatePoints = (metrics: {
  amountCollected?: number;
  visitors?: number;
  presenceGC?: number;
  presenceCults?: number;
  serving?: number;
}) => {
  const amountCollected = metrics.amountCollected ?? 0;
  const visitors = metrics.visitors ?? 0;
  const presenceGC = metrics.presenceGC ?? 0;
  const presenceCults = metrics.presenceCults ?? 0;
  const serving = metrics.serving ?? 0;

  const pointsAmountCollected = (amountCollected / 50) * 100;

  const pointsVisitors = visitors * 50;
  const pointsPresenceGC = presenceGC;
  const pointsPresenceCults = presenceCults * 2;
  const pointsServing = serving;

  const totalPoints =
    pointsAmountCollected +
    pointsVisitors +
    pointsPresenceGC +
    pointsPresenceCults +
    pointsServing;

  return {
    total: Math.round(totalPoints * 100) / 100,
    breakdown: {
      amountCollected: pointsAmountCollected,
      visitors: pointsVisitors,
      presenceGC: Math.round(pointsPresenceGC * 100) / 100,
      presenceCults: Math.round(pointsPresenceCults * 100) / 100,
      serving: Math.round(pointsServing * 100) / 100,
    },
  };
};

export const processGCWithRanking = (
  gc: GC & {
    applicationsDailys: ApplicationsDailys[];
    applicationsFixeds: ApplicationsFixed;
  },
) => {
  const dailyApps = gc.applicationsDailys;
  const fixedApp = gc.applicationsFixeds;

  const amountCollected = fixedApp?.amountCollected || 0;
  const baskets = amountCollected / 50;
  const visitors = calculateTotalVisitors(dailyApps);
  const presenceGC = calculatePresencePercentage(
    dailyApps,
    "presenceGC",
    gc.applicationsFixeds?.quantityMembers || 0,
  );
  const presenceCults = calculatePresencePercentage(
    dailyApps,
    "presenceCults",
    gc.applicationsFixeds?.quantityMembers || 0,
  );
  const serving = calculateServingPercentage(
    dailyApps,
    gc.applicationsFixeds?.quantityMembers || 0,
  );

  const points = calculatePoints({
    amountCollected,
    visitors,
    presenceGC,
    presenceCults,
    serving,
  });

  return {
    id: gc.id,
    name: gc.name,
    avatar: gc.avatar,
    type: gc.type,
    quantityMembers: gc.applicationsFixeds.quantityMembers,
    points: points.total,
    baskets,
    visitors,
    presenceGC: Math.round(presenceGC * 100) / 100,
    presenceCults: Math.round(presenceCults * 100) / 100,
    serving: Math.round(serving * 100) / 100,
  };
};

const processGCBasics = (
  gc: GC & {
    applicationsDailys: ApplicationsDailys[];
    applicationsFixeds: ApplicationsFixed;
  },
) => {
  const dailyApps = gc.applicationsDailys;
  const fixedApp = gc.applicationsFixeds;

  const amountCollected = fixedApp?.amountCollected || 0;
  const visitors = calculateTotalVisitors(dailyApps);
  const presenceGC = calculatePresencePercentage(
    dailyApps,
    "presenceGC",
    gc.applicationsFixeds?.quantityMembers || 0,
  );
  const presenceCults = calculatePresencePercentage(
    dailyApps,
    "presenceCults",
    gc.applicationsFixeds?.quantityMembers || 0,
  );
  const serving = calculateServingPercentage(
    dailyApps,
    gc.applicationsFixeds?.quantityMembers || 0,
  );

  return {
    id: gc.id,
    name: gc.name,
    avatar: gc.avatar,
    type: gc.type,
    quantityMembers: gc.applicationsFixeds?.quantityMembers || 0,
    amountCollected,
    visitors,
    presenceGC: Math.round(presenceGC * 100) / 100,
    presenceCults: Math.round(presenceCults * 100) / 100,
    serving: Math.round(serving * 100) / 100,
  };
};

export const generateCategoryRankings = (
  gcs: (GC & {
    applicationsDailys: ApplicationsDailys[];
    applicationsFixeds: ApplicationsFixed;
  })[],
): RankingByCategory[] => {
  const processedGCs = gcs.map(processGCBasics);

  const categories: RankingByCategory[] = [
    {
      category: "FoodBaskets",
      ranks: processedGCs
        .map((gc) => ({
          id: gc.id,
          name: gc.name,
          avatar: gc.avatar,
          value: gc.amountCollected,
          points: calculatePoints({ amountCollected: gc.amountCollected })
            .breakdown.amountCollected,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3),
    },
    {
      category: "Visitors",
      ranks: processedGCs
        .map((gc) => ({
          id: gc.id,
          name: gc.name,
          avatar: gc.avatar,
          value: gc.visitors,
          points: calculatePoints({ visitors: gc.visitors }).breakdown.visitors,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3),
    },
    {
      category: "GCPresence",
      ranks: processedGCs
        .map((gc) => ({
          id: gc.id,
          name: gc.name,
          avatar: gc.avatar,
          value: gc.presenceGC,
          points: calculatePoints({ presenceGC: gc.presenceGC }).breakdown
            .presenceGC,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3),
    },
    {
      category: "WorshipPresence",
      ranks: processedGCs
        .map((gc) => ({
          id: gc.id,
          name: gc.name,
          avatar: gc.avatar,
          value: gc.presenceCults,
          points: calculatePoints({ presenceCults: gc.presenceCults }).breakdown
            .presenceCults,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3),
    },
    {
      category: "Serving",
      ranks: processedGCs
        .map((gc) => ({
          id: gc.id,
          name: gc.name,
          avatar: gc.avatar,
          value: gc.serving,
          points: calculatePoints({ serving: gc.serving }).breakdown.serving,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3),
    },
  ];

  return categories;
};
