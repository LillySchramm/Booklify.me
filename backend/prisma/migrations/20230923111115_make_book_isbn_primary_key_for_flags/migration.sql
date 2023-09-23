/*
  Warnings:

  - The primary key for the `BookFlags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BookFlags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookFlags" DROP CONSTRAINT "BookFlags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BookFlags_pkey" PRIMARY KEY ("bookIsbn");
