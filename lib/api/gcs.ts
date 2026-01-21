
import type { GC, GCsResponse } from "./types";

export const createdGC = async (formData: FormData): Promise<GC> => {
    const response = await fetch("/api/gc", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar GC");
    }

    return response.json();
};

export const updateGC = async (id: string, formData: FormData): Promise<GC> => {
    const response = await fetch(`/api/gc?id=${id}`, {
        method: "PUT",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar GC");
    }

    return response.json();
};

export const getGcsAll = async (month: number, year: number): Promise<GCsResponse> => {
    const response = await fetch(`/api/gc?month=${month}&year=${year}`, {
        method: "GET",
    });
    return response.json();
}

export const deleteGc = async (id: string) => {
    const response = await fetch(`/api/gc?id=${id}`, {
        method: "DELETE",
    });
    return response.json();
}