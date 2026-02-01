export type GC = {
    id: string;
    name: string;
    avatar?: string | null;
    type: string;
    quantity: number;
    applicationsDailys: {
        type: string | number;
        members: number;
        visitors: number;
        membersServing: number;
    }[];
    applicationsFixeds: {
        baskets: number;
    }[];
};

export type GCRanking = {
    id: string;
    name: string;
    avatar: string | null;
    type: string;
    tribo: string;
    quantity: number;
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

export type CategoryRankings = {
    category: "FoodBaskets" | "Visitors" | "GCPresence" | "WorshipPresence" | "Serving";
    ranks: CategoryRank[];
}[];

export type GCCategory = {
    gcOfTheMonth: GCRanking | null;
    ranking: GCRanking[];
    categoryRankings: CategoryRankings | null;
};

export type GCsResponse = 
    | {
        success: true;
        data: {
            masculine: GCCategory;
            feminine: GCCategory;
        };
    } 
    | {
        success: false;
        error: string;
    };