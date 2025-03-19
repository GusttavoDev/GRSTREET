/*
  Warnings:

  - You are about to drop the column `cfop` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `origem` on the `Color` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "cfop",
DROP COLUMN "origem",
ADD COLUMN     "custo" TEXT,
ADD COLUMN     "imposto" TEXT;
