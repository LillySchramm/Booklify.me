-- CreateTable
CREATE TABLE "OwnershipStatus" (
    "status" "BookStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "bookIsbn" TEXT NOT NULL,

    CONSTRAINT "OwnershipStatus_pkey" PRIMARY KEY ("userId","bookIsbn")
);

-- CreateIndex
CREATE INDEX "OwnershipStatus_status_idx" ON "OwnershipStatus"("status");

-- AddForeignKey
ALTER TABLE "OwnershipStatus" ADD CONSTRAINT "OwnershipStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnershipStatus" ADD CONSTRAINT "OwnershipStatus_bookIsbn_fkey" FOREIGN KEY ("bookIsbn") REFERENCES "Book"("isbn") ON DELETE RESTRICT ON UPDATE CASCADE;
