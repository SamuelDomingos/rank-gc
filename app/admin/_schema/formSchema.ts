import { Cargo } from "@/app/generated/prisma/enums";
import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  tribo: z.string().min(1, "Selecione uma tribo"),
  cargo: z.nativeEnum(Cargo),
});
