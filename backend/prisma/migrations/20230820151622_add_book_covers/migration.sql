/*
  Warnings:

  - Added the required column `bookCoverId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookCoverId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BookCover" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookCover_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_bookCoverId_fkey" FOREIGN KEY ("bookCoverId") REFERENCES "BookCover"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
