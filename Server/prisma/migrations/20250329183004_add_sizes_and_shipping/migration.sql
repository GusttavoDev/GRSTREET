/*
  Warnings:

  - You are about to drop the column `categorieImage1` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImage2` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImage3` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImage4` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImage5` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImageLink1` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImageLink2` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImageLink3` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImageLink4` on the `Config` table. All the data in the column will be lost.
  - You are about to drop the column `categorieImageLink5` on the `Config` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600/https://tenisatacado30.com.br/wp-content/uploads/2025/03/Tenis-Nike-Air-Force-F1-Preto-Masculino-Premium-3-600x698.jpeg';

-- AlterTable
ALTER TABLE "Config" DROP COLUMN "categorieImage1",
DROP COLUMN "categorieImage2",
DROP COLUMN "categorieImage3",
DROP COLUMN "categorieImage4",
DROP COLUMN "categorieImage5",
DROP COLUMN "categorieImageLink1",
DROP COLUMN "categorieImageLink2",
DROP COLUMN "categorieImageLink3",
DROP COLUMN "categorieImageLink4",
DROP COLUMN "categorieImageLink5";
