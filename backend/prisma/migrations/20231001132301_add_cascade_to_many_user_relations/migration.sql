-- DropForeignKey
ALTER TABLE "BookGroup" DROP CONSTRAINT "BookGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "OwnershipStatus" DROP CONSTRAINT "OwnershipStatus_bookIsbn_fkey";

-- DropForeignKey
ALTER TABLE "OwnershipStatus" DROP CONSTRAINT "OwnershipStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetRequest" DROP CONSTRAINT "PasswordResetRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFlags" DROP CONSTRAINT "UserFlags_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationEmail" DROP CONSTRAINT "VerificationEmail_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserFlags" ADD CONSTRAINT "UserFlags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationEmail" ADD CONSTRAINT "VerificationEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnershipStatus" ADD CONSTRAINT "OwnershipStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnershipStatus" ADD CONSTRAINT "OwnershipStatus_bookIsbn_fkey" FOREIGN KEY ("bookIsbn") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGroup" ADD CONSTRAINT "BookGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetRequest" ADD CONSTRAINT "PasswordResetRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
