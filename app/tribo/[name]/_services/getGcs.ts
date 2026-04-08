import prisma from "@/lib/prisma";
import {
  generateCategoryRankings,
  processGCWithRanking,
} from "@/services/calcRank";
import {
  ApplicationsDailys,
  ApplicationsFixed,
  GC,
} from "@/app/generated/prisma/client";

const fetchGcs = async (month: number, year: number, tribo: string) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const gcs = await prisma.gC.findMany({
    where: { tribo },
    orderBy: { name: "asc" },
    include: {
      applicationsDailys: {
        where: { date: { gte: startDate, lte: endDate } },
      },
      applicationsFixeds: {
        where: { date: { gte: startDate, lte: endDate } },
      },
    },
  });

  const normalizedGcs = gcs.map((gc) => ({
    ...gc,
    applicationsDailys: gc.applicationsDailys.map((app) => ({
      ...app,
      membersServing: app.membersServing ?? 0,
    })),
    applicationsFixeds: gc.applicationsFixeds[0] ?? {
      amountCollected: 0,
      quantityMembers: 0,
    },
  }));

  const gcsWithRanking = normalizedGcs.map((gc) =>
    processGCWithRanking(
      gc as unknown as GC & {
        applicationsDailys: ApplicationsDailys[];
        applicationsFixeds: ApplicationsFixed;
      },
    ),
  );

  const masculineGCs = gcsWithRanking
    .filter((gc) => gc.type === "masculine")
    .sort((a, b) => b.points - a.points);

  const feminineGCs = gcsWithRanking
    .filter((gc) => gc.type === "feminine")
    .sort((a, b) => b.points - a.points);

  return {
    masculine: {
      gcOfTheMonth: masculineGCs[0] || null,
      ranking: masculineGCs,
      categoryRankings: generateCategoryRankings(
        normalizedGcs.filter((gc) => gc.type === "masculine"),
      ),
    },
    feminine: {
      gcOfTheMonth: feminineGCs[0] || null,
      ranking: feminineGCs,
      categoryRankings: generateCategoryRankings(
        normalizedGcs.filter((gc) => gc.type === "feminine"),
      ),
    },
  };
};

const getGcs = async (month: number, year: number, tribo: string) => {
  try {
    const data = await fetchGcs(month, year, tribo);

    return { success: true as const, data };
  } catch (error) {
    console.error("Erro ao buscar GCs:", error);
    return { success: false as const, error: "Erro ao buscar GCs" };
  }
};

export default getGcs;
