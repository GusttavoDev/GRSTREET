/*
  Warnings:

  - You are about to drop the column `stock` on the `Color` table. All the data in the column will be lost.
  - Added the required column `additional_services` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custom_delivery_max` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custom_delivery_min` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custom_delivery_time` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custom_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_max` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_min` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_time` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packages` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "additional_services" JSONB NOT NULL,
ADD COLUMN     "company" JSONB NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "custom_delivery_max" INTEGER NOT NULL,
ADD COLUMN     "custom_delivery_min" INTEGER NOT NULL,
ADD COLUMN     "custom_delivery_time" INTEGER NOT NULL,
ADD COLUMN     "custom_price" TEXT NOT NULL,
ADD COLUMN     "delivery_max" INTEGER NOT NULL,
ADD COLUMN     "delivery_min" INTEGER NOT NULL,
ADD COLUMN     "delivery_time" INTEGER NOT NULL,
ADD COLUMN     "discount" TEXT NOT NULL,
ADD COLUMN     "packages" JSONB NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_img" SET DEFAULT 'https://i.imgur.com/5QpQijK.png';

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
