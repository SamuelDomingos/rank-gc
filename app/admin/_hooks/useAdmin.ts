import { useFetch } from "@/hooks/useFetch";
import { createMember, delUser } from "@/lib/api/members";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { createUserSchema } from "../_schema/formSchema";
import { tribos } from "@/constants";

export const useCreatedMember = () => {
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      tribo: "",
      cargo: "MEMBRO",
    },
  });

  const onSubmit = (data: z.infer<typeof createUserSchema>) => {
    const tribo = tribos.find((t) => t.name === data.tribo);

    uploadData({
      ...data,
      ministry: tribo?.ministerio ?? "",
    });
  };

  const {
    execute: uploadData,
    isLoading,
    error,
  } = useFetch(createMember, {
    successMessage: "Membro criado com sucesso!",
    errorMessage: "Erro ao criar o membro!",
  });

  return {
    form,
    onSubmit,
    isLoading,
    error,
  };
};

export const useDeleteMember = () => {
  const {
    execute: fetchDelMember,
    isLoading,
    error,
  } = useFetch(delUser, {
    auto: false,
    successMessage: "Registro deletado com sucesso!",
  });

  return {
    fetchDelMember: (id: string) => fetchDelMember(id),
    isLoading,
    error,
  };
};
