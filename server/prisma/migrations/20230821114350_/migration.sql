/*
  Warnings:

  - The primary key for the `Shift` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_pkey",
ADD CONSTRAINT "Shift_pkey" PRIMARY KEY ("id", "date", "starttime");
