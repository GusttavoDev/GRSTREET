/*
  Warnings:

  - You are about to drop the column `lenght` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "lenght",
DROP COLUMN "peso",
ADD COLUMN     "declared_value" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "length" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "package_format" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "sku" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "weight" TEXT NOT NULL DEFAULT '';
