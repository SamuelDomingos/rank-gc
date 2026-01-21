-- CreateTable
CREATE TABLE "GC" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "GC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationsDailys" (
    "id" TEXT NOT NULL,
    "gcId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "type" INTEGER NOT NULL,
    "members" INTEGER NOT NULL,
    "visitors" INTEGER NOT NULL,
    "membersServing" INTEGER NOT NULL,

    CONSTRAINT "ApplicationsDailys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationsFixed" (
    "id" TEXT NOT NULL,
    "gcId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "baskets" INTEGER NOT NULL,

    CONSTRAINT "ApplicationsFixed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GC_name_key" ON "GC"("name");

-- CreateIndex
CREATE INDEX "ApplicationsDailys_gcId_idx" ON "ApplicationsDailys"("gcId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationsDailys_gcId_date_key" ON "ApplicationsDailys"("gcId", "date");

-- CreateIndex
CREATE INDEX "ApplicationsFixed_gcId_idx" ON "ApplicationsFixed"("gcId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationsFixed_gcId_date_key" ON "ApplicationsFixed"("gcId", "date");

-- AddForeignKey
ALTER TABLE "ApplicationsDailys" ADD CONSTRAINT "ApplicationsDailys_gcId_fkey" FOREIGN KEY ("gcId") REFERENCES "GC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationsFixed" ADD CONSTRAINT "ApplicationsFixed_gcId_fkey" FOREIGN KEY ("gcId") REFERENCES "GC"("id") ON DELETE CASCADE ON UPDATE CASCADE;
