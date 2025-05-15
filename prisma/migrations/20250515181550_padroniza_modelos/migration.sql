/*
  Warnings:

  - You are about to alter the column `action` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `imageDefault` on the `user` table. All the data in the column will be lost.
  - Added the required column `curso` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `nascimento` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_postId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_userId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_postDeletedId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_postId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_triggeredById_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_userId_fkey`;

-- DropIndex
DROP INDEX `Like_userId_postId_key` ON `like`;

-- DropIndex
DROP INDEX `Notification_userId_isViewed_idx` ON `notification`;

-- AlterTable
ALTER TABLE `comment` MODIFY `content` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `notification` MODIFY `action` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `post` MODIFY `content` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `postdeleted` MODIFY `content` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `bio`,
    DROP COLUMN `course`,
    DROP COLUMN `imageDefault`,
    ADD COLUMN `curso` VARCHAR(191) NOT NULL,
    MODIFY `nascimento` VARCHAR(191) NOT NULL,
    MODIFY `profilePicture` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_triggeredById_fkey` FOREIGN KEY (`triggeredById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
