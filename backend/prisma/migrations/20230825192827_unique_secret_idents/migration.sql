/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Secret` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Secret_identifier_key" ON "Secret"("identifier");
