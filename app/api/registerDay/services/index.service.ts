import { ApplicationsDailysCreateManyInput } from '@/app/generated/prisma/models';
import prisma from '@/lib/prisma'

export class GCService {
    async registerDayGc(json: ApplicationsDailysCreateManyInput) {
        try {
            const { gcId, date, type, members, visitors, membersServing } = json;

            if (!gcId || !date || !type || isNaN(members) || isNaN(visitors)) {
                return { success: false, error: "Dados obrigatórios ausentes ou inválidos." };
            }
    
            if (
                type === "presenceCults" &&
                (membersServing === undefined || isNaN(membersServing))
            ) {
                return {
                    success: false,
                    error: "membersServing é obrigatório para o tipo presenceCults.",
                };
            }
    
            const data = {
                gcId,
                date: new Date(date),
                type,
                members,
                visitors,
                membersServing: typeof membersServing === "number" && !isNaN(membersServing) ? membersServing : 0,
            };
    
            const registro = await prisma.applicationsDailys.create({
                data,
            });
    
            return { success: true, data: registro };
        } catch (error) {
            console.error("Erro ao registrar:", error);
            return { success: false, error: "Erro ao registrar o dia do GC" };
        }
    }

    async getAllRegistersGc(id: string, month: number, year: number) {
        try {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const registers = await prisma.applicationsDailys.findMany({
                orderBy: { date: 'asc' },
                where: {
                    gcId: id,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });

            return registers;
        } catch (error) {
            console.error('Erro ao buscar GCs:', error);
            return { success: false, error: 'Erro ao buscar GCs' };
        }
    }

    async deleteRegisterById(registerId: string) {
        try {
            await prisma.applicationsDailys.delete({
                where: {
                    id: registerId,
                },
            });
            return { success: true }
        } catch (error) {
            console.error('Erro ao deletar registro:', error);
            return { success: false, error: "Erro ao deletar o registro" };
        }
    }
}

export const gcService = new GCService()