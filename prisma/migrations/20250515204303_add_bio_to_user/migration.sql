-- DropIndex
DROP INDEX `Notification_postDeletedId_fkey` ON `notification`;

-- DropIndex
DROP INDEX `Notification_postId_fkey` ON `notification`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` VARCHAR(191) NULL;
