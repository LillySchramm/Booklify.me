-- CreateTable
CREATE TABLE "MetadataRespone" (
    "id" SERIAL NOT NULL,
    "isbn" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "responseCode" INTEGER NOT NULL,
    "body" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetadataRespone_pkey" PRIMARY KEY ("id")
);
