-- CreateTable
CREATE TABLE "Showroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slides" JSONB NOT NULL,

    CONSTRAINT "Showroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graphics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Graphics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graphic_values" (
    "id" SERIAL NOT NULL,
    "graphicsId" INTEGER NOT NULL,
    "prices" JSONB NOT NULL,

    CONSTRAINT "graphic_values_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "graphic_values" ADD CONSTRAINT "graphic_values_graphicsId_fkey" FOREIGN KEY ("graphicsId") REFERENCES "Graphics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
