/*
  Warnings:

  - The primary key for the `Shift` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id,date]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Shift_id_date_key" ON "Shift"("id", "date");
