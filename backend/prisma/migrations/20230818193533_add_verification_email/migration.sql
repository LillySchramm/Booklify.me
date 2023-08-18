-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "VerificationEmail" (
    "id" TEXT NOT NULL,
    "invalidated" BOOLEAN NOT NULL DEFAULT false,
    "keyHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VerificationEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VerificationEmail" ADD CONSTRAINT "VerificationEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
