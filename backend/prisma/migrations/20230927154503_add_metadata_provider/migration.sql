/*
  Warnings:

  - Added the required column `provider` to the `MetadataResponse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetadataProvider" AS ENUM ('GOOGLE_BOOKS', 'OPEN_LIBRARY', 'ISBNDB');

-- AlterTable
ALTER TABLE "MetadataResponse" ADD COLUMN     "provider" "MetadataProvider" NOT NULL;
