import { ApplicationsFixed } from "@/app/generated/prisma/client";
import {
  ApplicationsFixedCreateInput,
  ApplicationsFixedCreateManyInput,
  ApplicationsFixedUpdateInput,
} from "@/app/generated/prisma/models";

type CreateRoadPayload = ApplicationsFixedCreateManyInput

export type UpdateRoadPayload = {
  id: string
  data: ApplicationsFixedUpdateInput
}


export const registerRoadGC = async (
  data: CreateRoadPayload,
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

export const updateRoadGC = async (
  payload: UpdateRoadPayload
): Promise<ApplicationsFixedUpdateInput> => {
  const response = await fetch(
    `/api/registerRoad?id=${payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.data),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao atualizar GC")
  }

  return response.json()
}


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
