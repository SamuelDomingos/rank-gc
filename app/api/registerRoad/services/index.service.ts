import {
  ApplicationsFixedCreateManyInput,
  ApplicationsFixedUpdateInput,
} from "@/app/generated/prisma/models";
import prisma from "@/lib/prisma";

export class GCService {
  async registerBasketsGc(json: ApplicationsFixedCreateManyInput) {
    try {
      const { gcId, date, baskets } = json;

      if (!gcId || !date || !baskets) {
        return {
          success: false,
          error: "Dados obrigatórios ausentes ou inválidos.",
        };
      }

      const registro = await prisma.applicationsFixed.create({
        data: {
          gcId,
          date: new Date(date),
          baskets,
        },
      });

      return { success: true, data: registro };
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return { success: false, error: "Erro ao registrar o dia do GC" };
    }
  }

  async updateBasketsGc(id: string, data: ApplicationsFixedUpdateInput) {
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
