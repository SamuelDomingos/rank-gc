import { UserCreateManyInput } from "@/app/generated/prisma/models";

export const createMember = async (data: UserCreateManyInput) => {
  const response = await fetch("/api/auth/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar membro");
  }

  return response.json();
};

export const delUser = async (id: string) => {
  const response = await fetch(`/api/auth/members/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao deletar membro");
  }

  return response.json();
};

export const getMembers = async () => {
  const response = await fetch(`/api/auth/members`, {
    method: "GET",
  });
  return response.json();
};
