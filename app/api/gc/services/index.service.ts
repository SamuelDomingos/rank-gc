import prisma from "@/lib/prisma";
import { z } from "zod";

import {
  generateCategoryRankings,
  processGCWithRanking,
} from "./calcRank.service";
import { handleAvatarUpload } from "./avatarUpload.service";

const GCSchema = z.object({
  name: z.string().min(2).max(50),
  avatar: z.string().optional().nullable(),
  type: z.enum(["masculine", "feminine"]),
  quantity: z.coerce.number().min(1).max(50),
});

export class GCService {
  async createGC(formData: FormData) {
    try {
      const name = formData.get("name")?.toString();
      const type = formData.get("type")?.toString();
      const quantity = Number(formData.get("quantity"));
      const avatarFile = formData.get("avatar") as File | null;
      const tribo = formData.get("tribo")?.toString();

      if (!name || !type || !tribo) {
        return { success: false, error: "Dados obrigatórios ausentes" };
      }

      const avatarPath = await handleAvatarUpload(avatarFile);

      const validatedData = GCSchema.parse({
        name,
        avatar: avatarPath,
        type,
        quantity,
      });

      const gc = await prisma.gC.create({
        data: {
          name: validatedData.name,
          avatar: validatedData.avatar ?? undefined,
          type: validatedData.type,
          quantity: validatedData.quantity,
          tribo: tribo,
        },
      });

      return { success: true, data: gc };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return { success: false, error: "Dados inválidos", details: error };
      }

      if (error.code === "P2002") {
        return { success: false, error: "Já existe um GC com este nome" };
      }

      return { success: false, error: "Erro ao criar GC" };
    }
  }

  async getAllGCs(month: number, year: number, tribo: string) {
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
      }));

      const gcsWithRanking = normalizedGcs.map((gc) =>
        processGCWithRanking(gc as any),
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
  }

  async updateGC(id: string, formData: FormData) {
    try {
      const parsed = GCSchema.parse({
        name: formData.get("name")?.toString(),
        type: formData.get("type"),
        quantity: formData.get("quantity")
          ? Number(formData.get("quantity"))
          : undefined,
        avatar: undefined,
      });

      const avatarFile = formData.get("avatar") as File | null;
      const avatarPath = await handleAvatarUpload(avatarFile);

      const data = {
        ...parsed,
        ...(avatarPath !== undefined && { avatar: avatarPath }),
      };

      const gc = await prisma.gC.update({
        where: { id },
        data,
      });

      return { success: true, data: gc };
    } catch (error) {
      if ((error as { code?: string }).code === "P2025") {
        return { success: false, error: "GC não encontrado" };
      }
      if ((error as { code?: string }).code === "P2002") {
        return { success: false, error: "Já existe um GC com este nome" };
      }
      return { success: false, error: "Erro ao atualizar GC" };
    }
  }

  async deleteGC(id: string) {
    try {
      await prisma.gC.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      if ((error as any).code === "P2025") {
        return { success: false, error: "GC não encontrado" };
      }
      return { success: false, error: "Erro ao deletar GC" };
    }
  }
}

export const gcService = new GCService();
