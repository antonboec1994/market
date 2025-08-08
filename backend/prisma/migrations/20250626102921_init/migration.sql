/*
  Warnings:

  - You are about to drop the `graphic_values` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `values` to the `Graphics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "graphic_values" DROP CONSTRAINT "graphic_values_graphicsId_fkey";

-- AlterTable
ALTER TABLE "Graphics" ADD COLUMN     "values" JSONB NOT NULL;

-- DropTable
DROP TABLE "graphic_values";

-- CreateTable
CREATE TABLE "GraphicValues" (
    "id" SERIAL NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "graphicId" INTEGER NOT NULL,

    CONSTRAINT "GraphicValues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GraphicValues" ADD CONSTRAINT "GraphicValues_graphicId_fkey" FOREIGN KEY ("graphicId") REFERENCES "Graphics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
