/*
  Warnings:

  - You are about to drop the column `additional_services` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `custom_delivery_max` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `custom_delivery_min` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `custom_delivery_time` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `custom_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_max` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_min` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_time` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `packages` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "additional_services",
DROP COLUMN "company",
DROP COLUMN "currency",
DROP COLUMN "custom_delivery_max",
DROP COLUMN "custom_delivery_min",
DROP COLUMN "custom_delivery_time",
DROP COLUMN "custom_price",
DROP COLUMN "delivery_max",
DROP COLUMN "delivery_min",
DROP COLUMN "delivery_time",
DROP COLUMN "discount",
DROP COLUMN "packages",
DROP COLUMN "price",
ADD COLUMN     "height" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lenght" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "peso" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "width" TEXT NOT NULL DEFAULT '';
