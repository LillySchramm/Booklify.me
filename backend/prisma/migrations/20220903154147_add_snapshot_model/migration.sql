-- CreateTable
CREATE TABLE "Snapshot" (
    "id" TEXT NOT NULL,
    "ttl" TIMESTAMP(3),
    "invalidated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToSnapshot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToSnapshot_AB_unique" ON "_BookToSnapshot"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToSnapshot_B_index" ON "_BookToSnapshot"("B");

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToSnapshot" ADD CONSTRAINT "_BookToSnapshot_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToSnapshot" ADD CONSTRAINT "_BookToSnapshot_B_fkey" FOREIGN KEY ("B") REFERENCES "Snapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
