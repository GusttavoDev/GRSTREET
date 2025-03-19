/*
  Warnings:

  - Added the required column `color` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "afiliado" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "frete" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "value" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "vendedor" TEXT DEFAULT '';
