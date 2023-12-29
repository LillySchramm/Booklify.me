-- AlterTable
ALTER TABLE "UserFlags" ADD COLUMN     "changelogNotificationEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastNotifiedChangelogVersion" TEXT NOT NULL DEFAULT '0';
