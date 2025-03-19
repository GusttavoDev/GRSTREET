/*
  Warnings:

  - Added the required column `payment_id` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "actived" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cfop" TEXT,
ADD COLUMN     "ncm" TEXT,
ADD COLUMN     "origem" TEXT;

-- AlterTable
ALTER TABLE "Config" ADD COLUMN     "bannerLink1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bannerLink2" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bannerLink3" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "destaqued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "payment_id" TEXT NOT NULL,
ADD COLUMN     "payment_status" TEXT NOT NULL;
