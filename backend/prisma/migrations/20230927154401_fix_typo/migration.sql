/*
  Warnings:

  - You are about to drop the `MetadataRespone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MetadataRespone";

-- CreateTable
CREATE TABLE "MetadataResponse" (
    "id" SERIAL NOT NULL,
    "isbn" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "responseCode" INTEGER NOT NULL,
    "body" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetadataResponse_pkey" PRIMARY KEY ("id")
);
