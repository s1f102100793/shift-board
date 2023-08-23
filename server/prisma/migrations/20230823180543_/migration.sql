/*
  Warnings:

  - You are about to drop the `FixedShift` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FixedShift";

-- CreateTable
CREATE TABLE "Fixedshift" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "starttime" TEXT NOT NULL,
    "endtime" TEXT NOT NULL,

    CONSTRAINT "Fixedshift_pkey" PRIMARY KEY ("id","date")
);
