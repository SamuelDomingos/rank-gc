"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export const getMembers = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return [];
  }

  const members = await prisma.user.findMany();

  return members;
};

export const delUser = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  await prisma.user.delete({ where: { id } });

  revalidatePath("/admin");
};
