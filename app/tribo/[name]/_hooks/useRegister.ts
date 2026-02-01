import { useFetch } from "@/hooks/useFetch";
import { deleteRegister, getAllRegistersGc, registerDayGC } from "@/lib/api/registers";
import { useMemo } from "react";

export const useRegisterDay = () => {
    const {
        execute: uploadData,
        data,
        isLoading,
        error,
    } = useFetch(registerDayGC, {
        successMessage: "Registro criado com sucesso!",
        errorMessage: "Erro ao criar o gc!",
    });


    return {
        uploadData,
        data,
        isLoading,
        error,
    };
};

export const useGetAllRegistersGc = (id: string, month: number, year: number) => {
    const fetchOptions = useMemo(
        () => ({
            auto: true,
            defaultArgs: [id, month, year],
        }),
        [id, month, year]
    );

    const {
        execute: getData,
        data,
        isLoading,
        error,
    } = useFetch(getAllRegistersGc, fetchOptions);


    return {
        getData,
        data,
        isLoading,
        error,
    };
};

export const useDeleteRegister = (id: string) => {
    const fetchOptions = useMemo(
        () => ({
            auto: false,
            defaultArgs: [id],
            successMessage: "Registro deletado com sucesso!",
        }),
        [id]
    );

    const {
        execute: fetchDelRegister,
        isLoading,
        error,
    } = useFetch(deleteRegister, fetchOptions);


    return {
        fetchDelRegister,
        isLoading,
        error,
    };
};