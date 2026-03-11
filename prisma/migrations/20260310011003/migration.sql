/*
  Warnings:

  - You are about to drop the `VoucherBaskets` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('ADMIN', 'MEMBRO');

-- DropForeignKey
ALTER TABLE "VoucherBaskets" DROP CONSTRAINT "VoucherBaskets_applicationsFixedId_fkey";

-- AlterTable
ALTER TABLE "GC" ADD COLUMN     "ministry" TEXT;

-- DropTable
DROP TABLE "VoucherBaskets";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tribo" TEXT NOT NULL,
    "ministry" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
