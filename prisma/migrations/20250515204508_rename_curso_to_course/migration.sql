/*
  Warnings:

  - You are about to drop the column `curso` on the `user` table. All the data in the column will be lost.
  - Added the required column `course` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `curso`,
    ADD COLUMN `course` VARCHAR(191) NOT NULL;
