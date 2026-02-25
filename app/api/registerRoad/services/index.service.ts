import {
  ApplicationsFixedCreateManyInput,
  ApplicationsFixedUpdateInput,
} from "@/app/generated/prisma/models";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export class GCService {
  async registerBasketsGc(
    json: ApplicationsFixedCreateManyInput & { year: number; month: number },
  ) {
    try {
      const { gcId, date, amountCollected, year, month } = json;
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      if (!gcId || !date || !amountCollected) {
        return {
          success: false,
          error: "Dados obrigatórios ausentes ou inválidos.",
        };
      }

      const applicationFixed = await prisma.applicationsFixed.findFirst({
        where: {
          gcId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      let registro;
      if (applicationFixed) {
        registro = await prisma.applicationsFixed.update({
          where: {
            id: applicationFixed.id,
          },
          data: {
            date: new Date(date),
            amountCollected,
          },
        });
      }

      const gc = await prisma.gC.findUnique({
        where: { id: gcId },
      });

      revalidateTag(`gcs-${gc?.tribo}`, {});

      return { success: true, data: registro };
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return { success: false, error: "Erro ao registrar o dia do GC" };
    }
  }

  async updateBasketsGc(
    id: string,
    data: ApplicationsFixedUpdateInput & { year: number; month: number },
  ) {
    try {
      if (!id) {
        return {
          success: false,
          error: "ID é obrigatório",
        };
      }

      const registro = await prisma.applicationsFixed.update({
        where: { id },
        data,
      });

      const gc = await prisma.gC.findUnique({
        where: { id: registro.gcId },
      });

      revalidateTag(`gcs-${gc?.tribo}`, {});

      return { success: true, data: registro };
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return { success: false, error: "Erro ao registrar o dia do GC" };
    }
  }

  async getRegistersRoadGc(id: string, month: number, year: number) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const registers = await prisma.applicationsFixed.findFirst({
        where: {
          gcId: id,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return registers;
    } catch (error) {
      console.error("Erro ao buscar GCs:", error);
      return { success: false, error: "Erro ao buscar GCs" };
    }
  }
}

export const gcService = new GCService();
