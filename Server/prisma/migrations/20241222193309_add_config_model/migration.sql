/*
  Warnings:

  - Made the column `vendedor` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "visualizada" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "vendedor" SET NOT NULL;

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "banner1" TEXT NOT NULL DEFAULT '',
    "categorie1" TEXT NOT NULL DEFAULT '',
    "categorie2" TEXT NOT NULL DEFAULT '',
    "categorie3" TEXT NOT NULL DEFAULT '',
    "categorieImageLink1" TEXT NOT NULL DEFAULT '',
    "categorieImageLink2" TEXT NOT NULL DEFAULT '',
    "categorieImageLink3" TEXT NOT NULL DEFAULT '',
    "categorieImageLink4" TEXT NOT NULL DEFAULT '',
    "categorieImageLink5" TEXT NOT NULL DEFAULT '',
    "categorieImage1" TEXT NOT NULL DEFAULT '',
    "categorieImage2" TEXT NOT NULL DEFAULT '',
    "categorieImage3" TEXT NOT NULL DEFAULT '',
    "categorieImage4" TEXT NOT NULL DEFAULT '',
    "categorieImage5" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);
