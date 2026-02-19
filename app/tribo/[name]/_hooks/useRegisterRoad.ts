import { ApplicationsFixedCreateManyInput } from "@/app/generated/prisma/models";
import { useFetch } from "@/hooks/useFetch";
import {
  getRoadGc,
  registerRoadGC,
  updateRoadGC,
  UpdateRoadPayload,
} from "@/lib/api/registersRoad";
import { useMemo } from "react";

type RoadAction =
  | ((
      data: ApplicationsFixedCreateManyInput,
    ) => Promise<ApplicationsFixedCreateManyInput>)
  | ((data: UpdateRoadPayload) => Promise<unknown>);

export const useRegisterRoad = (mode: "create" | "update") => {
  const action: RoadAction = mode === "create" ? registerRoadGC : updateRoadGC;

  const {
    execute: uploadData,
    data,
    isLoading,
    error,
  } = useFetch(
    action as (
      data: ApplicationsFixedCreateManyInput,
    ) => Promise<ApplicationsFixedCreateManyInput>,
    {
      successMessage:
        mode === "create"
          ? "Registro criado com sucesso!"
          : "Registro atualizado com sucesso!",
      errorMessage:
        mode === "create" ? "Erro ao criar o gc!" : "Erro ao atualizar o gc!",
    },
  );

  return { uploadData, data, isLoading, error };
};

export const useGetRoadsGc = (id: string, month: number, year: number) => {
  const fetchOptions = useMemo(
    () => ({
      auto: true,
      defaultArgs: [id, month, year],
    }),
    [id, month, year],
  );

  const {
    execute: getData,
    data,
    isLoading,
    error,
  } = useFetch(getRoadGc, fetchOptions);

  return {
    getData,
    data,
    isLoading,
    error,
  };
};
