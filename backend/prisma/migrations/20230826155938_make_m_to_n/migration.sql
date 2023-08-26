/*
  Warnings:

  - You are about to drop the column `bookGroupId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_bookGroupId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookGroupId";

-- CreateTable
CREATE TABLE "_BookToBookGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBookGroup_AB_unique" ON "_BookToBookGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBookGroup_B_index" ON "_BookToBookGroup"("B");

-- AddForeignKey
ALTER TABLE "_BookToBookGroup" ADD CONSTRAINT "_BookToBookGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookGroup" ADD CONSTRAINT "_BookToBookGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "BookGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
