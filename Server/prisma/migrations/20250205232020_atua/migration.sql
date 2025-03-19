/*
  Warnings:

  - The primary key for the `ProductPurchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductPurchase` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `ProductPurchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_id` to the `ProductPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductPurchase" DROP CONSTRAINT "ProductPurchase_id_fkey";

-- AlterTable
ALTER TABLE "ProductPurchase" DROP CONSTRAINT "ProductPurchase_pkey",
DROP COLUMN "id",
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "purchase_id" TEXT NOT NULL,
ADD CONSTRAINT "ProductPurchase_pkey" PRIMARY KEY ("purchase_id", "product_id");

-- AddForeignKey
ALTER TABLE "ProductPurchase" ADD CONSTRAINT "ProductPurchase_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPurchase" ADD CONSTRAINT "ProductPurchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
