-- CreateTable
CREATE TABLE "UserFlags" (
    "userId" TEXT NOT NULL,
    "lastAppliedGrouperVersion" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFlags_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFlags_userId_key" ON "UserFlags"("userId");

-- AddForeignKey
ALTER TABLE "UserFlags" ADD CONSTRAINT "UserFlags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
