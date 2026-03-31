import { useFetch } from "@/hooks/useFetch";
import { createdGC, deleteGc, updateGC } from "@/lib/api/gcs";

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
  