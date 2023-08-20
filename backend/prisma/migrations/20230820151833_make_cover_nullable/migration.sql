-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_bookCoverId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "bookCoverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_bookCoverId_fkey" FOREIGN KEY ("bookCoverId") REFERENCES "BookCover"("id") ON DELETE SET NULL ON UPDATE CASCADE;
