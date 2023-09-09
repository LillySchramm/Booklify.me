-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "permanent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refreshToken" TEXT;
