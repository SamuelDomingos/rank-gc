/*
  Warnings:

  - You are about to drop the column `quantity` on the `GC` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationsFixed" ADD COLUMN     "quantityMembers" INTEGER,
ALTER COLUMN "amountCollected" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GC" DROP COLUMN "quantity";
