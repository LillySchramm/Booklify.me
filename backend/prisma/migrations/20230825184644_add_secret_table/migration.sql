-- CreateTable
CREATE TABLE "Secret" (
    "id" INTEGER NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Secret_pkey" PRIMARY KEY ("id")
);
