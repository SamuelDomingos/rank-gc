import { ApplicationsDailysCreateManyInput } from "@/app/generated/prisma/models";
import { ApplicationsDailys } from "@/app/generated/prisma/client";

export const registerDayGC = async (data: ApplicationsDailysCreateManyInput): Promise<ApplicationsDailysCreateManyInput> => {
    const response = await fetch("/api/registerDay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar GC");
    }

    return response.json();
};

export const getAllRegistersGc = async (id: string, month: number, year: number): Promise<ApplicationsDailys[]> => {
    const response = await fetch(`/api/registerDay?id=${id}&month=${month}&year=${year}`, {
        method: "GET",
    });
    return response.json();
}

export const deleteRegister = async (id: string) => {
    const response = await fetch(`/api/registerDay?id=${id}`, {
        method: "DELETE",
    });
    return response.json();
}