export type CategoryType =
  | "FoodBaskets"
  | "Visitors"
  | "GCPresence"
  | "WorshipPresence"
  | "Serving";

export type GCBase = {
  id: string;
  name: string;
  avatar: string | null;
  type: string;
  quantityMembers: number | null;
  points: number;
  baskets: number;
  visitors: number;
  presenceGC: number;
  presenceCults: number;
  serving: number;
};

export type CategoryRank = {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
  points: number;
};

export type RankingByCategory = {
  category: CategoryType;
  ranks: CategoryRank[];
};

export type RankingGroup = {
  gcOfTheMonth: GCBase;
  ranking: GCBase[];
  categoryRankings: RankingByCategory[];
};

export type RankingResponse = {
  masculine: RankingGroup;
  feminine: RankingGroup;
};