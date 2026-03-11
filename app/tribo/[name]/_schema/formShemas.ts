import z from "zod";

export const formGC = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  avatar: z.any().optional(),
  type: z.union([z.literal("masculine"), z.literal("feminine")], {
    message: "Selecione o tipo",
  }),
  quantityMembers: z
    .number()
    .min(1, "Quantidade deve ser maior que zero")
    .max(50, "Quantidade máxima é 50"),
});

export const formRegister = z.object({
  date: z.date({ message: "A data é obrigatória" }),
  type: z.enum(["presenceGC", "presenceCults"]),
  members: z.number().min(1),
  visitors: z.number().min(0),
  membersServing: z.number().min(0).optional(),
});

export const formRegisterAmountCollected = z.object({
  amountCollected: z.number().min(0),
});