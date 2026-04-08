import { ApplicationsFixed } from "@/app/generated/prisma/client";
import {
  ApplicationsFixedCreateManyInput,
  ApplicationsFixedUpdateInput,
} from "@/app/generated/prisma/models";

export const registerRoadGC = async (
  data: ApplicationsFixedCreateManyInput,
): Promise<ApplicationsFixedCreateManyInput> => {
  const response = await fetch("/api/registerRoad", {
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

export const updateRoadGC = async (payload: {
  id: string;
  data: ApplicationsFixedUpdateInput;
}): Promise<ApplicationsFixedUpdateInput> => {
  const response = await fetch(`/api/registerRoad?id=${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload.data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao atualizar GC");
  }

  return response.json();
};

export const getRoadGc = async (
  id: string,
  month: number,
  year: number,
): Promise<ApplicationsFixed> => {
  const response = await fetch(
    `/api/registerRoad?id=${id}&month=${month}&year=${year}`,
    {
      method: "GET",
    },
  );
  return response.json();
};
