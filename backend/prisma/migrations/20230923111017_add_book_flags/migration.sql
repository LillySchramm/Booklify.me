-- CreateTable
CREATE TABLE "BookFlags" (
    "id" TEXT NOT NULL,
    "bookIsbn" TEXT NOT NULL,
    "recrawlCover" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookFlags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookFlags_bookIsbn_key" ON "BookFlags"("bookIsbn");

-- AddForeignKey
ALTER TABLE "BookFlags" ADD CONSTRAINT "BookFlags_bookIsbn_fkey" FOREIGN KEY ("bookIsbn") REFERENCES "Book"("isbn") ON DELETE RESTRICT ON UPDATE CASCADE;
