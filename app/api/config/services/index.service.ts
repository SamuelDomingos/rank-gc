import { ConfigGeralCreateManyInput } from "@/app/generated/prisma/models";
import prisma from "@/lib/prisma";

export const ConfigService = {
  create: async (json: ConfigGeralCreateManyInput) => {
    const { priceBaskets, date } = json;

    if (!priceBaskets || !date) {
      return { success: false, error: "Dados obrigatórios ausentes." };
    }

    if (priceBaskets <= 0) {
      return { success: false, error: "O valor deve ser maior que zero." };
    }

    try {
      const result = await prisma.$transaction([
        prisma.configGeral.updateMany({
          where: { active: true },
          data: { active: false },
        }),
        prisma.configGeral.create({
          data: { date, priceBaskets, active: true },
        }),
      ]);

      return { success: true, data: result[1] };
    } catch (error) {
      return { success: false, error: "Erro ao salvar no banco." };
    }
  },

  update: async (id: string, json: ConfigGeralCreateManyInput) => {
    const { priceBaskets, date } = json;

    if (!priceBaskets || !date) {
      return { success: false, error: "Dados obrigatórios ausentes." };
    }

    if (priceBaskets <= 0) {
      return { success: false, error: "O valor deve ser maior que zero." };
    }

    try {
      const configGeral = await prisma.configGeral.update({
        where: { id },
        data: {
          date: json.date,
          priceBaskets: json.priceBaskets,
        },
      });

      return { success: true, data: configGeral };
    } catch (error) {
      return { success: false, error: "Erro ao atualizar." };
    }
  },

  getConfig: async (month: number, year: number) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    try {
      const configGeral = await prisma.configGeral.findFirst({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return { success: true, data: configGeral };
    } catch (error) {
      return { success: false, error: "Erro ao atualizar." };
    }
  },
};
