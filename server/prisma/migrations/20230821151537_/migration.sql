/*
  Warnings:

  - A unique constraint covering the columns `[id,date]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Shift_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Shift_id_date_key" ON "Shift"("id", "date");
