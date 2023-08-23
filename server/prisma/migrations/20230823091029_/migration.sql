-- CreateTable
CREATE TABLE "FixedShift" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "starttime" TEXT NOT NULL,
    "endtime" TEXT NOT NULL,

    CONSTRAINT "FixedShift_pkey" PRIMARY KEY ("id","date")
);
