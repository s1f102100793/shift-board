-- DropIndex
DROP INDEX "Shift_id_date_key";

-- AlterTable
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_pkey" PRIMARY KEY ("starttime");
