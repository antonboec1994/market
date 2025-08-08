/*
  Warnings:

  - Made the column `login` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "login" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
