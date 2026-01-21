type DailyApplication = {
  type: string | number;
  members: number;
  visitors: number;
  membersServing: number;
};

type FixedApplication =
  | {
      baskets: number;
    }
  | undefined;

type GC = {
  id: string;
  name: string;
  avatar: string | null;
  type: string;
  quantity: number;
  applicationsDailys: DailyApplication[];
  applicationsFixeds: FixedApplication[];
};

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
  dailyApps: DailyApplication[],
): number => {
  return dailyApps.reduce((sum, app) => sum + app.visitors, 0);
};

export const calculatePresencePercentage = (
  dailyApps: DailyApplication[],
  typeFilter: string | number,
  totalMembers: number,
): number => {
  const filteredDays = dailyApps.filter((app) => {
    if (typeof typeFilter === "number") {
      return app.type === typeFilter || app.type === String(typeFilter);
    }
    return app.type === typeFilter;
  });

  if (filteredDays.length === 0) return 0;

  const totalPercentage = filteredDays.reduce((sum, app) => {
    const percentage = (app.members / totalMembers) * 100;
    return sum + percentage;
  }, 0);

  return totalPercentage / filteredDays.length;
};

export const calculateServingPercentage = (
  dailyApps: DailyApplication[],
  totalMembers: number,
): number => {
  const servingDays = dailyApps.filter((app) => app.membersServing > 0);

  if (servingDays.length === 0) return 0;

  const totalPercentage = servingDays.reduce((sum, app) => {
    const percentage = (app.membersServing / totalMembers) * 100;
    return sum + percentage;
  }, 0);

  return totalPercentage / servingDays.length;
};

export const calculatePoints = (metrics: {
  baskets?: number;
  visitors?: number;
  presenceGC?: number;
  presenceCults?: number;
  serving?: number;
}) => {
  const baskets = metrics.baskets ?? 0;
  const visitors = metrics.visitors ?? 0;
  const presenceGC = metrics.presenceGC ?? 0;
  const presenceCults = metrics.presenceCults ?? 0;
  const serving = metrics.serving ?? 0;

  const pointsBaskets = baskets * 100;
  const pointsVisitors = visitors * 50;
  const pointsPresenceGC = presenceGC;
  const pointsPresenceCults = presenceCults * 2;
  const pointsServing = serving;

  const totalPoints =
    pointsBaskets +
    pointsVisitors +
    pointsPresenceGC +
    pointsPresenceCults +
    pointsServing;

  return {
    total: Math.round(totalPoints * 100) / 100,
    breakdown: {
      baskets: pointsBaskets,
      visitors: pointsVisitors,
      presenceGC: Math.round(pointsPresenceGC * 100) / 100,
      presenceCults: Math.round(pointsPresenceCults * 100) / 100,
      serving: Math.round(pointsServing * 100) / 100,
    },
  };
};

export const processGCWithRanking = (gc: GC) => {
  const dailyApps = gc.applicationsDailys;
  const fixedApp = gc.applicationsFixeds[0];

  const baskets = fixedApp?.baskets || 0;
  const visitors = calculateTotalVisitors(dailyApps);
  const presenceGC = calculatePresencePercentage(
    dailyApps,
    "presenceGC",
    gc.quantity,
  );
  const presenceCults = calculatePresencePercentage(
    dailyApps,
    "presenceCults",
    gc.quantity,
  );
  const serving = calculateServingPercentage(dailyApps, gc.quantity);

  const points = calculatePoints({
    baskets,
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
    quantity: gc.quantity,
    points: points.total,
    baskets,
    visitors,
    presenceGC: Math.round(presenceGC * 100) / 100,
    presenceCults: Math.round(presenceCults * 100) / 100,
    serving: Math.round(serving * 100) / 100,
  };
};

const processGCBasics = (gc: GC) => {
  const dailyApps = gc.applicationsDailys;
  const fixedApp = gc.applicationsFixeds[0];

  const baskets = fixedApp?.baskets || 0;
  const visitors = calculateTotalVisitors(dailyApps);
  const presenceGC = calculatePresencePercentage(
    dailyApps,
    "presenceGC",
    gc.quantity,
  );
  const presenceCults = calculatePresencePercentage(
    dailyApps,
    "presenceCults",
    gc.quantity,
  );
  const serving = calculateServingPercentage(dailyApps, gc.quantity);

  return {
    id: gc.id,
    name: gc.name,
    avatar: gc.avatar,
    type: gc.type,
    quantity: gc.quantity,
    baskets,
    visitors,
    presenceGC: Math.round(presenceGC * 100) / 100,
    presenceCults: Math.round(presenceCults * 100) / 100,
    serving: Math.round(serving * 100) / 100,
  };
};

export const generateCategoryRankings = (gcs: GC[]): RankingByCategory[] => {
  const processedGCs = gcs.map(processGCBasics);

  const categories: RankingByCategory[] = [
    {
      category: "FoodBaskets",
      ranks: processedGCs
        .map((gc) => ({
          id: gc.id,
          name: gc.name,
          avatar: gc.avatar,
          value: gc.baskets,
          points: calculatePoints({ baskets: gc.baskets }).breakdown.baskets,
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
