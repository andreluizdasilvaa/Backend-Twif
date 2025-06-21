/*
  Warnings:

  - You are about to alter the column `problema` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(190)`.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `isViewd` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `problema` VARCHAR(190) NOT NULL;
