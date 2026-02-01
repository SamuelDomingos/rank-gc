import { useFetch } from "@/hooks/useFetch";
import { createdGC, deleteGc, getGcsAll, updateGC } from "@/lib/api/gcs";
import { useMemo } from "react";

export const useCreatedGcs = () => {
    const {
        execute: uploadData,
        data,
        isLoading,
        error,
    } = useFetch(createdGC, {
        successMessage: "GC criado com sucesso!",
        errorMessage: "Erro ao criar o gc!",
    });


    return {
        uploadData,
        data,
        isLoading,
        error,
    };
};

export const useUpdateGcs = () => {
    const {
        execute: updateData,
        data,
        isLoading,
        error,
    } = useFetch(updateGC, {
        successMessage: "GC atualizado com sucesso!",
        errorMessage: "Erro ao atualizar o gc!",
    });


    return {
        updateData,
        data,
        isLoading,
        error,
    };
};

export const useGetGcs = (month: number, year: number, tribo: string) => {
    const fetchOptions = useMemo(
        () => ({
            auto: true,
            defaultArgs: [month, year, tribo],
        }),
        [month, year, tribo]
    );

    const {
        execute: getData,
        data,
        isLoading,
        error,
    } = useFetch(getGcsAll, fetchOptions);


    return {
        getData,
        data: data?.success ? data.data : undefined,
        isLoading,
        error,
    };
};

export const useDeleteGc = () => {
    const {
      execute: fetchDelGc,
      isLoading,
      error,
    } = useFetch(deleteGc, {
      auto: false,
      successMessage: "Registro deletado com sucesso!",
    });
  
    return {
      fetchDelGc: (id: string) => fetchDelGc(id),
      isLoading,
      error,
    };
  };
  