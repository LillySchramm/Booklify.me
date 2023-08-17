/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `persistent` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "key",
DROP COLUMN "persistent",
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id", "userId");

-- CreateIndex
CREATE INDEX "Session_id_idx" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_invalidated_idx" ON "Session"("invalidated");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
