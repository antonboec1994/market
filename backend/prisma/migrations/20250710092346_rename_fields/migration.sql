/*
  Warnings:

  - You are about to drop the column `firstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "firstName",
DROP COLUMN "userName",
ADD COLUMN     "login" TEXT,
ADD COLUMN     "name" TEXT;
