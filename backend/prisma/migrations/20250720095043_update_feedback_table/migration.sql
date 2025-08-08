/*
  Warnings:

  - You are about to drop the column `feedbackEmail` on the `Feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackName` on the `Feedbacks` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedbacks" DROP COLUMN "feedbackEmail",
DROP COLUMN "feedbackName",
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
