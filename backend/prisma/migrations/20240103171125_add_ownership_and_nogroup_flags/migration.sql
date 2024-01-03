-- AlterTable
ALTER TABLE "OwnershipStatus" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noGroup" BOOLEAN NOT NULL DEFAULT false;
