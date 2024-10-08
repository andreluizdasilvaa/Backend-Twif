/*
  Warnings:

  - You are about to drop the column `matricula` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_matricula_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `matricula`,
    ADD COLUMN `user` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_user_key` ON `User`(`user`);
