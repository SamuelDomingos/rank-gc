-- AlterTable
ALTER TABLE "ApplicationsDailys" ALTER COLUMN "membersServing" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GC" ADD COLUMN     "tribo" TEXT NOT NULL DEFAULT 'sent';
