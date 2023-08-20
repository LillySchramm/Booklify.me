/*
  Warnings:

  - You are about to drop the `BookGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OwnershipStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Snapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SnapshotBookGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToBookGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToSnapshotBookGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookGroup" DROP CONSTRAINT "BookGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "OwnershipStatus" DROP CONSTRAINT "OwnershipStatus_bookIsbn_fkey";

-- DropForeignKey
ALTER TABLE "OwnershipStatus" DROP CONSTRAINT "OwnershipStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "Snapshot" DROP CONSTRAINT "Snapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "SnapshotBookGroup" DROP CONSTRAINT "SnapshotBookGroup_snapshotId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookGroup" DROP CONSTRAINT "_BookToBookGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookGroup" DROP CONSTRAINT "_BookToBookGroup_B_fkey";

-- DropForeignKey
ALTER TABLE "_BookToSnapshotBookGroup" DROP CONSTRAINT "_BookToSnapshotBookGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToSnapshotBookGroup" DROP CONSTRAINT "_BookToSnapshotBookGroup_B_fkey";

-- DropTable
DROP TABLE "BookGroup";

-- DropTable
DROP TABLE "OwnershipStatus";

-- DropTable
DROP TABLE "Snapshot";

-- DropTable
DROP TABLE "SnapshotBookGroup";

-- DropTable
DROP TABLE "_BookToBookGroup";

-- DropTable
DROP TABLE "_BookToSnapshotBookGroup";
