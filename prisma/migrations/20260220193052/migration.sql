/*
  Warnings:

  - You are about to drop the column `baskets` on the `ApplicationsFixed` table. All the data in the column will be lost.
  - Added the required column `amountCollected` to the `ApplicationsFixed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationsFixed" DROP COLUMN "baskets",
ADD COLUMN     "amountCollected" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ConfigGeral" (
    "id" TEXT NOT NULL,
    "priceBaskets" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "date" DATE NOT NULL,

    CONSTRAINT "ConfigGeral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherBaskets" (
    "id" TEXT NOT NULL,
    "applicationsFixedId" TEXT NOT NULL,
    "voucher" TEXT NOT NULL,
    "price" INTEGER,

    CONSTRAINT "VoucherBaskets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfigGeral_date_key" ON "ConfigGeral"("date");

-- AddForeignKey
ALTER TABLE "VoucherBaskets" ADD CONSTRAINT "VoucherBaskets_applicationsFixedId_fkey" FOREIGN KEY ("applicationsFixedId") REFERENCES "ApplicationsFixed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
