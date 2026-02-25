import prisma from "@/lib/prisma";
import { z } from "zod";

import {
  generateCategoryRankings,
  processGCWithRanking,
} from "./calcRank.service";
import { handleAvatarUpload } from "./avatarUpload.service";
import {
  ApplicationsDailys,
  ApplicationsFixed,
  GC,
} from "@/app/generated/prisma/client";

import { unstable_cache } from "next/cache";

const GCSchema = z.object({
  name: z.string().min(2).max(50),
  avatar: z.string().optional().nullable(),
  type: z.enum(["masculine", "feminine"]),
  quantityMembers: z.coerce.number().min(1).max(50),
});

export const GCService = {
  async createGC(formData: FormData) {
    try {
      const name = formData.get("name")?.toString();
      const type = formData.get("type")?.toString();
      const avatarFile = formData.get("avatar") as File | null;
      const tribo = formData.get("tribo")?.toString();

      const month = Number(formData.get("month"));
      const year = Number(formData.get("year"));
      const quantityMembers = Number(formData.get("quantityMembers"));

      if (!name || !type || !tribo) {
        return { success: false, error: "Dados obrigatórios ausentes" };
      }

      const avatarPath = await handleAvatarUpload(avatarFile);

      const validatedData = GCSchema.parse({
        name,
        avatar: avatarPath,
        type,
        quantityMembers,
      });

      const gc = await prisma.gC.create({
        data: {
          name: validatedData.name,
          avatar: validatedData.avatar ?? undefined,
          type: validatedData.type,
          tribo: tribo,
        },
      });

      const applicationsFixed = await prisma.applicationsFixed.create({
        data: {
          gcId: gc.id,
          quantityMembers: validatedData.quantityMembers,
          date: new Date(year, month - 1, 1),
        },
      });

      return { success: true, data: { gc, applicationsFixed } };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: "Dados inválidos", details: error };
      }

      return { success: false, error: "Erro ao criar GC" };
    }
  },

  getAllGCs(month: number, year: number, tribo: string) {
    return unstable_cache(
      async () => {
        try {
          const startDate = new Date(year, month - 1, 1);
          const endDate = new Date(year, month, 0);

          const gcs = await prisma.gC.findMany({
            where: { tribo: tribo },
            orderBy: { name: "asc" },
            include: {
              applicationsDailys: {
                where: {
                  date: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
              },
              applicationsFixeds: {
                where: {
                  date: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
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

          const masculineRankings = generateCategoryRankings(
            normalizedGcs.filter((gc) => gc.type === "masculine") as any,
          );

          const feminineRankings = generateCategoryRankings(
            normalizedGcs.filter((gc) => gc.type === "feminine") as any,
          );

          return {
            success: true,
            data: {
              masculine: {
                gcOfTheMonth: masculineGCs[0] || null,
                ranking: masculineGCs,
                categoryRankings: masculineRankings,
              },
              feminine: {
                gcOfTheMonth: feminineGCs[0] || null,
                ranking: feminineGCs,
                categoryRankings: feminineRankings,
              },
            },
          };
        } catch (error) {
          console.error("Erro ao buscar GCs:", error);
          return { success: false, error: "Erro ao buscar GCs" };
        }
      },
      [`gcs-${month}-${year}-${tribo}`],
      {
        revalidate: 60 * 60 * 24 * 5,
        tags: [`gcs-${tribo}`, `gcs-${month}-${year}-${tribo}`],
      },
    )();
  },

  async updateGC(id: string, formData: FormData) {
    try {
      const parsed = GCSchema.parse({
        name: formData.get("name")?.toString(),
        type: formData.get("type"),
        quantityMembers: Number(formData.get("quantityMembers")),
        avatar: undefined,
      });

      const month = Number(formData.get("month"));
      const year = Number(formData.get("year"));
      const quantityMembers = Number(formData.get("quantityMembers"));

      const avatarFile = formData.get("avatar") as File | null;
      const avatarPath = await handleAvatarUpload(avatarFile);

      const data = {
        ...parsed,
        ...(avatarPath !== undefined && { avatar: avatarPath }),
      };

      const { quantityMembers: _, ...gcData } = data;

      const gc = await prisma.gC.update({
        where: { id },
        data: {
          ...gcData,
          applicationsFixeds: {
            upsert: {
              where: {
                gcId_date: { gcId: id, date: new Date(year, month - 1, 1) },
              },
              create: {
                date: new Date(year, month - 1, 1),
                quantityMembers,
              },
              update: {
                quantityMembers,
              },
            },
          },
        },
      });

      return { success: true, data: gc };
    } catch (error) {
      console.log(error);

      return { success: false, error: "Erro ao atualizar GC" };
    }
  },

  async deleteGC(id: string) {
    try {
      await prisma.gC.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro ao deletar GC" };
    }
  },
};
